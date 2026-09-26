-- Academic learning recommendations. Synthetic demo data belongs in a separate seed script.
create table public.subjects (
  id uuid primary key default gen_random_uuid(),
  code text not null unique check (code = upper(trim(code))),
  name text not null check (length(trim(name)) between 1 and 160),
  description text,
  created_at timestamptz not null default now()
);

create table public.learning_topics (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  code text not null,
  name text not null check (length(trim(name)) between 1 and 180),
  description text,
  grade_level smallint check (grade_level is null or grade_level between 10 and 13),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (subject_id, code),
  unique (id, subject_id)
);

create table public.teacher_subject_assignments (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.profiles(user_id) on delete cascade,
  subject_id uuid not null references public.subjects(id) on delete restrict,
  class_id uuid not null references public.classes(id) on delete restrict,
  academic_year_id uuid not null references public.academic_years(id) on delete restrict,
  is_active boolean not null default true,
  valid_from timestamptz not null default now(),
  valid_until timestamptz,
  created_at timestamptz not null default now(),
  check (valid_until is null or valid_until > valid_from),
  foreign key (class_id, academic_year_id) references public.classes(id, academic_year_id) on delete restrict
);

create unique index teacher_subject_assignments_active_unique
  on public.teacher_subject_assignments(teacher_id, subject_id, class_id, academic_year_id);

create table public.assessments (
  id uuid primary key default gen_random_uuid(),
  teacher_assignment_id uuid not null references public.teacher_subject_assignments(id) on delete cascade,
  topic_id uuid not null references public.learning_topics(id) on delete restrict,
  title text not null check (length(trim(title)) between 1 and 180),
  assessment_date date not null,
  minimum_score numeric(6,2) not null check (minimum_score >= 0),
  max_score numeric(6,2) not null default 100 check (max_score > 0),
  created_by uuid not null references public.profiles(user_id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (minimum_score <= max_score)
);

create table public.student_scores (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.assessments(id) on delete cascade,
  student_id uuid not null references public.profiles(user_id) on delete cascade,
  score numeric(6,2) not null check (score >= 0),
  notes text,
  recorded_by uuid not null references public.profiles(user_id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (assessment_id, student_id)
);

create table public.learning_resources (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid not null references public.learning_topics(id) on delete cascade,
  title text not null check (length(trim(title)) between 1 and 180),
  description text not null default '',
  resource_type text not null check (resource_type in ('ARTICLE', 'VIDEO', 'DOCUMENT', 'EXERCISE')),
  url text,
  is_approved boolean not null default false,
  created_by uuid references public.profiles(user_id) on delete set null,
  created_at timestamptz not null default now(),
  unique (topic_id, title)
);

create index student_scores_student_idx on public.student_scores(student_id);
create index student_scores_assessment_idx on public.student_scores(assessment_id);
create index assessments_assignment_idx on public.assessments(teacher_assignment_id);
create index assessments_topic_idx on public.assessments(topic_id);
create index teacher_assignments_teacher_active_idx on public.teacher_subject_assignments(teacher_id, is_active);
create index learning_topics_subject_idx on public.learning_topics(subject_id);
create index learning_resources_topic_approved_idx on public.learning_resources(topic_id, is_approved);

create trigger assessments_touch_updated_at before update on public.assessments
  for each row execute function public.touch_updated_at();
create trigger student_scores_touch_updated_at before update on public.student_scores
  for each row execute function public.touch_updated_at();

create or replace function public.validate_academic_learning_record()
returns trigger language plpgsql set search_path = public as $$
declare
  assignment_subject uuid;
  assessment_class uuid;
  assessment_year uuid;
begin
  if tg_table_name = 'assessments' then
    select a.subject_id, a.class_id, a.academic_year_id
      into assignment_subject, assessment_class, assessment_year
      from public.teacher_subject_assignments a
      where a.id = new.teacher_assignment_id;
    if assignment_subject is null then raise exception 'Teacher assignment not found'; end if;
    if not exists (select 1 from public.learning_topics t where t.id = new.topic_id and t.subject_id = assignment_subject) then
      raise exception 'Assessment topic does not belong to assigned subject';
    end if;
  elsif tg_table_name = 'student_scores' then
    select a.class_id, a.academic_year_id into assessment_class, assessment_year
      from public.assessments x
      join public.teacher_subject_assignments a on a.id = x.teacher_assignment_id
      where x.id = new.assessment_id;
    if assessment_class is null then raise exception 'Assessment not found'; end if;
    if new.score > (select max_score from public.assessments where id = new.assessment_id) then
      raise exception 'Score exceeds assessment maximum';
    end if;
    if not exists (select 1 from public.class_memberships m where m.student_id = new.student_id and m.class_id = assessment_class and m.academic_year_id = assessment_year) then
      raise exception 'Student is not a member of the assessment class';
    end if;
  end if;
  return new;
end;
$$;

create trigger assessments_validate before insert or update on public.assessments
  for each row execute function public.validate_academic_learning_record();
create trigger student_scores_validate before insert or update on public.student_scores
  for each row execute function public.validate_academic_learning_record();

alter table public.subjects enable row level security;
alter table public.learning_topics enable row level security;
alter table public.teacher_subject_assignments enable row level security;
alter table public.assessments enable row level security;
alter table public.student_scores enable row level security;
alter table public.learning_resources enable row level security;

create policy subjects_read_authenticated on public.subjects for select to authenticated using (true);
create policy topics_read_authenticated on public.learning_topics for select to authenticated using (true);
create policy assignments_read_owner on public.teacher_subject_assignments for select to authenticated using (teacher_id = auth.uid());
create policy assessments_read_owner_or_student on public.assessments for select to authenticated using (
  exists (select 1 from public.teacher_subject_assignments a where a.id = teacher_assignment_id and a.teacher_id = auth.uid())
  or exists (select 1 from public.student_scores s where s.assessment_id = id and s.student_id = auth.uid())
);
create policy scores_read_self_or_teacher on public.student_scores for select to authenticated using (
  student_id = auth.uid()
  or exists (select 1 from public.assessments x join public.teacher_subject_assignments a on a.id = x.teacher_assignment_id where x.id = assessment_id and a.teacher_id = auth.uid())
);
create policy approved_resources_read_authenticated on public.learning_resources for select to authenticated using (is_approved);

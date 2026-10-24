create table if not exists public.aspiration_cycles (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 160),
  academic_year_id uuid not null references public.academic_years(id) on delete restrict,
  opens_at timestamptz not null,
  closes_at timestamptz not null,
  status text not null default 'DRAFT' check (status in ('DRAFT','OPEN','CLOSED')),
  created_by uuid references public.profiles(user_id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (closes_at > opens_at)
);
create table if not exists public.class_aspirations (
  id uuid primary key default gen_random_uuid(),
  cycle_id uuid not null references public.aspiration_cycles(id) on delete restrict,
  class_id uuid not null references public.classes(id) on delete restrict,
  submitted_by uuid not null references public.profiles(user_id) on delete restrict,
  category text not null check (category in ('FACILITIES','LEARNING','STUDENT_LIFE','SAFETY','OTHER')),
  title text not null check (char_length(trim(title)) between 3 and 160),
  content text not null check (char_length(trim(content)) between 10 and 5000),
  status text not null default 'SUBMITTED' check (status in ('SUBMITTED','IN_REVIEW','RESPONDED','RESOLVED','REJECTED')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (cycle_id, class_id)
);
create table if not exists public.aspiration_updates (
  id uuid primary key default gen_random_uuid(),
  aspiration_id uuid not null references public.class_aspirations(id) on delete cascade,
  author_id uuid not null references public.profiles(user_id) on delete restrict,
  status text not null check (status in ('IN_REVIEW','RESPONDED','RESOLVED','REJECTED')),
  message text not null check (char_length(trim(message)) between 2 and 3000),
  created_at timestamptz not null default now()
);
create table if not exists public.aspiration_audit (
  id uuid primary key default gen_random_uuid(),
  aspiration_id uuid not null references public.class_aspirations(id) on delete cascade,
  actor_id uuid references public.profiles(user_id) on delete set null,
  action text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists aspiration_cycles_status_idx on public.aspiration_cycles(status, opens_at);
create index if not exists class_aspirations_class_idx on public.class_aspirations(class_id, created_at desc);
create index if not exists aspiration_updates_aspiration_idx on public.aspiration_updates(aspiration_id, created_at);
drop trigger if exists aspiration_cycles_touch_updated_at on public.aspiration_cycles;
create trigger aspiration_cycles_touch_updated_at before update on public.aspiration_cycles for each row execute function public.touch_updated_at();
drop trigger if exists class_aspirations_touch_updated_at on public.class_aspirations;
create trigger class_aspirations_touch_updated_at before update on public.class_aspirations for each row execute function public.touch_updated_at();
alter table public.aspiration_cycles enable row level security;
alter table public.class_aspirations enable row level security;
alter table public.aspiration_updates enable row level security;
alter table public.aspiration_audit enable row level security;
create policy aspiration_cycles_read_authenticated on public.aspiration_cycles for select to authenticated using (true);
create policy class_aspirations_read_submitter on public.class_aspirations for select to authenticated using (submitted_by = auth.uid());
create policy class_aspirations_read_mpk on public.class_aspirations for select to authenticated using (public.has_active_role('MPK_OFFICER'));
create policy aspiration_updates_read_submitter on public.aspiration_updates for select to authenticated using (exists (select 1 from public.class_aspirations a where a.id = aspiration_id and a.submitted_by = auth.uid()));
create policy aspiration_updates_read_mpk on public.aspiration_updates for select to authenticated using (public.has_active_role('MPK_OFFICER'));
create policy aspiration_audit_admin_only on public.aspiration_audit for select to authenticated using (public.has_active_role('ADMIN'));

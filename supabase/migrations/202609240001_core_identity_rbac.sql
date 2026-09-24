-- Core identity/RBAC schema. Run through Supabase migrations on a new database.
create extension if not exists pgcrypto;

create type public.identifier_type as enum ('NIS', 'NIP', 'INTERNAL');
create type public.account_type as enum ('STUDENT', 'TEACHER', 'STAFF');
create type public.scope_type as enum ('GLOBAL', 'CLASS', 'MAJOR', 'MERCHANT', 'SUBJECT', 'ACADEMIC_YEAR');

create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  school_identifier text not null,
  identifier_type public.identifier_type not null,
  display_name text not null check (length(trim(display_name)) between 1 and 120),
  account_type public.account_type not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_identifier_format check (school_identifier = upper(trim(school_identifier))),
  constraint profiles_identifier_unique unique (identifier_type, school_identifier)
);

create table public.auth_identity_mappings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  login_identifier text not null,
  internal_email text not null unique,
  created_at timestamptz not null default now(),
  constraint auth_mapping_identifier_unique unique (login_identifier),
  constraint auth_mapping_identifier_normalized check (login_identifier = upper(trim(login_identifier)))
);

create table public.academic_years (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  starts_on date not null,
  ends_on date not null,
  is_active boolean not null default false,
  check (ends_on > starts_on)
);

create table public.majors (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  created_at timestamptz not null default now()
);

create table public.classes (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  grade smallint not null check (grade between 10 and 13),
  major_id uuid references public.majors(id) on delete restrict,
  academic_year_id uuid not null references public.academic_years(id) on delete restrict,
  unique (code, academic_year_id),
  unique (id, academic_year_id)
);

create table public.class_memberships (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(user_id) on delete cascade,
  class_id uuid not null references public.classes(id) on delete cascade,
  academic_year_id uuid not null references public.academic_years(id) on delete restrict,
  created_at timestamptz not null default now(),
  unique (student_id, academic_year_id),
  unique (student_id, class_id),
  foreign key (class_id, academic_year_id) references public.classes(id, academic_year_id) on delete cascade
);

create table public.role_assignments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(user_id) on delete cascade,
  role_code text not null check (role_code in ('ADMIN','CLASS_REP','MPK_OFFICER','BK_STAFF','SUBJECT_TEACHER','ACHIEVEMENT_VERIFIER','BKK_OFFICER','HEAD_OF_DEPARTMENT','CANTEEN_VENDOR','COOP_OPERATOR','CONTENT_EDITOR')),
  scope_type public.scope_type not null default 'GLOBAL',
  scope_id uuid,
  valid_from timestamptz not null default now(),
  valid_until timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  check (valid_until is null or valid_until > valid_from),
  check ((scope_type = 'GLOBAL' and scope_id is null) or (scope_type <> 'GLOBAL' and scope_id is not null))
);

create index role_assignments_user_active_idx on public.role_assignments(user_id, is_active, valid_from, valid_until);
create index class_memberships_class_idx on public.class_memberships(class_id, academic_year_id);
create index profiles_active_idx on public.profiles(is_active);

create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
;
create trigger profiles_touch_updated_at before update on public.profiles for each row execute function public.touch_updated_at();

create or replace function public.has_active_role(required_role text, requested_scope uuid default null)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.role_assignments r
    where r.user_id = auth.uid() and r.role_code = required_role and r.is_active
      and r.valid_from <= now() and (r.valid_until is null or r.valid_until > now())
      and (r.scope_type = 'GLOBAL' or r.scope_id = requested_scope)
  );
$$;

alter table public.profiles enable row level security;
alter table public.auth_identity_mappings enable row level security;
alter table public.academic_years enable row level security;
alter table public.majors enable row level security;
alter table public.classes enable row level security;
alter table public.class_memberships enable row level security;
alter table public.role_assignments enable row level security;

create policy profiles_read_self on public.profiles for select to authenticated using (user_id = auth.uid());
create policy academic_years_read_authenticated on public.academic_years for select to authenticated using (true);
create policy majors_read_authenticated on public.majors for select to authenticated using (true);
create policy classes_read_member on public.classes for select to authenticated using (
  exists (select 1 from public.class_memberships m where m.class_id = id and m.student_id = auth.uid())
  or public.has_active_role('ADMIN')
);
create policy memberships_read_self on public.class_memberships for select to authenticated using (student_id = auth.uid());
create policy roles_read_self on public.role_assignments for select to authenticated using (user_id = auth.uid());

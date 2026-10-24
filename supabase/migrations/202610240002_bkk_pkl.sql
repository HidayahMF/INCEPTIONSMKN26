create table if not exists public.pkl_vacancies (
  id uuid primary key default gen_random_uuid(),
  created_by uuid not null references public.profiles(user_id) on delete restrict,
  company text not null check (char_length(trim(company)) between 2 and 160),
  industry text not null check (char_length(trim(industry)) between 2 and 120),
  position text not null check (char_length(trim(position)) between 2 and 160),
  major text not null check (char_length(trim(major)) between 2 and 160),
  location text not null check (char_length(trim(location)) between 2 and 160),
  description text not null check (char_length(trim(description)) between 2 and 5000),
  requirements text[] not null default '{}',
  registration_start date not null,
  registration_end date not null,
  internship_start date not null,
  internship_end date not null,
  status text not null default 'DRAFT' check (status in ('DRAFT','PUBLISHED','CLOSED')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (registration_end >= registration_start),
  check (internship_end >= internship_start)
);

create table if not exists public.pkl_applications (
  id uuid primary key default gen_random_uuid(),
  vacancy_id uuid not null references public.pkl_vacancies(id) on delete cascade,
  student_id uuid not null references public.profiles(user_id) on delete cascade,
  portfolio_id uuid not null references public.student_portfolios(id) on delete restrict,
  status text not null default 'SUBMITTED' check (status in ('SUBMITTED','REVIEWING','ACCEPTED','REJECTED')),
  reviewer_note text,
  reviewed_by uuid references public.profiles(user_id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (vacancy_id, student_id)
);

create table if not exists public.pkl_application_files (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.pkl_applications(id) on delete cascade,
  owner_id uuid not null references public.profiles(user_id) on delete cascade,
  bucket text not null default 'cv-private' check (bucket = 'cv-private'),
  storage_key text not null unique,
  original_name text not null,
  mime_type text not null check (mime_type = 'application/pdf'),
  byte_size integer not null check (byte_size > 0 and byte_size <= 5242880),
  created_at timestamptz not null default now()
);

create index if not exists pkl_vacancies_status_idx on public.pkl_vacancies(status, registration_end);
create index if not exists pkl_applications_student_idx on public.pkl_applications(student_id, updated_at desc);
create index if not exists pkl_applications_vacancy_idx on public.pkl_applications(vacancy_id, status);

drop trigger if exists pkl_vacancies_touch_updated_at on public.pkl_vacancies;
create trigger pkl_vacancies_touch_updated_at before update on public.pkl_vacancies for each row execute function public.touch_updated_at();
drop trigger if exists pkl_applications_touch_updated_at on public.pkl_applications;
create trigger pkl_applications_touch_updated_at before update on public.pkl_applications for each row execute function public.touch_updated_at();

alter table public.pkl_vacancies enable row level security;
alter table public.pkl_applications enable row level security;
alter table public.pkl_application_files enable row level security;

drop policy if exists pkl_vacancies_student_select on public.pkl_vacancies;
create policy pkl_vacancies_student_select on public.pkl_vacancies for select to authenticated using (status = 'PUBLISHED' or created_by = auth.uid());
drop policy if exists pkl_applications_student_select on public.pkl_applications;
create policy pkl_applications_student_select on public.pkl_applications for select to authenticated using (student_id = auth.uid());
drop policy if exists pkl_application_files_owner_select on public.pkl_application_files;
create policy pkl_application_files_owner_select on public.pkl_application_files for select to authenticated using (owner_id = auth.uid());

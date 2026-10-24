-- Additive Portfolio & Digital Achievement schema. This migration is not run automatically.
create extension if not exists pgcrypto;

create table if not exists public.student_portfolios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(trim(title)) between 2 and 160),
  category text not null check (char_length(trim(category)) between 2 and 100),
  summary text not null check (char_length(trim(summary)) between 2 and 500),
  description text not null check (char_length(trim(description)) between 2 and 5000),
  skills text[] not null default '{}',
  project_date date not null,
  role text not null check (char_length(trim(role)) between 2 and 160),
  purpose text,
  background text,
  features text[] not null default '{}',
  outputs text[] not null default '{}',
  lessons_learned text,
  github_url text,
  demo_url text,
  status text not null default 'DRAFT' check (status in ('DRAFT', 'SUBMITTED', 'VERIFIED', 'REJECTED')),
  reviewer_note text,
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.achievement_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(trim(title)) between 2 and 160),
  achievement_type text not null check (char_length(trim(achievement_type)) between 2 and 100),
  competition text not null check (char_length(trim(competition)) between 2 and 200),
  organizer text not null check (char_length(trim(organizer)) between 2 and 200),
  level text not null check (char_length(trim(level)) between 2 and 100),
  rank text not null check (char_length(trim(rank)) between 2 and 100),
  achievement_date date not null,
  description text not null check (char_length(trim(description)) between 2 and 5000),
  status text not null default 'DRAFT' check (status in ('DRAFT', 'SUBMITTED', 'VERIFIED', 'REJECTED')),
  reviewer_note text,
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_files (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  portfolio_id uuid references public.student_portfolios(id) on delete cascade,
  achievement_id uuid references public.achievement_submissions(id) on delete cascade,
  bucket text not null check (bucket in ('portfolio-private', 'achievement-private')),
  storage_key text not null unique,
  original_name text not null,
  mime_type text not null check (mime_type in ('image/jpeg', 'image/png', 'image/webp')),
  byte_size integer not null check (byte_size > 0 and byte_size <= 5242880),
  created_at timestamptz not null default now(),
  check ((portfolio_id is not null and achievement_id is null) or (portfolio_id is null and achievement_id is not null))
);

create index if not exists student_portfolios_user_status_idx on public.student_portfolios(user_id, status, updated_at desc);
create index if not exists achievement_submissions_user_status_idx on public.achievement_submissions(user_id, status, updated_at desc);
create index if not exists portfolio_files_owner_idx on public.portfolio_files(owner_id);
create index if not exists portfolio_files_portfolio_idx on public.portfolio_files(portfolio_id);
create index if not exists portfolio_files_achievement_idx on public.portfolio_files(achievement_id);

drop trigger if exists student_portfolios_touch_updated_at on public.student_portfolios;
create trigger student_portfolios_touch_updated_at before update on public.student_portfolios
  for each row execute function public.touch_updated_at();
drop trigger if exists achievement_submissions_touch_updated_at on public.achievement_submissions;
create trigger achievement_submissions_touch_updated_at before update on public.achievement_submissions
  for each row execute function public.touch_updated_at();

create or replace function public.validate_portfolio_file_record()
returns trigger language plpgsql set search_path = public as $$
declare
  record_owner uuid;
begin
  if new.portfolio_id is not null then
    select user_id into record_owner from public.student_portfolios where id = new.portfolio_id;
    if record_owner is null or record_owner <> new.owner_id or new.bucket <> 'portfolio-private' then
      raise exception 'Portfolio file owner or bucket mismatch';
    end if;
  elsif new.achievement_id is not null then
    select user_id into record_owner from public.achievement_submissions where id = new.achievement_id;
    if record_owner is null or record_owner <> new.owner_id or new.bucket <> 'achievement-private' then
      raise exception 'Achievement file owner or bucket mismatch';
    end if;
  else
    raise exception 'Portfolio file must belong to a record';
  end if;
  return new;
end;
$$;

drop trigger if exists portfolio_files_validate on public.portfolio_files;
create trigger portfolio_files_validate before insert or update on public.portfolio_files
  for each row execute function public.validate_portfolio_file_record();

alter table public.student_portfolios enable row level security;
alter table public.achievement_submissions enable row level security;
alter table public.portfolio_files enable row level security;

drop policy if exists student_portfolios_owner_select on public.student_portfolios;
create policy student_portfolios_owner_select on public.student_portfolios for select using (auth.uid() = user_id or (status = 'VERIFIED' and is_public = true));
drop policy if exists achievements_owner_select on public.achievement_submissions;
create policy achievements_owner_select on public.achievement_submissions for select using (auth.uid() = user_id or (status = 'VERIFIED' and is_public = true));
drop policy if exists portfolio_files_owner_select on public.portfolio_files;
create policy portfolio_files_owner_select on public.portfolio_files for select using (auth.uid() = owner_id);

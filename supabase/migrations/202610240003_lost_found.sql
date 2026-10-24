create table if not exists public.lost_found_items (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(user_id) on delete cascade,
  item_type text not null check (item_type in ('LOST','FOUND')),
  name text not null check (char_length(trim(name)) between 2 and 160),
  category text not null check (char_length(trim(category)) between 2 and 100),
  description text not null check (char_length(trim(description)) between 2 and 5000),
  location text not null check (char_length(trim(location)) between 2 and 160),
  incident_date date not null,
  additional_info text,
  status text not null default 'PENDING' check (status in ('PENDING','VERIFIED','CLAIMED')),
  verified_by uuid references public.profiles(user_id) on delete set null,
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.lost_found_claims (
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null references public.lost_found_items(id) on delete cascade,
  claimant_id uuid not null references public.profiles(user_id) on delete cascade,
  description text not null check (char_length(trim(description)) between 2 and 2000),
  status text not null default 'SUBMITTED' check (status in ('SUBMITTED','APPROVED','REJECTED')),
  reviewer_note text,
  reviewed_by uuid references public.profiles(user_id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (item_id, claimant_id)
);
create table if not exists public.lost_found_custody_events (
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null references public.lost_found_items(id) on delete cascade,
  actor_id uuid references public.profiles(user_id) on delete set null,
  event_type text not null check (event_type in ('CREATED','VERIFIED','CLAIM_SUBMITTED','CLAIM_APPROVED','CLAIM_REJECTED','HANDED_OVER')),
  note text,
  created_at timestamptz not null default now()
);
create table if not exists public.lost_found_handovers (
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null references public.lost_found_items(id) on delete cascade,
  claim_id uuid not null references public.lost_found_claims(id) on delete restrict,
  handed_over_by uuid not null references public.profiles(user_id) on delete restrict,
  received_by uuid not null references public.profiles(user_id) on delete restrict,
  handover_note text,
  handed_over_at timestamptz not null default now(),
  unique (item_id)
);
create table if not exists public.lost_found_files (
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null references public.lost_found_items(id) on delete cascade,
  owner_id uuid not null references public.profiles(user_id) on delete cascade,
  bucket text not null default 'lost-found-private' check (bucket = 'lost-found-private'),
  storage_key text not null unique,
  original_name text not null,
  mime_type text not null check (mime_type in ('image/jpeg','image/png','image/webp')),
  byte_size integer not null check (byte_size > 0 and byte_size <= 5242880),
  created_at timestamptz not null default now()
);
create index if not exists lost_found_items_status_idx on public.lost_found_items(status, created_at desc);
create index if not exists lost_found_claims_item_idx on public.lost_found_claims(item_id, status);
create index if not exists lost_found_events_item_idx on public.lost_found_custody_events(item_id, created_at desc);
drop trigger if exists lost_found_items_touch_updated_at on public.lost_found_items;
create trigger lost_found_items_touch_updated_at before update on public.lost_found_items for each row execute function public.touch_updated_at();
drop trigger if exists lost_found_claims_touch_updated_at on public.lost_found_claims;
create trigger lost_found_claims_touch_updated_at before update on public.lost_found_claims for each row execute function public.touch_updated_at();
alter table public.lost_found_items enable row level security;
alter table public.lost_found_claims enable row level security;
alter table public.lost_found_custody_events enable row level security;
alter table public.lost_found_handovers enable row level security;
alter table public.lost_found_files enable row level security;
drop policy if exists lost_found_items_select on public.lost_found_items;
create policy lost_found_items_select on public.lost_found_items for select to authenticated using (status = 'VERIFIED' or reporter_id = auth.uid());
drop policy if exists lost_found_claims_select on public.lost_found_claims;
create policy lost_found_claims_select on public.lost_found_claims for select to authenticated using (claimant_id = auth.uid());
drop policy if exists lost_found_files_select on public.lost_found_files;
create policy lost_found_files_select on public.lost_found_files for select to authenticated using (owner_id = auth.uid());

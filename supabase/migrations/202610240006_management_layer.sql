create table if not exists public.admin_audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(user_id) on delete set null,
  action text not null check (char_length(trim(action)) between 2 and 80),
  module text not null check (char_length(trim(module)) between 2 and 80),
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists admin_audit_events_created_idx on public.admin_audit_events(created_at desc);
create index if not exists admin_audit_events_module_action_idx on public.admin_audit_events(module, action, created_at desc);
alter table public.admin_audit_events enable row level security;
create policy admin_audit_events_admin_read on public.admin_audit_events for select to authenticated using (public.has_active_role('ADMIN'));
create policy admin_audit_events_admin_insert on public.admin_audit_events for insert to authenticated with check (public.has_active_role('ADMIN'));

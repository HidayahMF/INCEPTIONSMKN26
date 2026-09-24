-- Public content and approved knowledge-base sources. No school data is seeded.
create extension if not exists pg_trgm;

create type public.content_status as enum ('DRAFT', 'PUBLISHED', 'ARCHIVED');
create type public.knowledge_status as enum ('DRAFT', 'PROCESSING', 'APPROVED', 'REJECTED');
create type public.knowledge_source_type as enum ('PUBLIC_PAGE', 'PDF');

create table public.public_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  section text not null check (section in ('home','profile','organization','majors','tour','partners','blud','programs','achievements','news','information','contact')),
  title text not null check (length(trim(title)) between 1 and 180),
  summary text not null default '',
  body text not null default '',
  metadata jsonb not null default '{}'::jsonb,
  status public.content_status not null default 'DRAFT',
  published_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index public_pages_section_status_idx on public.public_pages(section, status);
create trigger public_pages_touch_updated_at before update on public.public_pages for each row execute function public.touch_updated_at();

create table public.knowledge_sources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  source_url text,
  source_page text,
  created_at timestamptz not null default now()
);

create table public.knowledge_documents (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references public.knowledge_sources(id) on delete cascade,
  source_type public.knowledge_source_type not null,
  source_ref text,
  original_storage_key text,
  visibility text not null default 'PRIVATE' check (visibility in ('PRIVATE','PUBLIC')),
  status public.knowledge_status not null default 'DRAFT',
  version integer not null default 1 check (version > 0),
  mime_type text,
  byte_size integer check (byte_size is null or byte_size > 0),
  approved_at timestamptz,
  approved_by uuid references auth.users(id) on delete set null,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index knowledge_documents_public_idx on public.knowledge_documents(status, visibility);
create trigger knowledge_documents_touch_updated_at before update on public.knowledge_documents for each row execute function public.touch_updated_at();

create table public.knowledge_chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.knowledge_documents(id) on delete cascade,
  chunk_index integer not null check (chunk_index >= 0),
  content text not null check (length(trim(content)) > 0),
  source_page text,
  source_url text,
  created_at timestamptz not null default now(),
  unique (document_id, chunk_index)
);
create index knowledge_chunks_content_trgm_idx on public.knowledge_chunks using gin (content gin_trgm_ops);

alter table public.public_pages enable row level security;
alter table public.knowledge_sources enable row level security;
alter table public.knowledge_documents enable row level security;
alter table public.knowledge_chunks enable row level security;
create policy public_pages_public_read on public.public_pages for select to anon, authenticated using (status = 'PUBLISHED');
create policy public_pages_editor_read on public.public_pages for select to authenticated using (public.has_active_role('ADMIN') or public.has_active_role('CONTENT_EDITOR'));
create policy knowledge_editor_read on public.knowledge_documents for select to authenticated using (public.has_active_role('ADMIN') or public.has_active_role('CONTENT_EDITOR'));
create policy knowledge_editor_sources_read on public.knowledge_sources for select to authenticated using (public.has_active_role('ADMIN') or public.has_active_role('CONTENT_EDITOR'));
create policy knowledge_editor_chunks_read on public.knowledge_chunks for select to authenticated using (public.has_active_role('ADMIN') or public.has_active_role('CONTENT_EDITOR'));
create policy knowledge_public_chunks_read on public.knowledge_chunks for select to anon, authenticated using (
  exists (select 1 from public.knowledge_documents d where d.id = document_id and d.status = 'APPROVED' and d.visibility = 'PUBLIC')
);

-- Create this private bucket in Supabase Storage before PDF upload:
-- insert into storage.buckets (id, name, public) values ('knowledge-private', 'knowledge-private', false)
-- on conflict (id) do nothing;

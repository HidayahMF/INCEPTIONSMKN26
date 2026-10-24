-- Demo-only Aspirasi fixture.
-- Apply manually in Supabase SQL Editor after reviewing the assertions below.
-- This script never creates auth users, changes passwords, or deletes data.
begin;

do $$
declare
  v_kelas_user uuid;
  v_mpk_user uuid;
  v_admin_user uuid;
  v_year_id uuid;
  v_class_id uuid;
  v_existing_membership_class uuid;
  v_rep_role_id uuid;
  v_rep_role_count integer;
begin
  select user_id into v_kelas_user
  from public.auth_identity_mappings
  where login_identifier = 'DEMO-KELAS';
  if v_kelas_user is null then raise exception 'DEMO-KELAS mapping is missing'; end if;

  select user_id into v_mpk_user
  from public.auth_identity_mappings
  where login_identifier = 'DEMO-MPK';
  if v_mpk_user is null then raise exception 'DEMO-MPK mapping is missing'; end if;

  select user_id into v_admin_user
  from public.auth_identity_mappings
  where login_identifier = 'DEMO-ADMIN';
  if v_admin_user is null then raise exception 'DEMO-ADMIN mapping is missing'; end if;

  if (select count(*) from public.auth_identity_mappings where login_identifier in ('DEMO-KELAS','DEMO-MPK','DEMO-ADMIN')) <> 3 then
    raise exception 'A demo identifier lookup is ambiguous';
  end if;
  if not exists (select 1 from public.profiles where user_id = v_kelas_user and school_identifier = 'DEMO-KELAS' and account_type = 'STUDENT' and is_active) then raise exception 'DEMO-KELAS profile is missing, inactive, or has the wrong account type'; end if;
  if not exists (select 1 from public.profiles where user_id = v_mpk_user and school_identifier = 'DEMO-MPK' and account_type = 'STUDENT' and is_active) then raise exception 'DEMO-MPK profile is missing, inactive, or has the wrong account type'; end if;
  if not exists (select 1 from public.profiles where user_id = v_admin_user and school_identifier = 'DEMO-ADMIN' and account_type = 'STAFF' and is_active) then raise exception 'DEMO-ADMIN profile is missing, inactive, or has the wrong account type'; end if;

  if (select count(*) from public.academic_years where is_active) <> 1 then raise exception 'Expected exactly one active academic year'; end if;
  select id into v_year_id from public.academic_years where is_active;
  if (select count(*) from public.classes where academic_year_id = v_year_id) <> 1 then raise exception 'Expected exactly one class in the active academic year; refusing an ambiguous fixture'; end if;
  select id into v_class_id from public.classes where academic_year_id = v_year_id;

  select class_id into v_existing_membership_class
  from public.class_memberships
  where student_id = v_kelas_user and academic_year_id = v_year_id;
  if v_existing_membership_class is not null and v_existing_membership_class <> v_class_id then
    raise exception 'DEMO-KELAS already belongs to a different class in the active academic year';
  end if;
  insert into public.class_memberships (student_id, class_id, academic_year_id)
  values (v_kelas_user, v_class_id, v_year_id)
  on conflict (student_id, academic_year_id) do nothing;

  select count(*) into v_rep_role_count
  from public.role_assignments
  where user_id = v_kelas_user and role_code = 'CLASS_REP' and is_active;
  if v_rep_role_count > 1 then raise exception 'DEMO-KELAS has multiple active CLASS_REP assignments; refusing an ambiguous update'; end if;
  if v_rep_role_count = 1 then
    select id into v_rep_role_id
    from public.role_assignments
    where user_id = v_kelas_user and role_code = 'CLASS_REP' and is_active;
  end if;
  if v_rep_role_id is null then
    insert into public.role_assignments (user_id, role_code, scope_type, scope_id, is_active)
    values (v_kelas_user, 'CLASS_REP', 'CLASS', v_class_id, true);
  else
    update public.role_assignments
    set scope_type = 'CLASS', scope_id = v_class_id, valid_until = null
    where id = v_rep_role_id;
  end if;

  if not exists (select 1 from public.role_assignments where user_id = v_mpk_user and role_code = 'MPK_OFFICER' and is_active and valid_from <= now() and (valid_until is null or valid_until > now())) then
    insert into public.role_assignments (user_id, role_code, scope_type, scope_id, is_active)
    values (v_mpk_user, 'MPK_OFFICER', 'GLOBAL', null, true);
  end if;
  if not exists (select 1 from public.role_assignments where user_id = v_admin_user and role_code = 'ADMIN' and is_active and valid_from <= now() and (valid_until is null or valid_until > now())) then
    insert into public.role_assignments (user_id, role_code, scope_type, scope_id, is_active)
    values (v_admin_user, 'ADMIN', 'GLOBAL', null, true);
  end if;

  if not exists (select 1 from public.class_memberships where student_id = v_kelas_user and class_id = v_class_id and academic_year_id = v_year_id) then raise exception 'DEMO-KELAS membership validation failed'; end if;
  if not exists (select 1 from public.role_assignments where user_id = v_kelas_user and role_code = 'CLASS_REP' and scope_type = 'CLASS' and scope_id = v_class_id and is_active) then raise exception 'DEMO-KELAS class-scoped CLASS_REP validation failed'; end if;
  if not exists (select 1 from public.role_assignments where user_id = v_mpk_user and role_code = 'MPK_OFFICER' and scope_type = 'GLOBAL' and is_active) then raise exception 'DEMO-MPK MPK_OFFICER validation failed'; end if;
  if not exists (select 1 from public.role_assignments where user_id = v_admin_user and role_code = 'ADMIN' and scope_type = 'GLOBAL' and is_active) then raise exception 'DEMO-ADMIN ADMIN validation failed'; end if;
end $$;

commit;

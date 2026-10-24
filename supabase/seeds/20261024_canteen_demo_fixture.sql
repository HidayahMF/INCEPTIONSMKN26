-- Demo-only Kantin fixture. Apply manually after reviewing.
-- Does not create auth users, change passwords, or touch non-demo accounts.
begin;
do $$
declare
  v_owner uuid;
  v_merchant_id uuid;
  v_role_id uuid;
  v_owned_count integer;
  v_role_count integer;
begin
  select user_id into v_owner from public.auth_identity_mappings where login_identifier = 'DEMO-KANTIN';
  if v_owner is null then raise exception 'DEMO-KANTIN mapping is missing'; end if;
  if (select count(*) from public.auth_identity_mappings where login_identifier = 'DEMO-KANTIN') <> 1 then raise exception 'DEMO-KANTIN mapping is ambiguous'; end if;
  if not exists (select 1 from public.profiles where user_id = v_owner and school_identifier = 'DEMO-KANTIN' and account_type = 'STAFF' and is_active) then raise exception 'DEMO-KANTIN profile is missing, inactive, or has the wrong account type'; end if;

  select count(*) into v_owned_count from public.merchants where owner_id = v_owner and merchant_type = 'CANTEEN';
  if v_owned_count > 1 then raise exception 'DEMO-KANTIN owns multiple CANTEEN merchants; refusing an ambiguous fixture'; end if;
  if v_owned_count = 1 then
    select id into v_merchant_id from public.merchants where owner_id = v_owner and merchant_type = 'CANTEEN';
    if not exists (select 1 from public.merchants where id = v_merchant_id and is_active) then raise exception 'DEMO-KANTIN CANTEEN merchant exists but is inactive'; end if;
  else
    insert into public.merchants (name, merchant_type, owner_id, is_active) values ('Kantin Demo', 'CANTEEN', v_owner, true) returning id into v_merchant_id;
  end if;

  select count(*) into v_role_count from public.role_assignments where user_id = v_owner and role_code = 'CANTEEN_VENDOR' and is_active;
  if v_role_count > 1 then raise exception 'DEMO-KANTIN has multiple active CANTEEN_VENDOR assignments'; end if;
  if v_role_count = 1 then
    select id into v_role_id from public.role_assignments where user_id = v_owner and role_code = 'CANTEEN_VENDOR' and is_active;
    update public.role_assignments set scope_type = 'MERCHANT', scope_id = v_merchant_id, valid_until = null where id = v_role_id;
  else
    insert into public.role_assignments (user_id, role_code, scope_type, scope_id, is_active) values (v_owner, 'CANTEEN_VENDOR', 'MERCHANT', v_merchant_id, true);
  end if;

  if not exists (select 1 from public.merchants where id = v_merchant_id and owner_id = v_owner and merchant_type = 'CANTEEN' and is_active) then raise exception 'DEMO-KANTIN merchant validation failed'; end if;
  if not exists (select 1 from public.role_assignments where user_id = v_owner and role_code = 'CANTEEN_VENDOR' and scope_type = 'MERCHANT' and scope_id = v_merchant_id and is_active) then raise exception 'DEMO-KANTIN merchant-scoped role validation failed'; end if;
end $$;
commit;

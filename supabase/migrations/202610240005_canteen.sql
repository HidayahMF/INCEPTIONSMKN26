create table if not exists public.merchants (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 160),
  merchant_type text not null check (merchant_type in ('CANTEEN','COOP')),
  owner_id uuid references public.profiles(user_id) on delete set null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.canteen_products (
  id uuid primary key default gen_random_uuid(),
  merchant_id uuid not null references public.merchants(id) on delete cascade,
  name text not null check (char_length(trim(name)) between 2 and 160),
  description text,
  price integer not null check (price >= 0),
  stock integer not null default 0 check (stock >= 0),
  is_available boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.canteen_orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique default ('ORD-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10))),
  merchant_id uuid not null references public.merchants(id) on delete restrict,
  student_id uuid not null references public.profiles(user_id) on delete restrict,
  status text not null default 'SUBMITTED' check (status in ('SUBMITTED','ACCEPTED','READY','COMPLETED','CANCELLED')),
  payment_method text not null default 'PAY_AT_PICKUP' check (payment_method = 'PAY_AT_PICKUP'),
  total_amount integer not null check (total_amount >= 0),
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.canteen_order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.canteen_orders(id) on delete cascade,
  product_id uuid not null references public.canteen_products(id) on delete restrict,
  product_name text not null,
  unit_price integer not null check (unit_price >= 0),
  quantity integer not null check (quantity > 0 and quantity <= 99),
  line_total integer not null check (line_total = unit_price * quantity)
);
create table if not exists public.canteen_order_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.canteen_orders(id) on delete cascade,
  actor_id uuid references public.profiles(user_id) on delete set null,
  status text not null,
  note text,
  created_at timestamptz not null default now()
);
create index if not exists canteen_products_merchant_idx on public.canteen_products(merchant_id, is_available);
create index if not exists canteen_orders_student_idx on public.canteen_orders(student_id, created_at desc);
create index if not exists canteen_orders_merchant_idx on public.canteen_orders(merchant_id, status, created_at desc);
drop trigger if exists merchants_touch_updated_at on public.merchants;
create trigger merchants_touch_updated_at before update on public.merchants for each row execute function public.touch_updated_at();
drop trigger if exists canteen_products_touch_updated_at on public.canteen_products;
create trigger canteen_products_touch_updated_at before update on public.canteen_products for each row execute function public.touch_updated_at();
drop trigger if exists canteen_orders_touch_updated_at on public.canteen_orders;
create trigger canteen_orders_touch_updated_at before update on public.canteen_orders for each row execute function public.touch_updated_at();

create or replace function public.place_canteen_order(p_student_id uuid, p_merchant_id uuid, p_items jsonb, p_note text default null)
returns public.canteen_orders language plpgsql security definer set search_path = public as $$
declare
  v_order public.canteen_orders;
  v_item jsonb;
  v_product public.canteen_products;
  v_quantity integer;
  v_total integer := 0;
begin
  if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then raise exception 'Order harus memiliki item'; end if;
  if not exists (select 1 from merchants where id = p_merchant_id and is_active) then raise exception 'Merchant tidak aktif'; end if;
  for v_item in select * from jsonb_array_elements(p_items) loop
    v_quantity := (v_item->>'quantity')::integer;
    if v_quantity is null or v_quantity < 1 or v_quantity > 99 then raise exception 'Jumlah item tidak valid'; end if;
    select * into v_product from canteen_products where id = (v_item->>'productId')::uuid and merchant_id = p_merchant_id and is_available for update;
    if not found or v_product.stock < v_quantity then raise exception 'Produk tidak tersedia atau stok tidak cukup'; end if;
    v_total := v_total + v_product.price * v_quantity;
  end loop;
  insert into canteen_orders (merchant_id, student_id, total_amount, note) values (p_merchant_id, p_student_id, v_total, nullif(trim(p_note), '')) returning * into v_order;
  for v_item in select * from jsonb_array_elements(p_items) loop
    select * into v_product from canteen_products where id = (v_item->>'productId')::uuid for update;
    v_quantity := (v_item->>'quantity')::integer;
    insert into canteen_order_items (order_id, product_id, product_name, unit_price, quantity, line_total) values (v_order.id, v_product.id, v_product.name, v_product.price, v_quantity, v_product.price * v_quantity);
    update canteen_products set stock = stock - v_quantity, is_available = case when stock - v_quantity = 0 then false else is_available end where id = v_product.id;
  end loop;
  insert into canteen_order_events (order_id, actor_id, status, note) values (v_order.id, p_student_id, 'SUBMITTED', 'Pre-order dibuat.');
  return v_order;
end $$;

revoke all on function public.place_canteen_order(uuid, uuid, jsonb, text) from public;
grant execute on function public.place_canteen_order(uuid, uuid, jsonb, text) to service_role;

alter table public.merchants enable row level security;
alter table public.canteen_products enable row level security;
alter table public.canteen_orders enable row level security;
alter table public.canteen_order_items enable row level security;
alter table public.canteen_order_events enable row level security;
create policy canteen_products_read_active on public.canteen_products for select to authenticated using (is_available and exists (select 1 from merchants m where m.id = merchant_id and m.is_active));
create policy canteen_orders_read_student on public.canteen_orders for select to authenticated using (student_id = auth.uid());
create policy canteen_order_items_read_student on public.canteen_order_items for select to authenticated using (exists (select 1 from canteen_orders o where o.id = order_id and o.student_id = auth.uid()));
create policy canteen_events_read_student on public.canteen_order_events for select to authenticated using (exists (select 1 from canteen_orders o where o.id = order_id and o.student_id = auth.uid()));

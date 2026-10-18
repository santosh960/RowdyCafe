-- Secure live menu backend. Run this in the Supabase SQL Editor.
-- Admin users must be created in Supabase Auth and explicitly assigned a role.
create extension if not exists pgcrypto;

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  category text not null check (char_length(category) between 1 and 40),
  price numeric(10,2) not null check (price > 0 and price <= 100000),
  emoji text not null default '🍽️',
  description text not null default '' check (char_length(description) <= 180),
  available boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin')),
  created_at timestamptz not null default now()
);

alter table public.menu_items enable row level security;
alter table public.user_roles enable row level security;

create or replace function public.is_cafe_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.user_roles
    where user_id = (select auth.uid()) and role = 'admin'
  );
$$;
revoke all on function public.is_cafe_admin() from public;
grant execute on function public.is_cafe_admin() to anon, authenticated;

drop policy if exists "Public can read available menu" on public.menu_items;
create policy "Public can read available menu" on public.menu_items
  for select to anon, authenticated using (available = true or public.is_cafe_admin());
drop policy if exists "Admins can insert menu" on public.menu_items;
create policy "Admins can insert menu" on public.menu_items
  for insert to authenticated with check (public.is_cafe_admin());
drop policy if exists "Admins can update menu" on public.menu_items;
create policy "Admins can update menu" on public.menu_items
  for update to authenticated using (public.is_cafe_admin()) with check (public.is_cafe_admin());
drop policy if exists "Admins can delete menu" on public.menu_items;
create policy "Admins can delete menu" on public.menu_items
  for delete to authenticated using (public.is_cafe_admin());
drop policy if exists "Users can read own role" on public.user_roles;
create policy "Users can read own role" on public.user_roles
  for select to authenticated using (user_id = (select auth.uid()));

grant select on public.menu_items to anon, authenticated;
grant insert, update, delete on public.menu_items to authenticated;
grant select on public.user_roles to authenticated;

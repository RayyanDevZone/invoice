-- Adds the `customers` table (saved "Bill To" details). Run once in the Supabase SQL Editor.
-- A user's customers: the "Bill To" details, saved so they can be reused on
-- later invoices. Same columns as businesses.
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  business_name text,
  name text, -- contact person
  address text,
  city text,
  state text,
  zip text,
  country text,
  email text,
  phone text,
  gst_reg text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists customers_user_id_idx on public.customers (user_id);

-- Row Level Security: each user can only see and change their own customers.
alter table public.customers enable row level security;

create policy "Users can view their own customers"
  on public.customers for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can add their own customers"
  on public.customers for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update their own customers"
  on public.customers for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can delete their own customers"
  on public.customers for delete
  to authenticated
  using ((select auth.uid()) = user_id);

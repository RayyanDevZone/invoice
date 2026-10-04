-- Full schema for a fresh project. Run in the Supabase dashboard:
-- SQL Editor -> New query -> paste -> Run.
-- (Upgrading an existing project? Run the files in supabase/migrations instead.)

-- A user's businesses: the "Bill From" details shown on their invoices.
-- One user can have many businesses.
create table if not exists public.businesses (
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
  -- Bank / payment details shown on invoices from this business.
  bank_name text,
  account_name text,
  account_number text,
  ifsc_code text,
  bank_address text,
  upi_qr_code text, -- QR image as a data URL
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists businesses_user_id_idx on public.businesses (user_id);

-- Row Level Security: each user can only see and change their own businesses.
alter table public.businesses enable row level security;

create policy "Users can view their own businesses"
  on public.businesses for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can add their own businesses"
  on public.businesses for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update their own businesses"
  on public.businesses for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can delete their own businesses"
  on public.businesses for delete
  to authenticated
  using ((select auth.uid()) = user_id);

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

-- Upgrade: replace the single-row `profiles` table with `businesses`
-- (many businesses per user). Run once in the Supabase SQL Editor.
-- Existing profile rows are copied across before `profiles` is dropped.

begin;

create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text,
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

-- Copy existing profiles over. `state` is added first in case it was never created.
alter table public.profiles add column if not exists state text;

insert into public.businesses (user_id, name, address, city, state, zip, country, email, phone, gst_reg, updated_at)
select id, name, address, city, state, zip, country, email, phone, gst_reg, updated_at
from public.profiles;

drop table public.profiles;

commit;

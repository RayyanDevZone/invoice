-- Items belong to a business: each business has its own item list.
-- Run once in the Supabase SQL Editor (after 005_create_items.sql).

begin;

alter table public.items
  add column if not exists business_id uuid references public.businesses (id) on delete cascade;

-- Items saved before this change go to their owner's first business.
update public.items i
set business_id = (
  select b.id from public.businesses b
  where b.user_id = i.user_id
  order by b.created_at
  limit 1
)
where business_id is null;

-- Fails (and changes nothing) if an item's owner has no business at all.
alter table public.items alter column business_id set not null;

create index if not exists items_business_id_idx on public.items (business_id);

-- Items can only be added to, or moved to, a business the user owns.
drop policy if exists "Users can add their own items" on public.items;
drop policy if exists "Users can update their own items" on public.items;

create policy "Users can add their own items"
  on public.items for insert
  to authenticated
  with check (
    (select auth.uid()) = user_id
    and exists (select 1 from public.businesses b where b.id = business_id and b.user_id = (select auth.uid()))
  );

create policy "Users can update their own items"
  on public.items for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check (
    (select auth.uid()) = user_id
    and exists (select 1 from public.businesses b where b.id = business_id and b.user_id = (select auth.uid()))
  );

commit;

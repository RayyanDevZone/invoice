-- Adds the business's own name, separate from the contact person's `name`.
-- Run once in the Supabase SQL Editor.
alter table public.businesses add column if not exists business_name text;

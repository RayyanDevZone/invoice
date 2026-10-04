-- Adds bank / payment details to each business. Run once in the Supabase SQL Editor.
-- upi_qr_code holds the QR image as a data URL (resized in the browser before saving).
alter table public.businesses
  add column if not exists bank_name text,
  add column if not exists account_name text,
  add column if not exists account_number text,
  add column if not exists ifsc_code text,
  add column if not exists bank_address text,
  add column if not exists upi_qr_code text;

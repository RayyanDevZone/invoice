import { supabase } from './supabase';

// Maps the app's sender fields to columns in the `businesses` table.
const columns = {
  businessName: 'business_name',
  name: 'name',
  address: 'address',
  city: 'city',
  state: 'state',
  zip: 'zip',
  country: 'country',
  email: 'email',
  phone: 'phone',
  gstReg: 'gst_reg',
};

export const emptyBusiness = Object.fromEntries(Object.keys(columns).map((field) => [field, '']));

const fromRow = (row) => ({
  id: row.id,
  ...Object.fromEntries(
    Object.entries(columns).map(([field, column]) => [field, row[column] ?? ''])
  ),
});

const toRow = (business) => {
  const row = { updated_at: new Date().toISOString() };
  Object.entries(columns).forEach(([field, column]) => {
    const value = (business[field] || '').trim();
    row[column] = (field === 'gstReg' ? value.toUpperCase() : value) || null;
  });
  return row;
};

// Oldest first, so the first business a user added stays at the top.
export const fetchBusinesses = async () => {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data.map(fromRow);
};

// user_id is filled in by the database from the signed-in user.
export const createBusiness = async (business) => {
  const { data, error } = await supabase
    .from('businesses')
    .insert(toRow(business))
    .select()
    .single();

  if (error) throw error;
  return fromRow(data);
};

export const updateBusiness = async (id, business) => {
  const { data, error } = await supabase
    .from('businesses')
    .update(toRow(business))
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return fromRow(data);
};

export const deleteBusiness = async (id) => {
  const { error } = await supabase.from('businesses').delete().eq('id', id);
  if (error) throw error;
};

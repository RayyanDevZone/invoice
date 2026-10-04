import { supabase } from './supabase';

// Saved items (products / services) in the `items` table. Each item belongs
// to one of the user's businesses.

export const emptyItem = { name: '', hsn: '', rate: '', unit: '' };

const fromRow = (row) => ({
  id: row.id,
  name: row.name ?? '',
  hsn: row.hsn ?? '',
  rate: row.rate === null || row.rate === undefined ? '' : String(row.rate),
  unit: row.unit ?? '',
});

const toRow = (item) => ({
  name: item.name.trim(),
  hsn: item.hsn.trim() || null,
  rate: Number(item.rate),
  unit: item.unit || null,
  updated_at: new Date().toISOString(),
});

export const fetchItems = async (businessId) => {
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('business_id', businessId)
    .order('name', { ascending: true });
  if (error) throw error;
  return data.map(fromRow);
};

// user_id is filled in by the database from the signed-in user.
export const createItem = async (businessId, item) => {
  const { data, error } = await supabase
    .from('items')
    .insert({ ...toRow(item), business_id: businessId })
    .select()
    .single();
  if (error) throw error;
  return fromRow(data);
};

export const updateItem = async (id, item) => {
  const { data, error } = await supabase.from('items').update(toRow(item)).eq('id', id).select().single();
  if (error) throw error;
  return fromRow(data);
};

export const deleteItem = async (id) => {
  const { error } = await supabase.from('items').delete().eq('id', id);
  if (error) throw error;
};

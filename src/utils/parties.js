import { supabase } from './supabase';

// Maps the app's party fields (Bill From / Bill To) to table columns. The
// `businesses` and `customers` tables share the same columns.
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

// Bank / payment details, stored only on businesses.
export const bankColumns = {
  bankName: 'bank_name',
  accountName: 'account_name',
  accountNumber: 'account_number',
  ifscCode: 'ifsc_code',
  bankAddress: 'bank_address',
  qrCode: 'upi_qr_code',
};

// Codes saved in capitals however they were typed.
const upperCaseFields = new Set(['gstReg', 'ifscCode']);

const emptyFor = (cols) => Object.fromEntries(Object.keys(cols).map((field) => [field, '']));

export const emptyParty = emptyFor(columns);
export const emptyBank = emptyFor(bankColumns);

// Load, add, update and delete rows in one of the party tables.
// user_id is filled in by the database from the signed-in user.
// `extraColumns` maps any table-specific fields beyond the shared ones.
export const partyTable = (table, extraColumns = {}) => {
  const allColumns = { ...columns, ...extraColumns };

  const fromRow = (row) => ({
    id: row.id,
    ...Object.fromEntries(
      Object.entries(allColumns).map(([field, column]) => [field, row[column] ?? ''])
    ),
  });

  const toRow = (party) => {
    const row = { updated_at: new Date().toISOString() };
    Object.entries(allColumns).forEach(([field, column]) => {
      const value = (party[field] || '').trim();
      row[column] = (upperCaseFields.has(field) ? value.toUpperCase() : value) || null;
    });
    return row;
  };

  return {
    // Oldest first, so the first one a user added stays at the top.
    fetchAll: async () => {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data.map(fromRow);
    },

    create: async (party) => {
      const { data, error } = await supabase.from(table).insert(toRow(party)).select().single();
      if (error) throw error;
      return fromRow(data);
    },

    update: async (id, party) => {
      const { data, error } = await supabase
        .from(table)
        .update(toRow(party))
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return fromRow(data);
    },

    remove: async (id) => {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
    },
  };
};

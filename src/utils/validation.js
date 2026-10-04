// Validation rules for a business on the invoice (Bill From or Bill To). Each rule returns an error
// message, or nothing when the value is valid.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Optional leading +, then digits with spaces, dashes, dots or brackets.
const PHONE = /^\+?[\d\s\-().]+$/;
const PLACE = /^[\p{L}\s.'-]+$/u;
const ZIP = /^[A-Za-z0-9][A-Za-z0-9\s-]{1,8}[A-Za-z0-9]$/;
// Indian GSTIN: 2-digit state code, PAN (5 letters, 4 digits, 1 letter), entity code, Z, checksum.
const GSTIN = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

const required = (label) => (v) => (v ? undefined : `${label} is required`);
const maxLength = (n) => (v) => (v.length > n ? `Must be ${n} characters or fewer` : undefined);

const partyRules = {
  businessName: [required('Business name'), maxLength(100)],
  name: [required('Contact name'), maxLength(100)],
  address: [required('Address'), maxLength(200)],
  city: [
    required('City'),
    maxLength(60),
    (v) => (PLACE.test(v) ? undefined : 'City can only contain letters'),
  ],
  zip: [
    required('ZIP / Postal code'),
    (v) => (ZIP.test(v) ? undefined : 'Enter a valid ZIP / postal code'),
  ],
  country: [required('Country'), maxLength(60)],
  state: [maxLength(60)],
  email: [
    required('Email'),
    (v) => (EMAIL.test(v) ? undefined : 'Enter a valid email address'),
  ],
  phone: [
    required('Phone'),
    (v) => (PHONE.test(v) ? undefined : 'Phone can only contain digits, spaces, +, - and brackets'),
    (v) => {
      const digits = v.replace(/\D/g, '').length;
      return digits >= 7 && digits <= 15 ? undefined : 'Phone must have 7 to 15 digits';
    },
  ],
  gstReg: [
    // Optional: only checked when filled in.
    (v) => (!v || GSTIN.test(v.toUpperCase()) ? undefined : 'Enter a valid 15-character GSTIN, e.g. 27ABCDE1234F1Z5'),
  ],
};

// `stateRequired` is true when the chosen country has a list of states to pick from.
export const validateParty = (party, { stateRequired = false } = {}) => {
  const errors = {};
  const rules = {
    ...partyRules,
    state: stateRequired ? [required('State'), ...partyRules.state] : partyRules.state,
  };
  Object.entries(rules).forEach(([field, rules]) => {
    const value = (party[field] || '').trim();
    for (const rule of rules) {
      const message = rule(value);
      if (message) {
        errors[field] = message;
        break;
      }
    }
  });
  return errors;
};

// Bank details are optional, but checked when filled in.
const IFSC = /^[A-Z]{4}0[A-Z0-9]{6}$/;

const bankRules = {
  bankName: [maxLength(100)],
  accountName: [maxLength(100)],
  accountNumber: [
    (v) => (!v || /^\d{9,18}$/.test(v) ? undefined : 'Account number must be 9 to 18 digits'),
  ],
  ifscCode: [
    (v) => (!v || IFSC.test(v.toUpperCase()) ? undefined : 'Enter a valid 11-character IFSC, e.g. SBIN0001234'),
  ],
  bankAddress: [maxLength(200)],
};

export const validateBank = (bank) => {
  const errors = {};
  Object.entries(bankRules).forEach(([field, rules]) => {
    const value = (bank[field] || '').trim();
    for (const rule of rules) {
      const message = rule(value);
      if (message) {
        errors[field] = message;
        break;
      }
    }
  });
  return errors;
};

// A saved item: name, HSN / SAC code, rate and unit.
const HSN = /^\d{4}(\d{2}){0,2}$/;

const itemRules = {
  name: [required('Item name'), maxLength(100)],
  hsn: [(v) => (!v || HSN.test(v) ? undefined : 'HSN / SAC must be 4, 6 or 8 digits')],
  rate: [
    required('Rate'),
    (v) => (/^\d+(\.\d{1,2})?$/.test(v) ? undefined : 'Enter a valid amount, up to 2 decimal places'),
    (v) => (Number(v) <= 9999999999 ? undefined : 'Rate is too large'),
  ],
  unit: [required('Unit')],
};

export const validateItem = (item) => {
  const errors = {};
  Object.entries(itemRules).forEach(([field, rules]) => {
    const value = String(item[field] ?? '').trim();
    for (const rule of rules) {
      const message = rule(value);
      if (message) {
        errors[field] = message;
        break;
      }
    }
  });
  return errors;
};

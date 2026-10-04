// Validation rules for the "Bill From" profile. Each rule returns an error
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

const senderRules = {
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
export const validateSender = (sender, { stateRequired = false } = {}) => {
  const errors = {};
  const rules = {
    ...senderRules,
    state: stateRequired ? [required('State'), ...senderRules.state] : senderRules.state,
  };
  Object.entries(rules).forEach(([field, rules]) => {
    const value = (sender[field] || '').trim();
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

// Currency list backed by the free, key-less exchangerate-api.com "open" mirror
// (https://www.exchangerate-api.com/docs/free) for the set of valid ISO codes,
// with human-readable names resolved locally via Intl.DisplayNames (no second API needed).
const CURRENCIES_ENDPOINT = 'https://open.er-api.com/v6/latest/USD';

export const FALLBACK_CURRENCIES = [
  { value: 'INR', label: 'INR — Indian Rupee' },
  { value: 'USD', label: 'USD — US Dollar' },
  { value: 'AED', label: 'AED — UAE Dirham' },
  { value: 'EUR', label: 'EUR — Euro' },
  { value: 'GBP', label: 'GBP — British Pound' },
];

let cachedCurrencies = null;

export async function fetchCurrencies() {
  if (cachedCurrencies) return cachedCurrencies;

  const response = await fetch(CURRENCIES_ENDPOINT);
  if (!response.ok) throw new Error(`Currency API responded with ${response.status}`);
  const data = await response.json();
  const codes = Object.keys(data.rates || {});
  if (codes.length === 0) throw new Error('Currency API returned no rates');

  const displayNames =
    typeof Intl !== 'undefined' && Intl.DisplayNames
      ? new Intl.DisplayNames(['en'], { type: 'currency' })
      : null;

  cachedCurrencies = codes
    .map((code) => {
      let name;
      try {
        name = displayNames?.of(code);
      } catch {
        name = undefined;
      }
      return { value: code, label: name ? `${code} — ${name}` : code };
    })
    .sort((a, b) => a.value.localeCompare(b.value));

  return cachedCurrencies;
}

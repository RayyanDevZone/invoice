// Countries and their states from the free CountriesNow API (no key needed).
// The full list is fetched once per page load and shared by every form.
const API_URL = 'https://countriesnow.space/api/v0.1/countries/states';

let request = null;

export const loadCountries = () => {
  if (!request) {
    request = fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Countries request failed (${res.status})`);
        return res.json();
      })
      .then((json) => {
        if (json.error || !Array.isArray(json.data)) throw new Error(json.msg || 'Invalid countries response');
        return json.data
          .map((c) => ({ name: c.name, states: c.states.map((s) => s.name) }))
          .sort((a, b) => a.name.localeCompare(b.name));
      })
      .catch((error) => {
        // Let the next caller retry instead of caching the failure.
        request = null;
        throw error;
      });
  }
  return request;
};

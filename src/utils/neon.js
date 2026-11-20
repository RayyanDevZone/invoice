import { createClient } from '@neon/neon-js';
import { BetterAuthReactAdapter } from '@neon/neon-js/auth/react/adapters';

// Neon client: `client.auth` is Neon Auth (Better Auth) and `client.from(...)`
// queries Postgres through the Neon Data API with the signed-in user's token,
// so row-level security limits every query to that user's rows.
export const client = createClient({
  auth: {
    adapter: BetterAuthReactAdapter(),
    url: import.meta.env.VITE_NEON_AUTH_URL,
  },
  dataApi: {
    url: import.meta.env.VITE_NEON_DATA_API_URL,
  },
});

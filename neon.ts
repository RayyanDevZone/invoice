import { defineConfig } from "@neon/config/v1";

// Neon services for BillEase: login (Neon Auth) and the Data API, which the
// browser uses for `client.from(...)` queries (protected by row-level security).
export default defineConfig({
  auth: true,
  dataApi: true,
});

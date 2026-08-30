# BillEase — Professional-Grade Revamp Checklist

Tracking checklist for taking BillEase from prototype to production-grade software.
Check items off as they're completed. Items are grouped by section; within each
section, roughly ordered by priority (top = do first).

---

## 1. Security & Authentication

- [ ] Remove hardcoded plaintext credentials from [`src/Users.js`](src/Users.js) — currently shipped in the client JS bundle and readable by anyone via devtools/view-source
- [ ] Replace client-side "auth" with a real backend: server-issued session/JWT, password hashing (bcrypt/argon2), HTTPS-only cookies or secure token storage
- [ ] Add rate limiting / lockout on login attempts once a real backend exists
- [ ] Remove/rotate the two credential pairs currently hardcoded (`Admin@2811`, `Ajaz8882`) — treat as compromised since they're in source
- [ ] Add environment-based config (`.env`) for API URLs, keys — never commit secrets
- [ ] Add a `SECURITY.md` / basic threat model note (single-tenant vs multi-tenant, what data is sensitive — invoices contain PII/financial info)
- [ ] Sanitize/validate all user input server-side once persistence exists (not just client-side `required` attributes)
- [ ] Add Content Security Policy headers for production deployment

## 2. Backend & Data Persistence

- [ ] Decide on and stand up a real backend (Node/Express, or serverless functions) — currently `mongodb` is a dependency but is **never imported or used** anywhere in `src/`
- [ ] Design a proper data model: Users, Invoices, Clients/Receivers, Line Items — persisted server-side, not just React context
- [ ] Persist invoices so users can save drafts, list past invoices, edit/reuse them (currently everything is lost on refresh except logo/QR which live oddly in `localStorage`)
- [ ] Move logo & QR code storage out of raw `localStorage` — either bundle into `invoiceData`/context consistently, or upload to backend/object storage (S3-compatible)
- [ ] Fix the logo/QR + context desync bug: on "New Invoice" or refresh, the form resets but the old logo/QR silently persists from `localStorage` — decide correct behavior and implement it deliberately
- [ ] Add multi-invoice / multi-client support (list view, search, filter by date/client/status)
- [ ] Add invoice numbering strategy (auto-increment, per-client sequences, configurable prefix) instead of manual free-text entry
- [ ] Add pagination/limits once invoice history exists

## 3. State Management

- [ ] Replace the single flat `InvoiceContext` `useState` blob with a more scalable pattern (`useReducer`, or a lightweight store like Zustand) as the data model grows
- [ ] Normalize `sender`/`receiver` objects to avoid `invoiceData.receiver.name` crashing when `receiver` is set to `{}` (see `handleNewInvoice` in [`InvoiceContainer.jsx`](src/components/InvoiceContainer/InvoiceContainer.jsx) — clears receiver to `{}`, but `Invoice.jsx` reads `invoiceData.receiver.name` unguarded elsewhere)
- [ ] Add a single source of truth for "currency" (currently only set in `InvoiceDetails.jsx`; other components silently allow `invoiceData.currency` to be `undefined` early in the flow)
- [ ] Persist wizard progress to `localStorage`/`sessionStorage` (or backend draft) so a refresh mid-invoice doesn't lose all entered data

## 4. Data Validation & Error Handling

- [ ] Add real form validation (required fields, email format, numeric ranges, positive quantities/rates) with visible inline error messages — currently relies only on HTML `required`
- [ ] Guard against `NaN`/empty math: `item.total.toFixed(2)` and `calculateTotal()` in [`Invoice.jsx`](src/components/Invoice/Invoice.jsx) will silently render `"NaN"` if quantity/rate are left blank
- [ ] Validate GST/tax registration numbers, IFSC codes, account numbers with proper format checks (currently free-text)
- [ ] Add a React Error Boundary around the app so a render error doesn't blank the whole page
- [ ] Add try/catch + user-facing error toasts/messages for PDF generation failures (currently only `console.error` in [`InvoiceContainer.jsx`](src/components/InvoiceContainer/InvoiceContainer.jsx))
- [ ] Handle image upload edge cases: file size limits, invalid file types, oversized base64 in `localStorage` (quota errors currently unhandled)

## 5. Testing

- [ ] Fix/replace the default CRA test in [`src/App.test.js`](src/App.test.js) — it asserts `"learn react"` text that doesn't exist in this app; test currently fails or is meaningless
- [ ] Add unit tests for calculation logic (`calculateSubtotal`, `calculateTotal`, discount/tax/shipping math, `totalInWords`)
- [ ] Add component tests for each wizard step (React Testing Library): field updates propagate to context correctly
- [ ] Add integration test for the full wizard flow (Personal Info → ... → PDF generation)
- [ ] Add tests for `ProtectedRoute` (redirect when unauthenticated, render when authenticated)
- [ ] Set up test coverage reporting and a minimum coverage threshold
- [ ] Add CI to run tests automatically on push/PR

## 6. Code Quality & Tooling

- [ ] Initialize git (`git init`) and commit — **there is currently no version control at all**
- [ ] Set up ESLint with a strict config (beyond CRA defaults) + Prettier for consistent formatting
- [ ] Add pre-commit hooks (Husky + lint-staged) to run lint/format/tests before commit
- [ ] Remove unused dependency `mongodb` from [`package.json`](package.json) (or wire it up if a backend is added)
- [ ] Convert `.jsx`/`.js` to TypeScript incrementally for type safety on `invoiceData` shape, props, and API responses
- [ ] Extract repeated Tailwind class strings (e.g. the same input styling repeated in every field) into shared components (`<TextField>`, `<FormRow>`) to reduce duplication across `PersonalInfo`, `InvoiceDetails`, `ItemsLine`, `PaymentInfo`
- [ ] Extract the currency-input/no-spinners number pattern into a reusable `<NumberField>` component
- [ ] Remove dead/inconsistent state (`Summary.jsx` toggles `isDiscountEnabled` locally but discount/tax/shipping values already exist in `invoiceData` — decide single source of truth)
- [ ] Add PropTypes or TS types to shared components (`DiscountField`, `TaxField`, `ShippingField`)

## 7. UI/UX & Accessibility

- [ ] Add proper labeled `<textarea>` binding for item **Description** in [`ItemsLine.jsx`](src/components/ItemsLine/ItemsLine.jsx) — it's currently unbound to state (typing there does nothing, and it never appears on the invoice)
- [ ] Audit color contrast (white text on `#020817`, gray placeholders) against WCAG AA
- [ ] Add `aria-label`s / associate all inputs with visible `<label htmlFor>` consistently (a few are already good, some are missing, e.g. item description textarea)
- [ ] Add keyboard navigation support and visible focus states throughout the wizard
- [ ] Add loading states (spinners/disabled buttons) during PDF generation instead of an unresponsive button
- [ ] Add a progress indicator showing which of the 6 wizard steps the user is on (currently only inferred from active nav button)
- [ ] Make the wizard step nav bar ([`Buttons.jsx`](src/components/Buttons/Buttons.jsx)) reflect active state via React Router (`useLocation`) instead of directly reading `window.location.pathname` (won't re-render reliably on client-side nav)
- [ ] Responsive audit: test full flow on mobile widths (some components use fixed pixel widths like `w-[400px]`, `w-[450px]` that may overflow small screens)
- [ ] Replace browser `alert`-style silent failures with proper toast/notification system
- [ ] Add confirmation dialog before "New Invoice" discards current data

## 8. PDF / Invoice Output Quality

- [ ] Improve PDF generation to support multi-page invoices (currently a single `html2canvas` snapshot stretched into one A4 page — long item lists will overflow/clip)
- [ ] Make item descriptions actually render on the invoice (currently captured nowhere, see §7)
- [ ] Add print-optimized layout / verify `react-to-print` (already a dependency) is actually used, or remove it if superseded by the `html2canvas`+`jsPDF` approach
- [ ] Support invoice templates/themes (currently one hardcoded layout)
- [ ] Add company logo aspect-ratio handling (currently `<img>` with no object-fit constraint, can distort)
- [ ] Localize currency formatting properly (e.g. `Intl.NumberFormat`) instead of manual string concatenation of amount + currency code
- [ ] Verify `num2words` output for non-English locales if multi-currency/multi-region support is a goal

## 9. Performance

- [ ] Memoize expensive calculations (`calculateSubtotal`, `calculateTotal`) with `useMemo` instead of recomputing on every render
- [ ] Lazy-load routes (`React.lazy` + `Suspense`) to reduce initial bundle size
- [ ] Compress/resize uploaded logo & QR images before storing as base64 (currently stores raw uploaded file, can bloat `localStorage` and slow PDF rendering)
- [ ] Audit bundle size (`npm run build` + source-map-explorer) and remove unused deps

## 10. DevOps, Build & Deployment

- [ ] Set up a proper CI/CD pipeline (GitHub Actions or similar): lint → test → build → deploy
- [ ] Choose and configure a hosting target (Vercel/Netlify/S3+CloudFront) with environment-specific builds
- [ ] Add environment variable support for dev/staging/prod (API base URLs, feature flags)
- [ ] Add versioning/changelog (`CHANGELOG.md`) and semantic version bumps
- [ ] Add error monitoring (Sentry or similar) for production error visibility
- [ ] Add basic analytics (privacy-respecting) if usage insight is desired

## 11. Documentation

- [ ] Replace the boilerplate [`README.md`](README.md) (still default Create React App text) with real project docs: what BillEase does, setup instructions, screenshots
- [ ] Document the `invoiceData` shape (fields, required vs optional) as a reference for contributors
- [ ] Add `CONTRIBUTING.md` if this will be open to other contributors
- [ ] Add inline JSDoc for non-obvious calculation logic (discount → tax → shipping order of operations in `calculateTotal`)

## 12. Feature Enhancements (Nice-to-Have, post-hardening)

- [ ] Multi-currency invoices with live exchange rate lookup (optional)
- [ ] Recurring invoices / templates for repeat clients
- [ ] Email invoice directly to receiver (requires backend + email service)
- [ ] Multi-user accounts with role-based access (owner/staff)
- [ ] Invoice status tracking (draft/sent/paid/overdue)
- [ ] Dashboard with basic revenue analytics
- [ ] Dark/light theme toggle (currently dark-only, hardcoded colors)
- [ ] Export to formats beyond PDF (CSV of line items, PNG)

---

## Suggested Order of Attack

1. **Foundations first:** git init + commit, fix broken test, add ESLint/Prettier, remove unused `mongodb` dep
2. **Fix correctness bugs:** item description binding, NaN math guards, receiver-reset bug, active-nav-tab bug
3. **Security:** remove hardcoded creds, plan real auth/backend
4. **Backend & persistence:** stand up API + DB, migrate off ad-hoc `localStorage`
5. **UX polish & accessibility**
6. **Testing & CI**
7. **Feature enhancements**

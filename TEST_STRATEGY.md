# Test Strategy: SadamaAgent Platform

## 1. Discovery & Business Model
Based on the codebase analysis, the **SadamaAgent Platform** is a Next.js 16 application with a Supabase backend (PostgreSQL + Auth). It handles maritime berth reservations.

### Actors
1. **Port Operator / Agent**: Owns ports and manages berths and bookings.
2. **Admin**: System-wide administrative overview (implied).

### Core Entities
- **Ports**: Contain multiple berths and belong to an owner.
- **Berths**: Managed entities with specific properties (length, draft, price) and statuses (`available`, `occupied`, `maintenance`).
- **Bookings**: Reservations for berths made by agents/users.

### Critical Paths (P0)
1. **Authentication**: Secure login and session management via Supabase.
2. **Booking Management**: Viewing, creating, and updating booking states.
3. **Berth Management**: Viewing, adding, and modifying berth details and statuses.
4. **Dashboard Overview**: Accurate surfacing of stats (Total Berths, Active Bookings, Occupancy Rate).

---

## 2. Scope & Objectives
The goal is to build a scalable, maintainable test suite that verifies the critical paths of the application without being tightly coupled to implementation details. 

**Objectives:**
- Validate core user journeys (E2E).
- Ensure data integrity and correct business logic (Integration).
- Verify isolated UI behavior and localization (Component).

---

## 3. Test Types & Toolchain Rationale

### Toolchain
- **E2E**: `Playwright`
  - *Rationale*: Industry standard for modern web apps. Excellent support for Next.js, built-in auto-waiting, robust HTML reporting, and supports the Page Object Model (POM) pattern perfectly.
- **Unit / Integration**: `Vitest`
  - *Rationale*: Extremely fast, native TypeScript support, and integrates seamlessly with Vite/Next.js tooling. Faster and easier to configure than Jest.
- **Component**: `Vitest` + `@testing-library/react`
  - *Rationale*: Encourages testing from the user's perspective (accessibility, roles) rather than implementation details (CSS classes).
- **Reporting & Logging**: 
  - Playwright HTML reporter (built-in).
  - `vitest-html-reporter` for unit/integration tests.
  - Custom JSON logger writing to `/tests/logs/` for historical tracking.

---

## 4. Coverage Targets
- **E2E**: 100% of Critical Paths (P0) listed above.
- **Integration**: 85%+ coverage on Supabase service interactions and API route handlers.
- **Component**: 80%+ coverage on interactive UI components in `/components` (e.g., StatsCard, Data Tables).
- **Unit**: 90%+ on pure utilities and validation schemas (`/lib/validations.ts`).

---

## 5. Risk-Ranked Test Areas (Execution Order)

We will implement the tests in the following order based on business risk:

1. **Authentication & Session (P0)**
   - *Risk*: Users cannot access the dashboard.
   - *Tests*: Login flow, unauthorized redirection, logout.
2. **Dashboard Overview (P0)**
   - *Risk*: Incorrect business data displayed to port operators.
   - *Tests*: Stats aggregation, activity feed rendering.
3. **Berth Management (P1)**
   - *Risk*: Operators cannot update inventory availability.
   - *Tests*: View berth list, edit berth status/price.
4. **Booking Management (P1)**
   - *Risk*: Revenue-impacting failure in reservation tracking.
   - *Tests*: View bookings, filter by status, approve/reject flow.
5. **Localization & Settings (P2)**
   - *Risk*: UI degradation in different languages (Estonian/English).
   - *Tests*: Language switching, profile settings.

---

## 6. Directory Structure Principle

We will enforce the following scalable structure:
```text
/tests/
  ├── e2e/              # Playwright E2E specs
  ├── integration/      # API and DB integration tests (Vitest)
  ├── unit/             # Utility and validation tests (Vitest)
  ├── components/       # UI component tests (Vitest + RTL)
  ├── fixtures/         # Test data, factories, mocked responses
  ├── helpers/          # Playwright POMs, auth helpers, reusable test logic
  ├── logs/             # Custom JSON run logs
  └── README.md         # Instructions for running and extending tests
```

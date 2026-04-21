# SadamaAgent Test Suite

This directory contains the automated test suite for the SadamaAgent Platform. It is divided into Unit, Component, Integration, and E2E tests to ensure maximum coverage and reliability.

## Directory Structure

- `e2e/`: Playwright E2E specs
- `integration/`: API and DB integration tests (Vitest)
- `unit/`: Utility and validation tests (Vitest)
- `components/`: UI component tests (Vitest + React Testing Library)
- `fixtures/`: Test data, factories, mocked responses
- `helpers/`: Playwright Page Object Models (POMs), auth helpers, reusable test logic
- `logs/`: Custom JSON run logs and generated reports

## How to Run Tests

### Unit, Component & Integration (Vitest)
Run all tests:
```bash
npm run test:unit
```
Run with UI:
```bash
npx vitest --ui
```

### End-to-End (Playwright)
Ensure your local dev server is running before executing E2E tests:
```bash
npm run dev
```
Then run the tests:
```bash
npm run test:e2e
```
View the report:
```bash
npm run test:report
```

## Adding New Tests

- **E2E**: Add a new `.spec.ts` file in `tests/e2e/`. Use the Page Object Model pattern by creating or extending classes in `tests/helpers/`.
- **Component**: Add a `.test.tsx` file in `tests/components/` next to your component tests. Use React Testing Library methods like `screen.getByRole()`.
- **Unit/Integration**: Add a `.test.ts` file in `tests/unit/` or `tests/integration/`.

Make sure to tag Playwright tests (e.g., `@smoke`, `@dashboard`) inside the `test.describe()` block.

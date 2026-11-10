# Contributing

Thanks for taking a look. This repo is a small set of TypeScript coding
challenges with Bun tests.

## Setup

```bash
bun install
```

Requires Bun 1.3 or newer.

## Before opening a pull request

```bash
bun run typecheck
bun run test:ci
```

`test:ci` runs the full suite without stopping at the first failure.

## Adding a challenge

1. Create a folder named `question-<letter>-<topic>`.
2. Add `README.md` with the statement, examples, constraints, and a complexity
   target.
3. Add `<name>.ts` with the exported signature and a stub that throws
   `Not implemented`.
4. Add `<name>.test.ts` with example, edge-case, and randomized tests. Prefer a
   brute-force reference implementation for cross-checking where practical.
5. Add a reference implementation under `solutions/`.
6. Add a row to the challenge table in the root `README.md`.

New challenge tests should fail against the stub and pass against the
reference solution.

## Style

- TypeScript with `strict` and `noUncheckedIndexedAccess` (see `tsconfig.json`).
- No runtime dependencies; Bun's built-in test runner only.
- Keep tests deterministic. Use the seeded PRNG pattern from the existing
  suites instead of unseeded randomness.
- Match the formatting of the surrounding files.

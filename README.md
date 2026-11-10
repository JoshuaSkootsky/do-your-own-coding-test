# Coding Challenges (TypeScript)

Three interview-style coding challenges, each with its own problem statement,
a typed stub, and a thorough test suite. The tests fail until you implement
the function — that red state is the starting point, not a broken repo.

## Challenges

| # | Challenge | Topic | Target complexity |
| --- | --- | --- | --- |
| A | [Merge Intervals](question-a-array/README.md) | Arrays / sorting | `O(n log n)` time, `O(n)` space |
| B | [Find First and Last Position](question-b-double-binary-search/README.md) | Binary search | `O(log n)` time, `O(1)` extra space |
| C | [Combination Sum II](question-c-backtracking/README.md) | Backtracking | exponential, pruned by partial sum |

Each challenge folder contains:

- `README.md` — problem statement, examples, constraints, and complexity target
- `<name>.ts` — the stub to implement
- `<name>.test.ts` — the tests

## Quick start

Requires [Bun](https://bun.com) 1.3 or newer.

```bash
bun install
bun run test
```

`bun run test` is fail-fast: it stops at the first failing test, which keeps
the practice loop tight. When you want the full picture:

```bash
bun run test:ci      # run every test, no early exit
bun run typecheck    # tsc --noEmit
```

> Note: `bun test` is Bun's built-in runner and does not read the `test`
> script. Use `bun run test` or `bun run test:ci` to get the behavior above.

## Repository layout

```
question-a-array/
  README.md
  mergeIntervals.ts          <- implement this
  mergeIntervals.test.ts
question-b-double-binary-search/
  ...
question-c-backtracking/
  ...
solutions/                   <- reference implementations
```

## Test design

Each suite mixes:

- example and edge-case tests
- a brute-force reference implementation cross-checked against yours on
  randomized inputs
- complexity guards where relevant (for example, a large-array timing test)

Randomized tests use a seeded PRNG. Override the seed to explore more inputs:

```bash
TEST_SEED=42 bun run test
```

## Reference solutions

Completed implementations live in [`solutions/`](solutions/). Try each
challenge before looking; when you want to compare, copy the matching file
over the stub. If you would rather not see them at all, delete the folder or
add it to your local ignore rules.

## Why no CI?

The default branch is intentionally a red scaffold: tests fail until the
challenges are solved. A CI workflow would therefore fail on every push to
`main`, so none is configured. Run `bun run test:ci` locally before sharing a
solution.

## Contributing

Issues and pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE) © 2026 Joshua Skootsky

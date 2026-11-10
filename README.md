# Do Your Own Coding Test

Three interview-style TypeScript challenges. Each one ships with a problem
statement, a typed stub, and a test suite that **fails until you implement
it**. The default branch is a red scaffold on purpose — a passing suite means
you are done.

New here? Run `bun run guide` for a tour of the repo, the three challenges,
and the files to read, edit, and test for each.

## Workflow

1. Clone and install:

   ```bash
   git clone https://github.com/JoshuaSkootsky/do-your-own-coding-test.git
   cd do-your-own-coding-test
   bun install
   ```

2. Run the guide to get oriented:

   ```bash
   bun run guide
   ```

3. Pick a challenge from the table below and read its `README.md`.
4. Implement the function in the matching `<name>.ts` file.
5. Run the tests:

   ```bash
   bun run test
   ```

   This is fail-fast: it stops at the first failing test, which keeps the
   practice loop tight.

6. When you want the full picture, run the whole suite and type-check:

   ```bash
   bun run test:ci
   bun run typecheck
   ```

Requires [Bun](https://bun.com) 1.3 or newer.

## The challenges

| # | Challenge | Topic | Target complexity |
| --- | --- | --- | --- |
| A | [Merge Intervals](question-a-array/README.md) | Arrays / sorting | `O(n log n)` time, `O(n)` space |
| B | [Find First and Last Position](question-b-double-binary-search/README.md) | Binary search | `O(log n)` time, `O(1)` extra space |
| C | [Combination Sum II](question-c-backtracking/README.md) | Backtracking | exponential, pruned by partial sum |

Each challenge folder contains the same three files:

```
question-a-array/
  README.md                  problem statement, examples, constraints
  mergeIntervals.ts          stub to implement
  mergeIntervals.test.ts     tests
```

## Scripts

| Command | What it does |
| --- | --- |
| `bun run guide` | Walks through the repo, the challenges, and the files to read and edit |
| `bun run test` | Runs tests and stops at the first failure (`--bail=1`) |
| `bun run test:ci` | Runs the complete suite with no early exit |
| `bun run typecheck` | Runs `tsc --noEmit` |

> `bun test` is Bun's built-in runner and does not read the `test` script.
> Use `bun run test` or `bun run test:ci` to get the behavior above.

## Test design

Each suite mixes:

- example and edge-case tests
- a brute-force reference implementation cross-checked against yours on
  randomized inputs
- complexity guards where relevant (for example, a large-array timing test)

Randomized tests use a seeded PRNG, so failures are reproducible. Override the
seed to explore more inputs:

```bash
TEST_SEED=42 bun run test
```

## Reference solutions

Completed implementations live in [`solutions/`](solutions/). They are public,
so try each challenge before looking. When you want to compare, copy the
matching file over the stub. If you would rather not see them at all, delete
the folder or add it to your local ignore rules.

## Why no CI?

The default branch is intentionally red: the tests fail until the challenges
are solved, so a CI workflow would fail on every push to `main`. Run
`bun run test:ci` locally before sharing a solution.

## Contributing

Issues and pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE) © 2026 Joshua Skootsky

/**
 * Find all unique combinations in `candidates` that sum to `target`.
 *
 * Each candidate may be used at most once. The input is sorted so that
 * duplicates are adjacent (skipped at the same recursion depth) and so that
 * a partial sum exceeding `target` lets us stop scanning entirely.
 *
 * Assumes non-negative candidates (per the problem constraints): the
 * `value > remaining` early exit is only sound when later values cannot be
 * smaller than the current one.
 */
export function combinationSum2(
  candidates: readonly number[],
  target: number,
): number[][] {
  const sorted = [...candidates].sort((a, b) => a - b);
  const results: number[][] = [];
  const path: number[] = [];

  const backtrack = (start: number, remaining: number): void => {
    if (remaining === 0) {
      results.push([...path]);
      return;
    }

    for (let i = start; i < sorted.length; i++) {
      const value = sorted[i]!;
      // Safe to stop early only because `sorted` is ascending: every later
      // value is >= value and therefore also > remaining.
      if (value > remaining) break;
      // Skip duplicates at this depth only; the same value may still be
      // picked again at deeper levels (i + 1), which produces distinct
      // multisets such as [1, 1, 6].
      if (i > start && sorted[i - 1] === value) continue;
      path.push(value);
      backtrack(i + 1, remaining - value);
      path.pop();
    }
  };

  backtrack(0, target);
  return results;
}

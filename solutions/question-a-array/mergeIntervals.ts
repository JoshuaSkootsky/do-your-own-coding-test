export type Interval = [number, number];

/**
 * Merge all overlapping intervals.
 *
 * Sorts by start, then performs a single linear sweep, extending the last
 * merged interval while the next one overlaps it.
 */
export function mergeIntervals(intervals: readonly Interval[]): Interval[] {
  if (intervals.length === 0) return [];

  const sorted: Interval[] = intervals
    .map(([start, end]): Interval => [start, end])
    .sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  const merged: Interval[] = [];
  let current = sorted[0]!;
  merged.push(current);

  for (let i = 1; i < sorted.length; i++) {
    const next = sorted[i]!;
    if (next[0] <= current[1]) {
      current[1] = Math.max(current[1], next[1]);
    } else {
      current = [next[0], next[1]];
      merged.push(current);
    }
  }

  return merged;
}

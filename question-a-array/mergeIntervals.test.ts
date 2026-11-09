import { describe, expect, test } from "bun:test";
import { mergeIntervals, type Interval } from "./mergeIntervals.ts";

/** mulberry32: seeded PRNG so a randomized failure can be reproduced. */
function makeRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Override with TEST_SEED=<n> to explore different inputs. */
const random = makeRandom(Number(process.env["TEST_SEED"] ?? 1));

/** Straightforward O(n^2) reference implementation used to cross-check. */
function bruteForce(intervals: readonly Interval[]): Interval[] {
  const points: Interval[] = intervals.map(([s, e]) => [s, e]);
  let changed = true;
  while (changed) {
    changed = false;
    outer: for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const a = points[i]!;
        const b = points[j]!;
        if (a[0] <= b[1] && b[0] <= a[1]) {
          const merged: Interval = [
            Math.min(a[0], b[0]),
            Math.max(a[1], b[1]),
          ];
          points.splice(j, 1);
          points[i] = merged;
          changed = true;
          break outer;
        }
      }
    }
  }
  return points.sort((a, b) => a[0] - b[0]);
}

describe("mergeIntervals", () => {
  test("empty input", () => {
    expect(mergeIntervals([])).toEqual([]);
  });

  test("single interval is returned unchanged", () => {
    expect(mergeIntervals([[1, 4]])).toEqual([[1, 4]]);
  });

  test("merges overlapping intervals", () => {
    expect(
      mergeIntervals([
        [1, 3],
        [2, 6],
        [8, 10],
        [15, 18],
      ]),
    ).toEqual([
      [1, 6],
      [8, 10],
      [15, 18],
    ]);
  });

  test("touching intervals merge (half-open adjacency)", () => {
    expect(
      mergeIntervals([
        [1, 4],
        [4, 5],
      ]),
    ).toEqual([[1, 5]]);
  });

  test("does not mutate the input array", () => {
    const input: Interval[] = [
      [5, 6],
      [1, 2],
    ];
    const snapshot = input.map((iv) => [...iv] as Interval);
    mergeIntervals(input);
    expect(input).toEqual(snapshot);
  });

  test("already sorted disjoint intervals stay the same", () => {
    expect(
      mergeIntervals([
        [1, 2],
        [3, 4],
        [5, 6],
      ]),
    ).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
  });

  test("completely contained intervals collapse", () => {
    expect(
      mergeIntervals([
        [1, 10],
        [2, 3],
        [4, 5],
        [6, 7],
      ]),
    ).toEqual([[1, 10]]);
  });

  test("unsorted input", () => {
    expect(
      mergeIntervals([
        [8, 10],
        [1, 3],
        [15, 18],
        [2, 6],
      ]),
    ).toEqual([
      [1, 6],
      [8, 10],
      [15, 18],
    ]);
  });

  test("identical intervals collapse to one", () => {
    expect(
      mergeIntervals([
        [2, 2],
        [2, 2],
        [2, 2],
      ]),
    ).toEqual([[2, 2]]);
  });

  test("nested then chained", () => {
    expect(
      mergeIntervals([
        [1, 10],
        [2, 4],
        [5, 7],
        [7, 9],
      ]),
    ).toEqual([[1, 10]]);
  });

  test("cross-check against brute force on random inputs", () => {
    for (let run = 0; run < 200; run++) {
      const count = 1 + Math.floor(random() * 12);
      const intervals: Interval[] = [];
      for (let i = 0; i < count; i++) {
        const start = Math.floor(random() * 30);
        const end = start + Math.floor(random() * 10);
        intervals.push([start, end]);
      }
      const inputCopy = intervals.map((iv) => [...iv] as Interval);
      expect(mergeIntervals(intervals)).toEqual(bruteForce(intervals));
      expect(intervals).toEqual(inputCopy);
    }
  });
});

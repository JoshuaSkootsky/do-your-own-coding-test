import { describe, expect, test } from "bun:test";
import { combinationSum2 } from "./combinationSum2.ts";

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
const random = makeRandom(Number(process.env["TEST_SEED"] ?? 3));

/** Sort inner arrays then the outer list so comparisons ignore ordering. */
function normalize(combos: readonly (readonly number[])[]): number[][] {
  return combos
    .map((c) => [...c].sort((a, b) => a - b))
    .sort((a, b) => {
      for (let i = 0; i < Math.min(a.length, b.length); i++) {
        const diff = a[i]! - b[i]!;
        if (diff !== 0) return diff;
      }
      return a.length - b.length;
    });
}

/** Enumerate every subset by brute force, deduped by multiset. */
function bruteForce(candidates: readonly number[], target: number): number[][] {
  const seen = new Set<string>();
  const found: number[][] = [];
  const total = 1 << candidates.length;
  for (let mask = 0; mask < total; mask++) {
    const combo: number[] = [];
    let sum = 0;
    for (let i = 0; i < candidates.length; i++) {
      if (mask & (1 << i)) {
        combo.push(candidates[i]!);
        sum += candidates[i]!;
      }
    }
    if (sum !== target) continue;
    const sortedCombo = [...combo].sort((a, b) => a - b);
    const key = sortedCombo.join(",");
    if (seen.has(key)) continue;
    seen.add(key);
    found.push(sortedCombo);
  }
  return found;
}

describe("combinationSum2", () => {
  test("empty candidates", () => {
    expect(combinationSum2([], 7)).toEqual([]);
  });

  test("no combination reaches the target", () => {
    expect(combinationSum2([2, 4, 6], 5)).toEqual([]);
  });

  test("exact single match", () => {
    expect(normalize(combinationSum2([5], 5))).toEqual([[5]]);
  });

  test("single element smaller than target", () => {
    expect(combinationSum2([5], 10)).toEqual([]);
  });

  test("classic duplicate example", () => {
    expect(normalize(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8))).toEqual(
      normalize([
        [1, 1, 6],
        [1, 2, 5],
        [1, 7],
        [2, 6],
      ]),
    );
  });

  test("second classic example", () => {
    expect(normalize(combinationSum2([2, 5, 2, 1, 2], 5))).toEqual(
      normalize([
        [1, 2, 2],
        [5],
      ]),
    );
  });

  test("each number usable only once", () => {
    expect(combinationSum2([3], 9)).toEqual([]);
    expect(normalize(combinationSum2([3, 3, 3], 9))).toEqual([[3, 3, 3]]);
  });

  test("duplicates must not produce duplicate combinations", () => {
    expect(normalize(combinationSum2([1, 1, 1, 2], 3))).toEqual(
      normalize([
        [1, 1, 1],
        [1, 2],
      ]),
    );
  });

  test("target equals sum of all candidates", () => {
    const candidates = [1, 2, 3, 4];
    expect(normalize(combinationSum2(candidates, 10))).toEqual([[1, 2, 3, 4]]);
  });

  test("never returns duplicate combinations", () => {
    const candidates = [1, 1, 2, 2, 3, 3, 4, 4];
    const result = combinationSum2(candidates, 6);
    const keys = result.map((c) => [...c].sort((a, b) => a - b).join(","));
    expect(new Set(keys).size).toBe(keys.length);
  });

  test("cross-check against brute force on random inputs", () => {
    for (let run = 0; run < 100; run++) {
      const length = 1 + Math.floor(random() * 12);
      const candidates: number[] = [];
      for (let i = 0; i < length; i++) {
        candidates.push(1 + Math.floor(random() * 8));
      }
      const target = 1 + Math.floor(random() * 12);
      const inputCopy = [...candidates];
      expect(normalize(combinationSum2(candidates, target))).toEqual(
        normalize(bruteForce(candidates, target)),
      );
      expect(candidates).toEqual(inputCopy);
    }
  });
});

import { describe, expect, test } from "bun:test";
import { searchRange } from "./searchRange.ts";

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
const random = makeRandom(Number(process.env["TEST_SEED"] ?? 2));

function bruteForce(nums: readonly number[], target: number): [number, number] {
  let first = -1;
  let last = -1;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      if (first === -1) first = i;
      last = i;
    }
  }
  return [first, last];
}

describe("searchRange", () => {
  test("empty array", () => {
    expect(searchRange([], 0)).toEqual([-1, -1]);
  });

  test("single element, hit", () => {
    expect(searchRange([1], 1)).toEqual([0, 0]);
  });

  test("single element, miss", () => {
    expect(searchRange([1], 2)).toEqual([-1, -1]);
  });

  test("target spans a block of duplicates", () => {
    expect(searchRange([5, 7, 7, 8, 8, 10], 8)).toEqual([3, 4]);
  });

  test("target below all elements", () => {
    expect(searchRange([5, 7, 7, 8, 8, 10], 1)).toEqual([-1, -1]);
  });

  test("target above all elements", () => {
    expect(searchRange([5, 7, 7, 8, 8, 10], 99)).toEqual([-1, -1]);
  });

  test("target absent between elements", () => {
    expect(searchRange([5, 7, 7, 8, 8, 10], 6)).toEqual([-1, -1]);
  });

  test("entire array is the target", () => {
    expect(searchRange([2, 2, 2, 2], 2)).toEqual([0, 3]);
  });

  test("first element only", () => {
    expect(searchRange([1, 2, 3], 1)).toEqual([0, 0]);
  });

  test("last element only", () => {
    expect(searchRange([1, 2, 3], 3)).toEqual([2, 2]);
  });

  test("negative numbers", () => {
    expect(searchRange([-5, -3, -3, 0], -3)).toEqual([1, 2]);
  });

  test("two elements", () => {
    expect(searchRange([1, 1], 1)).toEqual([0, 1]);
    expect(searchRange([1, 2], 1)).toEqual([0, 0]);
    expect(searchRange([1, 2], 2)).toEqual([1, 1]);
  });

  test("cross-check against brute force on random inputs", () => {
    for (let run = 0; run < 300; run++) {
      const length = Math.floor(random() * 60);
      const nums: number[] = [];
      let current = Math.floor(random() * 10) - 5;
      for (let i = 0; i < length; i++) {
        nums.push(current);
        current += Math.floor(random() * 3);
      }
      const target = Math.floor(random() * 30) - 10;
      const inputCopy = [...nums];
      expect(searchRange(nums, target)).toEqual(bruteForce(nums, target));
      expect(nums).toEqual(inputCopy);
    }
  });

  test("large array stays fast", () => {
    const nums: number[] = [];
    for (let i = 0; i < 100_000; i++) nums.push(i < 50_000 ? 1 : 2);
    const started = performance.now();
    expect(searchRange(nums, 1)).toEqual([0, 49_999]);
    expect(searchRange(nums, 2)).toEqual([50_000, 99_999]);
    expect(searchRange(nums, 3)).toEqual([-1, -1]);
    expect(performance.now() - started).toBeLessThan(100);
  });
});

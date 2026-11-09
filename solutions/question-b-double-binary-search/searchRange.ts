/**
 * First index whose value fails `fails`, i.e. the standard partition point of
 * a sorted array. Returns nums.length when no element fails.
 */
function bound(
  nums: readonly number[],
  target: number,
  fails: (value: number) => boolean,
): number {
  let lo = 0;
  let hi = nums.length;
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (fails(nums[mid]!)) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

/** First index whose value is >= target. */
function lowerBound(nums: readonly number[], target: number): number {
  return bound(nums, target, (value) => value < target);
}

/** First index whose value is > target. */
function upperBound(nums: readonly number[], target: number): number {
  return bound(nums, target, (value) => value <= target);
}

/**
 * Return [firstIndex, lastIndex] of target in a sorted array using two
 * binary searches, or [-1, -1] when target is absent.
 */
export function searchRange(nums: readonly number[], target: number): [number, number] {
  const first = lowerBound(nums, target);
  if (first === nums.length || nums[first] !== target) return [-1, -1];
  const last = upperBound(nums, target) - 1;
  return [first, last];
}

# Question B — Find First and Last Position (double binary search)

You are given a sorted (non-decreasing) array of integers `nums` and an
integer `target`.

Return the **starting** and **ending** position of `target` such that:

- `nums[start] === target` and `nums[end] === target`
- if `target` is not found, return `[-1, -1]`

Your solution must run in `O(log n)` time — you must solve it with **two
binary searches** (one for the lower bound, one for the upper bound).

## Examples

```ts
searchRange([5, 7, 7, 8, 8, 10], 8) // -> [3, 4]
searchRange([5, 7, 7, 8, 8, 10], 6) // -> [-1, -1]
searchRange([], 0)                  // -> [-1, -1]
searchRange([1], 1)                 // -> [0, 0]
```

## Constraints

- `0 <= nums.length <= 10^5`
- Every element in `nums` is an integer
- `nums` is sorted in non-decreasing order
- `-10^9 <= target <= 10^9`

## Complexity target

- Time: `O(log n)`
- Space: `O(1)` extra (excluding the output array)

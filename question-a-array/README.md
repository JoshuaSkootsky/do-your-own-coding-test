# Question A — Merge Intervals (array based)

Given a list of intervals `intervals` where `intervals[i] = [start, end]`,
merge all overlapping intervals and return an array of the non-overlapping
intervals that cover all the intervals in the input.

## Examples

```ts
mergeIntervals([[1, 3], [2, 6], [8, 10], [15, 18]])
// -> [[1, 6], [8, 10], [15, 18]]

mergeIntervals([[1, 4], [4, 5]])
// -> [[1, 5]]
```

## Constraints

- `0 <= intervals.length <= 10^4`
- `intervals[i].length === 2`
- `0 <= start <= end <= 10^4`
- The input does **not** have to be sorted.

## Complexity target

- Time: `O(n log n)` (dominated by the sort)
- Space: `O(n)` for the output

# Question C — Combination Sum II (backtracking)

Given a collection of candidate numbers `candidates` (which may contain
duplicates) and a integer `target`, find all unique combinations in
`candidates` where the candidate numbers sum to `target`.

Each number in `candidates` may only be used **once** in a combination.

Return the list of unique combinations. Two combinations are unique if the
frequency of at least one of the chosen numbers is different. The order of
combinations does not matter.

## Examples

```ts
combinationSum2([10, 1, 2, 7, 6, 1, 5], 8)
// -> [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]

combinationSum2([2, 5, 2, 1, 2], 5)
// -> [[1, 2, 2], [5]]
```

## Constraints

- `1 <= candidates.length <= 30`
- `1 <= candidates[i] <= 50`
- `1 <= target <= 30`

## Complexity target

- Time: exponential in the worst case, but must prune branches whose partial
  sum already exceeds `target`
- Space: `O(target / min(candidates))` recursion depth

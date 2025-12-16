---
"@workflow/core": patch
---

perf: fix O(n²) wait completion algorithm

- Use Set for O(1) lookup of completed wait IDs instead of O(n) `.some()` per iteration
- Create all wait_completed events in parallel with `Promise.all()` instead of sequentially

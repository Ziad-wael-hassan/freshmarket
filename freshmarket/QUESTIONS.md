# FreshCart — Questions & Answers

## How to Read This File

Each item shows:
- **Status**: `verified` | `partial` | `blocked` | `deferred` | `out-of-scope`
- **Priority**: high | medium | low
- **Answer**: what was decided, with optional code snippet

---

## 1. Product & Intended Behavior

### Q1. Guest cart merge on login
**Status:** verified
**Priority:** high
**Answer:** YES — merge is intended behavior. Call `mergeLocalCartWithServer()` inside `login()` success flow, immediately after backend token is set and before navigating. Discard guest cart only after successful merge.

### Q2. Login page redirect checking `authInitialized`
**Status:** verified
**Priority:** high
**Answer:** YES — add `authInitialized` guard. Change `if (isAuthenticated)` to `if (authInitialized && isAuthenticated)` to prevent race conditions where user lands on home before login finishes.

### Q3. Google-only auth — supported path or deprecated
**Status:** verified
**Priority:** high
**Answer:** Treat as deprecated. Google-only users should NOT access orders, cart, wishlist, or profile (those require backend JWT). Show toast: "Sign in with email for full access" and redirect to login page.

### Q4. Reviews stat hardcoded to 0 — deferred or dead UI
**Status:** verified
**Priority:** low
**Answer:** Dead UI — remove the Reviews stat card. A fake metric damages trust more than a missing one. Add it back when review functionality is implemented.

---

## 2. Architecture & Code Structure

### Q5. Triple auth state (inMemoryToken + useState + localStorage)
**Status:** verified
**Priority:** high
**Answer:** Consolidate to two sources. `authSession.js` → raw token source of truth. `AuthContext` useState → React-reactive state. `localStorage` → persistence layer only. Remove `googleUser` from AuthContext value object entirely.

### Q6. `resolveUserFromToken` vs `getUserFromToken` duplication
**Status:** verified
**Priority:** medium
**Answer:** YES — unify. Keep `getUserFromToken(token)` in `tokenUtils.js` as the single extraction utility. Move fallback-user logic from `resolveUserFromToken` into `AuthContext` as an inline guard. Delete `resolveUserFromToken` after migrating its callers.

### Q7. FilterContext vs useCategories/useBrands — three parallel fetches
**Status:** verified
**Priority:** medium
**Answer:** YES — FilterContext should be single source of truth. `useCategories` and `useBrands` should read from FilterContext state, not fire their own API calls.

---

## 3. Security

### Q8. Firebase init with undefined config — throw or continue
**Status:** verified
**Priority:** high
**Answer:** Throw in development, continue gracefully in production.
```js
if (import.meta.env.DEV && !import.meta.env.VITE_FIREBASE_API_KEY) {
  throw new Error('Missing Firebase config — check your .env file')
}
```

### Q9. `ignored401Endpoints` using `.includes()` substring match
**Status:** verified
**Priority:** high
**Answer:** YES — switch to exact path matching.
```js
ignored401Endpoints.some(ep => url.endsWith(ep) || url === ep)
```

### Q10. `serializableCheck: false` — narrow it
**Status:** verified
**Priority:** medium
**Answer:** YES — narrow to specific paths.
```js
serializableCheck: {
  ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  ignoredPaths: ['cart.lastUpdated', 'wishlist.lastUpdated'],
}
```

### Q11. Rate limiting on login endpoint
**Status:** verified
**Priority:** low
**Answer:** Backend concern. Add 1-second debounce on login submit to prevent double-submissions only.

---

## 4. Error Handling & Resilience

### Q12. Standardize user-facing error messages from async thunks
**Status:** verified
**Priority:** high
**Answer:** YES — standardize now. Every `useCart`, `useWishlist`, `useOrders` failure should show a toast. Create `extractErrorMessage(error)` utility and use it everywhere.

### Q13. `JSON.stringify(params)` as useEffect dependency
**Status:** verified
**Priority:** medium
**Answer:** YES — use `useMemo` with enumerated fields.
```js
const stableParams = useMemo(() => params, [
  params.page, params.category, params.brand, params.sort, params.keyword
])
```

### Q14. FilterContext silently swallowing fetch failures
**Status:** verified
**Priority:** low
**Answer:** Show toast, but don't block page.
```js
.catch(() => {
  toast.error('Failed to load filters — please refresh')
  return { data: { data: [] } }
})
```

---

## 5. Data & Persistence

### Q15. Plain localStorage for auth token
**Status:** verified
**Priority:** low
**Answer:** Acceptable for this threat model. Plain localStorage is industry-standard for ecommerce JWT storage. Keep token TTL short as the primary mitigation.

### Q16. Persist auth state in Redux
**Status:** verified
**Priority:** low
**Answer:** No — token-based restoration is correct. Stale auth state in Redux creates more risk than benefit. Mask the brief "flash" window with a navbar loading skeleton.

---

## 6. Performance

### Q17. FilterContext fetching on every mount
**Status:** verified
**Priority:** medium
**Answer:** YES — cache with module-level singleton.
```js
let cachedCategories = null
// Check cache before fetching
```

### Q18. Sequential `addToCart` in loop for quantity > 1
**Status:** verified
**Priority:** high
**Answer:** YES — this is a performance bug. Replace sequential loop with `Promise.all()`.
```js
await Promise.all(
  Array(quantity).fill(null).map(() => cartService.add(productId))
)
```
If the API has a bulk endpoint, use it instead.

---

## 7. Possible Bugs

### Q19. Checkout step indicator not advancing correctly
**Status:** verified
**Priority:** high
**Answer:** Fix it — broken user flow, not deferred. Audit `Checkout.jsx` step state and ensure `step` prop matches actual current step. A user can reach confirm state without UI reflecting it — conversion-critical failure.

### Q20. `setInterval` without cleanup in Profile StatCard
**Status:** verified
**Priority:** high
**Answer:** YES — add cleanup immediately.
```js
useEffect(() => {
  const interval = setInterval(...)
  return () => clearInterval(interval)
}, [value])
```

---

## 8. Missing Decisions / Open Design Gaps

### Q21. Environment variable validation — fail-fast
**Status:** verified
**Priority:** medium
**Answer:** YES — create `src/config/validateEnv.js` and import at top of `main.jsx`. Also create `.env.example` with all required keys documented.

### Q22. Structured logging / observability — planned
**Status:** verified
**Priority:** low
**Answer:** Not now. Remove all debug `console.log` calls or wrap in `import.meta.env.DEV` guards. Add Sentry/Datadog at launch, not during development.

### Q23. `ROUTES` constant unused — keep or remove
**Status:** verified
**Priority:** low
**Answer:** Use it — replace all string literal routes across 26+ files. This prevents silent breakage when a route changes. Medium-effort, high long-term value.

### Q24. `updateProfile` — optimistic update or re-fetch
**Status:** verified
**Priority:** medium
**Answer:** Re-fetch after save to confirm server state.
```js
const updated = await userService.updateMe(data)
const fresh = await userService.getProfile()  // confirm
setUser(fresh.data.data)
```

---

## 9. Testing & QA

### Q25. No tests — planned or not prioritized
**Status:** verified
**Priority:** medium
**Answer:** Add tests before any further auth changes. Minimum: `vitest` + `@testing-library/react`. Test auth flow (login → authenticated → logout) and cart flow (add → count → remove → count).

### Q26. Auth regression tests — prioritize
**Status:** verified
**Priority:** high
**Answer:** YES — highest priority testing task. AuthContext has most moving parts and most downstream impact. Write tests for: login success, login failure, logout, token restoration on refresh, protected route redirect.

---

## 10. Technical Debt & Suspicious Patterns

### Q27. `activeCategories`/`activeBrands` dead aliases
**Status:** verified
**Priority:** low
**Answer:** Remove them. `activeCategories === categories` always — dead naming adds confusion with no benefit.

### Q28. Google-only login navigating without warning
**Status:** verified
**Priority:** high
**Answer:** YES — show warning toast.
```js
toast.warning('Google sign-in is limited. Sign in with email for full access to orders and cart.')
```

### Q29. `JSON.stringify(params)` as dep
**Status:** verified
**Priority:** medium
**Answer:** (Same as Q13) — use `useMemo` with enumerated fields.

### Q30. `Profile.jsx` null check `!user` vs `!user?._id`
**Status:** verified
**Priority:** high
**Answer:** YES — change to `!user?._id`. A decoded JWT object with empty fields passes `!user` but fails `!user?._id`.

---

## Implementation Priority Order

| # | Item | Priority |
|---|---|---|
| 1 | Q2 — Login redirect `authInitialized` guard | high |
| 2 | Q20 — Profile `setInterval` cleanup | high |
| 3 | Q19 — Checkout step indicator fix | high |
| 4 | Q28 — Google-only login warning toast | high |
| 5 | Q1 — Guest cart merge on login | high |
| 6 | Q18 — Sequential `addToCart` loop fix | high |
| 7 | Q30 — Profile `!user?._id` null check | high |
| 8 | Q5 — Remove `googleUser` from AuthContext | high |
| 9 | Q12 — Standardize error messages | high |
| 10 | Q26 — Auth regression tests | high |
| 11 | Q8 — Firebase config validation | medium |
| 12 | Q13/29 — `JSON.stringify(params)` fix | medium |
| 13 | Q9 — `ignored401Endpoints` exact match | medium |
| 14 | Q17 — FilterContext caching | medium |
| 15 | Q6 — Unify `getUserFromToken` / remove `resolveUserFromToken` | medium |
| 16 | Q10 — Narrow `serializableCheck` | medium |
| 17 | Q24 — `updateProfile` re-fetch | medium |
| 18 | Q7 — FilterContext single source of truth | medium |
| 19 | Q14 — FilterContext toast on failure | low |
| 20 | Q21 — Env validation + `.env.example` | low |
| 21 | Q23 — Replace string literal routes | low |
| 22 | Q4 — Remove dead Reviews stat | low |
| 23 | Q25 — Test setup (vitest) | medium |
| 24 | Q22 — Remove debug console.logs | low |
| 25 | Q27 — Remove dead aliases | low |
| 26 | Q3 — Google-only deprecated UX | medium |
| 27 | Q15 — localStorage security (document decision) | low |
| 28 | Q16 — Redux auth persistence (document decision) | low |
| 29 | Q11 — Debounce login submit | low |

---

## Answer Tags

All 30 questions answered:

- `verified` — 30 items
- `deferred` — 0
- `out-of-scope` — 0
- `blocked` — 0
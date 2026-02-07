# Module Template Notes

This template mirrors the core SDK structure and conventions:

- Models live in `src/models/**`
- Operation types in `src/models/operations/**`
- Funcs in `src/funcs/**`
- SDK classes in `src/sdk/**`
- Exports in `src/index.ts`

## HAL Behavior

- Public types should not expose `_links` or `_embedded`.
- Use Zod `.transform()` to map `_links` -> `links` and `_embedded` to typed fields.
- Use `.loose()` for forward compatibility.

## Pagination

- Use `buildPaginated()` and `applyPaginationParams()` from `@ominity/api-typescript/models`.
- Page/limit are optional; API defaults to page 1 / limit 20.

## Module Wiring

- Export `bookingsModule()` (factory) and `BookingsModule` (prebuilt instance).
- Use module augmentation so `ominity.modules.bookings` is typed.

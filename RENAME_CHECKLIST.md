# Rename Checklist

Use this when turning the template into a real module package.

1. Update `package.json`:
- `name`
- `tshy.sourceDialects`
- `exports` (source dialect keys)
- `peerDependencies` target version if needed

1. Update `jsr.json`:
- `name`
- `version`

1. Rename module identifiers:
- `src/sdk/index.ts`: module name string (e.g. `"bookings"`)
- `src/sdk/index.ts`: type names (e.g. `BookingsModule`)
- `src/sdk/bookings` folder name
- `src/models/bookings` folder name
- `src/funcs/bookings` folder name

1. Update imports/exports:
- `src/index.ts`
- `src/models/index.ts`
- `src/models/operations/index.ts`
- `src/funcs/index.ts`
- `src/sdk/index.ts`

1. Update README examples:
- Package name
- Module name
- Example paths

1. Remove template markers:
- Replace placeholder resource names (`BookingEvent`, `events`) with real ones
- Replace `/modules/bookings/events` paths


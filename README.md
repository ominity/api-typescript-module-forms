# Ominity API Module Template

This is a template repo for creating a modular Ominity API package that plugs into `@ominity/api-typescript`.

See `RENAME_CHECKLIST.md` for the exact rename steps.

## What to Rename

- Package name in `package.json`
- Source dialect in `package.json` (`@ominity/api-modules-template/source`)
- Module name inside `src/sdk/index.ts`
- Folder names under `src/models` and `src/funcs`
- README examples

If you plan to publish, remove `"private": true` in `package.json`.

## Install

```bash
npm install @ominity/api-typescript
```

## Usage (example)

```ts
import { Ominity } from "@ominity/api-typescript";
import { bookingsModule, BookingsModule } from "@ominity/api-modules-bookings";

const ominity = new Ominity({
  serverURL: "https://tenant-a.ominity.com/api",
  security: { apiKey: process.env["OMINITY_API_KEY"] ?? "" },
});

// Either option is supported
ominity.use(BookingsModule);
// or
ominity.use(bookingsModule());

// Constructor option
const ominity2 = new Ominity({
  serverURL: "https://tenant-a.ominity.com/api",
  security: { apiKey: process.env["OMINITY_API_KEY"] ?? "" },
  modules: [bookingsModule()],
});

const res = await ominity.modules.bookings.events.list({ page: 1, limit: 20 });
console.log(res.items);
```

## Structure

```
src/
  funcs/
  models/
  models/operations/
  sdk/
  index.ts
```

## Development

```bash
npm run lint
npm run build
```

## Notes

- This template mirrors the core SDK architecture (models, operations, funcs, sdk).
- HAL responses are transformed; public types should not expose `_links` or `_embedded`.
- Use `zod/v4` and `.loose()` for forward compatibility.

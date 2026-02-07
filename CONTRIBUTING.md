# Contributing

Thanks for contributing! Please keep changes small and focused.

## Development

```bash
npm install
npm run lint
npm run build
```

## Conventions

- Mirror the core SDK structure: models, operations, funcs, sdk.
- Use `zod/v4` and `.loose()` for forward compatibility.
- Keep public types clean; transform HAL fields in schemas.

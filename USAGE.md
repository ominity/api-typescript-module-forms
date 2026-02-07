# Usage

```ts
import { Ominity } from "@ominity/api-typescript";
import { bookingsModule } from "@ominity/api-modules-bookings";

const ominity = new Ominity({
  serverURL: "https://tenant-a.ominity.com/api",
  security: { apiKey: process.env["OMINITY_API_KEY"] ?? "" },
  modules: [bookingsModule()],
});

const res = await ominity.modules.bookings.events.list({
  page: 1,
  limit: 20,
});

console.log(res.items);
```

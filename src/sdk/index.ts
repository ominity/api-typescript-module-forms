/*
 * Module entrypoint.
 *
 * Rename "bookings" and types for your module.
 */

import type {
  Ominity,
  OminityModuleDefinition,
} from "@ominity/api-typescript";
import { Bookings } from "./bookings/index.js";

export { Bookings } from "./bookings/index.js";

export type BookingsModule = Bookings;

export function bookingsModule(): OminityModuleDefinition<
  Ominity,
  "bookings",
  Bookings
> {
  return {
    name: "bookings",
    init(client: Ominity) {
      return new Bookings(client._options);
    },
  };
}

export const BookingsModule = bookingsModule();

declare module "@ominity/api-typescript" {
  interface OminityModules {
    bookings: Bookings;
  }
}

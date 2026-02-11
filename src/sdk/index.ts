/*
 * Module entrypoint.
 *
 * Rename "bookings" and types for your module.
 */

import type {
  Ominity,
  OminityModuleDefinition,
} from "@ominity/api-typescript";
import { Forms } from "./forms/index.js";

export { Forms } from "./forms/index.js";

export type FormsModule = Forms;

export function formsModule(): OminityModuleDefinition<
  Ominity,
  "forms",
  Forms
> {
  return {
    name: "forms",
    init(client: Ominity) {
      return new Forms(client._options);
    },
  };
}

export const FormsModule = formsModule();

declare module "@ominity/api-typescript" {
  interface OminityModules {
    forms: Forms;
  }
}

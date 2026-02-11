/*
 * Form model.
 *
 * Rename this resource and fields for your real module.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "@ominity/api-typescript/lib/primitives";
import {
  HalLinks,
  HalLinks$inboundSchema,
  buildPaginated,
  Paginated,
} from "@ominity/api-typescript/models";

export type Form = {
  resource: string;
  id: number | string;
  title: string;
  slug: string; // guessing a common field for forms
  description?: string | null | undefined;
  links?: HalLinks;
};

/** @internal */
export const Form$inboundSchema: z.ZodType<Form> = z.object({
  resource: z.string(),
  id: z.union([z.number().int(), z.string()]),
  title: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
  _links: HalLinks$inboundSchema.optional(),
})
  .loose()
  .transform((v) => remap$(v, { _links: "links" }) as Form);

export type FormsListResponse = Paginated<Form>;

/** @internal */
export const FormsListResponse$inboundSchema: z.ZodType<
  FormsListResponse
> = z.object({
  _embedded: z.object({
    forms: z.array(Form$inboundSchema),
  }),
  count: z.number(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((v) => buildPaginated(v._embedded.forms, v.count, v._links));

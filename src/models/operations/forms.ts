/*
 * Bookings events operations.
 *
 * Rename these types and fields for your module.
 */

import * as z from "zod/v4";
import {
  Form,
  FormsListResponse,
} from "../forms/form.js";

export type FormsListParams = {
  page?: number | undefined;
  limit?: number | undefined;
  include?: string | string[] | undefined;
  filter?: Record<string, unknown> | string | undefined;
  sort?: string | string[] | undefined;
};

export type FormGetParams = {
  include?: string | string[] | undefined;
};

export type ListFormsRequest = FormsListParams;
export type ListFormsResponse = FormsListResponse;

export type GetFormRequest = FormGetParams & {
  id: number | string;
};

export type GetFormResponse = Form;

/** @internal */
export const FormsListParams$outboundSchema: z.ZodType<FormsListParams> = z
  .object({
    page: z.number().int().optional(),
    limit: z.number().int().optional(),
    include: z.union([z.string(), z.array(z.string())]).optional(),
    filter: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
    sort: z.union([z.string(), z.array(z.string())]).optional(),
  })
  .loose();

/** @internal */
export const FormGetParams$outboundSchema: z.ZodType<FormGetParams> = z
  .object({
    include: z.union([z.string(), z.array(z.string())]).optional(),
  })
  .loose();

/** @internal */
export const GetFormRequest$outboundSchema: z.ZodType<GetFormRequest> = z
  .object({
    id: z.union([z.string(), z.number()]),
    include: z.union([z.string(), z.array(z.string())]).optional(),
  })
  .loose();

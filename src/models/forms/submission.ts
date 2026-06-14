import * as z from "zod/v4";
import { remap as remap$ } from "@ominity/api-typescript/lib/primitives";
import {
  HalLinks,
  HalLinks$inboundSchema,
  buildPaginated,
  Paginated,
} from "@ominity/api-typescript/models";

export type SubmissionData = Record<string, unknown>;

export type Submission = {
  resource: string;
  id: number | string;
  formId: number | string;
  data: SubmissionData;
  updatedAt?: string | undefined;
  createdAt?: string | undefined;
  links?: HalLinks;
};

const NumericOrStringId$schema = z.union([z.number().int(), z.string()]);

const SubmissionData$schema: z.ZodType<SubmissionData> = z.record(
  z.string(),
  z.any(),
);

/** @internal */
export const Submission$inboundSchema: z.ZodType<Submission> = z.object({
  resource: z.string(),
  id: NumericOrStringId$schema,
  formId: NumericOrStringId$schema,
  data: SubmissionData$schema.catch({}),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
  _links: HalLinks$inboundSchema.optional(),
})
  .loose()
  .transform((v) => remap$(v, { _links: "links" }) as Submission);

export type SubmissionsListResponse = Paginated<Submission>;

/** @internal */
export const SubmissionsListResponse$inboundSchema: z.ZodType<
  SubmissionsListResponse
> = z.object({
  _embedded: z.object({
    form_submissions: z.array(Submission$inboundSchema),
  }),
  count: z.number(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((v) => buildPaginated(
  v._embedded.form_submissions,
  v.count,
  v._links,
));

import * as z from "zod/v4";
import {
  Submission,
  SubmissionData,
  SubmissionsListResponse,
  Submission$inboundSchema,
  SubmissionsListResponse$inboundSchema,
} from "../forms/index.js";

const NumericOrStringId$schema = z.union([z.number().int(), z.string()]);
const NullableNumericOrStringId$schema = z.union([
  z.number().int(),
  z.string(),
  z.null(),
]);
const SubmissionData$schema: z.ZodType<SubmissionData> = z.record(
  z.string(),
  z.any(),
);

export type SubmissionsListParams = {
  page?: number | undefined;
  limit?: number | undefined;
  include?: string | string[] | undefined;
  filter?: Record<string, unknown> | string | undefined;
  sort?: string | string[] | undefined;
};

export type ListSubmissionsRequest = SubmissionsListParams;
export type ListSubmissionsResponse = SubmissionsListResponse;

export type SubmissionGetParams = {
  include?: string | string[] | undefined;
};

export type GetSubmissionRequest = SubmissionGetParams & {
  id: number | string;
};

export type GetSubmissionResponse = Submission;

export type SubmissionCreateInput = {
  formId: number | string;
  userId?: number | string | null | undefined;
  recaptchaToken?: string | null | undefined;
  data: SubmissionData;
};

export type CreateSubmissionRequest = SubmissionCreateInput;
export type CreateSubmissionResponse = Submission;

export type SubmissionUpdateInput = {
  userId?: number | string | null | undefined;
  data?: SubmissionData | undefined;
};

export type UpdateSubmissionRequest = {
  id: number | string;
  body: SubmissionUpdateInput;
};

export type UpdateSubmissionResponse = Submission;

export type DeleteSubmissionRequest = {
  id: number | string;
};

export type DeleteSubmissionResponse = null;

/** @internal */
export const SubmissionsListParams$outboundSchema: z.ZodType<
  SubmissionsListParams
> = z.object({
  page: z.number().int().optional(),
  limit: z.number().int().optional(),
  include: z.union([z.string(), z.array(z.string())]).optional(),
  filter: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
  sort: z.union([z.string(), z.array(z.string())]).optional(),
}).loose();

/** @internal */
export const SubmissionGetParams$outboundSchema: z.ZodType<
  SubmissionGetParams
> = z.object({
  include: z.union([z.string(), z.array(z.string())]).optional(),
}).loose();

/** @internal */
export const GetSubmissionRequest$outboundSchema: z.ZodType<
  GetSubmissionRequest
> = z.object({
  id: NumericOrStringId$schema,
  include: z.union([z.string(), z.array(z.string())]).optional(),
}).loose();

/** @internal */
export const CreateSubmissionRequest$outboundSchema: z.ZodType<
  CreateSubmissionRequest
> = z.object({
  formId: NumericOrStringId$schema,
  userId: NullableNumericOrStringId$schema.optional(),
  recaptchaToken: z.string().nullable().optional(),
  data: SubmissionData$schema,
}).loose()
  .transform((v) => v as CreateSubmissionRequest);

/** @internal */
export const UpdateSubmissionRequest$outboundSchema: z.ZodType<
  UpdateSubmissionRequest
> = z.object({
  id: NumericOrStringId$schema,
  body: z.object({
    userId: NullableNumericOrStringId$schema.optional(),
    data: SubmissionData$schema.optional(),
  }).loose(),
}).transform((v) => v as UpdateSubmissionRequest);

/** @internal */
export const DeleteSubmissionRequest$outboundSchema: z.ZodType<
  DeleteSubmissionRequest
> = z.object({
  id: NumericOrStringId$schema,
}).loose();

/** @internal */
export const CreateSubmissionResponse$inboundSchema: z.ZodType<
  CreateSubmissionResponse
> = Submission$inboundSchema;

/** @internal */
export const UpdateSubmissionResponse$inboundSchema: z.ZodType<
  UpdateSubmissionResponse
> = Submission$inboundSchema;

/** @internal */
export const GetSubmissionResponse$inboundSchema: z.ZodType<
  GetSubmissionResponse
> = Submission$inboundSchema;

/** @internal */
export const ListSubmissionsResponse$inboundSchema: z.ZodType<
  ListSubmissionsResponse
> = SubmissionsListResponse$inboundSchema;

/** @internal */
export const DeleteSubmissionResponse$inboundSchema: z.ZodType<
  DeleteSubmissionResponse
> = z.null();

import * as z from "zod/v4";
import { remap as remap$ } from "@ominity/api-typescript/lib/primitives";
import {
  HalLinks,
  HalLinks$inboundSchema,
  buildPaginated,
  Paginated,
} from "@ominity/api-typescript/models";

export type FormFieldOption = {
  value: string;
  label: string;
  icon?: string | null | undefined;
  isDefault?: boolean | undefined;
  order?: number | undefined;
};

export type FormFieldOptions =
  | Array<FormFieldOption>
  | Array<string>
  | Record<string, unknown>;

export type FormFieldValidationRule = {
  rule: string;
  message?: string | null | undefined;
};

export type FormFieldValidation = {
  isRequired: boolean;
  minLength?: number | null | undefined;
  maxLength?: number | null | undefined;
  rules: Array<FormFieldValidationRule>;
  message: string;
};

export type FormFieldCss = {
  classes?: string | null | undefined;
  id?: string | null | undefined;
  style?: string | null | undefined;
};

export type FormField = {
  resource: string;
  id: number | string;
  formId: number | string;
  type: string;
  name: string;
  label: string;
  isLabelVisible: boolean;
  placeholder: string;
  helper: string;
  defaultValue?: string | null | undefined;
  width?: string | null | undefined;
  isInline: boolean;
  css: FormFieldCss;
  validation: FormFieldValidation;
  options: FormFieldOptions;
  order: number;
  updatedAt?: string | undefined;
  createdAt?: string | undefined;
  links?: HalLinks;
};

export type Form = {
  resource: string;
  id: number | string;
  name: string;
  title: string;
  description?: string | null | undefined;
  submissions?: number | undefined;
  publishedAt?: string | null | undefined;
  updatedAt?: string | undefined;
  createdAt?: string | undefined;
  links?: HalLinks;
  embedded?: {
    form_fields?: Array<FormField> | undefined;
  } | undefined;
};

const NumericOrStringId$schema = z.union([z.number().int(), z.string()]);

const Booleanish$schema = z
  .union([z.boolean(), z.number(), z.string()])
  .transform((value): boolean => {
    if (typeof value === "boolean") {
      return value;
    }
    if (typeof value === "number") {
      return value !== 0;
    }

    const normalized = value.trim().toLowerCase();
    return ["1", "true", "yes", "on"].includes(normalized);
  });

const FormFieldOption$inboundSchema: z.ZodType<FormFieldOption> = z.object({
  value: z.string(),
  label: z.string(),
  icon: z.string().nullable().optional(),
  isDefault: Booleanish$schema.optional(),
  order: z.number().int().optional(),
})
  .loose();

const FormFieldValidationRule$inboundSchema: z.ZodType<FormFieldValidationRule> = z.object({
  rule: z.string(),
  message: z.string().nullable().optional(),
})
  .loose();

const FormFieldValidation$inboundSchema: z.ZodType<FormFieldValidation> = z.object({
  isRequired: Booleanish$schema,
  minLength: z.number().nullable().optional(),
  maxLength: z.number().nullable().optional(),
  rules: z.array(FormFieldValidationRule$inboundSchema).catch([]),
  message: z.string().catch(""),
})
  .loose();

const FormFieldCss$inboundSchema: z.ZodType<FormFieldCss> = z.object({
  classes: z.string().nullable().optional(),
  id: z.string().nullable().optional(),
  style: z.string().nullable().optional(),
})
  .loose();

const FormFieldOptions$inboundSchema: z.ZodType<FormFieldOptions> = z.union([
  z.array(FormFieldOption$inboundSchema),
  z.array(z.string()),
  z.record(z.string(), z.any()),
]);

/** @internal */
export const FormField$inboundSchema: z.ZodType<FormField> = z.object({
  resource: z.string(),
  id: NumericOrStringId$schema,
  formId: NumericOrStringId$schema,
  type: z.string(),
  name: z.string(),
  label: z.string().catch(""),
  isLabelVisible: Booleanish$schema.catch(true),
  placeholder: z.string().catch(""),
  helper: z.string().catch(""),
  defaultValue: z.string().nullable().optional(),
  width: z.string().nullable().optional(),
  isInline: Booleanish$schema.catch(false),
  css: FormFieldCss$inboundSchema.catch({
    classes: null,
    id: null,
    style: null,
  }),
  validation: FormFieldValidation$inboundSchema.catch({
    isRequired: false,
    minLength: null,
    maxLength: null,
    rules: [],
    message: "",
  }),
  options: FormFieldOptions$inboundSchema.catch([]),
  order: z.number().int().catch(0),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
  _links: HalLinks$inboundSchema.optional(),
})
  .loose()
  .transform((v) => remap$(v, { _links: "links" }) as FormField);

/** @internal */
export const Form$inboundSchema: z.ZodType<Form> = z.object({
  resource: z.string(),
  id: NumericOrStringId$schema,
  name: z.string(),
  title: z.string(),
  description: z.string().nullable().optional(),
  submissions: z.number().int().optional(),
  publishedAt: z.string().nullable().optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
  _embedded: z.object({
    form_fields: z.array(FormField$inboundSchema).optional(),
  }).optional(),
  _links: HalLinks$inboundSchema.optional(),
})
  .loose()
  .transform((v) => {
    const mapped = remap$(v, { _links: "links" }) as Form;
    const embedded = v._embedded;
    if (embedded && typeof embedded === "object") {
      mapped.embedded = {
        form_fields: Array.isArray(embedded.form_fields)
          ? embedded.form_fields
          : undefined,
      };
    }
    return mapped;
  });

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

/*
 * Bookings events operations.
 *
 * Rename these types and fields for your module.
 */

import * as z from "zod/v4";
import {
  BookingEvent,
  BookingEventsListResponse,
} from "../bookings/event.js";

export type EventsListParams = {
  page?: number | undefined;
  limit?: number | undefined;
  include?: string | string[] | undefined;
  filter?: Record<string, unknown> | string | undefined;
  sort?: string | string[] | undefined;
};

export type EventGetParams = {
  include?: string | string[] | undefined;
};

export type ListEventsRequest = EventsListParams;
export type ListEventsResponse = BookingEventsListResponse;

export type GetEventRequest = EventGetParams & {
  id: number | string;
};

export type GetEventResponse = BookingEvent;

/** @internal */
export const EventsListParams$outboundSchema: z.ZodType<EventsListParams> = z
  .object({
    page: z.number().int().optional(),
    limit: z.number().int().optional(),
    include: z.union([z.string(), z.array(z.string())]).optional(),
    filter: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
    sort: z.union([z.string(), z.array(z.string())]).optional(),
  })
  .loose();

/** @internal */
export const EventGetParams$outboundSchema: z.ZodType<EventGetParams> = z
  .object({
    include: z.union([z.string(), z.array(z.string())]).optional(),
  })
  .loose();

/** @internal */
export const GetEventRequest$outboundSchema: z.ZodType<GetEventRequest> = z
  .object({
    id: z.union([z.string(), z.number()]),
    include: z.union([z.string(), z.array(z.string())]).optional(),
  })
  .loose();

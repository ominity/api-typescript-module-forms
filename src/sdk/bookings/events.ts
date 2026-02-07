/*
 * Bookings events SDK.
 */

import { ClientSDK, RequestOptions } from "@ominity/api-typescript/lib/sdks";
import { unwrapAsync } from "@ominity/api-typescript/types/fp";
import * as operations from "../../models/operations/index.js";
import { eventsGet } from "../../funcs/bookings/eventsGet.js";
import { eventsList } from "../../funcs/bookings/eventsList.js";

export class Events extends ClientSDK {
  async list(
    request?: operations.EventsListParams | undefined,
    options?: RequestOptions,
  ): Promise<operations.ListEventsResponse> {
    return unwrapAsync(eventsList(
      this,
      request,
      options,
    ));
  }

  async get(
    request: operations.GetEventRequest,
    options?: RequestOptions,
  ): Promise<operations.GetEventResponse> {
    return unwrapAsync(eventsGet(
      this,
      request,
      options,
    ));
  }
}

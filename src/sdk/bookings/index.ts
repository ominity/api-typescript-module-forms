/*
 * SDK module: Bookings
 */

import { ClientSDK } from "@ominity/api-typescript/lib/sdks";
import { Events } from "./events.js";

export class Bookings extends ClientSDK {
  private _events?: Events;

  get events(): Events {
    return (this._events ??= new Events(this._options));
  }
}

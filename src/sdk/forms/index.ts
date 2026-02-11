/*
 * SDK module: Bookings
 */

import { ClientSDK } from "@ominity/api-typescript/lib/sdks";
import { Forms as FormsResource } from "./forms.js";

export class Forms extends ClientSDK {
  private _forms?: FormsResource;

  get forms(): FormsResource {
    return (this._forms ??= new FormsResource(this._options));
  }
}

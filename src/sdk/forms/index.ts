/*
 * SDK module: Bookings
 */

import { ClientSDK } from "@ominity/api-typescript/lib/sdks";
import { Forms as FormsResource } from "./forms.js";
import { Submissions as SubmissionsResource } from "./submissions.js";

export class Forms extends ClientSDK {
  private _forms?: FormsResource;
  private _submissions?: SubmissionsResource;

  get forms(): FormsResource {
    return (this._forms ??= new FormsResource(this._options));
  }

  get submissions(): SubmissionsResource {
    return (this._submissions ??= new SubmissionsResource(this._options));
  }
}

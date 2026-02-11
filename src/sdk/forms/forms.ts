/*
 * SDK module: Forms
 */

import { ClientSDK, RequestOptions } from "@ominity/api-typescript/lib/sdks";

import { unwrapAsync } from "@ominity/api-typescript/types/fp";

import * as operations from "../../models/operations/index.js";
import { formsList } from "../../funcs/forms/list.js";
import { formsGet } from "../../funcs/forms/get.js";

export class Forms extends ClientSDK {
  async list(
    request?: operations.FormsListParams | undefined,
    options?: RequestOptions,
  ): Promise<operations.ListFormsResponse> {
    return unwrapAsync(formsList(
      this,
      request,
      options,
    ));
  }

  async get(
    request: operations.GetFormRequest,
    options?: RequestOptions,
  ): Promise<operations.GetFormResponse> {
    return unwrapAsync(formsGet(
      this,
      request,
      options,
    ));
  }
}

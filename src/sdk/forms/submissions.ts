/*
 * SDK module: Form submissions
 */

import { ClientSDK, RequestOptions } from "@ominity/api-typescript/lib/sdks";
import { unwrapAsync } from "@ominity/api-typescript/types/fp";

import * as operations from "../../models/operations/index.js";
import { submissionsList } from "../../funcs/submissions/list.js";
import { submissionsGet } from "../../funcs/submissions/get.js";
import { submissionsCreate } from "../../funcs/submissions/create.js";
import { submissionsUpdate } from "../../funcs/submissions/update.js";
import { submissionsDelete } from "../../funcs/submissions/delete.js";

export class Submissions extends ClientSDK {
  async list(
    request?: operations.SubmissionsListParams | undefined,
    options?: RequestOptions,
  ): Promise<operations.ListSubmissionsResponse> {
    return unwrapAsync(submissionsList(
      this,
      request,
      options,
    ));
  }

  async get(
    request: operations.GetSubmissionRequest,
    options?: RequestOptions,
  ): Promise<operations.GetSubmissionResponse> {
    return unwrapAsync(submissionsGet(
      this,
      request,
      options,
    ));
  }

  async create(
    request: operations.CreateSubmissionRequest,
    options?: RequestOptions,
  ): Promise<operations.CreateSubmissionResponse> {
    return unwrapAsync(submissionsCreate(
      this,
      request,
      options,
    ));
  }

  async update(
    request: operations.UpdateSubmissionRequest,
    options?: RequestOptions,
  ): Promise<operations.UpdateSubmissionResponse> {
    return unwrapAsync(submissionsUpdate(
      this,
      request,
      options,
    ));
  }

  async delete(
    request: operations.DeleteSubmissionRequest,
    options?: RequestOptions,
  ): Promise<operations.DeleteSubmissionResponse> {
    return unwrapAsync(submissionsDelete(
      this,
      request,
      options,
    ));
  }
}

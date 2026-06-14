/*
 * Create form submission.
 */

import { ClientSDK, RequestOptions } from "@ominity/api-typescript/lib/sdks";
import * as M from "@ominity/api-typescript/lib/matchers";
import { safeParse } from "@ominity/api-typescript/lib/schemas";
import {
  extractSecurity,
  resolveGlobalSecurity,
} from "@ominity/api-typescript/lib/security";
import * as errors from "@ominity/api-typescript/models/errors";
import { ResponseValidationError } from "@ominity/api-typescript/models/errors/response-validation-error";
import { SDKValidationError } from "@ominity/api-typescript/models/errors/sdk-validation-error";
import {
  ConnectionError,
  InvalidRequestError,
  RequestAbortedError,
  RequestTimeoutError,
  UnexpectedClientError,
} from "@ominity/api-typescript/models/errors/http-client-errors";
import * as operations from "../../models/operations/index.js";
import { APICall, APIPromise } from "@ominity/api-typescript/types/async";
import { Result } from "@ominity/api-typescript/types/fp";

export function submissionsCreate(
  client: ClientSDK,
  request: operations.CreateSubmissionRequest,
  options?: RequestOptions,
): APIPromise<
  Result<
    operations.CreateSubmissionResponse,
    | errors.ErrorResponse
    | errors.OminityDefaultError
    | ResponseValidationError
    | ConnectionError
    | RequestAbortedError
    | RequestTimeoutError
    | InvalidRequestError
    | UnexpectedClientError
    | SDKValidationError
  >
> {
  return new APIPromise($do(
    client,
    request,
    options,
  ));
}

async function $do(
  client: ClientSDK,
  request: operations.CreateSubmissionRequest,
  options?: RequestOptions,
): Promise<
  [
    Result<
      operations.CreateSubmissionResponse,
      | errors.ErrorResponse
      | errors.OminityDefaultError
      | ResponseValidationError
      | ConnectionError
      | RequestAbortedError
      | RequestTimeoutError
      | InvalidRequestError
      | UnexpectedClientError
      | SDKValidationError
    >,
    APICall,
  ]
> {
  const parsed = safeParse(
    request,
    (value) => operations.CreateSubmissionRequest$outboundSchema.parse(value),
    "Input validation failed",
  );
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;

  const path = "/modules/forms/submissions";

  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const securityInput = await extractSecurity(client._options.security);
  const requestSecurity = resolveGlobalSecurity(securityInput);

  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "modules.forms.submissions.create",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.security,
    retryConfig: options?.retries
      || client._options.retryConfig
      || { strategy: "none" },
    retryCodes: options?.retryCodes || ["429", "5XX"],
  };

  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "POST",
    baseURL: options?.serverURL,
    path,
    headers,
    body: JSON.stringify(payload),
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1,
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;

  const doResult = await client._do(req, {
    context,
    errorCodes: ["4XX", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes,
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;

  const responseFields = {
    HttpMeta: { Response: response, Request: req },
  };

  const [result] = await M.match<
    operations.CreateSubmissionResponse,
    | errors.ErrorResponse
    | errors.OminityDefaultError
    | ResponseValidationError
    | ConnectionError
    | RequestAbortedError
    | RequestTimeoutError
    | InvalidRequestError
    | UnexpectedClientError
    | SDKValidationError
  >(
    M.json(200, operations.CreateSubmissionResponse$inboundSchema, {
      ctype: "application/hal+json",
    }),
    M.json(201, operations.CreateSubmissionResponse$inboundSchema, {
      ctype: "application/hal+json",
    }),
    M.jsonErr("4XX", errors.ErrorResponse$inboundSchema, {
      ctype: "application/hal+json",
    }),
    M.fail("5XX"),
  )(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }

  return [result, { status: "complete", request: req, response }];
}

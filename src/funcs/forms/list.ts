/*
 * List booking events.
 *
 * Replace the path and operation ID for your module.
 */

import { ClientSDK, RequestOptions } from "@ominity/api-typescript/lib/sdks";
import {
  encodeDeepObjectQuery,
  encodeFormQuery,
  queryJoin,
} from "@ominity/api-typescript/lib/encodings";
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
import { FormsListResponse$inboundSchema } from "../../models/forms/form.js";
import { applyPaginationParams } from "@ominity/api-typescript/models/pagination";
import { APICall, APIPromise } from "@ominity/api-typescript/types/async";
import { OK, Result } from "@ominity/api-typescript/types/fp";

export function formsList(
  client: ClientSDK,
  request?: operations.FormsListParams | undefined,
  options?: RequestOptions,
): APIPromise<
  Result<
    operations.ListFormsResponse,
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
  request?: operations.FormsListParams | undefined,
  options?: RequestOptions,
): Promise<
  [
    Result<
      operations.ListFormsResponse,
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
    (value) =>
      operations.FormsListParams$outboundSchema.optional().parse(value),
    "Input validation failed",
  );
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;

  const path = "/forms";

  const baseQuery = encodeFormQuery({
    page: payload?.page,
    limit: payload?.limit,
    include: payload?.include,
    sort: payload?.sort,
  });

  let filterQuery: string | undefined;
  if (typeof payload?.filter === "string") {
    filterQuery = encodeFormQuery({ filter: payload.filter });
  } else if (
    payload?.filter != null
    && typeof payload.filter === "object"
    && !Array.isArray(payload.filter)
  ) {
    filterQuery = encodeDeepObjectQuery({ filter: payload.filter });
  }

  const query = queryJoin(baseQuery, filterQuery);

  const headers = new Headers({
    Accept: "application/hal+json",
  });

  const securityInput = await extractSecurity(client._options.security);
  const requestSecurity = resolveGlobalSecurity(securityInput);

  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "modules.forms.form.list",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.security,
    retryConfig: options?.retries
      || client._options.retryConfig
      || {
      strategy: "backoff",
      backoff: {
        initialInterval: 500,
        maxInterval: 5000,
        exponent: 2,
        maxElapsedTime: 7500,
      },
      retryConnectionErrors: true,
    }
      || { strategy: "none" },
    retryCodes: options?.retryCodes || ["5xx"],
  };

  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path: path,
    headers: headers,
    query: query,
    body: body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1,
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;

  const doResult = await client._do(req, {
    context,
    errorCodes: ["400", "4XX", "5XX"],
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
    operations.ListFormsResponse,
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
    M.json(200, FormsListResponse$inboundSchema, {
      ctype: "application/hal+json",
    }),
    M.jsonErr("4XX", errors.ErrorResponse$inboundSchema, {
      ctype: "application/hal+json",
    }),
    M.fail("4XX"),
    M.fail("5XX"),
  )(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }

  return [
    OK(applyPaginationParams(result.value, payload)),
    { status: "complete", request: req, response },
  ];
}

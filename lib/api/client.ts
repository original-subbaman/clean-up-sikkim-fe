import "@/lib/amplify";
import { fetchAuthSession } from "aws-amplify/auth";

type JsonBody = Record<string, unknown> | unknown[];
type ApiRequestBody = BodyInit | JsonBody;

type ApiClientOptions = Omit<RequestInit, "body"> & {
  body?: ApiRequestBody;
  auth?: boolean;
};

type ApiErrorPayload = {
  message?: string;
  error?: string;
  [key: string]: unknown;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export class ApiError extends Error {
  status: number;
  payload: unknown;

  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

function getApiBaseUrl() {
  if (!API_BASE_URL) {
    throw new Error(
      "Missing required environment variable: NEXT_PUBLIC_API_BASE_URL",
    );
  }

  return API_BASE_URL.replace(/\/$/, "");
}

function joinUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}

function isJsonBody(body: ApiClientOptions["body"]): body is JsonBody {
  return (
    body !== undefined &&
    typeof body === "object" &&
    !(body instanceof FormData) &&
    !(body instanceof Blob) &&
    !(body instanceof ArrayBuffer) &&
    !(body instanceof URLSearchParams)
  );
}

async function getBearerToken() {
  const session = await fetchAuthSession();
  return session.tokens?.idToken?.toString();
}

async function parseResponse(response: Response) {
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

function getErrorMessage(payload: unknown, fallback: string) {
  if (payload && typeof payload === "object") {
    const apiPayload = payload as ApiErrorPayload;
    return apiPayload.message ?? apiPayload.error ?? fallback;
  }

  if (typeof payload === "string" && payload.trim()) {
    return payload;
  }

  return fallback;
}

export async function apiRequest<TResponse>(
  path: string,
  options: ApiClientOptions = {},
): Promise<TResponse> {
  const { auth = true, body, headers, ...requestOptions } = options;
  const requestHeaders = new Headers(headers);

  if (isJsonBody(body) && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (!requestHeaders.has("Accept")) {
    requestHeaders.set("Accept", "application/json");
  }

  if (auth) {
    const token = await getBearerToken();

    if (!token) {
      throw new ApiError("You must be signed in to perform this request.", 401);
    }

    requestHeaders.set("Authorization", token);
  }

  const requestBody: BodyInit | undefined = isJsonBody(body)
    ? JSON.stringify(body)
    : body;

  const response = await fetch(joinUrl(path), {
    ...requestOptions,
    headers: requestHeaders,
    body: requestBody,
  });

  const payload = await parseResponse(response);

  if (!response.ok) {
    throw new ApiError(
      getErrorMessage(payload, `Request failed with status ${response.status}`),
      response.status,
      payload,
    );
  }

  return payload as TResponse;
}

export const apiClient = {
  get: <TResponse>(path: string, options?: ApiClientOptions) =>
    apiRequest<TResponse>(path, { ...options, method: "GET" }),
  post: <TResponse>(
    path: string,
    body?: ApiClientOptions["body"],
    options?: ApiClientOptions,
  ) => apiRequest<TResponse>(path, { ...options, method: "POST", body }),
  put: <TResponse>(
    path: string,
    body?: ApiClientOptions["body"],
    options?: ApiClientOptions,
  ) => apiRequest<TResponse>(path, { ...options, method: "PUT", body }),
  patch: <TResponse>(
    path: string,
    body?: ApiClientOptions["body"],
    options?: ApiClientOptions,
  ) => apiRequest<TResponse>(path, { ...options, method: "PATCH", body }),
  delete: <TResponse>(path: string, options?: ApiClientOptions) =>
    apiRequest<TResponse>(path, { ...options, method: "DELETE" }),
};

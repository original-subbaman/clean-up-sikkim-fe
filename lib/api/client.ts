import "@/lib/amplify";
import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosRequestConfig,
  type Method,
  type RawAxiosRequestHeaders,
} from "axios";
import { fetchAuthSession } from "aws-amplify/auth";

type ApiRequestBody = AxiosRequestConfig["data"];

type ApiClientOptions = Omit<
  AxiosRequestConfig,
  "baseURL" | "data" | "method" | "url"
> & {
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

async function getBearerToken() {
  const session = await fetchAuthSession();
  return session.tokens?.idToken?.toString();
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

const axiosClient = axios.create({
  headers: {
    Accept: "application/json",
  },
});

export async function apiRequest<TResponse>(
  path: string,
  options: ApiClientOptions & { data?: ApiRequestBody; method: Method },
): Promise<TResponse> {
  const { auth = true, headers, ...requestOptions } = options;
  const requestHeaders: RawAxiosRequestHeaders = {
    ...(headers instanceof AxiosHeaders ? headers.toJSON() : headers),
  };

  if (auth) {
    const token = await getBearerToken();

    if (!token) {
      throw new ApiError("You must be signed in to perform this request.", 401);
    }

    requestHeaders.Authorization = token;
  }

  try {
    const response = await axiosClient.request<TResponse>({
      ...requestOptions,
      baseURL: getApiBaseUrl(),
      headers: requestHeaders,
      url: path,
    });

    if (response.status === 204) {
      return null as TResponse;
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error.response?.status ?? 0;
      const payload = error.response?.data;

      throw new ApiError(
        getErrorMessage(payload, error.message || "Request failed"),
        status,
        payload,
      );
    }

    throw error;
  }
}

export const apiClient = {
  get: <TResponse>(path: string, options?: ApiClientOptions) =>
    apiRequest<TResponse>(path, { ...options, method: "GET" }),
  post: <TResponse>(
    path: string,
    body?: ApiRequestBody,
    options?: ApiClientOptions,
  ) => apiRequest<TResponse>(path, { ...options, method: "POST", data: body }),
  put: <TResponse>(
    path: string,
    body?: ApiRequestBody,
    options?: ApiClientOptions,
  ) => apiRequest<TResponse>(path, { ...options, method: "PUT", data: body }),
  patch: <TResponse>(
    path: string,
    body?: ApiRequestBody,
    options?: ApiClientOptions,
  ) => apiRequest<TResponse>(path, { ...options, method: "PATCH", data: body }),
  delete: <TResponse>(path: string, options?: ApiClientOptions) =>
    apiRequest<TResponse>(path, { ...options, method: "DELETE" }),
};

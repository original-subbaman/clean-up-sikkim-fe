import { ApiError, apiClient } from "./client";

export type ApiRequestError = {
  status: number;
  message: string;
};

export function normalizeRequestError(error: unknown): ApiRequestError {
  if (error instanceof ApiError) {
    return {
      status: error.status,
      message: error.message,
    };
  }

  return {
    status: 0,
    message: error instanceof Error ? error.message : "Request failed.",
  };
}

export function getRequestErrorMessage(error: unknown, fallback: string) {
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string" &&
    error.message.trim()
  ) {
    return error.message;
  }

  return fallback;
}

type PresignedUploadResponse = {
  uploadUrl: string;
  photoKey: string;
};

export function requestPhotoUpload(file: File) {
  return apiClient.post<PresignedUploadResponse>("/upload/presigned-url", {
    fileType: file.type,
  });
}

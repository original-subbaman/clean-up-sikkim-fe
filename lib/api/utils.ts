import { apiClient } from "./client";

type PresignedUploadResponse = {
  uploadUrl: string;
  photoKey: string;
};

export function requestPhotoUpload(file: File) {
  return apiClient.post<PresignedUploadResponse>("/upload/presigned-url", {
    fileType: file.type,
  });
}

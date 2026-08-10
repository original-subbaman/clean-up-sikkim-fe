import type { Pin } from "@/models/pins";
import { apiClient } from "./client";
import { requestPhotoUpload } from "./utils";
import type { AddPinFormInputs } from "@/components/forms/AddPinForm";

type CreatePinPayload = Pick<
  Pin,
  "title" | "description" | "city" | "lat" | "lng" | "severity"
> & {
  photoKey?: string[];
};

type CreatePinInput = Omit<AddPinFormInputs, "photo"> & {
  photoKey?: string[];
};

export type GetPinsParams = {
  status?: string;
  lat?: number;
  lng?: number;
  range?: string;
};

export function addPin(newPin: CreatePinInput) {
  const payload: CreatePinPayload = {
    title: newPin.title,
    description: newPin.description,
    city: newPin.city,
    lat: Number(newPin.lat),
    lng: Number(newPin.lng),
    severity: newPin.severity as Pin["severity"],
    photoKey: newPin.photoKey,
  };
  return apiClient.post<Pin>("/trash-dumps", payload);
}

export function getPins(params?: GetPinsParams) {
  return apiClient.get<Pin[]>("/trash-dumps", { auth: false, params });
}

export async function uploadTrashPhoto(file: File) {
  const { uploadUrl, photoKey } = await requestPhotoUpload(file);

  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error("Failed to upload photo.");
  }

  return photoKey;
}

export type PIN_REACTION = "UPVOTE" | "FLAG";

export async function reactToPin(pinId: string, reaction: PIN_REACTION) {
  return apiClient.post(`/trash-dumps/${pinId}/reactions`, { type: reaction });
}

import type { Pin } from "@/models/pins";
import { apiClient } from "./client";
import { requestPhotoUpload } from "./utils";
import type { AddPinFormInputs } from "@/components/forms/AddPinForm";

type CreatePinPayload = Pick<
  Pin,
  "title" | "description" | "city" | "lat" | "lng" | "severity" | "photoUrls"
>;

type CreatePinInput = Omit<AddPinFormInputs, "photo"> & {
  photoUrls?: string[];
};

export function addPin(newPin: CreatePinInput) {
  const payload: CreatePinPayload = {
    title: newPin.title,
    description: newPin.description,
    city: newPin.city,
    lat: Number(newPin.lat),
    lng: Number(newPin.lng),
    severity: newPin.severity as Pin["severity"],
    photoUrls: newPin.photoUrls,
  };
  return apiClient.post<Pin>("/trash-dumps", payload);
}

export function getPins() {
  return apiClient.get<Pin[]>("/trash-dumps", { auth: false });
}

export async function uploadTrashPhoto(file: File) {
  const { uploadUrl, photoUrl } = await requestPhotoUpload(file);

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

  return photoUrl;
}

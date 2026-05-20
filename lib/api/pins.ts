import type { Pin } from "@/models/pins";
import { apiClient } from "./client";
import type { AddPinFormInputs } from "@/components/forms/AddPinForm";

type CreatePinPayload = Pick<
  Pin,
  "title" | "description" | "city" | "lat" | "lng" | "severity"
>;

export function addPin(newPin: AddPinFormInputs) {
  const payload: CreatePinPayload = {
    title: newPin.title,
    description: newPin.description,
    city: newPin.city,
    lat: Number(newPin.lat),
    lng: Number(newPin.lng),
    severity: newPin.severity as Pin["severity"],
  };
  return apiClient.post<Pin>("/trash-dumps", payload);
}

import type { Event } from "@/models/event";
import { apiClient } from "./client";

type GetEventParams = {
  lat: number;
  lng: number;
};

export function getEvent({ lat, lng }: GetEventParams) {
  return apiClient.get<{ events: Event[] }>("/events", {
    params: { lat, lng },
  });
}

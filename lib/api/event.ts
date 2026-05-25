import type { Event } from "@/models/event";
import { apiClient } from "./client";

type GetEventParams = {
  lat: number;
  lng: number;
  range?: "1km" | "5km" | "20km";
};

export type CreateEventParams = {
  pinId: string;
  name: string;
  description: string;
  participantCount: number;
  maxParticipants: number;
  photoUrl?: string;
  scheduledAt: string;
  lat: number;
  lng: number;
};

type CreateEventResponse = {
  message: string;
  eventId?: string;
};

export function getEvent({ lat, lng, range }: GetEventParams) {
  return apiClient.get<{ events: Event[] }>("/events", {
    params: { lat, lng, range },
  });
}

export function createEvent(data: CreateEventParams) {
  return apiClient.post<CreateEventResponse>("/events", data);
}

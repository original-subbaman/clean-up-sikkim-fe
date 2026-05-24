import type { Event } from "@/models/event";
import { apiClient } from "./client";

type GetEventParams = {
  lat: number;
  lng: number;
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

export function getEvent({ lat, lng }: GetEventParams) {
  return apiClient.get<{ events: Event[] }>("/events", {
    params: { lat, lng },
  });
}

export function createEvent(data: CreateEventParams) {
  return apiClient.post<CreateEventResponse>("/events", data);
}

export type Event = {
  eventId: string; // UUID, PK
  pinId: string; // FK → DumpPins
  organisedBy: string; // userId
  title: string;
  description: string;
  city: string; // Denormalised from pin
  state: string; // Denormalised from pin
  scheduledAt: string; // ISO 8601 datetime
  status: "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";
  participantCount: number;
  maxParticipants?: number; // Optional cap
  pointsAwarded: number;
  photoUrls: string[]; // Post-cleanup photos
  createdAt: string; // ISO 8601
  geohash: string; // Same as pin id
};

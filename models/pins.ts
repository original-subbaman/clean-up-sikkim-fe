export type Pin = {
  pinId: string; // UUID, PK
  reportedBy: string; // userId
  title: string; // Short description
  description: string;
  lat: number;
  lng: number;
  geohash: string; // precision 6
  city: string;
  state: string;
  status: "REPORTED" | "VERIFIED" | "CLEANUP_SCHEDULED" | "CLEANED";
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  photoUrls?: string[]; // S3 URLs
  upvotes: number;
  createdAt: string; // ISO 8601
  cleanedAt: string | null; // ISO 8601, nullable
};

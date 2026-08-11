import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import { getEvent, type GetEventParams } from "@/lib/api/event";
import {
  normalizeRequestError,
  type ApiRequestError,
} from "@/lib/api/utils";
import type { Event } from "@/models/event";

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fakeBaseQuery<ApiRequestError>(),
  tagTypes: ["Events"],
  endpoints: (builder) => ({
    getEvents: builder.query<Event[], GetEventParams>({
      async queryFn(params) {
        try {
          const response = await getEvent(params);
          return { data: response.events };
        } catch (error) {
          return { error: normalizeRequestError(error) };
        }
      },
      providesTags: ["Events"],
    }),
  }),
});

export const { useGetEventsQuery } = eventsApi;

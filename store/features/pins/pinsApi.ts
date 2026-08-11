import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import type { AddPinFormInputs } from "@/components/forms/AddPinForm";
import {
  addPin,
  getPins,
  reactToPin,
  uploadTrashPhoto,
  type GetPinsParams,
  type PIN_REACTION,
} from "@/lib/api/pins";
import {
  normalizeRequestError,
  type ApiRequestError,
} from "@/lib/api/utils";
import type { Pin } from "@/models/pins";

export const pinsApi = createApi({
  reducerPath: "pinsApi",
  baseQuery: fakeBaseQuery<ApiRequestError>(),
  tagTypes: ["Pins"],

  endpoints: (builder) => ({
    getPins: builder.query<Pin[], GetPinsParams | void>({
      async queryFn(params) {
        try {
          return {
            data: await getPins(params || undefined),
          };
        } catch (error) {
          return { error: normalizeRequestError(error) };
        }
      },
      providesTags: ["Pins"],
    }),

    createPin: builder.mutation<Pin, AddPinFormInputs>({
      async queryFn(form) {
        try {
          const { photo: photos, ...fields } = form;
          const photo = photos?.[0];

          const photoKey = photo ? await uploadTrashPhoto(photo) : undefined;

          const pin = await addPin({
            ...fields,
            photoKey: photoKey ? [photoKey] : undefined,
          });

          return { data: pin };
        } catch (error) {
          return { error: normalizeRequestError(error) };
        }
      },
      invalidatesTags: ["Pins"],
    }),

    reactToPin: builder.mutation<
      unknown,
      { pinId: string; reaction: PIN_REACTION }
    >({
      async queryFn({ pinId, reaction }) {
        try {
          return {
            data: await reactToPin(pinId, reaction),
          };
        } catch (error) {
          return { error: normalizeRequestError(error) };
        }
      },
      invalidatesTags: ["Pins"],
    }),
  }),
});

export const {
  useGetPinsQuery,
  useCreatePinMutation,
  useReactToPinMutation,
} = pinsApi;

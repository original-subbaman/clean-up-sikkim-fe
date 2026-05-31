"use client";
import { Button } from "@/components/ui/button";
import ResponseAlert from "@/components/common/ResponseAlert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApiError } from "@/lib/api/client";
import { createEvent, type CreateEventParams } from "@/lib/api/event";
import type { Pin } from "@/models/pins";
import { fetchPins } from "@/store/features/pins/pinsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon, CheckCircle2Icon, SendHorizonal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { useRouter } from "next/navigation";

const getStartOfToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const formatDateTimeLocal = (date: Date) => {
  const pad = (value: number) => String(value).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const createEventSchema = z.object({
  pinId: z.string().min(1, "Meeting point is required"),
  name: z.string().min(1, "Event title is required"),
  description: z.string().min(1, "Event description is required"),
  participantCount: z.number().int().min(0),
  maxParticipants: z
    .number({ error: "Max participants must be a number" })
    .int("Max participants must be a whole number")
    .min(1, "At least 1 participant is required"),
  photoUrl: z.string().url("Photo URL must be a valid URL").optional(),
  scheduledAt: z
    .string()
    .min(1, "Scheduled date and time is required")
    .refine((value) => {
      const scheduledDate = new Date(value);

      if (Number.isNaN(scheduledDate.getTime())) {
        return false;
      }

      return scheduledDate >= getStartOfToday();
    }, "Scheduled date must be today or later"),
  lat: z.number(),
  lng: z.number(),
});

type createEventSchemaType = z.infer<typeof createEventSchema>;
type AssertSame<T extends true> = T;
type IsSame<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;
export type _CreateEventSchemaMatchesParams = AssertSame<
  IsSame<createEventSchemaType, CreateEventParams>
>;

function CreateEventPage() {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<createEventSchemaType>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      participantCount: 0,
    },
  });
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { pins, loading, error } = useAppSelector((state) => state.pins);

  const [isCreating, setIsCreating] = useState(false);
  const [createEventError, setCreateEventError] = useState<string | null>(null);
  const [createEventSuccess, setCreateEventSuccess] = useState<string | null>(
    null,
  );
  const minScheduledAt = useMemo(
    () => formatDateTimeLocal(getStartOfToday()),
    [],
  );

  useEffect(() => {
    if (pins.length === 0) {
      dispatch(fetchPins());
    }
  }, [dispatch, pins.length]);

  useEffect(() => {
    if (!createEventSuccess && !createEventError) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCreateEventSuccess(null);
      setCreateEventError(null);
      router.push("/map");
    }, 3000);

    return () => window.clearTimeout(timeoutId);
  }, [createEventError, createEventSuccess, router]);

  const availablePins = useMemo(
    () =>
      pins.filter((pin): pin is Pin & { pinId: string } => Boolean(pin.pinId)),
    [pins],
  );

  const onSubmit = async (data: createEventSchemaType) => {
    setCreateEventError(null);
    setCreateEventSuccess(null);
    setIsCreating(true);

    try {
      const res = await createEvent(data);
      setCreateEventSuccess(res.message || "Event created successfully.");
      reset({ participantCount: 0 });
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Failed to create event. Please try again later.";

      setCreateEventError(message);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="container max-w-lg mx-auto px-4 py-4 lg:py-16">
      {createEventSuccess ? (
        <ResponseAlert
          title="Success"
          description={createEventSuccess}
          icon={<CheckCircle2Icon />}
        />
      ) : null}
      {createEventError ? (
        <ResponseAlert
          title="Error"
          description={createEventError}
          variant="destructive"
          icon={<AlertCircleIcon />}
        />
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <section>
          <h2 className="text-xl font-bold text-on-surface mb-6">
            Event Details
          </h2>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <Label
                htmlFor="event-title"
                className="text-sm font-medium text-on-surface-variant ml-1"
              >
                Event Title
              </Label>
              <Input
                id="event-title"
                placeholder="e.g. Riverside Park Spring Clean"
                type="text"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-red-500 text-xs">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label
                htmlFor="description"
                className="text-sm font-medium text-on-surface-variant ml-1"
              >
                Description of Activities
              </Label>
              <Input
                multiline
                className="w-full px-4 py-3 bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 rounded-xl transition-all placeholder:text-slate-400"
                id="description"
                placeholder="Short description about the clean up event..."
                rows={2}
                {...register("description")}
              />
              {errors.description && (
                <span className="text-red-500 text-xs">
                  {errors.description.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label
                htmlFor="scheduled-at"
                className="text-sm font-medium text-on-surface-variant ml-1"
              >
                Date & Time
              </Label>
              <Input
                id="scheduled-at"
                type="datetime-local"
                min={minScheduledAt}
                {...register("scheduledAt")}
              />
              {errors.scheduledAt && (
                <span className="text-red-500 text-xs">
                  {errors.scheduledAt.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label
                htmlFor="event-location"
                className="text-sm font-medium text-on-surface-variant ml-1"
              >
                Meeting Point
              </Label>
              <Controller
                name="pinId"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ?? ""}
                    onValueChange={(pinId) => {
                      field.onChange(pinId);
                      const selectedPin = pins.find(
                        (pin) => pin.pinId === pinId,
                      );

                      if (selectedPin) {
                        setValue("lat", selectedPin.lat, {
                          shouldValidate: true,
                        });
                        setValue("lng", selectedPin.lng, {
                          shouldValidate: true,
                        });
                      }
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a trash dump pin" />
                    </SelectTrigger>
                    <SelectContent>
                      {loading ? (
                        <SelectItem value="loading" disabled>
                          Loading pins...
                        </SelectItem>
                      ) : error ? (
                        <SelectItem value="error" disabled>
                          Failed to load pins
                        </SelectItem>
                      ) : availablePins.length === 0 ? (
                        <SelectItem value="empty" disabled>
                          No pins found
                        </SelectItem>
                      ) : (
                        availablePins.map((pin) => (
                          <SelectItem key={pin.pinId} value={pin.pinId}>
                            {pin.title}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
              <input
                type="hidden"
                {...register("lat", { valueAsNumber: true })}
              />
              <input
                type="hidden"
                {...register("lng", { valueAsNumber: true })}
              />
              <input
                type="hidden"
                {...register("participantCount", { valueAsNumber: true })}
              />
              {errors.pinId && (
                <span className="text-red-500 text-xs">
                  {errors.pinId.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label
                htmlFor="max-participants"
                className="text-sm font-medium text-on-surface-variant ml-1"
              >
                Max Participants
              </Label>
              <Input
                id="max-participants"
                type="number"
                min={1}
                placeholder="e.g. 50"
                className="w-full"
                {...register("maxParticipants", { valueAsNumber: true })}
              />
              {errors.maxParticipants && (
                <span className="text-red-500 text-xs">
                  {errors.maxParticipants.message}
                </span>
              )}
            </div>
          </div>
        </section>
        <div className="pt-6">
          <Button
            type="submit"
            size={"xl"}
            className="w-full"
            disabled={isCreating}
          >
            <span>{isCreating ? "Publishing..." : "Publish Event"}</span>
            <SendHorizonal />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateEventPage;

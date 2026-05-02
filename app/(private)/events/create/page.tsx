"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SendHorizonal } from "lucide-react";
import { pins } from "@/lib/mock";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const createEventSchema = z.object({
  eventTitle: z.string().min(1, "Event title is required"),
  eventDescription: z.string().min(1, "Event description is required"),
  eventDate: z.string().min(1, "Event date is required"),
  eventTime: z.string().min(1, "Event time is required"),
  meetingPoint: z.string().min(1, "Meeting point is required"),
  maxParticipants: z
    .number({ error: "Max participants must be a number" })
    .min(1, "At least 1 participant is required"),
});

type createEventSchemaType = z.infer<typeof createEventSchema>;

function CreateEventPage() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<createEventSchemaType>({
    resolver: zodResolver(createEventSchema),
  });

  const onSubmit = (data: createEventSchemaType) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
  };

  return (
    <div className="container max-w-lg mx-auto px-4 py-4 lg:py-16">
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
                {...register("eventTitle")}
              />
              {errors.eventTitle && (
                <span className="text-red-500 text-xs">
                  {errors.eventTitle.message}
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
                {...register("eventDescription")}
              />
              {errors.eventDescription && (
                <span className="text-red-500 text-xs">
                  {errors.eventDescription.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label
                htmlFor="event-date"
                className="text-sm font-medium text-on-surface-variant ml-1"
              >
                Date
              </Label>
              <Input id="event-date" type="date" {...register("eventDate")} />
              {errors.eventDate && (
                <span className="text-red-500 text-xs">
                  {errors.eventDate.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label
                htmlFor="event-time"
                className="text-sm font-medium text-on-surface-variant ml-1"
              >
                Start Time
              </Label>
              <Input id="event-time" type="time" {...register("eventTime")} />
              {errors.eventTime && (
                <span className="text-red-500 text-xs">
                  {errors.eventTime.message}
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
                name="meetingPoint"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a trash dump pin" />
                    </SelectTrigger>
                    <SelectContent>
                      {pins.map((pin) => (
                        <SelectItem key={pin.pinId} value={pin.pinId}>
                          {pin.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.meetingPoint && (
                <span className="text-red-500 text-xs">
                  {errors.meetingPoint.message}
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
          <Button type="submit" size={"xl"} className="w-full">
            <span>Publish Event</span>
            <SendHorizonal />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateEventPage;

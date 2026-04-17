import * as React from "react";
import { useForm, useWatch, SubmitHandler, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type AddPinFormInputs = {
  title: string;
  description: string;
  location: string;
  lat: string;
  lng: string;
  severity: "low" | "medium" | "high" | "critical";
  photo?: FileList;
};

interface AddPinFormProps {
  onSubmit: (data: AddPinFormInputs) => void;
  defaultValues?: Partial<AddPinFormInputs>;
}

const AddPinForm: React.FC<AddPinFormProps> = ({ onSubmit, defaultValues }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddPinFormInputs>({
    defaultValues,
  });

  const submitHandler: SubmitHandler<AddPinFormInputs> = (data) => {
    onSubmit(data);
  };

  const descriptionValue = useWatch({ control, name: "description" });

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-4 px-2 w-full  mx-auto overflow-auto"
      encType="multipart/form-data"
    >
      {/* Title */}
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <Input
          {...register("title", { required: "Title is required" })}
          placeholder="Enter a title"
        />
        {errors.title && (
          <span className="text-red-500 text-xs">{errors.title.message}</span>
        )}
      </div>
      {/* Description */}
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <Textarea
          {...register("description", {
            required: "Description is required",
            maxLength: {
              value: 100,
              message: "Description cannot exceed 100 characters",
            },
          })}
          maxLength={100}
          placeholder="Describe the issue"
        />
        <div className="text-xs text-gray-500 text-right mt-1">
          {descriptionValue?.length || 0}/100
        </div>
        {errors.description && (
          <span className="text-red-500 text-xs">
            {errors.description.message}
          </span>
        )}
      </div>
      {/* Location */}
      <div>
        <label className="block mb-1 font-medium">Location</label>
        <Input
          {...register("location", { required: "Location is required" })}
          placeholder="Enter location or address"
        />
        {errors.location && (
          <span className="text-red-500 text-xs">
            {errors.location.message}
          </span>
        )}
      </div>
      {/* Lat/Lng in a single row */}
      <div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Latitude</label>
            <Input
              type="text"
              {...register("lat", { required: "Latitude is required" })}
              placeholder="Latitude"
            />
            {errors.lat && (
              <span className="text-red-500 text-xs">{errors.lat.message}</span>
            )}
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">Longitude</label>
            <Input
              type="text"
              {...register("lng", { required: "Longitude is required" })}
              placeholder="Longitude"
            />
            {errors.lng && (
              <span className="text-red-500 text-xs">{errors.lng.message}</span>
            )}
          </div>
        </div>
        <Button
          type="button"
          size="sm"
          className="mt-2"
          onClick={async () => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const lat = position.coords.latitude.toFixed(4);
                  const lng = position.coords.longitude.toFixed(4);
                  // Set values using react-hook-form
                  const latInput = document.querySelector(
                    'input[name="lat"]',
                  ) as HTMLInputElement;
                  const lngInput = document.querySelector(
                    'input[name="lng"]',
                  ) as HTMLInputElement;
                  if (latInput && lngInput) {
                    latInput.value = lat;
                    lngInput.value = lng;
                    latInput.dispatchEvent(
                      new Event("input", { bubbles: true }),
                    );
                    lngInput.dispatchEvent(
                      new Event("input", { bubbles: true }),
                    );
                  }
                },
                (error) => {
                  alert("Unable to fetch location: " + error.message);
                },
              );
            } else {
              alert("Geolocation is not supported by this browser.");
            }
          }}
        >
          Get current location
        </Button>
      </div>
      {/* Severity */}
      <div>
        <label className="block mb-1 font-medium">Severity</label>
        <Controller
          name="severity"
          control={control}
          rules={{ required: "Severity is required" }}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full font-medium">
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.severity && (
          <span className="text-red-500 text-xs">
            {errors.severity.message}
          </span>
        )}
      </div>
      {/* Photo upload */}
      <div>
        <label className="block mb-1 font-medium">Photo</label>
        <input
          type="file"
          accept="image/*"
          {...register("photo")}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
        />
        {errors.photo && (
          <span className="text-red-500 text-xs">
            {errors.photo.message as string}
          </span>
        )}
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        size={"lg"}
        className="w-full mt-2"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default AddPinForm;

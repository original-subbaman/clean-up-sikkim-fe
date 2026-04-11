import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getUserLocation() {
  return new Promise<{ success: boolean; message: string }>((resolve) => {
    if (!navigator.geolocation) {
      resolve({
        success: false,
        message: "Geolocation is not supported by your browser",
      });
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          resolve({
            success: true,
            message: `Latitude: ${latitude} °, Longitude: ${longitude} °`,
          });
        },
        (error) => {
          resolve({
            success: false,
            message: "Unable to retrieve your location",
          });
        },
      );
    }
  });
}

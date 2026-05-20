import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ResponseAlertProps {
  title: string;
  description: string;
  variant?: "default" | "destructive";
  icon?: ReactNode;
}

function ResponseAlert({
  title,
  description,
  icon,
  variant = "default",
}: ResponseAlertProps) {
  return (
    <Alert
      variant={variant}
      className={cn(
        "fixed top-6 right-4 z-9999 w-[calc(100%-2rem)] max-w-md shadow-lg",
        variant === "default" &&
          "border-green-200 bg-green-50 text-green-900 **:data-[slot=alert-description]:text-green-800",
        variant === "destructive" &&
          "border-red-200 bg-red-50 text-red-900 **:data-[slot=alert-description]:text-red-800",
      )}
    >
      {icon}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}

export default ResponseAlert;

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface FullScreenDialogProps {
  open: boolean;
  title: string;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  showCloseButton?: boolean;
}

export function FullScreenDialog({
  open,
  onOpenChange,
  title,
  children,
  showCloseButton = true,
}: FullScreenDialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className="
        fixed inset-0 z-50 bg-black/50 
        data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out"
        />
        <DialogPrimitive.Content
          className="
        fixed inset-0 z-50 flex flex-col bg-background w-screen h-screen p-2 m-0 
        shadow-lg focus:outline-none 
        data-[state=open]:animate-slide-in data-[state=closed]:animate-slide-out"
        >
          <div className="flex items-center justify-between mb-4">
            <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
            {showCloseButton && (
              <DialogPrimitive.Close asChild>
                <Button type="button" aria-label="Close" variant="ghost">
                  <X className="w-5 h-5" />
                </Button>
              </DialogPrimitive.Close>
            )}
          </div>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export default FullScreenDialog;

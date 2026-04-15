import { Plus } from "lucide-react";
import { Button } from "../ui/button";

type FABPosition = "right" | "center" | "left";

export function FAB({
  onClick,
  position = "right",
}: {
  onClick: () => void;
  position?: FABPosition;
}) {
  let horizontalClass = "right-6";
  if (position === "center") {
    horizontalClass = "left-1/2 -translate-x-1/2";
  } else if (position === "left") {
    horizontalClass = "left-6";
  }
  return (
    <Button
      onClick={onClick}
      size="icon"
      className={`fixed bottom-2 ${horizontalClass} z-50 h-12 w-12 rounded-full shadow-lg`}
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
}

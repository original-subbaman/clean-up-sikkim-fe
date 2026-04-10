import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBoxProps {
  label: string;
  className?: string;
  iconClassName?: string;
  inputClassName?: string;
}

export function SearchBox({
  label,
  className,
  iconClassName,
  inputClassName,
}: SearchBoxProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <Search
        className={cn(
          "absolute left-2 top-2 h-4 w-4 text-muted-foreground",
          iconClassName,
        )}
      />
      <Input placeholder={label} className={cn("pl-10", inputClassName)} />
    </div>
  );
}

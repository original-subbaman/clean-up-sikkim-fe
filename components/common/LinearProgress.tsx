import { cn } from "@/lib/utils";

interface LinearProgressProps {
  value: number;
  max?: number;
  className?: string;
  trackClassName?: string;
  indicatorClassName?: string;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function LinearProgress({
  value,
  max = 100,
  className,
  trackClassName,
  indicatorClassName,
}: LinearProgressProps) {
  const safeMax = max > 0 ? max : 100;
  const safeValue = clamp(value, 0, safeMax);
  const percent = (safeValue / safeMax) * 100;

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "h-3 w-full overflow-hidden rounded-full bg-surface-container border border-primary",
          trackClassName,
        )}
      >
        <div
          className={cn(
            "h-full rounded-full bg-primary transition-[width] duration-300 ease-out",
            indicatorClassName,
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

import type * as React from "react";

import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<"article">;

function Card({ className, ...props }: CardProps) {
  return (
    <article
      className={cn(
        "rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-[0_20px_40px_rgba(15,82,56,0.06)]",
        className,
      )}
      {...props}
    />
  );
}

interface MyEventCardProps {
  title?: string;
  status?: string;
  participantCount?: number;
  maxParticipants?: number;
  date?: string;
}

function MyEventCard({
  title = "Community Cleanup Drive",
  status = "Goal Met",
  date = "2024-06-15",
  participantCount = 120,
  maxParticipants = 120,
}: MyEventCardProps) {
  const progress =
    maxParticipants > 0
      ? Math.min((participantCount / maxParticipants) * 100, 100)
      : 0;

  return (
    <Card>
      <span className="bg-foreground rounded-xl text-white text-xs px-2 py-0.5">
        {status}
      </span>
      <div className="mb-6">
        <h3 className="text-lg font-bold text-on-surface">{title}</h3>
        <span className="text-on-surface-variant text-sm">{date}</span>
      </div>

      <div>
        <div className="mb-2 gap-4 text-xs font-bold">
          <span className="text-primary uppercase tracking-wider">
            {participantCount} Participants
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-low">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Card>
  );
}

export default MyEventCard;

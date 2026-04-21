import React from "react";

type EventStatus = "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";

interface EventStatusBadgeProps {
  status: EventStatus;
}

const statusStyles: Record<EventStatus, { bg: string; text: string }> = {
  UPCOMING: {
    bg: "bg-primary-container",
    text: "text-on-primary-container",
  },
  ONGOING: {
    bg: "bg-secondary-container",
    text: "text-on-secondary-container",
  },
  COMPLETED: {
    bg: "bg-success-container",
    text: "text-on-success-container",
  },
  CANCELLED: {
    bg: "bg-error-container",
    text: "text-on-error-container",
  },
};

export const EventStatusBadge: React.FC<EventStatusBadgeProps> = ({
  status,
}) => {
  const { bg, text } = statusStyles[status];
  return (
    <div
      className={`mb-6 inline-flex items-center px-4 py-1.5 rounded-full ${bg} ${text} text-xs font-bold tracking-widest uppercase`}
    >
      {status}
    </div>
  );
};

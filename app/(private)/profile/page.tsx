import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Event } from "@/models/event";
import { Calendar, HandHeart, MapPin, Pin } from "lucide-react";
import { ReactNode } from "react";

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/30 text-center">
      <div className="text-3xl font-bold font-headline text-primary">
        {value}
      </div>
      <div className="text-[11px] uppercase font-bold text-outline tracking-wider mt-1">
        {label}
      </div>
    </div>
  );
}

type ActivityStatus = Event["status"];

type ActivityBaseValue = {
  title: string;
  date: string;
};

type ActivityValue =
  | (ActivityBaseValue & {
      points: string;
      status?: never;
    })
  | (ActivityBaseValue & {
      status: ActivityStatus;
      points?: never;
    });

const activityStatusStyles: Record<ActivityStatus, string> = {
  UPCOMING: "bg-primary-container text-on-primary-container",
  ONGOING: "bg-secondary-container text-on-secondary-container",
  COMPLETED: "bg-success-container text-on-success-container",
  CANCELLED: "bg-error-container text-on-error-container",
};

function ActivityCard(value: ActivityValue) {
  return (
    <div className="p-4 flex items-center justify-between hover:bg-surface-container-low/50 transition-colors">
      <div>
        <h4 className="font-bold text-sm">{value.title}</h4>
        <p className="text-[11px] text-on-surface-variant mt-0.5">
          {value.date}
        </p>
      </div>
      {"points" in value ? (
        <span className="text-sm font-bold text-primary">{value.points}</span>
      ) : (
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${activityStatusStyles[value.status]}`}
        >
          {value.status}
        </span>
      )}
    </div>
  );
}

function ActivityList({
  title,
  titleIcon,
  values,
}: {
  title: string;
  titleIcon: ReactNode;
  values: ActivityValue[];
}) {
  return (
    <div>
      <div className="flex gap-2 items-center">
        {titleIcon}
        <h3 className="font-bold">{title}</h3>
      </div>

      {values.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500">No activity yet.</p>
      ) : (
        <div className="divide-y divide-outline-variant/30 mt-4">
          {values.map((value) => (
            <ActivityCard key={`${value.title}-${value.date}`} {...value} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="container mx-auto max-w-lg md:max-w-5xl px-4 py-4 lg:py-16">
      {/* Avatar + Name section  */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-16">
        <Avatar className="size-20 mb-4 md:mb-0">
          <AvatarImage src="" alt="User name" />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">Abhishek Subba</h1>
          <div className="flex flex-col items-center md:flex-row md:items-start gap-2">
            <div className="flex items-center text-gray-500 gap-1">
              <MapPin className="w-4 h-4" />
              <p>Gangtok, Sikkim</p>
            </div>
            <div className="flex items-center text-gray-500 gap-1">
              <Calendar className="w-4 h-4" />
              <p>Member since: June 2024</p>
            </div>
          </div>
        </div>
      </div>
      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
        <StatCard label="Total Points" value="12, 456" />
        <StatCard label="Cleanups Attended" value="24" />
        <StatCard label="Pins Reported" value="142" />
      </section>
      {/* Activity Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Last 5 cleanups */}
        <ActivityList
          title="Last 5 Cleanup Attended"
          titleIcon={<HandHeart />}
          values={[
            {
              title: "MG Marg Cleanup Drive",
              date: "Apr 20, 2026",
              points: "+500 pts",
            },
            {
              title: "Tsomgo Lake Trail Cleanup",
              date: "Mar 28, 2026",
              points: "+650 pts",
            },
            {
              title: "Ranipool Riverbank Cleanup",
              date: "Feb 16, 2026",
              points: "+450 pts",
            },
            {
              title: "Namchi Community Cleanup",
              date: "Jan 25, 2026",
              points: "+550 pts",
            },
            {
              title: "Pelling Viewpoint Cleanup",
              date: "Dec 14, 2025",
              points: "+400 pts",
            },
          ]}
        />
        {/* Last 5 pins reported */}
        <ActivityList
          title="Last 5 Pins Reported"
          titleIcon={<Pin />}
          values={[
            {
              title: "Overflowing bin near Deorali taxi stand",
              date: "May 02, 2026",
              status: "ONGOING",
            },
            {
              title: "Plastic waste beside Ranka Road",
              date: "Apr 18, 2026",
              status: "UPCOMING",
            },
            {
              title: "Dumping spot near Tadong market",
              date: "Mar 30, 2026",
              status: "COMPLETED",
            },
            {
              title: "Littered trail at Banjhakri Falls",
              date: "Feb 22, 2026",
              status: "COMPLETED",
            },
            {
              title: "Blocked drain near Arithang",
              date: "Jan 09, 2026",
              status: "CANCELLED",
            },
          ]}
        />
      </section>
    </div>
  );
}

export default ProfilePage;

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar, Globe, Users } from "lucide-react";
import MyEventCard from "./_components/MyEventCard";

const StatCards = [
  {
    icon: <Calendar />,
    value: "14",
    label: "Total Events Organized",
    isHighlight: false,
  },
  {
    icon: <Users />,
    value: "120",
    label: "Total Volunteers Engaged",
    isHighlight: false,
  },
  {
    icon: <Globe />,
    value: "5",
    label: "Total Points Earned",
    isHighlight: true,
  },
];

const myEvents = [
  {
    title: "Ridge Park Cleanup",
    status: "UPCOMING",
    participantCount: 48,
    maxParticipants: 80,
  },
  {
    title: "MG Marg Waste Audit",
    status: "ONGOING",
    participantCount: 120,
    maxParticipants: 120,
  },
  {
    title: "Ranka Trail Restoration",
    status: "COMPLETED",
    participantCount: 96,
    maxParticipants: 100,
  },
  {
    title: "Tadong Stream Cleanup",
    status: "CANCELLED",
    participantCount: 18,
    maxParticipants: 60,
  },
];

function EventCardGrid({ status }: { status?: string }) {
  const events = status
    ? myEvents.filter((event) => event.status === status)
    : myEvents;

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      {events.map((event) => (
        <MyEventCard
          key={event.title}
          title={event.title}
          status={event.status}
          participantCount={event.participantCount}
          maxParticipants={event.maxParticipants}
        />
      ))}
    </div>
  );
}

export default function MyEventsPage() {
  return (
    <main className="container max-w-lg md:max-w-5xl mx-auto px-4 py-4 lg:py-16">
      <section>
        <h6 className="text-sm text-tertiary uppercase font-semibold">
          Organizer Dashboard
        </h6>
        <h1 className="text-[3rem] md:text-[4rem] font-bold">My Events</h1>
        <p className="text-sm md:text-md">
          Oversee your environmental initiatives and see the impact of your
          work.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {StatCards.map((stat, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow ${
              stat.isHighlight
                ? "bg-primary text-white"
                : "bg-white text-primary"
            }`}
          >
            <div className="text-4xl mb-4">{stat.icon}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div
              className={`text-sm ${
                stat.isHighlight ? "text-white/80" : "text-gray-500"
              }`}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      <section className="mt-8">
        <Tabs defaultValue="all" className="flex-col">
          <TabsList className="w-full max-w-none flex-wrap md:flex-nowrap justify-start gap-2 h-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <EventCardGrid />
          </TabsContent>
          <TabsContent value="upcoming">
            <EventCardGrid status="UPCOMING" />
          </TabsContent>
          <TabsContent value="ongoing">
            <EventCardGrid status="ONGOING" />
          </TabsContent>
          <TabsContent value="completed">
            <EventCardGrid status="COMPLETED" />
          </TabsContent>
          <TabsContent value="cancelled">
            <EventCardGrid status="CANCELLED" />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}

import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
interface EventCardProps {
  eventId: string;
  title: string;
  description: string;
  image?: string;
  reportedAt: string;
  distance: string;
  link?: string;
}

function EventCard({
  title,
  description,
  image,
  reportedAt,
  distance,
  link,
}: EventCardProps) {
  const card = (
    <div
      className="p-3 bg-surface-container-lowest rounded-2xl w-full min-w-0
    shadow-md hover:shadow-md transition-all cursor-pointer group 
    border border-transparent hover:border-emerald-100 shrink"
    >
      <div className="flex gap-3 w-full min-w-0">
        <div className="h-8 w-8 md:h-16 md:w-16 rounded-lg overflow-hidden shrink-0">
          {image ? (
            <Image
              alt="Trash site thumbnail"
              src={image}
              fill
              sizes="(max-width: 64px) 100vw, 64px"
              className="object-cover"
              priority={false}
            />
          ) : (
            <div className="flex items-center justify-center h-full w-full bg-gray-100 rounded-lg">
              <Trash2Icon />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-1 lg:flex-row justify-between items-start mb-1 flex-wrap min-w-0">
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {reportedAt}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              {distance} away
            </span>
          </div>
          <h4 className="text-sm font-bold text-on-surface truncate group-hover:text-emerald-800 transition-colors min-w-0">
            {title}
          </h4>
          <p className="text-[11px] text-on-surface-variant truncate min-w-0">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
  return link ? (
    <Link href={link} className="block w-full min-w-0">
      {card}
    </Link>
  ) : (
    card
  );
}
export type { EventCardProps };
export default EventCard;

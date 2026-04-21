import { Button } from "@/components/ui/button";
import {
  MapPin,
  Clock10,
  Star,
  GroupIcon,
  Images,
  ExternalLink,
} from "lucide-react";
import { EventStatusBadge } from "@/components/common/EventStatusBadge";
import { LinearProgress } from "@/components/common/LinearProgress";

interface InfoCardProps {
  icon: React.ReactNode;
  iconBgColor: string;
  label: string;
  value: string;
  subtitle: string;
}

interface LocationCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  ctaLabel: string;
}

function InfoCard({
  icon,
  iconBgColor,
  label,
  value,
  subtitle,
}: InfoCardProps) {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-4xl shadow-[0_0_30px_rgba(15,82,56,0.12)] flex flex-col items-center text-center">
      <div
        className={`w-12 h-12 ${iconBgColor} flex items-center justify-center rounded-2xl mb-4`}
      >
        {icon}
      </div>
      <p className="text-[10px] font-label font-bold tracking-widest text-outline uppercase mb-1">
        {label}
      </p>
      <p className="text-lg font-bold text-on-surface">{value}</p>
      <p className="text-sm font-medium text-on-surface-variant">{subtitle}</p>
    </div>
  );
}

function LocationCard({
  imageSrc,
  imageAlt,
  title,
  description,
  ctaLabel,
}: LocationCardProps) {
  return (
    <div className="bg-surface-container-lowest p-4 rounded-[2.5rem] shadow-[0_20px_40px_rgba(15,82,56,0.06)] border border-outline-variant/10">
      <div className="relative h-48 w-full rounded-[1.8rem] overflow-hidden  bg-surface-container">
        <img
          className="w-full h-full object-cover"
          data-alt={imageAlt}
          src={imageSrc}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <MapPin className="text-tertiary w-9 h-9 drop-shadow-md" />
        </div>
      </div>
      <div className="px-2 py-2">
        <p className="font-bold text-on-surface mb-1">{title}</p>
        <p className="text-sm text-outline mb-4 leading-relaxed">
          {description}
        </p>
        <Button
          variant={"ghost"}
          className=" text-sm underline underline-offset-4 flex items-center gap-2"
        >
          {ctaLabel}
          <ExternalLink />
        </Button>
      </div>
    </div>
  );
}

function EventDetailsPage() {
  return (
    <main className="max-w-7xl mx-auto mb-16 ">
      <section className="px-6 md:px-12 pt-8 md:pt-12 md:pb-16 bg-surface-container-lowest">
        <div className="max-w-4xl">
          <EventStatusBadge status="UPCOMING" />
          <h1 className="text-4xl md:text-6xl font-headline font-extrabold text-on-surface tracking-tight leading-tight mb-8">
            Beaches Clean Up: <br />
            <span className="text-editorial-gradient">Cuffe Parade</span>
          </h1>
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-4">
              <img
                className="w-12 h-12 rounded-full object-cover border-2 border-surface-container-highest"
                data-alt="headshot of Rajesh Kumar a smiling Indian man in casual attire outdoors"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjvKyZxNXH0E_uKIjhampCIglJaE2EtmIbxruCbUqMkloQYQ7eBHUhThU4ymxfIqgXr-JEOSKQOUEGyvx5hsWMS1FkOIlu6XbSQ-5KXPle3sISWJNTrjcE3vIUvtagi4pXdJ4XoM09p0tptsfgZY-g_3yTSn5Xu6zELq0cdA8RPbs5cmQj8qskhCjiTJ2JmEDmcR4VsSs5TTfKnyxSMZkB3XrJpha539Lh6HqEGjp0qD-QemNU89RfWe12G2Gu6CpMsibspvgwxr0"
              />
              <div>
                <p className="text-[10px] font-label font-semibold tracking-widest text-outline uppercase">
                  Organized By
                </p>
                <p className="text-base font-bold text-on-surface">
                  Rajesh Kumar
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-primary font-bold px-4 py-2 bg-primary-fixed/30 rounded-xl">
              <MapPin className="w-5 h-5" />
              <span className="text-sm">Mumbai, Maharashtra</span>
            </div>
          </div>
        </div>
      </section>
      <div className="px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
        <div className="lg:col-span-8 space-y-16">
          {/* Initial Hotspot Status */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-2xl font-headline font-bold text-on-surface">
                Initial Hotspot Status
              </h2>
              <div className="h-0.5 flex-1 bg-surface-container-highest"></div>
            </div>
            <p className="text-sm text-outline mb-6 font-medium">
              Photos taken during the site survey on Oct 15, 2024
            </p>
            <div className="aspect-4/3 rounded-2xl overflow-hidden group relative max-h-80 w-full">
              <img
                className="w-full object-contain transition-transform duration-500 group-hover:scale-110"
                data-alt="heaps of plastic waste washed up on a rocky beach shoreline"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaBP6mt9xUJm-3KuElPY4J_RCfoMK32rGvsdJaQV37rhcfDORa2GHIKUI_6wSFYeAMaOxGahCxFMNKLkryj5EuDwKXJbM_V3upAfYBS7Sv5OfP4w3X9Zw9SJwFm5nuy7Wig5AITb9O7j79kCChBD6hQW2jZQp2cm8hyZ06vkUbv8NObwLBFjB_aGuV_OJ2h0cGnpGdX0-oF8fJnLXV_nFaD6tfpWwnx7JqRVK4Vf3Y5T9sjASUlabz8wXSwIF3fym_HQC0x_19Vvs"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
            </div>
          </section>
          {/* About Event */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-2xl font-headline font-bold text-on-surface">
                About the Event
              </h2>
              <div className="h-0.5 flex-1 bg-surface-container-highest"></div>
            </div>
            <p className="text-lg leading-relaxed text-on-surface-variant font-body mb-8">
              Join us for our monthly beach cleanup at Cuffe Parade. We will be
              collecting plastic waste and segregating it for recycling. Gloves
              and bags will be provided. This initiative aims to restore the
              natural beauty of Mumbai's coastline while fostering a community
              of responsible citizens.
            </p>
          </section>
          {/* Location */}
          <section className="block md:hidden">
            <h2 className="text-2xl font-headline font-bold text-on-surface mb-6">
              Location
            </h2>
            <LocationCard
              imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBOJzuMIqvv7URvA9ETYCxG_CXCX4XOI-ZrUIx9EtonnY1-ggSYGm-j6DyziPHelhOW8j7MTGeNDtviYd2mLezfMON74D-d8FOQkE1asVuowWr9CtkL0ogai3uGu6GfwUlZ8TQxQVPJzXpDyobTxMwz2VJ6eM_M55iB8_IDoHsad_Bxj2VOsSDs9ae7T_np2lX-CG3bvoJgOsyx7BlURnnDsvqGILPvmaCQBwu_gp9nMmz_YzXnQteF-zJASLmQiZGI16mHvet18Pk"
              imageAlt="map view of coastal Mumbai showing Cuffe Parade area and the Arabian sea coastline"
              title="Cuffe Parade Beach"
              description="Meeting point: Near the main entrance park area at 7:45 AM."
              ctaLabel="Get Directions"
            />
          </section>
          {/* Start Time, location etc */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard
              icon={<Clock10 className="w-5 h-5 text-on-primary-fixed" />}
              iconBgColor="bg-primary-fixed"
              label="Time"
              value="Oct 24, 2024"
              subtitle="08:00 AM IST"
            />
            <InfoCard
              icon={<Star className="w-5 h-5 text-on-primary-fixed" />}
              iconBgColor="bg-secondary-container"
              label="Impact"
              value="500 Points"
              subtitle="Per Volunteer"
            />
            <InfoCard
              icon={<GroupIcon className="w-5 h-5 text-on-primary-container" />}
              iconBgColor="bg-primary-container"
              label="Capacity"
              value="42 / 100"
              subtitle="Joined"
            />
          </section>
          {/* Post Clean up */}
          <section>
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl font-headline font-bold text-on-surface mb-2">
                  Post-cleanup Photos
                </h2>
                <p className="text-sm text-outline font-medium">
                  Coming soon after the event completion
                </p>
              </div>
              <Images className="w-6 h-6 text-outline" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-40 grayscale">
              <div className="aspect-square bg-surface-container rounded-2xl border-2 border-dashed border-outline-variant flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-outline-variant"
                  data-icon="add_a_photo"
                >
                  add_a_photo
                </span>
              </div>
              <div className="aspect-square bg-surface-container rounded-2xl border-2 border-dashed border-outline-variant flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-outline-variant"
                  data-icon="add_a_photo"
                >
                  add_a_photo
                </span>
              </div>
              <div className="aspect-square bg-surface-container rounded-2xl border-2 border-dashed border-outline-variant flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-outline-variant"
                  data-icon="add_a_photo"
                >
                  add_a_photo
                </span>
              </div>
              <div className="aspect-square bg-surface-container rounded-2xl border-2 border-dashed border-outline-variant flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-outline-variant"
                  data-icon="add_a_photo"
                >
                  add_a_photo
                </span>
              </div>
            </div>
          </section>
        </div>
        <aside className="hidden md:block lg:col-span-4">
          <div className="sticky top-24 space-y-8">
            <div className="bg-surface-container-lowest p-8 rounded-[2.5rem] shadow-[0_20px_40px_rgba(15,82,56,0.06)] border border-outline-variant/10">
              <div className="mb-8">
                <h3 className="text-xl font-headline font-bold text-on-surface mb-4">
                  Reserve Your Spot
                </h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-on-surface-variant">
                    Registration Progress
                  </span>
                  <span className="text-sm font-bold text-primary">42%</span>
                </div>
                <LinearProgress value={42} />
              </div>
              <Button size={"lg"} className="w-full rounded-2xl h-12">
                Join Cleanup
              </Button>
            </div>
            <LocationCard
              imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBOJzuMIqvv7URvA9ETYCxG_CXCX4XOI-ZrUIx9EtonnY1-ggSYGm-j6DyziPHelhOW8j7MTGeNDtviYd2mLezfMON74D-d8FOQkE1asVuowWr9CtkL0ogai3uGu6GfwUlZ8TQxQVPJzXpDyobTxMwz2VJ6eM_M55iB8_IDoHsad_Bxj2VOsSDs9ae7T_np2lX-CG3bvoJgOsyx7BlURnnDsvqGILPvmaCQBwu_gp9nMmz_YzXnQteF-zJASLmQiZGI16mHvet18Pk"
              imageAlt="map view of coastal Mumbai showing Cuffe Parade area and the Arabian sea coastline"
              title="Cuffe Parade Beach"
              description="Meeting point: Near the main entrance park area at 7:45 AM."
              ctaLabel="Get Directions"
            />
          </div>
        </aside>
      </div>
      <Button
        size={"2xl"}
        className="block sm:hidden fixed z-50 bottom-0 w-full m-0 rounded-none "
      >
        Join
      </Button>
    </main>
  );
}

export default EventDetailsPage;

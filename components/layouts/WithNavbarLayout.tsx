import Navbar from "@/components/Navbar";
import { type NavLinkItem } from "@/lib/routes";

const mapLinks: NavLinkItem[] = [
  { path: "/map", label: "Map", isPrivate: false },
  { path: "/community", label: "Community", isPrivate: false },
  { path: "/events/create", label: "Add Event", isPrivate: true },
  { path: "/events/my-events", label: "My Events", isPrivate: true },
];

export default function WithNavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar routes={mapLinks} />
      {children}
    </>
  );
}

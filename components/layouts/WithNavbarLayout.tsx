import Navbar from "@/components/Navbar";
import { type NavLinkItem } from "@/lib/routes";

const mapLinks: NavLinkItem[] = [
  { path: "/map", label: "Map", isPrivate: false },
  { path: "/community", label: "Community", isPrivate: true },
  { path: "/events/create", label: "Add Event", isPrivate: true },
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

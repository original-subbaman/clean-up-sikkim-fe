import Navbar from "@/components/Navbar";
import { NavLinkItem } from "@/lib/routes";

const mapLinks: NavLinkItem[] = [
  { path: "/map", label: "Map" },
  { path: "/community", label: "Community" },
  { path: "/events/create", label: "Add Event" },
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

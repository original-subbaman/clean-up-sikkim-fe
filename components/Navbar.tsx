"use client";
import { NavLinkItem } from "@/lib/routes";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Bell, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useAuth } from "./providers/AuthProvider";
import { Button } from "./ui/button";

type NavLinkProps = {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
  variant?: "default" | "primaryBg";
};

function NavLink({
  href,
  isActive,
  children,
  variant = "default",
}: NavLinkProps) {
  let baseClass = isActive
    ? "text-primary underline underline-offset-4 decoration-[3px] font-extrabold"
    : `font-semibold text-neutral-500 hover:text-primary 
      hover:underline hover:underline-offset-4 decoration-[3px]
      transition-colors duration-300 `;

  if (variant === "primaryBg") {
    baseClass =
      "bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300" +
      (isActive ? " ring-2 ring-primary/60" : "");
  }

  return (
    <Link href={href} className={`${baseClass} transition-all duration-500`}>
      {children}
    </Link>
  );
}

export default function Navbar({ routes }: { routes: readonly NavLinkItem[] }) {
  const pathName = usePathname();
  const router = useRouter();
  const { user, isLoading, isAuthenticated, signOut } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const visibleRoutes = useMemo(
    () =>
      routes.filter((route) => {
        if (!route.isPrivate) return true;

        return !isLoading && isAuthenticated;
      }),
    [isAuthenticated, isLoading, routes],
  );

  const closeDrawer = () => setDrawerOpen(false);

  const handleSignOut = async () => {
    await signOut();
    closeDrawer();
    router.replace("/map");
  };

  return (
    <>
      <nav className="w-full py-4 md:px-8 shadow-2xs sticky top-0 z-50 bg-background">
        <div className="container  flex items-center md:justify-between md:mx-auto">
          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-primary hover:bg-primary/10 transition-colors"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link href="/">
            <p className="font-bold text-lg text-primary mr-10">
              Clean Up Sikkim
            </p>
          </Link>
          <div className="hidden md:flex space-x-4">
            {visibleRoutes.map((route) => (
              <NavLink
                key={route.path}
                href={route.path}
                isActive={pathName === route.path}
              >
                {route.label}
              </NavLink>
            ))}
          </div>
          {/* Profile */}
          {isAuthenticated ? (
            <div className="hidden md:flex gap-4  items-center justify-center">
              <NavLink
                href="/notifications"
                isActive={pathName === "/notifications"}
              >
                <Bell className="w-5 h-5 text-primary" />
              </NavLink>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="focus:outline-none rounded-full border-2 
                    border-primary w-8 h-8 overflow-hidden"
                  >
                    <User className="w-full h-full text-primary" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  sideOffset={10}
                  className="w-56 bg-white shadow-2xl rounded-md"
                >
                  <div className="flex flex-col items-center p-2">
                    <User className="w-10 h-10 rounded-full mb-2 border-2 border-primary text-primary" />
                    <p className="font-semibold">{user?.name || "User"}</p>
                    <p className="text-xs text-gray-500 mb-2">
                      {user?.email || "No email"}
                    </p>
                    <Button variant="destructive" onClick={handleSignOut}>
                      Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <div className="hidden md:flex space-x-4 items-center justify-center">
              <NavLink href="/login" isActive={pathName === "/login"}>
                Login
              </NavLink>
              <NavLink
                href="/signup"
                isActive={pathName === "/signup"}
                variant="primaryBg"
              >
                Join Movement
              </NavLink>
            </div>
          )}
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          drawerOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeDrawer}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 bg-background shadow-2xl flex flex-col
          transform transition-transform duration-300 ease-in-out md:hidden
          ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
          <p className="font-bold text-lg text-primary">Clean Up Sikkim</p>
          <button
            onClick={closeDrawer}
            className="p-1.5 rounded-md text-neutral-500 hover:text-primary hover:bg-primary/10 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer nav links */}
        <div className="flex flex-col gap-1 px-4 py-4 flex-1">
          {visibleRoutes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              onClick={closeDrawer}
              className={`px-4 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                pathName === route.path
                  ? "bg-primary/10 text-primary"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-primary"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </div>

        {/* Drawer auth section */}
        <div className="px-4 py-5 border-t border-neutral-100 flex flex-col gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <User className="w-10 h-10 rounded-full border-2 border-primary text-primary" />
              <div className="flex-1">
                <p className="font-semibold text-sm">{user?.name || "User"}</p>
                <p className="text-xs text-gray-500">
                  {user?.email || "No email"}
                </p>
              </div>
              <button
                onClick={() => {
                  void handleSignOut();
                }}
                className="text-xs px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                onClick={closeDrawer}
                className="w-full text-center py-2.5 rounded-lg font-semibold text-neutral-600 border border-neutral-200 hover:border-primary hover:text-primary transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={closeDrawer}
                className="w-full text-center py-2.5 rounded-lg font-semibold bg-primary text-white hover:bg-primary/90 transition-colors duration-200"
              >
                Join Movement
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

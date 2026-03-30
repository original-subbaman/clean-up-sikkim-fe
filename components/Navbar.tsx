"use client";
import { NavLinkItem } from "@/lib/routes";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Bell } from "lucide-react";
import { usePathname } from "next/navigation";

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
    <a href={href} className={`${baseClass} transition-all duration-500`}>
      {children}
    </a>
  );
}

export default function Navbar({ routes }: { routes: readonly NavLinkItem[] }) {
  const pathName = usePathname();
  const isAuthenticated = false; // Replace with actual authentication logic
  return (
    <nav className="w-full py-4 px-8 shadow-2xs sticky top-0 z-50 bg-background">
      <div className="container mx-auto flex items-center justify-between">
        <p className="font-bold text-lg text-primary mr-10">Clean Up Sikkim</p>
        <div className="space-x-4 flex ">
          {routes.map((route) => (
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
          <div className="space-x-4 flex items-center justify-center">
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
                  <img
                    src="/globe.svg"
                    alt="User profile"
                    className="w-full h-full object-cover"
                  />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <div className="flex flex-col items-center p-2">
                  <img
                    src="/globe.svg"
                    alt="User profile"
                    className="w-16 h-16 rounded-full mb-2 border-2 border-primary"
                  />
                  <p className="font-semibold">John Doe</p>
                  <p className="text-xs text-gray-500 mb-2">john@example.com</p>
                  <button className="mt-2 px-4 py-1 bg-primary text-white rounded hover:bg-primary/90">
                    Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <div className="space-x-4 flex items-center justify-center">
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
  );
}

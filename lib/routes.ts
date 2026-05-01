export const LandingPageRoutes = [
  { path: "#mission", label: "Our Mission", isPrivate: false },
  { path: "#how-it-works", label: "How It Works", isPrivate: false },
  { path: "#impact", label: "Impact", isPrivate: false },
  { path: "#call-to-action", label: "Call To Action", isPrivate: false },
] satisfies NavLinkItem[];

export type NavLinkItem = {
  path: string;
  label: string;
  isPrivate: boolean;
};

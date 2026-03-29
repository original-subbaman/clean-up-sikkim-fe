export const LandingPageRoutes = [
  { path: "/mission", label: "Our Mission" },
  { path: "/pin-waste", label: "Pin Waste" },
  { path: "/rewards", label: "Rewards" },
  { path: "/community", label: "Community" },
] as NavLinkItem[];

export type NavLinkItem = {
  path: string;
  label: string;
};

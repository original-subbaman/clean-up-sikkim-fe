export const LandingPageRoutes = [
  { path: "#mission", label: "Our Mission" },
  { path: "#how-it-works", label: "How It Works" },
  { path: "#impact", label: "Impact" },
  { path: "#call-to-action", label: "Call To Action" },
] as NavLinkItem[];

export type NavLinkItem = {
  path: string;
  label: string;
};

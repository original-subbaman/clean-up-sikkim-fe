import type { Metadata } from "next";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./globals.css";
import { Plus_Jakarta_Sans, Be_Vietnam_Pro } from "next/font/google";
import { LandingPageRoutes } from "@/lib/routes";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: "100",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Clean Up Sikkim",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${beVietnamPro.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar routes={LandingPageRoutes} />
        <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}

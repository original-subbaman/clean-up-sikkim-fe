import type { Metadata } from "next";
import { Be_Vietnam_Pro, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

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
      <body className="min-h-full w-full ">{children}</body>
    </html>
  );
}

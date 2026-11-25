import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const body = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.tagline,
  icons: { icon: "/logo-trim.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} antialiased`}>
      <body className="grain min-h-screen">{children}</body>
    </html>
  );
}

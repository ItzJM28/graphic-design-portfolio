import type { Metadata } from "next";
import { Bebas_Neue, Bricolage_Grotesque, Manrope, Marcellus } from "next/font/google";
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

const marcellus = Marcellus({ variable: "--font-marcellus", subsets: ["latin"], weight: "400" });
const bebas = Bebas_Neue({ variable: "--font-bebas", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.tagline,
  icons: { icon: "/logo-trim.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${marcellus.variable} ${bebas.variable} antialiased`}>
      <body className="grain min-h-screen">{children}</body>
    </html>
  );
}

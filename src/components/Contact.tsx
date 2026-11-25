"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { site } from "@/data/site";
import { Tile } from "./Tile";

export function Contact() {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-10 pt-10 md:pb-14">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4 md:gap-4">
        <Tile className="flex min-h-[420px] flex-col items-center justify-center bg-surface p-8 text-center md:col-span-3 md:p-14">
          {/* drifting color blobs */}
          <motion.div
            aria-hidden
            className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-emerald/30 blur-3xl"
            animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-grape/50 blur-3xl"
            animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="relative z-10 mb-6 h-14 w-14 rounded-full bg-sandy"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <h2 className="relative z-10 font-display text-4xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
            Have a project
            <br />
            in <span className="text-gradient">mind?</span>
          </h2>
          <p className="relative z-10 mt-5 max-w-md text-ink-muted">
            Logos, launches, menus or merch — tell me what you&apos;re cooking and let&apos;s make it look delicious.
          </p>
          <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="rounded-full bg-sandy px-7 py-4 font-semibold text-ink-dark transition-transform hover:scale-[1.04] active:scale-95"
            >
              {site.email}
            </a>
            <button
              type="button"
              onClick={copy}
              className="rounded-full border border-line px-5 py-4 text-sm font-semibold transition-colors hover:border-ink"
            >
              {copied ? "Copied ✓" : "Copy email"}
            </button>
          </div>
        </Tile>

        <Tile index={1} className="flex min-h-[220px] flex-col items-center justify-center gap-4 bg-lime p-8 text-ink-dark">
          <Image src="/logo-trim.png" alt="" width={96} height={96} className="relative z-10 h-20 w-20 animate-float object-contain invert" />
          <p className="relative z-10 text-center font-display text-lg font-bold leading-tight">
            Let&apos;s build
            <br />
            something bold.
          </p>
        </Tile>
      </div>

      <footer className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-sm text-ink-muted md:flex-row">
        <p>
          © {site.year} {site.name}. All designs shown are my own work.
        </p>
        <a href="#top" className="group inline-flex items-center gap-2 transition-colors hover:text-ink">
          Back to top <span className="transition-transform group-hover:-translate-y-1">↑</span>
        </a>
      </footer>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

/** Id of the section currently in the middle band of the viewport, or null. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
          else setActive((cur) => (cur === e.target.id ? null : cur));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

const sectionIds = links.map((l) => l.href.slice(1));

export function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));
  const active = useActiveSection(sectionIds);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-[linear-gradient(90deg,#54478c,#2c699a,#048ba8,#0db39e,#16db93,#83e377,#b9e769,#efea5a,#f1c453,#f29e4c)]"
      />
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-3 z-40 px-4"
      >
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-3 py-2 pl-4 transition-all duration-500 ${
            scrolled
              ? "border-line bg-surface/80 shadow-2xl shadow-black/40 backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <a href="#top" className="group flex items-center gap-3" aria-label="Back to top">
            <Image
              src="/logo-trim.png"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 object-contain transition-transform duration-500 group-hover:rotate-[360deg]"
            />
            <span className="whitespace-nowrap font-display text-sm font-semibold tracking-tight sm:text-base">
              {site.shortName}
              <span className="ml-1 inline-block h-2 w-2 rounded-full bg-sandy align-middle" />
            </span>
          </a>
          <div className="flex items-center gap-0.5 sm:gap-1">
            {links.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative rounded-full px-2.5 py-2 text-sm transition-colors sm:px-4 ${
                    isActive ? "bg-white/10 text-ink" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {l.label}
                </a>
              );
            })}
            <a
              href="#contact"
              className="ml-1 hidden rounded-full bg-ink px-4 py-2 text-sm font-semibold text-ink-dark transition-transform hover:scale-105 active:scale-95 sm:inline-block"
            >
              Hire me
            </a>
          </div>
        </nav>
      </motion.header>
    </>
  );
}

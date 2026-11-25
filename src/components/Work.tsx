"use client";

import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState, type MouseEvent } from "react";
import { categories, pieceCount, projects, type Category, type Project } from "@/data/projects";
import { SectionHeading } from "./Tile";
import { ProjectModal } from "./ProjectModal";
import { ProjectLogo } from "./Logos";

function ProjectCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  function track(e: MouseEvent<HTMLButtonElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
    e.currentTarget.style.setProperty("--rx", `${(-y * 5).toFixed(2)}deg`);
    e.currentTarget.style.setProperty("--ry", `${(x * 5).toFixed(2)}deg`);
  }
  function reset(e: MouseEvent<HTMLButtonElement>) {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  }
  const contain = p.coverFit === "contain";
  const dark = p.logoInk === "dark";
  // short wide cards: logo on the right, text on the left
  const wide = p.span.includes("col-span-2") && !p.span.includes("row-span-2");
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`min-h-[260px] [perspective:1200px] ${p.span}`}
    >
      <button
        type="button"
        onClick={onOpen}
        onMouseMove={track}
        onMouseLeave={reset}
        className="spotlight group block h-full w-full overflow-hidden rounded-[28px] text-left outline-none ring-banana transition-[transform,box-shadow] duration-300 ease-out [transform:rotateX(var(--rx,0))_rotateY(var(--ry,0))] hover:shadow-2xl hover:shadow-black/50 focus-visible:ring-4"
        style={{ background: p.logoBg }}
        aria-label={`Open ${p.title}`}
      >
        {/* Brand logo on its own background */}
        <div
          className={`absolute flex items-center justify-center transition-all ${
            wide ? "inset-y-0 left-[48%] right-0 p-7 pr-8" : "inset-x-0 top-0 bottom-[112px] px-[8%] pt-8"
          }`}
        >
          <div className="flex h-full w-full items-center justify-center transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-90 group-hover:opacity-0">
            <ProjectLogo project={p} sizes="(min-width: 768px) 40vw, 80vw" className="max-h-[300px] max-w-[460px]" />
          </div>
        </div>

        {/* The work itself, revealed on hover */}
        <div className={`absolute inset-0 scale-110 opacity-0 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-100 group-hover:opacity-100 ${contain ? "bg-[#141416] p-8" : ""}`}>
          <div className="relative h-full w-full">
            <Image src={p.cover} alt={p.title} fill sizes="(min-width: 768px) 50vw, 100vw" className={contain ? "object-contain" : "object-cover"} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
        </div>

        <div className="absolute right-4 top-4 z-10 flex h-11 w-11 scale-75 -rotate-45 items-center justify-center rounded-full bg-ink text-lg text-ink-dark opacity-0 transition-all duration-500 group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-100">
          ↗
        </div>
        <div className={`absolute bottom-0 left-0 z-10 p-5 transition-colors duration-500 md:p-6 ${wide ? "right-[50%]" : "right-0"} ${dark ? "text-ink-dark group-hover:text-white" : "text-white"}`}>
          <div className="mb-2 flex flex-wrap gap-1.5">
            {p.categories.map((c) => (
              <span
                key={c}
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-colors duration-500 ${
                  dark ? "bg-black/10 group-hover:bg-white/15" : "bg-white/15"
                }`}
              >
                {c}
              </span>
            ))}
          </div>
          <h3 className="font-display text-2xl font-bold leading-tight tracking-tight md:text-[1.7rem]">{p.title}</h3>
          <p className="mt-1 text-sm opacity-70">
            {p.client} · {pieceCount(p)} {pieceCount(p) === 1 ? "piece" : "pieces"}
          </p>
        </div>
      </button>
    </motion.div>
  );
}

export function Work() {
  const [filter, setFilter] = useState<"All" | Category>("All");
  const [open, setOpen] = useState<Project | null>(null);
  const shown = filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <section id="work" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 md:py-28">
      <SectionHeading
        eyebrow="Selected work"
        title={
          <>
            Things I&apos;ve <span className="italic text-sandy">made</span>
          </>
        }
      >
        <LayoutGroup id="filters">
          <div className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:justify-end md:px-0">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  filter === c ? "text-ink-dark" : "text-ink-muted hover:text-ink"
                }`}
              >
                {filter === c && (
                  <motion.span
                    layoutId="pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>
      </SectionHeading>

      <motion.div layout className="grid grid-flow-dense auto-rows-[260px] grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 md:gap-4">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <ProjectCard key={p.slug} p={p} onOpen={() => setOpen(p)} />
          ))}
        </AnimatePresence>
      </motion.div>

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </section>
  );
}

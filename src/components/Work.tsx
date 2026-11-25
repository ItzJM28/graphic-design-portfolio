"use client";

import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState, type MouseEvent } from "react";
import { categories, projects, type Category, type Project } from "@/data/projects";
import { SectionHeading } from "./Tile";
import { ProjectModal } from "./ProjectModal";

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
        style={{ background: p.accent }}
        aria-label={`Open ${p.title}`}
      >
        <div className={`absolute inset-0 ${contain ? "p-8" : ""}`}>
          <div className="relative h-full w-full">
            <Image
              src={p.cover}
              alt={p.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className={`${contain ? "object-contain" : "object-cover"} transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.07]`}
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-ink text-lg text-ink-dark opacity-0 transition-all duration-500 group-hover:rotate-0 group-hover:opacity-100 -rotate-45 scale-75 group-hover:scale-100">
          ↗
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-6">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {p.categories.map((c) => (
              <span key={c} className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-md">
                {c}
              </span>
            ))}
          </div>
          <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-white md:text-[1.7rem]">{p.title}</h3>
          <p className="mt-1 flex items-center gap-2 text-sm text-white/70">
            <span className="h-2 w-2 rounded-full" style={{ background: p.accent }} />
            {p.client} · {p.items.length} {p.items.length === 1 ? "piece" : "pieces"}
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

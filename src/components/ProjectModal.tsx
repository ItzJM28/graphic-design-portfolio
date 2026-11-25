"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { ProjectLogo } from "./Logos";

const slide = {
  enter: (d: number) => ({ x: d >= 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d >= 0 ? -80 : 80, opacity: 0 }),
};

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {project && <Viewer key={project.slug} project={project} onClose={onClose} />}
    </AnimatePresence>
  );
}

function Viewer({ project, onClose }: { project: Project; onClose: () => void }) {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const thumbs = useRef<HTMLDivElement>(null);
  const count = project.items.length;
  const item = project.items[index];

  const go = useCallback(
    (d: number) => setState(([i]) => [(i + d + count) % count, d]),
    [count],
  );

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [go, onClose]);

  useEffect(() => {
    thumbs.current?.querySelector<HTMLElement>(`[data-i="${index}"]`)?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  const light = project.accentInk === "light";

  return (
    <motion.div
      className="fixed inset-0 z-[55] flex items-end justify-center p-0 md:items-center md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.div className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ y: 80, scale: 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 60, scale: 0.97, opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative grid h-[94dvh] w-full max-w-7xl grid-rows-[1fr_auto] overflow-hidden rounded-t-[28px] bg-surface md:h-[90vh] md:grid-cols-[1fr_340px] md:grid-rows-1 md:rounded-[28px]"
      >
        {/* Stage */}
        <div className="relative min-h-0 overflow-hidden bg-[#141416]">
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.div
              key={item.src}
              custom={dir}
              className="absolute inset-0 p-4 md:p-8"
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) go(1);
                else if (info.offset.x > 80) go(-1);
              }}
            >
              <div className="relative h-full w-full">
                {item.type === "video" ? (
                  <video src={item.src} autoPlay muted loop playsInline controls className="h-full w-full object-contain" />
                ) : (
                  <Image src={item.src} alt={`${project.title} — ${index + 1}`} fill sizes="(min-width: 768px) 70vw, 100vw" className="pointer-events-none select-none object-contain" priority />
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {count > 1 && (
            <>
              <button type="button" onClick={() => go(-1)} aria-label="Previous" className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-xl backdrop-blur transition hover:scale-110 hover:bg-ink hover:text-ink-dark">
                ←
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next" className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-xl backdrop-blur transition hover:scale-110 hover:bg-ink hover:text-ink-dark">
                →
              </button>
            </>
          )}
          <span className="absolute bottom-4 left-4 z-10 rounded-full bg-black/60 px-3 py-1 font-mono text-xs backdrop-blur">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        </div>

        {/* Info panel */}
        <aside className="flex min-h-0 flex-col gap-4 border-t border-line p-5 md:border-l md:border-t-0 md:p-7">
          <div className="flex items-start justify-between gap-3">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 18 }}
              className={`rounded-full px-3 py-1 text-xs font-bold ${light ? "text-ink" : "text-ink-dark"}`}
              style={{ background: project.accent }}
            >
              {project.categories.join(" · ")}
            </motion.span>
            <button type="button" onClick={onClose} aria-label="Close" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-lg transition hover:rotate-90 hover:bg-ink hover:text-ink-dark">
              ✕
            </button>
          </div>
          <div className="hidden md:block">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mb-5 flex h-36 items-center justify-center rounded-2xl p-5"
              style={{ background: project.logoBg }}
            >
              <ProjectLogo project={project} sizes="300px" />
            </motion.div>
            <h3 className="font-display text-3xl font-bold leading-tight tracking-tight">{project.title}</h3>
            <p className="mt-1 text-sm text-ink-muted">{project.client}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink/85">{project.description}</p>
          </div>
          <h3 className="font-display text-xl font-bold md:hidden">{project.title}</h3>

          <div
            ref={thumbs}
            className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:mt-auto md:grid md:grid-cols-3 md:overflow-y-auto md:overflow-x-hidden"
          >
            {project.items.map((it, i) => (
              <button
                key={it.src}
                data-i={i}
                type="button"
                onClick={() => setState([i, i > index ? 1 : -1])}
                className={`relative aspect-square w-16 shrink-0 overflow-hidden rounded-xl bg-[#141416] transition md:w-auto ${
                  i === index ? "ring-2 ring-banana ring-offset-2 ring-offset-surface" : "opacity-55 hover:opacity-100"
                }`}
                aria-label={`Show item ${i + 1}`}
              >
                {it.type === "video" ? (
                  <span className="flex h-full w-full items-center justify-center text-xs font-bold">▶ Video</span>
                ) : (
                  <Image src={it.src} alt="" fill sizes="120px" className="object-cover" />
                )}
              </button>
            ))}
          </div>
        </aside>
      </motion.div>
    </motion.div>
  );
}

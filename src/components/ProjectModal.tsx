"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { deliverables, indexAfterCollapse, orderGallery } from "@/lib/projectView";
import { ProjectLogo } from "./Logos";

const slide = {
  enter: (d: number) => ({ x: d >= 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d >= 0 ? -80 : 80, opacity: 0 }),
};

const FOCUSABLE = 'button:not([disabled]), a[href], video[controls], [tabindex]:not([tabindex="-1"])';

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {project && <Viewer key={project.slug} project={project} onClose={onClose} />}
    </AnimatePresence>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h4 className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-muted">{children}</h4>;
}

function Viewer({ project, onClose }: { project: Project; onClose: () => void }) {
  const { top, rest } = useMemo(() => orderGallery(project.items, project.highlights), [project]);
  const made = useMemo(() => deliverables(project), [project]);
  const [showAll, setShowAll] = useState(false);
  const list = showAll ? [...top, ...rest] : top;

  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const thumbs = useRef<HTMLDivElement>(null);
  const count = list.length;
  const item = list[Math.min(index, count - 1)];

  const go = useCallback((d: number) => setState(([i]) => [(i + d + count) % count, d]), [count]);

  // Latest handlers, read by the mount-only effect below so it never re-runs (re-running would steal focus).
  const goRef = useRef(go);
  const closeRef = useRef(onClose);
  useEffect(() => {
    goRef.current = go;
    closeRef.current = onClose;
  });

  const toggleShowAll = () => {
    if (showAll) setState(([i]) => [indexAfterCollapse(i, top.length), 0]);
    setShowAll(!showAll);
  };

  // Lock scroll, keyboard shortcuts, focus trap, and focus return to the card that opened us.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
      else if (e.key === "ArrowRight") goRef.current(1);
      else if (e.key === "ArrowLeft") goRef.current(-1);
      else if (e.key === "Tab" && dialog.current) {
        const nodes = Array.from(dialog.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      opener?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    thumbs.current?.querySelector<HTMLElement>(`[data-i="${index}"]`)?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  const light = project.accentInk === "light";
  const label = (n: number) => `${project.title} — ${n + 1} of ${count}`;

  return (
    <motion.div
      ref={dialog}
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
        className="relative grid h-[94dvh] w-full max-w-7xl grid-rows-[minmax(0,1fr)_auto] overflow-hidden rounded-t-[28px] bg-surface md:h-[90vh] md:grid-cols-[1fr_360px] md:grid-rows-1 md:rounded-[28px]"
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
                  <video src={item.src} poster={item.poster} autoPlay muted loop playsInline controls preload="metadata" aria-label={`${project.title} logo animation`} className="h-full w-full object-contain" />
                ) : (
                  <Image src={item.src} alt={label(index)} fill sizes="(min-width: 768px) 70vw, 100vw" className="pointer-events-none select-none object-contain" priority />
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {count > 1 && (
            <>
              <button type="button" onClick={() => go(-1)} aria-label="Previous piece" className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-xl backdrop-blur transition hover:scale-110 hover:bg-ink hover:text-ink-dark">
                ←
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next piece" className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-xl backdrop-blur transition hover:scale-110 hover:bg-ink hover:text-ink-dark">
                →
              </button>
            </>
          )}
          <span className="absolute bottom-4 left-4 z-10 rounded-full bg-black/60 px-3 py-1 font-mono text-xs backdrop-blur" aria-live="polite">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        </div>

        {/* Case-study panel */}
        <aside className="flex max-h-[42dvh] min-h-0 flex-col gap-5 overflow-y-auto border-t border-line p-5 md:max-h-none md:border-l md:border-t-0 md:p-7">
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
            <button ref={closeBtn} type="button" onClick={onClose} aria-label="Close project" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-lg transition hover:rotate-90 hover:bg-ink hover:text-ink-dark">
              ✕
            </button>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mb-4 hidden h-32 items-center justify-center rounded-2xl p-5 md:flex"
              style={{ background: project.logoBg }}
            >
              <ProjectLogo project={project} sizes="300px" />
            </motion.div>
            <h3 className="font-display text-2xl font-bold leading-tight tracking-tight md:text-3xl">{project.title}</h3>
            <p className="mt-1 text-sm text-ink-muted">{project.client}</p>
          </div>

          <section>
            <SectionLabel>Overview</SectionLabel>
            <p className="text-sm leading-relaxed text-ink/85">{project.description}</p>
          </section>

          {made.length > 0 && (
            <section>
              <SectionLabel>What I made</SectionLabel>
              <ul className="flex flex-wrap gap-1.5">
                {made.map((m) => (
                  <li key={m} className="rounded-full border border-line px-3 py-1 text-xs font-semibold">
                    {m}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <SectionLabel>Gallery</SectionLabel>
            <div ref={thumbs} className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:grid md:grid-cols-3 md:overflow-visible">
              {list.map((it, i) => (
                <button
                  key={it.src}
                  data-i={i}
                  type="button"
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  aria-label={`Show ${it.type === "video" ? "logo animation" : `piece ${i + 1}`}`}
                  aria-current={i === index ? "true" : undefined}
                  className={`relative aspect-square w-16 shrink-0 overflow-hidden rounded-xl bg-[#141416] transition md:w-auto ${
                    i === index ? "ring-2 ring-banana ring-offset-2 ring-offset-surface" : "opacity-55 hover:opacity-100"
                  }`}
                >
                  {it.type === "video" ? (
                    <>
                      {it.poster && <Image src={it.poster} alt="" fill sizes="120px" className="object-cover" />}
                      <span className="absolute inset-0 flex items-center justify-center bg-black/35 text-xs font-bold text-white">▶ Motion</span>
                    </>
                  ) : (
                    <Image src={it.src} alt="" fill sizes="120px" className="object-cover" />
                  )}
                </button>
              ))}
            </div>
            {rest.length > 0 && (
              <button
                type="button"
                onClick={toggleShowAll}
                className="mt-3 w-full rounded-full border border-line px-4 py-2 text-sm font-semibold transition hover:border-ink"
                aria-expanded={showAll}
              >
                {showAll ? "Show highlights only" : `Show all ${top.length + rest.length}`}
              </button>
            )}
          </section>
        </aside>
      </motion.div>
    </motion.div>
  );
}

"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { MouseEvent } from "react";

type TileProps = HTMLMotionProps<"div"> & { index?: number };

/** Bento tile: reveals on scroll, lifts on hover, cursor spotlight. */
export function Tile({ className = "", index = 0, children, onMouseMove, ...rest }: TileProps) {
  function track(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
    onMouseMove?.(e);
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      onMouseMove={track}
      className={`spotlight overflow-hidden rounded-[28px] ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between"
    >
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-ink-muted">{eyebrow}</p>
        <h2 className="font-display text-4xl font-bold leading-[0.95] tracking-tight md:text-6xl">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}

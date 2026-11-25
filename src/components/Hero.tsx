"use client";

import Image from "next/image";
import { AnimatePresence, animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { projects, totalPieces } from "@/data/projects";
import { Tile } from "./Tile";

const palette = [
  { hex: "#54478C", name: "Dusty Grape" },
  { hex: "#2C699A", name: "Baltic Blue" },
  { hex: "#048BA8", name: "Pacific Cyan" },
  { hex: "#0DB39E", name: "Ocean Mist" },
  { hex: "#16DB93", name: "Emerald" },
  { hex: "#83E377", name: "Light Green" },
  { hex: "#B9E769", name: "Lime Cream" },
  { hex: "#EFEA5A", name: "Banana Cream" },
  { hex: "#F1C453", name: "Tuscan Sun" },
  { hex: "#F29E4C", name: "Sandy Brown" },
];
const barHeights = [46, 62, 54, 78, 92, 70, 84, 100, 66, 74];

type Slide = { type: "image" | "video"; src: string; label: string; pos?: string; seconds: number };

const showcase: Slide[] = [
  { type: "image", src: "/featured/bugtongs-promo.webp", label: "Bugtong's", seconds: 3.4 },
  { type: "video", src: "/work/alon-brew/alonbrewlogoanim.mp4", label: "Alon Brew", seconds: 6 },
  { type: "image", src: "/featured/nom-wings.webp", label: "NOM", pos: "62% 50%", seconds: 3.4 },
  { type: "image", src: "/featured/hiraya-buy1get1.webp", label: "Hiraya's Grill", seconds: 3.4 },
  { type: "image", src: "/featured/natures-blend-bags.webp", label: "Nature's Blend", pos: "60% 60%", seconds: 3.4 },
  { type: "image", src: "/featured/nom-sign.webp", label: "NOM", pos: "46% 50%", seconds: 3.4 },
];

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const c = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (node.textContent = Math.round(v) + suffix),
    });
    return () => c.stop();
  }, [inView, to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

function Slideshow() {
  const [i, setI] = useState(0);
  const slide = showcase[i];
  useEffect(() => {
    const t = setTimeout(() => setI((n) => (n + 1) % showcase.length), slide.seconds * 1000);
    return () => clearTimeout(t);
  }, [slide]);
  return (
    <div className="absolute inset-0">
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.src}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {slide.type === "video" ? (
            <video src={slide.src} autoPlay muted playsInline className="h-full w-full object-cover" style={{ objectPosition: slide.pos }} />
          ) : (
            <Image src={slide.src} alt={`${slide.label} design`} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" style={{ objectPosition: slide.pos }} />
          )}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.span
          key={slide.label}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.3 }}
          className="absolute left-4 top-4 z-10 whitespace-nowrap rounded-full bg-black/55 px-3 py-1 text-xs font-semibold backdrop-blur"
        >
          Featured · {slide.label}
        </motion.span>
      </AnimatePresence>
      <div className="absolute inset-x-4 bottom-4 z-10 flex gap-1.5">
        {showcase.map((s, n) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setI(n)}
            aria-label={`Show ${s.label}`}
            className="h-1 flex-1 overflow-hidden rounded-full bg-white/25"
          >
            {n === i && (
              <motion.span
                className="block h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: s.seconds, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

const word = {
  hidden: { y: "110%" },
  show: (i: number) => ({ y: "0%", transition: { duration: 0.9, delay: 1.0 + i * 0.08, ease: [0.22, 1, 0.36, 1] as const } }),
};

export function Hero() {
  const headline = ["Designs", "that", "make", "brands"];
  return (
    <section id="top" className="mx-auto max-w-7xl px-4 pt-24 md:pt-28">
      <div className="grid auto-rows-[minmax(190px,auto)] grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {/* Intro */}
        <Tile index={0} className="col-span-2 row-span-2 flex flex-col justify-between bg-surface p-6 md:p-9">
          <div className="relative z-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald" />
            </span>
            Available for freelance
          </div>
          <div className="relative z-10">
            <p className="mb-3 font-display text-lg text-ink-muted">Hey, I&apos;m {site.shortName} —</p>
            <h1 className="font-display text-[clamp(2.6rem,6vw,5.4rem)] font-extrabold leading-[0.92] tracking-tight">
              {headline.map((w, i) => (
                <span key={w} className="mr-[0.22em] inline-block overflow-hidden pb-1 align-bottom">
                  <motion.span className="inline-block" variants={word} initial="hidden" animate="show" custom={i}>
                    {w}
                  </motion.span>
                </span>
              ))}
              <span className="inline-block overflow-hidden pb-1 align-bottom">
                <motion.span className="text-gradient inline-block" variants={word} initial="hidden" animate="show" custom={4}>
                  unforgettable.
                </motion.span>
              </span>
            </h1>
            <p className="mt-5 max-w-md text-ink-muted">{site.tagline}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-banana px-6 py-3 font-semibold text-ink-dark transition-transform hover:scale-[1.04] active:scale-95"
              >
                View my work
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center rounded-full border border-line px-6 py-3 font-semibold transition-colors hover:border-ink hover:bg-ink hover:text-ink-dark"
              >
                Let&apos;s talk
              </a>
            </div>
          </div>
        </Tile>

        {/* Logo */}
        <Tile index={1} className="flex items-center justify-center bg-grape p-6">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-14 -left-8 h-36 w-36 rounded-full border-[18px] border-white/10 animate-spin-slow" />
          <Image src="/logo-trim.png" alt="Personal logo" width={120} height={120} className="relative h-24 w-24 animate-float object-contain drop-shadow-2xl md:h-28 md:w-28" />
        </Tile>

        {/* Featured slideshow */}
        <Tile index={2} className="row-span-2 min-h-[380px] bg-surface">
          <Slideshow />
        </Tile>

        {/* Pieces counter */}
        <Tile index={3} className="flex flex-col justify-between bg-emerald p-6 text-ink-dark">
          <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-70">Portfolio</span>
          <div>
            <div className="font-display text-6xl font-extrabold leading-none tracking-tight">
              <Counter to={Math.floor(totalPieces / 5) * 5} suffix="+" />
            </div>
            <p className="mt-1 font-semibold">pieces of design work</p>
          </div>
        </Tile>

        {/* Palette */}
        <Tile index={4} className="col-span-2 flex flex-col justify-between gap-6 bg-surface p-6 md:p-7">
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">Color is my language</h3>
              <p className="mt-1 text-sm text-ink-muted">Hover a swatch</p>
            </div>
            <span className="rounded-full border border-line px-3 py-1 text-xs text-ink-muted">10 tones</span>
          </div>
          <div className="relative z-10 flex h-36 items-end gap-1.5 md:gap-2">
            {palette.map((c, i) => (
              <motion.div
                key={c.hex}
                className="group relative flex-1 cursor-default rounded-xl"
                style={{ background: c.hex }}
                initial={{ height: "8%" }}
                whileInView={{ height: `${barHeights[i]}%` }}
                viewport={{ once: true }}
                whileHover={{ height: "100%" }}
                transition={{ type: "spring", stiffness: 140, damping: 16, delay: 0.2 + i * 0.05 }}
              >
                <span className="pointer-events-none absolute -top-12 left-1/2 z-20 w-max -translate-x-1/2 scale-90 rounded-lg bg-ink px-2 py-1 text-[11px] font-semibold text-ink-dark opacity-0 shadow-lg transition-all group-hover:scale-100 group-hover:opacity-100">
                  {c.name}
                  <span className="block font-mono text-[10px] opacity-60">#{c.hex.slice(1)}</span>
                </span>
              </motion.div>
            ))}
          </div>
        </Tile>

        {/* Animated logo video */}
        <Tile index={5} className="bg-black">
          <video
            src="/work/alon-brew/alonbrewlogoanim.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute bottom-4 left-4 z-10 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold backdrop-blur">
            Motion · Alon Brew
          </span>
        </Tile>

        {/* Brands counter */}
        <Tile index={6} className="flex flex-col justify-between bg-banana p-6 text-ink-dark">
          <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-70">Brands &amp; projects</span>
          <div>
            <div className="font-display text-6xl font-extrabold leading-none tracking-tight">
              <Counter to={projects.length} />
            </div>
            <p className="mt-1 font-semibold">from grills to coffee bars</p>
          </div>
        </Tile>
      </div>
    </section>
  );
}

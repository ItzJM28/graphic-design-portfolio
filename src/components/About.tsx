"use client";

import { motion } from "framer-motion";
import { site } from "@/data/site";
import { SectionHeading, Tile } from "./Tile";

const services = [
  "Brand Identity",
  "Logo Design",
  "Social Media Content",
  "Promo Campaigns",
  "Print & Editorial",
  "Packaging & Mockups",
  "Posters",
  "Apparel Graphics",
  "Motion Logos",
];

const steps = [
  { n: "01", t: "Discover", d: "Learn the brand, the audience and what success looks like.", c: "bg-ocean" },
  { n: "02", t: "Sketch", d: "Explore directions fast — shapes, type and color moods.", c: "bg-lime" },
  { n: "03", t: "Design", d: "Refine one direction into a polished, consistent system.", c: "bg-tuscan" },
  { n: "04", t: "Deliver", d: "Hand off print-ready and social-ready files, on time.", c: "bg-sandy" },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 md:py-24">
      <SectionHeading
        eyebrow="About"
        title={
          <>
            Bold ideas, <span className="italic text-emerald">clean</span> execution
          </>
        }
      />

      <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-3 md:grid-cols-4 md:gap-4">
        <Tile className="flex flex-col justify-between gap-8 bg-surface p-7 md:col-span-2 md:row-span-2 md:p-9">
          <p className="relative z-10 font-display text-2xl font-semibold leading-snug tracking-tight md:text-[2rem]">
            I&apos;m {site.shortName}, a {site.role.toLowerCase()} who turns small businesses into brands people
            crave — from <span className="text-sandy">sizzling grill promos</span> to{" "}
            <span className="text-cyan">calm coffee identities</span> and{" "}
            <span className="text-lime">editorial spreads</span>.
          </p>
          <p className="relative z-10 max-w-lg text-ink-muted">
            My work lives where strategy meets play: bold type, confident color and layouts that stop the scroll.
            Every project gets a system, not just a single pretty post.
          </p>
        </Tile>

        <Tile index={1} className="bg-baltic p-7 text-ink md:col-span-2">
          <h3 className="relative z-10 mb-4 font-display text-2xl font-bold">What I do</h3>
          <div className="relative z-10 flex flex-wrap gap-2">
            {services.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.05 }}
                whileHover={{ scale: 1.08, rotate: -2 }}
                className="cursor-default rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </Tile>

        {steps.slice(0, 2).map((s, i) => (
          <Step key={s.n} s={s} i={i + 2} />
        ))}
        {steps.slice(2).map((s, i) => (
          <Step key={s.n} s={s} i={i + 4} />
        ))}
        <Tile index={6} className="flex flex-col justify-center bg-grape p-7 md:col-span-2">
          <p className="relative z-10 text-xs font-bold uppercase tracking-[0.2em] text-ink/70">Clients &amp; brands</p>
          <p className="relative z-10 mt-3 font-display text-xl font-semibold leading-relaxed md:text-2xl">
            Bugtong&apos;s Inasal · Hiraya&apos;s Grill · Alon Brew · Nature&apos;s Blend · NOM · Pamper Lab · PIOR Athletics · Livable
          </p>
        </Tile>
      </div>
    </section>
  );
}

function Step({ s, i }: { s: (typeof steps)[number]; i: number }) {
  return (
    <Tile index={i} className="group flex flex-col justify-between bg-surface p-6">
      <div className="relative z-10 flex items-center justify-between">
        <span className={`flex h-11 w-11 items-center justify-center rounded-2xl font-display font-bold text-ink-dark transition-transform duration-500 group-hover:rotate-12 ${s.c}`}>
          {s.n}
        </span>
      </div>
      <div className="relative z-10">
        <h4 className="font-display text-2xl font-bold">{s.t}</h4>
        <p className="mt-1 text-sm text-ink-muted">{s.d}</p>
      </div>
    </Tile>
  );
}

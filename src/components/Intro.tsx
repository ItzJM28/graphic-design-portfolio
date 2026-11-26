"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const bars = ["#54478c", "#2c699a", "#048ba8", "#0db39e", "#16db93", "#83e377", "#b9e769", "#efea5a", "#f1c453", "#f29e4c"];
const HOLD_MS = 700;

/**
 * Short opening curtain: logo, then palette bars sweep away. Once per browser session.
 * Rendered with the page; CSS keeps it hidden unless the pre-paint script (layout.tsx)
 * set <html data-intro>, so first visits never flash the page and return visits never see it.
 */
export function Intro() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const playing = document.documentElement.hasAttribute("data-intro");
    const t = window.setTimeout(() => setShow(false), playing ? HOLD_MS : 0);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence onExitComplete={() => document.documentElement.removeAttribute("data-intro")}>
      {show && (
        <motion.div
          key="intro"
          className="intro-root pointer-events-none fixed inset-0 z-[70] flex"
          exit={{ transition: { duration: 0.9 } }}
        >
          {bars.map((c, i) => (
            <motion.div
              key={c}
              className="h-full flex-1"
              style={{ background: c }}
              initial={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.6, delay: i * 0.035, ease: [0.76, 0, 0.24, 1] }}
            />
          ))}
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-bg"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src="/logo-trim.png" alt="" width={88} height={88} priority className="h-20 w-20 object-contain" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

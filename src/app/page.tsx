import { MotionProvider } from "@/components/MotionProvider";
import { Intro } from "@/components/Intro";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Work } from "@/components/Work";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <MotionProvider>
      <Intro />
      <Nav />
      <main>
        <Hero />
        <Marquee
          className="mt-12 border-y border-line"
          items={["Brand Identity", "Social Media", "Posters", "Packaging", "Editorial", "Apparel", "Motion"]}
        />
        <Work />
        <Marquee
          reverse
          className="border-y border-line text-ink-muted"
          items={["Bugtong's", "Alon Brew", "Hiraya's Grill", "Nature's Blend", "NOM", "Pamper Lab", "PIOR", "Livable"]}
        />
        <About />
        <Contact />
      </main>
    </MotionProvider>
  );
}

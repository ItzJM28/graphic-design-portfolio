import manifest from "./manifest.json";

export type Category =
  | "Branding"
  | "Social Media"
  | "Print & Editorial"
  | "Posters"
  | "Apparel";

export const categories: ("All" | Category)[] = [
  "All",
  "Branding",
  "Social Media",
  "Print & Editorial",
  "Posters",
  "Apparel",
];

export type MediaItem = {
  type: "image" | "video";
  src: string;
  name: string;
  w?: number;
  h?: number;
  poster?: string; // still frame for video thumbnails
  motion?: boolean; // generated logo animation (not counted as a portfolio piece)
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  categories: Category[];
  description: string;
  accent: string; // css color
  accentInk: "light" | "dark"; // text color on accent
  cover: string;
  logo: string; // image path, or a key of the vector marks in components/Logos.tsx
  logoBg: string; // card background behind the logo
  logoInk: "light" | "dark";
  coverFit?: "cover" | "contain";
  span: string; // tailwind grid span classes (desktop)
  highlights?: string[]; // file names shown first in the viewer; the rest sit behind "Show all"
  items: MediaItem[];
};

type Meta = Omit<Project, "items" | "cover"> & { cover: string; order?: string[] };

const meta: Meta[] = [
  {
    slug: "bugtongs",
    logo: "/logos/bugtongs.webp",
    logoBg: "#121212",
    logoInk: "light",
    title: "Bugtong's Inasal & Restobar",
    client: "Bugtong's — Hinigaran Branch",
    categories: ["Social Media", "Branding"],
    description:
      "An ongoing campaign system for a grill house: fiery launch posters, promo drops, milestone posts, banners, calling cards and staff merch — all built on one loud, smoky visual language.",
    accent: "var(--color-sandy)",
    accentInk: "dark",
    cover: "grillingsoon2.webp",
    span: "md:col-span-2 md:row-span-2",
    highlights: [
      "grillingsoon2.webp",
      "final-poster.webp",
      "1500kfollowers.webp",
      "buy1get1.webp",
      "95unli.webp",
      "sisig.webp",
      "mother-s-day-giveaway.webp",
      "final-banner.webp",
      "calling-card-1.webp",
      "tshirt.webp",
    ],
  },
  {
    slug: "alon-brew",
    logo: "/logos/alon-brew.webp",
    logoBg: "#1a1a1a",
    logoInk: "light",
    title: "Alon Brew",
    client: "Coffee shop identity",
    categories: ["Branding"],
    description:
      "A beachside coffee brand where a wave breaks inside a cup. Logo, animated mark, wordmark pattern, cups and mugs, signage and a full website concept.",
    accent: "var(--color-cyan)",
    accentInk: "light",
    cover: "4.webp",
    span: "md:col-span-2 md:row-span-2",
    order: ["8.webp", "4.webp", "group-19.webp", "alonbrewlogoanim.mp4", "3.webp", "1.webp", "5.webp", "test3-1.webp", "group-4.webp", "frame-1.webp", "frame-2.webp"],
  },
  {
    slug: "natures-blend",
    logo: "natures-blend",
    logoBg: "#183a31",
    logoInk: "light",
    title: "Nature's Blend",
    client: "Organic coffee brand",
    categories: ["Branding"],
    description:
      "A fine-line emblem merging leaves, a coffee bean and a handmade mug. From concept sketch to final mark, variants and real-world mockups.",
    accent: "var(--color-ocean)",
    accentInk: "dark",
    cover: "mockups-1.webp",
    span: "md:row-span-2",
    order: ["final-logo.webp", "concept.webp", "logo.webp", "logo-variations.webp", "mockups.webp", "mockups-1.webp"],
  },
  {
    slug: "nom",
    logo: "/logos/nom.webp",
    logoBg: "#ff6665",
    logoInk: "dark",
    title: "NOM Chowing Station",
    client: "Fried chicken takeout",
    categories: ["Branding"],
    description:
      "A playful, hungry little mascot that bites its way into the wordmark — applied to takeout boxes, iced-tea bottles, signage and aprons.",
    accent: "#ff6b6b",
    accentInk: "dark",
    cover: "frame-5.webp",
    span: "md:row-span-2",
  },
  {
    slug: "hiraya",
    logo: "/logos/hiraya.webp",
    logoBg: "#111111",
    logoInk: "light",
    title: "Hiraya's Grill",
    client: "Grill restaurant",
    categories: ["Branding", "Social Media"],
    description:
      "Logo and launch content for a grill restaurant — a flame-topped rooster bowl mark, menu boards, promo posts and page covers.",
    accent: "var(--color-tuscan)",
    accentInk: "dark",
    cover: "buy1get1.webp",
    span: "md:row-span-2",
    order: ["buy1get1.webp", "hiraya.webp", "discountpromo.webp", "barkadafamilymeal.webp", "facebook-cover-1.webp", "hiaray2-1.webp"],
  },
  {
    slug: "pamper-labs",
    logo: "/logos/pamper-labs.webp",
    logoBg: "#2a0d4a",
    logoInk: "light",
    title: "Pamper Lab",
    client: "Nail, lash & brow bar",
    categories: ["Social Media", "Posters"],
    description:
      "A glossy neon launch campaign for a beauty bar opening in Bacolod — moody gradients, sparkle and confident pricing callouts.",
    accent: "#d946ef",
    accentInk: "light",
    cover: "opening-soon.webp",
    span: "md:row-span-2",
  },
  {
    slug: "print-designs",
    logo: "print-designs",
    logoBg: "#ffffff",
    logoInk: "dark",
    title: "Hidden Gems of Local History",
    client: "Editorial / magazine layout",
    categories: ["Print & Editorial"],
    description:
      "A magazine-style portfolio exploring heritage sites of Negros Occidental — cover, spreads and photo galleries with a warm, structured grid.",
    accent: "var(--color-banana)",
    accentInk: "dark",
    cover: "frame.webp",
    span: "md:col-span-2",
    order: ["frame.webp", "frame-9.webp", "group-3.webp", "group-4.webp", "group-5.webp", "group-6.webp"],
  },
  {
    slug: "promotional-posters",
    logo: "promotional-posters",
    logoBg: "#54478c",
    logoInk: "light",
    title: "Promotional Posters",
    client: "Events, automotive & fan art",
    categories: ["Posters"],
    description:
      "Posters across moods — a synthwave event flyer, a technical Porsche 911 GT3 RS piece, a cinematic God of War tribute and a NOM wings promo.",
    accent: "var(--color-grape)",
    accentInk: "light",
    cover: "poster-1.webp",
    span: "md:row-span-2",
    order: ["poster-1.webp", "poster-2.webp", "poster-3.webp", "frame-1.webp"],
  },
  {
    slug: "tshirt-designs",
    logo: "tshirt-designs",
    logoBg: "#16203a",
    logoInk: "light",
    title: "Streetwear Graphics",
    client: "T-shirt back prints",
    categories: ["Apparel"],
    description:
      "Big, layered back-print graphics inspired by trucking culture and JDM legends — built for screen printing.",
    accent: "var(--color-baltic)",
    accentInk: "light",
    cover: "back-1.webp",
    span: "md:row-span-2",
  },
  {
    slug: "personal-designed-logos",
    logo: "/logos/catcam.webp",
    logoBg: "#111111",
    logoInk: "light",
    title: "Logo Collection",
    client: "Personal & concept marks",
    categories: ["Branding"],
    description:
      "Self-initiated marks: Dasig Delivery Express, CatCam, CafBar and Digital Cannoli Games — exploring speed, wit and character.",
    accent: "var(--color-lime)",
    accentInk: "dark",
    cover: "group-10.webp",
    coverFit: "contain",
    span: "md:col-span-2",
    order: ["group-10.webp", "group-1.webp", "group-16.webp", "group-24.webp"],
  },
  {
    slug: "pior",
    logo: "/logos/pior.webp",
    logoBg: "#ffffff",
    logoInk: "dark",
    title: "PIOR Athletics",
    client: "Sportswear",
    categories: ["Branding"],
    description: "Brand banner for a sportswear label designed for the driven — swirling motion in red and teal.",
    accent: "var(--color-emerald)",
    accentInk: "dark",
    cover: "frame-5.webp",
    span: "md:col-span-2",
  },
  {
    slug: "livable",
    logo: "/logos/livable.webp",
    logoBg: "#e8893a",
    logoInk: "light",
    title: "Livable",
    client: "Home & living brand",
    categories: ["Branding"],
    description: "A friendly rounded wordmark and house icon with a warm chimney accent.",
    accent: "var(--color-surface-2)",
    accentInk: "light",
    cover: "vector.webp",
    coverFit: "contain",
    span: "md:col-span-2",
    order: ["vector.webp", "livable.webp"],
  },
];

type ManifestGroup = { folder: string; slug: string; items: MediaItem[] };

/** Projects that have a rendered logo motion clip in public/motion (Alon Brew has its own). */
const motionSlugs = new Set([
  "bugtongs", "natures-blend", "nom", "hiraya", "pamper-labs", "print-designs",
  "promotional-posters", "tshirt-designs", "personal-designed-logos", "pior", "livable",
]);

export const projects: Project[] = meta.map((m) => {
  const group = (manifest as ManifestGroup[]).find((g) => g.slug === m.slug);
  if (!group) throw new Error(`Missing manifest group ${m.slug}`);
  const file = (src: string) => src.split("/").pop()!;
  let items = group.items;
  if (m.order) {
    const rank = (i: MediaItem) => {
      const idx = m.order!.indexOf(file(i.src));
      return idx === -1 ? 999 : idx;
    };
    items = [...items].sort((a, b) => rank(a) - rank(b));
  } else {
    // put cover first
    items = [...items].sort((a, b) => Number(file(b.src) === m.cover) - Number(file(a.src) === m.cover));
  }
  // Logo motion clip (public/motion/<slug>.mp4) goes right after the cover
  if (motionSlugs.has(m.slug)) {
    items = [
      items[0],
      { type: "video", src: `/motion/${m.slug}.mp4`, poster: `/motion/${m.slug}.webp`, name: "Logo motion", motion: true },
      ...items.slice(1),
    ];
  }
  const { order: _order, ...rest } = m;
  void _order;
  return { ...rest, cover: `/work/${m.slug}/${m.cover}`, items };
});

/** Number of original pieces in a project (excludes generated logo motion clips). */
export const pieceCount = (p: Project) => p.items.filter((i) => !i.motion).length;

export const totalPieces = projects.reduce((n, p) => n + pieceCount(p), 0);

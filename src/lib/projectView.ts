import type { Category, MediaItem, Project } from "../data/projects.ts";

const LABELS: [Category, string][] = [
  ["Branding", "Logo"],
  ["Social Media", "Social posts"],
  ["Print & Editorial", "Print"],
  ["Posters", "Posters"],
  ["Apparel", "Apparel"],
];

/** "What I made" labels for a project, in a fixed reading order. */
export function deliverables(p: Pick<Project, "slug" | "categories" | "items">): string[] {
  const out = LABELS.filter(([c]) => p.categories.includes(c)).map(([, label]) => label);
  if (p.items.some((i) => i.type === "video")) out.push("Motion");
  return out;
}

const fileOf = (i: MediaItem) => i.src.split("/").pop() ?? "";

/**
 * Splits a gallery into the pieces shown first and the rest.
 * Highlights come first in the order given; the logo-motion clip stays second.
 */
export function orderGallery(items: MediaItem[], highlights?: string[]): { top: MediaItem[]; rest: MediaItem[] } {
  const picked = (highlights ?? [])
    .map((name) => items.find((i) => !i.motion && fileOf(i) === name))
    .filter((i): i is MediaItem => Boolean(i));
  if (picked.length === 0) return { top: items, rest: [] };

  const clip = items.find((i) => i.motion);
  const top = clip ? [picked[0], clip, ...picked.slice(1)] : picked;
  const rest = items.filter((i) => !top.includes(i));
  return { top, rest };
}

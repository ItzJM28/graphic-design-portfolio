import { test } from "node:test";
import assert from "node:assert/strict";
import type { MediaItem } from "../data/projects.ts";
import { deliverables, indexAfterCollapse, orderGallery } from "./projectView.ts";

const img = (file: string): MediaItem => ({ type: "image", src: `/work/x/${file}`, name: file });
const motion: MediaItem = { type: "video", src: "/motion/x.mp4", name: "Logo motion", motion: true };
const file = (i: MediaItem) => i.src.split("/").pop();

test("deliverables includes Motion when a video item exists", () => {
  const d = deliverables({ slug: "x", categories: ["Posters"], items: [img("a.webp"), motion] });
  assert.ok(d.includes("Motion"));
});

test("deliverables for a Branding project starts with Logo", () => {
  const d = deliverables({ slug: "x", categories: ["Social Media", "Branding"], items: [img("a.webp")] });
  assert.equal(d[0], "Logo");
  assert.deepEqual(d, ["Logo", "Social posts"]);
});

test("orderGallery without highlights keeps all items", () => {
  const items = [img("a.webp"), motion, img("b.webp")];
  const { top, rest } = orderGallery(items);
  assert.equal(rest.length, 0);
  assert.deepEqual(top, items);
});

test("orderGallery puts highlights first in given order", () => {
  const items = [img("a.webp"), motion, img("b.webp"), img("c.webp"), img("d.webp")];
  const { top, rest } = orderGallery(items, ["c.webp", "a.webp"]);
  assert.deepEqual(top.filter((i) => !i.motion).map(file), ["c.webp", "a.webp"]);
  assert.equal(top[1], motion);
  assert.deepEqual(rest.map(file), ["b.webp", "d.webp"]);
});

test("orderGallery ignores unknown highlight names", () => {
  const items = [img("a.webp"), img("b.webp"), img("c.webp")];
  const { top, rest } = orderGallery(items, ["zzz.webp", "b.webp"]);
  assert.equal(top.length + rest.length, items.length);
  assert.deepEqual(top.map(file), ["b.webp"]);
});

test("collapsing to highlights resets a selection beyond the shorter list", () => {
  assert.equal(indexAfterCollapse(15, 11), 0);
  assert.equal(indexAfterCollapse(11, 11), 0);
});

test("collapsing to highlights keeps a selection that is still listed", () => {
  assert.equal(indexAfterCollapse(4, 11), 4);
});

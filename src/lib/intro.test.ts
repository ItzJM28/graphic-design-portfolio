import { test } from "node:test";
import assert from "node:assert/strict";
import { shouldPlayIntro } from "./intro.ts";

function memoryStorage() {
  const data = new Map<string, string>();
  return {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
  };
}

test("plays on first visit", () => {
  assert.equal(shouldPlayIntro(memoryStorage(), false), true);
});

test("does not play on second call", () => {
  const s = memoryStorage();
  shouldPlayIntro(s, false);
  assert.equal(shouldPlayIntro(s, false), false);
});

test("returns false with reduced motion", () => {
  assert.equal(shouldPlayIntro(memoryStorage(), true), false);
});

test("shouldPlayIntro returns false when storage throws", () => {
  const broken = {
    getItem: () => {
      throw new Error("blocked");
    },
    setItem: () => {
      throw new Error("blocked");
    },
  };
  assert.equal(shouldPlayIntro(broken, false), false);
  assert.equal(shouldPlayIntro(null, false), false);
});

test("shouldPlayIntro source runs on its own as an inline pre-paint script", () => {
  const standalone = new Function(`return (${shouldPlayIntro.toString()})`)() as typeof shouldPlayIntro;
  const s = memoryStorage();
  assert.equal(standalone(s, false), true);
  assert.equal(standalone(s, false), false);
});

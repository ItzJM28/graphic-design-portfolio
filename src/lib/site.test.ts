import { test } from "node:test";
import assert from "node:assert/strict";
import { site } from "../data/site.ts";

test("contact email is real", () => {
  assert.equal(site.email, "jmc.demonteverde@gmail.com");
});

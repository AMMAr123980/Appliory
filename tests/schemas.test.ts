import test from "node:test";
import assert from "node:assert/strict";
import { checklistSchema, documentMetaSchema } from "../lib/schemas.ts";
const item = {
  id: "one",
  name: "Resume",
  description: "",
  required: true,
  extensions: "pdf",
  mimes: "application/pdf",
  maxMB: 5,
};
test("checklist rejects excessive sizes and contradictory bounds", () => {
  assert.equal(
    checklistSchema.safeParse({
      title: "Test",
      items: [{ ...item, maxMB: 26 }],
    }).success,
    false,
  );
  assert.equal(
    checklistSchema.safeParse({
      title: "Test",
      items: [{ ...item, minPages: 3, maxPages: 1 }],
    }).success,
    false,
  );
});
test("duplicate checklist IDs are invalid", () =>
  assert.equal(
    checklistSchema.safeParse({ title: "Test", items: [item, item] }).success,
    false,
  ));
test("identity is never accepted from a client-supplied user_id", () => {
  const c = checklistSchema.parse({
    title: "Test",
    items: [item],
    user_id: "someone-else",
  });
  assert.equal("user_id" in c, false);
});
test("metadata rejects invalid hashes and oversized files", () => {
  const base = { id: "a", name: "a.pdf", type: "application/pdf", detected: "pdf", size: 20, hash: "a".repeat(64) };
  assert.equal(documentMetaSchema.safeParse(base).success, true);
  assert.equal(documentMetaSchema.safeParse({...base, hash: "invalid"}).success, false);
  assert.equal(documentMetaSchema.safeParse({...base, size: 26*1024*1024}).success, false);
});

import test from "node:test";
import assert from "node:assert/strict";
import { filePackError } from "../lib/file-limits.ts";
const MB = 1024 * 1024;
test("pack count limit applies to generated images as well as initial uploads", () => {
  assert.equal(
    filePackError(
      Array.from({ length: 39 }, () => ({ size: 1 })),
      [{ size: 1 }],
    ),
    null,
  );
  assert.ok(
    filePackError(
      Array.from({ length: 40 }, () => ({ size: 1 })),
      [{ size: 1 }],
    ),
  );
});
test("per-file and combined pack limits include exact boundaries", () => {
  assert.equal(filePackError([], [{ size: 25 * MB }]), null);
  assert.ok(filePackError([], [{ size: 25 * MB + 1 }]));
  assert.equal(
    filePackError(
      Array.from({ length: 7 }, () => ({ size: 25 * MB })),
      [{ size: 25 * MB }],
    ),
    null,
  );
  assert.ok(
    filePackError(
      Array.from({ length: 8 }, () => ({ size: 25 * MB })),
      [{ size: 1 }],
    ),
  );
});
test("invalid file sizes are rejected", () => {
  assert.ok(filePackError([], [{ size: NaN }]));
  assert.ok(filePackError([], [{ size: -1 }]));
  assert.equal(filePackError([], [{ size: 0 }]), null);
});

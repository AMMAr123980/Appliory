import test from "node:test";
import assert from "node:assert/strict";
import { validationHandler } from "../lib/validation/api.ts";
import { templates } from "../lib/model.ts";
const base = "https://appliory.test";
async function call(
  path: string[],
  method = "GET",
  body?: unknown,
  headers: Record<string, string> = {},
) {
  const raw =
    typeof body === "string"
      ? body
      : body === undefined
        ? undefined
        : JSON.stringify(body);
  return validationHandler(
    new Request(base + "/api/" + path.join("/"), {
      method,
      headers: {
        ...(raw !== undefined ? { "content-type": "application/json" } : {}),
        ...headers,
      },
      body: raw,
    }),
    { params: Promise.resolve({ path }) },
  );
}
const checklist = { title: "Private QA", items: templates[2].items };
const doc = {
  id: "one",
  name: "private-cv.pdf",
  size: 100,
  type: "application/pdf",
  detected: "pdf",
  hash: "a".repeat(64),
  pages: 1,
  textPages: 1,
  ruleId: "cv",
};
test("stateless API handles all application templates without retaining another request", async () => {
  for (const t of templates) {
    const r = await call(["validate"], "POST", {
      checklist: { title: t.title, items: t.items },
      documents: [],
    });
    assert.equal(r.status, 200);
    assert.equal(
      ((await r.json()) as { data: { status: string } }).data.status,
      "Not ready",
    );
  }
  const one = await call(["validate"], "POST", { checklist, documents: [doc] });
  assert.ok((await one.text()).includes("private-cv.pdf"));
  const two = await call(["validate"], "POST", { checklist, documents: [] });
  assert.ok(!(await two.text()).includes("private-cv.pdf"));
  for (const path of [["audits"], ["files"], ["reports"], ["users"]])
    assert.equal((await call(path)).status, 404);
});
test("API rejects cross-origin requests, wrong method and invalid media type", async () => {
  assert.equal(
    (await call(["validate"], "POST", {}, { origin: "https://evil.test" }))
      .status,
    403,
  );
  assert.equal((await call(["validate"], "GET")).status, 405);
  assert.equal(
    (await call(["validate"], "POST", "{}", { "content-type": "text/plain" }))
      .status,
    415,
  );
  assert.equal((await call(["health", "arbitrary"])).status, 404);
});
test("API rejects malformed JSON, duplicate identifiers and foreign mappings", async () => {
  for (const body of [
    "{bad",
    {},
    { checklist, documents: [doc, { ...doc }] },
    { checklist, documents: [{ ...doc, ruleId: "not-a-rule" }] },
    { checklist, documents: [{ ...doc, textPages: 2 }] },
  ])
    assert.equal((await call(["validate"], "POST", body)).status, 400);
});
test("API bounds streamed bodies even with missing or false Content-Length", async () => {
  for (const headers of [{}, { "content-length": "1" }] as Record<
    string,
    string
  >[]) {
    const r = await call(
      ["validate"],
      "POST",
      " ".repeat(1024 * 1024 + 1),
      headers,
    );
    assert.equal(r.status, 413);
  }
});
test("API responses cannot be cached and do not enable cross-origin reads", async () => {
  const r = await call(["health"]);
  assert.equal(r.status, 200);
  assert.equal(r.headers.get("cache-control"), "no-store");
  assert.equal(r.headers.get("x-content-type-options"), "nosniff");
  assert.equal(r.headers.get("access-control-allow-origin"), null);
  assert.deepEqual(await r.json(), {
    ok: true,
    service: "Appliory",
    mode: "guest",
    storage: "none",
  });
});

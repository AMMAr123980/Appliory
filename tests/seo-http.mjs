import assert from "node:assert/strict";
const origin = (
  process.env.APPLIORY_TEST_URL || "http://localhost:3000"
).replace(/\/$/, "");
const robots = await (await fetch(origin + "/robots.txt")).text();
assert.ok(robots.includes("Sitemap:"));
assert.ok(!/^Disallow:\s*\/tool\s*$/m.test(robots));
const sitemap = await (await fetch(origin + "/sitemap.xml")).text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
assert.ok(urls.length >= 20);
const titles = new Set();
let checked = 0;
for (let i = 0; i < urls.length; i += 4) {
  const results = await Promise.all(
    urls.slice(i, i + 4).map(async (canonical) => {
      const path = new URL(canonical).pathname;
      const r = await fetch(origin + path, {
        headers: { "User-Agent": "Googlebot" },
      });
      assert.equal(r.status, 200, path);
      const html = await r.text();
      assert.ok(
        !/name="robots"[^>]*content="[^"]*noindex/.test(html),
        path + " indexability",
      );
      const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
      assert.ok(title, path + " title");
      const h1s = [...html.matchAll(/<h1(?:\s[^>]*)?>/g)];
      assert.equal(h1s.length, 1, path + " one h1");
      assert.match(html, /<meta name="description" content="[^"]+"/);
      const canon = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)];
      assert.equal(canon.length, 1, path + " one canonical");
      assert.equal(canon[0][1], canonical, path + " correct canonical");
      for (const m of html.matchAll(
        /<script type="application\/ld\+json">(.*?)<\/script>/gs,
      )) {
        const d = JSON.parse(m[1]);
        assert.equal(d["@context"], "https://schema.org");
        assert.ok(!JSON.stringify(d).includes("aggregateRating"));
      }
      return { path, title };
    }),
  );
  for (const r of results) {
    assert.ok(!titles.has(r.title), "unique title " + r.path);
    titles.add(r.title);
    checked++;
    console.log("PASS SEO", r.path);
  }
}
for (const path of [
  "/tools/not-a-tool",
  "/guides/not-a-guide",
  "/not-a-real-page",
])
  assert.equal((await fetch(origin + path)).status, 404, path);
for (const path of [
  "/social-preview.png",
  "/brand-mark.png",
  "/apple-touch-icon.png",
  "/pdf.worker.min.mjs",
]) {
  const r = await fetch(origin + path);
  assert.equal(r.status, 200, path);
  assert.ok((await r.arrayBuffer()).byteLength > 100);
}
console.log(
  `PASS ${checked} indexable sitemap pages, titles, descriptions, H1s, canonical URLs, JSON-LD, assets and true 404s`,
);

# Appliory — guest document checker

No login, database, Supabase configuration, or API keys required.

## Run
Requires Node.js 22.13+.

```bash
npm install -g pnpm@11.25.0
pnpm install --frozen-lockfile
pnpm vercel:dev
```
Open http://localhost:3000.

## Publish on Vercel
Push this folder to GitHub and import it into Vercel as Next.js. Use `pnpm vercel:build` as the build command. The output directory is configured by next.config.ts. Set NEXT_PUBLIC_SITE_URL to your domain. Frontend and API deploy together; no separate backend service is needed.

## Workflow
Choose a starter checklist or create your own. Edit requirements, download/import checklist JSON, add your own files, map them, run checks, correct supported images, rename workspace copies, and download PDF/CSV/JSON/ZIP results. Starter requirements are editable examples to verify against official instructions. No documents or results are preloaded.

All document byte processing and exports happen in the browser. Refreshing or starting over clears selected files. Download before leaving. There are no accounts, saved server records, or contact submission forms. Help links lead to the FAQ and documentation.

## Backend API
GET /api/health returns live service status.
GET /api/templates and GET /api/templates/:slug return starter requirements.
POST /api/validate accepts application/json: `{ "checklist": { "title": "My pack", "items": [] }, "documents": [] }`. Supply at least one real Rule in items. DocumentMeta entries require ruleId; definitions are in lib/model.ts. This stateless API validates caller-supplied metadata with the same engine as the UI; it does not inspect raw file bytes or certify authenticity. The UI runs locally without transmitting document metadata.

Requests enforce a 1 MB streamed size limit, up to 40 documents, schema validation, unique document IDs, known rule mappings, and same-origin browser writes. Nothing is persisted. The hosting provider can retain operational request logs.

## Checks
`pnpm test`, `pnpm typecheck`, `pnpm vercel:build`.
HTTP checks against a running server: `APPLIORY_TEST_URL=http://localhost:3000 pnpm test:http`.

## Limits
40 files per pack, 25 MB per file, 200 MB combined. Full PDF inspection supports up to 300 pages per file. Checks cover size, signature, supported PDF pages/text presence, image dimensions, hashes, names, and mappings. No OCR, PDF repair, authenticity verification, or application submission. A page without selectable text needs manual review. Compression may not achieve the requested size. Downloads depend on browser settings. No result guarantees application acceptance.

## New direct tools and search setup

The /tools directory contains five real standalone tools: PDF page counter, file size checker, image resizer, image compressor and exact duplicate finder. The application checker remains available at /tool. The home page and controls have been redesigned for clearer navigation and readability.

See SEO-AND-LAUNCH.md for researched competitor comparison, SEO/AEO/GEO decisions and the owner’s Search Console, Bing, domain and sitemap launch steps. Test deployed SEO with `APPLIORY_TEST_URL=https://your-domain.example node tests/seo-http.mjs`. No search position, indexation, AI citation or PageSpeed score is guaranteed.

## PDF content summaries

Open /tools/pdf-page-counter, select your PDF and choose Generate document summary. This creates a human-readable extractive overview and page-by-page highlights from actual PDF text, with page references. Choose Brief or Detailed, copy where supported, download TXT, or use Print / Save PDF in your browser. This is not an AI rewrite and can miss context in tables, columns or images. Scanned pages need OCR (not included). Limit: 100 pages and 500,000 extracted characters; over-limit documents are rejected rather than silently truncated. Your PDF and its extracted text remain in browser memory. File details (JSON) are a separate technical report.

The Next.js config now allows unsafe-eval only in development, for the React debugging features discussed during setup. Production retains the stricter policy.

### Windows installation with symlink restrictions

Run `pnpm install --frozen-lockfile --node-linker=hoisted --store-dir D:\pnpm-store` from the extracted project on a drive with free space. Set TEMP/TMP to a directory on that drive if the system drive is full. If changing an existing installation’s linker, remove its incomplete node_modules folder first. Then run `pnpm vercel:dev`. Do not remove the source files or lockfile.

## Security and full regression audit (25 October 2026)

Read FULL-AUDIT-REPORT.md for verified browser flows, security fixes and remaining verification limits. This update includes patched dependencies, so run the install command again after replacing the source. Preserve the existing node_modules directory when its linker is unchanged; do not delete your documents. No website can promise complete protection from every attack. Files in an open workspace and downloaded reports can be seen by someone using that same device.

### Source-grounded outputs

Summaries quote selected source excerpts with page references, without AI-generated facts. Expand each page's extracted source text to compare. Brief/Detailed modes select different amounts of source material; they do not certify full coverage, eligibility or table extraction. Scanned/unreadable text is not invented. Per-file check findings and CSV bytes are tied to their specific selected file. Run `pnpm test` for the 45-test regression suite.

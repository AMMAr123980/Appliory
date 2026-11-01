# Appliory — Free Online Document & Image Tools

[![Website](https://img.shields.io/badge/Website-appliory.tech-153a3d?style=for-the-badge&logo=google-chrome&logoColor=white)](https://www.appliory.tech)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **Official Website:** [https://www.appliory.tech](https://www.appliory.tech)  
> Fast, free, privacy-first web utilities for job applicants, students, and professionals in Pakistan, India, and worldwide. 100% in-browser processing with zero server uploads.

---

## 🛠️ Free Online Tools Available on Appliory

* **[Compress Image to 20KB](https://www.appliory.tech/tools/compress-image-to-20kb):** Dedicated photo, signature, and challan compressor for PPSC, FPSC, NTS, and online recruitment portals.
* **[Compress Image to 50KB](https://www.appliory.tech/tools/compress-image-to-50kb):** Optimized image size reducer for university admissions and HEC scholarship applications.
* **[PDF to Excel Converter](https://www.appliory.tech/tools/pdf-to-excel):** Convert PDF tables into editable Excel (.xlsx) and CSV spreadsheets locally without cloud uploads.
* **[Passport Photo Maker & Resizer](https://www.appliory.tech/tools/passport-photo-maker):** Resize photos to 600×600 px (2×2 inch) or 413×531 px (35×45 mm) for passports and visas.
* **[PDF Page Counter & Summary](https://www.appliory.tech/tools/pdf-page-counter):** Count pages and generate extractive text summaries from multiple PDFs.
* **[File Size Checker](https://www.appliory.tech/tools/file-size-checker):** Check exact document and photo byte sizes against portal upload limits.
* **[Duplicate File Finder](https://www.appliory.tech/tools/duplicate-file-finder):** Detect identical duplicates locally using cryptographic SHA-256 byte hashing.
* **[Document Application Checker](https://www.appliory.tech/tool):** Build a requirement checklist, verify document compliance, and export readiness reports.

---

## 🔒 Privacy Architecture

Unlike traditional web tools, **Appliory never uploads your documents to cloud servers**:
1. Image compression and resizing use the **HTML5 Canvas API** in browser memory.
2. PDF text extraction and table analysis run via **PDF.js** locally.
3. Cryptographic duplicate file detection uses client-side **SHA-256 Web Crypto**.

---

## Run Locally
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

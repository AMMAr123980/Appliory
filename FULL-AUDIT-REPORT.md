# Appliory functional and security regression audit

Date: 25 October 2026. Test files are generated fixtures, not real applicant documents.

## Result and scope

The three application preparation templates were exercised in the browser. Scholarship: four required PDFs passed. University: three required PDFs passed. Job: a valid CV passed; removing it correctly produced Not ready. These are technical preparation checks, not scholarship eligibility decisions, admissions decisions, recruitment decisions or application submission services.

38 automated tests pass, including five tests against the actual stateless API handler, three-template regression coverage, malformed imports, metadata consistency, configured but uncheckable constraints, archive filename safety and CSV formula neutralization. TypeScript, ESLint and the Next.js production build passed. The Sites production build also runs as a required release-packaging check. The earlier BUTTON-TEST-REPORT.md contains the detailed baseline button and export coverage.

## Browser checks in this audit

| Area | Verified behavior |
| --- | --- |
| Scholarship | Four distinct real PDF fixtures read, mapped and passed; optional missing items correctly remain optional. |
| University | Transcript, statement and identity read, mapped and passed. |
| Job | CV read and passed; removing required CV changed readiness to Not ready. |
| Workspace reset | Confirmed Start fresh clears selected files/results and returns to checklist; the generated test pack was removed from memory. |
| Requirement editor | Malformed pdf,,jpg is rejected; minimum 3 pages / maximum 2 pages is rejected; Cancel closes without applying edits. Import containing a javascript: reference is rejected in the browser. |
| Images | After dependency updates: 640x480 PNG resized to 300x225, actual downloaded PNG opened independently with exact dimensions and transparency retained. |
| Compression | 1200x800 JPEG tested at reduced dimensions against 200 KB target; 147.4 KB result reached target. Actual downloaded JPEG independently verified as 600x400 and below 200 KB. |
| Size checker | 20,480-byte fixture and zero-byte fixture measured; 0.01 MB threshold correctly fails the former. |
| Duplicates | Identical PDFs with different names grouped; removing one removes the duplicate warning. |
| PDF content summary | Two-page PDF reports two pages, one with text. Summary contains actual fixture text, cites page 1 and flags page 2 as missing text. Brief mode works. Copy succeeded and clipboard text was verified. TXT download captured. |
| PDF / ZIP exports | Both prepare real browser Blob download links. Actual save-event capture timed out in this browser. Automated PDF parse and ZIP exact-byte/readback tests pass. Browser saving is not claimed verified. |
| Public pages | All 26 sitemap routes opened with unique titles, descriptions and production canonical URLs. The checker loading screen lacked a heading; its primary heading was moved outside Suspense and the workspace heading made secondary. |

## Security fixes

- Updated React, React DOM, server rendering, Vite and affected transitive dependencies to patched versions. Exact lockfile retained. The complete pnpm audit after patching reported zero known vulnerabilities across production and development dependencies (815 dependencies including optional entries). This is a point-in-time registry result, not proof of complete security.
- Retained the seven-day package release-age hold, with narrowly pinned exceptions for these security patch versions.
- Validate session checklist data before applying it; blocked browser storage does not break the workspace.
- Apply schema validation to edited rules and imported checklists. Reject empty extension entries, blank names and non-HTTP(S) reference URLs. References are not fetched by the checker.
- Enforce the 100-rule limit in the UI. Duplicated requirement names stay within the allowed length.
- Reject inconsistent API metadata, duplicate document IDs, foreign mappings, malformed JSON, wrong media types, cross-origin writes and streamed requests above 1 MB, including incorrect Content-Length values.
- The stateless API returns only the current caller's supplied metadata and findings. Repeated-request tests verify no previous request's document appears. There are no document, report, audit or user retrieval APIs.
- Windows ZIP filenames sanitize paths, reserved device names, trailing dots/spaces and bidirectional control characters; case-insensitive collisions get unique suffixes.
- CSV formula neutralization now also covers formula prefixes behind whitespace/control characters.
- Configured but uncheckable PDF/pixel limits produce Needs review instead of silently passing; the results badge also shows Not checked.
- Disable navigation and editing controls during file processing/export to avoid stale results.
- Size and duplicate tools hash/measure bytes without unnecessarily parsing PDF/image content.
- Bound full PDF inspection to 300 pages and PDF image rendering resources to 25 megapixels. Content summaries retain their 100-page / 500,000-character limit.
- Retained CSP, frame restrictions, nosniff and permissions restrictions; added same-origin resource policy and production HSTS. Production does not allow unsafe-eval. Header configuration is code-reviewed; a complete externally delivered header scan was not performed.

## Privacy architecture

Selected documents, extracted text, transformed images and reports remain in browser memory. The checker does not call an upload API or send document metadata to the optional stateless validation API. There are no connected database or file-storage bindings. No accounts or shared document records exist. Files clear on refresh/navigation or explicit clear. Downloaded files remain on the device.

Another visitor has no document-retrieval feature to use. Someone with access to the same open device/browser can still see the workspace and saved downloads. Compromised browsers, malicious extensions, operating systems and future application vulnerabilities are outside this verification. No claim of hack-proof operation is made. Hosting can retain normal access/operational logs.

## Verification limits and next checks

- Actual PDF/ZIP browser saves remain unverified in this automated browser; file generation/contents are verified separately.
- The physical print/save-PDF dialog was not completed. No OCR or scanned-page summarization is provided.
- Not every file format, corrupt PDF, enormous image, network condition or browser memory limit has been exhaustively fuzzed.
- Actual Windows/macOS/iOS/Android hardware, Safari/Firefox engines, operating-system drag/drop and a high-volume load test were not run. Responsive CSS and previous viewport checks are not a substitute for those device tests.
- Public HTTP smoke scripts could not connect from the executor to the managed browser preview. Browser page navigation and direct handler tests were used; no successful HTTP smoke run is claimed for this audit.
- PDF report text uses the current ASCII font fallback. Use JSON/CSV for exact non-Latin names; full multilingual PDF typography has not been verified.
- Search ranking, indexing and external application acceptance cannot be certified by these tests.

## Local update

Replace the project source while retaining your documents. Dependencies changed, so run the install command again. On Windows with the existing hoisted layout:

```cmd
pnpm install --frozen-lockfile --node-linker=hoisted --store-dir D:\pnpm-store
pnpm vercel:dev
```

For other existing layouts, follow README.md. Do not copy build caches or delete original application documents.

## Source/output fidelity follow-up — 25 October 2026

45 automated tests now pass. Added regressions for short fees/deadlines/negations, opposite eligibility statements, Urdu/lowercase/decimal text, isolation between documents, final-page overview coverage, no ellipsis truncation, and per-file CSV findings when multiple files share a requirement.

Summary excerpts remain original extracted source wording (whitespace may be normalized), with page references. Short statements are no longer discarded. Similar sentences are no longer suppressed by fuzzy token overlap, which could remove a negation or different amount. Full extracted text can be expanded per page. Long-document overviews sample across the document including the final nonempty page; page details remain available for every page. A selection can omit context, so it is not a promise of complete semantic coverage or correct extraction of every PDF layout.

Browser fixtures verified PKR 2,500, the 10 November 2026 deadline, travel exclusion, positive/negative eligibility conditions and correct source pages. A separate job PDF's 9 January 2027 interview date did not enter the scholarship summary. Downloaded TXT was independently checked for these facts and for absence of the other PDF's date. A scan-only image PDF was tested separately and correctly reported OCR required instead of generating content.

PDF parsing rejects text-content parsing errors rather than quietly accepting partial recovery. Layouts, embedded fonts and tables can still impair extraction; the original PDF remains authoritative. No AI model or external knowledge is used to generate document content.

Every file-specific report finding now carries its file ID/name. The UI and PDF label its file; CSV rows contain the matching file's bytes instead of combining all files mapped to one rule. ZIP, JSON and CSV byte/content regressions pass.

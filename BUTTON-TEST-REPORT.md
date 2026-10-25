# Appliory button and workflow checks

Verified 25 October 2026 with generated QA files in Chromium. This report distinguishes actual UI/download verification from automated generation tests. It is not a claim that every device/browser or every possible file has been tested.

| Area | Checks performed | Result |
| --- | --- | --- |
| Image resizer | Choose a transparent PNG; ratio-locked 640×480 → 320×240; unlocked 200×100; PNG/JPEG/WebP outputs | Passed in browser |
| Image downloads | Downloaded PNG, JPEG and WebP opened and inspected with an independent image decoder | All three are 320×240; PNG/WebP transparency and JPEG white background verified |
| Invalid image input | Width 0; non-image file selected as image | Validation messages shown; no broken output generated |
| Clear/remove | Clear image result; remove one size-check file while retaining another | Passed |
| Image compressor | 986,214-byte JPEG, target 200 KB at original dimensions | Actual 237.7 KB output; target-not-reached shown accurately |
| Compression target achieved | Same input reduced to 600×400 | Downloaded JPEG is 147.4 KB, below 200 KB; actual dimensions verified |
| File-size checker | 20,480-byte file and zero-byte file; maximum 0.01 MB; invalid maximum 0 | Exact sizes; oversized file fails; empty file within size limit; invalid maximum disables export |
| Size report export | Download file details JSON | Downloaded values and pass/fail flags independently parsed and verified |
| Duplicate finder | Two byte-identical PDFs with different names plus a different file; remove one duplicate | Only identical PDFs grouped; group disappears after removal |
| Duplicate report export | Download JSON | Exact two-file group independently parsed and verified |
| Checklist import/edit | Import two requirements; duplicate, reorder, delete duplicate, edit PDF name and page limit, save | Changes reflected correctly |
| Checklist export | Download edited checklist | Parsed file has correct order, names, page limit and distinct IDs |
| Full-checker negative checks | Map 2-page PDF to max 1 page; map 640×480 photo to max 320×240 | Both fail with appropriate actions |
| Full-checker image editor | Fix image, preview 320×240 JPEG, download copy, apply to workspace | Real JPEG download inspected; mapping preserved and original on disk unchanged |
| Replacement and rename | Replace PDF with readable one-page PDF; rename workspace copy | Actual count and filename update; mapping retained |
| Full-checker positive checks | Re-run corrected PDF/image pack | All configured checks passed: 13 individual checks |
| Result disclosure and navigation | Expand check details; fix/recheck; export; back to results | Actual findings and state preserved |
| Full report JSON and CSV | Prepare and save each | Downloads captured; JSON status/names/PDF count/image dimensions correct; CSV has 13 passing checks |
| Stale prepared exports | Change report name after preparing an export | Previous download panel cleared; generated object URL released |
| Reset confirmation | Start fresh with files selected, cancel confirmation | Confirmation opens; selected files retained after cancellation |
| Replacement busy state | Replace PDF while observing UI | Irrelevant Stop button absent; mappings/edit controls disabled until ready |

## Fixes made during this pass

- Lock image settings while image conversion is running, preventing displayed parameters from diverging from the generated file.
- Apply shared file-count/per-file/combined-size checks to generated images added to the full-checker pack.
- Show compression savings and warn when an encoded image is larger than the original.
- Release PDF tasks even if opening fails; check image output bounds before decoding and release the decoded image on canvas failures.
- Show Stop after this file only during batch document reading, with a visible stop-request state. Do not show it for replacement/image re-inspection where it has no effect.
- Disable mapping, rename, replace and image-edit actions during a busy operation.
- Clear stale prepared exports and preview object URLs after edits/reset/removal.
- Offer selectable summary text when Clipboard API access is unavailable; TXT remains available.

## Automated checks

27 tests pass: file/pack boundaries (including generated-image additions), invalid sizes, rule bounds, PDF/CSV/ZIP generation and exact archive bytes, hashes/signatures/duplicates, missing/optional items, PDF readability/page count, image dimensions, source-grounded summary content/page references, empty text pages and print HTML escaping. TypeScript, ESLint and production builds are also run.

## Remaining verification limits

- PDF and ZIP generation and exact contents pass automated tests, and browser preparation/save links appear. Actual browser PDF/ZIP download-event capture still times out in this test environment. These two formats are not claimed as browser-save verified. JSON, CSV, TXT and image saves have been captured successfully.
- PDF summary content and TXT export were tested in the preceding summary pass. Browser print/save-to-PDF and physical printing were not completed; clipboard availability depends on browser permission/context.
- File chooser inputs were tested. OS-native drag-and-drop gestures, actual interruption halfway through a large batch, every template variant, physical mobile devices and all browser engines were not exhaustively tested.
- A technical pass does not verify document authenticity, content accuracy, eligibility or official acceptance.

For local confirmation of PDF/ZIP saving: run the app, check your own small file pack, choose a report format, wait for the ready panel, then click Save PDF file or Save ZIP file. Open the saved PDF and check the archive contains your selected document bytes and report.

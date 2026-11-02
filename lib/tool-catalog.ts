export const tools = [
  {
    slug: "pdf-page-counter",
    name: "PDF page counter & summary",
    metaTitle: "Count PDF Pages Online Free (No Uploads) | Appliory",
    metaDescription:
      "Count pages across multiple PDF files instantly and generate page-by-page extractive summaries without uploading sensitive documents to cloud servers.",
    keywords: [
      "count pdf pages online",
      "pdf page counter",
      "page range checker",
      "check pdf page range",
      "count pages in multiple pdfs",
      "pdf page count free",
      "pdf summary online",
      "extract pdf text count",
      "private pdf tool",
    ],
    category: "PDF",
    description:
      "Count PDF pages and generate a readable content summary with page references. Local extractive summaries, no uploads or registration.",
    answer:
      "Select a PDF to count its pages, then choose Generate document summary for an overview and page-by-page highlights from the actual text. The summary selects source sentences locally, without an AI model or uploads. A page without selectable text needs OCR and cannot be summarized here.",
    action: "Count PDF pages",
    accepts: ".pdf,application/pdf",
    steps: [
      "Select one or more PDF files from your device.",
      "Read the actual page count and text-page count for each file.",
      "Generate a readable document summary, copy it, download TXT or print/save it as PDF. Technical file details are a separate JSON download.",
    ],
    questions: [
      [
        "Does this upload my PDF?",
        "No. The PDF is read on your device using PDF.js. Its contents are not sent to Appliory’s server.",
      ],
      [
        "Can this act as a page range checker for multiple PDFs?",
        "Yes. When you load one or more PDF files, Appliory displays the exact total page count, text page count, and page ranges so you can verify if your document meets university or job submission page range guidelines.",
      ],
      [
        "Does no text mean a blank page?",
        "No. Scans and outlined text may have no extractable text. Inspect those pages manually.",
      ],
      [
        "Can it read encrypted PDFs?",
        "Password-protected or damaged PDFs may not be readable. Unlock a copy using a trusted tool first.",
      ],
    ],
  },
  {
    slug: "file-size-checker",
    name: "File size checker",
    metaTitle: "File Size Check Online in KB & MB (Instant Validator) | Appliory",
    metaDescription:
      "Check file size online in exact KB and MB. Verify PDF, photo, and document upload limits for jobs, scholarships, PPSC, and FPSC. 100% private in browser.",
    keywords: [
      "file size check",
      "how to check the size of a file",
      "check file size online",
      "file size checker kb mb",
      "check document size in kb",
      "file upload limit checker",
      "measure file size in kb",
      "check pdf size online",
    ],
    category: "FILES",
    description:
      "Check document sizes in KB and MB against your own upload limit. Files stay on your device.",
    answer:
      "Choose your files and enter your application’s maximum size in MB. Appliory shows each file’s actual byte size and whether it is within your chosen limit. One MB is treated as 1,048,576 bytes.",
    action: "Check file sizes",
    accepts: "",
    steps: [
      "Enter the maximum file size required by your application.",
      "Select the documents you want to measure.",
      "Review each size and download your results.",
    ],
    questions: [
      [
        "How to check the size of a file on phone or PC?",
        "Select or drop your file into Appliory’s File Size Checker. It instantly calculates and displays the exact file size in bytes, Kilobytes (KB), and Megabytes (MB) directly in your browser without uploading.",
      ],
      [
        "How do I check if my file is under the 2MB or 500KB upload limit?",
        "Enter your target limit (e.g. 2 MB) into the limit input. The checker highlights in green if your file is within the limit, or flags it in amber/red if it exceeds the limit so you know to compress it before uploading.",
      ],
      [
        "Does this compress files?",
        "No. This tool measures file size. Use the image compressor for supported images; PDF compression is not provided.",
      ],
      [
        "Why does a portal show a different size?",
        "Some portals use decimal MB (1,000,000 bytes), while this tool uses 1,048,576 bytes. Exact byte counts are shown so you can compare.",
      ],
      [
        "Are Word documents supported?",
        "Yes, file size can be measured for any format. This does not verify a Word document’s contents.",
      ],
    ],
  },
  {
    slug: "image-resizer",
    name: "Image resizer",
    metaTitle: "Resize Image to Passport & ID Dimensions Online | Appliory",
    metaDescription:
      "Resize JPG, PNG and WebP photos to exact pixel dimensions (600x600 passport, 35x45mm, custom px). Lock aspect ratio and download privately on your device.",
    keywords: [
      "resize image to passport size",
      "resize photo online",
      "passport size photo maker online",
      "resize image to 600x600",
      "image resizer to pixels",
      "resize jpg png free",
      "free photo resizer",
    ],
    category: "IMAGES",
    description:
      "Resize JPG, PNG and WebP images to exact pixel dimensions and download the result privately.",
    answer:
      "Select an image, enter its required width and height in pixels, and create a resized copy. Keep the aspect ratio locked to avoid stretching. Appliory supports JPEG, PNG and WebP output.",
    action: "Resize an image",
    accepts: "image/jpeg,image/png,image/webp",
    steps: [
      "Select a JPG, PNG or WebP image.",
      "Set pixel dimensions and choose the output format.",
      "Create the image, inspect its new dimensions and size, and download it.",
    ],
    questions: [
      [
        "Will resizing change quality?",
        "Yes. Resampling can change detail. Keep the aspect ratio locked and inspect the downloaded image before submitting it.",
      ],
      [
        "Can I resize a passport photo?",
        "You can set pixel dimensions, but must verify the issuing authority’s background, framing, print-size and other requirements yourself.",
      ],
      [
        "What happens to transparency?",
        "PNG and WebP can preserve transparency. JPEG output uses a white background.",
      ],
    ],
  },
  {
    slug: "image-compressor",
    name: "Image compressor",
    metaTitle: "Compress Image to 20KB, 50KB, 100KB Online Free | Appliory",
    metaDescription:
      "Compress JPG, PNG and WebP images to 20KB, 50KB, 100KB or 200KB online for free. 100% private in-browser compression with instant preview and zero file uploads.",
    keywords: [
      "compress image to 100kb",
      "compress image to 50kb",
      "compress image to 20kb",
      "compress image to 200kb",
      "image compressor",
      "compress image online",
      "image compressor to kb",
      "image size reducer",
      "compress jpg online",
      "compress webp",
      "reduce photo size in kb",
      "free photo compressor",
    ],
    category: "IMAGES",
    description:
      "Reduce JPG or WebP image size with a target in KB. Compare the real result before downloading.",
    answer:
      "Select an image, set a target size in KB, and choose JPEG or WebP. Appliory tries several quality levels, shows the actual result, and tells you if the target was not reached. A target size is not guaranteed.",
    action: "Compress an image",
    accepts: "image/jpeg,image/png,image/webp",
    steps: [
      "Select your image and enter a target size in KB.",
      "Choose JPEG or WebP and optionally reduce dimensions.",
      "Create and inspect the result. Reduce dimensions if it remains too large.",
    ],
    questions: [
      [
        "Can I compress an image to exactly 100 KB?",
        "You can set 100 KB as the target, but the result depends on dimensions and content. Appliory displays the actual size and whether the target was met.",
      ],
      [
        "How do I compress an image to 100KB without losing quality?",
        "To hit 100KB without pixelation or blur, downscale oversized camera dimensions (e.g. from 4000px down to 1200px) alongside quality optimization. This naturally lowers file size while preserving high visual sharpness.",
      ],
      [
        "Are my photos uploaded to a cloud server or stored online?",
        "No. Appliory operates with 100% in-browser processing via HTML5 Canvas. Your images, identity cards, and personal photos never leave your device.",
      ],
      [
        "Does it compress PDFs?",
        "No. This tool compresses supported images (JPG, PNG, WebP). For PDF documents, use our dedicated PDF to Excel Converter or PDF Page Counter.",
      ],
      [
        "Which image formats offer the best compression?",
        "JPEG and WebP offer superior compression ratios for photos. If you have a large PNG photo, exporting as JPEG or WebP will dramatically reduce file size.",
      ],
    ],
  },
  {
    slug: "duplicate-file-finder",
    name: "Duplicate file finder",
    metaTitle: "Duplicate File Finder Online — Exact SHA-256 Hash Matching",
    metaDescription:
      "Find identical duplicate files online with cryptographic SHA-256 byte hashing. Completely private and safe: files are analyzed locally without uploading.",
    keywords: [
      "duplicate file finder",
      "find duplicate files online",
      "duplicate finder free",
      "sha256 file comparison",
      "detect duplicate files",
      "find duplicate documents",
    ],
    category: "FILES",
    description:
      "Find exact duplicate files using SHA-256 hashes, even when filenames differ. No file uploads.",
    answer:
      "Select two or more files to compare their SHA-256 hashes locally. Files with identical bytes are grouped as exact duplicates, even if their names differ. Similar-looking files with different bytes are not grouped.",
    action: "Find exact duplicates",
    accepts: "",
    steps: [
      "Select the files you want to compare, up to 40 files.",
      "Review groups with identical SHA-256 hashes.",
      "Download the findings and decide which copies to keep on your device.",
    ],
    questions: [
      [
        "Does it delete duplicates?",
        "No. It only identifies them. You choose which originals to keep or delete on your device.",
      ],
      [
        "Can it find similar photos?",
        "No. It compares exact bytes, not visual similarity.",
      ],
      [
        "Does it scan my whole device?",
        "No. It can read only files you explicitly select.",
      ],
    ],
  },
  {
    slug: "compress-image-to-20kb",
    name: "Compress image to 20KB",
    metaTitle: "Compress Image to 20KB Online Free (PPSC, FPSC & Jobs) | Appliory",
    metaDescription:
      "Compress photos, signatures, CNIC scans, and bank fee challan forms under 20KB/25KB online for free. Tailored for PPSC, FPSC, NTS, and job portals.",
    keywords: [
      "compress image to 20kb",
      "compress photo to 20kb online",
      "ppsc photo resizer online free",
      "fpsc challan form compress 25kb",
      "compress signature to 20kb",
      "resize challan form to 25kb",
      "nts picture resizer 20kb",
      "compress cnic picture to 25kb",
      "image compressor 20kb",
      "20kb photo converter",
    ],
    category: "IMAGES",
    description:
      "Reduce JPG photos, signatures, CNIC scans, and paid fee challans to under 20KB or 25KB for PPSC, FPSC, NTS, and government recruitment portals.",
    answer:
      "Upload your photo, signature, or scanned bank challan. The target size is preset to 20 KB. Appliory optimizes pixel dimensions and applies lossy compression locally in your browser to hit strict portal limits while preserving sharp text, stamps, and face clarity.",
    action: "Compress to 20KB",
    accepts: "image/jpeg,image/png,image/webp",
    steps: [
      "Select your JPG, PNG or WebP passport photo, signature, or bank fee challan.",
      "The target file size is automatically calibrated to under 20 KB (or 25 KB).",
      "Click Compress image and download your submission-ready file instantly.",
    ],
    questions: [
      [
        "How do I compress a PPSC or FPSC bank fee challan to 25KB?",
        "Crop away unnecessary blank paper borders around the challan first. Upload the cropped scan here and compress it. Keeping the dimensions focused on the bank stamp and deposit ID guarantees the challan stays legible below 25KB.",
      ],
      [
        "How do I compress an online job signature to 20KB without blur?",
        "Sign on plain white paper in good light. Crop tightly around your signature ink before compressing. Because the image area is small, text edges remain crisp even under 20KB.",
      ],
      [
        "Why do government and recruitment portals require 20KB to 25KB?",
        "Portals like PPSC, FPSC, and NTS handle millions of candidate forms simultaneously. Strict 20KB–25KB upload limits prevent server crashes and database bottlenecks.",
      ],
      [
        "Are my CNIC cards and private documents uploaded to any server?",
        "No. Appliory operates with 100% client-side HTML5 Canvas processing. Your CNIC, passport photo, and bank receipts never leave your browser or phone.",
      ],
    ],
  },
  {
    slug: "compress-image-to-50kb",
    name: "Compress image to 50KB",
    metaTitle: "Compress Image to 50KB Online Free (JPG & PNG to 50KB) | Appliory",
    metaDescription:
      "Compress JPG, PNG and WebP images to 50KB online for free. Perfect for university admissions, scholarship portals, and visa photo requirements. 100% private.",
    keywords: [
      "compress image to 50kb",
      "compress photo to 50kb online",
      "reduce image size to 50kb",
      "50kb image converter",
      "compress jpg to 50kb",
      "online photo compressor 50kb",
      "compress document photo to 50kb",
    ],
    category: "IMAGES",
    description:
      "Compress JPG and PNG images down to 50 KB for scholarship portals, college admissions, and visa portals.",
    answer:
      "Select your document image or passport photo. Target is preset to 50 KB. Review the output size and live preview before downloading.",
    action: "Compress to 50KB",
    accepts: "image/jpeg,image/png,image/webp",
    steps: [
      "Select your JPG, PNG, or WebP photo.",
      "The target size is preset to 50 KB.",
      "Create and download your optimized 50KB image.",
    ],
    questions: [
      [
        "Can I convert PNG to JPG for 50KB?",
        "Yes. PNG files are often large. Selecting JPEG output makes it much easier to hit the 50 KB limit while maintaining great quality.",
      ],
      [
        "Is 50KB acceptable for university portals?",
        "Most university admissions and scholarship portals (HEC, Erasmus, Chevening, Fulbright) specify 50KB to 200KB for applicant portraits.",
      ],
    ],
  },
  {
    slug: "passport-photo-maker",
    name: "Passport photo maker & resizer",
    metaTitle: "Passport Photo Maker & Resizer Online Free | Appliory",
    metaDescription:
      "Resize photos to official 2x2 inch (600x600 px) and 35x45 mm passport and visa dimensions online for free. 100% private in your browser with zero uploads.",
    keywords: [
      "passport photo resizer",
      "passport photo maker",
      "resize image to passport size",
      "online passport size photo maker",
      "passport photo 600x600",
      "visa photo maker 35x45",
      "free passport photo converter",
      "create passport size photo online",
    ],
    category: "IMAGES",
    description:
      "Resize photos to official passport and visa dimensions (600×600 px / 2×2 inch or 35×45 mm) with zero server uploads.",
    answer:
      "Upload a portrait photo, select standard 600×600 px (US / Online Portals) or 413×531 px (35×45 mm European/Asian standard), and create a high-resolution print-ready passport photo privately on your device.",
    action: "Make passport photo",
    accepts: "image/jpeg,image/png,image/webp",
    steps: [
      "Select a clear, front-facing portrait photo with a plain background.",
      "Pick your standard preset: 600×600 px or 413×531 px (35×45 mm).",
      "Create and download your resized passport photo instantly.",
    ],
    questions: [
      [
        "What are the official passport photo pixel dimensions?",
        "For US visas and standard 2x2 inch online portals, 600×600 pixels is required. For UK, Schengen, and Asian 35×45 mm photos, 413×531 pixels at 300 DPI is standard.",
      ],
      [
        "Does Appliory crop the face automatically?",
        "Appliory resizes and scales to exact dimensions. Ensure your original photo is already centered with eyes at normal level before creating.",
      ],
      [
        "Can I print the downloaded passport photo?",
        "Yes, the output is saved in full resolution, ready to print on standard 4x6 inch photo paper or upload to government portals.",
      ],
    ],
  },
  {
    slug: "pdf-to-excel",
    name: "PDF to Excel converter",
    metaTitle: "Convert PDF to Excel Free & Private (XLSX) | Appliory",
    metaDescription:
      "Convert PDF tables into editable Excel (.xlsx) and CSV spreadsheets locally in your browser. Clean payroll reports, fill down IDs, remove repeated headers with 100% privacy.",
    keywords: [
      "pdf to excel converter",
      "convert pdf to xlsx free",
      "extract pdf tables to excel",
      "pdf to excel private no upload",
      "pdf table to csv",
      "convert payroll pdf to excel",
      "clean pdf tables",
      "in browser pdf to excel",
    ],
    category: "PDF",
    description:
      "Convert PDF tables into editable spreadsheets, clean extracted data, and export your results. Designed with privacy-conscious processing.",
    answer:
      "Select any text-based PDF containing tables or rows. Appliory analyzes row and column coordinates in your browser, reconstructs the tabular grid, allows intelligent cleanup (fill down missing IDs, repeat page headers, delete repeated headers), and exports clean Excel (.xlsx) or CSV files with zero server uploads.",
    action: "Convert PDF to Excel",
    accepts: ".pdf,application/pdf",
    steps: [
      "Select a PDF file with tables, statements, or payroll reports from your device.",
      "Configure page range and alignment tolerance, then start table extraction.",
      "Clean up extracted data using Fill Down, header removal, or cell editing.",
      "Export your finalized spreadsheet directly to Excel (.xlsx) or CSV format.",
    ],
    questions: [
      [
        "Are my sensitive payroll or financial documents uploaded to any server?",
        "No. The entire extraction and conversion pipeline runs strictly in your browser using local Web APIs and PDF.js. Your document never leaves your machine.",
      ],
      [
        "Can this handle employee IDs with leading zeros (e.g., 00142)?",
        "Yes. Appliory detects identifier codes and preserves them as text formatting in the generated Excel (.xlsx) file, preventing Excel from stripping leading zeros.",
      ],
      [
        "Can it convert scanned PDFs?",
        "Appliory inspects each page for selectable digital text. Scanned document pages that contain only raw bitmap images cannot be extracted without an OCR engine and will be flagged.",
      ],
      [
        "How does the Fill Down cleanup feature work?",
        "In many payroll reports and multi-line invoices, the Employee ID or Department is only shown on the first row of each group. Fill Down propagates that value downwards to all related sub-rows with one click.",
      ],
    ],
  },
] as const;
export type ToolSlug = (typeof tools)[number]["slug"];

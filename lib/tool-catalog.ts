export const tools = [
  {
    slug: "pdf-page-counter",
    name: "PDF page counter & summary",
    metaTitle: "Count PDF Pages & Extract Summary Online Free (No Uploads) | Appliory",
    metaDescription:
      "Count pages across multiple PDF files instantly and generate page-by-page extractive summaries without uploading sensitive documents to cloud servers.",
    keywords: [
      "count pdf pages online",
      "pdf page counter",
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
    metaTitle: "Check File Size in KB & MB Online (Upload Limit Validator) | Appliory",
    metaDescription:
      "Verify document and photo file sizes in exact KB and MB against official application upload limits. Fast, free, and runs 100% locally in your browser.",
    keywords: [
      "check file size online",
      "file size checker kb mb",
      "check document size",
      "file upload limit checker",
      "measure file size in kb",
      "application file limit checker",
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
    metaTitle: "Resize Image to Passport & ID Photo Size Online (Exact Pixels) | Appliory",
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
    metaTitle: "Compress Image to 20KB, 50KB, 100KB, 200KB Online Free | Appliory",
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
        "Does it compress PDFs?",
        "No. This tool compresses supported images only.",
      ],
      [
        "Is compression lossless?",
        "JPEG and WebP quality reduction can lose detail. Keep your original and review the exported image.",
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
] as const;
export type ToolSlug = (typeof tools)[number]["slug"];

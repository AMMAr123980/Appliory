export const tools = [
  {
    slug: "pdf-page-counter",
    name: "PDF page counter & summary",
    metaTitle: "Free PDF Page Counter Online & Summary — No Uploads | Appliory",
    metaDescription:
      "Count PDF pages instantly and generate an extractive text summary with page references online. 100% free, private on-device processing with zero document uploads.",
    keywords: [
      "pdf page counter",
      "count pdf pages",
      "count pages in pdf online",
      "pdf page count free",
      "pdf summary",
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
    metaTitle: "File Size Checker Online (KB & MB) — Free Application Document Check",
    metaDescription:
      "Check document and image file sizes in KB and MB against maximum upload limits. Fast, free, and accurate on-device file size checker with no uploads.",
    keywords: [
      "file size checker",
      "check file size online",
      "file size in kb",
      "check mb size",
      "document size checker",
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
    metaTitle: "Online Image Resizer — Resize JPG, PNG & WebP to Exact Pixels Free",
    metaDescription:
      "Resize JPG, PNG and WebP images to exact pixel dimensions (width & height). Keep aspect ratio locked, convert formats and download privately in your browser.",
    keywords: [
      "image resizer",
      "resize image online",
      "resize photo to pixels",
      "free photo resizer",
      "resize jpg online",
      "resize png online",
      "passport photo resizer",
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
    metaTitle: "Free Image Compressor Online — Compress JPG, PNG & WebP to KB",
    metaDescription:
      "Compress JPG, PNG and WebP images to target KB online without losing quality. 100% private in-browser compression with instant preview and no file uploads.",
    keywords: [
      "image compressor",
      "compress image",
      "compress image to kb",
      "image compressor 100kb",
      "compress image online",
      "image size reducer",
      "compress jpg",
      "compress webp",
      "photo compressor",
      "free online image compressor",
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

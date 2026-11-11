export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  tag: string;
  date: string;
  readTime: string;
  intro: string;
  keywords: string[];
  sections: {
    heading: string;
    body: string;
  }[];
  faqs: [string, string][];
  relatedTool?: { label: string; href: string };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-compress-image-to-20kb-for-ppsc-fpsc",
    title: "How to Compress Image to 20KB for PPSC, FPSC, and Government Job Portals",
    metaTitle: "How to Compress Photo to 20KB for PPSC FPSC Online (Free) | Appliory",
    metaDescription:
      "Learn how to compress JPG and PNG photos under 20KB for PPSC, FPSC, NTS, and government job portals. Keep text and face sharp with 100% private in-browser tools.",
    category: "Image Tools",
    tag: "PPSC · FPSC · NTS",
    date: "2026-10-31",
    readTime: "4 min read",
    intro:
      "Government job portals in Pakistan — PPSC, FPSC, NTS, ETEA, and others — have strict upload rules. The most common requirement is a profile photo below 20KB in JPEG format. Here is how to do it correctly without uploading your photo to any cloud server.",
    keywords: [
      "compress image to 20kb",
      "ppsc photo compressor 20kb",
      "ppsc photo size reducer 20kb",
      "ppsc photo size",
      "resize photo for ppsc application online",
      "fpsc photo requirements",
      "fpsc photo size 20kb",
      "nts photo size kb",
      "compress photo for government job portal",
      "resize photo for job application pakistan",
      "compress picture for ppsc 20kb",
      "compress photo to 20kb online",
      "compress jpeg to 20kb",
      "compress jpg to 20kb",
      "resize photo to 20kb online free",
      "ppsc challan compress 25kb",
      "signature resizer 20kb",
      "photo size reducer to 20kb",
      "20kb photo converter",
    ],
    sections: [
      {
        heading: "Why Government Portals Require 20KB Photos",
        body: "Pakistan's government job portals set strict file size limits — typically between 10KB and 20KB for profile photos — to reduce server load and standardize uploads. These limits are enforced by the portal and your form will not submit if the image exceeds the limit. The format is almost always JPEG (JPG), not PNG.",
      },
      {
        heading: "What Happens If Your Photo Is Too Large",
        body: "If you try to upload a photo above 20KB, the portal will show an error like 'File size exceeds limit' or 'Invalid file'. Many applicants miss application deadlines because they cannot fix their photo size. A photo that looks small on screen can still be 500KB or more depending on how it was saved.",
      },
      {
        heading: "How to Compress Your Photo to 20KB — Step by Step",
        body: "Open Appliory's free Image Compressor at appliory.tech/tools/compress-image-to-20kb. Click the upload area or drag your photo into it. Set the target size to 20KB. Click Compress. The tool reduces your photo's quality progressively until it reaches 20KB. Preview the result — if it looks acceptable, download it. No account is needed and your photo never leaves your device.",
      },
      {
        heading: "Tips for Best Photo Quality at 20KB",
        body: "Start with a clear, well-lit JPEG photo. Avoid PNG for government portals — PNG files cannot be compressed as aggressively as JPEG. Crop your photo to the required dimensions (usually 35×45mm or passport size) before compressing. A smaller canvas means less data and better quality at the same file size. For best results, use a plain white or light blue background.",
      },
      {
        heading: "Does Compressing a Photo Affect Its Validity",
        body: "No. Government portals care about file size limits and format — not image quality scores. As long as your face is clearly visible, the photo is well-lit, and the background matches requirements, a compressed 20KB photo is perfectly valid. Appliory's tool preserves the EXIF orientation data so the photo will not appear rotated.",
      },
      {
        heading: "Privacy — Your Photo Stays on Your Device",
        body: "Unlike cloud-based compressors that upload your photo to their servers, Appliory processes everything inside your browser using HTML5 Canvas. Your photo is never sent to any server, stored, or analyzed. This is especially important when your photo contains a government-issued ID or biometric data.",
      },
    ],
    faqs: [
      [
        "Can I compress a PNG photo to 20KB for PPSC?",
        "Yes, but we recommend converting it to JPEG first. PNG files use lossless compression, which means they cannot be reduced as much as JPEG without losing data. Most government portals also require JPEG specifically.",
      ],
      [
        "What if my photo is already 20KB but still gets rejected?",
        "The portal may be checking dimensions in addition to file size. Make sure your photo is the correct size (usually 213×213 pixels or 35×45mm at 96 DPI). Use Appliory's Image Resizer to set exact dimensions before compressing.",
      ],
      [
        "Is Appliory's image compressor completely free?",
        "Yes. Appliory is 100% free with no account required. There are no hidden fees, watermarks, or download limits.",
      ],
    ],
    relatedTool: {
      label: "Compress Image to 20KB — Free Tool",
      href: "/tools/compress-image-to-20kb",
    },
  },
  {
    slug: "how-to-compress-image-to-50kb",
    title: "How to Compress Image to 50KB for University and Scholarship Applications",
    metaTitle: "Compress Image to 50KB Free Online — University & Scholarship Portals | Appliory",
    metaDescription:
      "Compress JPG, PNG, and WebP images to exactly 50KB for university admissions, scholarship portals, and visa forms. Fast, free, and runs locally with zero uploads.",
    category: "Image Tools",
    tag: "Scholarships · Universities",
    date: "2026-10-31",
    readTime: "4 min read",
    intro:
      "University admissions portals, scholarship applications, and visa systems often require photos below 50KB. This guide explains how to reduce any image to exactly 50KB without losing important detail — privately, in your browser.",
    keywords: [
      "compress image to 50kb",
      "compress photo for university admission",
      "reduce image size 50kb",
      "scholarship photo size kb",
      "compress image for visa application",
      "online image compressor 50kb",
      "compress jpeg to 50kb",
      "compress jpg to 50kb online",
      "reduce photo to 50kb",
      "image compressor 50kb online",
      "50kb photo converter online free",
      "resize photo to 50kb",
      "compress picture to 50kb",
      "photo size reducer to 50kb",
    ],
    sections: [
      {
        heading: "Common Portals That Require 50KB Photos",
        body: "HEC scholarships, Punjab University, University of Karachi, Aga Khan Foundation, and many international scholarship portals set a 50KB limit for profile photos. Visa applications for embassies often have the same limit. The required format is usually JPEG.",
      },
      {
        heading: "The Difference Between 20KB and 50KB Limits",
        body: "A 50KB limit gives your photo more room for detail compared to 20KB. This means you can keep a higher JPEG quality setting while still meeting the limit. For passport and visa photos where facial features must be clearly visible to biometric systems, 50KB is a more comfortable target than 20KB.",
      },
      {
        heading: "How to Compress Your Image to 50KB",
        body: "Go to Appliory's Compress Image to 50KB tool. Upload your photo by clicking or dragging it into the upload zone. The tool will automatically reduce the file size while trying to preserve as much quality as possible. Download the compressed result. The entire process happens in your browser — nothing is uploaded to any server.",
      },
      {
        heading: "What About WebP and PNG Images",
        body: "WebP images can be converted and compressed efficiently. PNG images should ideally be converted to JPEG before targeting a 50KB limit, because PNG lossless compression has a ceiling. If the portal explicitly requires PNG, Appliory can still reduce the file size, though the result depends heavily on the image content.",
      },
      {
        heading: "Checking the Output Before Submitting",
        body: "Always open the downloaded file before uploading to the portal. Check that your face or the document content is clearly readable. Check that the background matches the requirements (white or light blue for most passport photos). Verify the file size by right-clicking the file and viewing Properties.",
      },
    ],
    faqs: [
      [
        "Will compressing to 50KB reduce photo quality significantly?",
        "At 50KB, most photos retain excellent visual quality. The tool adjusts JPEG quality progressively, so the result is the best quality achievable at that file size.",
      ],
      [
        "Can I compress a screenshot to 50KB?",
        "Yes. Screenshots saved as PNG can be large. The compressor can reduce them to 50KB, though text-heavy screenshots may appear blurry at very low sizes. Try a higher target first.",
      ],
      [
        "Does Appliory store my compressed photos?",
        "No. Your photo is processed entirely in your browser and is never sent to any server. When you close the tab, the image is gone.",
      ],
    ],
    relatedTool: {
      label: "Compress Image to 50KB — Free Tool",
      href: "/tools/compress-image-to-50kb",
    },
  },
  {
    slug: "how-to-convert-pdf-to-excel",
    title: "How to Convert a PDF Table to Excel Without Uploading to Any Server",
    metaTitle: "Convert PDF to Excel Free — No Upload, No Registration | Appliory",
    metaDescription:
      "Convert PDF tables into editable Excel (.xlsx) and CSV spreadsheets locally in your browser. Perfect for payroll reports and financial sheets with zero uploads.",
    category: "PDF Tools",
    tag: "PDF · Excel · Privacy",
    date: "2026-10-31",
    readTime: "5 min read",
    intro:
      "Most online PDF to Excel converters upload your document to a cloud server. If your PDF contains payroll data, employee IDs, salaries, or financial records, this is a serious privacy risk. Appliory converts PDF tables directly in your browser — nothing leaves your device.",
    keywords: [
      "convert pdf to excel",
      "pdf table to excel free",
      "pdf to xlsx without upload",
      "extract table from pdf",
      "pdf to csv converter",
      "private pdf to excel converter",
      "payroll pdf to excel",
      "convert pdf to excel online free",
      "pdf to excel converter without email",
      "pdf to excel free no limits",
      "convert bank statement pdf to excel free",
      "extract table from pdf to excel online",
      "pdf to xlsx converter free",
    ],
    sections: [
      {
        heading: "Why PDF to Excel Conversion Is Difficult",
        body: "PDFs were designed for viewing, not for data extraction. Tables in a PDF are stored as positioned text elements — not as actual rows and columns. A PDF converter must reconstruct the table structure by analyzing the X and Y positions of every text item on every page. This works well for simple, clean tables, but complex merged cells or multi-page reports are more challenging.",
      },
      {
        heading: "What Types of PDFs Work Best",
        body: "Text-based PDFs — those created directly from Excel, Word, or accounting software — convert well because the text is embedded and selectable. Scanned PDFs are images of documents; without OCR (optical character recognition), the text cannot be extracted. Appliory's converter works with text-based PDFs and clearly labels uncertain rows so you can review them.",
      },
      {
        heading: "How to Convert Your PDF to Excel Using Appliory",
        body: "Open the PDF to Excel Converter at appliory.tech/tools/pdf-to-excel. Upload your PDF. Choose the page range if you only need specific pages — useful for large payroll reports. Click Extract Table. Review the result in the editable preview grid. Apply cleanup options: fill down empty employee IDs, remove repeated header rows, or add page numbers as a reference column. Click Download Excel or Download CSV.",
      },
      {
        heading: "Intelligent Payroll Report Cleanup",
        body: "Payroll PDFs often list an employee ID once at the top and then have multiple pay lines below it without repeating the ID. Appliory's Fill Down feature detects this pattern and fills the employee ID into every row that belongs to that employee. This makes the Excel output ready for pivot tables and VLOOKUP without manual editing.",
      },
      {
        heading: "Reviewing the Output Before Use",
        body: "Always review the extracted table. Numbers with leading zeros — like employee IDs starting with 0 — are preserved as text strings so Excel does not strip them. Check totals against the original PDF. For financial data, always treat the PDF as the authoritative source and the Excel as a working copy.",
      },
      {
        heading: "Privacy — Why This Matters for Payroll Data",
        body: "Cloud PDF converters store your uploaded document on their servers, sometimes for days. A payroll PDF can contain hundreds of employees' names, IDs, salaries, and bank account details. Appliory uses PDF.js — a JavaScript library — to read the PDF locally in your browser. No data is sent anywhere.",
      },
    ],
    faqs: [
      [
        "Can Appliory convert scanned PDFs to Excel?",
        "Not directly. Scanned PDFs are images, and extracting text requires OCR (optical character recognition). Appliory works with text-based PDFs. If your PDF was generated from accounting software or Excel, it will convert correctly.",
      ],
      [
        "What if the table columns are mixed up?",
        "PDF table extraction depends on the X positions of text items. Some PDFs with unusual layouts may produce misaligned columns. Use the editable grid to correct individual cells, or download the CSV and clean it in Excel.",
      ],
      [
        "Is there a file size limit?",
        "Appliory processes PDFs locally, so the limit depends on your device's memory. Very large PDFs (100+ pages) should be processed in page ranges using the Page Range option.",
      ],
    ],
    relatedTool: {
      label: "PDF to Excel Converter — Free Tool",
      href: "/tools/pdf-to-excel",
    },
  },
  {
    slug: "how-to-make-passport-photo-online-free",
    title: "How to Make a Passport Size Photo Online Free — 2×2 Inch and 35×45mm",
    metaTitle: "Make Passport Size Photo Online Free (2x2 & 35x45mm) | Appliory",
    metaDescription:
      "Create official 2x2 inch and 35x45mm passport and visa photos online for free. Adjust dimensions, maintain aspect ratio, and download privately with zero uploads.",
    category: "Image Tools",
    tag: "Passport · Visa · Photo",
    date: "2026-10-31",
    readTime: "4 min read",
    intro:
      "Commercial passport photo studios charge per print. Online services upload your face to their servers. Appliory's Passport Photo Maker creates correctly sized passport and visa photos directly in your browser — free, instant, and private.",
    keywords: [
      "passport photo online free",
      "make passport size photo",
      "2x2 inch passport photo online",
      "35x45mm passport photo",
      "visa photo maker free",
      "passport photo pakistan online",
      "passport size photo generator",
      "passport size photo maker",
      "passport photo resizer",
      "passport size photo maker online free",
      "create passport photo free",
      "make passport size photo online",
      "convert photo to passport size online free",
      "passport photo 600x600",
    ],
    sections: [
      {
        heading: "What Are the Standard Passport Photo Sizes",
        body: "The United States requires 2×2 inch (51×51mm) photos. The United Kingdom, European Schengen area, and most Pakistani visa applications require 35×45mm. NADRA and Pakistani passport applications follow the 35×45mm standard. Some portals accept both. Appliory supports both sizes and lets you print a sheet of 4 or 6 photos on a single page.",
      },
      {
        heading: "Background Requirements for Passport Photos",
        body: "Most countries require a plain white or off-white background. The USA requires white. The UK accepts white or light grey. UAE and most Gulf state visa photos require white. If your photo has a different background, Appliory's tool provides a background removal option so you can set it to white before cropping.",
      },
      {
        heading: "How to Make Your Passport Photo Using Appliory",
        body: "Open the Passport Photo Maker at appliory.tech/tools/passport-photo-maker. Upload a clear portrait photo. Select your required size — 35×45mm or 2×2 inch. Use the crop tool to center your face with the top of your head near the top edge and your chin near the bottom third. Adjust if needed. Download the single photo or a printable sheet.",
      },
      {
        heading: "Photo Requirements Beyond Size",
        body: "Your face must occupy 70–80% of the frame. Eyes must be open and looking directly at the camera. No glasses (required by most countries after 2020). Neutral expression. No head coverings unless for religious reasons. Good, even lighting with no shadows on your face or background. These are checked by the passport issuing authority, not by Appliory.",
      },
      {
        heading: "Printing Your Passport Photo",
        body: "Download the printable sheet and take it to any photo printing shop or print it on a colour printer on glossy photo paper. Most shops print a 4×6 inch sheet for a few rupees. Cut along the borders. The output is sized correctly for standard passport photo printing.",
      },
    ],
    faqs: [
      [
        "Can I use a selfie for my passport photo?",
        "It depends on the quality. Selfies taken in good light with a plain background often work. The requirements are about technical quality — not about how the photo was taken.",
      ],
      [
        "Does Appliory remove the background automatically?",
        "Appliory provides a background adjustment option. For best results, start with a photo taken against a light background — automatic removal is more accurate and the edges look cleaner.",
      ],
      [
        "Is Appliory's passport photo maker really free?",
        "Yes, completely free. No watermark, no account, no subscription. Your photo stays in your browser and is never uploaded.",
      ],
    ],
    relatedTool: {
      label: "Passport Photo Maker — Free Tool",
      href: "/tools/passport-photo-maker",
    },
  },
  {
    slug: "how-to-reduce-image-file-size-without-losing-quality",
    title: "How to Reduce Image File Size Without Losing Quality",
    metaTitle: "Reduce Image File Size Without Losing Quality — Free Online | Appliory",
    metaDescription:
      "Learn how to compress JPG, PNG, and WebP images while preserving crisp clarity. Practical dimension scaling and quality tips for job portals and email attachments.",
    category: "Image Tools",
    tag: "Image Compression · Quality",
    date: "2026-10-31",
    readTime: "5 min read",
    intro:
      "Reducing an image's file size without visible quality loss is possible — if you understand the right approach. This guide explains compression types, format choices, and the practical steps to get the smallest file with the sharpest result.",
    keywords: [
      "reduce image file size without losing quality",
      "compress image without quality loss",
      "best image compression online",
      "compress jpg without losing quality",
      "reduce png file size",
      "online image optimizer free",
      "compress image without losing quality",
      "reduce image size in kb",
      "compress jpeg online free",
      "photo size reducer in kb",
      "compress picture in kb",
      "reduce photo size in kb",
    ],
    sections: [
      {
        heading: "Lossy vs Lossless Compression — What Is the Difference",
        body: "Lossless compression reduces file size without discarding any image data. The image is pixel-for-pixel identical to the original. PNG uses lossless compression. Lossy compression discards some image data — typically fine details and color transitions — to achieve much smaller files. JPEG uses lossy compression. Most images can tolerate moderate lossy compression with no visible difference to the human eye.",
      },
      {
        heading: "Choosing the Right Format",
        body: "JPEG is best for photographs and portraits. It compresses efficiently and is universally supported by every portal and device. PNG is best for screenshots, logos, and images with text — content that needs sharp edges. WebP is a modern format that offers smaller files than both JPEG and PNG at the same quality, but not all portals accept it. For government job portals in Pakistan, always use JPEG.",
      },
      {
        heading: "The Quality Setting — Finding the Sweet Spot",
        body: "JPEG quality is typically measured from 1 to 100. Quality 80–85 produces images that look identical to quality 100 to most people, but the file is 50–70% smaller. Quality below 60 starts to show visible artifacts — blurring, color banding, and blocky areas called 'mosquito noise'. Appliory's compressor targets a file size and finds the highest quality JPEG that fits within it.",
      },
      {
        heading: "Resize Before You Compress",
        body: "The biggest factor in image file size is pixel dimensions. A photo from a modern smartphone is often 4000×3000 pixels or larger. Resizing it to 600×600 pixels before compressing dramatically reduces the file size while keeping the image clear at the size it will actually be displayed. Always resize to the required dimensions first, then compress to hit the file size limit.",
      },
      {
        heading: "Practical Steps Using Appliory",
        body: "Open the Image Compressor at appliory.tech/tools/image-compressor. Upload your image. Set the target file size in KB. Preview the result and compare quality. If the quality is acceptable, download it. If you also need to resize, use the Image Resizer first — it lets you set exact pixel dimensions — then run the compressor. Everything stays in your browser.",
      },
    ],
    faqs: [
      [
        "Why does my PNG file stay large even after compression?",
        "PNG uses lossless compression, so it cannot discard data. Convert the PNG to JPEG first, then compress it. The file will be much smaller.",
      ],
      [
        "Can I compress multiple images at once?",
        "Appliory currently processes one image at a time for the free tool. This keeps the tool fast and your device memory free.",
      ],
      [
        "Will the compressed image pass portal validation?",
        "Yes, if it meets the format and file size requirements. Portals check format (JPEG, PNG) and file size in KB. They do not check JPEG quality settings.",
      ],
    ],
    relatedTool: {
      label: "Image Compressor — Free Tool",
      href: "/tools/image-compressor",
    },
  },
  {
    slug: "what-is-appliory",
    title: "What Is Appliory? Free Document and Image Tools for Job and Scholarship Applicants",
    metaTitle: "What Is Appliory? Free Privacy-First Document & Image Tools | Appliory",
    metaDescription:
      "Discover Appliory: a free, privacy-first platform offering image compressors, PDF converters, passport photo makers, and document checkers with zero server uploads.",
    category: "About Appliory",
    tag: "Overview · Privacy",
    date: "2026-10-31",
    readTime: "3 min read",
    intro:
      "Appliory is a free browser-based toolkit for students, job applicants, and professionals who need to prepare documents for online portals. Every tool processes files locally on your device — nothing is ever uploaded to a server.",
    keywords: [
      "what is appliory",
      "appliory tools",
      "free document tools online",
      "free image compressor for job applications",
      "privacy first document tools",
      "free tools for ppsc fpsc applications",
    ],
    sections: [
      {
        heading: "The Problem Appliory Solves",
        body: "Online job portals, government recruitment platforms (PPSC, FPSC, NTS), and university admissions systems enforce strict file size and format rules. Most applicants do not have easy access to tools that can compress a photo to exactly 20KB, extract a payroll table from a PDF, or create a correctly sized passport photo — without uploading their personal documents to a third-party server.",
      },
      {
        heading: "Appliory's Core Tools",
        body: "Image Compressor: reduce JPG, PNG and WebP photos to any target size (20KB, 50KB, 100KB). Compress to 20KB: dedicated tool for PPSC, FPSC and NTS portals. Compress to 50KB: for university and scholarship portals. Image Resizer: set exact pixel dimensions for 600×600 or any portal requirement. Passport Photo Maker: create 35×45mm and 2×2 inch passport photos. PDF to Excel Converter: extract tables from text-based PDFs privately. PDF Page Counter: count pages without uploading. File Size Checker: verify exact KB and MB. Document Checker: full application readiness checker with checklists.",
      },
      {
        heading: "Why Privacy Matters",
        body: "Most online tools upload your documents to cloud servers. A photo uploaded to a free compressor may be stored, analyzed, or exposed in a data breach. Appliory processes all files using browser APIs — HTML5 Canvas for images and PDF.js for PDFs. Your documents never leave your device.",
      },
      {
        heading: "Who Uses Appliory",
        body: "Students applying for HEC scholarships, Chevening, Commonwealth, and Fulbright. Job applicants uploading to PPSC, FPSC, NTS, ETEA, and corporate HR portals. Payroll and HR staff extracting data from salary PDFs. Professionals preparing visa and travel documents. Anyone who needs to resize, compress, or check a document privately.",
      },
    ],
    faqs: [
      [
        "Is Appliory completely free?",
        "Yes. All tools are free with no account, no watermark, and no subscription.",
      ],
      [
        "Does Appliory work on mobile?",
        "Yes. Appliory is fully responsive and works on Android and iOS browsers.",
      ],
      [
        "Who made Appliory?",
        "Appliory was built by Ammar Hassan Malik, a software engineer based in Pakistan.",
      ],
    ],
    relatedTool: {
      label: "Explore All Free Tools",
      href: "/tools",
    },
  },
  {
    slug: "how-to-resize-ppsc-fpsc-challan-form-to-25kb",
    title: "How to Resize PPSC & FPSC Fee Challan Form to 25KB Online (Free)",
    metaTitle: "Resize PPSC & FPSC Challan Form to 25KB Online Free | Appliory",
    metaDescription:
      "Compress paid bank fee challan forms under 25KB for PPSC and FPSC online applications without blur. Crop borders and preserve bank stamps with 100% private tools.",
    category: "Challan & Fee Receipts",
    tag: "PPSC · FPSC · Challan",
    date: "2026-11-01",
    readTime: "6 min read",
    intro:
      "When applying online for PPSC (Punjab Public Service Commission) or FPSC (Federal Public Service Commission) jobs, one of the most frustrating errors is: 'Challan image size must be less than 25KB'. This error stops thousands of candidates from completing their applications every year. Here is a complete, step-by-step guide to compress your paid bank fee receipt so the stamp and bank deposit ID stay perfectly legible under 25KB.",
    keywords: [
      "resize challan form to 25kb",
      "ppsc challan form compress 25kb",
      "fpsc challan size reducer",
      "fpsc challan form compress 25kb online",
      "compress ppsc challan online free",
      "challan image size less than 25kb",
      "ppsc bank challan size reducer",
      "compress 32a challan form to 25kb",
      "ppsc fee challan scan size",
      "resize ppsc challan in mobile",
      "resize bank receipt to 25kb",
      "ppsc challan compress 25kb",
      "ppsc image resize",
      "ppsc challan compressor 25kb",
    ],
    sections: [
      {
        heading: "Why PPSC and FPSC Reject Challan Scans Above 25KB",
        body: "Government recruitment portals like PPSC and FPSC enforce a strict 25KB file size limit for paid fee challan scans for several technical and administrative reasons. First, these portals handle tens of thousands of applications simultaneously during peak recruitment drives. Large image files cause database bottlenecks and slow the verification process for administrative staff. Second, 25KB is enough for a legible scan of a bank stamp and deposit reference number — the two things reviewers actually need to verify payment. Third, portal servers often run on shared infrastructure with tight storage quotas. Candidates taking pictures with modern smartphones end up with photos that are 2MB to 5MB in size. Trying to upload these directly results in an error message, and many applicants waste hours trying to find a solution on the day of the deadline.",
      },
      {
        heading: "What Information Must Remain Readable at 25KB",
        body: "Before compressing your challan, you need to know exactly what must stay clear in the final image. The bank branch code and branch name must be readable so administrators can verify the payment location. The deposit reference number or scroll number is the unique transaction identifier — this must be crystal clear. The bank cashier's official stamp or seal must be visible. The date of payment confirms the challan was paid before the application deadline. The applicant's CNIC number links the payment to your account. The amount deposited confirms the correct fee was paid. Everything else — blank paper margins, printed form text, and decorative borders — is not needed by the reviewer and can be safely removed by cropping.",
      },
      {
        heading: "Crucial Rule: Always Crop Before You Compress",
        body: "This is the single most important rule for getting a legible 25KB challan. A bank fee challan is usually a full A4 or half-A4 sheet. If you photograph the entire sheet and then compress it down to 25KB, the compression algorithm has to discard an enormous amount of data to hit the target. The result is a blurry, pixelated image where the bank stamp looks like a smudge and the deposit number is unreadable. By cropping the image to only the applicant's copy area — typically a strip 8–10 cm wide and 5–7 cm tall — you dramatically reduce the total pixel area. This means the compression algorithm has far less work to do, and your 25KB budget goes entirely toward preserving the sharp edges of the stamp and the printed numbers.",
      },
      {
        heading: "How to Take a Good Challan Photo on Your Mobile",
        body: "The quality of your compressed challan depends entirely on the quality of the original photo. Here are specific steps to get a usable image before you even open a compression tool. Place the challan flat on a table in a well-lit room. Avoid direct sunlight, which creates glare that washes out printed text. Use your phone's rear camera — the front camera is lower resolution on most phones. Hold the phone directly above the challan, parallel to the surface, to avoid trapezoidal distortion. Tap on the challan in your camera app to focus precisely on the printed text. Take 2–3 shots and choose the sharpest one. If the image looks blurry or the stamp is hard to read in the full-resolution photo, it will be unreadable after compression. Take a fresh photo rather than compressing a poor-quality original.",
      },
      {
        heading: "How to Compress Your Challan to 25KB Using Appliory",
        body: "Open Appliory's free Compress Image to 20KB or 25KB tool at appliory.tech/tools/compress-image-to-20kb. First, use your phone's default photo editor or any free crop tool to crop tightly around the applicant's copy portion of the challan. Remove all white paper margins and trim to just the essential area with the deposit number and bank stamp. Then select or drag your cropped challan photo into Appliory. The tool automatically calibrates both pixel dimensions and JPEG compression quality in multiple passes to reach the smallest file size while keeping text edges sharp. Download your JPEG file. The processing happens entirely inside your browser — your bank receipts, CNIC details, and transaction information are never uploaded to external servers.",
      },
      {
        heading: "Verifying the Result Before Portal Submission",
        body: "After downloading your compressed challan, open the image file on your phone or computer screen and zoom in to 100% view. Specifically check: Can you read all digits of the deposit reference or scroll number clearly? Is the bank cashier stamp or seal visible enough to confirm it is an official stamp? Are the date and deposited amount legible? If yes to all three, your challan will pass manual verification. If any text looks blurry, it means you either started with a low-quality photo or the compression was too aggressive. In that case, retake the original photo in better lighting and repeat the process. Submit the compressed image to your PPSC or FPSC portal only after confirming all critical information is readable.",
      },
      {
        heading: "Common Mistakes That Lead to Challan Rejection",
        body: "Many candidates make avoidable mistakes when preparing their challan scans. Submitting the entire A4 sheet without cropping is the most common error — it forces heavy compression and destroys legibility. Using a screenshot instead of a direct photo produces lower image quality because screenshots are compressed twice. Using PNG format instead of JPEG produces larger file sizes at the same visual quality — PPSC and FPSC portals require JPEG specifically. Compressing on a mobile app that adds watermarks can get your application flagged. And submitting a photocopy instead of the original challan may be rejected regardless of file size, as the official stamp needs to be from the bank's actual ink pad.",
      },
    ],
    faqs: [
      [
        "Can I upload a PDF challan to PPSC?",
        "No. PPSC and FPSC strictly require image format (JPG or JPEG) under 25KB for fee challan verification. If your bank gave you a printed challan, photograph it and compress the image. If your bank gave you a digital PDF receipt, take a screenshot of the relevant section and compress that image.",
      ],
      [
        "Will the bank stamp remain clear at 25KB?",
        "Yes, provided you cropped out all unnecessary white borders before compressing. The key is that 25KB is sufficient for a small, tightly cropped area showing the stamp, deposit number, and date. If you try to fit the entire A4 sheet into 25KB, the stamp will become illegible.",
      ],
      [
        "What if I cannot get below 25KB without the image becoming blurry?",
        "This usually means the original photo area is still too large. Try cropping even more aggressively — focus only on the bank stamp, deposit reference number, and date, eliminating everything else. A well-cropped 400×300 pixel image can be compressed to under 25KB with excellent clarity.",
      ],
      [
        "Does Appliory store my bank fee receipt?",
        "No. Appliory processes everything locally in your browser memory using HTML5 Canvas. Nothing is transmitted to any cloud database, server, or third party. When you close the browser tab, all loaded files are cleared automatically from device memory.",
      ],
      [
        "My challan was deposited at HBL / UBL / ABL — does it matter which bank?",
        "No. The compression process is identical regardless of which bank issued your challan. What matters is that your photo shows the official bank cashier stamp, the deposit reference number, and the amount deposited. All Pakistani bank challans follow the same general format.",
      ],
    ],
    relatedTool: {
      label: "Compress Challan to 20KB/25KB",
      href: "/tools/compress-image-to-20kb",
    },
  },
  {
    slug: "how-to-compress-signature-to-20kb",
    title: "How to Compress Signature to 20KB for Online Job Applications",
    metaTitle: "Compress Signature to 20KB Online Free (Sharp & Clear) | Appliory",
    metaDescription:
      "Compress scanned signature images to under 20KB for PPSC, FPSC, NTS, and university portals without blur. Crop ink tightly and optimize locally with zero uploads.",
    category: "Signature Tools",
    tag: "Signature · PPSC · Jobs",
    date: "2026-11-01",
    readTime: "5 min read",
    intro:
      "Online recruitment portals and university application forms almost universally demand a candidate's digital signature below 20KB. This requirement is tougher than it sounds — a photo of your signature taken on a modern smartphone is typically 2MB to 4MB, which is 100 to 200 times larger than the portal allows. Compressing a signature without losing line clarity or turning crisp ink strokes into blurry noise requires the right approach. This guide explains exactly how to do it.",
    keywords: [
      "compress signature to 20kb",
      "signature resizer online 20kb",
      "reduce signature size in kb",
      "ppsc signature size online",
      "compress signature for job application",
      "signature resizer 20kb",
      "reduce signature size to 20kb",
      "online signature compressor 20kb",
      "compress signature online",
      "resize signature image in kb",
      "signature size 10kb to 20kb online",
      "signature resize 10 to 20 kb",
      "signature resize 10 kb to 20kb",
      "compress signature to 20 kb",
    ],
    sections: [
      {
        heading: "Why Online Portals Require Signatures Under 20KB",
        body: "PPSC, FPSC, NTS, ETEA, and most university admission portals set a 20KB limit for digital signature uploads because signature images are stored directly in applicant profile databases. If every candidate uploads a 500KB signature image, a database with 500,000 applicants would require 250GB just for signatures. At 20KB per applicant, the same database uses only 10GB — a 25x reduction in storage and bandwidth costs. The 20KB limit is also based on the fact that a correctly prepared signature image — small canvas, plain white background, dark ink — does not need more than 20KB to be clearly readable. The challenge is that most people photograph their signature on a full-size piece of paper, which creates a huge, blank white area that the compression algorithm must struggle to eliminate.",
      },
      {
        heading: "How to Capture a Perfect Signature for Compression",
        body: "The quality of your digital signature starts long before you open any compression tool. Begin by signing on clean, unlined white paper using a dark blue or black ballpoint pen. Avoid felt-tip markers or gel pens that can smear. Write your signature at a comfortable, medium size — not too small and not so large that it fills the entire page. Place the paper flat on a table with good lighting. Overhead lighting is best — it eliminates shadows. Hold your phone directly above the signature, parallel to the paper surface, and tap to focus on the ink. The goal is to get a sharp, high-contrast image of dark ink on a pure white background. Avoid taking photos at an angle, which creates a trapezoidal distortion that makes compression less efficient. Take the photo in the highest quality your phone offers — you will crop it down afterward.",
      },
      {
        heading: "The Most Important Step: Crop Tightly Around the Ink",
        body: "This step determines whether your compressed signature is sharp or blurry. When you compress a full-sheet photo of your signature down to 20KB, the compression algorithm spends most of its data budget compressing the large blank white areas around the signature — wasting precious kilobytes on empty space. The ink strokes get the least allocation and become blurry. By cropping tightly so that the signature ink fills 80–90% of the frame — leaving only a small white margin of 10–15 pixels on each side — you redirect all 20KB of your budget to preserving the actual pen strokes. Use your phone's built-in photo editor, Windows Photos, or any free crop tool. Crop to a narrow rectangle that just contains your signature ink with minimal surrounding whitespace.",
      },
      {
        heading: "Recommended Dimensions for a Signature Image",
        body: "Most government portals and university forms accept signature images in a horizontal rectangle format. The ideal dimensions for a cropped signature image are between 300×100 pixels and 500×200 pixels — wide and short, matching the natural shape of a handwritten signature. At these dimensions, a JPEG file with reasonable quality easily fits under 20KB. PPSC specifically recommends a signature image of 213×71 pixels, though dimensions in the 300×100 to 400×150 pixel range are accepted by most other portals. After cropping, check the pixel dimensions in your photo editor and resize if needed using Appliory's Image Resizer before compressing.",
      },
      {
        heading: "Compressing Your Signature to 20KB Using Appliory",
        body: "Open Appliory's Compress Image to 20KB tool at appliory.tech/tools/compress-image-to-20kb. The target size is preset to 20KB so you do not need to change any settings. Click the upload area or drag your cropped signature image into it. The tool runs multiple compression passes, progressively reducing JPEG quality until the file reaches 20KB. Because signature images are small and have high contrast between dark ink and white background, they generally compress very well — your result will typically be a sharp, clearly readable signature. Download the JPEG file and verify it looks good before uploading to the portal. All processing happens inside your browser — your signature image is never sent to any server.",
      },
      {
        heading: "What to Do If Your Signature Looks Blurry After Compression",
        body: "If your compressed signature shows blurring or ink strokes appear faded, there are a few things to try. First, check that you cropped the image tightly enough — excessive white space is the most common cause of blurry signature compression. Second, retake the original photo in better lighting — a low-light photo already has noise before compression, which amplifies after aggressive compression. Third, make sure you are using the JPEG format for output, not PNG — PNG lossless compression often cannot achieve 20KB for signature images and may produce a larger file than expected. If your signature has very fine, delicate lines, try a slightly bolder pen stroke in your original signature for better compression results.",
      },
      {
        heading: "Common Portal-Specific Signature Requirements",
        body: "Different Pakistani recruitment and admission portals have specific requirements beyond file size. PPSC requires signature images in JPEG format under 20KB, with dimensions approximately 213×71 pixels. FPSC follows similar requirements. NTS (National Testing Service) specifies JPEG under 20KB. HEC (Higher Education Commission) scholarship portals typically accept up to 50KB for signatures. For international scholarship applications like Chevening, Fulbright, and Commonwealth, check the specific portal requirements — many accept up to 100KB for signatures. Always read the portal's document requirements section before preparing your files, as requirements can change between recruitment cycles.",
      },
    ],
    faqs: [
      [
        "Should I save my signature as PNG or JPG?",
        "Most portals specify JPG or JPEG explicitly. If given a choice, JPEG is strongly preferred because it reaches smaller file sizes more reliably. A PNG signature image with the same visual quality is typically 3–5 times larger in file size than the JPEG equivalent. For a 20KB target, JPEG is almost always the correct choice.",
      ],
      [
        "What dimensions should a signature image be for PPSC?",
        "PPSC recommends approximately 213×71 pixels for signature images. However, dimensions between 300×100 and 400×150 pixels are generally accepted by most portals. The key requirements are: JPEG format, under 20KB file size, clearly readable signature, and white or light background.",
      ],
      [
        "Can I use a digital signature (typed or drawn on tablet) instead of a handwritten one?",
        "Most Pakistani government portals require a handwritten signature scanned or photographed. Digital signatures drawn with a stylus may be accepted for some university applications, but PPSC and FPSC specifically require a physically handwritten signature. When in doubt, use the handwritten approach to avoid rejection.",
      ],
      [
        "My signature has lots of loops and curves — will it compress well?",
        "Complex signatures with many loops and curves contain more image data than simple signatures, which can make it slightly harder to reach 20KB without some quality loss. The solution is to crop very tightly, ensure good lighting and contrast in the original photo, and use JPEG format for output. Most complex signatures still compress clearly to 20KB with proper preparation.",
      ],
    ],
    relatedTool: {
      label: "Compress Signature to 20KB",
      href: "/tools/compress-image-to-20kb",
    },
  },
  {
    slug: "how-to-check-image-size-and-dimensions-online",
    title: "How to Check Image Size in KB and Dimensions in Pixels Online Free",
    metaTitle: "How to Check Image Size in KB and Dimensions Online Free | Appliory",
    metaDescription:
      "Learn how to check image file size in KB and pixel dimensions online for free. Verify photo size for PPSC, FPSC, and visa portals with Appliory's instant file size checker.",
    category: "Image Tools",
    tag: "File Size · Pixels · Dimensions",
    date: "2026-11-02",
    readTime: "5 min read",
    intro:
      "Before uploading a photo to any government portal, university admission system, or visa application, you need to verify two things: the file size in kilobytes (KB) and the pixel dimensions (width × height). An image that looks correct on screen can still be rejected if it exceeds the portal's file size limit or does not meet the required pixel dimensions. This guide explains how to check both — instantly and for free — using Appliory's online tools.",
    keywords: [
      "how to check image size",
      "how to check dimensions of an image",
      "how to check pixels of an image",
      "find image size",
      "size of an image",
      "dimensions of a photo",
      "check image size in kb online",
      "how do i know how many pixels my photo is",
      "check photo size in kb",
      "image size checker online",
      "how to see size of file",
      "file size check",
      "check file size",
      "how to check the size of a file",
      "check image dimensions online",
      "pixel size checker online free",
    ],
    sections: [
      {
        heading: "What Is Image File Size and Why Does It Matter",
        body: "Image file size is measured in kilobytes (KB) or megabytes (MB) and refers to how much storage space the image occupies on a disk or device. This is different from the image's visual or print size. A 600×600 pixel JPEG photo can be anywhere from 15KB to 300KB depending on the JPEG quality setting, the complexity of the image, and whether it has been compressed before. Government job portals, scholarship portals, and visa application systems set a maximum file size for uploaded photos — typically 20KB for PPSC profile photos, 25KB for bank challans, 50KB for university admission photos, and 100KB to 500KB for visa photos. If your image exceeds the portal's limit by even 1KB, the upload will be rejected. This is why checking your image size before uploading is essential.",
      },
      {
        heading: "What Are Pixel Dimensions and Why Do They Matter",
        body: "Pixel dimensions describe the width and height of an image measured in pixels (px). For example, a 600×600 pixel image is 600 pixels wide and 600 pixels tall. Pixel dimensions determine the image's resolution and how large it will print or display. Government portals often specify exact pixel dimension requirements alongside file size limits. PPSC requires profile photos to be approximately 213×213 pixels. US visa photos must be exactly 600×600 pixels. Schengen and Pakistani passport photos follow the 35×45 mm standard, which at 300 DPI equals 413×531 pixels. Submitting a photo with incorrect pixel dimensions — even if the file size is within limit — can cause portal validation errors or lead to your application being flagged during document review.",
      },
      {
        heading: "How to Check Image File Size in KB on Windows and Mobile",
        body: "On Windows, you can right-click any image file, select Properties, and read the size under the General tab. On macOS, right-click and select Get Info. On Android, open the Files app, long-press the image, and tap Details. On iPhone, open the Photos app, tap the image, swipe up, and scroll to Information. These methods show the file size but not the pixel dimensions in a convenient format. For the fastest and most accurate way to check image file size in KB online, use Appliory's File Size Checker at appliory.tech/tools/file-size-checker. Upload your image and get the exact size in bytes, KB, and MB instantly, alongside a comparison against your target upload limit — without sending your photo to any server.",
      },
      {
        heading: "How to Check the Pixel Dimensions of an Image",
        body: "To find out how many pixels your photo is, you can use the operating system's built-in tools. On Windows, open the image in Photos, click the three-dot menu, and select File info — dimensions are shown. On macOS, open in Preview and go to Tools → Adjust Size. On Android, the native gallery often shows dimensions when you tap the image info icon. On iPhone, check the image Info by swiping up in Photos. Alternatively, use Appliory's Image Resizer at appliory.tech/tools/image-resizer — when you upload any image, it shows you the original pixel dimensions before you resize. This is the fastest way to check dimensions of an image online for free on any device without installing software.",
      },
      {
        heading: "Using Appliory's File Size Checker for Portal Validation",
        body: "Appliory's File Size Checker was built specifically for applicants preparing documents for portals with strict size limits. Here is how to use it effectively. Open the File Size Checker at appliory.tech/tools/file-size-checker. Enter your portal's maximum file size in the limit field — for example, type 20 for a 20KB limit or 0.5 for a 500KB limit if the portal specifies MB. Select all your application documents at once — photo, signature, challan, certificate scans. The tool instantly shows each file's size in KB and MB, with a clear green (within limit) or red (over limit) indicator. Download the results summary as a text file for reference. This saves you from discovering a file size problem at the last moment during submission.",
      },
      {
        heading: "What to Do if Your Image Is Too Large",
        body: "If Appliory's File Size Checker shows your image exceeds the portal's limit, the fix depends on how much over the limit it is. If your photo is 30KB but the limit is 20KB, use Appliory's Compress Image to 20KB tool — it will hit the target precisely. If your photo is 500KB and the limit is 50KB, first resize the pixel dimensions to match the required size (e.g. 600×600) using the Image Resizer, then compress. If your image is a large PNG, convert it to JPEG — PNG lossless compression cannot reach the small file sizes that JPEG achieves. The workflow is: check size → identify whether it is a pixel dimension problem or a file size problem → use the appropriate Appliory tool → re-check to confirm compliance.",
      },
    ],
    faqs: [
      [
        "How do I know how many pixels my photo is without software?",
        "Use Appliory's Image Resizer online — when you upload any image, it shows the original pixel dimensions (width × height) before you make any changes. No software installation is needed. Alternatively, right-click the image on Windows and select Properties → Details to see dimensions.",
      ],
      [
        "Why does my portal show a different file size than what Windows shows?",
        "Some portals measure file size using decimal megabytes (1 MB = 1,000,000 bytes), while Windows uses binary megabytes (1 MB = 1,048,576 bytes). This creates a small difference. For example, a 2.0 MB file by portal standards is 1.907 MB by Windows standards. Appliory shows the exact byte count so you can compare against either measurement system.",
      ],
      [
        "Can I check image size on mobile without an app?",
        "Yes. Appliory's File Size Checker works in any mobile browser — Chrome on Android or Safari on iPhone. Simply open the tool, tap the upload area, select your image from your phone's gallery, and get the instant file size in KB and MB. No app download required.",
      ],
      [
        "What is the difference between file size and image size?",
        "File size is how much disk space the image takes up (measured in KB or MB). Image size or dimensions refers to the width and height in pixels. A large-dimension image (e.g. 4000×3000 pixels) has a large file size. But you can also have a small-dimension image (e.g. 100×100 pixels) with a small file size. File size and dimensions are related but are not the same measurement.",
      ],
    ],
    relatedTool: {
      label: "File Size Checker — Free Tool",
      href: "/tools/file-size-checker",
    },
  },
  {
    slug: "ppsc-fpsc-document-requirements-complete-guide",
    title: "PPSC & FPSC Online Application Document Requirements — Complete Guide 2026",
    metaTitle: "PPSC & FPSC Document Requirements for Online Applications 2026 | Appliory",
    metaDescription:
      "Complete guide to PPSC and FPSC online application document requirements. Learn exact photo size, signature size, challan format, and file size limits for government job portals in Pakistan.",
    category: "Government Jobs",
    tag: "PPSC · FPSC · Government Jobs",
    date: "2026-11-03",
    readTime: "7 min read",
    intro:
      "Applying for a government job through PPSC (Punjab Public Service Commission) or FPSC (Federal Public Service Commission) requires preparing several digital documents to exact specifications. Many candidates are rejected or have their applications flagged simply because their photo is 22KB instead of 20KB, or their challan scan is too blurry, or their signature is in the wrong format. This complete guide covers every document requirement so you can prepare your application correctly the first time.",
    keywords: [
      "ppsc document requirements",
      "fpsc application documents",
      "ppsc photo size requirements",
      "ppsc challan compress 25kb",
      "ppsc image resize",
      "ppsc photo resizer online free",
      "ppsc picture size in kb",
      "fpsc photo size 20kb",
      "ppsc signature size online",
      "only passport size (less than 250 pixel width and height ) file are accepted",
      "ppsc photo requirements",
      "government job portal document requirements",
      "compress image for government job portal",
    ],
    sections: [
      {
        heading: "Overview of PPSC and FPSC Document Requirements",
        body: "Both PPSC and FPSC require applicants to upload several digital documents when submitting online applications. While the specific requirements can vary slightly between job advertisements, the following documents are almost always required: a recent passport-size photograph, a scanned copy of the paid bank fee challan, a digital copy of your signature, a scanned copy of your CNIC (Computerized National Identity Card), and in some cases a scanned copy of your most recent educational degree or certificate. Each of these has strict file size and format requirements that are enforced by the portal software. Understanding these requirements before you start the application process saves you from last-minute panic on the application deadline day.",
      },
      {
        heading: "PPSC Photo Requirements — Exact Specifications",
        body: "The PPSC profile photo must be a recent, clear passport-size photograph. The file must be in JPEG format (JPG extension). The file size must be under 20KB — this is the most commonly violated requirement. The pixel dimensions should be approximately 213×213 pixels, though some PPSC advertisements specify 250×250 pixels. The photo must show a full face, front view, with a plain white or light blue background. No sunglasses, hats, or other face coverings are permitted (exceptions apply for religious head coverings). The face should be centered and occupy approximately 70–80% of the frame. The image must be recent — typically within the last 6 months. If you receive the error message 'only passport size (less than 250 pixel width and height) file are accepted', it means your image pixel dimensions exceed 250×250 pixels and need to be reduced.",
      },
      {
        heading: "PPSC Challan (Bank Fee Receipt) Requirements",
        body: "The paid bank fee challan is proof that you have deposited the application fee at an authorized bank. PPSC requires the challan scan to be in JPEG format and under 25KB in file size. The image must clearly show the bank cashier's stamp or seal, the transaction reference or scroll number, the date of payment, the applicant's CNIC number, and the amount deposited. Many PPSC advertisements use the National Bank of Pakistan (NBP) or other designated banks for fee collection. After paying the fee, the bank cashier stamps your challan. Take a clear photograph of the applicant's copy (usually the smaller portion of the challan) and crop out blank margins before compressing. This is the section of the challan that PPSC reviewers check for payment verification.",
      },
      {
        heading: "Signature Requirements for PPSC and FPSC Applications",
        body: "Your digital signature must be a photograph or scan of your handwritten signature on plain white paper. The file must be in JPEG format under 20KB. The recommended dimensions are approximately 213×71 pixels — a wide, short rectangle matching the natural shape of a signature. Sign with a dark blue or black pen on clean white paper. After photographing your signature, crop the image tightly so the ink strokes fill most of the frame, leaving only a small white margin of a few pixels on each side. This is essential for compressing to 20KB while keeping the signature lines sharp and readable. Signatures that appear blurry, faded, or pixelated during the review process can flag your application for manual scrutiny.",
      },
      {
        heading: "CNIC (National Identity Card) Scan Requirements",
        body: "Most PPSC and FPSC applications require a scan or photo of both sides of your CNIC. The common requirement is JPEG format under 200KB to 500KB (this limit is more relaxed than photos and signatures). The CNIC image must be clear enough that all printed information — name, father's name, date of birth, CNIC number, and date of issue/expiry — is readable. If your CNIC scan is too large, Appliory's File Size Checker can tell you the exact current size, and the Image Compressor can reduce it to any target. For CNIC scans, do not compress aggressively — the text must remain legible. A target of 150KB to 200KB is usually safe for maintaining clarity while meeting portal limits.",
      },
      {
        heading: "Educational Certificate and Degree Requirements",
        body: "When PPSC or FPSC requires educational document uploads, the requirements are typically less strict in terms of pixel dimensions but still have file size limits. Certificates and degrees are usually acceptable as PDF files (which preserves the original document quality better than a photo) or as JPEG scans under 500KB to 2MB. For PDF documents, use Appliory's PDF Page Counter to verify the page count matches the requirement. If you have a multi-page degree transcript that must be a single PDF under 2MB, check the file size with Appliory's File Size Checker. For scanned certificates, ensure all text — university name, degree title, roll number, and date of issuance — is clearly readable.",
      },
      {
        heading: "Common PPSC Application Errors and How to Fix Them",
        body: "The most common technical errors during PPSC and FPSC online applications are entirely preventable. File size exceeded: your photo is over 20KB or challan is over 25KB — use Appliory's compression tools with the preset targets. Invalid file format: you uploaded a PNG or PDF when JPEG is required — use Appliory to export as JPEG. Image dimensions too large: your photo is 1200×1200 pixels but only up to 250×250 is accepted — use the Image Resizer to set exact pixel dimensions. Blurry challan scan: you compressed the full A4 sheet without cropping — retake the photo, crop to the challan's payment section only, then compress. Signature not accepted: your signature background is not white, or the image is too large — use a plain white paper, crop tightly, and compress with Appliory. Session timeout: applications should ideally be prepared before starting the portal form — have all documents ready in a folder before you begin filling.",
      },
    ],
    faqs: [
      [
        "What is the PPSC photo size in KB?",
        "PPSC requires the profile photograph to be in JPEG format and under 20KB in file size. The pixel dimensions should be approximately 213×213 pixels or as specified in the job advertisement. Use Appliory's Compress Image to 20KB tool to prepare your photo to this exact specification.",
      ],
      [
        "Can I submit a digital CNIC photo instead of a scanned copy?",
        "Most PPSC and FPSC portals accept a clear photograph of your CNIC taken with a mobile phone, as long as the image is sharp, all text is readable, and the file meets the size and format requirements. A flatbed scanner produces better quality, but a phone photo taken in good lighting is generally acceptable.",
      ],
      [
        "What bank can I use to pay PPSC application fee?",
        "PPSC designates specific banks for fee payment, which are listed in each job advertisement. National Bank of Pakistan (NBP) is the most commonly used bank. The challan form is downloaded from the PPSC website and deposited at the specified bank. Always check the specific job advertisement for the authorized bank and fee amount.",
      ],
      [
        "How long does it take to prepare documents for a PPSC application?",
        "With the right tools, preparing all documents takes 15–30 minutes. The process is: compress your photo to 20KB (2 minutes), compress your challan to 25KB (3–5 minutes including cropping), compress your signature to 20KB (2–3 minutes), verify all document sizes with the File Size Checker (1 minute), then start the application form with all files ready.",
      ],
      [
        "Does Appliory upload my CNIC or personal documents to any server?",
        "No. Appliory processes all files using browser-based technology — HTML5 Canvas for images and PDF.js for PDFs. Your CNIC, challan, photo, and signature never leave your device. The processing happens inside your browser's local memory, and files are cleared when you close or refresh the tab.",
      ],
    ],
    relatedTool: {
      label: "Compress Photo to 20KB for PPSC/FPSC",
      href: "/tools/compress-image-to-20kb",
    },
  },
];

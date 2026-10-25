export const faqs = [
  [
    "What exactly does Appliory check?",
    "It compares selected files with your checklist rules: missing items, allowed extensions, recognizable file signatures, size limits, PDF page counts, selectable text, image dimensions, exact duplicates, and configured name text. It does not judge document content, authenticity, signatures, eligibility, or whether an institution will accept an application.",
  ],
  [
    "Are the templates official requirements?",
    "No. Scholarship, university, and job checklists are editable starting points. Confirm every requirement on the current official application page. You can record a reference URL and last-verified date for each item.",
  ],
  [
    "Do I need to create an account?",
    "No. The complete checking and export workflow works as a guest. There is no registration. Download your checklist or report before leaving.",
  ],
  [
    "Where do my files go?",
    "They stay in your browser memory during the session. Appliory does not upload their contents. Closing or refreshing the tab clears selected files. Download anything you need before leaving.",
  ],
  [
    "What is saved when I save a report?",
    "Reports are downloaded to your own device. Appliory does not save them on a server.",
  ],
  [
    "Does no extractable text mean a PDF page is blank?",
    "No. A page may contain a scanned image or outlines of text. Appliory flags it for manual review. Open the PDF, inspect every page, and use a separate OCR tool if selectable text is required.",
  ],
  [
    "Can Appliory fix every issue?",
    "It can rename workspace copies and resize, compress, or convert supported images. Image compression is best effort and may not reach your target. PDF repairs, OCR, and content editing require another application. Originals on your device are preserved.",
  ],
  [
    "Why are two differently named files marked as duplicates?",
    "The checker hashes each file with SHA-256. Identical hashes indicate the same file bytes, even if names differ. Two visually similar files with different encodings are not necessarily exact duplicates.",
  ],
  [
    "How is readiness calculated?",
    "There is no hidden percentage. Missing required documents or failed checks on required items mean Not ready. Remaining warnings, unchecked technical rules, unmapped files, or optional-item failures mean Needs review. Otherwise the status is All configured checks passed. Optional missing items alone do not block readiness.",
  ],
  [
    "What limits should I know about?",
    "This release processes up to 40 files, 25 MB per file, and 200 MB per pack. Large PDFs may take time and consume browser memory. Unsupported formats are labeled for manual review rather than treated as verified.",
  ],
  [
    "How do I delete my data?",
    "Use Start over or refresh the page to clear selected files. Delete downloaded files from your own device when you no longer need them.",
  ],
];
export const guides = [
  {
    slug: "scholarship-document-checklist",
    title: "How to create a scholarship document checklist",
    category: "SCHOLARSHIPS",
    read: "5 min read",
    intro:
      "Build your checklist from the scholarship provider’s current instructions, then turn every document requirement into a small, verifiable rule.",
    sections: [
      [
        "Start at the source",
        "Open the provider’s official application page and any instructions inside the application portal. Note the deadline and distinguish documents needed now from those requested after shortlisting. If two official sources disagree, ask the provider before making assumptions.",
      ],
      [
        "Turn instructions into checklist items",
        "Create one item for each required document. Copy the allowed formats, maximum size, page limits, and naming instructions. Add the source URL and the date you checked it. Treat transcript, statement, reference letter, and identity entries in our template as prompts to verify, not a universal list.",
      ],
      [
        "Use concrete, testable requirements",
        "For example, if your provider asks for a PDF transcript below 2 MB, change the transcript item to PDF and 2 MB. If the provider gives no page limit, leave that field empty. Do not invent a limit just because another scholarship uses one.",
      ],
      [
        "Add files and examine the findings",
        "Map each file to the correct item. Run checks and resolve missing items, format mismatches, and size failures. A scanned transcript may need manual review if its pages have no extractable text. Check the scan visually rather than assuming it is blank.",
      ],
      [
        "Make your final human review",
        "Check names, dates, translations, signatures, completeness, and eligibility against the official instructions. Open every exported file after downloading. A successful technical check does not confirm that the scholarship application is accurate or eligible.",
      ],
    ],
    faq: "Should I always include recommendation letters? Only if the provider asks for them. Our template is a starting point, and reference requirements vary.",
    template: "scholarship",
  },
  {
    slug: "university-application-documents",
    title: "How to prepare documents for a university application",
    category: "ADMISSIONS",
    read: "5 min read",
    intro:
      "Prepare a separate checklist for each university and program. Document rules may differ even within the same institution.",
    sections: [
      [
        "Separate program requirements from general instructions",
        "Read the university admissions guidance, your chosen program’s page, and the upload portal instructions. Keep a note of the source and verification date for each rule. Check whether documents need certification, translation, or a specific issue date.",
      ],
      [
        "Organize a working folder",
        "Use a folder for each institution and application cycle. Keep originals separate from submission copies. Use neutral descriptive names such as Hassan_Transcript.pdf unless the institution requires another convention. Avoid putting unnecessary identity numbers in file names.",
      ],
      [
        "Check readability and completeness",
        "Open each PDF and look for cropped edges, missing pages, incorrect orientation, and faint scans. Make sure a multi-page transcript includes every relevant page. Appliory counts pages but cannot tell you whether the content is complete.",
      ],
      [
        "Verify portal constraints",
        "Enter accepted formats and maximum upload sizes exactly as stated. For an identity photograph, enter dimension limits only when the institution publishes them. Resizing can distort an image if the aspect ratio changes, so inspect the result before use.",
      ],
      [
        "Keep a record after submission",
        "Export your readiness report and store it alongside your submission receipt. An Appliory report records checks you ran; it is not proof of submission. The institution’s portal or confirmation email is the authoritative record.",
      ],
    ],
    faq: "Can I reuse a checklist for another university? Yes, but verify and update every rule before using it.",
    template: "university",
  },
  {
    slug: "organize-job-application-files",
    title: "How to organize files before a job application",
    category: "CAREERS",
    read: "4 min read",
    intro:
      "Keep a tailored submission copy for each job, use clear file names, and include only documents the employer requests.",
    sections: [
      [
        "Make one folder per role",
        "A simple folder such as Company_Role_Date helps keep application versions separate. Put the job description and any stated document instructions alongside your working notes. Never submit internal notes by accident.",
      ],
      [
        "Prepare a focused resume",
        "Check that the resume is the intended version and contains current contact details. Follow the employer’s format and page instructions. Appliory can check a configured page limit but does not score resume quality or predict applicant tracking system performance.",
      ],
      [
        "Name documents clearly",
        "For example, Ammar_Hassan_Resume.pdf makes the file’s purpose easy to recognize. If the employer specifies a naming convention, follow that instead. The checker’s naming rule tests whether the name contains your configured text; it does not interpret arbitrary naming patterns.",
      ],
      [
        "Remove unintended duplicates",
        "Run an exact-duplicate check and review files with similar names. A resume exported twice may have different bytes despite looking identical. Open both versions if you are unsure which one to send.",
      ],
      [
        "Check your final attachments",
        "Map each file, run checks, and open the exported pack. Confirm the role, company name, and version in the cover letter manually. Do not include identity documents or personal records unless the employer legitimately requires them.",
      ],
    ],
    faq: "Does passing Appliory mean my resume is ATS-compatible? No. The checker tests technical rules, not ranking, parsing accuracy, or employer screening decisions.",
    template: "job",
  },
  {
    slug: "check-pdf-page-count",
    title: "How to check PDF page count online",
    category: "DOCUMENT BASICS",
    read: "4 min read",
    intro:
      "Add a PDF to Appliory, map it to a checklist item, and run checks to see its real page count without uploading the document.",
    sections: [
      [
        "Set the rule you actually need",
        "Create or edit a document requirement with PDF as an accepted format. Enter a minimum or maximum number of pages only if you have a real requirement. A two-page limit means the file must contain no more than two PDF pages, not simply two pages of visible text.",
      ],
      [
        "Select the PDF in your browser",
        "Choose the file or drag it into the document area. Appliory reads its structure locally with PDF.js. The file list displays the page count if reading succeeds. A password-protected or malformed PDF may be unreadable.",
      ],
      [
        "Compare the result with your checklist",
        "Map the file and run checks. A PDF above the configured maximum gets a failed page-count check. For example, a three-page resume fails a two-page maximum even if the third page contains only a footer.",
      ],
      [
        "Review pages without selectable text",
        "These pages may contain scanned images. Appliory flags them for review rather than declaring them blank. Open the PDF in a trusted viewer and examine every page. If searchability is required, use OCR outside Appliory and recheck the exported copy.",
      ],
      [
        "Repair outside the checker when necessary",
        "This release does not remove PDF pages, compress PDFs, or unlock protected files. Use an appropriate local PDF editor, keep an original copy, and return with the corrected file. Do not remove required material merely to meet a page limit.",
      ],
    ],
    faq: "Can a PDF have pages but no extractable text? Yes. Scanned pages are a common example.",
    template: "custom",
  },
  {
    slug: "check-image-dimensions-file-size",
    title: "How to check image dimensions and file size",
    category: "DOCUMENT BASICS",
    read: "4 min read",
    intro:
      "Check both pixel dimensions and file size: they measure different things, and an application may restrict one or both.",
    sections: [
      [
        "Understand the two measurements",
        "Dimensions describe pixel width and height, such as 600 × 600 pixels. File size describes storage, such as 250 KB. A large-dimension JPEG can sometimes be smaller than a small PNG because image content and encoding affect size. Appliory uses 1 MB = 1,048,576 bytes.",
      ],
      [
        "Enter the official limits",
        "If an application specifies JPEG, a maximum of 1 MB, and a square image between 300 and 600 pixels, record those rules in your checklist. Do not assume that a passport photograph has the same requirements everywhere.",
      ],
      [
        "Inspect your selected file",
        "Add the image and map it to the appropriate item. The file list displays dimensions after decoding. Run the checks to compare them with your configured minimum and maximum width and height.",
      ],
      [
        "Resize or compress carefully",
        "Use Fix image to choose dimensions, output format, and a target size. Preview the result before applying it. Setting width and height to a new aspect ratio can stretch the image. The current editor resizes, but does not provide cropping or background removal.",
      ],
      [
        "Review quality before submitting",
        "Check your face, text, edges, and any required background manually. JPEG conversion places transparent areas on white. PNG is lossless, so a target size may not be achievable. An edited copy is added or replaces the workspace copy only after you choose Apply.",
      ],
    ],
    faq: "Will compression always make an image smaller? No. Changing encoding or dimensions can produce a larger file. Compare the before-and-after values.",
    template: "custom",
  },
  {
    slug: "find-duplicate-application-files",
    title: "How to find duplicate files before submitting an application",
    category: "DOCUMENT BASICS",
    read: "4 min read",
    intro:
      "Use file hashes to find exact duplicates, then review similar-looking versions manually before choosing what to submit.",
    sections: [
      [
        "Add the files you intend to submit",
        "Collect the relevant copies in your application workspace. Include files you suspect may be duplicates even if their names differ. This release compares only the selected files, not your entire device.",
      ],
      [
        "Run the configured checks",
        "Appliory calculates a SHA-256 hash from each file’s bytes. Two selected files with the same hash are marked with a duplicate warning. A renamed copy still has the same bytes and will be flagged.",
      ],
      [
        "Distinguish exact copies from similar versions",
        "A PDF re-exported by another program may look identical but have different metadata or encoding, so its hash differs. Appliory does not perform visual similarity checks or compare document meaning. Open suspected versions yourself.",
      ],
      [
        "Keep the right document",
        "Confirm the intended date, signature, content, and quality. Remove accidental copies, but keep intentional duplicates if the application requires separate attachments in different places. A duplicate warning invites review; it does not prove that the pack is invalid.",
      ],
      [
        "Recheck before exporting",
        "After removing or replacing a file, run checks again. ZIP export normalizes unsafe names and adds a numeric suffix to name collisions. Review the archive preview, then open the final files to confirm the pack is correct.",
      ],
    ],
    faq: "Can identical names hide different documents? Yes. Names are labels, while hashes describe the file bytes. Review name collisions even when hashes differ.",
    template: "custom",
  },
];

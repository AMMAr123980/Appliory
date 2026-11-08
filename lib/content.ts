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
    title: "Scholarship Document Checklist (2026): Complete Required Documents Guide",
    metaTitle: "[PDF Checklist] Scholarship Documents Required (2026) | Appliory",
    metaDescription:
      "Complete scholarship document checklist for 2026. Review transcripts, SOP, recommendation letters, passport photos, and file size limits before applying.",
    keywords: [
      "scholarship document checklist",
      "documents required for scholarship",
      "scholarship application checklist pdf",
      "international scholarship documents list",
      "hec scholarship document checklist",
      "chevening document checklist",
      "fulbright scholarship document checklist",
      "scholarship document requirements",
      "scholarship document verification",
      "scholarship application documents",
    ],
    category: "SCHOLARSHIPS",
    read: "6 min read",
    intro:
      "Complete scholarship document checklist for 2025–2026 international and national scholarship applications. Ensure your academic transcripts, statement of purpose, recommendation letters, passport photos, and PDF files comply with strict portal upload limits.",
    sections: [
      [
        "1. Essential Academic Transcripts and Degree Certificates",
        "Your official transcripts and graduation degrees must show all completed semesters, grades, and credit hours. If documents are in a regional language, include notarized certified English translations. Check whether attestation from the Higher Education Commission (HEC), Ministry of Foreign Affairs (MOFA), or Apostille is required before uploading.",
      ],
      [
        "2. Statement of Purpose (SOP) and Personal Motivation Letter",
        "Write a compelling, focused Statement of Purpose tailored specifically to the scholarship criteria. Ensure your statement adheres to the maximum page count (typically 1 to 2 pages). Use our PDF Page Counter to verify page constraints before uploading.",
      ],
      [
        "3. Academic and Professional Letters of Recommendation (LORs)",
        "Most prestigious scholarships (like Fulbright, Chevening, DAAD, and Commonwealth) require 2 to 3 recommendation letters from university professors or research supervisors on official institutional letterhead with active institutional email addresses and signatures.",
      ],
      [
        "4. Curriculum Vitae (CV) or Academic Resume",
        "Submit a concise 1–2 page resume formatted according to international standards (such as Europass format for European scholarships). Ensure all contact info, publications, academic honors, and voluntary experiences are up to date.",
      ],
      [
        "5. Standardized Language Proficiency and Test Scores",
        "Prepare official PDF test score reports for IELTS, TOEFL, Duolingo, GRE, or GMAT. If English was the medium of instruction during your undergraduate degree, obtain an official English Proficiency Certificate from your university registrar.",
      ],
      [
        "6. Passport-Size Photographs and Valid Passport Copy",
        "Scan your passport photo and data pages clearly. For application photos, ensure standard 600x600 px white-background dimensions and compress the image under 50KB or 20KB using Appliory’s local Image Compressor without compromising face sharpness.",
      ],
      [
        "7. Research Proposal or Study Plan (Master's and PhD Candidates)",
        "Doctoral and research-based Master's programs require an in-depth study plan outlining your proposed research methodology, literature review, and academic timeline. Keep the PDF within the program’s specified size limit (typically under 2MB).",
      ],
      [
        "8. Medical Fitness Certificate and Police Character Certificate",
        "Certain international awards (e.g. Chinese CSC Scholarship, Turkish Burslari, Korean GKS) require an official Foreigner Physical Examination Form signed by a registered physician, along with a valid Police Character Clearance Certificate.",
      ],
      [
        "9. Verify Upload Limits and File Formats Locally",
        "Scholarship portals frequently reject applications or crash during submission because uploaded files exceed strict limits (commonly 2MB per PDF or 200KB per photo). Use Appliory’s File Size Checker and Image Compressor to verify and adjust your documents in private browser memory before submitting.",
      ],
    ],
    faq: "Can I reuse the same recommendation letters and SOP for multiple scholarships? While academic transcripts and test scores remain identical, your Statement of Purpose and research proposal must always be customized for each scholarship’s specific objectives and university program.",
    faqs: [
      [
        "What are the mandatory documents required for almost all scholarships?",
        "The core mandatory documents for international scholarships are: (1) Official Academic Transcripts and Degrees, (2) Statement of Purpose / Motivation Letter, (3) 2–3 Academic Recommendation Letters, (4) Updated Academic CV, (5) Valid Passport, and (6) English Language Proficiency Test (IELTS/TOEFL) or English Medium Certificate.",
      ],
      [
        "What is the standard file size limit for scholarship application portals?",
        "Most online scholarship portals (like DAAD, Chevening, and CSC) restrict individual PDF uploads to between 2 MB and 5 MB, and passport photos between 20 KB and 50 KB. Files larger than this will fail to upload or produce silent errors.",
      ],
      [
        "Do scholarship documents need to be attested before applying?",
        "For initial online applications, most programs accept clear color scans of original degrees. However, for Chinese CSC, Turkish Burslari, and certain national awards, notarized copies or HEC/MOFA attestations are required right at the application stage. Always check your specific call for applications.",
      ],
      [
        "How can I ensure my application isn't rejected due to technical file errors?",
        "Run every file through Appliory’s free Document Checker. It verifies whether your PDF page counts match the required limit, verifies exact byte sizes against portal rules, flags unreadable scans, and ensures photographs meet required dimensions.",
      ],
    ],
    template: "scholarship",
  },
  {
    slug: "university-application-documents",
    title: "How to prepare documents for a university application",
    metaTitle: "University Application Document Checklist — Admissions Guide | Appliory",
    metaDescription:
      "Complete document checklist for university admissions: verify academic transcripts, motivation letters, translations, passport photos, and file upload limits.",
    category: "ADMISSIONS",
    read: "5 min read",
    intro:
      "Prepare a separate document checklist for each university and program. Verify admission requirements, transcripts, translations, and file sizes.",
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
    metaTitle: "How to Organize Job Application Files & Resumes | Appliory",
    metaDescription:
      "Organize job application documents professionally: verify resume page counts, format cover letters, compress signature scans, and eliminate duplicate files.",
    category: "CAREERS",
    read: "4 min read",
    intro:
      "Keep a tailored submission copy for each job role. Format your resumes, check PDF page counts, use clear file names, and include required attachments.",
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
    metaTitle: "How to Check PDF Page Count Online (Instant & Free) | Appliory",
    metaDescription:
      "Check PDF page counts and verify submission page limits across multiple documents instantly. Extract text highlights locally in your browser with zero uploads.",
    category: "DOCUMENT BASICS",
    read: "4 min read",
    intro:
      "Check PDF page counts across single or multiple files instantly in your browser. Verify document limits and extract page highlights without uploading.",
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
    metaTitle: "Check Image Dimensions & File Size Online | Appliory",
    metaDescription:
      "Verify image pixel dimensions and exact file size in KB and MB. Comply with passport photo rules, government job portal specs, and upload limits with privacy.",
    category: "DOCUMENT BASICS",
    read: "4 min read",
    intro:
      "Check both pixel dimensions and file size in KB and MB. Verify passport photo rules, job portal requirements, and application limits on your device.",
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
    metaTitle: "Find Duplicate Application Files Online (SHA-256) | Appliory",
    metaDescription:
      "Identify duplicate files and documents using cryptographic SHA-256 byte hashes. Clean your application submission pack locally with complete browser privacy.",
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

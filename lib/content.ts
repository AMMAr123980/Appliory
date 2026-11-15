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
      "hec scholarship document checklist 2026",
      "documents required for foreign scholarships",
      "hec degree attestation mofa checklist",
      "chevening document checklist",
      "fulbright scholarship document checklist",
      "csc scholarship document checklist",
      "daad scholarship required documents",
      "turkiye burslari document checklist",
      "overseas scholarship documents required hec",
      "scholarship document requirements",
      "scholarship document verification",
      "scholarship application documents",
    ],
    category: "SCHOLARSHIPS",
    read: "6 min read",
    intro:
      "Complete scholarship document checklist for 2026 international and national scholarship applications. Ensure your academic transcripts, statement of purpose, recommendation letters, passport photos, and PDF files comply with strict portal upload limits.",
    sections: [
      [
        "1. Core Document Foundations: Transcripts, Degrees & Translations",
        "Official transcripts and graduation degree certificates must show all completed semesters, courses, credit hours, and grading scales. If issued in a language other than English, provide certified official English translations alongside original copies. Check whether initial submission accepts color scans or requires official attestation (HEC/MOFA for Pakistan, Apostille for Hague convention countries) before upload.",
      ],
      [
        "2. HEC Overseas & National Scholarships (Pakistan)",
        "Official Authority: Higher Education Commission of Pakistan (Source: hec.gov.pk · Verified November 2026)\nKey Document Rules:\n• Academic Transcripts & Degrees: Must be verified by HEC before final award.\n• CNIC / NICOP and Valid Passport copy.\n• Statement of Purpose / Research Proposal: Masters/PhD proposals must align with national research priority areas.\n• Portal Limit: HEC e-portal specifies PDF file size limits (typically under 2MB to 5MB per attachment). Use Appliory's File Size Checker to verify file sizes before uploading.",
      ],
      [
        "3. Fulbright Foreign Student Program (United States)",
        "Official Authority: U.S. Department of State / USEFP (Source: foreign.fulbrightonline.org / usefp.org · Verified November 2026)\nKey Document Rules:\n• Three Letters of Reference (LORs): Submitted directly by recommenders through the online portal.\n• Personal Statement & Study Objectives: Clear essays detailing academic goals and community impact.\n• Standardized Tests: GRE and TOEFL score reports according to current cycle requirements.\n• Transcripts: Scanned official transcripts with grading keys attached.",
      ],
      [
        "4. Chevening Scholarships (United Kingdom)",
        "Official Authority: UK Foreign, Commonwealth & Development Office (Source: chevening.org · Verified November 2026)\nKey Document Rules:\n• Two References: Referees provide letters in letterhead format.\n• Valid Passport / National Identity Document.\n• Three Eligible UK Master's Course Offers: Unconditional offer proof uploaded according to timeline.\n• Education Documents: Degree certificates and academic transcripts in PDF format under 5MB.",
      ],
      [
        "5. Erasmus Mundus Joint Masters (European Union)",
        "Official Authority: European Commission (Source: erasmus-plus.ec.europa.eu · Verified November 2026)\nKey Document Rules:\n• Europass Standard CV: Standardized formatting detailing academic and research background.\n• Motivation Letter / SOP: Tailored to specific consortium university partners.\n• Recommendation Letters: 2 academic or professional letters on institutional letterhead.\n• Consortium Upload Limits: Varies by program consortium; individual PDFs are generally capped between 2MB and 5MB.",
      ],
      [
        "6. DAAD Development-Related Postgraduate Courses (Germany)",
        "Official Authority: German Academic Exchange Service (Source: daad.de · Verified November 2026)\nKey Document Rules:\n• DAAD Application Form: Hand-signed by the applicant.\n• Europass CV: Hand-signed, chronological CV.\n• Letter of Motivation: Maximum 2 pages with personal signature.\n• Current Recommendation Letter: From university professor or current employer with official seal and signature.\n• Professional Work Experience Proof: Minimum 2 years professional experience certificates for EPOS grants.",
      ],
      [
        "7. Commonwealth Scholarships (United Kingdom)",
        "Official Authority: Commonwealth Scholarship Commission (Source: cscuk.fcdo.gov.uk · Verified November 2026)\nKey Document Rules:\n• Proof of Citizenship / Refugee Status: Valid passport or official identity card.\n• Full Academic Transcripts: Including up-to-date transcripts for ongoing study.\n• Two Confidential References: Submitted directly to the online portal by designated referees.\n• Development Impact Statement: Detailed narrative across four sections showing home country impact.",
      ],
      [
        "8. Application Photograph Guidelines by Destination",
        "Photograph requirements are determined by the specific host country or portal rather than a universal scholarship rule:\n• US Programs (Fulbright): Digital photos must meet U.S. visa standards (square 600×600 to 1200×1200 px, max 240KB).\n• UK Programs (Chevening, Commonwealth): Physical 35×45mm or digital portrait per host portal specs.\n• European Programs (DAAD, Erasmus): Standard 35×45mm passport dimensions or square portrait.\n• Web Upload Optimization: If a portal enforces a 50KB or 100KB ceiling, compress with Appliory's Image Compressor to ensure quick upload without losing facial clarity.",
      ],
      [
        "9. Pre-Submission Technical Verification Checklist",
        "Before finalizing your submission on any scholarship portal:\n• Verify exact byte sizes against the portal ceiling (e.g. 2MB or 5MB per document) using Appliory File Size Checker.\n• Check PDF page ranges for Statement of Purpose and CV using Appliory PDF Page Counter.\n• Ensure scanned documents have selectable text or clear visual readability at 100% zoom.",
      ],
    ],
    faq: "Can I reuse the same recommendation letters and SOP for multiple scholarships? While academic transcripts and test scores remain identical, your Statement of Purpose and research proposal must always be customized for each scholarship’s specific objectives and university program.",
    faqs: [
      [
        "What are the typical documents required across major scholarship programs?",
        "While specific rules vary by program, common core requirements include: official academic transcripts with grading scales, certified translations (if non-English), a Statement of Purpose or Study Plan, 2 to 3 institutional recommendation letters, an updated CV (often Europass format for Europe), and a valid passport copy.",
      ],
      [
        "Do all scholarship portals restrict PDF file sizes to 2MB?",
        "No. File size limits vary significantly by platform: DAAD, Chevening, and CSC portals typically accommodate PDFs between 2 MB and 5 MB per attachment, while some regional or university portals set tighter 1 MB or 2 MB limits. Always verify the upload ceiling on your active submission page.",
      ],
      [
        "Do scholarship documents need to be attested before applying?",
        "Initial online applications often accept clear color scans of original degrees. However, programs like HEC, Turkish Burslari, and Chinese CSC may require certified, notarized, or officially attested copies at the application stage. Check the specific official call for applications.",
      ],
      [
        "How do I verify that my scholarship documents meet portal limits?",
        "Use Appliory's client-side tools: verify PDF page limits with the PDF Page Counter, check attachment byte sizes with the File Size Checker, and compress application photos using the Image Compressor. All processing executes locally in your browser with zero server uploads.",
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

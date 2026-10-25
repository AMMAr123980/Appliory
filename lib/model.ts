export type Rule = {
  id: string;
  name: string;
  description: string;
  required: boolean;
  extensions: string;
  mimes: string;
  maxMB: number;
  minPages?: number;
  maxPages?: number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  filename?: string;
  reference?: string;
  verified?: string;
  notes?: string;
};
export type Template = {
  slug: string;
  title: string;
  category: string;
  description: string;
  items: Rule[];
};
export type Finding = {
  fileId?: string;
  fileName?: string;
  status: "pass" | "warning" | "failed" | "review" | "missing" | "unchecked";
  check: string;
  message: string;
  action: string;
};
export type DocumentMeta = {
  id: string;
  name: string;
  size: number;
  type: string;
  detected: string;
  hash: string;
  pages?: number;
  textPages?: number;
  width?: number;
  height?: number;
  error?: string;
};
export type LocalDocument = DocumentMeta & {
  file: File;
  original: File;
  ruleId: string;
};
export type AuditRow = {
  rule: Rule;
  files: DocumentMeta[];
  findings: Finding[];
};
export type Report = {
  title: string;
  timestamp: string;
  rows: AuditRow[];
  unmapped: DocumentMeta[];
  status: string;
  completed: number;
  missing: number;
  failed: number;
  warnings: number;
  review: number;
};
const rule = (
  id: string,
  name: string,
  description: string,
  extra: Partial<Rule> = {},
): Rule => ({
  id,
  name,
  description,
  required: true,
  extensions: "pdf",
  mimes: "application/pdf",
  maxMB: 5,
  ...extra,
});
export const templates: Template[] = [
  {
    slug: "scholarship",
    title: "Scholarship application",
    category: "Scholarships",
    description:
      "Bring your academic story together, from transcripts to your statement of purpose.",
    items: [
      rule(
        "transcript",
        "Academic transcript",
        "A readable record of your academic results.",
      ),
      rule(
        "statement",
        "Personal statement",
        "Your goals, motivation, and fit for the scholarship.",
        { maxPages: 3 },
      ),
      rule(
        "recommendation",
        "Recommendation letter",
        "A reference from a teacher or professional.",
      ),
      rule(
        "identity",
        "Identity document",
        "Check which identity document the provider accepts.",
      ),
      rule(
        "cv",
        "Curriculum vitae",
        "Your education, experience, and achievements.",
        { required: false, maxPages: 2 },
      ),
      rule("photo", "Passport photograph", "A clear photograph if requested.", {
        required: false,
        extensions: "jpg,jpeg,png",
        mimes: "image/jpeg,image/png",
        maxMB: 2,
        minWidth: 300,
        minHeight: 300,
      }),
    ],
  },
  {
    slug: "university",
    title: "University admission",
    category: "Admissions",
    description: "A clear starting point for your next chapter in education.",
    items: [
      rule(
        "transcript",
        "Academic transcript",
        "Academic results requested by your institution.",
      ),
      rule(
        "statement",
        "Statement of purpose",
        "Explain your academic interests and goals.",
      ),
      rule(
        "identity",
        "Identity document",
        "Verify the institution’s identity requirements.",
      ),
      rule(
        "language",
        "Language certificate",
        "Add language results only if required.",
        { required: false },
      ),
      rule(
        "recommendation",
        "Recommendation letter",
        "Verify the number of references required.",
        { required: false },
      ),
    ],
  },
  {
    slug: "job",
    title: "Job application",
    category: "Careers",
    description:
      "Put your experience forward with a tidy, submission-ready document pack.",
    items: [
      rule(
        "cv",
        "Resume / CV",
        "Your relevant skills, experience, and education.",
        { maxPages: 2 },
      ),
      rule("cover", "Cover letter", "A tailored introduction for this role.", {
        required: false,
        maxPages: 1,
      }),
      rule("portfolio", "Portfolio", "Relevant samples of your work.", {
        required: false,
      }),
      rule(
        "certificates",
        "Certificates",
        "Qualifications requested by the employer.",
        { required: false },
      ),
    ],
  },
];
export const uid = () =>
  typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : Array.from(crypto.getRandomValues(new Uint8Array(16)), (n) =>
        n.toString(16).padStart(2, "0"),
      ).join("");
export const newRule = (): Rule => rule(uid(), "Untitled document", "");

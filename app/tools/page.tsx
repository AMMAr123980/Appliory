import Link from "next/link";
import {
  ArrowUpRight,
  FileText,
  ImageIcon,
  Files,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Globe,
  Table,
} from "lucide-react";
import { tools } from "@/lib/tool-catalog";
import { absolute, breadcrumb, pageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/appliory/structured-data";

export const metadata = pageMetadata(
  "Free Online PDF, Image & Document Tools",
  "Explore free in-browser tools for image compression, passport photos, PDF-to-Excel, page counting, file-size checks and application document preparation.",
  "/tools",
  [
    "free online tools",
    "image compressor online",
    "pdf page counter",
    "file size checker",
    "private tools",
    "passport photo resizer",
    "online document tools",
    "resize image online free",
    "compress photo online free",
    "document preparation tools",
    "ppsc document tools online",
    "fpsc photo compressor online",
    "online tools for government job application",
    "online tools for scholarship application",
    "passport size photo maker online free",
    "compress image to 20kb free",
    "compress image to 50kb free",
    "pdf to excel converter online free",
    "check file size online",
    "resize photo for visa online free",
    "image tools no upload private",
  ],
);

export default function Page() {
  return (
    <main className="wrap tools-page">
      <StructuredData
        data={breadcrumb([
          ["Home", "/"],
          ["Tools", "/tools"],
        ])}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Appliory Free Online Document Tools",
          description:
            "Collection of private, in-browser document and image processing tools.",
          numberOfItems: tools.length,
          itemListElement: tools.map((t, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: t.name,
            url: absolute("/tools/" + t.slug),
            description: t.description,
          })),
        }}
      />
      <header className="section-heading">
        <div>
          <span className="eyebrow">BROWSER-BASED UTILITIES</span>
          <h1>Free Online Tools for Application Documents</h1>
          <p>Choose from free tools to compress images, check file sizes, convert PDFs and prepare application documents privately in your browser. Usage limits vary by tool — check each tool&apos;s file-size, file-count and batch limits before processing.</p>
        </div>
        <span className="privacy-inline">
          <ShieldCheck size={17} /> Files stay on your device
        </span>
      </header>
      <section className="article" style={{ maxWidth: 820, margin: "0 auto 2.5rem", padding: "0 24px" }}>
        <p>
          Appliory offers a growing collection of free, browser-based tools built for one purpose: helping you prepare
          documents and images for online applications — faster and without sending your files to any server. Whether
          you&apos;re applying for a job, a scholarship, a visa, a government portal, or a university admission, the
          documents you submit need to meet strict size, dimension, format, and quality requirements. Failing to meet
          them can get your application rejected before it&apos;s even reviewed.
        </p>
        <p>
          Appliory processes your files locally in your browser without uploading their contents to our document-processing servers. Each tool has specific file-size, format and batch limits. Please check the individual tool specifications before selecting your documents.
        </p>
        <p>
          Our tools are especially useful for Pakistani applicants preparing documents for PPSC, FPSC, NTS, NADRA,
          HEC, provincial scholarship portals, and overseas universities. Each tool page includes a step-by-step guide,
          the most common requirements for popular portals, and answers to frequently asked questions.
        </p>
      </section>

      {/* Topic Clusters for Targeted Search Intent */}
      <section style={{ maxWidth: 1040, margin: "0 auto 3rem", padding: "0 16px" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "1rem", color: "var(--ink)" }}>
          Browse Tools by Solution Cluster
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "16px" }}>
          {/* Cluster 1: Recruitment (Pakistan) */}
          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 10, padding: "18px 20px" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              <Briefcase size={14} /> Recruitment (Pakistan)
            </span>
            <h3 style={{ fontSize: "1rem", margin: "8px 0 6px" }}>PPSC, FPSC &amp; NTS Jobs</h3>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5, margin: "0 0 12px" }}>
              Dedicated compression presets for photos, signatures, and identity scans.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
              <Link href="/tools/compress-image-to-20kb" className="text-link" style={{ fontWeight: 550 }}>
                Compress Image to 20KB <ArrowUpRight size={13} />
              </Link>
              <Link href="/tools/image-resizer" className="text-link">
                Image Resizer (Custom Pixels) <ArrowUpRight size={13} />
              </Link>
              <Link href="/tools/file-size-checker" className="text-link">
                File Size Limit Checker <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>

          {/* Cluster 2: Visas & Passport Photos (International) */}
          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 10, padding: "18px 20px" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              <Globe size={14} /> Visa &amp; Passport (Global)
            </span>
            <h3 style={{ fontSize: "1rem", margin: "8px 0 6px" }}>US, UK &amp; Schengen Visas</h3>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5, margin: "0 0 12px" }}>
              Calibrated dimensions for US DS-160, DV Lottery, UK Digital, and 35×45mm prints.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
              <Link href="/tools/passport-photo-maker" className="text-link" style={{ fontWeight: 550 }}>
                Passport Photo Maker &amp; Resizer <ArrowUpRight size={13} />
              </Link>
              <Link href="/tools/image-compressor" className="text-link">
                Online Image Compressor <ArrowUpRight size={13} />
              </Link>
              <Link href="/tools/image-resizer" className="text-link">
                600×600 &amp; 35×45mm Resizer <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>

          {/* Cluster 3: Scholarships & Higher Education */}
          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 10, padding: "18px 20px" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              <GraduationCap size={14} /> Scholarships &amp; Admissions
            </span>
            <h3 style={{ fontSize: "1rem", margin: "8px 0 6px" }}>HEC, Fulbright &amp; Erasmus</h3>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5, margin: "0 0 12px" }}>
              Prepare university portraits, check application page caps, and audit requirements.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
              <Link href="/tools/compress-image-to-50kb" className="text-link" style={{ fontWeight: 550 }}>
                Compress Image to 50KB <ArrowUpRight size={13} />
              </Link>
              <Link href="/tools/pdf-page-counter" className="text-link">
                PDF Page Counter &amp; Summary <ArrowUpRight size={13} />
              </Link>
              <Link href="/guides/scholarship-document-checklist" className="text-link">
                Scholarship Document Checklist <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>

          {/* Cluster 4: Document & Spreadsheet Productivity */}
          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 10, padding: "18px 20px" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              <Table size={14} /> Document Productivity
            </span>
            <h3 style={{ fontSize: "1rem", margin: "8px 0 6px" }}>PDF Tables &amp; File Integrity</h3>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5, margin: "0 0 12px" }}>
              Extract payroll tables to Excel and verify file uniqueness with zero uploads.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
              <Link href="/tools/pdf-to-excel" className="text-link" style={{ fontWeight: 550 }}>
                PDF to Excel Converter (.xlsx) <ArrowUpRight size={13} />
              </Link>
              <Link href="/tools/duplicate-file-finder" className="text-link">
                Duplicate File Finder (SHA-256) <ArrowUpRight size={13} />
              </Link>
              <Link href="/tools/file-size-checker" className="text-link">
                Check File Size (KB &amp; MB) <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="section-heading" style={{ maxWidth: 1040, margin: "0 auto 1.5rem", padding: "0 16px" }}>
        <div>
          <span className="eyebrow">ALL TOOLS</span>
          <h2 style={{ fontSize: "1.25rem", margin: "4px 0" }}>Complete Document &amp; Image Suite</h2>
        </div>
      </div>
      <div className="quick-tools-grid">
        {tools.map((t) => (
          <Link
            key={t.slug}
            href={"/tools/" + t.slug}
            className="quick-tool-card"
          >
            <span className={"tool-icon " + t.category.toLowerCase()}>
              {t.category === "PDF" ? (
                <FileText />
              ) : t.category === "IMAGES" ? (
                <ImageIcon />
              ) : (
                <Files />
              )}
            </span>
            <small>{t.category}</small>
            <h2>{t.name}</h2>
            <p>{t.description}</p>
            <span className="text-link">
              {t.action}
              <ArrowUpRight size={17} />
            </span>
          </Link>
        ))}
      </div>
      <div className="workflow-callout">
        <div>
          <h2>Checking an entire application?</h2>
          <p>Build your requirements and check all your documents together.</p>
        </div>
        <Link href="/tool" className="button dark">
          Open document checker <ArrowUpRight size={17} />
        </Link>
      </div>
    </main>
  );
}

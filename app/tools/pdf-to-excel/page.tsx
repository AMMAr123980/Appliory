import Link from "next/link";
import { absolute, breadcrumb, pageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/appliory/structured-data";
import { ShareBar } from "@/components/appliory/share-bar";
import { PDFToExcelConverter } from "@/components/appliory/pdf-to-excel/converter";
import { tools } from "@/lib/tool-catalog";

export const metadata = pageMetadata(
  "Convert PDF to Excel Free & Private (Clean Tables to XLSX) | Appliory",
  "Convert PDF tables into editable Excel (.xlsx) and CSV spreadsheets locally in your browser. Clean payroll reports, fill down IDs, remove repeated headers with 100% privacy.",
  "/tools/pdf-to-excel",
  [
    "pdf to excel converter",
    "convert pdf to xlsx free",
    "extract pdf tables to excel",
    "pdf to excel private no upload",
    "pdf table to csv",
    "convert payroll pdf to excel",
    "clean pdf tables",
    "in browser pdf to excel",
  ],
);

const faqs: [string, string][] = [
  [
    "Are my confidential payroll or financial documents uploaded to any server?",
    "No. Appliory operates with a strict 100% in-browser architecture. All text parsing, table boundary detection, coordinate clustering, and Excel file assembly occur locally inside your browser via Web APIs and PDF.js. Your document data never leaves your computer.",
  ],
  [
    "How does the Fill Down cleanup feature work?",
    "In many multi-line payroll statements and ERP reports, the Employee ID, Name, or Department is only printed on the first row of an employee block. The Fill Down feature propagates that value down across all sub-rows with a single click, preparing your data for Excel pivot tables and lookups.",
  ],
  [
    "How does Appliory prevent Excel from removing leading zeros (e.g., 00142)?",
    "When generating the OpenXML (.xlsx) file, Appliory writes identification numbers and code columns using the inline string format (`t=\"inlineStr\"`) instead of standard numeric cells. This ensures Excel preserves codes like `00142` without stripping the leading zeros.",
  ],
  [
    "Can it convert scanned PDFs or photographs of paper tables?",
    "Appliory inspects each PDF page for selectable text glyphs. Scanned document pages that contain only flattened bitmap images without an embedded text layer cannot be extracted without an OCR engine and will be flagged automatically.",
  ],
  [
    "Is formula injection protection enabled on exported spreadsheets?",
    "Yes. Any cell values that begin with risky formula triggers (`=`, `+`, `-`, `@`) are sanitized and escaped with a leading quote so opening the resulting Excel or CSV file in Microsoft Excel or Google Sheets cannot execute unintended commands.",
  ],
];

export default function PDFToExcelPage() {
  const currentSlug = "pdf-to-excel";

  return (
    <main className="wrap single-tool-page">
      <StructuredData
        data={breadcrumb([
          ["Home", "/"],
          ["Tools", "/tools"],
          ["PDF to Excel converter", "/tools/pdf-to-excel"],
        ])}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Appliory PDF to Excel Converter",
          url: absolute("/tools/pdf-to-excel"),
          description:
            "Convert PDF tables into editable Excel (.xlsx) and CSV spreadsheets locally in your browser. Clean payroll reports, fill down IDs, remove repeated headers with 100% privacy.",
          applicationCategory: "BusinessApplication",
          operatingSystem: "All (Web Browser)",
          browserRequirements:
            "Requires modern browser with JavaScript and File API support",
          isAccessibleForFree: true,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          featureList: [
            "100% client-side PDF table extraction",
            "Fill-down empty cells for grouped rows",
            "Automatic repeated header removal",
            "OpenXML .xlsx generator with leading zero protection",
            "RFC 4180 CSV export with UTF-8 BOM",
          ],
          publisher: { "@id": absolute("/#organization") },
        }}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to Convert PDF Tables to Excel with Intelligent Cleanup",
          description:
            "Step-by-step instructions to extract PDF tabular data into clean, editable Microsoft Excel (.xlsx) and CSV spreadsheets completely in your browser.",
          step: [
            {
              "@type": "HowToStep",
              position: 1,
              name: "Select Your PDF File",
              text: "Choose or drag-and-drop any text-based PDF containing tables, financial reports, or payroll records into the drop zone.",
            },
            {
              "@type": "HowToStep",
              position: 2,
              name: "Configure Table Extraction Settings",
              text: "Select All Pages or enter a custom page range, adjust alignment tolerances if needed, and run the extraction engine.",
            },
            {
              "@type": "HowToStep",
              position: 3,
              name: "Intelligently Clean Extracted Data",
              text: "Use Fill Down to propagate employee IDs, remove duplicate page headers, clean blank rows, or edit cells directly.",
            },
            {
              "@type": "HowToStep",
              position: 4,
              name: "Export to Excel (.xlsx) or CSV",
              text: "Click Export to Excel (.xlsx) or Export to CSV to download your structured, ready-to-use spreadsheet instantly.",
            },
          ],
        }}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map(([q, a]) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: {
              "@type": "Answer",
              text: a,
            },
          })),
        }}
      />

      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link> / <Link href="/tools">Tools</Link> /{" "}
        <span>PDF to Excel converter</span>
      </nav>

      <header className="tool-intro" style={{ marginBottom: 32 }}>
        <span className="eyebrow">100% LOCAL · PRIVACY-FIRST · ZERO CLOUD UPLOADS</span>
        <h1>Free Online PDF to Excel Converter</h1>
        <p>
          Convert PDF tables into editable Excel (.xlsx) and CSV spreadsheets with intelligent table cleanup. 100% private in-browser processing with zero server uploads.
        </p>
      </header>

      {/* Main Interactive Tool Workspace */}
      <section style={{ marginBottom: 48 }}>
        <PDFToExcelConverter />
      </section>

      {/* Features Overview */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 24, fontWeight: 650, marginBottom: 20 }}>Why Use Appliory for PDF to Excel Conversion?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 8, padding: 22 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--accent)", marginBottom: 8 }}>🔒 100% Private (No Uploads)</h3>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "#55645a", margin: 0 }}>
              Your confidential payroll reports, employee salaries, and bank records never leave your machine. Processing runs entirely inside your browser memory.
            </p>
          </div>
          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 8, padding: 22 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--accent)", marginBottom: 8 }}>🧹 Intelligent Table Cleanup</h3>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "#55645a", margin: 0 }}>
              Fix messy PDF tables instantly: use <strong>Fill Down</strong> to propagate parent Employee IDs, eliminate repeated page headers, and delete blank rows.
            </p>
          </div>
          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 8, padding: 22 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--accent)", marginBottom: 8 }}>🔢 Leading Zero Preservation</h3>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "#55645a", margin: 0 }}>
              Employee IDs, postal codes, and bank account numbers like <code>00142</code> stay intact. We export identifier columns as inline text so Excel won't strip zeros.
            </p>
          </div>
          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 8, padding: 22 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--accent)", marginBottom: 8 }}>📊 Dual View Extraction</h3>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "#55645a", margin: 0 }}>
              Parse complex case notes and narrative documents into both a <strong>Master Summary</strong> table and an <strong>Itemized Pay Lines</strong> ledger with a single click.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison: Local Processing vs Generic Cloud Converters */}
      <section style={{ marginBottom: 48, background: "#f5f7f3", border: "1px solid var(--line)", borderRadius: 9, padding: 28 }}>
        <h2 style={{ fontSize: 22, fontWeight: 650, marginBottom: 12 }}>Local In-Browser vs. Cloud Converters</h2>
        <p style={{ fontSize: 13, color: "#55645a", marginBottom: 20 }}>
          Unlike common online converters that upload your PDFs to third-party cloud servers, Appliory parses PDFs locally on your device using WebAssembly and Web Workers.
        </p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #ccd8c7" }}>
                <th style={{ padding: "10px 14px", fontWeight: 600 }}>Feature</th>
                <th style={{ padding: "10px 14px", fontWeight: 600, color: "var(--accent)" }}>Appliory PDF to Excel</th>
                <th style={{ padding: "10px 14px", fontWeight: 600, color: "#8c564b" }}>Standard Cloud Converters</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #e1e7dc" }}>
                <td style={{ padding: "10px 14px", fontWeight: 550 }}>Data Confidentiality</td>
                <td style={{ padding: "10px 14px", color: "var(--accent)" }}>✅ 100% Private (0 bytes sent to servers)</td>
                <td style={{ padding: "10px 14px", color: "#666" }}>❌ Uploaded to remote third-party servers</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e1e7dc" }}>
                <td style={{ padding: "10px 14px", fontWeight: 550 }}>Table Cleanup Tools</td>
                <td style={{ padding: "10px 14px", color: "var(--accent)" }}>✅ Fill Down, Header Clean, Cell Editing</td>
                <td style={{ padding: "10px 14px", color: "#666" }}>❌ Raw, messy table dump only</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e1e7dc" }}>
                <td style={{ padding: "10px 14px", fontWeight: 550 }}>Leading Zeros (e.g. 0012)</td>
                <td style={{ padding: "10px 14px", color: "var(--accent)" }}>✅ Protected as inline string values</td>
                <td style={{ padding: "10px 14px", color: "#666" }}>❌ Stripped to 12 automatically by Excel</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e1e7dc" }}>
                <td style={{ padding: "10px 14px", fontWeight: 550 }}>File Limits & Paywalls</td>
                <td style={{ padding: "10px 14px", color: "var(--accent)" }}>✅ Unlimited free use, no registration</td>
                <td style={{ padding: "10px 14px", color: "#666" }}>❌ Daily limits, subscriptions, and queues</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Explainer and FAQ Section */}
      <section className="tool-explainer">
        <div>
          <h2>How to Convert PDF Tables to Excel (Step-by-Step)</h2>
          <p className="direct-answer">
            Upload your PDF document containing tabular data or payroll reports. Appliory analyzes text coordinates directly in your browser, aligns rows and columns, allows you to clean missing or repeated values, and exports clean Excel (.xlsx) or CSV files without uploading files to any external server.
          </p>
          <ol>
            <li><strong>Select PDF File:</strong> Choose any text-based PDF containing tables, statements, or payroll records from your computer or phone.</li>
            <li><strong>Configure Settings:</strong> Select custom page ranges or let our engine auto-detect columns based on geometric alignment.</li>
            <li><strong>Review & Clean Data:</strong> Click Fill Down on employee ID columns, eliminate repeated page headers, and edit any cells.</li>
            <li><strong>Export Your Spreadsheet:</strong> Download your finished spreadsheet as an OpenXML Excel (.xlsx) file or clean RFC 4180 CSV.</li>
          </ol>
          <p>
            Designed for privacy-sensitive data like financial statements, pay slips, and roster sheets. Files are never transmitted over the internet or stored in the cloud.
          </p>
        </div>
        <aside>
          <h2>Frequently Asked Questions</h2>
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </aside>
      </section>

      <ShareBar
        title="Appliory PDF to Excel Converter"
        description="Convert PDF tables into editable Excel (.xlsx) and CSV spreadsheets locally in your browser with 100% privacy."
        url={absolute("/tools/pdf-to-excel")}
      />

      <section className="related-tools">
        <h2>Explore More Free Document Tools</h2>
        <div>
          {tools
            .filter((x) => x.slug !== currentSlug)
            .slice(0, 6)
            .map((x) => (
              <Link className="button" key={x.slug} href={"/tools/" + x.slug}>
                {x.name}
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}

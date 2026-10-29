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
        <span className="eyebrow">100% LOCAL · PRIVACY-FIRST · IN-BROWSER</span>
        <h1>PDF to Excel Converter</h1>
        <p>
          Convert PDF tables into editable spreadsheets, clean extracted data, and export your results. Designed with privacy-conscious processing.
        </p>
      </header>

      {/* Main Interactive Tool Workspace */}
      <section style={{ marginBottom: 48 }}>
        <PDFToExcelConverter />
      </section>

      {/* Explainer and FAQ Section */}
      <section className="tool-explainer">
        <div>
          <h2>How to convert PDF tables to Excel</h2>
          <p className="direct-answer">
            Upload your PDF document containing tabular data or payroll reports. Appliory analyzes text coordinates directly in your browser, aligns rows and columns, allows you to clean missing or repeated values, and exports clean Excel (.xlsx) or CSV files without uploading files to any external server.
          </p>
          <ol>
            <li>Select a PDF file with tables, statements, or payroll reports from your device.</li>
            <li>Configure page range and alignment tolerance, then start table extraction.</li>
            <li>Clean up extracted data using Fill Down, header removal, or cell editing.</li>
            <li>Export your finalized spreadsheet directly to Excel (.xlsx) or CSV format.</li>
          </ol>
          <p>
            Designed for privacy-sensitive data like financial statements, pay slips, and roster sheets. Files are never transmitted over the internet or stored in the cloud.
          </p>
        </div>
        <aside>
          <h2>Common questions</h2>
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
        <h2>Keep working on your documents</h2>
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

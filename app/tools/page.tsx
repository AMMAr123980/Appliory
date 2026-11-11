import Link from "next/link";
import {
  ArrowUpRight,
  FileText,
  ImageIcon,
  Files,
  ShieldCheck,
} from "lucide-react";
import { tools } from "@/lib/tool-catalog";
import { absolute, breadcrumb, pageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/appliory/structured-data";

export const metadata = pageMetadata(
  "Free Online Document & Image Tools (100% Private) | Appliory",
  "Count PDF pages, check file sizes, resize and compress images to KB, and convert tables to Excel. 100% free, browser-based utilities with zero server uploads.",
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
          <span className="eyebrow">SMALL TASKS. SIMPLE TOOLS.</span>
          <h1>What would you like to do?</h1>
          <p>Choose a tool. Add your files. Leave with a useful result.</p>
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
          Every tool on this page works entirely in your browser using local web APIs. That means your photos, PDFs, and
          personal documents never leave your device. There is no login required, no file upload to a cloud server, and
          no usage limit beyond your browser&apos;s memory. You can compress a photo to under 20 KB, resize a passport
          image to the exact pixel dimensions required by NADRA, PPSC, or the US embassy, count pages in a PDF, convert
          a PDF table to Excel, or check whether a file meets size requirements — all in seconds, all for free.
        </p>
        <p>
          Our tools are especially useful for Pakistani applicants preparing documents for PPSC, FPSC, NTS, NADRA,
          HEC, provincial scholarship portals, and overseas universities. Each tool page includes a step-by-step guide,
          the most common requirements for popular portals, and answers to frequently asked questions.
        </p>
      </section>
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

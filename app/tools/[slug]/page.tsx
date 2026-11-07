import Link from "next/link";
import { notFound } from "next/navigation";
import { tools } from "@/lib/tool-catalog";
import { absolute, breadcrumb, pageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/appliory/structured-data";
import QuickTool from "@/components/appliory/quick-tool";
import { ShareBar } from "@/components/appliory/share-bar";
import { PDFToExcelConverter } from "@/components/appliory/pdf-to-excel/converter";
import { blogPosts } from "@/lib/blog";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = tools.find((t) => t.slug === slug);
  return t
    ? pageMetadata(
        t.metaTitle,
        t.metaDescription,
        "/tools/" + slug,
        [...t.keywords],
      )
    : { title: "Tool not found", robots: { index: false } };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = tools.find((t) => t.slug === slug);
  if (!t) notFound();
  return (
    <main className="wrap single-tool-page">
      <StructuredData
        data={breadcrumb([
          ["Home", "/"],
          ["Tools", "/tools"],
          [t.name, "/tools/" + slug],
        ])}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: `How to Use ${t.name}`,
          description: t.description,
          step: t.steps.map((s, idx) => ({
            "@type": "HowToStep",
            position: idx + 1,
            name: `Step ${idx + 1}`,
            text: s,
          })),
        }}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Appliory " + t.name,
          url: absolute("/tools/" + slug),
          description: t.description,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "All (Web Browser)",
          browserRequirements:
            "Requires JavaScript, File API and Canvas support",
          isAccessibleForFree: true,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          featureList: [t.answer],
          publisher: { "@id": absolute("/#organization") },
        }}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: t.questions.map(([q, a]) => ({
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
        <span>{t.name}</span>
      </nav>
      <header className="tool-intro">
        <span className="eyebrow">FREE · NO LOGIN · ON YOUR DEVICE</span>
        <h1>{(t as { h1?: string }).h1 || t.name}</h1>
        <p>{t.description}</p>
      </header>

      {/* Pre-Upload Expected Output & Readiness Box */}
      <div className="sample-result-box" style={{ maxWidth: 920, margin: "0 auto 24px" }}>
        <div className="sample-meta">
          <div className="sample-step">
            <small>Accepted Input Format</small>
            <b>{t.accepts ? t.accepts.replace(/,/g, ", ") : "Any file"} (Max 25 MB)</b>
          </div>
          <div className="sample-arrow">➔</div>
          <div className="sample-step">
            <small>Target Output Specification</small>
            <b>
              {t.slug === "compress-image-to-20kb"
                ? "Under 20KB JPEG (Sharp Face & Details)"
                : t.slug === "compress-image-to-50kb"
                  ? "Under 50KB JPEG (High Clarity)"
                  : t.slug === "passport-photo-maker"
                    ? "Official 2×2 Inch or 35×45mm Format"
                    : t.slug === "pdf-to-excel"
                      ? "Clean Excel (.xlsx) / CSV Spreadsheet"
                      : "Verified & Compliant Result"}
            </b>
          </div>
        </div>
        <div className="sample-status">
          ✓ Verified for Portal Uploads
        </div>
      </div>

      {t.slug === "pdf-to-excel" ? (
        <section style={{ marginBottom: 48 }}>
          <PDFToExcelConverter />
        </section>
      ) : (
        <QuickTool slug={t.slug} />
      )}

      {/* How to Verify Our Privacy Claim in Browser */}
      <details className="privacy-verify-callout" style={{ maxWidth: 920, margin: "24px auto 0" }}>
        <summary>
          <ShieldCheck size={18} color="var(--accent)" />
          How to verify our 100% in-browser privacy claim yourself
        </summary>
        <div className="privacy-verify-content">
          <p>
            Verify that your files never touch any external server:
          </p>
          <ol style={{ paddingLeft: 20, margin: "8px 0" }}>
            <li>Press <code>F12</code> (or right-click and select <strong>Inspect</strong>).</li>
            <li>Click the <strong>Network</strong> tab in your browser developer tools.</li>
            <li>Select and process your document above.</li>
          </ol>
          <p>
            Notice that <strong>0 file upload requests are initiated</strong>. All data processing executes locally inside your browser's private memory.
          </p>
        </div>
      </details>

      <section className="tool-explainer">
        <div>
          <h2>How to use the {t.name.toLowerCase()}</h2>
          <p className="direct-answer">{t.answer}</p>
          <ol>
            {t.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <p>
            {t.slug === "pdf-to-excel"
              ? "All table extraction and spreadsheet conversions run 100% in your browser. Confidential documents never leave your machine."
              : "Limit: 25 MB per file, 40 files and 200 MB per batch. Files are cleared when you leave or refresh. Download your results before leaving."}
          </p>
        </div>
        <aside>
          <h2>Common questions</h2>
          {t.questions.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </aside>
      </section>
      <ShareBar
        title={`Appliory ${t.name}`}
        description={t.description}
        url={absolute("/tools/" + slug)}
      />
      <section className="related-tools">
        <h2>Keep working on your documents</h2>
        <div>
          {tools
            .filter((x) => x.slug !== slug)
            .map((x) => (
              <Link className="button" key={x.slug} href={"/tools/" + x.slug}>
                {x.name}
              </Link>
            ))}
          <Link className="button dark" href="/tool">
            Full application checker
          </Link>
        </div>
      </section>

      {/* Helpful Guides & Tutorials */}
      <section className="wrap content-section" style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid var(--line)" }}>
        <div className="section-heading" style={{ marginBottom: 16 }}>
          <div>
            <span className="eyebrow">STEP-BY-STEP GUIDANCE</span>
            <h2 style={{ fontSize: "1.25rem", margin: "4px 0" }}>Helpful Guides &amp; Tutorials</h2>
          </div>
          <Link href="/blog" className="text-link" style={{ fontSize: 13 }}>
            View all guides <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="blog-related" style={{ marginTop: 12 }}>
          {blogPosts
            .filter((p) => p.relatedTool?.href.includes(slug) || p.slug.includes(slug.replace(/compress-image-to-.*|image-resizer|passport-photo-maker/, "compress")) || false)
            .concat(blogPosts.slice(0, 3))
            .slice(0, 3)
            .map((p) => (
              <Link key={p.slug} className="blog-related-card" href={`/blog/${p.slug}`}>
                <span className="blog-category">{p.category}</span>
                <h4>{p.title}</h4>
                <span className="text-link" style={{ fontSize: 13 }}>
                  Read Guide <ArrowUpRight size={12} />
                </span>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}

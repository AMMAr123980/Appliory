import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";
import { StructuredData } from "@/components/appliory/structured-data";
import { absolute, breadcrumb, pageMetadata } from "@/lib/seo";
import { guides } from "@/lib/content";
import { ShareBar } from "@/components/appliory/share-bar";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = guides.find((g) => g.slug === slug);
  if (!g) return { title: "Guide not found", robots: { index: false } };
  const metaTitle = (g as { metaTitle?: string }).metaTitle || g.title;
  const metaDesc = (g as { metaDescription?: string }).metaDescription || g.intro;
  const keywords = (g as { keywords?: string[] }).keywords || [];
  return {
    ...pageMetadata(metaTitle, metaDesc, "/guides/" + slug, keywords),
    openGraph: {
      ...pageMetadata(metaTitle, metaDesc, "/guides/" + slug, keywords).openGraph,
      type: "article",
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = guides.find((g) => g.slug === slug);
  if (!g) notFound();
  const guideFaqs = (g as { faqs?: [string, string][] }).faqs;
  return (
    <>
      <StructuredData
        data={breadcrumb([
          ["Home", "/"],
          ["Guides", "/guides"],
          [g.title, "/guides/" + slug],
        ])}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: (g as { metaTitle?: string }).metaTitle || g.title,
          description: (g as { metaDescription?: string }).metaDescription || g.intro,
          url: absolute("/guides/" + slug),
          mainEntityOfPage: absolute("/guides/" + slug),
          author: {
            "@type": "Organization",
            name: "Appliory",
            url: absolute("/about"),
          },
          publisher: { "@id": absolute("/#organization") },
          inLanguage: "en",
        }}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: g.title,
          description: g.intro,
          step: g.sections.map(([name, text], idx) => ({
            "@type": "HowToStep",
            position: idx + 1,
            name,
            text,
          })),
        }}
      />
      {guideFaqs && guideFaqs.length > 0 && (
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: guideFaqs.map(([q, a]) => ({
              "@type": "Question",
              name: q,
              acceptedAnswer: {
                "@type": "Answer",
                text: a,
              },
            })),
          }}
        />
      )}
      <section className="page-hero wrap">
        <Link className="eyebrow" href="/guides">
          RESOURCES / {g.category}
        </Link>
        <h1>{g.title}</h1>
        <p>{g.intro}</p>
        <span style={{ fontSize: 10, color: "#8b9980" }}>
          {g.read} · Appliory preparation notes
        </span>

        {/* Quick Action Box for High Retention & Instant Utility */}
        {slug === "scholarship-document-checklist" && (
          <div style={{ marginTop: 24, padding: "20px 24px", background: "#f3f7f4", borderRadius: 12, border: "1px solid var(--line)" }}>
            <h3 style={{ margin: "0 0 10px 0", fontSize: 16, display: "flex", alignItems: "center", gap: 8, color: "var(--ink)" }}>
              ⚡ Scholarship Application Preparation Suite
            </h3>
            <p style={{ fontSize: 13, margin: "0 0 16px 0", color: "var(--muted)" }}>
              Applying for HEC, Fulbright, Chevening, DAAD, or Commonwealth? Verify and compress your required documents against portal upload limits before deadlines.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <Link href="/tool?template=scholarship" className="button dark" style={{ fontSize: 13, padding: "8px 16px" }}>
                Open Interactive Workspace <ArrowUpRight size={14} />
              </Link>
              <Link href="/tools/compress-image-to-50kb" className="button" style={{ fontSize: 13, padding: "8px 16px" }}>
                Compress Photo to 50KB <ArrowUpRight size={14} />
              </Link>
              <Link href="/tools/file-size-checker" className="button" style={{ fontSize: 13, padding: "8px 16px" }}>
                Check 2MB/5MB Limits <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </section>
      <article className="article">
        <div className="info-note">
          <Info size={15} />
          General preparation guidance. Current official instructions from your
          institution, scholarship provider, or employer take priority.
        </div>
        {g.sections.map(([title, copy]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{copy}</p>
          </section>
        ))}

        {guideFaqs && guideFaqs.length > 0 ? (
          <section style={{ marginTop: 32 }}>
            <h2>Frequently Asked Questions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {guideFaqs.map(([q, a]) => (
                <div
                  key={q}
                  style={{
                    padding: "16px 20px",
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <h3 style={{ margin: "0 0 8px 0", fontSize: 16 }}>{q}</h3>
                  <p style={{ margin: 0, fontSize: 14, color: "var(--muted, #a1a1aa)" }}>
                    {a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <>
            <h2>A common question</h2>
            <p>{g.faq}</p>
          </>
        )}

        {/* Free Local Preparation Tools */}
        <section style={{ marginTop: 36, padding: "24px", borderRadius: 12, border: "1px solid rgba(79, 209, 197, 0.2)", background: "rgba(79, 209, 197, 0.03)" }}>
          <h2 style={{ marginTop: 0, fontSize: 18 }}>Free Tools for Application Document Preparation</h2>
          <p style={{ fontSize: 14, color: "var(--muted, #a1a1aa)" }}>
            Format and verify all your files locally on your device with 100% privacy:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginTop: 16 }}>
            <Link href="/tools/file-size-checker" className="button" style={{ fontSize: 13, padding: "8px 12px" }}>
              Check File Size in KB/MB <ArrowUpRight size={13} />
            </Link>
            <Link href="/tools/compress-image-to-20kb" className="button" style={{ fontSize: 13, padding: "8px 12px" }}>
              Compress Photo / Challan <ArrowUpRight size={13} />
            </Link>
            <Link href="/tools/pdf-page-counter" className="button" style={{ fontSize: 13, padding: "8px 12px" }}>
              Count PDF Pages <ArrowUpRight size={13} />
            </Link>
            <Link href="/tools/image-resizer" className="button" style={{ fontSize: 13, padding: "8px 12px" }}>
              Resize Passport Photo <ArrowUpRight size={13} />
            </Link>
          </div>
        </section>

        <div className="panel panel-body" style={{ marginTop: 30 }}>
          <h2 style={{ marginTop: 0 }}>Put your checklist to work.</h2>
          <p>
            Turn these steps into your own document check. Your files stay on
            your device.
          </p>
          <Link href={"/tool?template=" + g.template} className="button dark">
            Open the document checker <ArrowUpRight size={15} />
          </Link>
        </div>
        <ShareBar
          title={g.title}
          description={g.intro}
          url={absolute("/guides/" + slug)}
        />
        <h2>Keep preparing</h2>
        {guides
          .filter((x) => x.slug !== slug)
          .slice(0, 3)
          .map((x) => (
            <p key={x.slug}>
              <Link className="text-link" href={"/guides/" + x.slug}>
                {x.title} <ArrowUpRight size={12} />
              </Link>
            </p>
          ))}
      </article>
    </>
  );
}

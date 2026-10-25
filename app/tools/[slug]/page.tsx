import Link from "next/link";
import { notFound } from "next/navigation";
import { tools } from "@/lib/tool-catalog";
import { absolute, breadcrumb, pageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/appliory/structured-data";
import QuickTool from "@/components/appliory/quick-tool";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = tools.find((t) => t.slug === slug);
  return t
    ? pageMetadata(
        t.name + " online — free, no login",
        t.description,
        "/tools/" + slug,
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
          "@type": "WebApplication",
          name: "Appliory " + t.name,
          url: absolute("/tools/" + slug),
          description: t.description,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Modern web browser",
          browserRequirements:
            "Requires JavaScript, File API and Canvas support",
          isAccessibleForFree: true,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          featureList: [t.answer],
          publisher: { "@id": absolute("/#organization") },
        }}
      />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link> / <Link href="/tools">Tools</Link> /{" "}
        <span>{t.name}</span>
      </nav>
      <header className="tool-intro">
        <span className="eyebrow">FREE · NO LOGIN · ON YOUR DEVICE</span>
        <h1>{t.name}</h1>
        <p>{t.description}</p>
      </header>
      <QuickTool slug={t.slug} />
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
            Limit: 25 MB per file, 40 files and 200 MB per batch. Files are
            cleared when you leave or refresh. Download your results before
            leaving.
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
    </main>
  );
}

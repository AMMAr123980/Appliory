import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";
import { StructuredData } from "@/components/appliory/structured-data";
import { absolute, breadcrumb, pageMetadata } from "@/lib/seo";
import { guides } from "@/lib/content";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = guides.find((g) => g.slug === slug);
  return g
    ? {
        ...pageMetadata(g.title, g.intro, "/guides/" + slug),
        openGraph: {
          ...pageMetadata(g.title, g.intro, "/guides/" + slug).openGraph,
          type: "article",
        },
      }
    : { title: "Guide not found", robots: { index: false } };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = guides.find((g) => g.slug === slug);
  if (!g) notFound();
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
          headline: g.title,
          description: g.intro,
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
      <section className="page-hero wrap">
        <Link className="eyebrow" href="/guides">
          RESOURCES / {g.category}
        </Link>
        <h1>{g.title}</h1>
        <p>{g.intro}</p>
        <span style={{ fontSize: 10, color: "#8b9980" }}>
          {g.read} · Appliory preparation notes
        </span>
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
        <h2>A common question</h2>
        <p>{g.faq}</p>
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

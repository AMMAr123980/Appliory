import Link from "next/link";
import { ArrowUpRight, Clock, Tag } from "lucide-react";
import { blogPosts } from "@/lib/blog";
import { StructuredData } from "@/components/appliory/structured-data";
import { absolute } from "@/lib/seo";

export const metadata = {
  title: "Blog — Document & Image Tips for Job and Scholarship Applicants | Appliory",
  description:
    "Free guides on compressing images for PPSC FPSC, converting PDFs to Excel, making passport photos, and preparing documents for online job and scholarship portals.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Appliory Blog",
          description:
            "Practical guides for compressing images, converting PDFs, and preparing documents for online job and scholarship portals.",
          url: absolute("/blog"),
          publisher: { "@id": absolute("/#organization") },
          inLanguage: "en",
        }}
      />

      {/* Hero */}
      <section className="page-hero wrap">
        <span className="eyebrow">TIPS · GUIDES · HOW-TOs</span>
        <h1>
          Practical guides for
          <br />
          every application step.
        </h1>
        <p>
          Compress photos to 20KB, convert PDFs to Excel, create passport photos, and prepare your
          documents — step by step, without uploading to any server.
        </p>
      </section>

      {/* Featured Post */}
      <section className="wrap blog-featured">
        <Link className="blog-featured-card" href={`/blog/${featured.slug}`}>
          <div className="blog-featured-label">
            <span className="blog-tag">{featured.tag}</span>
            <span className="blog-meta">
              <Clock size={13} /> {featured.readTime}
            </span>
          </div>
          <h2>{featured.title}</h2>
          <p>{featured.intro}</p>
          <span className="text-link">
            Read the guide <ArrowUpRight size={14} />
          </span>
        </Link>
      </section>

      {/* Post Grid */}
      <section className="wrap content-section blog-grid">
        {rest.map((post) => (
          <Link key={post.slug} className="blog-card" href={`/blog/${post.slug}`}>
            <div className="blog-card-header">
              <span className="blog-category">{post.category}</span>
            </div>
            <h3>{post.title}</h3>
            <p>{post.intro}</p>
            <div className="blog-card-footer">
              <span className="blog-meta">
                <Clock size={12} /> {post.readTime}
              </span>
              <span className="text-link" style={{ fontSize: 13 }}>
                Read <ArrowUpRight size={12} />
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* CTA — Tools */}
      <section className="wrap content-section" style={{ maxWidth: 700, textAlign: "center" }}>
        <h2 style={{ fontSize: "1.5rem" }}>Ready to prepare your documents?</h2>
        <p style={{ color: "var(--muted)" }}>
          All Appliory tools are free, private, and work directly in your browser.
          No account required.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "1.5rem" }}>
          <Link className="button dark" href="/tools">
            Explore all tools <ArrowUpRight size={15} />
          </Link>
          <Link className="button" href="/tools/compress-image-to-20kb">
            Compress to 20KB
          </Link>
          <Link className="button" href="/tools/pdf-to-excel">
            PDF to Excel
          </Link>
        </div>
      </section>
    </>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Clock, ChevronLeft } from "lucide-react";
import { blogPosts } from "@/lib/blog";
import { StructuredData } from "@/components/appliory/structured-data";
import { absolute, breadcrumb } from "@/lib/seo";
import { ShareBar } from "@/components/appliory/share-bar";

export const dynamic = "force-static";
export const dynamicParams = true;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Not found", robots: { index: false } };
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: "/blog/" + slug },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      url: absolute("/blog/" + slug),
      publishedTime: post.date,
      authors: ["Appliory"],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Structured Data */}
      <StructuredData data={breadcrumb([["Home", "/"], ["Blog", "/blog"], [post.title, "/blog/" + slug]])} />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.metaDescription,
          keywords: post.keywords.join(", "),
          url: absolute("/blog/" + slug),
          datePublished: post.date,
          dateModified: post.date,
          inLanguage: "en",
          author: {
            "@type": "Person",
            name: "Ammar Hassan Malik",
            url: absolute("/about"),
          },
          publisher: { "@id": absolute("/#organization") },
          mainEntityOfPage: { "@type": "WebPage", "@id": absolute("/blog/" + slug) },
        }}
      />
      {post.faqs.length > 0 && (
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: post.faqs.map(([q, a]) => ({
              "@type": "Question",
              name: q,
              acceptedAnswer: { "@type": "Answer", text: a },
            })),
          }}
        />
      )}

      {/* Hero */}
      <section className="page-hero wrap blog-post-hero">
        <Link className="blog-back-link" href="/blog">
          <ChevronLeft size={15} /> Back to blog
        </Link>
        <div className="blog-post-meta">
          <span className="blog-tag">{post.tag}</span>
          <span className="blog-meta">
            <Clock size={13} /> {post.readTime}
          </span>
        </div>
        <h1>{post.title}</h1>
        <p className="blog-post-intro">{post.intro}</p>
      </section>

      {/* Article Body */}
      <article className="article blog-article">
        {post.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}

        {/* FAQs */}
        {post.faqs.length > 0 && (
          <>
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              {post.faqs.map(([q, a]) => (
                <details key={q}>
                  <summary>
                    {q}
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </>
        )}

        {/* Related Tool CTA */}
        {post.relatedTool && (
          <div className="blog-tool-cta">
            <div className="blog-tool-cta-inner">
              <p className="blog-tool-cta-label">Try it now — free, no upload, no account</p>
              <h3>{post.relatedTool.label}</h3>
              <Link className="button dark" href={post.relatedTool.href}>
                Open the tool <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        )}

        <ShareBar
          title={post.title}
          description={post.metaDescription}
          url={absolute("/blog/" + slug)}
        />

        {/* Related Posts */}
        <h2>More guides</h2>
        <div className="blog-related">
          {related.map((p) => (
            <Link key={p.slug} className="blog-related-card" href={`/blog/${p.slug}`}>
              <span className="blog-category">{p.category}</span>
              <h4>{p.title}</h4>
              <span className="text-link" style={{ fontSize: 13 }}>
                Read <ArrowUpRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </article>
    </>
  );
}

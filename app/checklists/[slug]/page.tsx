import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Info, Check } from "lucide-react";
import { StructuredData } from "@/components/appliory/structured-data";
import { breadcrumb, pageMetadata } from "@/lib/seo";
import { templates } from "@/lib/model";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = templates.find((x) => x.slug === slug);
  return t
    ? pageMetadata(
        t.title + " document checklist",
        t.description,
        "/checklists/" + slug,
      )
    : { title: "Checklist not found", robots: { index: false } };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = templates.find((t) => t.slug === slug);
  if (!t) notFound();
  return (
    <>
      <StructuredData
        data={breadcrumb([
          ["Home", "/"],
          ["Checklists", "/checklists"],
          [t.title, "/checklists/" + slug],
        ])}
      />
      <section className="page-hero wrap">
        <span className="eyebrow">EDITABLE STARTER CHECKLIST</span>
        <h1>
          {t.title}
          <br />A calmer place to start.
        </h1>
        <p>
          {t.description} Confirm the official requirements, customize this
          template, and check your documents in one place.
        </p>
        <Link href={"/tool?template=" + slug} className="button dark">
          Use this checklist <ArrowUpRight size={16} />
        </Link>
      </section>
      <section className="wrap content-section public-content-grid">
        <article className="article">
          <div className="info-note">
            <Info size={15} />
            These are editable examples, not official requirements. Default
            limits are suggestions for trying the tool. They must be replaced
            with your actual application rules.
          </div>
          <h2>What’s in this starter</h2>
          {t.items.map((r) => (
            <div className="finding-row" key={r.id}>
              <h3>
                {r.name} {r.required ? "" : "(optional example)"}
              </h3>
              <p>{r.description}</p>
              <small>
                Example format: {r.extensions.toUpperCase()} · Example size:{" "}
                {r.maxMB} MB
                {r.maxPages ? ` · Example maximum: ${r.maxPages} pages` : ""}
              </small>
            </div>
          ))}
          <h2>Make it fit your application</h2>
          <ol>
            <li>
              Open the current official application instructions and identify
              each document requested.
            </li>
            <li>
              Remove items you do not need and add requirements missing from
              this starter.
            </li>
            <li>
              Update accepted formats, size and page limits, and dimensions
              exactly as instructed.
            </li>
            <li>
              Add the reference URL and date you verified each requirement.
            </li>
            <li>
              Add your files, map them to the checklist, and run the technical
              checks.
            </li>
          </ol>
          <h2>What still needs your judgment</h2>
          <p>
            Verify content, eligibility, translations, signatures, issue dates,
            and the submission deadline manually. A passed technical check does
            not guarantee admission, a scholarship, employment, or acceptance.
          </p>
        </article>
        <aside className="panel sticky-card panel-body">
          <span className="eyebrow">YOUR REQUIREMENTS, YOUR RULES</span>
          <h2 style={{ fontSize: 24, marginBottom: 18 }}>
            A useful starting point.
          </h2>
          <ul className="check-list">
            <li>
              <Check /> {t.items.length} editable requirements
            </li>
            <li>
              <Check /> Guest workflow, no account needed
            </li>
            <li>
              <Check /> Browser-based document checks
            </li>
            <li>
              <Check /> Download reports and files
            </li>
          </ul>
          <Link className="button dark" href={"/tool?template=" + slug}>
            Customize checklist <ArrowUpRight size={15} />
          </Link>
        </aside>
      </section>
    </>
  );
}

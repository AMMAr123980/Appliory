import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowUpRight,
  UploadCloud,
  ScanLine,
  FolderCheck,
  Plus,
  FileCheck2,
  Mail,
  Phone,
} from "lucide-react";
import { faqs } from "@/lib/content";

const pages: Record<string, { title: string; description: string }> = {
  "how-it-works": {
    title: "A clear path from files to ready.",
    description:
      "Create a checklist, add your documents, run the real checks, and leave with a practical report and organized files.",
  },
  faq: {
    title: "A little clarity, before you begin.",
    description:
      "Straightforward answers about document checks, privacy, exports, and downloads.",
  },
  about: {
    title: "A little preparation. A more confident next step.",
    description:
      "Appliory helps you catch the technical details that are easy to miss when an application matters.",
  },
  contact: {
    title: "We’re here for your next question.",
    description: "Find practical help with file checks and exports.",
  },
  privacy: {
    title: "Your documents should stay yours.",
    description: "How Appliory handles your files, files and downloads.",
  },
  terms: {
    title: "Clear expectations, from the start.",
    description:
      "What Appliory does, what you’re responsible for, and the limits of technical document checks.",
  },
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = pages[slug];
  return {
    title: p?.title,
    description: p?.description,
    alternates: { canonical: "/" + slug },
    robots: ["login", "signup"].includes(slug)
      ? { index: false, follow: false }
      : undefined,
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (["login", "signup"].includes(slug)) redirect("/tool");
  const p = pages[slug];
  if (!p) notFound();
  return (
    <>
      <section className="page-hero wrap">
        <span className="eyebrow">
          {slug.replaceAll("-", " ").toUpperCase()}
        </span>
        <h1>{p.title}</h1>
        <p>{p.description}</p>
      </section>
      {slug === "faq" ? (
        <section className="wrap content-section">
          <div className="faq-list" style={{ maxWidth: 800 }}>
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <Plus size={17} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
      ) : slug === "contact" ? (
        <section className="wrap content-section" style={{ maxWidth: 850 }}>
          <h2>Get in touch with Appliory</h2>
          <p>
            Have a question about document checking, technical limitations, or need support? Reach out directly to our team:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", margin: "2rem 0" }}>
            <div style={{ padding: "1.5rem", border: "1px solid var(--border, #e2e8f0)", borderRadius: "12px", background: "var(--card, #f8fafc)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                <Mail size={22} color="var(--primary, #0f766e)" />
                <h3 style={{ margin: 0, fontSize: "1.15rem" }}>Email Support</h3>
              </div>
              <p style={{ margin: "0.25rem 0 0.75rem", color: "var(--muted, #64748b)" }}>
                For general questions, bug reports, and partnership inquiries:
              </p>
              <a href="mailto:fitduo07@gmail.com" style={{ fontWeight: 600, color: "var(--primary, #0f766e)", wordBreak: "break-all" }}>
                fitduo07@gmail.com
              </a>
            </div>
            <div style={{ padding: "1.5rem", border: "1px solid var(--border, #e2e8f0)", borderRadius: "12px", background: "var(--card, #f8fafc)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                <Phone size={22} color="var(--primary, #0f766e)" />
                <h3 style={{ margin: 0, fontSize: "1.15rem" }}>Phone & WhatsApp</h3>
              </div>
              <p style={{ margin: "0.25rem 0 0.75rem", color: "var(--muted, #64748b)" }}>
                Direct telephone and WhatsApp messaging support:
              </p>
              <a href="tel:+923215772078" style={{ fontWeight: 600, color: "var(--primary, #0f766e)" }}>
                +92 321 5772078
              </a>
            </div>
          </div>
          <p style={{ marginTop: "1rem" }}>
            Check the FAQ for supported formats, file limits, and how to
            interpret results. For a failed check, use the action shown beside
            the result, correct the file or requirement, and run checks again.
          </p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
            <Link className="button dark" href="/faq">
              Open help center
            </Link>
            <Link className="button" href="/tool">
              Open document checker
            </Link>
          </div>
        </section>
      ) : slug === "how-it-works" ? (
        <section className="wrap content-section">
          <div className="workflow-grid">
            {[
              [
                FileCheck2,
                "Create your checklist",
                "Select scholarship, university, or job as a starting point, or make a custom checklist. Confirm required documents, accepted formats, sizes, pages, and dimensions from the official instructions.",
              ],
              [
                UploadCloud,
                "Add and match your files",
                "Choose files or drag them into the workspace. Match every file to a checklist item. Files remain in memory on your device; refreshing or closing the page clears them.",
              ],
              [
                ScanLine,
                "Run and review the checks",
                "Read individual passes, failures, warnings, and manual-review notes. Rename copies and fix supported images, then run the checks again. Open PDFs yourself to confirm content and scan quality.",
              ],
              [
                FolderCheck,
                "Export and prepare to submit",
                "Download PDF, CSV, or JSON reports and a ZIP of your selected files. The ZIP preview shows safe, unique names. Submit through the official application portal, not through Appliory.",
              ],
            ].map(([Icon, title, copy], i) => {
              const I = Icon as typeof FileCheck2;
              return (
                <div className="workflow-card" key={String(title)}>
                  <div>
                    <I size={24} />
                    <span>0{i + 1}</span>
                  </div>
                  <h3>{String(title)}</h3>
                  <p>{String(copy)}</p>
                </div>
              );
            })}
          </div>
          <article className="article">
            <h2>Read your status honestly</h2>
            <p>
              <b>Not ready:</b> a required item is missing or a required file
              has failed a configured check. <b>Needs review:</b> warnings,
              technical checks that could not be completed, unmatched files, or
              optional-item failures remain.{" "}
              <b>All configured checks passed:</b> all configured technical
              requirements passed. Missing optional items do not block this
              status.
            </p>
            <h2>Your judgment is still essential</h2>
            <p>
              Check names, content, authenticity, signatures, translations,
              eligibility, and deadlines. Appliory does not compare against live
              institutional policies. Passing the checks does not guarantee
              admission, a scholarship, a job, or acceptance.
            </p>
            <Link href="/tool" className="button dark">
              Try the document checker <ArrowUpRight size={16} />
            </Link>
          </article>
        </section>
      ) : (
        <article className="article">
          {slug === "about" ? (
            <>
              <h2>Made for the details before the deadline</h2>
              <p>
                Applications can involve many small requirements: the right
                document, the right format, the right size, and the right
                version. Appliory brings these technical checks into one quiet
                workspace so you can spot problems before you submit.
              </p>
              <h2>One useful workflow</h2>
              <p>
                Build a checklist, add your documents, run configured checks,
                fix supported image issues, and export a readiness report with
                organized files. Starter templates give you somewhere to begin,
                and every requirement is editable.
              </p>
              <h2>Privacy starts with keeping files local</h2>
              <p>
                Document contents are processed in your browser. There is no
                document-upload API, AI content analysis, or cloud file storage
                in this release. Downloadable checklists let you reuse checklist
                rules and report metadata only when you choose to.
              </p>
              <h2>A tool for preparation, not a promise</h2>
              <p>
                Appliory does not represent universities, employers, or
                scholarship providers. It cannot verify eligibility,
                authenticity, or acceptance. The official instructions always
                take priority.
              </p>
              <Link href="/tool" className="button dark">
                Get your documents ready <ArrowUpRight size={16} />
              </Link>
            </>
          ) : slug === "privacy" ? (
            <>
              <p>
                Effective: 24 October 2026. This notice describes this release
                of Appliory. The site owner should review it whenever processing
                or service providers change.
              </p>
              <h2>Documents selected in the checker</h2>
              <p>
                Selected files are held in browser memory and processed locally.
                Appliory reads file bytes to calculate hashes, inspect supported
                formats, extract PDF text for a text-presence check, and decode
                images. Document contents and extracted text are not uploaded to
                our backend, logged, or sent to AI services. They are cleared
                when you leave or refresh the page. Downloads remain on your
                device until you delete them.
              </p>
              <h2>No registration or stored documents</h2>
              <p>
                There are no user accounts or server-side saved reports.
                Download checklists and reports to your own device. Import a
                downloaded checklist to reuse its rules.
              </p>
              <h2>Hosting and network requests</h2>
              <p>
                The hosting provider may process IP addresses, request
                timestamps, and operational logs. No advertising or analytics
                scripts are added by this application. The optional stateless
                validation API processes only metadata submitted by its caller
                and does not save it.
              </p>
              <h2>Using a shared device</h2>
              <p>
                Other visitors cannot browse your selected files through
                Appliory. Someone using your open browser or device can still
                see the current workspace and downloaded files. Clear the
                workspace and remove sensitive downloads before handing the
                device to another person. Keep your browser and operating system
                updated; no website can guarantee protection from every attack.
              </p>
              <h2>Clear your workspace</h2>
              <p>
                Use Start fresh (or Clear files in a quick tool), refresh, or
                close the tab to clear selected documents. Downloaded files
                remain on your device until you delete them.
              </p>
            </>
          ) : (
            <>
              <p>Effective: 24 October 2026.</p>
              <h2>Purpose of the service</h2>
              <p>
                Appliory is a preparation tool that checks selected files
                against rules you configure. It is not an application submission
                portal, admissions adviser, employer, scholarship provider, or
                legal service.
              </p>
              <h2>Your responsibilities</h2>
              <p>
                You must verify current official requirements, confirm the
                accuracy and authenticity of your documents, and submit through
                the correct official channel before its deadline. You are
                responsible for choosing appropriate rules and interpreting
                results. Do not process files you lack permission to use or use
                the service to misrepresent documents.
              </p>
              <h2>Starter templates and results</h2>
              <p>
                Templates are editable examples, not official requirements.
                Passed checks do not guarantee acceptance, eligibility, document
                authenticity, image quality, or completeness. Unreadable files
                and pages without extractable text may need manual inspection.
              </p>
              <h2>File corrections and downloads</h2>
              <p>
                Image corrections can change quality, dimensions, transparency,
                or file size. Compression is best effort. Originals on disk are
                preserved, but you should maintain your own backups and inspect
                exported files. Browser limits may interrupt large-file
                processing.
              </p>
              <h2>Availability and limitations</h2>
              <p>
                The service is provided as available without guarantees of
                uninterrupted operation or suitability for a particular
                application. To the extent permitted by applicable law, the
                operator is not responsible for application outcomes, missed
                deadlines, or losses caused by relying solely on automated
                checks. Nothing here excludes rights that cannot lawfully be
                excluded.
              </p>
              <h2>Changes and contact</h2>
              <p>
                Features and these terms may change. Review this page when
                preparing an important application. Questions and deletion
                requests can be sent through{" "}
                <Link href="/contact">the help center</Link>.
              </p>
            </>
          )}
        </article>
      )}
    </>
  );
}

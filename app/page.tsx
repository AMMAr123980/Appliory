import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Check,
  FileText,
  ImageIcon,
  Files,
  ListChecks,
  UploadCloud,
  Download,
} from "lucide-react";
import { tools } from "@/lib/tool-catalog";
import { faqs } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Free document checker, PDF & image tools",
  "Check application documents, count PDF pages, measure file sizes, resize images and find exact duplicates. Free tools with no login. Files stay on your device.",
  "/",
);
export default function Home() {
  return (
    <main>
      <section className="home-hero wrap">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="live-dot" /> PRIVATE TOOLS. READY WHEN YOU ARE.
          </span>
          <h1>
            Better prepared.
            <br />
            <span>One file at a time.</span>
          </h1>
          <p>
            Check your application documents, count PDF pages, or resize a
            photo. Simple tools for the details that matter.
          </p>
          <div className="hero-actions">
            <Link className="button dark" href="/tool">
              Check my documents <ArrowUpRight size={18} />
            </Link>
            <Link className="button" href="/tools">
              Explore free tools <ArrowRight size={18} />
            </Link>
          </div>
          <div className="hero-assurances">
            <span>
              <Check size={15} />
              No login
            </span>
            <span>
              <Check size={15} />
              Free to use
            </span>
            <span>
              <ShieldCheck size={15} />
              Files stay local
            </span>
          </div>
        </div>
        <div className="hero-task-panel">
          <div className="task-panel-title">
            <span className="tool-icon">
              <ListChecks size={25} />
            </span>
            <div>
              <small>YOUR NEXT STEP</small>
              <h2>What are you working on?</h2>
            </div>
          </div>
          <Link href="/tool?template=scholarship">
            <span>
              <b>A scholarship or university application</b>
              <small>Make a checklist and check your files together</small>
            </span>
            <ArrowUpRight size={20} />
          </Link>
          <Link href="/tools/pdf-page-counter">
            <span>
              <b>A PDF that needs a quick check</b>
              <small>Count pages and check selectable text</small>
            </span>
            <ArrowUpRight size={20} />
          </Link>
          <Link href="/tools/image-resizer">
            <span>
              <b>A photo with exact size requirements</b>
              <small>Set pixel dimensions and download a copy</small>
            </span>
            <ArrowUpRight size={20} />
          </Link>
          <div className="task-panel-note">
            <ShieldCheck size={17} /> Your documents are processed in your
            browser.
          </div>
        </div>
      </section>
      <section className="home-tools wrap" id="tools">
        <div className="section-heading">
          <div>
            <span className="eyebrow">PICK A TASK. GET IT DONE.</span>
            <h2>Everyday document tools</h2>
            <p>
              A direct route to the result you need. No account, no detours.
            </p>
          </div>
          <Link className="text-link" href="/tools">
            All tools <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="quick-tools-grid">
          <Link href="/tool" className="quick-tool-card featured">
            <span className="tool-icon">
              <ListChecks />
            </span>
            <small>APPLICATIONS</small>
            <h3>Document checker</h3>
            <p>
              Build your checklist. Catch missing files, size issues, PDF limits
              and more.
            </p>
            <span className="text-link">
              Check your application <ArrowUpRight size={17} />
            </span>
          </Link>
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
              <h3>{t.name}</h3>
              <p>{t.description}</p>
              <span className="text-link">
                {t.action}
                <ArrowUpRight size={17} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="workflow-section">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <span className="eyebrow">FROM REQUIREMENTS TO READY</span>
              <h2>Your application, in order.</h2>
              <p>
                Preparing several documents? Check the whole pack in one
                workspace.
              </p>
            </div>
            <Link className="button dark" href="/tool">
              Start a document check <ArrowRight size={17} />
            </Link>
          </div>
          <div className="workflow-three">
            {[
              [
                ListChecks,
                "01",
                "Set your requirements",
                "Start from a scholarship, university or job checklist. Edit every rule to match the official instructions.",
              ],
              [
                UploadCloud,
                "02",
                "Add and check your files",
                "Select your own documents, match them to requirements, and run real technical checks.",
              ],
              [
                Download,
                "03",
                "Review and download",
                "See what needs attention. Fix supported images, then download a report and an organized ZIP.",
              ],
            ].map(([Icon, n, title, copy]) => {
              const I = Icon as typeof ListChecks;
              return (
                <div key={String(n)}>
                  <span className="workflow-number">{String(n)}</span>
                  <I size={25} />
                  <h3>{String(title)}</h3>
                  <p>{String(copy)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="home-trust wrap">
        <div>
          <span className="eyebrow">PRIVATE BY DESIGN</span>
          <h2>
            Your files have a place.
            <br />
            It’s your device.
          </h2>
          <p>
            PDF inspection, file hashing, image conversion and exports happen in
            your browser. No document uploads, no registration, no server-side
            document history.
          </p>
          <Link className="text-link" href="/privacy">
            How your data is handled <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="trust-facts">
          <div>
            <ShieldCheck />
            <b>On-device processing</b>
            <p>Your documents are not sent to our servers or AI services.</p>
          </div>
          <div>
            <Download />
            <b>You keep the results</b>
            <p>
              Download before leaving. Refreshing clears the selected files.
            </p>
          </div>
          <div>
            <FileText />
            <b>Clear limits</b>
            <p>
              25 MB per file, 40 files per batch. Technical checks do not verify
              authenticity or guarantee acceptance.
            </p>
          </div>
        </div>
      </section>
      <section className="home-faq wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">CLEAR ANSWERS</span>
            <h2>A few things to know</h2>
          </div>
          <Link href="/faq" className="text-link">
            All questions <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="faq-list">
          {faqs.slice(0, 4).map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span>+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
        <div className="workflow-callout">
          <div>
            <h2>Looking for PDF editing or OCR?</h2>
            <p>
              Compare what Appliory does with established PDF tools and choose
              the right tool for your task.
            </p>
          </div>
          <Link href="/compare" className="button">
            Compare document tools <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}

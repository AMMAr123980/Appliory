import Link from "next/link";
import {
  ArrowUpRight,
  FileText,
  ImageIcon,
  Files,
  ShieldCheck,
} from "lucide-react";
import { tools } from "@/lib/tool-catalog";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Free PDF, image & document tools — no login",
  "Count PDF pages, check file sizes, resize and compress images, and find duplicate files. Free browser tools with no uploads or registration.",
  "/tools",
);
export default function Page() {
  return (
    <main className="wrap tools-page">
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

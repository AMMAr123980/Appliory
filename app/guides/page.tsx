import Link from "next/link";
import { FileText, ArrowUpRight } from "lucide-react";
import { guides } from "@/lib/content";
export const metadata = {
  title: "Application preparation guides",
  description:
    "Practical guides for preparing scholarship, university and job application documents, checking PDFs, resizing images and finding duplicate files.",
  alternates: { canonical: "/guides" },
};
export default function Page() {
  return (
    <>
      <section className="page-hero wrap">
        <span className="eyebrow">A LITTLE KNOW-HOW GOES A LONG WAY</span>
        <h1>
          Good preparation.
          <br />
          Fewer last-minute surprises.
        </h1>
        <p>
          Practical, straightforward guides for getting your application
          documents in order.
        </p>
      </section>
      <section className="content-section wrap guide-grid">
        {guides.map((g) => (
          <Link key={g.slug} className="guide-card" href={"/guides/" + g.slug}>
            <div className="guide-visual">
              <FileText />
              <span>THE PREPARATION NOTES</span>
            </div>
            <div className="guide-body">
              <span className="eyebrow">
                {g.category} · {g.read}
              </span>
              <h2>{g.title}</h2>
              <p>{g.intro}</p>
              <span className="text-link">
                Read the guide <ArrowUpRight size={14} />
              </span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}

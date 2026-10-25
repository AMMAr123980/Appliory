import { Suspense } from "react";
import type { Metadata } from "next";
import Tool from "@/components/appliory/tool";
export const metadata: Metadata = {
  title: "Application document checker",
  description:
    "Create a checklist, check real document formats, PDF pages, file sizes and image dimensions, then export your readiness report.",
  alternates: { canonical: "/tool" },
  openGraph: {
    title: "Free application document checker | Appliory",
    description:
      "Check your requirements, files, PDF pages and image dimensions. No login.",
    url: "/tool",
    images: ["/social-preview.png"],
  },
};
export default function Page() {
  return (
    <div>
      <section className="checker-intro wrap">
        <h1>Check your application documents online</h1>
        <p>
          Set your requirements, select your files, and check missing documents,
          PDF pages, file sizes, image dimensions and exact duplicates. No login
          or document uploads. Edit starter rules to match your official
          instructions.
        </p>
      </section>
      <Suspense
        fallback={
          <div className="empty-state">Preparing your private workspace…</div>
        }
      >
        <Tool />
      </Suspense>
    </div>
  );
}

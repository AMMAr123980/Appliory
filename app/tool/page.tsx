import { Suspense } from "react";
import type { Metadata } from "next";
import Tool from "@/components/appliory/tool";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Free Document Checker Online — Private File & PDF Validator",
  "Check application requirements, missing files, PDF page counts, file sizes, and image dimensions locally in your browser with zero document uploads.",
  "/tool",
);
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

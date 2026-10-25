import Link from "next/link";
import { FileQuestion, ArrowRight } from "lucide-react";
export default function NotFound() {
  return (
    <main className="empty-state" style={{ padding: "100px 25px" }}>
      <FileQuestion size={45} />
      <span className="eyebrow">404 · A SMALL DETOUR</span>
      <h1 style={{ fontSize: 36, fontWeight: 500 }}>
        This page isn’t in the pack.
      </h1>
      <p>The address may have changed. Your next step is still right here.</p>
      <Link href="/tool" className="button dark">
        Open document checker <ArrowRight size={15} />
      </Link>
    </main>
  );
}

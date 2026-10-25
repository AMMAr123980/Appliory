"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="empty-state" style={{ padding: 80 }}>
      <h1>Something needs a second look.</h1>
      <p>
        We couldn’t load this page. Try again, or return to the document
        checker.
      </p>
      <button className="button dark" onClick={reset}>
        Try again
      </button>
      <Link href="/tool" className="button" style={{ marginLeft: 10 }}>
        Document checker
      </Link>
    </main>
  );
}

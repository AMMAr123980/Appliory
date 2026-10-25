"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ArrowUpRight,
  FileCheck2,
  LayoutGrid,
  ListChecks,
  BookOpen,
  LifeBuoy,
  ShieldCheck,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Appliory home">
      <span className="brand-mark">
        <FileCheck2 size={21} />
      </span>
      appliory<span className="brand-dot">.</span>
    </Link>
  );
}
export function Header() {
  const p = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header
      className="header"
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <div className="header-inner">
        <Brand />
        <nav
          id="main-navigation"
          className={open ? "nav open" : "nav"}
          aria-label="Main navigation"
        >
          <Link
            onClick={() => setOpen(false)}
            className={p === "/tool" ? "active" : ""}
            href="/tool"
          >
            Document checker
          </Link>
          <Link
            onClick={() => setOpen(false)}
            className={p.startsWith("/checklists") ? "active" : ""}
            href="/checklists"
          >
            Checklists <ChevronDown size={13} />
          </Link>
          <Link onClick={() => setOpen(false)} href="/tools">
            All tools
          </Link>
          <Link onClick={() => setOpen(false)} href="/how-it-works">
            How it works
          </Link>
          <Link onClick={() => setOpen(false)} href="/guides">
            Guides
          </Link>
        </nav>
        <div className="header-actions">
          <Link href="/tool" className="button small dark">
            Start checking <ArrowUpRight size={15} />
          </Link>
          <button
            className="mobile-toggle icon-button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="main-navigation"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <Brand />
          <p>
            A little preparation.
            <br />A more confident next step.
          </p>
          <span className="privacy-inline">
            <ShieldCheck size={15} /> Your documents stay in your browser.
          </span>
        </div>
        <div>
          <b>Workspace</b>
          <Link href="/tool">Document checker</Link>
          <Link href="/tools">PDF & image tools</Link>
          <Link href="/compare">Compare tools</Link>
          <Link href="/checklists">Starter checklists</Link>
        </div>
        <div>
          <b>Learn</b>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/guides">Application guides</Link>
          <Link href="/faq">Frequently asked questions</Link>
        </div>
        <div>
          <b>Appliory</b>
          <Link href="/about">About us</Link>
          <Link href="/contact">Help & support</Link>
          <Link href="/privacy">Privacy policy</Link>
          <Link href="/terms">Terms of use</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Appliory. Made for your next chapter.
        </span>
        <span>
          Technical checks. Thoughtful preparation. No acceptance guarantees.
        </span>
      </div>
    </footer>
  );
}
export function SideNav() {
  const p = usePathname();
  return (
    <aside className="side-nav">
      <div className="workspace-label">YOUR WORKSPACE</div>
      {[
        [LayoutGrid, "Overview", "/"],
        [FileCheck2, "Document checker", "/tool"],
        [ListChecks, "Starter checklists", "/checklists"],
      ].map(([Icon, label, href]) => {
        const I = Icon as typeof LayoutGrid;
        return (
          <Link
            key={String(href)}
            href={String(href)}
            className={p === href ? "selected" : ""}
          >
            <I size={18} />
            {String(label)}
            {href === "/tool" && <span className="nav-new">FREE</span>}
          </Link>
        );
      })}
      <div className="workspace-label lower">HELP & RESOURCES</div>
      <Link href="/guides">
        <BookOpen size={18} />
        Application guides
      </Link>
      <Link href="/faq">
        <LifeBuoy size={18} />
        Help center
      </Link>
      <div className="sidebar-note">
        <span className="mini-icon">
          <ShieldCheck size={19} />
        </span>
        <b>Private by design.</b>
        <p>Your files stay on your device. Your next step stays yours.</p>
        <Link href="/privacy">
          Our privacy approach <ArrowUpRight size={13} />
        </Link>
      </div>
      <div className="sidebar-bottom">
        <span className="guest-avatar">G</span>
        <div>
          <b>Guest workspace</b>
          <small>No account needed</small>
        </div>
      </div>
    </aside>
  );
}
export function Workspace({ children }: { children: React.ReactNode }) {
  return (
    <div className="workspace">
      <SideNav />
      <main className="workspace-main">{children}</main>
    </div>
  );
}
export function Badge({
  children,
  tone = "green",
}: {
  children: React.ReactNode;
  tone?: string;
}) {
  return <span className={"badge " + tone}>{children}</span>;
}

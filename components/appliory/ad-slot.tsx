"use client";
import Script from "next/script";
import { useEffect, useRef } from "react";
/** Public editorial pages only. The host CMP must supply consentGranted.
 * No ad request is made unless every gate is explicitly configured.
 * Update the CSP allowlist before enabling. Never mount inside the checker.
 */
export function AdSlot({
  consentGranted = false,
}: {
  consentGranted?: boolean;
}) {
  const element = useRef<HTMLModElement>(null);
  const publisher = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "";
  const slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID || "";
  const enabled =
    process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true" &&
    process.env.NEXT_PUBLIC_CMP_READY === "true" &&
    consentGranted &&
    /^ca-pub-\d{16}$/.test(publisher) &&
    /^\d+$/.test(slot);
  useEffect(() => {
    if (enabled && element.current && !element.current.dataset.requested) {
      element.current.dataset.requested = "true";
      try {
        const w = window as unknown as { adsbygoogle?: unknown[] };
        (w.adsbygoogle = w.adsbygoogle || []).push({});
      } catch {
        /* Ads must not interrupt page reading. */
      }
    }
  }, [enabled]);
  if (!enabled) return null;
  return (
    <aside aria-label="Advertisement">
      <p style={{ fontSize: 11 }}>Advertisement</p>
      <Script
        async
        src={
          "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" +
          publisher
        }
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <ins
        ref={element}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={publisher}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}

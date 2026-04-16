"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const CMS_API = process.env.NEXT_PUBLIC_CMS_API_URL || "https://ltcpa-cms-api.jimsbond007.workers.dev";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    // Track page view
    fetch(`${CMS_API}/api/analytics/pageview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname }),
    }).catch(() => {});

    // Track time on page (heartbeat every 30s)
    const heartbeat = setInterval(() => {
      fetch(`${CMS_API}/api/analytics/interaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: pathname, type: "heartbeat" }),
      }).catch(() => {});
    }, 30000);

    // Track visibility changes
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        fetch(`${CMS_API}/api/analytics/interaction`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: pathname, type: "visible" }),
        }).catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearInterval(heartbeat);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [pathname]);

  return null;
}

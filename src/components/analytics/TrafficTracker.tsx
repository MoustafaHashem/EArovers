"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { logPageView } from "@/actions/tracking";

export function TrafficTracker() {
  const pathname = usePathname();
  const lastLoggedPath = useRef<string | null>(null);

  useEffect(() => {
    // Only log once per path change
    if (pathname && pathname !== lastLoggedPath.current) {
      lastLoggedPath.current = pathname;
      
      // We don't need to await or handle errors here, it's a silent background operation
      logPageView(pathname).catch(() => {});
    }
  }, [pathname]);

  return null;
}

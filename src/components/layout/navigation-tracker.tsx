"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { recordVisit } from "@/lib/navigation-history";

/** Registra cada página visitada para que a seta de voltar saiba se há página anterior no site. */
export function NavigationTracker() {
  const pathname = usePathname();
  const traversalRef = useRef(false);

  useEffect(() => {
    const onPopState = () => {
      traversalRef.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    recordVisit(pathname, traversalRef.current);
    traversalRef.current = false;
  }, [pathname]);

  return null;
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { pageKeyFromPathname } from "@/i18n/config";
import { cn } from "@/lib/utils";
import type { NavItem } from "./nav-items";

type NavLinksProps = {
  items: NavItem[];
};

/** Links normais da navbar (desktop), com indicação da página atual. */
export function NavLinks({ items }: NavLinksProps) {
  const current = pageKeyFromPathname(usePathname());

  return (
    <ul className="flex items-center gap-1 xl:gap-2">
      {items.map((item) => {
        const active = item.key === current;
        return (
          <li key={item.key}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative rounded-full px-3 py-2 text-[0.95rem] text-cream transition-colors hover:bg-cream/10",
                "after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:scale-x-100",
                active && "after:scale-x-100",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

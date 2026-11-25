"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { pageKeyFromPathname } from "@/i18n/config";
import { cn } from "@/lib/utils";
import type { NavItem } from "./nav-items";

type MobileMenuProps = {
  items: NavItem[];
  highlighted: NavItem[];
  labels: { open: string; close: string; title: string };
  className?: string;
};

/** Menu hambúrguer do celular. */
export function MobileMenu({
  items,
  highlighted,
  labels,
  className,
}: MobileMenuProps) {
  const current = pageKeyFromPathname(usePathname());

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-lg"
          aria-label={labels.open}
          className={cn(
            "size-11 rounded-full text-cream hover:bg-cream/10 hover:text-cream aria-expanded:bg-cream/10 aria-expanded:text-cream",
            className,
          )}
        >
          <MenuIcon aria-hidden="true" className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        closeLabel={labels.close}
        className="w-[86%] gap-0 border-none bg-forest px-6 pt-20 pb-8 text-cream [&>[data-slot=sheet-close]]:top-5 [&>[data-slot=sheet-close]]:right-5 [&>[data-slot=sheet-close]]:size-11 [&>[data-slot=sheet-close]]:rounded-full [&>[data-slot=sheet-close]]:text-cream [&>[data-slot=sheet-close]]:hover:bg-cream/10 [&>[data-slot=sheet-close]_svg]:size-6"
      >
        <SheetTitle className="sr-only">{labels.title}</SheetTitle>
        <nav aria-label={labels.title}>
          <ul className="flex flex-col">
            {items.map((item) => {
              const active = item.key === current;
              return (
                <li key={item.key} className="border-b border-cream/10">
                  <SheetClose asChild>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between py-4 font-heading text-2xl text-cream transition-colors hover:text-gold",
                        active && "text-gold",
                      )}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                </li>
              );
            })}
          </ul>
          <ul className="mt-8 flex flex-col gap-3">
            {highlighted.map((item) => (
              <li key={item.key}>
                <SheetClose asChild>
                  <Button asChild variant="gold" size="cta" className="w-full">
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

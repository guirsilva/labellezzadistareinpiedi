import { AtSignIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "@/components/shared/brand-logo";
import { InertLink } from "@/components/shared/inert-link";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type FooterProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Footer({ locale, dict }: FooterProps) {
  const { footer, ui } = dict;
  const phoneHref = `tel:${footer.phone.replace(/\s+/g, "")}`;
  const instagramHref = `https://www.instagram.com/${footer.instagram.replace(/^@/, "")}/`;

  const linkClass =
    "underline decoration-cream/30 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold";

  return (
    <footer className="bg-forest text-cream">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_auto] md:py-20">
        <div className="flex flex-col gap-5">
          <BrandLogo alt={ui.logoAlt} className="size-14 lg:size-14" />
          <div className="flex flex-col gap-1 text-cream/85">
            <p className="font-heading text-xl text-cream">{footer.name}</p>
            <p className="flex items-start gap-2">
              <MapPinIcon
                aria-hidden="true"
                className="mt-1 size-4 shrink-0 text-gold"
              />
              <span>
                {footer.address}
                <br />
                {footer.seat}
              </span>
            </p>
            <p className="pl-6 font-label text-sm tracking-wide">
              {footer.fiscalCode}
            </p>
          </div>
        </div>

        <ul className="flex flex-col gap-3 text-cream/85">
          <li className="flex items-center gap-2">
            <PhoneIcon
              aria-hidden="true"
              className="size-4 shrink-0 text-gold"
            />
            <span>
              {footer.phoneLabel}{" "}
              <a href={phoneHref} className={linkClass}>
                {footer.phone}
              </a>
            </span>
          </li>
          <li className="flex items-center gap-2">
            <MailIcon
              aria-hidden="true"
              className="size-4 shrink-0 text-gold"
            />
            <span className="min-w-0 break-all">
              {footer.emailLabel}{" "}
              <a href={`mailto:${footer.email}`} className={linkClass}>
                {footer.email}
              </a>
            </span>
          </li>
          <li className="flex items-center gap-2">
            <AtSignIcon
              aria-hidden="true"
              className="size-4 shrink-0 text-gold"
            />
            <span className="min-w-0 break-all">
              {footer.instagramLabel}{" "}
              <a
                href={instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {footer.instagram}
              </a>
            </span>
          </li>
        </ul>

        <ul className="flex flex-col gap-3 font-label text-sm font-semibold tracking-wider uppercase">
          <li>
            <Link
              href={href(locale, "transparency")}
              className="transition-colors hover:text-gold"
            >
              {footer.transparency}
            </Link>
          </li>
          <li>
            <Link
              href={href(locale, "help")}
              className="transition-colors hover:text-gold"
            >
              {footer.help}
            </Link>
          </li>
          <li>
            <InertLink className="tracking-wider uppercase no-underline hover:text-gold">
              {footer.privacy}
            </InertLink>
          </li>
        </ul>
      </div>
      <div aria-hidden="true" className="h-1 bg-gold/80" />
    </footer>
  );
}

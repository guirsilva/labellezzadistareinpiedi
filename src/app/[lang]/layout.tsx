import type { Metadata } from "next";
import { DM_Sans, League_Spartan, Lora } from "next/font/google";
import { type ReactNode, Suspense } from "react";
import { BackButton } from "@/components/layout/back-button";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { NavigationTracker } from "@/components/layout/navigation-tracker";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { href, locales } from "@/i18n/config";
import { getDictionary, resolveLocale } from "@/i18n/dictionaries";
import type { LangParams } from "@/i18n/metadata";
import "../globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LangParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { meta } = getDictionary(locale);
  return {
    title: { default: meta.siteName, template: `%s · ${meta.siteName}` },
    description: meta.description,
    icons: { icon: "/images/logo.png", apple: "/images/logo.png" },
  };
}

type LocaleLayoutProps = LangParams & { children: ReactNode };

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      className={`${lora.variable} ${dmSans.variable} ${leagueSpartan.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <TooltipProvider delayDuration={150}>
          <Suspense fallback={null}>
            <NavigationTracker />
          </Suspense>
          <Navbar locale={locale} dict={dict} />
          <main className="relative flex-1">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-30">
              <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 sm:pt-6">
                <Suspense fallback={null}>
                  <BackButton
                    label={dict.ui.back}
                    homeHref={href(locale, "home")}
                    className="pointer-events-auto"
                  />
                </Suspense>
              </div>
            </div>
            {children}
          </main>
          <Footer locale={locale} dict={dict} />
          <Toaster position="bottom-center" />
        </TooltipProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@treops/ui/lib/utils";
import { I18nProvider, defaultLocale, LOCALE_COOKIE, type Locale } from "@treops/core/i18n";
import { getMessages } from "@/lib/i18n/get-messages";
import "./globals.css";

// This is the canonical marketing origin (treops.ai). The app lives at app.treops.ai.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://treops.ai";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap", preload: false });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", preload: false });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#05070b" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TreOps",
    template: "%s | TreOps",
  },
  description:
    "Open-source platform that turns coding agents into real teammates. Assign tasks, track progress, compound skills.",
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    shortcut: ["/logo.svg"],
  },
  openGraph: {
    type: "website",
    siteName: "TreOps",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@treops_hq",
    creator: "@treops_hq",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(LOCALE_COOKIE)?.value as Locale | undefined;
  const locale = localeCookie || defaultLocale;
  const messages = await getMessages(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn("antialiased font-sans h-full", geist.variable, geistMono.variable)}
    >
      <body className="h-full overflow-hidden">
        <I18nProvider locale={locale} messages={messages}>
          <ThemeProvider>{children}</ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

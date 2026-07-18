import "./globals.css";
import type { Metadata, Viewport } from "next";
import {
  Bodoni_Moda,
  Inter,
  Space_Grotesk,
  JetBrains_Mono,
} from "next/font/google";
import { twMerge } from "tailwind-merge";
import Script from "next/script";
import { Providers } from "./providers";
import { Navbar } from "@/components/site/Navbar";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { CookieConsent } from "@/components/CookieConsent";
import OnlineStatusIndicator from "@/components/OnlineStatusIndicator";

// All three are variable fonts — one file each covers every weight.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-editorial",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://side-portfolio.vercel.app"
  ),
  title: "Yusril Prayoga — Software Engineer",
  description:
    "Full-stack software engineer building data-heavy products end-to-end — Next.js, TypeScript, PostgreSQL, and cloud. Based in Yogyakarta, Indonesia.",
  keywords: [
    "software engineer",
    "full stack developer",
    "portfolio",
    "yusril prayoga",
    "yusrilprayoga",
    "yusrilprayoga-code",
    "next.js developer",
    "typescript developer",
    "indonesia",
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Yusril Prayoga",
  },
  applicationName: "Yusril Prayoga Portfolio",
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/images/profil.JPG" />
      </head>
      <body
        className={twMerge(
          inter.variable,
          spaceGrotesk.variable,
          jetbrainsMono.variable,
          bodoniModa.variable,
          "font-sans antialiased bg-bg text-fg"
        )}
      >
        {/* Service Worker Registration */}
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker
                  .register('/sw.js')
                  .catch(() => {});
              });
            }
          `}
        </Script>

        <Providers>
          <SmoothScroll />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border-2 focus:border-line focus:bg-bg focus:px-4 focus:py-2 focus:font-mono focus:text-sm"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main" className="pt-16">
            {children}
          </main>
          <SiteFooter />
          <OnlineStatusIndicator />
          <CookieConsent
            companyName="Yusril Prayoga Portfolio"
            privacyPolicyUrl="/privacy-policy"
          />
        </Providers>
      </body>
    </html>
  );
}

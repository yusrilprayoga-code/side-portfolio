import { Sidebar } from "@/components/Sidebar";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import OnlineStatusIndicator from "@/components/OnlineStatusIndicator";
import Script from "next/script";


const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Yusril Prayoga - Developer",
  description:
    "Yusril Prayoga is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.",
  keywords: [
    "developer",
    "writer",
    "speaker",
    "digital",
    "remote work",
    "yusrilprayoga",
    "yusrilprayoga-code",
    "portfolio",
    "yusril prayoga",
    "yusrilprayoga code",
    "yusrilprayoga portfolio",
    "yusril prayoga portfolio",
    "yusrilprayoga-code portfolio",
    "yusrilprayoga-code portfolio",
    "yusrilprayoga code portfolio",
    "yusril prayoga tech",
    "yusrilprayoga tech",
    "yusrilprayoga-code tech",
    "yusrilprayoga code tech",
    "yusrilprayoga tech portfolio",
    "yusrilprayoga-code tech portfolio",
    "yusrilprayoga-code tech portfolio",
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Yusril Portfolio",
  },
  applicationName: "Yusril Portfolio",
  formatDetection: {
    telephone: false,
  },
};

// Viewport configuration (Next.js 15+)
export const viewport: Viewport = {
  themeColor: "#3b82f6",
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
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="apple-touch-icon" href="/images/profil.jpg" />
      </head>
      <body
        className={twMerge(
          inter.className,
          "flex antialiased h-screen overflow-hidden bg-gray-100"
        )}
      >
        {/* Service Worker Registration */}
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker
                  .register('/sw.js')
                  .then((registration) => {
                    console.log('Service Worker registered:', registration);
                  })
                  .catch((error) => {
                    console.log('Service Worker registration failed:', error);
                  });
              });
            }
          `}
        </Script>

        <Sidebar />
        <div className="lg:pl-2 lg:pt-2 bg-gray-100 flex-1 overflow-y-auto">
          <div className="flex-1 bg-white min-h-screen lg:rounded-tl-xl border border-transparent lg:border-neutral-200 overflow-y-auto dark:bg-neutral-900">
            {children}
            <Footer />
          </div>
        </div>
        
        {/* Online/Offline Indicator */}
        <OnlineStatusIndicator />
        
        {/* Cookie Consent */}
        <CookieConsent 
          companyName="Yusril Prayoga Portfolio"
          privacyPolicyUrl="/privacy-policy"
        />
      </body>
    </html>
  );
}

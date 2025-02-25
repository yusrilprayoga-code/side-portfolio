import { Sidebar } from "@/components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import SplashCursor from "@/blocks/Animations/SplashCursor/SplashCursor";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          inter.className,
          "flex antialiased h-screen overflow-hidden bg-gray-100"
        )}
      >
        <SplashCursor />
        <Sidebar />
        <div className="lg:pl-2 lg:pt-2 bg-gray-100 flex-1 overflow-y-auto">
          <div className="flex-1 bg-white min-h-screen lg:rounded-tl-xl border border-transparent lg:border-neutral-200 overflow-y-auto dark:bg-neutral-900">
            {children}
            <Analytics />
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}

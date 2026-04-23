import type { Metadata, Viewport } from "next";
import { Source_Serif_4, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import OrganizationSchema from "@/components/seo/OrganizationSchema";

const serif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dothenumberswork.com"),
  title: {
    default: "Do The Numbers Work — Institutional-grade real estate deal analysis",
    template: "%s — Do The Numbers Work",
  },
  description:
    "Run any single-family or small multifamily deal through twenty-three institutional underwriting methodologies. One tool, one report, one defensible answer.",
  applicationName: "Do The Numbers Work",
  authors: [{ name: "Rusty Roof Media", url: "https://dothenumberswork.com/about" }],
  keywords: [
    "real estate deal analyzer",
    "rental property calculator",
    "BRRRR calculator",
    "cap rate",
    "cash on cash return",
    "DSCR",
    "rental property underwriting",
    "is this a good rental property",
  ],
  openGraph: {
    title: "Do The Numbers Work",
    description:
      "Twenty-three underwriting methodologies. One report. A defensible answer in under five minutes.",
    url: "https://dothenumberswork.com",
    siteName: "Do The Numbers Work",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Do The Numbers Work",
    description:
      "Twenty-three underwriting methodologies. One report. A defensible answer in under five minutes.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: "https://dothenumberswork.com" },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#FAF7F1",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-ivory text-ink antialiased">
        <OrganizationSchema />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-navy focus:text-ivory focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="min-h-[60vh]">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}

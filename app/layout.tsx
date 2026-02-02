import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google"; // Using Poppins as primary heading font, Inter for body
import "./globals.css";
import clsx from "clsx";
import { siteConfig } from "@/lib/seo";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  
  // Open Graph
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    alternateLocale: siteConfig.alternateLocales,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@dntourslk",
    images: [siteConfig.ogImage],
  },
  
  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Verification tags (add your verification codes)
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },
  
  // Geographic metadata
  other: {
    "geo.region": "LK",
    "geo.placename": siteConfig.placename,
    "geo.position": siteConfig.position,
    "ICBM": siteConfig.position,
    "language": "English",
    "coverage": "Worldwide",
    "distribution": "Global",
    "rating": siteConfig.rating,
    "revisit-after": "7 days",
    "category": siteConfig.category,
  },
  
  alternates: {
    canonical: siteConfig.url,
  },
  
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Additional SEO tags */}
        <meta name="theme-color" content="#0A2540" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="canonical" href={siteConfig.url} />
      </head>
      <body
        className={clsx(
          poppins.variable,
          inter.variable,
          "antialiased font-body bg-dn-bg text-dn-text"
        )}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InteractiveSpotlight from "../components/InteractiveSpotlight";
import WhatsAppButton from "../components/WhatsAppButton";
import { api } from "../lib/api";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Diggity Agency - Build. Grow. Scale.",
  description: "Diggity adalah agensi digital terintegrasi yang menghadirkan solusi teknologi software engineering, growth marketing, cloud hosting, dan pelatihan keahlian digital untuk meningkatkan performa bisnis Anda.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings = null;
  try {
    settings = await api.getCompanySettings();
  } catch (err) {
    console.error("Failed to load company settings for schema.org:", err);
  }

  const ptName = settings?.company_pt_name || "PT Diggity Digital Internasional";
  const address = settings?.address || "Tangerang, Banten, Indonesia";
  const email = settings?.email || "hello@diggity.com";
  const phone = settings?.whatsapp || "628123456789";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Diggity Agency",
    "alternateName": ptName,
    "url": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/next.svg`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": phone,
      "contactType": "customer service",
      "email": email,
      "areaServed": "ID",
      "availableLanguage": "Indonesian"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address,
      "addressLocality": "Tangerang",
      "addressRegion": "Banten",
      "addressCountry": "ID"
    }
  };

  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased transition-colors duration-300`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="schema-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const currentTheme = localStorage.getItem('theme') || 'light';
                if (currentTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                } else {
                  document.documentElement.classList.add('light');
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
        {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            strategy="lazyOnload"
          />
        )}
      </head>
      <body className="min-h-full flex flex-col text-text-main transition-colors duration-300">
        {/* Glowing background blobs for premium glassmorphic depth */}
        <div className="bg-blob-1" />
        <div className="bg-blob-2" />

        {/* Global interactive mouse spotlight */}
        <InteractiveSpotlight />

        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

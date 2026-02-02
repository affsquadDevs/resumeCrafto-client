import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "ResumeCraftor",
  description: "Create professional resumes with ResumeCraftor",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "ResumeCraftor - Professional Resume Builder",
    description: "Create professional, ATS-optimized resumes in minutes with ResumeCraftor.",
    url: "https://resumecraftor.com",
    siteName: "ResumeCraftor",
    images: [
      {
        url: "/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "ResumeCraftor - Professional Resume Builder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeCraftor - Professional Resume Builder",
    description: "Create professional, ATS-optimized resumes in minutes with ResumeCraftor.",
    images: ["/og/og-image.png"],
  },
};


import { AuthContext } from "@/context/AuthContext";
import { LazyAuthModal } from "@/components/auth/LazyAuthModal";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5TQ4B5WN');`
          }}
        />
        {/* End Google Tag Manager */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2980943706375055"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5TQ4B5WN"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <AuthContext>
          {children}
          <Suspense fallback={null}>
            <LazyAuthModal />
          </Suspense>
        </AuthContext>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://resumecraftor.com/#organization",
              "name": "ResumeCraftor",
              "url": "https://resumecraftor.com/",
              "description": "ResumeCraftor is an online resume and CV builder that helps users create professional, ATS-optimized resumes in minutes.",
              "logo": {
                "@type": "ImageObject",
                "url": "https://resumecraftor.com/logo.png",
                "width": 512,
                "height": 512
              },
              "image": "https://resumecraftor.com/og/og-image.png",
              "sameAs": [
                "https://www.youtube.com/@resumecraftor",
                "https://www.facebook.com/people/ResumeCraftor/61586853676415/",
                "https://www.instagram.com/resumecraftor26"
              ],
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "contactType": "customer support",
                  "email": "support@resumecraftor.com",
                  "availableLanguage": ["en"],
                  "areaServed": "Worldwide"
                }
              ],
              "foundingDate": "2026",
              "areaServed": "Worldwide",
              "knowsAbout": [
                "Resume writing",
                "CV writing",
                "ATS optimization",
                "Job applications",
                "Career development",
                "Create resume",
                "Create CV"
              ]
            })
          }}
        />
      </body>
    </html>
  );
}

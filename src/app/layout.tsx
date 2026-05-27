import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import { SettingsProvider } from "@/context/SettingsContext";
import { Inter, Syne } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maancreatix.com"),

  title: {
    default: "Maan Creatix | Premium Digital Agency",
    template: "%s | Maan Creatix",
  },

  description:
    "Maan Creatix is a premium digital agency offering modern web development, branding, UI/UX design, and custom software solutions for ambitious businesses.",

  keywords: [
    "Maan Creatix",
    "digital agency",
    "web development",
    "branding",
    "UI UX design",
    "software development",
    "Next.js agency",
    "premium web design",
    "graphic design",
  ],

  authors: [{ name: "Maan Creatix" }],

  creator: "Maan Creatix",

  publisher: "Maan Creatix",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://maancreatix.com",
  },

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },

  openGraph: {
    title: "Maan Creatix | Premium Digital Agency",
    description:
      "Premium web development, branding, UI/UX, and software solutions for modern businesses.",
    url: "https://maancreatix.com",
    siteName: "Maan Creatix",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Maan Creatix",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Maan Creatix | Premium Digital Agency",
    description:
      "Premium web development, branding, UI/UX, and software solutions.",
    images: ["/logo.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings: any = {
    site_favicon: "/favicon.png",
    custom_css: "",
    analytics_scripts: "",
    custom_js: "",
  };

  return (
    <html
      lang="en"
      className={`h-full scroll-smooth ${inter.variable} ${syne.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var savedTheme = localStorage.getItem('theme');
                var theme = savedTheme || 'dark';

                if (theme === 'light') {
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.classList.remove('light');
                }
              })();
            `,
          }}
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Maan Creatix",
              url: "https://maancreatix.com",
              logo: "https://maancreatix.com/logo.png",
              sameAs: [
                "https://www.instagram.com/",
                "https://www.linkedin.com/",
              ],
            }),
          }}
        />

        {settings.site_favicon && (
          <link rel="icon" href={settings.site_favicon} />
        )}

        {settings.custom_css && (
          <style
            dangerouslySetInnerHTML={{
              __html: settings.custom_css,
            }}
          />
        )}

        {settings.analytics_scripts && (
          <script
            dangerouslySetInnerHTML={{
              __html: settings.analytics_scripts,
            }}
          />
        )}
      </head>

      <body className="bg-[#050816] text-[#f8fafc] min-h-full flex flex-col font-body antialiased overflow-x-hidden selection:bg-blue-500/30 selection:text-white">
        <LenisProvider>
          <SettingsProvider>{children}</SettingsProvider>
        </LenisProvider>

        {settings.custom_js && (
          <script
            dangerouslySetInnerHTML={{
              __html: settings.custom_js,
            }}
          />
        )}
      </body>
    </html>
  );
}
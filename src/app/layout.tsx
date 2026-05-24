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

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Maan Creatix | Crafting Premium Digital Experiences",
    description: "Maan Creatix is a premium, futuristic digital agency specializing in high-end web development, graphic design, and custom software solutions with interactive dark aesthetics.",
    keywords: ["digital agency", "web development", "graphic design", "software solutions", "luxury UI", "dark mode design", "Next.js development"],
    icons: {
      icon: "/favicon.png",
    }
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings: any = {
    site_favicon: "/favicon.png",
    custom_css: "",
    analytics_scripts: "",
    custom_js: ""
  };

  return (
    <html lang="en" className={`h-full scroll-smooth ${inter.variable} ${syne.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var savedTheme = localStorage.getItem('theme');
            var theme = savedTheme || 'dark';
            if (theme === 'light') {
              document.documentElement.classList.add('light');
            } else {
              document.documentElement.classList.remove('light');
            }
          })();
        ` }} />
        {settings.site_favicon && (
          <link rel="icon" href={settings.site_favicon} />
        )}
        {settings.custom_css && (
          <style dangerouslySetInnerHTML={{ __html: settings.custom_css }} />
        )}
        {settings.analytics_scripts && (
          <script dangerouslySetInnerHTML={{ __html: settings.analytics_scripts }} />
        )}
      </head>
      <body className="bg-[#050816] text-[#f8fafc] min-h-full flex flex-col font-body antialiased overflow-x-hidden selection:bg-blue-500/30 selection:text-white">
        <LenisProvider>
          <SettingsProvider>
            {children}
          </SettingsProvider>
        </LenisProvider>
        {settings.custom_js && (
          <script dangerouslySetInnerHTML={{ __html: settings.custom_js }} />
        )}
      </body>
    </html>
  );
}


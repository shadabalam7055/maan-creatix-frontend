import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import { SettingsProvider } from "@/context/SettingsContext";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
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
  try {
    const res = await fetch('http://127.0.0.1:8000/api/settings', { cache: 'no-store' });
    if (!res.ok) throw new Error();
    const settings = await res.json();
    
    return {
      title: settings.seo_meta_title || "Maan Creatix | Crafting Premium Digital Experiences",
      description: settings.seo_meta_description || "Maan Creatix is a premium, futuristic digital agency specializing in high-end web development, graphic design, and custom software solutions with interactive dark aesthetics.",
      keywords: settings.seo_meta_keywords 
        ? settings.seo_meta_keywords.split(',').map((k: string) => k.trim())
        : ["digital agency", "web development", "graphic design", "software solutions", "luxury UI", "dark mode design", "Next.js development"],
      icons: {
        icon: settings.site_favicon || "/favicon.ico",
      }
    };
  } catch (err) {
    return {
      title: "Maan Creatix | Crafting Premium Digital Experiences",
      description: "Maan Creatix is a premium, futuristic digital agency specializing in high-end web development, graphic design, and custom software solutions with interactive dark aesthetics.",
      keywords: ["digital agency", "web development", "graphic design", "software solutions", "luxury UI", "dark mode design", "Next.js development"],
      icons: {
        icon: "/favicon.ico",
      }
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings: any = {};
  try {
    const res = await fetch('http://127.0.0.1:8000/api/settings', { cache: 'no-store' });
    if (res.ok) {
      settings = await res.json();
    }
  } catch (err) {
    console.error("Failed to fetch layout settings:", err);
  }

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
            <AdminAuthProvider>
              {children}
            </AdminAuthProvider>
          </SettingsProvider>
        </LenisProvider>
        {settings.custom_js && (
          <script dangerouslySetInnerHTML={{ __html: settings.custom_js }} />
        )}
      </body>
    </html>
  );
}

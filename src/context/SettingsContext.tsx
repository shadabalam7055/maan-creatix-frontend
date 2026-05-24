'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Settings {
  site_name?: string;
  site_logo?: string;
  site_favicon?: string;
  hero_badge?: string;
  hero_title?: string;
  hero_description?: string;
  hero_button_primary_text?: string;
  hero_button_secondary_text?: string;
  services_badge?: string;
  services_title?: string;
  services_description?: string;
  pricing_badge?: string;
  pricing_title?: string;
  pricing_description?: string;
  pricing_monthly_discount?: string;
  testimonials_badge?: string;
  testimonials_title?: string;
  contact_badge?: string;
  contact_title?: string;
  contact_phone?: string;
  contact_email?: string;
  contact_address?: string;
  contact_hours?: string;
  contact_whatsapp?: string;
  social_facebook?: string;
  social_instagram?: string;
  social_linkedin?: string;
  social_behance?: string;
  social_dribbble?: string;
  footer_copyright?: string;
  footer_newsletter_title?: string;
  footer_newsletter_desc?: string;
  theme_mode?: string;
  theme_primary_color?: string;
  theme_secondary_color?: string;
  seo_meta_title?: string;
  seo_meta_description?: string;
  seo_meta_keywords?: string;
  section_hero_enabled?: boolean;
  section_services_enabled?: boolean;
  section_projects_enabled?: boolean;
  section_pricing_enabled?: boolean;
  section_testimonials_enabled?: boolean;
  section_cta_enabled?: boolean;
}

const SettingsContext = createContext<{
  settings: Settings;
  loading: boolean;
}>({
  settings: {},
  loading: true,
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    fetch('http://127.0.0.1:8000/api/settings', { cache: 'no-store' })
      .then(res => {
        if (!res.ok) throw new Error('API server down');
        return res.json();
      })
      .then(data => {
        clearTimeout(timer);
        const parsed: Settings = {};
        // Convert string-based booleans to actual boolean types
        Object.keys(data).forEach(key => {
          const val = data[key];
          if (val === 'true') {
            parsed[key as keyof Settings] = true as any;
          } else if (val === 'false') {
            parsed[key as keyof Settings] = false as any;
          } else {
            parsed[key as keyof Settings] = val;
          }
        });

        setSettings(parsed);
        setLoading(false);

        // Apply primary and secondary themes dynamically
        if (parsed.theme_primary_color || parsed.theme_secondary_color) {
          const root = document.documentElement;
          if (parsed.theme_primary_color) {
            root.style.setProperty('--primary-glow', parsed.theme_primary_color);
          }
          if (parsed.theme_secondary_color) {
            root.style.setProperty('--secondary-glow', parsed.theme_secondary_color);
          }
        }
      })
      .catch(() => {
        clearTimeout(timer);
        setLoading(false);
      });

    return () => clearTimeout(timer);
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);

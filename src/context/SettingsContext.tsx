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
  social_twitter?: string;
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

const defaultSettings: Settings = {
  site_name: "Maan Creatix",
  hero_badge: "WELCOME TO MAAN CREATIX",
  hero_title: "We Build Digital Experiences That Grow Brands",
  hero_description: "Maan Creatix is your all-in-one digital partner for web development, graphic design & custom software solutions.",
  hero_button_primary_text: "Start Your Project",
  hero_button_secondary_text: "Explore Projects",
  site_logo: "/logo.png",
  site_favicon: "/icon.png",
  services_badge: "WHAT WE DO",
  services_title: "Our Services",
  services_description: "We provide end-to-end digital solutions for your business growth, combining premium aesthetics with clean architectures.",
  pricing_badge: "OUR PRICING",
  pricing_title: "Simple Pricing",
  pricing_description: "Choose the perfect plan for your business needs. Flexible tiers built around your goals.",
  testimonials_badge: "WHAT CLIENTS SAY",
  testimonials_title: "Client Testimonials",
  contact_badge: "CONTACT MAAN CREATIX",
  contact_title: "Let’s Build Something Amazing Together",
  contact_phone: "+91 6396566630",
  contact_email: "hello@maancreatix.com",
  contact_address: "Amroha, UP, India",
  contact_hours: "Mon - Sat, 10AM - 7PM",
  contact_whatsapp: "https://wa.me/917055953578",
  social_facebook: "#",
  social_instagram: "https://www.instagram.com/maan_creatix?igsh=MXc1ZjZhdmZ4Ym4xOA==",
  social_linkedin: "#",
  social_twitter: "#",
  footer_copyright: "© 2026 Maan Creatix. All rights reserved.",
  section_hero_enabled: true,
  section_services_enabled: true,
  section_projects_enabled: true,
  section_pricing_enabled: true,
  section_testimonials_enabled: true,
  section_cta_enabled: true,
};

const SettingsContext = createContext<{
  settings: Settings;
  loading: boolean;
}>({
  settings: defaultSettings,
  loading: false,
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings] = useState<Settings>(defaultSettings);
  const [loading] = useState(false);

  useEffect(() => {
    // Apply primary and secondary themes dynamically from static config
    if (settings.theme_primary_color || settings.theme_secondary_color) {
      const root = document.documentElement;
      if (settings.theme_primary_color) {
        root.style.setProperty('--primary-glow', settings.theme_primary_color);
      }
      if (settings.theme_secondary_color) {
        root.style.setProperty('--secondary-glow', settings.theme_secondary_color);
      }
    }
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);

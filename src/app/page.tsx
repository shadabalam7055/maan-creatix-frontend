import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Stats from "@/components/Stats";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Web Development Company in India | Maan Creatix",

  description:
    "Maan Creatix is a premium web development company providing modern website development, UI/UX design, branding, graphic design, eCommerce solutions, and custom software development services.",

  keywords: [
    "web development company",
    "website development agency",
    "Next.js development",
    "UI UX design agency",
    "graphic design services",
    "custom software development",
    "eCommerce website development",
    "branding agency",
    "Maan Creatix",
  ],

  alternates: {
    canonical: "https://maancreatix.com",
  },

  openGraph: {
    title: "Web Development Company in India | Maan Creatix",

    description:
      "Premium web development, UI/UX design, branding, eCommerce websites, and software solutions for modern businesses.",

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

    title: "Web Development Company in India | Maan Creatix",

    description:
      "Premium web development, branding, UI/UX design, and software solutions.",

    images: ["/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

const defaultServices = [
  {
    id: 1,
    title: "Web Development",
    description:
      "We build modern, fast & responsive websites that convert visitors into customers.",
    icon: "Code",
    glow_color: "blue",
    link: "/services/website-development",
  },

  {
    id: 2,
    title: "Graphic Design",
    description:
      "Stunning visuals that capture attention and make your brand stand out.",
    icon: "Palette",
    glow_color: "purple",
    link: "/services/graphic-designing",
  },

  {
    id: 3,
    title: "Software Solutions",
    description:
      "Custom software solutions to streamline your business processes.",
    icon: "Cpu",
    glow_color: "orange",
    link: "/services/software-development",
  },
];

const defaultProjects = [
  {
    id: 1,
    title: "E-Commerce Website",

    description:
      "Modern eCommerce website with responsive design and optimized user experience.",

    image_url:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",

    category: "Web Development",

    tags: ["Next.js", "Tailwind", "Laravel"],

    demo_link: "#",

    slug: "ecommerce-website",

    is_featured: true,
  },

  {
    id: 2,
    title: "Restaurant Website",

    description:
      "Responsive restaurant website with custom ordering experience and modern UI design.",

    image_url:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",

    category: "Web Development",

    tags: ["Next.js", "Tailwind", "Framer"],

    demo_link: "#",

    slug: "restaurant-website",

    is_featured: false,
  },
];

const defaultTestimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "CEO",
    company: "TechNove",

    review:
      "Maan Creatix delivered a fantastic website that exceeded our expectations.",

    rating: 5,

    image_url:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
  },

  {
    id: 2,
    name: "Priya Verma",
    role: "Marketing Head",
    company: "Aura Brand",

    review:
      "Creative, modern, and professional designs that perfectly matched our brand.",

    rating: 5,

    image_url:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
  },

  {
    id: 3,
    name: "Vikram Singh",
    role: "Founder",
    company: "Foodies Hub",

    review:
      "Excellent software solutions and great support throughout the project.",

    rating: 5,

    image_url:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
  },
];

const defaultPricing = [
  {
    id: 1,
    name: "Starter Plan",
    subtitle: "Perfect for startups",
    price: "4,999",
    billing_period: "/month",

    features: [
      "5 Pages Website",
      "Responsive Design",
      "Basic SEO",
      "1 Month Support",
    ],

    is_popular: false,
  },

  {
    id: 2,
    name: "Professional Plan",
    subtitle: "Best for growing businesses",
    price: "9,999",
    billing_period: "/month",

    features: [
      "15 Pages Website",
      "Advanced SEO",
      "Custom Animations",
      "Admin Panel",
      "3 Months Support",
    ],

    is_popular: true,
  },

  {
    id: 3,
    name: "Enterprise Plan",
    subtitle: "Advanced business solutions",
    price: "19,999+",
    billing_period: "/month",

    features: [
      "Unlimited Pages",
      "E-commerce Integration",
      "Custom APIs",
      "Priority Support",
      "Dedicated Manager",
    ],

    is_popular: false,
  },
];

const defaultStats = [
  {
    id: 1,
    label: "Happy Clients",
    value: "150+",
    icon: "Users",
  },

  {
    id: 2,
    label: "Projects Completed",
    value: "250+",
    icon: "Briefcase",
  },

  {
    id: 3,
    label: "Years Experience",
    value: "4+",
    icon: "Calendar",
  },

  {
    id: 4,
    label: "Client Satisfaction",
    value: "99%",
    icon: "Award",
  },
];

async function getHomeData() {
  return {
    settings: {
      site_name: "Maan Creatix",

      hero_badge: "PREMIUM DIGITAL AGENCY",

      hero_title:
        "Premium Web Development & Digital Solutions for Modern Brands",

      hero_description:
        "Maan Creatix helps businesses grow with modern web development, branding, UI/UX design, graphic design, and custom software solutions built for performance and scalability.",

      hero_button_primary_text: "Start Your Project",

      hero_button_secondary_text: "Explore Projects",

      section_hero_enabled: true,
      section_services_enabled: true,
      section_projects_enabled: true,
      section_pricing_enabled: true,
      section_testimonials_enabled: true,
      section_cta_enabled: true,
    },

    projects: defaultProjects,

    testimonials: defaultTestimonials,

    pricing: defaultPricing,

    services: defaultServices,

    stats: defaultStats,
  };
}

export default async function Home() {
  const {
    settings,
    projects,
    testimonials,
    pricing,
    services,
    stats,
  } = await getHomeData();

  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What services does Maan Creatix provide?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Maan Creatix provides web development, branding, UI UX design, graphic designing, eCommerce development, and custom software solutions.",
                },
              },

              {
                "@type": "Question",
                name: "Do you create SEO-friendly websites?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. All our websites are optimized for SEO, responsiveness, and performance.",
                },
              },

              {
                "@type": "Question",
                name: "Which technologies do you use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We use Next.js, React, Tailwind CSS, Laravel, Node.js, and scalable cloud technologies.",
                },
              },
            ],
          }),
        }}
      />

      <Navbar settings={settings} />

      <main className="flex-1">
        {settings.section_hero_enabled !== false && (
          <Hero settings={settings} />
        )}

        {settings.section_services_enabled !== false && (
          <Services initialServices={services} />
        )}

        {settings.section_projects_enabled !== false && (
          <Projects initialProjects={projects} />
        )}

        <Stats initialStats={stats} />

        <Process />

        {settings.section_pricing_enabled !== false && (
          <Pricing initialPlans={pricing} />
        )}

        {settings.section_testimonials_enabled !== false && (
          <Testimonials initialTestimonials={testimonials} />
        )}

        {/* SEO Content Section */}
        <section className="max-w-6xl mx-auto px-6 py-20 text-gray-300">
          <h2 className="text-4xl font-bold mb-8 text-white">
            Premium Web Development Company for Modern Businesses
          </h2>

          <div className="space-y-6 text-lg leading-8">
            <p>
              Maan Creatix is a premium web development company specializing in
              modern websites, branding, UI/UX design, graphic design, and
              custom software development services.
            </p>

            <p>
              We build SEO-friendly, responsive, and high-performance websites
              designed to improve user experience, business growth, and online
              visibility.
            </p>

            <p>
              From business websites and eCommerce stores to scalable custom
              software systems, we create digital experiences focused on
              performance and conversions.
            </p>

            <p>
              Our team works with modern technologies including Next.js, React,
              Tailwind CSS, Laravel, and scalable backend systems.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold text-white mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                What services does Maan Creatix provide?
              </h3>

              <p className="text-gray-300 leading-7">
                We provide website development, UI/UX design, branding,
                eCommerce development, graphic design, and custom software
                solutions.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                Do you create SEO-friendly websites?
              </h3>

              <p className="text-gray-300 leading-7">
                Yes. Every website is optimized for SEO, speed, responsiveness,
                and performance.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                Which technologies do you use?
              </h3>

              <p className="text-gray-300 leading-7">
                We use modern technologies including Next.js, React, Tailwind
                CSS, Node.js, and Laravel.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                Do you offer custom software development?
              </h3>

              <p className="text-gray-300 leading-7">
                Yes. We build scalable custom software, dashboards, and business
                automation systems tailored to client needs.
              </p>
            </div>
          </div>
        </section>

        <ContactForm />
      </main>

      <Footer settings={settings} />
    </>
  );
}
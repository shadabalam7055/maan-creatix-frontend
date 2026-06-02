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
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

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
  // {
  //   id: 1,
  //   name: "Rahul Sharma",
  //   role: "CEO",
  //   company: "TechNove",

  //   review:
  //     "Maan Creatix delivered a fantastic website that exceeded our expectations.",

  //   rating: 5,

  //   image_url:
  //     "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
  // },

  // {
  //   id: 2,
  //   name: "Priya Verma",
  //   role: "Marketing Head",
  //   company: "Aura Brand",

  //   review:
  //     "Creative, modern, and professional designs that perfectly matched our brand.",

  //   rating: 5,

  //   image_url:
  //     "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
  // },

  // {
  //   id: 3,
  //   name: "Vikram Singh",
  //   role: "Founder",
  //   company: "Foodies Hub",

  //   review:
  //     "Excellent software solutions and great support throughout the project.",

  //   rating: 5,

  //   image_url:
  //     "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
  // },
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
    value: "5",
    icon: "Users",
  },

  {
    id: 2,
    label: "Projects Completed",
    value: "5",
    icon: "Briefcase",
  },

  {
    id: 3,
    label: "Years Experience",
    value: "1",
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
      section_testimonials_enabled: false,
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
        <section className="pt-32 pb-20 relative overflow-hidden flex items-center justify-center min-h-[90vh] bg-[#050816]">
  {/* Glow Effects */}
  <div className="absolute w-[600px] h-[600px] bg-blue-500/10 blur-3xl rounded-full -top-40 -left-40" />
  <div className="absolute w-[600px] h-[600px] bg-purple-500/10 blur-3xl rounded-full top-1/3 -right-20" />

  <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-center">
    {/* LEFT SIDE */}
    <div className="lg:col-span-7 space-y-6">
      {/* Badge */}
      <div className="inline-flex items-center space-x-2 bg-blue-500/5 border border-blue-500/15 px-4 py-2 rounded-full backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />

        <span className="text-[10px] md:text-xs font-bold text-blue-300 uppercase tracking-[0.25em]">
          PREMIUM DIGITAL AGENCY
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.92] font-heading">
        <span className="text-white">
          Premium Web
        </span>

        <br />

        <span className="text-white">
          Development
        </span>

        <br />

        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
          & Digital
        </span>

        <br />

        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Solutions For
        </span>

        <br />

        <span className="text-white">
          Modern Brands
        </span>
      </h1>

      {/* Description */}
      <p className="text-base md:text-lg text-slate-400 font-light leading-8 max-w-2xl">
        Maan Creatix helps businesses grow with modern web development,
        branding, UI/UX design, graphic design, and scalable software solutions
        built for performance and conversions.
      </p>

      {/* Buttons */}
      {/* Buttons */}
<div className="flex flex-wrap gap-4 pt-2 relative z-50">
  <Link
    href="/contact"
    className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:scale-[1.03] transition-all shadow-[0_0_30px_rgba(59,130,246,0.25)] inline-flex items-center justify-center"
  >
    Start Your Project
  </Link>

  <Link
    href="/projects"
    className="px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-slate-300 hover:bg-white/10 transition-all inline-flex items-center justify-center"
  >
    Explore Projects
  </Link>
</div>

      {/* Pills */}
      <div className="flex flex-wrap gap-3 pt-6">
        {[
          "Next.js",
          "React",
          "Tailwind CSS",
          "UI/UX",
          "SEO",
          "Performance",
        ].map((item) => (
          <span
            key={item}
            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 hover:border-blue-500/30 transition-all"
          >
            {item}
          </span>
        ))}
      </div>
    </div>

    {/* RIGHT SIDE */}
    {/* RIGHT HERO VISUAL */}
<div className="lg:col-span-5 relative w-full h-[350px] md:h-[450px] flex items-center justify-center">
  <div className="relative w-full h-full flex items-center justify-center">
    
    {/* Circle Rings */}
    <div className="absolute w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full border border-blue-500/10 shadow-[0_0_80px_rgba(59,130,246,0.12)] flex items-center justify-center">
      <div className="absolute w-[180px] h-[180px] rounded-full border border-purple-500/10 shadow-[0_0_40px_rgba(139,92,246,0.08)]" />
    </div>

    {/* Main Screen */}
    <div className="absolute w-[220px] md:w-[280px] aspect-video bg-slate-900/80 border border-white/10 rounded-2xl p-3 shadow-2xl backdrop-blur-md z-20 flex flex-col justify-between">
      
      {/* Browser Top */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <div className="flex space-x-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
          <span className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
        </div>

        <span className="text-[8px] text-slate-500 uppercase tracking-widest font-semibold">
          Maan Creatix
        </span>
      </div>

      {/* Content */}
      <div className="py-4 space-y-2 flex-1 flex flex-col justify-center">
        <div className="h-2 w-3/4 bg-blue-500/20 rounded" />
        <div className="h-2 w-1/2 bg-purple-500/20 rounded" />
        <div className="h-2 w-5/6 bg-white/5 rounded" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[8px] text-slate-500">
        <span>99% Client Satisfaction</span>

        <span className="text-emerald-400">
          Live
        </span>
      </div>
    </div>

    {/* Floating Card 1 */}
    <div className="absolute top-10 right-4 md:right-10 bg-white/5 border border-white/10 rounded-2xl p-4 shadow-xl backdrop-blur-md z-30">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
          <span className="text-blue-400 text-lg">
            &lt;/&gt;
          </span>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Web Development
          </h4>

          <p className="text-[10px] text-slate-400 mt-1">
            Modern & Responsive Websites
          </p>
        </div>
      </div>
    </div>

    {/* Floating Card 2 */}
    <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/5 border border-white/10 rounded-2xl p-4 shadow-xl backdrop-blur-md z-30">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
          <span className="text-purple-400 text-lg">
            ✦
          </span>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Graphic Design
          </h4>

          <p className="text-[10px] text-slate-400 mt-1">
            Creative Designs That Inspire
          </p>
        </div>
      </div>
    </div>

    {/* Floating Card 3 */}
    <div className="absolute bottom-10 right-6 md:right-14 bg-white/5 border border-white/10 rounded-2xl p-4 shadow-xl backdrop-blur-md z-30">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
          <span className="text-orange-400 text-lg">
            ⚙
          </span>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Software Solutions
          </h4>

          <p className="text-[10px] text-slate-400 mt-1">
            Powerful Enterprise Apps
          </p>
        </div>
      </div>
    </div>

    {/* Glow Orb */}
    <div className="absolute w-40 h-40 rounded-full bg-blue-500/20 blur-3xl -z-10" />
  </div>
</div>
  </div>
</section>

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

        {/* SEO CONTENT SECTION */}
{/* <section className="relative overflow-hidden py-24 border-t border-white/5 bg-[#050816]"> */}
  {/* Glow Effects */}
  {/* <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-3xl rounded-full" /> */}
  {/* <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-purple-500/10 blur-3xl rounded-full" /> */}

  {/* <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10"> */}
    {/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"> */}
      {/* LEFT CONTENT */}
      {/* <div className="lg:col-span-7"> */}
        {/* Badge */}
        {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-md mb-6"> */}
          {/* <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" /> */}

          {/* <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold text-blue-300"> */}
            {/* PREMIUM DIGITAL AGENCY */}
          {/* </span> */}
        {/* </div> */}

        {/* Heading */}
        {/* <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight mb-8"> */}
          {/* <span className="text-white"> */}
            {/* Premium Web Development */}
          {/* </span> */}

          {/* <br /> */}

          {/* <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"> */}
            {/* Company For Modern Businesses */}
          {/* </span> */}
        {/* </h2> */}

        {/* Description */}
        {/* <div className="space-y-6 max-w-3xl">
          <p className="text-base md:text-lg leading-8 text-slate-400 font-light">
            Maan Creatix is a premium web development company focused on
            building high-performance digital experiences, modern business
            websites, UI/UX systems, branding solutions, and scalable software
            products for startups and growing businesses.
          </p> */}

          {/* <p className="text-base md:text-lg leading-8 text-slate-400 font-light">
            We combine modern engineering with luxury dark-mode aesthetics to
            create websites that are visually powerful, SEO optimized,
            conversion focused, and built for long-term scalability.
          </p> */}

          {/* <p className="text-base md:text-lg leading-8 text-slate-400 font-light">
            From eCommerce platforms and portfolio websites to dashboards and
            custom software systems, we create digital products that improve
            user experience, online visibility, and business growth.
          </p>

          <p className="text-base md:text-lg leading-8 text-slate-400 font-light">
            Our development stack includes Next.js, React, Tailwind CSS,
            Laravel, scalable backend architectures, Framer Motion, and
            cloud-ready modern technologies.
          </p>
        </div> */}

        {/* Pills */}
        {/* <div className="flex flex-wrap gap-3 pt-8">
          {[
            "Next.js",
            "React",
            "Tailwind CSS",
            "Laravel",
            "SEO Optimized",
            "Fast Performance",
          ].map((item) => (
            <span
              key={item}
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 hover:border-blue-500/30 hover:bg-white/10 transition-all"
            >
              {item}
            </span>
          ))}
        </div>
      </div> */}

      {/* RIGHT VISUAL */}
      {/* <div className="lg:col-span-5 relative flex items-center justify-center">
        <div className="relative w-full max-w-[420px] aspect-square">
          {/* Main Card */}
          {/* <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 backdrop-blur-xl shadow-[0_0_60px_rgba(59,130,246,0.15)] overflow-hidden"> */}
            {/* Top Bar */}
            {/* <div className="flex items-center justify-between px-6 py-4 border-b border-white/5"> */}
              {/* <div className="flex gap-2"> */}
                {/* <span className="w-3 h-3 rounded-full bg-red-500/70" /> */}
                {/* <span className="w-3 h-3 rounded-full bg-yellow-500/70" /> */}
                {/* <span className="w-3 h-3 rounded-full bg-green-500/70" /> */}
              {/* </div> */}

              {/* <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                maancreatix.com
              </span>
            </div> */} 

            {/* Fake Content */}
            {/* <div className="p-8 flex flex-col gap-6">
              <div className="space-y-3">
                <div className="h-3 rounded-full bg-blue-500/20 w-3/4" />
                <div className="h-3 rounded-full bg-purple-500/20 w-1/2" />
                <div className="h-3 rounded-full bg-white/10 w-full" />
                <div className="h-3 rounded-full bg-white/10 w-5/6" />
              </div> */}

              {/* Stats */}
              {/* <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                  <span className="block text-3xl font-extrabold text-white">
                    99%
                  </span>

                  <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
                    Client Satisfaction
                  </span>
                </div>

                <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                  <span className="block text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    150+
                  </span>

                  <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
                    Projects Delivered
                  </span>
                </div>
              </div> */}

              {/* Bottom */}
              {/* <div className="rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 p-5 mt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-bold text-lg">
                      Modern UI/UX
                    </h4>

                    <p className="text-sm text-slate-400 mt-1">
                      Premium interfaces built for performance.
                    </p>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                    <FiArrowRight className="text-blue-300 text-xl" />
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* Floating Card */}
          {/* <div className="absolute -top-6 -right-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-5 shadow-2xl">
            <span className="block text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">
              SEO SCORE
            </span>

            <span className="text-3xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              A+
            </span>
          </div> */}

          {/* Floating Card */}
          {/* <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-5 shadow-2xl">
            <span className="block text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">
              PERFORMANCE
            </span>

            <span className="text-3xl font-extrabold text-white">
              Fast
            </span>
          </div>
        </div>
      </div> */}
    {/* </div> */}
  {/* </div> */}
{/* </section> */}

{/* FAQ SECTION */}
<section className="relative overflow-hidden py-24 border-t border-white/5 bg-[#050816]">
  {/* Glow Background */}
  <div className="absolute left-0 top-1/4 w-[400px] h-[400px] bg-purple-500/10 blur-3xl rounded-full" />
  <div className="absolute right-0 bottom-1/4 w-[400px] h-[400px] bg-blue-500/10 blur-3xl rounded-full" />

  <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
    {/* Badge */}
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 backdrop-blur-md mb-6">
      <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />

      <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold text-purple-300">
        FAQ SECTION
      </span>
    </div>

    {/* Heading */}
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight mb-14">
      <span className="text-white">
        Frequently Asked
      </span>

      <br />

      <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
        Questions
      </span>
    </h2>

    {/* FAQ Cards */}
    <div className="space-y-6">
      {[
        {
          question: "What services does Maan Creatix provide?",
          answer:
            "We provide website development, UI/UX design, branding, eCommerce website development, graphic design, and scalable custom software solutions.",
        },

        {
          question: "Do you create SEO-friendly websites?",
          answer:
            "Yes. Every website is optimized for SEO, performance, responsiveness, accessibility, and fast loading speed.",
        },

        {
          question: "Which technologies do you use?",
          answer:
            "We use modern technologies including Next.js, React, Tailwind CSS, Laravel, Framer Motion, Node.js, and scalable backend systems.",
        },

        {
          question: "Do you offer custom software development?",
          answer:
            "Yes. We build custom dashboards, admin panels, automation systems, CRM software, and scalable business solutions tailored to client requirements.",
        },
      ].map((faq, index) => (
        <div
          key={index}
          className="group rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 hover:border-blue-500/30 hover:bg-white/[0.05] transition-all duration-300 shadow-xl"
        >
          <div className="flex gap-5">
            {/* Number */}
            <div className="min-w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
              <span className="text-lg font-bold text-blue-300">
                0{index + 1}
              </span>
            </div>

            {/* Content */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                {faq.question}
              </h3>

              <p className="text-slate-400 leading-8 text-base font-light">
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

        <ContactForm />
      </main>

      <Footer settings={settings} />
    </>
  );
}
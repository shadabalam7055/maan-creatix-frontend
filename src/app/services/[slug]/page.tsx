'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowRight, 
  FiCheck, 
  FiCode, 
  FiMonitor, 
  FiBriefcase, 
  FiCpu, 
  FiPenTool, 
  FiActivity, 
  FiDatabase, 
  FiUsers, 
  FiAward, 
  FiTarget, 
  FiStar, 
  FiChevronDown, 
  FiCheckCircle, 
  FiClock, 
  FiShield, 
  FiMessageSquare
} from 'react-icons/fi';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Typings
interface ServiceFeature {
  title: string;
  description: string;
  icon: string;
}

interface ServiceData {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: string;
  glow_color: string;
  image: string;
  hero_title: string;
  hero_description: string;
  features: ServiceFeature[];
  seo_title: string;
  seo_description: string;
}

interface ProjectData {
  id: number;
  title: string;
  description: string;
  image_url: string;
  category: string;
  tags: string[];
  demo_link: string;
}

interface PricingData {
  id: number;
  name: string;
  subtitle: string;
  price: string;
  billing_period: string;
  features: string[];
  is_popular: boolean;
}

interface FaqData {
  id: number;
  question: string;
  answer: string;
}

interface TestimonialData {
  id: number;
  name: string;
  role: string;
  company: string;
  review: string;
  rating: number;
  image_url?: string;
}

// Icon mapper
const iconMap: Record<string, React.ComponentType<any>> = {
  Code: FiCode,
  Monitor: FiMonitor,
  Briefcase: FiBriefcase,
  Cpu: FiCpu,
  PenTool: FiPenTool,
  Palette: FiPenTool,
  Activity: FiActivity,
  Database: FiDatabase,
  Users: FiUsers,
  Award: FiAward,
  Target: FiTarget,
  Clock: FiClock,
  Shield: FiShield,
};

// Complete fallbacks matching seeded data
const fallbackServices: Record<string, { service: ServiceData; projects: ProjectData[]; pricing: PricingData[]; faqs: FaqData[] }> = {
  'website-development': {
    service: {
      id: 1,
      title: 'Website Development',
      slug: 'website-development',
      description: 'Custom Next.js & React websites built for high-performance and gorgeous user experiences.',
      icon: 'Code',
      glow_color: 'blue',
      image: 'https://images.unsplash.com/photo-1547658719-da2b81169d42?auto=format&fit=crop&w=800&q=80',
      hero_title: 'Next-Gen Web Applications Custom Engineered for Scale',
      hero_description: 'We design and code fast, beautiful websites that engage users and convert. Fusing Next.js App Router with custom Tailwind styling results in blazing fast load times and clean layout animations.',
      features: [
        { title: 'Server-Side Rendering', description: 'Instant loads and pre-rendered SEO performance.', icon: 'Activity' },
        { title: 'Responsive Layouts', description: 'Looks stunning on 320px mobile to ultra-wide desktop monitors.', icon: 'Monitor' },
        { title: 'Clean Architecture', description: 'Type-safe codebase using clean modular structures.', icon: 'Code' }
      ],
      seo_title: 'Custom Website Development Services | Maan Creatix',
      seo_description: 'Get custom Next.js and React web applications built by premium engineers for scale and speed.'
    },
    projects: [
      {
        id: 1,
        title: 'Web App Portal',
        description: 'Blazing fast customer portal built with Next.js Server Components and edge caching.',
        image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
        category: 'Web Development',
        tags: ['Next.js', 'Tailwind', 'Laravel'],
        demo_link: '#'
      }
    ],
    pricing: [
      {
        id: 1,
        name: 'Standard Website',
        subtitle: 'For startups & local companies',
        price: '4,999',
        billing_period: '/project',
        features: ['5 Custom Pages', 'Responsive layout grid', 'Standard SEO', '1 Month support'],
        is_popular: false
      },
      {
        id: 2,
        name: 'Premium Web Portal',
        subtitle: 'Complete dynamic framework',
        price: '9,999',
        billing_period: '/project',
        features: ['Unlimited custom pages', 'Next.js SSR optimization', 'Advanced SEO & Schema', '6 Months support', 'Framer motion layouts'],
        is_popular: true
      }
    ],
    faqs: [
      { id: 1, question: 'Which frameworks do you use for website development?', answer: 'We primarily build our frontend projects using Next.js and React, styled with Tailwind CSS, and powered by Laravel or Node.js backends.' },
      { id: 2, question: 'How long does a website development project take?', answer: 'A typical corporate or custom marketing website takes between 4 to 8 weeks, including visual wireframing, frontend styling, backend hookups, and performance tuning.' },
      { id: 3, question: 'Do you provide maintenance and updates post launch?', answer: 'Yes, all of our service plans include 1 to 6 months of comprehensive support to manage database backups, dependencies, and layout tweaks.' }
    ]
  },
  'ecommerce-development': {
    service: {
      id: 2,
      title: 'E-Commerce Website Development',
      slug: 'ecommerce-development',
      description: 'High-conversion online stores with Stripe payment integration and seamless checkouts.',
      icon: 'Monitor',
      glow_color: 'purple',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&w=800&q=80',
      hero_title: 'Immersive Digital Commerce Built for High Conversions',
      hero_description: 'Unlock modern online selling with lightning fast checkouts, dynamic cart controls, and rich media assets that elevate your brand narrative.',
      features: [
        { title: 'Instant Checkouts', description: 'Integrated Stripe/PayPal payments with minimum friction.', icon: 'Award' },
        { title: 'Dynamic Cart Systems', description: 'Client-side state tracking with micro-interactions.', icon: 'Activity' },
        { title: 'SEO Optimized Catalogs', description: 'Pre-rendered item pages that rank high on Google indexers.', icon: 'Target' }
      ],
      seo_title: 'Premium E-Commerce Development Studio | Maan Creatix',
      seo_description: 'Establish a luxury online storefront with swift checkout systems and customized designs.'
    },
    projects: [
      {
        id: 2,
        title: 'Luxury Storefront',
        description: 'Fast e-commerce portal with dark glass aesthetics, dynamic card reveals, and quick Stripe checkout.',
        image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
        category: 'E-Commerce Website Development',
        tags: ['Next.js', 'Stripe', 'Laravel'],
        demo_link: '#'
      }
    ],
    pricing: [
      {
        id: 3,
        name: 'Startup Shop',
        subtitle: 'Stripe storefront setup',
        price: '7,999',
        billing_period: '/project',
        features: ['Up to 50 Products', 'Standard shopping cart', 'Stripe payment gate', 'Mobile viewport optimization'],
        is_popular: false
      },
      {
        id: 4,
        name: 'Enterprise Market',
        subtitle: 'High-conversion online market',
        price: '14,999',
        billing_period: '/project',
        features: ['Unlimited products', 'Client state cart analytics', 'Stripe & PayPal keys', 'Product inventory manager', 'Dynamic discount codes'],
        is_popular: true
      }
    ],
    faqs: [
      { id: 4, question: 'Can you integrate custom payment systems?', answer: 'Yes, we integrate global payment gateways such as Stripe, PayPal, Razorpay, and custom bank APIs with full security compliance.' },
      { id: 5, question: 'Is our online product catalog manageable via admin panel?', answer: 'Absolutely. The Laravel admin dashboard lets you edit products, upload multiple photos, adjust stock metrics, and manage orders dynamically.' },
      { id: 6, question: 'How do you secure e-commerce user databases?', answer: 'We enforce strict SSL encryption, tokenize payment credentials, and secure all user login credentials using Laravel Sanctum hash tokens.' }
    ]
  },
  'business-website-development': {
    service: {
      id: 3,
      title: 'Business Website Development',
      slug: 'business-website-development',
      description: 'Professional corporate websites with dynamic CMS structures to showcase authority.',
      icon: 'Briefcase',
      glow_color: 'orange',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      hero_title: 'Corporate Authority Styled with Premium Visual Aesthetics',
      hero_description: 'Establish a commanding digital presence that highlights your values, case studies, and services. Perfect for consulting firms, startups, and enterprises.',
      features: [
        { title: 'Corporate CMS', description: 'Easily manage team sheets, timeline stories, and blogs.', icon: 'Users' },
        { title: 'Lead Magnet Forms', description: 'Highly engaging contact forms integrated directly to CRM.', icon: 'Award' },
        { title: 'Interactive Timelines', description: 'Chronological story charts showing company growth.', icon: 'Activity' }
      ],
      seo_title: 'Business & Corporate Website Development | Maan Creatix',
      seo_description: 'Upgrade your business website with glassmorphism layouts, clean content CMS, and SEO.'
    },
    projects: [
      {
        id: 3,
        title: 'Enterprise Corporate Portal',
        description: 'Authority corporate platform with custom blog editor, lead telemetry, and interactive timeline grids.',
        image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        category: 'Business Website Development',
        tags: ['React', 'Laravel', 'Tailwind'],
        demo_link: '#'
      }
    ],
    pricing: [],
    faqs: [
      { id: 7, question: 'Will we be able to post blog articles ourselves?', answer: 'Yes, a custom CMS blog post editor is included in the admin control board for publishing blog articles, news, and project details.' },
      { id: 8, question: 'Do you optimize business sites for search engines?', answer: 'Every corporate website undergoes standard on-page SEO optimization. We target speed performance, schema tags, meta tags, and indexing configurations.' },
      { id: 9, question: 'Can we embed client feedback forms?', answer: 'Yes, contact forms and custom inquiry sheets are integrated directly with email alerts or your internal CRM dashboard.' }
    ]
  },
  'software-development': {
    service: {
      id: 4,
      title: 'Software Development',
      slug: 'software-development',
      description: 'Bespoke web applications, CRM databases, and interactive real-time control panels.',
      icon: 'Cpu',
      glow_color: 'blue',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80',
      hero_title: 'Bespoke Custom Software Engineered for Enterprise Workflows',
      hero_description: 'Optimize your internal processes with custom database schemas, API connections, and real-time dashboard analytics.',
      features: [
        { title: 'REST API Systems', description: 'Robust backend architectures using Laravel 11 and Sanctum.', icon: 'Cpu' },
        { title: 'Real-Time Data', description: 'Dynamic state tracking with instant dashboard updates.', icon: 'Activity' },
        { title: 'SQLite/MySQL Integration', description: 'Highly optimized database architectures for rapid read/write.', icon: 'Database' }
      ],
      seo_title: 'Bespoke Software Engineering & Dashboards | Maan Creatix',
      seo_description: 'Build custom dashboard software, APIs, and business databases using Next.js and Laravel.'
    },
    projects: [
      {
        id: 4,
        title: 'Telemetry Control Panel',
        description: 'Real-time software dashboard featuring instant chart metrics, database optimization, and REST API access keys.',
        image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        category: 'Software Development',
        tags: ['Laravel', 'SQL', 'WebSockets'],
        demo_link: '#'
      }
    ],
    pricing: [
      {
        id: 5,
        name: 'Custom API Core',
        subtitle: 'Backend database & endpoints',
        price: '9,999',
        billing_period: '/project',
        features: ['Laravel 11 backend api', 'SQL database schema', 'Sanctum auth keys', 'Full documentation'],
        is_popular: false
      },
      {
        id: 6,
        name: 'Full Telemetry Dashboard',
        subtitle: 'Complete software telemetry',
        price: '19,999',
        billing_period: '/project',
        features: ['Laravel API backend', 'Next.js frontend admin', 'Interactive charts & telemetry', 'Websocket real-time updates', 'Unlimited API integrations'],
        is_popular: true
      }
    ],
    faqs: [
      { id: 10, question: 'What is custom software development?', answer: 'Bespoke applications designed specifically for your organization\'s workflows, such as CRM systems, real-time control panels, or telemetry platforms.' },
      { id: 11, question: 'Can Next.js connect directly to external databases?', answer: 'We build Next.js frontends that call Laravel Rest APIs, which manage authentication, validations, and database read/write queries safely.' },
      { id: 12, question: 'Do you support dashboard visual graphs?', answer: 'Yes, we develop interactive telemetry screens using Chart.js, Recharts, and custom motion canvas libraries.' }
    ]
  },
  'graphic-designing': {
    service: {
      id: 5,
      title: 'Graphic Designing',
      slug: 'graphic-designing',
      description: 'Futuristic brand books, pitch decks, vector illustrations, and gorgeous social assets.',
      icon: 'Palette',
      glow_color: 'purple',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      hero_title: 'High-End Futuristic Visual Designs that Command Attention',
      hero_description: 'Stand out with visual identities curated by award-winning designers. We shape digital brand guides, modern typography sheets, and dark-mode pitch decks.',
      features: [
        { title: 'Visual Identity Guides', description: 'Curated color swatches, typography rules, and logomarks.', icon: 'Palette' },
        { title: 'Social Media Kits', description: 'High contrast templates built for aesthetic post hooks.', icon: 'Award' },
        { title: 'Start-Up Pitch Decks', description: 'Gorgeous slides that explain complex telemetry clearly.', icon: 'Activity' }
      ],
      seo_title: 'Premium Brand Graphic Design Services | Maan Creatix',
      seo_description: 'Get creative digital designs, logo guides, and dark ambient visual boards for your business.'
    },
    projects: [
      {
        id: 5,
        title: 'Cosmic Branding Deck',
        description: 'A comprehensive visual design guide, typography swatches, and logo layout guide for a futuristic tech client.',
        image_url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
        category: 'Graphic Designing',
        tags: ['Branding', 'Figma', 'Vector'],
        demo_link: '#'
      }
    ],
    pricing: [],
    faqs: [
      { id: 13, question: 'What files do you deliver in brand identity guides?', answer: 'We provide vector files (SVG, EPS), high-res PDFs, typography font packages, color guide booklets, and raw Figma or Illustrator projects.' },
      { id: 14, question: 'Do you design custom icons?', answer: 'Yes, we craft custom SVG logomarks and graphics that match your futuristic neon branding perfectly.' },
      { id: 15, question: 'Do you provide mockups for merchandise?', answer: 'Yes, we deliver 3D apparel and device mockups showing your logo and graphics in context.' }
    ]
  },
  'ui-ux-designing': {
    service: {
      id: 6,
      title: 'UI/UX Designing',
      slug: 'ui-ux-designing',
      description: 'Interactive Figma mockups, user research flows, and premium high-fidelity wireframes.',
      icon: 'PenTool',
      glow_color: 'orange',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80',
      hero_title: 'Immersive High-Fidelity UI/UX Curated in Figma',
      hero_description: 'Before writing a single line of code, we design every pixel, overlay, and scroll event. Our user flows focus on intuitive ergonomics and visual luxury.',
      features: [
        { title: 'Interactive Prototypes', description: 'Figma wireframes with realistic slide/click triggers.', icon: 'PenTool' },
        { title: 'Aesthetic Dark Themes', description: 'Custom layout patterns leveraging neon glow and shadows.', icon: 'Monitor' },
        { title: 'Ergonomic User Journeys', description: 'Optimized checkout screens and clean side-sheet menus.', icon: 'Users' }
      ],
      seo_title: 'Figma UI/UX Prototyping & Layout Audits | Maan Creatix',
      seo_description: 'Interactive UI mockups, responsive website wireframes, and luxury dark user experiences.'
    },
    projects: [
      {
        id: 6,
        title: 'Glassmorphic Design Audit',
        description: 'Clickable wireframes, visual audit diagrams, and checkout screen blueprints created for a leading startup client.',
        image_url: 'https://images.unsplash.com/photo-1541462608141-2ff538ae4b2e?auto=format&fit=crop&w=800&q=80',
        category: 'UI/UX Designing',
        tags: ['Figma', 'Wireframes', 'UX Audit'],
        demo_link: '#'
      }
    ],
    pricing: [],
    faqs: [
      { id: 16, question: 'What is the design process in Figma?', answer: 'We begin with low-fidelity structure layouts, move to high-fidelity glassmorphic designs, and deliver clickable, animated prototype models.' },
      { id: 17, question: 'Do you review existing websites for UX problems?', answer: 'Yes, we perform comprehensive user audits to highlight layout overlap issues, text sizing errors, and bottleneck checkout points.' },
      { id: 18, question: 'Can developers import designs easily from Figma?', answer: 'Absolutely. We organize layers with auto-layouts, clean variables, and standard spacing tokens so your developer team gets exact CSS layouts.' }
    ]
  }
};

const fallbackTestimonials: TestimonialData[] = [
  { id: 1, name: 'Rahul Sharma', role: 'CEO', company: 'TechNove', review: 'Maan Creatix delivered a fantastic website that exceeded our expectations. Highly professional and on-time delivery!', rating: 5, image_url: '/images/testimonials/avatar1.png' },
  { id: 2, name: 'Priya Verma', role: 'Marketing Head', company: 'Aura Brand', review: 'The designs were creative, modern and exactly what our brand needed. Great experience!', rating: 5, image_url: '/images/testimonials/avatar2.png' },
  { id: 3, name: 'Vikram Singh', role: 'Founder', company: 'Foodies Hub', review: 'Their software solution helped us manage our business efficiently. Excellent work and support!', rating: 5, image_url: '/images/testimonials/avatar3.png' }
];

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  const [loading, setLoading] = useState(true);
  const [service, setService] = useState<ServiceData | null>(null);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [pricingPlans, setPricingPlans] = useState<PricingData[]>([]);
  const [faqs, setFaqs] = useState<FaqData[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialData[]>(fallbackTestimonials);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`http://127.0.0.1:8000/api/services/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('API server down');
        return res.json();
      })
      .then((data) => {
        if (data.service) {
          // Parse features JSON in case it returns as a string from DB
          let parsedFeatures = data.service.features;
          if (typeof parsedFeatures === 'string') {
            try {
              parsedFeatures = JSON.parse(parsedFeatures);
            } catch (e) {
              parsedFeatures = [];
            }
          }
          setService({
            ...data.service,
            features: Array.isArray(parsedFeatures) ? parsedFeatures : []
          });
        }
        if (Array.isArray(data.projects)) setProjects(data.projects);
        if (Array.isArray(data.pricing_plans)) setPricingPlans(data.pricing_plans);
        if (Array.isArray(data.faqs)) setFaqs(data.faqs);
        if (Array.isArray(data.testimonials) && data.testimonials.length > 0) setTestimonials(data.testimonials);
        setLoading(false);
      })
      .catch(() => {
        // Use seeded fallback content
        const fb = fallbackServices[slug];
        if (fb) {
          setService(fb.service);
          setProjects(fb.projects);
          setPricingPlans(fb.pricing);
          setFaqs(fb.faqs);
        }
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-[#050816] text-white min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-t-2 border-blue-500 rounded-full animate-spin" />
          <span className="text-xs font-semibold text-slate-500 tracking-wider">Loading Immersive Interface...</span>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="bg-[#050816] text-white min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto text-center py-40 px-6">
          <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
          <p className="text-slate-400 text-sm mb-6">The requested service page does not exist or has been relocated.</p>
          <Link href="/" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-full text-xs font-bold text-white transition-colors">
            Return to Dashboard
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const glowColorClass = service.glow_color === 'purple' 
    ? 'glow-purple' 
    : service.glow_color === 'orange' 
      ? 'glow-orange' 
      : 'glow-blue';

  const glowTextClass = service.glow_color === 'purple'
    ? 'from-purple-400 via-pink-400 to-indigo-400'
    : service.glow_color === 'orange'
      ? 'from-orange-400 via-amber-400 to-red-400'
      : 'from-blue-400 via-purple-400 to-indigo-400';

  const glowBorderClass = service.glow_color === 'purple'
    ? 'hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]'
    : service.glow_color === 'orange'
      ? 'hover:border-orange-500/30 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]'
      : 'hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]';

  const accentColorClass = service.glow_color === 'purple'
    ? 'text-purple-400 bg-purple-500/10 border-purple-500/20'
    : service.glow_color === 'orange'
      ? 'text-orange-400 bg-orange-500/10 border-orange-500/20'
      : 'text-blue-400 bg-blue-500/10 border-blue-500/20';

  const btnBgClass = service.glow_color === 'purple'
    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-purple-500/20'
    : service.glow_color === 'orange'
      ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:shadow-orange-500/20'
      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-blue-500/20';

  return (
    <div className="bg-[#050816] text-white min-h-screen flex flex-col font-body selection:bg-blue-500/20 selection:text-blue-200">
      <Navbar />

      {/* SECTION 1 — CINEMATIC HERO */}
      <section className="pt-28 pb-20 relative overflow-hidden flex items-center min-h-[90vh] md:min-h-screen">
        {/* Glow orbs */}
        <div className={`glow-orb ${glowColorClass} w-[500px] h-[500px] -top-30 -left-30`} />
        <div className="glow-orb glow-purple w-[600px] h-[600px] bottom-1/4 -right-20 opacity-30" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-center">
          {/* Hero details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <div className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border ${accentColorClass}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">
                {service.title}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] font-heading">
              {service.hero_title.split(' ').slice(0, 3).join(' ')}
              <br />
              <span className={`bg-gradient-to-r ${glowTextClass} bg-clip-text text-transparent`}>
                {service.hero_title.split(' ').slice(3).join(' ')}
              </span>
            </h1>

            <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed max-w-xl">
              {service.hero_description}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/#contact"
                className={`inline-flex items-center justify-center text-xs font-bold px-7 py-4 ${btnBgClass} rounded-full text-white hover:shadow-lg transition-all duration-300 active:scale-95 group`}
              >
                Book This Service
                <FiArrowRight className="ml-2 group-hover:transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center text-xs font-bold px-7 py-4 border border-white/10 rounded-full text-slate-300 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300 active:scale-95"
              >
                View Packages
              </a>
            </div>
          </motion.div>

          {/* Hero Visual Banner (Service Illustrations) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-slate-950 shadow-2xl group"
          >
            <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
            />
            {/* Dark gradient mapping */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
            
            {/* Visual cards */}
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md space-y-2 text-left">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Architectural Quality</span>
              <p className="text-xs text-white leading-relaxed">
                We implement strict design systems and state-of-the-art frameworks to deliver premium products.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — FEATURES */}
      {service.features && service.features.length > 0 && (
        <section className="py-24 relative overflow-hidden bg-slate-950/20 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
            <div className="text-center space-y-4 max-w-xl mx-auto">
              <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">Capabilities</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-heading">
                Premium Core Features
              </h2>
              <p className="text-sm text-slate-400 font-light">
                Tailored engineering architectures custom built to guarantee growth and reliable performance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {service.features.map((feature, i) => {
                const IconComponent = iconMap[feature.icon] || FiCheckCircle;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className={`glass-card rounded-3xl p-8 border border-white/5 transition-all duration-300 text-left relative overflow-hidden group ${glowBorderClass}`}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/3 border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/25 transition-all mb-6">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 tracking-tight font-heading">{feature.title}</h3>
                    <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3 — PROCESS (TIMELINE) */}
      <section className="py-24 relative overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">Workflow</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-heading">
              Our Execution Blueprint
            </h2>
            <p className="text-sm text-slate-400 font-light">
              Fusing modern design strategies with clean implementation workflows for pixel-perfect delivery.
            </p>
          </div>

          <div className="relative pl-6 md:pl-8 border-l border-white/5 max-w-3xl mx-auto text-left space-y-12">
            {[
              { step: '01', title: 'Strategy & Architecture', desc: 'We align on user personas, site maps, layouts, and backend database integrations.', icon: FiTarget },
              { step: '02', title: 'Figma UI/UX Design', desc: 'Crafting custom high-fidelity visual mockups using a dark luxury aesthetic scheme.', icon: FiPenTool },
              { step: '03', title: 'Modular Engineering', desc: 'Writing clean TypeScript Next.js components, Rest APIs, and secure admin dashboards.', icon: FiCode },
              { step: '04', title: 'Audit & Launch', desc: 'Applying performance optimizations, load checking, and complete search indexing setups.', icon: FiAward }
            ].map((proc, i) => {
              const IconComp = proc.icon;
              return (
                <motion.div
                  key={proc.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative"
                >
                  <div className="absolute w-5 h-5 rounded-full bg-[#050816] border border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] -left-[35px] md:-left-[43px] top-1 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  </div>

                  <div className="glass-card rounded-3xl p-6 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-white/10 transition-colors">
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl font-extrabold text-blue-500/20 font-heading shrink-0">{proc.step}</span>
                      <div>
                        <h4 className="text-md font-bold text-white tracking-tight font-heading">{proc.title}</h4>
                        <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed mt-1">{proc.desc}</p>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 self-start md:self-auto">
                      <IconComp className="w-4.5 h-4.5" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4 — PROJECT SHOWCASE */}
      {projects && projects.length > 0 && (
        <section className="py-24 relative overflow-hidden bg-slate-950/20 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
            <div className="text-center space-y-4 max-w-xl mx-auto">
              <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">Portfolio</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-heading">
                Showcase Gallery
              </h2>
              <p className="text-sm text-slate-400 font-light">
                Discover previous award-winning products and designs crafted specifically for this service area.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="glass-card rounded-3xl border border-white/5 hover:border-blue-500/30 overflow-hidden flex flex-col group text-left relative shadow-2xl"
                >
                  <div className="aspect-[4/3] bg-slate-950 relative overflow-hidden border-b border-white/5">
                    <img 
                      src={project.image_url} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent opacity-80" />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-blue-400 uppercase tracking-wider">{project.category}</span>
                      <h3 className="text-md font-bold text-white tracking-tight font-heading">{project.title}</h3>
                      <p className="text-xs text-slate-400 font-light leading-relaxed">{project.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <span key={tag} className="bg-white/3 border border-white/5 text-[9px] font-medium text-slate-300 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 5 — PRICING */}
      {pricingPlans && pricingPlans.length > 0 && (
        <section id="pricing" className="py-24 relative overflow-hidden border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
            <div className="text-center space-y-4 max-w-xl mx-auto">
              <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">Plans</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-heading">
                Transparent Pricing Packages
              </h2>
              <p className="text-sm text-slate-400 font-light">
                Configure your plan. No hidden fees or unexpected bills. Secure and optimized scaling.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className={`glass-card rounded-3xl p-8 border border-white/5 flex flex-col justify-between hover:border-white/15 transition-all duration-300 relative text-left ${
                    plan.is_popular ? 'ring-2 ring-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.15)]' : ''
                  }`}
                >
                  {plan.is_popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[9px] font-bold rounded-full uppercase tracking-wider shadow">
                      Most Popular
                    </span>
                  )}

                  <div className="space-y-6">
                    <div className="border-b border-white/5 pb-4">
                      <h3 className="text-xl font-bold text-white tracking-tight font-heading">{plan.name}</h3>
                      <p className="text-xs text-slate-500 mt-1">{plan.subtitle}</p>
                      <div className="flex items-baseline mt-4">
                        <span className="text-3xl font-extrabold text-white">₹{plan.price}</span>
                        <span className="text-slate-500 text-xs ml-1 font-semibold">{plan.billing_period}</span>
                      </div>
                    </div>

                    <ul className="space-y-3 text-xs md:text-sm text-slate-300">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-center">
                          <FiCheck className="w-4 h-4 text-emerald-400 mr-2 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8">
                    <Link
                      href="/#contact"
                      className={`w-full text-center inline-block text-xs font-bold py-3.5 rounded-full border transition-all ${
                        plan.is_popular
                          ? 'bg-white text-[#050816] hover:bg-transparent hover:text-white border-white'
                          : 'bg-transparent text-slate-300 hover:text-white border-white/10 hover:border-white/20'
                      }`}
                    >
                      Choose Plan
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 6 — TESTIMONIALS */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-24 relative overflow-hidden bg-slate-950/20 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
            <div className="text-center space-y-4 max-w-xl mx-auto">
              <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">Endorsements</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-heading">
                Client Testimonials
              </h2>
            </div>

            <div className="max-w-3xl mx-auto relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card rounded-3xl p-8 md:p-12 border border-white/5 text-left relative shadow-2xl"
                >
                  <FiMessageSquare className="absolute top-8 right-8 text-blue-500/10 w-12 h-12" />
                  <div className="flex space-x-1 mb-6">
                    {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, r) => (
                      <FiStar key={r} className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-slate-300 text-sm md:text-lg font-light italic leading-relaxed">
                    "{testimonials[activeTestimonial].review}"
                  </p>

                  <div className="flex items-center space-x-4 pt-8 border-t border-white/5 mt-8">
                    <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-xs font-bold">
                      {testimonials[activeTestimonial].name[0]}
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-white">{testimonials[activeTestimonial].name}</span>
                      <span className="block text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">
                        {testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].company}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider dots */}
              <div className="flex justify-center space-x-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      activeTestimonial === index ? 'bg-blue-500' : 'bg-white/10 hover:bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 7 — FAQ (ACCORDION) */}
      {faqs && faqs.length > 0 && (
        <section className="py-24 relative overflow-hidden border-b border-white/5">
          <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-16">
            <div className="text-center space-y-4 max-w-xl mx-auto">
              <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">Inquiries</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-heading">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4 text-left">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div 
                    key={faq.id || index}
                    className="glass-card rounded-2xl border border-white/5 overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full flex justify-between items-center px-6 py-5 text-sm md:text-base font-bold text-white hover:text-blue-400 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <FiChevronDown className={`w-4 h-4 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-blue-400' : 'text-slate-500'}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-6 pb-6 text-xs md:text-sm text-slate-400 leading-relaxed font-light border-t border-white/3 pt-3">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 8 — CTA SECTION */}
      <section className="py-24 relative overflow-hidden bg-[#050816]">
        {/* Glow orbs */}
        <div className={`absolute w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`} />
        
        <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl border border-white/5 p-12 md:p-16 shadow-2xl relative overflow-hidden space-y-8"
          >
            {/* Floating visual elements */}
            <div className="absolute w-24 h-24 rounded-full bg-blue-500/20 blur-xl top-6 left-6" />
            <div className="absolute w-32 h-32 rounded-full bg-purple-500/20 blur-xl bottom-6 right-6" />

            <div className="space-y-4 max-w-xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-heading text-white leading-tight">
                Let's Build Something <br />
                <span className={`bg-gradient-to-r ${glowTextClass} bg-clip-text text-transparent`}>
                  Amazing Together
                </span>
              </h2>
              <p className="text-sm text-slate-400 font-light leading-relaxed">
                Connect with our specialized team to start drafting your next luxury web design, branding guide, or custom software solution today.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center items-center">
              <Link
                href="/#contact"
                className={`inline-flex items-center justify-center text-xs font-bold px-7 py-4 ${btnBgClass} rounded-full text-white hover:shadow-lg transition-all duration-300 active:scale-95 group`}
              >
                Start Your Project
                <FiArrowRight className="ml-2 group-hover:transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/#portfolio"
                className="inline-flex items-center justify-center text-xs font-bold px-7 py-4 border border-white/10 rounded-full text-slate-300 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300 active:scale-95"
              >
                View Full Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

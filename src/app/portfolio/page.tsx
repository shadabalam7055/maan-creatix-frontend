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
  FiChevronLeft, 
  FiChevronRight, 
  FiExternalLink, 
  FiLayers, 
  FiLayers as FiSaaS, 
  FiSmartphone, 
  FiGrid, 
  FiTerminal, 
  FiFigma,
  FiZap
} from 'react-icons/fi';
import { 
  SiNextdotjs, 
  SiReact, 
  SiTailwindcss, 
  SiNodedotjs, 
  SiMongodb, 
  SiTypescript, 
  SiFigma, 
  SiFirebase 
} from 'react-icons/si';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Interfaces
interface ProjectItem {
  id: number;
  title: string;
  description: string;
  image_url: string;
  category: string;
  tags: string[];
  demo_link: string;
  is_featured: boolean;
  category_id?: number;
}

interface CategoryItem {
  id: number;
  name: string;
  slug: string;
}

interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  company: string;
  review: string;
  rating: number;
  image_url?: string;
}

interface TechItem {
  name: string;
  category: string;
  icon: React.ComponentType<any>;
  glowColor: string;
}

interface StatItem {
  label: string;
  value: string;
  icon: string;
}

// Icon mappers
const iconMap: Record<string, React.ComponentType<any>> = {
  Users: FiUsers,
  Briefcase: FiBriefcase,
  Award: FiAward,
  Clock: FiActivity,
};

// Seeding Fallback Lists for complete offline resilience
const fallbackStatsList: StatItem[] = [
  { label: 'Projects Completed', value: '250+', icon: 'Briefcase' },
  { label: 'Happy Clients', value: '150+', icon: 'Users' },
  { label: 'Client Satisfaction', value: '99%', icon: 'Award' },
  { label: 'Years Experience', value: '4+', icon: 'Clock' }
];

const fallbackCategoriesList: CategoryItem[] = [
  { id: 1, name: 'Web Design', slug: 'web-design' },
  { id: 2, name: 'E-Commerce', slug: 'ecommerce' },
  { id: 3, name: 'UI/UX', slug: 'ui-ux' },
  { id: 4, name: 'SaaS', slug: 'saas' },
  { id: 5, name: 'Branding', slug: 'branding' },
  { id: 6, name: 'Mobile Apps', slug: 'mobile-apps' }
];

const fallbackProjectsList: ProjectItem[] = [
  {
    id: 1,
    title: 'Web App Portal',
    description: 'Blazing fast customer portal built with Next.js Server Components and edge caching.',
    image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    category: 'Web Design',
    tags: ['Next.js', 'Tailwind', 'Laravel'],
    demo_link: '#',
    is_featured: true
  },
  {
    id: 2,
    title: 'Luxury Storefront',
    description: 'Fast e-commerce portal with dark glass aesthetics, dynamic card reveals, and quick Stripe checkout.',
    image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    category: 'E-Commerce',
    tags: ['Next.js', 'Stripe', 'Laravel'],
    demo_link: '#',
    is_featured: true
  },
  {
    id: 3,
    title: 'Enterprise Corporate Portal',
    description: 'Authority corporate platform with custom blog editor, lead telemetry, and interactive timeline grids.',
    image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    category: 'Web Design',
    tags: ['React', 'Laravel', 'Tailwind'],
    demo_link: '#',
    is_featured: false
  },
  {
    id: 4,
    title: 'Telemetry Control Panel',
    description: 'Real-time software dashboard featuring instant chart metrics, database optimization, and REST API access keys.',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    category: 'SaaS',
    tags: ['Laravel', 'SQL', 'WebSockets'],
    demo_link: '#',
    is_featured: true
  },
  {
    id: 5,
    title: 'Cosmic Branding Deck',
    description: 'A comprehensive visual design guide, typography swatches, and logo layout guide for a futuristic tech client.',
    image_url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
    category: 'Branding',
    tags: ['Branding', 'Figma', 'Vector'],
    demo_link: '#',
    is_featured: false
  },
  {
    id: 6,
    title: 'Glassmorphic Design Audit',
    description: 'Clickable wireframes, visual audit diagrams, and checkout screen blueprints created for a leading startup client.',
    image_url: 'https://images.unsplash.com/photo-1541462608141-2ff538ae4b2e?auto=format&fit=crop&w=800&q=80',
    category: 'UI/UX',
    tags: ['Figma', 'Wireframes', 'UX Audit'],
    demo_link: '#',
    is_featured: false
  },
  {
    id: 7,
    title: 'Maan Fitness Tracker',
    description: 'Premium dark fitness companion mobile application with biometric auth and calorie trackers.',
    image_url: 'https://images.unsplash.com/photo-1510051640316-ecc39186b633?auto=format&fit=crop&w=800&q=80',
    category: 'Mobile Apps',
    tags: ['Flutter', 'Firebase', 'Dart'],
    demo_link: '#',
    is_featured: true
  },
  {
    id: 8,
    title: 'Velo Courier Partner',
    description: 'Real-time routing courier helper app built on modern cross-platform mobile architectures.',
    image_url: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80',
    category: 'Mobile Apps',
    tags: ['React Native', 'Node.js', 'Google Maps'],
    demo_link: '#',
    is_featured: false
  },
  {
    id: 9,
    title: 'Aura SaaS Landing Page',
    description: 'Sleek dark luxury SaaS layout featuring neon hover interactions and smooth canvas reveals.',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    category: 'SaaS',
    tags: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    demo_link: '#',
    is_featured: false
  },
  {
    id: 10,
    title: 'Deco Interior Branding',
    description: 'Stunning brand asset books, vector typography logs, and office stationary mockups.',
    image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    category: 'Branding',
    tags: ['Illustrator', 'Branding', 'Mockups'],
    demo_link: '#',
    is_featured: true
  }
];

const fallbackTestimonials: TestimonialItem[] = [
  { id: 1, name: 'Rahul Sharma', role: 'CEO', company: 'TechNove', review: 'Maan Creatix delivered a fantastic website that exceeded our expectations. Highly professional and on-time delivery!', rating: 5, image_url: '/images/testimonials/avatar1.png' },
  { id: 2, name: 'Priya Verma', role: 'Marketing Head', company: 'Aura Brand', review: 'The designs were creative, modern and exactly what our brand needed. Great experience!', rating: 5, image_url: '/images/testimonials/avatar2.png' },
  { id: 3, name: 'Vikram Singh', role: 'Founder', company: 'Foodies Hub', review: 'Their software solution helped us manage our business efficiently. Excellent work and support!', rating: 5, image_url: '/images/testimonials/avatar3.png' }
];

const technologiesList: TechItem[] = [
  { name: 'Next.js', category: 'Frontend framework', icon: SiNextdotjs, glowColor: 'rgba(255,255,255,0.1)' },
  { name: 'React', category: 'UI Components Library', icon: SiReact, glowColor: 'rgba(59,130,246,0.3)' },
  { name: 'Tailwind CSS', category: 'Styling engine', icon: SiTailwindcss, glowColor: 'rgba(6,182,212,0.3)' },
  { name: 'Node.js', category: 'Runtime engine', icon: SiNodedotjs, glowColor: 'rgba(34,197,94,0.3)' },
  { name: 'MongoDB', category: 'Document database', icon: SiMongodb, glowColor: 'rgba(16,185,129,0.3)' },
  { name: 'TypeScript', category: 'Type-safe programming', icon: SiTypescript, glowColor: 'rgba(59,130,246,0.3)' },
  { name: 'Figma', category: 'UI/UX visual audits', icon: SiFigma, glowColor: 'rgba(236,72,153,0.3)' },
  { name: 'Firebase', category: 'Backend integration', icon: SiFirebase, glowColor: 'rgba(245,158,11,0.3)' },
];

export default function PortfolioPage() {
  const [categories, setCategories] = useState<CategoryItem[]>(fallbackCategoriesList);
  const [projects, setProjects] = useState<ProjectItem[]>(fallbackProjectsList);
  const [featuredProjects, setFeaturedProjects] = useState<ProjectItem[]>(fallbackProjectsList.filter(p => p.is_featured));
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(fallbackTestimonials);
  const [stats, setStats] = useState<StatItem[]>(fallbackStatsList);
  const [loading, setLoading] = useState(true);
  
  const [activeTab, setActiveTab] = useState<string>('All');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch('http://127.0.0.1:8000/api/portfolio-data')
      .then((res) => {
        if (!res.ok) throw new Error('API server down');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data.categories) && data.categories.length > 0) setCategories(data.categories);
        if (Array.isArray(data.projects) && data.projects.length > 0) setProjects(data.projects);
        if (Array.isArray(data.featured_projects) && data.featured_projects.length > 0) {
          setFeaturedProjects(data.featured_projects);
        } else {
          setFeaturedProjects(data.projects.filter((p: any) => p.is_featured));
        }
        if (Array.isArray(data.testimonials) && data.testimonials.length > 0) setTestimonials(data.testimonials);
        if (Array.isArray(data.stats) && data.stats.length > 0) {
          const formatted = data.stats.map((s: any) => ({
            label: s.label,
            value: s.value,
            icon: s.icon || 'Users'
          }));
          setStats(formatted);
        }
        setLoading(false);
      })
      .catch(() => {
        // Fall back to pre-seeded list
        setLoading(false);
      });
  }, []);

  const filteredProjects = activeTab === 'All'
    ? projects
    : projects.filter(project => {
        // Map frontend tab name to backend categories slug or name mapping
        const matchesName = project.category.toLowerCase().includes(activeTab.toLowerCase()) || 
                            activeTab.toLowerCase().includes(project.category.toLowerCase());
        return matchesName;
      });

  const tabItems = ['All', 'Web Design', 'E-Commerce', 'UI/UX', 'SaaS', 'Branding', 'Mobile Apps'];

  if (loading) {
    return (
      <div className="bg-[#050816] text-white min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-t-2 border-blue-500 rounded-full animate-spin" />
          <span className="text-xs font-semibold text-slate-500 tracking-wider">Loading Creative Portfolio...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050816] text-white min-h-screen flex flex-col font-body selection:bg-blue-500/20 selection:text-blue-200 overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section id="home" className="min-h-screen relative flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#050816]">
        {/* Glow orbs */}
        <div className="glow-orb glow-blue w-[600px] h-[600px] -top-40 -left-40" />
        <div className="glow-orb glow-purple w-[600px] h-[600px] top-1/3 -right-20 opacity-45" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-center">
          
          {/* Left Hero side details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-8 text-left"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-500/5 border border-blue-500/15 px-4.5 py-1.5 rounded-full backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[10px] md:text-xs font-bold text-blue-300 uppercase tracking-widest">
                Premium Portfolio
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] font-heading">
              Our Creative <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Portfolio Showcase
              </span>
            </h1>

            <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed max-w-lg">
              Explore the premium blueprints, custom code repositories, and high-fidelity mockups built by Maan Creatix. We design digital tools that convert and represent visual luxury.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#projects-grid"
                className="inline-flex items-center justify-center text-xs font-bold px-7 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 active:scale-95 group"
              >
                View Projects
                <FiArrowRight className="ml-2 group-hover:transform group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center text-xs font-bold px-7 py-4 border border-white/10 rounded-full text-slate-300 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300 active:scale-95"
              >
                Start Your Project
              </Link>
            </div>

            <div className="h-px bg-white/5 max-w-md pt-4" />

            {/* Stats row inside hero */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              {stats.map((stat) => {
                const IconComp = iconMap[stat.icon] || FiCheck;
                return (
                  <div key={stat.label} className="space-y-1">
                    <div className="flex items-center space-x-1 text-blue-400">
                      <IconComp className="w-3.5 h-3.5" />
                      <span className="text-base font-extrabold text-white">{stat.value}</span>
                    </div>
                    <span className="block text-[8px] md:text-[9px] text-slate-500 font-bold uppercase tracking-wider leading-tight">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Hero side Visuals (Perspective laptop mockup + mobile overlapping) */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[400px] md:min-h-[500px]">
            {/* Ambient visual ring */}
            <div className="absolute w-[320px] h-[320px] md:w-[440px] md:h-[440px] rounded-full border-2 border-blue-500/10 flex items-center justify-center animate-[spin_120s_linear_infinite]">
              <div className="w-[90%] h-[90%] rounded-full border border-dashed border-purple-500/10" />
            </div>
            <div className="absolute w-[240px] h-[240px] rounded-full bg-blue-500/10 blur-[80px]" />

            {/* Perspective composition */}
            <div className="relative z-10 w-full max-w-[400px] md:max-w-[440px] scale-90 sm:scale-100 flex flex-col items-center">
              {/* Laptop screen */}
              <motion.div
                initial={{ opacity: 0, rotateX: 20, rotateY: -10, y: 30 }}
                animate={{ opacity: 1, rotateX: 12, rotateY: -12, y: 0 }}
                transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 0.3 }}
                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                className="w-[280px] h-[180px] md:w-[340px] md:h-[210px] bg-[#0c0f1d] border border-blue-500/30 rounded-t-xl p-2.5 flex flex-col justify-between shadow-2xl relative"
              >
                <div className="absolute inset-0 border border-purple-500/20 rounded-t-xl pointer-events-none" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-700/50 absolute top-1 left-1/2 -translate-x-1/2" />
                
                {/* Inside Screen GUI */}
                <div className="flex-1 rounded-lg border border-white/5 bg-[#030612]/60 backdrop-blur-md flex flex-col items-center justify-center text-center p-4">
                  <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Selected Works</span>
                  <h4 className="text-xs md:text-sm font-bold text-white font-heading mt-1">
                    Creative Telemetry
                  </h4>
                  <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded mt-2" />
                </div>
              </motion.div>

              {/* Keyboard deck base */}
              <motion.div
                initial={{ opacity: 0, rotateX: 60, y: 20 }}
                animate={{ opacity: 1, rotateX: 65, y: 0 }}
                transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 0.4 }}
                className="w-[320px] h-[110px] md:w-[390px] md:h-[140px] bg-slate-900 border-t border-slate-800 rounded-b-2xl shadow-3xl p-1.5 relative -mt-3.5 origin-top"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)',
                  transform: 'rotateX(65deg)',
                }}
              >
                <div className="flex-1 h-full rounded bg-[#070b16] border border-white/5 p-1.5 grid grid-cols-12 gap-0.5 opacity-80">
                  {[...Array(60)].map((_, i) => (
                    <div key={i} className="bg-slate-900 rounded-[1px] border-[0.5px] border-white/5" />
                  ))}
                </div>
              </motion.div>

              {/* Floating Mobile phone mockup overlapping */}
              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-10 -left-6 w-[110px] md:w-[130px] aspect-[9/18] bg-slate-900/90 border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-md z-20 flex flex-col justify-between"
              >
                <div className="w-12 h-3 bg-slate-950 rounded-full mx-auto mb-1.5 border border-white/5" />
                <div className="flex-1 rounded-lg bg-[#030612]/80 border border-white/5 flex flex-col items-center justify-center p-2 text-center">
                  <FiSmartphone className="text-purple-400 w-5 h-5 mb-1" />
                  <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider">Mobile UI</span>
                </div>
              </motion.div>
            </div>

            {/* Orbiting card (Top Right) */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: -30 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ type: 'spring', delay: 0.5 }}
              className="absolute top-12 right-0 bg-white/5 border border-white/5 p-3 rounded-xl shadow-lg backdrop-blur-md z-30"
            >
              <div className="flex items-center space-x-2">
                <FiZap className="text-amber-400 w-4 h-4 animate-bounce" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">High Speed</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS SECTION */}
      {featuredProjects && featuredProjects.length > 0 && (
        <section className="py-24 relative overflow-hidden bg-slate-950/20 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
            
            {/* Section title */}
            <div className="text-left space-y-4 max-w-xl">
              <div className="inline-flex items-center space-x-2 bg-purple-500/5 border border-purple-500/15 px-4 py-1.5 rounded-full">
                <span className="text-[10px] md:text-xs font-bold text-purple-400 uppercase tracking-widest">Featured</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-heading">
                Spotlight Installations
              </h2>
              <p className="text-sm text-slate-400 font-light leading-relaxed">
                A highly curated list of our most complex development systems, custom software platforms, and visual luxury projects.
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredProjects.map((project, i) => (
                <motion.div
                  key={project.id || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="glass-card rounded-3xl overflow-hidden border border-white/5 hover:border-blue-500/25 transition-all duration-300 flex flex-col group relative hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] text-left min-h-[480px] justify-between"
                >
                  <div className="aspect-video w-full bg-slate-950 overflow-hidden relative border-b border-white/5">
                    <img 
                      src={project.image_url} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                    
                    <div className="absolute top-4 left-4 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold rounded-full uppercase tracking-wider">
                      {project.category}
                    </div>
                  </div>

                  <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white tracking-tight font-heading group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="bg-white/3 border border-white/5 text-[10px] font-medium text-slate-300 px-2.5 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <a 
                        href={project.demo_link} 
                        className="inline-flex items-center text-xs font-bold text-white group-hover:text-blue-400 transition-colors"
                      >
                        Explore Telemetry
                        <FiArrowRight className="ml-2 group-hover:transform group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FILTERABLE ALL PROJECTS GRID */}
      <section id="projects-grid" className="py-24 relative overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">Gallery</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-heading">
              Our Complete Work
            </h2>
            <p className="text-sm text-slate-400 font-light">
              Filter by category tabs to inspect our full portfolio of responsive applications, design audits, and custom software code bases.
            </p>
          </div>

          {/* Filters tabs bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto bg-white/5 border border-white/5 p-1.5 rounded-full backdrop-blur-md">
            {tabItems.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-4 py-2 text-xs font-bold rounded-full transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeFilterBackground"
                      className="absolute inset-0 bg-blue-500/10 border border-blue-500/20 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Grid display with animations */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  key={project.id || index}
                  className="glass-card rounded-3xl border border-white/5 hover:border-purple-500/20 overflow-hidden flex flex-col group text-left relative shadow-xl hover:shadow-[0_0_20px_rgba(139,92,246,0.06)]"
                >
                  <div className="aspect-[4/3] bg-slate-950 relative overflow-hidden border-b border-white/5">
                    <img 
                      src={project.image_url} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent opacity-80" />
                    
                    <div className="absolute top-3 left-3 px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[9px] font-bold rounded-full uppercase tracking-wider">
                      {project.category}
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-md font-bold text-white tracking-tight font-heading group-hover:text-purple-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-light leading-relaxed">
                        {project.description}
                      </p>
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
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* HORIZONTAL CASE STUDY SECTION */}
      <section className="py-24 relative overflow-hidden bg-slate-950/20 border-b border-white/5 text-left">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Case text details */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-blue-500/5 border border-blue-500/15 px-4 py-1.5 rounded-full">
                  <span className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-widest">Case Study</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-white">
                  Deco Premium Branding & SaaS Launch
                </h2>
                <p className="text-sm text-slate-400 font-light leading-relaxed">
                  How we engineered a complete luxury branding strategy and web portal setup that boosted conversions by 140% in under 90 days.
                </p>
              </div>

              <div className="space-y-4 font-light text-slate-300 text-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mt-0.5 text-xs font-bold">1</div>
                  <div>
                    <span className="font-bold text-white">The Challenge:</span> Monotonous SaaS landing structures resulted in low visitor retention.
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mt-0.5 text-xs font-bold">2</div>
                  <div>
                    <span className="font-bold text-white">The Strategy:</span> Fused deep luxury glassmorphic cards with responsive Next.js server components.
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mt-0.5 text-xs font-bold">3</div>
                  <div>
                    <span className="font-bold text-white">The Result:</span> A gorgeous, blazing fast platform compiling clean page metrics and load speed marks.
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center text-xs font-bold px-7 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white hover:shadow-lg transition-all duration-300 active:scale-95 group"
                >
                  Consult With Us
                  <FiArrowRight className="ml-2 group-hover:transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Case Mockup preview Dashboard */}
            <div className="lg:col-span-6 relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 bg-slate-950 shadow-2xl">
              {/* Screen visuals */}
              <div className="absolute inset-0 bg-[#070913] p-4 flex flex-col justify-between">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Deco Control Board</span>
                  <div className="flex space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/40" />
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/40" />
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/40" />
                  </div>
                </div>
                
                {/* Grid dashboard elements */}
                <div className="grid grid-cols-3 gap-3 my-auto">
                  <div className="bg-white/3 border border-white/5 rounded-xl p-3 space-y-1">
                    <span className="block text-[8px] text-slate-500 uppercase font-bold">Conversion</span>
                    <span className="block text-sm font-extrabold text-emerald-400 font-heading">+140%</span>
                  </div>
                  <div className="bg-white/3 border border-white/5 rounded-xl p-3 space-y-1">
                    <span className="block text-[8px] text-slate-500 uppercase font-bold">Speed Metric</span>
                    <span className="block text-sm font-extrabold text-blue-400 font-heading">99/100</span>
                  </div>
                  <div className="bg-white/3 border border-white/5 rounded-xl p-3 space-y-1">
                    <span className="block text-[8px] text-slate-500 uppercase font-bold">Client Rank</span>
                    <span className="block text-sm font-extrabold text-white font-heading">#1</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[8px] text-slate-600">
                  <span>Telemetry Live updates</span>
                  <span className="text-blue-500 font-semibold">Live connection</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TECH STACK SECTION */}
      <section className="py-24 relative overflow-hidden bg-[#050816] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">Engineering</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-heading">
              Our Core Stacks
            </h2>
            <p className="text-sm text-slate-400 font-light">
              We leverage reliable modern frameworks and database backends to deliver fast loading speeds and clean interfaces.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {technologiesList.map((tech) => {
              const TechIcon = tech.icon;
              return (
                <motion.div
                  whileHover={{ y: -6 }}
                  key={tech.name}
                  className="glass-card rounded-2xl p-6 flex flex-col items-center text-center justify-center space-y-4 border border-white/5 transition-all duration-300 group hover:border-white/15"
                  style={{
                    boxShadow: `0 10px 30px -15px ${tech.glowColor}`
                  }}
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/20 transition-colors">
                    <TechIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white leading-tight">{tech.name}</span>
                    <span className="block text-[8px] text-slate-500 font-semibold uppercase tracking-wider mt-1">{tech.category}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-24 relative overflow-hidden bg-slate-950/20 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
            <div className="text-center space-y-4 max-w-xl mx-auto">
              <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">Endorsements</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-heading">
                Client Endorsements
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

              {/* Slider dots controls */}
              <div className="flex justify-center items-center space-x-4 mt-8">
                <button
                  onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                >
                  <FiChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex space-x-1.5">
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
                <button
                  onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                >
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA SECTION (Glowing rocket theme) */}
      <section className="py-24 relative overflow-hidden bg-[#050816]">
        {/* Glow orbs */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        
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
                Have A Project In Mind? <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                  Let’s Build Something Amazing.
                </span>
              </h2>
              <p className="text-sm text-slate-400 font-light leading-relaxed">
                Connect with our specialized team to start drafting your next luxury web design, branding guide, or custom software solution today.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center items-center">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center text-xs font-bold px-7 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 active:scale-95 group"
              >
                Start Your Project
                <FiArrowRight className="ml-2 group-hover:transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center text-xs font-bold px-7 py-4 border border-white/10 rounded-full text-slate-300 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300 active:scale-95"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

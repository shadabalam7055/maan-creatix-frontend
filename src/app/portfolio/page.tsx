'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, 
  FiArrowRight, 
  FiCalendar, 
  FiUser, 
  FiClock, 
  FiExternalLink,
  FiCompass,
  FiBookmark,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
  FiBriefcase,
  FiUsers,
  FiAward
} from 'react-icons/fi';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Interfaces
interface CategoryItem {
  id: number;
  name: string;
  slug: string;
}

interface ProjectItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  category: string;
  tags: string[];
  demo_link?: string;
  client?: string;
  duration?: string;
  completion_date?: string;
  is_featured: boolean;
}

interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  company: string;
  review: string;
  rating: number;
  image_url: string;
}

const fallbackCategories: CategoryItem[] = [
  { id: 1, name: 'Web Development', slug: 'web-development' },
  { id: 2, name: 'UI/UX Design', slug: 'ui-ux-design' },
  { id: 3, name: 'Graphic Design', slug: 'graphic-design' },
  { id: 4, name: 'Branding', slug: 'branding' },
  { id: 5, name: 'Software Development', slug: 'software-development' },
];

const fallbackProjects: ProjectItem[] = [
  {
    id: 1,
    title: 'Gym Management System',
    slug: 'cyberpunk-portfolio-hub',
    description: 'Sleek gym management dashboard with futuristic UI, real-time class scheduling, and member analytics. Built with Next.js and Tailwind CSS.',
    image_url: '/project-1.png',
    category: 'UI/UX Design',
    tags: ['Next.js', 'TailwindCSS', 'Framer Motion'],
    client: 'Allan Fitness Club',
    duration: '2 Months',
    completion_date: 'December 2025',
    is_featured: true,
  },
  // {
  //   id: 2,
  //   title: 'Fintech Analytics Platform',
  //   slug: 'fintech-analytics-platform',
  //   description: 'High-speed administrative portal with real-time telemetry graphs, dark themes, and secure JWT-based backend gateways.',
  //   image_url: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=80',
  //   category: 'Web Development',
  //   tags: ['React', 'Tailwind CSS', 'Chart.js'],
  //   client: 'Bancorp Digit',
  //   duration: '4 Months',
  //   completion_date: 'January 2026',
  //   is_featured: false,
  // },
  // {
  //   id: 3,
  //   title: 'Neon Brand Identity System',
  //   slug: 'neon-brand-identity',
  //   description: 'Corporate branding project utilizing futuristic visual structures, luxury color maps, and ambient visual packaging designs.',
  //   image_url: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=800&q=80',
  //   category: 'Branding',
  //   tags: ['Figma', 'Illustrator', '3D Blender'],
  //   client: 'Helix Labs',
  //   duration: '1.5 Months',
  //   completion_date: 'November 2025',
  //   is_featured: false,
  // },
  // {
  //   id: 4,
  //   title: 'E-Commerce Website',
  //   slug: 'ecommerce-website',
  //   description: 'Next-generation luxury e-commerce platform with head-turning 3D transitions and blazing fast edge rendering.',
  //   image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
  //   category: 'Web Development',
  //   tags: ['Next.js', 'Tailwind', 'Stripe'],
  //   client: 'Aura Shop',
  //   duration: '3 Months',
  //   completion_date: 'October 2025',
  //   is_featured: false,
  // },
  // {
  //   id: 5,
  //   title: 'Restaurant Website',
  //   slug: 'restaurant-website',
  //   description: 'Delightful food ordering website with a customized checkout page, mobile responsive design, and smooth GSAP layout reveals.',
  //   image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
  //   category: 'Web Development',
  //   tags: ['Next.js', 'Tailwind', 'Framer'],
  //   client: 'Gourmet Bistro',
  //   duration: '2.5 Months',
  //   completion_date: 'February 2026',
  //   is_featured: false,
  // }
];

const fallbackTestimonials: TestimonialItem[] = [
  { id: 1, name: 'Rahul Sharma', role: 'CEO', company: 'TechNove', review: 'Maan Creatix delivered a fantastic website that exceeded our expectations. Highly professional and on-time delivery!', rating: 5, image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80' },
  { id: 2, name: 'Priya Verma', role: 'Marketing Head', company: 'Aura Brand', review: 'The designs were creative, modern and exactly what our brand needed. Great experience!', rating: 5, image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80' },
  { id: 3, name: 'Vikram Singh', role: 'Founder', company: 'Foodies Hub', review: 'Their software solution helped us manage our business efficiently. Excellent work and support!', rating: 5, image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80' }
];

export default function PortfolioPage() {
  const [projects] = useState<ProjectItem[]>(fallbackProjects);
  const [categories] = useState<CategoryItem[]>(fallbackCategories);
  const [testimonials] = useState<TestimonialItem[]>(fallbackTestimonials);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Filter logic
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (project.tags && project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesCategory = selectedCategory === 'All' || 
                            project.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const featuredProject = projects.find(p => p.is_featured) || projects[0];

  return (
    <div className="bg-[#050816] text-white min-h-screen flex flex-col font-body selection:bg-blue-500/20 selection:text-blue-200 overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-16 overflow-hidden bg-[#050816]">
        {/* Glow ambient backgrounds */}
        <div className="glow-orb glow-blue w-[600px] h-[600px] -top-30 -left-25 opacity-20 pointer-events-none glowing-orb-animated" />
        <div className="glow-orb glow-purple w-[600px] h-[600px] top-1/4 -right-10 opacity-15 pointer-events-none glowing-orb-animated" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-6 text-left">
          <div className="inline-flex items-center space-x-2 bg-blue-500/5 border border-blue-500/15 px-4.5 py-1.5 rounded-full backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[10px] md:text-xs font-bold text-blue-300 uppercase tracking-widest">
              Creative Portfolio
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading text-white leading-tight">
            Fusing Artistry with <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">Functional Code</span>
          </h1>
          <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed max-w-xl">
            Explore our premium showcase of high-end design, web development, and digital identity branding. Crafted with cinematic depth and smooth animations.
          </p>
        </div>
      </section>

      {/* FILTER RIBBON */}
      <section className="py-6 border-y border-white/5 bg-slate-900/10 backdrop-blur-md relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-6 justify-between items-center">
          {/* Search Box */}
          <div className="relative w-full md:max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search portfolio..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-3 text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500/40 transition-colors"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <button 
              onClick={() => setSelectedCategory('All')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                selectedCategory === 'All' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' 
                  : 'bg-white/5 text-slate-400 hover:text-slate-200 border border-white/5'
              }`}
            >
              All Work
            </button>
            {categories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap ${
                  selectedCategory.toLowerCase() === cat.name.toLowerCase()
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' 
                    : 'bg-white/5 text-slate-400 hover:text-slate-200 border border-white/5'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO CONTAINER */}
      <main className="flex-grow py-16 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          {/* FEATURED SPOTLIGHT CARD */}
          {selectedCategory === 'All' && searchQuery === '' && featuredProject && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-2xl p-6 md:p-12 hover:border-white/15 transition-all duration-500 group"
            >
              <div className="absolute w-[300px] h-[300px] bg-blue-600/10 blur-[80px] -top-20 -left-20 rounded-full" />
              <div className="absolute w-[200px] h-[200px] bg-purple-600/5 blur-[80px] bottom-10 right-10 rounded-full" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Image Frame */}
                <div className="lg:col-span-7 rounded-2xl overflow-hidden aspect-[16/10] border border-white/5 relative bg-slate-950">
                  <img 
                    src={featuredProject.image_url} 
                    alt={featuredProject.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow">
                    Spotlight Rebuild
                  </div>
                </div>

                {/* Details block */}
                <div className="lg:col-span-5 text-left space-y-6">
                  <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                    <FiCompass className="w-4 h-4" />
                    <span>{featuredProject.category}</span>
                  </div>

                  <h2 className="text-3xl font-extrabold font-heading text-white leading-tight">
                    {featuredProject.title}
                  </h2>

                  <p className="text-slate-400 font-light text-xs md:text-sm leading-relaxed">
                    {featuredProject.description}
                  </p>

                  {/* Metadata tags */}
                  <div className="flex flex-wrap gap-2">
                    {featuredProject.tags.map(tag => (
                      <span key={tag} className="text-[10px] bg-white/5 border border-white/5 px-3 py-1 rounded-full text-slate-300 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="h-px bg-white/5" />

                  {/* Case study actions */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Client</span>
                      <span className="text-sm font-semibold text-slate-200 mt-0.5 block">{featuredProject.client || 'N/A'}</span>
                    </div>
                    <Link 
                      href={`/projects/${featuredProject.slug}`}
                      className="inline-flex items-center justify-center text-xs font-bold px-6 py-3.5 bg-white text-slate-900 rounded-full hover:bg-slate-200 transition-colors shadow-lg active:scale-95 group/btn"
                    >
                      Read Case Study
                      <FiArrowRight className="ml-2 group-hover/btn:transform group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* PORTFOLIO GRID */}
          <div className="space-y-8">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-20 bg-white/[0.01] border border-dashed border-white/5 rounded-2xl">
                <FiBookmark className="w-8 h-8 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 font-light">No projects match your active search filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <AnimatePresence>
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="glass-card rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.08)] transition-all duration-500 group text-left"
                    >
                      {/* Image banner */}
                      <div className="aspect-[16/10] overflow-hidden border-b border-white/5 relative bg-slate-950">
                        <img 
                          src={project.image_url} 
                          alt={project.title} 
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 opacity-90"
                        />
                        <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md text-[10px] text-slate-300 font-bold px-3 py-1 rounded border border-white/5">
                          {project.category}
                        </div>
                      </div>

                      {/* Description blocks */}
                      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <h3 className="text-lg font-bold font-heading text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                            {project.title}
                          </h3>
                          <p className="text-slate-400 font-light text-xs line-clamp-3 leading-relaxed">
                            {project.description}
                          </p>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-white/5">
                          {/* Project tags */}
                          <div className="flex flex-wrap gap-1.5">
                            {project.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="text-[9px] bg-white/5 border border-white/5 px-2 py-0.5 rounded text-slate-400">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-xs pt-1">
                            <span className="text-slate-500 font-light">Client: <strong className="font-semibold text-slate-300">{project.client || 'Internal'}</strong></span>
                            <Link 
                              href={`/projects/${project.slug}`}
                              className="inline-flex items-center text-blue-400 font-bold hover:text-blue-300 group/link"
                            >
                              Case Study
                              <FiArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* STATS SECTION */}
      <section className="py-12 bg-slate-950/40 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 md:divide-x divide-white/5">
            <div className="flex flex-col items-center text-center justify-center p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-blue-400">
                  <FiUsers className="w-5 h-5 animate-pulse" />
                </div>
                <div className="text-left">
                  <span className="block text-2xl md:text-3xl font-extrabold font-heading text-white">5</span>
                  <span className="block text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-semibold mt-0.5">Happy Clients</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center text-center justify-center p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-blue-400">
                  <FiBriefcase className="w-5 h-5 animate-pulse" />
                </div>
                <div className="text-left">
                  <span className="block text-2xl md:text-3xl font-extrabold font-heading text-white">5</span>
                  <span className="block text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-semibold mt-0.5">Projects Completed</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center text-center justify-center p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-blue-400">
                  <FiClock className="w-5 h-5 animate-pulse" />
                </div>
                <div className="text-left">
                  <span className="block text-2xl md:text-3xl font-extrabold font-heading text-white">1</span>
                  <span className="block text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-semibold mt-0.5">Years Experience</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center text-center justify-center p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-blue-400">
                  <FiAward className="w-5 h-5 animate-pulse" />
                </div>
                <div className="text-left">
                  <span className="block text-2xl md:text-3xl font-extrabold font-heading text-white">99%</span>
                  <span className="block text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-semibold mt-0.5">Satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL CAROUSEL */}
      <section className="py-24 relative overflow-hidden bg-[#050816] border-b border-white/5">
        <div className="glow-orb glow-purple w-[500px] h-[500px] top-1/4 -right-1/4 opacity-10 pointer-events-none glowing-orb-animated" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 space-y-16">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
              <span className="text-[10px] md:text-xs font-bold text-purple-400 uppercase tracking-widest">
                Client Success
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-white">
              Trusted by Ambitious Brands
            </h2>
          </div>

          <div className="relative glass-card border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden hover:border-white/10 transition-colors duration-500">
            <div className="absolute w-[200px] h-[200px] bg-blue-500/5 blur-[50px] -top-10 -left-10 rounded-full" />
            
            {/* <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-left"
              >
                <div className="flex space-x-1">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <FiStar key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500/25" />
                  ))}
                </div>

                <p className="text-base md:text-lg text-slate-200 font-light leading-relaxed italic">
                  "{testimonials[activeTestimonial].review}"
                </p>

                <div className="flex items-center space-x-4 pt-4 border-t border-white/5">
                  <div className="w-12 h-12 rounded-full bg-slate-900 border border-white/10 overflow-hidden flex items-center justify-center">
                    <img 
                      src={testimonials[activeTestimonial].image_url} 
                      alt={testimonials[activeTestimonial].name} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white font-heading">
                      {testimonials[activeTestimonial].name}
                    </h4>
                    <span className="text-xs text-slate-500 font-light">
                      {testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].company}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence> */}

            {/* Slider controls */}
            <div className="flex justify-end space-x-3.5 mt-8 border-t border-white/5 pt-6">
              <button 
                onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="p-2.5 rounded-full border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300 active:scale-95"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="p-2.5 rounded-full border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300 active:scale-95"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BOTTOM SECTION */}
      <section className="py-24 relative overflow-hidden border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <div className="glass-card rounded-3xl border border-white/5 p-12 md:p-16 shadow-2xl relative overflow-hidden space-y-8">
            <div className="absolute w-24 h-24 rounded-full bg-blue-500/20 blur-xl top-6 left-6" />
            <div className="absolute w-32 h-32 rounded-full bg-purple-500/20 blur-xl bottom-6 right-6" />

            <div className="space-y-4 max-w-xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-white leading-tight">
                Want to Start a <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Project Together?
                </span>
              </h2>
              <p className="text-sm text-slate-400 font-light leading-relaxed">
                Connect with our team to start drafting your next luxury web design, branding guide, or custom software solution today.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center text-xs font-bold px-7 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 active:scale-95 group animate-pulse"
              >
                Let's Talk
                <FiArrowRight className="ml-2 group-hover:transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

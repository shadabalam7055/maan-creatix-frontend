'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, 
  FiArrowRight, 
  FiCalendar, 
  FiUser, 
  FiClock, 
  FiGrid, 
  FiExternalLink,
  FiCompass,
  FiBookmark
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
  category?: string;
  tags?: string[];
  demo_link?: string;
  client?: string;
  duration?: string;
  completion_date?: string;
  is_featured: boolean;
  category_relation?: CategoryItem;
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
    title: 'Cyberpunk Portfolio Hub',
    slug: 'cyberpunk-portfolio-hub',
    description: 'A premium developer dashboard featuring dark glassmorphism styling, ambient glowing borders, and Framer Motion spring actions.',
    image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
    category: 'UI/UX Design',
    tags: ['Next.js', 'TailwindCSS', 'Framer Motion'],
    client: 'Aether Nexus',
    duration: '2 Months',
    is_featured: true,
  },
  {
    id: 2,
    title: 'Fintech Analytics Platform',
    slug: 'fintech-analytics-platform',
    description: 'High-speed administrative portal with real-time telemetry graphs, dark themes, and secure JWT-based backend gateways.',
    image_url: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=600&q=80',
    category: 'Web Development',
    tags: ['React', 'Laravel API', 'MySQL'],
    client: 'Bancorp Digit',
    duration: '4 Months',
    is_featured: false,
  },
  {
    id: 3,
    title: 'Neon Brand Identity System',
    slug: 'neon-brand-identity',
    description: 'Corporate branding project utilizing futuristic visual structures, luxury color maps, and ambient visual packaging designs.',
    image_url: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=600&q=80',
    category: 'Branding',
    tags: ['Figma', 'Illustrator', '3D Blender'],
    client: 'Helix Labs',
    duration: '1.5 Months',
    is_featured: false,
  },
];

export default function ProjectsListingPage() {
  const [projects] = useState<ProjectItem[]>(fallbackProjects);
  const [categories] = useState<CategoryItem[]>(fallbackCategories);
  const [loading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Client-side initialization only
  }, []);

  // Filter logic
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (project.tags && project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const projectCat = project.category_relation?.name || project.category || '';
    const matchesCategory = selectedCategory === 'All' || 
                            projectCat.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const featuredProject = projects.find(p => p.is_featured) || projects[0];

  return (
    <div className="bg-[#050816] text-white min-h-screen flex flex-col font-body selection:bg-blue-500/20 selection:text-blue-200 overflow-x-hidden transition-colors duration-300 dark:bg-[#050816] light:bg-[#f8fafc]">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Glow ambient backgrounds */}
        <div className="glow-orb glow-blue w-[500px] h-[500px] -top-20 -left-20 opacity-30 pointer-events-none" />
        <div className="glow-orb glow-purple w-[500px] h-[500px] top-1/4 -right-10 opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-6 text-left">
          <div className="inline-flex items-center space-x-2 bg-blue-500/5 border border-blue-500/15 px-4.5 py-1.5 rounded-full backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[10px] md:text-xs font-bold text-blue-300 uppercase tracking-widest">
              Our Case Studies
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading text-white">
            Engineering Digital <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">Landmarks</span>
          </h1>
          <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed max-w-xl">
            Explore our curated gallery of premium websites, bespoke software systems, and branding assets designed to grow market leaders.
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
              placeholder="Search by technologies, clients, features..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500/40 transition-colors"
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
              All Projects
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

      {/* PROJECTS CONTAINER */}
      <main className="flex-grow py-16 relative">
        {loading ? (
          <div className="min-h-[400px] flex items-center justify-center flex-col space-y-4">
            <div className="w-12 h-12 border-t-2 border-blue-500 rounded-full animate-spin" />
            <span className="text-xs font-semibold text-slate-500 tracking-wider">Retrieving Projects Portfolio...</span>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
            
            {/* FEATURED SPOTLIGHT CARD (Only show if matches search filters and exists) */}
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
                      Spotlight Case Study
                    </div>
                  </div>

                  {/* Details block */}
                  <div className="lg:col-span-5 text-left space-y-6">
                    <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                      <FiCompass className="w-4 h-4" />
                      <span>{featuredProject.category_relation?.name || featuredProject.category}</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-white leading-tight">
                      {featuredProject.title}
                    </h2>

                    <p className="text-slate-400 font-light text-sm md:text-base leading-relaxed">
                      {featuredProject.description}
                    </p>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap gap-2">
                      {featuredProject.tags?.map(tag => (
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

            {/* PROJECTS GRID */}
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
                        className="glass-card rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between hover:border-white/10 hover:bg-white/[0.03] transition-all duration-500 group text-left"
                      >
                        {/* Image banner */}
                        <div className="aspect-[16/10] overflow-hidden border-b border-white/5 relative bg-slate-950">
                          <img 
                            src={project.image_url} 
                            alt={project.title} 
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 opacity-90"
                          />
                          <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md text-[10px] text-slate-300 font-bold px-3 py-1 rounded border border-white/5">
                            {project.category_relation?.name || project.category}
                          </div>
                        </div>

                        {/* Description blocks */}
                        <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                          <div className="space-y-2">
                            <h3 className="text-xl font-bold font-heading text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                              {project.title}
                            </h3>
                            <p className="text-slate-400 font-light text-xs line-clamp-3 leading-relaxed">
                              {project.description}
                            </p>
                          </div>

                          <div className="space-y-4 pt-4 border-t border-white/5">
                            {/* Project tags */}
                            <div className="flex flex-wrap gap-1.5">
                              {project.tags?.slice(0, 3).map(tag => (
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
                                View Case Study
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
        )}
      </main>

      <Footer />
    </div>
  );
}

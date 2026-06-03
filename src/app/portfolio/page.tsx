'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch,
  FiArrowRight,
  FiExternalLink,
} from 'react-icons/fi';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface ProjectItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image_url: string;
  tags: string[];
  client: string;
  live_link: string;
  is_featured?: boolean;
}

const projects: ProjectItem[] = [
  {
    id: 1,
    title: 'Gym Management System',
    category: 'UI/UX Design',
    description:
      'Sleek gym management dashboard with futuristic UI, real-time class scheduling, and member analytics.',
    image_url: '/project-1.png',
    tags: ['Next.js', 'TailwindCSS', 'Framer Motion'],
    client: 'Allan Fitness Club',
    live_link: 'https://gym.maancreatix.com',
    is_featured: true,
  },

  {
    id: 2,
    title: 'Lockdown Restaurant',
    category: 'Restaurant Website',
    description:
      'Luxury restaurant website with cinematic visuals, smooth animations and premium food showcase sections.',
    image_url: '/project-2.png',
    tags: ['React', 'GSAP', 'Responsive'],
    client: 'Lockdown Restaurant',
    live_link: 'https://restaurant.maancreatix.com',
  },

  {
    id: 3,
    title: 'Spa & Wellness Studio',
    category: 'Spa Website',
    description:
      'Elegant spa experience focused on smooth UI interactions, calming aesthetics and premium booking flow.',
    image_url: '/project-3.png',
    tags: ['Luxury UI', 'Next.js', 'Animations'],
    client: 'Aura Spa',
    live_link: 'https://spa.maancreatix.com',
  }

  // {
  //   id: 4,
  //   title: 'Creative Agency Portfolio',
  //   category: 'Agency Website',
  //   description:
  //     'Modern agency portfolio featuring futuristic design system, animated layouts and glowing visual effects.',
  //   image_url: '/agency-project.png',
  //   tags: ['Portfolio', 'Modern UI', 'Framer Motion'],
  //   client: 'Maan Creatix',
  //   live_link: 'https://maancreatix.com',
  // },

  // {
  //   id: 5,
  //   title: 'Fashion E-Commerce Store',
  //   category: 'E-Commerce',
  //   description:
  //     'Premium fashion store with modern shopping experience, smooth cart flow and responsive layouts.',
  //   image_url: '/ecommerce-project.png',
  //   tags: ['E-Commerce', 'Stripe', 'Next.js'],
  //   client: 'Veloura Fashion',
  //   live_link: 'https://fashion.maancreatix.com',
  // },

  // {
  //   id: 6,
  //   title: 'Business Consulting Website',
  //   category: 'Corporate Website',
  //   description:
  //     'Professional consulting website designed for lead generation, trust building and premium branding.',
  //   image_url: '/business-project.png',
  //   tags: ['Corporate', 'SEO', 'Performance'],
  //   client: 'Elevate Consulting',
  //   live_link: 'https://business.maancreatix.com',
  // },
];

export default function PortfolioPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) =>
      `${project.title} ${project.category} ${project.description}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const featuredProject =
    projects.find((project) => project.is_featured) || projects[0];

  return (
    <div className="bg-[#050816] text-white min-h-screen flex flex-col font-body selection:bg-blue-500/20 selection:text-blue-200 overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      {/* HERO SECTION */}
<section className="relative pt-36 pb-20 overflow-hidden bg-[#050816]">
  {/* Background glow */}
  <div className="glow-orb glow-blue w-[600px] h-[600px] -top-30 -left-25 opacity-20 pointer-events-none glowing-orb-animated" />

  <div className="glow-orb glow-purple w-[600px] h-[600px] top-1/4 -right-10 opacity-15 pointer-events-none glowing-orb-animated" />

  <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

      {/* LEFT CONTENT */}
      <div className="space-y-6 text-left">
        <div className="inline-flex items-center space-x-2 bg-blue-500/5 border border-blue-500/15 px-4.5 py-1.5 rounded-full backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />

          <span className="text-[10px] md:text-xs font-bold text-blue-300 uppercase tracking-widest">
            Creative Portfolio
          </span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading text-white leading-tight"
        >
          Crafted Digital Experiences
          <br />

          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            That Actually Feel Premium
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-sm md:text-base text-slate-400 font-light leading-relaxed max-w-2xl"
        >
          Explore modern websites, premium UI systems and cinematic
          digital products crafted with smooth animations and
          high-end user experience.
        </motion.p>
      </div>

      {/* RIGHT ANIMATION */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative hidden lg:flex items-center justify-center"
      >
        {/* Main Circle */}
        <div className="relative w-[420px] h-[420px] rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-xl flex items-center justify-center">

          {/* Floating card top */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: 'easeInOut',
            }}
            className="absolute top-8 right-0 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                ✦
              </div>

              <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">
                  Future Tech
                </p>

                <p className="text-sm text-white font-semibold">
                  Premium UI
                </p>
              </div>
            </div>
          </motion.div>

          {/* Main dashboard card */}
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: 'easeInOut',
            }}
            className="w-[290px] rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6 shadow-[0_0_60px_rgba(59,130,246,0.08)]"
          >
            {/* dots */}
            <div className="flex items-center gap-2 mb-8">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                  Maan Creatix
                </span>

                <span className="text-[10px] text-green-400 font-semibold">
                  Live
                </span>
              </div>

              <div className="space-y-3">
                <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    animate={{ width: ['40%', '85%', '60%'] }}
                    transition={{
                      repeat: Infinity,
                      duration: 5,
                      ease: 'easeInOut',
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                  />
                </div>

                <div className="w-[70%] h-3 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    animate={{ width: ['30%', '90%', '50%'] }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: 'easeInOut',
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-400"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-2xl font-extrabold text-white">
                    99%
                  </p>

                  <p className="text-xs text-slate-500">
                    Client Satisfaction
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-extrabold text-white">
                    24+
                  </p>

                  <p className="text-xs text-slate-500">
                    Projects
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating bottom card */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: 'easeInOut',
            }}
            className="absolute bottom-10 left-0 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 border border-[#050816]" />

                <div className="w-8 h-8 rounded-full bg-purple-500 border border-[#050816]" />

                <div className="w-8 h-8 rounded-full bg-pink-500 border border-[#050816]" />
              </div>

              <div>
                <p className="text-sm text-white font-semibold">
                  Join 150+ Clients
                </p>

                <p className="text-xs text-slate-500">
                  Trusted Worldwide
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </div>
</section>

      {/* SEARCH */}
      <section className="py-6 border-y border-white/5 bg-slate-900/10 backdrop-blur-md relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="relative w-full md:max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />

            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-3 text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500/40 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="flex-grow py-16 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">

          {/* FEATURED PROJECT */}
          {featuredProject && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-2xl p-6 md:p-12 hover:border-white/15 transition-all duration-500 group"
            >
              <div className="absolute w-[300px] h-[300px] bg-blue-600/10 blur-[80px] -top-20 -left-20 rounded-full" />

              <div className="absolute w-[200px] h-[200px] bg-purple-600/5 blur-[80px] bottom-10 right-10 rounded-full" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

                {/* IMAGE */}
                <div className="lg:col-span-7 rounded-2xl overflow-hidden aspect-[16/10] border border-white/5 relative bg-slate-950">
                  <img
                    src={featuredProject.image_url}
                    alt={featuredProject.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />

                  <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow">
                    Spotlight Project
                  </div>
                </div>

                {/* CONTENT */}
                <div className="lg:col-span-5 text-left space-y-6">
                  <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                    <span>{featuredProject.category}</span>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-white leading-tight">
                    {featuredProject.title}
                  </h2>

                  <p className="text-slate-400 font-light text-xs md:text-sm leading-relaxed">
                    {featuredProject.description}
                  </p>

                  {/* TAGS */}
                  <div className="flex flex-wrap gap-2">
                    {featuredProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] bg-white/5 border border-white/5 px-3 py-1 rounded-full text-slate-300 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="h-px bg-white/5" />

                  {/* BUTTON */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                        Client
                      </span>

                      <span className="text-sm font-semibold text-slate-200 mt-0.5 block">
                        {featuredProject.client}
                      </span>
                    </div>

                    <a
                      href={featuredProject.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center text-xs font-bold px-6 py-3.5 bg-white text-slate-900 rounded-full hover:bg-slate-200 transition-colors shadow-lg active:scale-95 group/btn"
                    >
                      Open Project

                      <FiExternalLink className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* PROJECT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className="glass-card rounded-3xl border border-white/5 overflow-hidden hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.08)] transition-all duration-500 group"
                >
                  {/* IMAGE */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-950 border-b border-white/5">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />

                    <div className="absolute top-4 left-4">
                      {/* <span className="bg-slate-900/80 backdrop-blur-md text-[10px] text-slate-300 font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider">
                        {project.category}
                      </span> */}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-3 max-w-[260px">
                      <h2
                        className="font-heading font-extrabold text-[44px] leading-[0.9] tracking-[-0.04em] bg-gradient-to-r from-[#5EA2FF] via-[#8B7DFF] to-[#C497FF] bg-clip-text text-transparent"
                        style={{
                        fontSize: 'clamp(20px,2vw,32px)',
                        wordBreak: 'keep-all',
                        }}
                        >
                        {project.title}
                      </h2>

                      <p className="text-slate-400 text-sm font-light leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* TAGS */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] bg-white/5 border border-white/5 px-3 py-1 rounded-full text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* BUTTON */}
                    <a
                      href={project.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center text-xs font-bold px-5 py-3.5 bg-white text-slate-900 rounded-full hover:bg-slate-200 transition-colors shadow-lg active:scale-95 group/btn"
                    >
                      Open Project

                      <FiArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* CTA */}
      <section className="pb-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
          <div className="glass-card rounded-3xl border border-white/5 p-12 md:p-16 shadow-2xl relative overflow-hidden text-center">
            <div className="absolute w-24 h-24 rounded-full bg-blue-500/20 blur-xl top-6 left-6" />

            <div className="absolute w-32 h-32 rounded-full bg-purple-500/20 blur-xl bottom-6 right-6" />

            <div className="space-y-5 relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-white leading-tight">
                Ready to Build Something
                <br />

                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Exceptional?
                </span>
              </h2>

              <p className="text-sm text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
                Let’s create premium digital experiences with smooth
                interactions, modern UI and powerful branding.
              </p>

              <a
                href="/contact"
                className="inline-flex items-center justify-center text-xs font-bold px-7 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 active:scale-95 group mt-4"
              >
                Start Your Project

                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  FiArrowRight, 
  FiExternalLink, 
  FiUsers, 
  FiAward, 
  FiBriefcase, 
  FiBookOpen, 
  FiTarget, 
  FiEye, 
  FiCode, 
  FiMonitor, 
  FiCpu, 
  FiDatabase, 
  FiPenTool, 
  FiActivity, 
  FiStar, 
  FiGithub, 
  FiTwitter, 
  FiLinkedin, 
  FiGlobe,
  FiMessageCircle,
  FiCheck
} from 'react-icons/fi';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Define Interface structures matching backend schemas
interface AboutContentData {
  hero_title: string;
  hero_description: string;
  mission_title: string;
  mission_description: string;
  mission_icon: string;
  vision_title: string;
  vision_description: string;
  vision_icon: string;
  history_title: string;
  history_description: string;
}

interface TimelineItem {
  id: number;
  year: string;
  title: string;
  description: string;
  sort_order: number;
}

interface TeamMemberItem {
  id: number;
  name: string;
  role: string;
  bio: string;
  skills: string[] | string;
  image_url: string;
  twitter_url?: string;
  linkedin_url?: string;
  github_url?: string;
}

interface TechItem {
  id: number;
  name: string;
  category: string;
  icon_type: string;
}

interface GalleryItem {
  id: number;
  image_url: string;
  caption?: string;
  sort_order: number;
}

interface StatItem {
  id: number;
  label: string;
  value: string;
  icon?: string;
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

// Icon mapper for general CMS icons
const iconMap: Record<string, React.ComponentType<any>> = {
  Eye: FiEye,
  Target: FiTarget,
  Users: FiUsers,
  Briefcase: FiBriefcase,
  GraduationCap: FiBookOpen,
  Award: FiAward,
  Code: FiCode,
  Monitor: FiMonitor,
  Cpu: FiCpu,
  Database: FiDatabase,
  Palette: FiPenTool,
  PenTool: FiPenTool,
  Activity: FiActivity,
};

// Beautiful premium design fallbacks
const fallbackContent: AboutContentData = {
  hero_title: 'We Are Maan Creatix. A Creative Digital Agency Driven By Passion.',
  hero_description: 'We partner with visionaries to build head-turning digital experiences that command attention. By fusing modern engineering architectures with custom dark premium design aesthetics, we elevate brands into digital landmarks.',
  mission_title: 'Our Mission',
  mission_description: 'To engineer digital interfaces that inspire, engage, and deliver exceptional measurable performance. We turn ideas into products with flawless design code.',
  mission_icon: 'Eye',
  vision_title: 'Our Vision',
  vision_description: 'To define the premium standard of modern dark-mode aesthetics and digital engineering. We strive to be the global benchmark of design and code excellence.',
  vision_icon: 'Target',
  history_title: 'Our Story',
  history_description: 'Founded in 2024 by a cohort of designers and engineers, Maan Creatix emerged from a simple realization: the digital landscape had grown monotonous. We set out to disrupt the status quo by introducing a dark luxury aesthetic paired with rapid engineering frameworks.',
};

const fallbackTimeline: TimelineItem[] = [
  { id: 1, year: '2025', title: 'Agency Founded', description: 'Maan Creatix was born, establishing a boutique studio dedicated to premium dark digital designs and bespoke web products.', sort_order: 1 },
  { id: 2, year: '2025', title: 'Scaling Horizons', description: 'Expanded the engineering division, onboarding specialized React and Laravel developers, and scaled operations globally.', sort_order: 2 },
  { id: 3, year: '2026', title: 'Pioneering Innovation', description: 'Launched our own design-system components and fully integrated custom WebSockets and real-time dashboard controllers.', sort_order: 3 }
];

const fallbackTeam: TeamMemberItem[] = [
  {
    id: 1,
    name: 'Abhijeet Singh',
    role: 'Graphic & UI/UX Designer ( Founder & CEO )',
    bio: 'Over 4 years of experience building modern Next.js and Laravel applications with complex cloud integration.',
    skills: ['Figma', 'UI/UX Design', 'Branding', 'Motion Design'],
    image_url: '/abhijeet.jpeg',
    twitter_url: '#',
    linkedin_url: 'https://www.linkedin.com/in/up23abhijeet?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    github_url: 'https://github.com/up23abhijeet',
  },
  {
    id: 2,
    name: 'Shadab Alam',
    role: 'Senior Backend Developer ( Founder & CEO )',
    bio: 'Over 2 years of experience in building scalable backend systems with a focus on performance and security.',
    skills: ['PHP', 'Laravel', 'Database Administration', 'System Architecture'],
    image_url: '/shadab.jpeg',
    twitter_url: '#',
    linkedin_url: 'https://www.linkedin.com/in/shadab-alam-s7055/',
    github_url: 'https://github.com/shadabalam7055',
  },
  {
    id: 3,
    name: 'Harpreet Singh',
    role: 'Senior Frontend Developer ( Founder & CEO )',
    bio: 'Over 2 years of experience in translating beautiful pixel-perfect designs into fast, fluid interactions and micro-animations.',
    skills: ['React', 'JavaScript', 'Tailwind CSS', 'Next.js'],
    image_url: '/harpreet.jpeg',
    twitter_url: '#',
    linkedin_url: 'https://www.linkedin.com/in/harpreet-singh-38b9b03b8',
    github_url: 'https://github.com/harpreetgill01',
  }
];

const fallbackTechs: TechItem[] = [
  { id: 1, name: 'Next.js', category: 'Frontend', icon_type: 'Code' },
  { id: 2, name: 'React', category: 'Frontend', icon_type: 'Monitor' },
  { id: 3, name: 'Tailwind CSS', category: 'Design', icon_type: 'Palette' },
  { id: 4, name: 'Laravel', category: 'Backend', icon_type: 'Cpu' },
  { id: 5, name: 'SQLite', category: 'Database', icon_type: 'Database' },
  { id: 6, name: 'Framer Motion', category: 'Frontend', icon_type: 'Activity' },
  { id: 7, name: 'Figma', category: 'Design', icon_type: 'PenTool' },
  { id: 8, name: 'Docker', category: 'DevOps', icon_type: 'Cpu' }
];

const fallbackGallery: GalleryItem[] = [
  { id: 1, image_url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&h=500&q=80', caption: 'Our main brainstorming desk where design paradigms are broken.', sort_order: 1 },
  { id: 2, image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&h=500&q=80', caption: 'The hardware testing lab where performance validation takes place.', sort_order: 2 },
  { id: 3, image_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&h=500&q=80', caption: 'Our cozy dark-mode lounge designed for focus and deep work sessions.', sort_order: 3 }
];

const fallbackStats: StatItem[] = [
  { id: 1, label: 'Happy Clients', value: '150+', icon: 'Users' },
  { id: 2, label: 'Projects Completed', value: '250+', icon: 'Briefcase' },
  { id: 3, label: 'Years Experience', value: '4+', icon: 'GraduationCap' },
  { id: 4, label: 'Client Satisfaction', value: '99%', icon: 'Award' }
];

const fallbackTestimonials: TestimonialItem[] = [
  { id: 1, name: 'Rahul Sharma', role: 'CEO', company: 'TechNove', review: 'Maan Creatix delivered a fantastic website that exceeded our expectations. Highly professional and on-time delivery!', rating: 5, image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80' },
  { id: 2, name: 'Priya Verma', role: 'Marketing Head', company: 'Aura Brand', review: 'The designs were creative, modern and exactly what our brand needed. Great experience!', rating: 5, image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80' }
];

export default function AboutPage() {
  const [content] = useState<AboutContentData>(fallbackContent);
  const [timeline] = useState<TimelineItem[]>(fallbackTimeline);
  const [team] = useState<TeamMemberItem[]>(fallbackTeam);
  const [techs] = useState<TechItem[]>(fallbackTechs);
  const [gallery] = useState<GalleryItem[]>(fallbackGallery);
  const [stats] = useState<StatItem[]>(fallbackStats);
  const [testimonials] = useState<TestimonialItem[]>(fallbackTestimonials);

  useEffect(() => {
    // Client-side initialization only
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
  };

  return (
    <div className="bg-[#050816] text-white min-h-screen flex flex-col font-body selection:bg-blue-500/20 selection:text-blue-200">
      <Navbar />

      {/* SECTION 1 — HERO */}
      <section className="pt-32 pb-20 relative overflow-hidden flex items-center justify-center min-h-[90vh]">
        {/* Neon glow grids */}
        <div className="glow-orb glow-blue w-[600px] h-[600px] -top-40 -left-40" />
        <div className="glow-orb glow-purple w-[600px] h-[600px] top-1/3 -right-20" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-center">
          {/* Left Hero Details */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-left"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-blue-500/5 border border-blue-500/15 px-4.5 py-1.5 rounded-full backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[10px] md:text-xs font-bold text-blue-300 uppercase tracking-widest">
                About Maan Creatix
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] font-heading">
              {content.hero_title.split('. ')[0]}
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                {content.hero_title.split('. ').slice(1).join('. ')}
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-sm md:text-base text-slate-400 font-light leading-relaxed max-w-2xl">
              {content.hero_description}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center text-xs font-bold px-7 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 active:scale-95 group"
              >
                Start Your Project
                <FiArrowRight className="ml-2 group-hover:transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center text-xs font-bold px-7 py-4 border border-white/10 rounded-full text-slate-300 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300 active:scale-95"
              >
                Explore Our Work
              </Link>
            </motion.div>

            {/* Pills */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2.5 pt-6">
              {['Creativity', 'Innovation', 'Quality', 'Growth'].map((pill) => (
                <span 
                  key={pill}
                  className="bg-white/5 border border-white/5 hover:border-blue-500/20 px-4 py-1.5 rounded-full text-[10px] md:text-xs text-slate-300 font-semibold transition-all hover:bg-white/8 cursor-default"
                >
                  # {pill}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Hero Visuals */}
          <div className="lg:col-span-5 relative w-full h-[350px] md:h-[450px] flex items-center justify-center">
            {/* Ambient visual container with floating properties */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Central glowing neon ring */}
              <div className="absolute w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full border border-blue-500/10 shadow-[0_0_80px_rgba(59,130,246,0.15)] flex items-center justify-center">
                <div className="absolute w-[180px] h-[180px] rounded-full border border-purple-500/10 shadow-[0_0_40px_rgba(139,92,246,0.1)]" />
              </div>

              {/* Floating screens composition */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-[220px] md:w-[280px] aspect-video bg-slate-900/80 border border-white/10 rounded-2xl p-3 shadow-2xl backdrop-blur-md z-20 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="flex space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-[8px] text-slate-500 uppercase tracking-widest font-semibold">maan.agency</span>
                </div>
                <div className="py-4 space-y-2 flex-1 flex flex-col justify-center">
                  <div className="h-2 w-3/4 bg-blue-500/20 rounded" />
                  <div className="h-2 w-1/2 bg-purple-500/20 rounded" />
                  <div className="h-2 w-5/6 bg-white/5 rounded" />
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[8px] text-slate-500">
                  <span>99% Client Satisfaction</span>
                  <span className="text-emerald-400">Live</span>
                </div>
              </motion.div>

              {/* Floating Spheres & Cards */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-12 right-6 md:right-12 bg-white/5 border border-white/5 rounded-2xl p-4 shadow-xl backdrop-blur-md z-30 space-y-2.5"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/25 flex items-center justify-center">
                    <FiCpu className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Future Tech</span>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [15, -15, 15] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-12 left-6 md:left-12 bg-white/5 border border-white/5 rounded-2xl p-4 shadow-xl backdrop-blur-md z-30"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500 border border-[#050816] flex items-center justify-center text-[8px] font-bold">A</div>
                    <div className="w-6 h-6 rounded-full bg-purple-500 border border-[#050816] flex items-center justify-center text-[8px] font-bold">R</div>
                  </div>
                  <span className="text-[10px] text-slate-300 font-semibold">Join the 150+ Clients</span>
                </div>
              </motion.div>

              {/* Ambient blur sphere */}
              <div className="absolute w-36 h-36 rounded-full bg-blue-500/20 blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — STATS BAR */}
      <section className="py-12 bg-slate-950/40 border-y border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const IconComp = iconMap[stat.icon || 'Users'] || FiUsers;
              return (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center justify-center text-center space-y-2 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/3 border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-2xl md:text-3xl font-extrabold tracking-tight text-white">{stat.value}</span>
                    <span className="block text-[10px] md:text-xs text-slate-500 font-semibold uppercase tracking-wider">{stat.label}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3 — OUR STORY & TIMELINE */}
      <section className="py-24 relative overflow-hidden border-b border-white/5">
        <div className="glow-orb glow-purple w-[500px] h-[500px] top-1/4 left-1/3 opacity-5" />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left Story Side */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-purple-500/5 border border-purple-500/15 px-4 py-1.5 rounded-full">
                  <span className="text-[10px] md:text-xs font-bold text-purple-400 uppercase tracking-widest">
                    Our Roots
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-white">
                  {content.history_title}
                </h2>
                <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed">
                  {content.history_description}
                </p>
              </div>

              {/* Composition Images Layout */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden aspect-square bg-slate-950 border border-white/5 shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&h=400&q=80" 
                    alt="Team Collaborating"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square bg-slate-950 border border-white/5 shadow-2xl mt-6">
                  <img 
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&h=400&q=80" 
                    alt="Creative Studio"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  />
                </div>
              </div>
            </div>

            {/* Right Timeline Side */}
            <div className="lg:col-span-7 space-y-12">
              <h3 className="text-lg font-bold uppercase tracking-wider text-slate-300 font-heading border-b border-white/5 pb-4 text-left">
                Milestone Journey
              </h3>

              <div className="relative pl-6 md:pl-8 border-l border-white/5 space-y-10 text-left">
                {timeline.map((item, index) => (
                  <motion.div 
                    key={item.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="relative"
                  >
                    {/* Ring dot marker */}
                    <div className="absolute w-4 h-4 rounded-full bg-[#050816] border border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] -left-[35px] md:-left-[43px] top-1 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    </div>

                    <div className="glass-card rounded-2xl p-6 border border-white/5 hover:border-blue-500/20 transition-colors shadow-lg">
                      <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
                        {item.year}
                      </span>
                      <h4 className="text-md font-bold text-white mb-1.5 tracking-tight font-heading">{item.title}</h4>
                      <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — MISSION & VISION */}
      <section className="py-24 relative overflow-hidden bg-slate-950/20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-8 md:p-10 border border-white/5 hover:border-purple-500/20 transition-all text-left shadow-2xl relative group overflow-hidden"
            >
              <div className="absolute w-40 h-40 bg-purple-500/5 rounded-full blur-3xl -top-20 -right-20 group-hover:bg-purple-500/10 transition-colors" />
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-6">
                <FiEye className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight font-heading">{content.mission_title}</h3>
              <p className="text-sm text-slate-400 font-light leading-relaxed">{content.mission_description}</p>
            </motion.div>

            {/* Vision Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-3xl p-8 md:p-10 border border-white/5 hover:border-blue-500/20 transition-all text-left shadow-2xl relative group overflow-hidden"
            >
              <div className="absolute w-40 h-40 bg-blue-500/5 rounded-full blur-3xl -top-20 -right-20 group-hover:bg-blue-500/10 transition-colors" />
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
                <FiTarget className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight font-heading">{content.vision_title}</h3>
              <p className="text-sm text-slate-400 font-light leading-relaxed">{content.vision_description}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — TEAM MEMBERS */}
      <section className="py-24 relative overflow-hidden border-b border-white/5">
        <div className="glow-orb glow-blue w-[400px] h-[400px] bottom-10 -left-20 opacity-5" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          {/* Header */}
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-blue-500/5 border border-blue-500/15 px-4 py-1.5 rounded-full">
              <span className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-widest">
                Our Specialists
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-white">
              Meet The Innovators
            </h2>
            <p className="text-sm text-slate-400 font-light">
              Crafting premium digital aesthetics with meticulous attention to clean and rapid architectures.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="glass-card rounded-3xl border border-white/5 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.12)] transition-all overflow-hidden flex flex-col group text-left"
              >
                {/* Photo */}
                <div className="aspect-[4/3] w-full bg-slate-950 overflow-hidden relative border-b border-white/5">
                  <img 
                    src={member.image_url} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60" />
                  
                  {/* Social links overlays */}
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    {member.twitter_url && (
                      <a href={member.twitter_url} className="w-8 h-8 rounded-lg bg-slate-950/80 border border-white/10 hover:border-blue-500/50 hover:text-blue-400 flex items-center justify-center transition-colors text-slate-400">
                        <FiTwitter className="w-4 h-4" />
                      </a>
                    )}
                    {member.linkedin_url && (
                      <a href={member.linkedin_url} className="w-8 h-8 rounded-lg bg-slate-950/80 border border-white/10 hover:border-blue-500/50 hover:text-blue-400 flex items-center justify-center transition-colors text-slate-400">
                        <FiLinkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.github_url && (
                      <a href={member.github_url} className="w-8 h-8 rounded-lg bg-slate-950/80 border border-white/10 hover:border-blue-500/50 hover:text-blue-400 flex items-center justify-center transition-colors text-slate-400">
                        <FiGithub className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{member.role}</span>
                    <h3 className="text-lg font-bold text-white tracking-tight font-heading">{member.name}</h3>
                    <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed">{member.bio}</p>
                  </div>

                  {/* Skills badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {Array.isArray(member.skills) && member.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="bg-white/3 border border-white/5 text-slate-300 text-[9px] font-semibold px-2 py-0.5 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — TECHNOLOGIES WE USE */}
      <section className="py-24 relative overflow-hidden bg-slate-950/20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          {/* Header */}
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-purple-500/5 border border-purple-500/15 px-4 py-1.5 rounded-full">
              <span className="text-[10px] md:text-xs font-bold text-purple-400 uppercase tracking-widest">
                Our Arsenal
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-white">
              Technologies We Command
            </h2>
            <p className="text-sm text-slate-400 font-light">
              Fusing modern engineering architectures with reliable tech stack frameworks.
            </p>
          </div>

          {/* Grid stack */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {techs.map((tech, i) => {
              const IconComp = iconMap[tech.icon_type] || FiMonitor;
              return (
                <motion.div 
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/3 border border-white/5 hover:border-blue-500/30 rounded-2xl p-5 flex flex-col justify-between items-start text-left hover:shadow-[0_0_20px_rgba(59,130,246,0.06)] transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-white/5 text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/20 flex items-center justify-center transition-colors">
                    <IconComp className="w-4.5 h-4.5" />
                  </div>
                  <div className="mt-6">
                    <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">{tech.category}</span>
                    <span className="block text-sm font-bold text-white tracking-wide mt-0.5">{tech.name}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 7 — WORKSPACE GALLERY */}
      <section className="py-24 relative overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          {/* Header */}
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-blue-500/5 border border-blue-500/15 px-4 py-1.5 rounded-full">
              <span className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-widest">
                Our Environment
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-white">
              Studio & Workspace
            </h2>
            <p className="text-sm text-slate-400 font-light">
              Where lines of code resolve, designs emerge, and digital dreams materialize.
            </p>
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gallery.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="rounded-3xl overflow-hidden border border-white/5 bg-slate-950 aspect-[4/3] relative group shadow-2xl"
              >
                <img 
                  src={item.image_url} 
                  alt={item.caption || "Studio Workspace"} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                {/* Backdrop caption overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-left z-10">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">HQ Location</span>
                  <p className="text-xs text-white font-medium">{item.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — TESTIMONIALS */}
      <section className="py-24 relative overflow-hidden bg-slate-950/20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          {/* Header */}
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-purple-500/5 border border-purple-500/15 px-4 py-1.5 rounded-full">
              <span className="text-[10px] md:text-xs font-bold text-purple-400 uppercase tracking-widest">
                Client Reviews
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-white">
              Endorsements That Inspire
            </h2>
            <p className="text-sm text-slate-400 font-light">
              Don't just take our word for it. Read what founders and CEOs say about their Maan Creatix experience.
            </p>
          </div>

          {/* Testimonial grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((item, index) => (
              <motion.div 
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="glass-card rounded-3xl p-8 border border-white/5 hover:border-purple-500/10 transition-colors shadow-xl flex flex-col justify-between text-left relative group overflow-hidden"
              >
                <div className="space-y-6">
                  {/* Rating */}
                  <div className="flex space-x-1">
                    {Array.from({ length: item.rating }).map((_, r) => (
                      <FiStar key={r} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm md:text-base font-light italic leading-relaxed">
                    "{item.review}"
                  </p>
                </div>

                <div className="flex items-center space-x-4 pt-8 border-t border-white/5 mt-8">
                  <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-xs font-bold">
                    {item.name[0]}
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-white">{item.name}</span>
                    <span className="block text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">{item.role}, {item.company}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 — CTA SECTION */}
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

      {/* Rocket / decorative section */}
      <div className="relative w-full max-w-[200px] mx-auto min-h-[140px] flex items-center justify-center">
        {/* Orbit ring */}
        <div className="absolute w-24 h-24 rounded-full border border-dashed border-purple-500/30 animate-[spin_40s_linear_infinite] flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-400 absolute -top-1" />
        </div>

        {/* Rocket */}
        <motion.div
          animate={{
            y: [0, -12, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          }}
          className="text-4xl text-blue-400 filter drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]"
        >
          🚀
        </motion.div>

        {/* Tiny stars */}
        <div className="absolute top-4 left-6 text-xs text-white/20 animate-pulse">
          ✦
        </div>

        <div className="absolute bottom-8 right-4 text-xs text-white/30 animate-pulse delay-500">
          ✦
        </div>

        <div className="absolute top-16 right-8 text-[9px] text-white/10 animate-pulse delay-1000">
          ✦
        </div>
      </div>

      {/* Heading */}
      <div className="space-y-4 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[0.95] font-heading text-white">
          Let's Build Something
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Amazing Together
          </span>
        </h2>

        <p className="text-sm text-slate-400 font-light leading-relaxed">
          Connect with our specialized team to start drafting your next luxury
          web design, branding guide, or custom software solution today.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 justify-center items-center">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center text-xs font-bold px-8 py-4.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 active:scale-95 group"
        >
          Start Your Project

          <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>

        <a
          href="https://wa.me/917055953578"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center text-xs font-bold px-8 py-4.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/25 rounded-full transition-all duration-300 active:scale-95"
        >
          <FiMessageCircle className="w-4 h-4 mr-2" />
          Chat on WhatsApp
        </a>
      </div>
    </motion.div>
  </div>
</section>

      <Footer />
    </div>
  );
}

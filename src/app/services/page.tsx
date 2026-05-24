'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FiArrowRight, FiCode, FiMonitor, FiBriefcase, FiCpu, FiPenTool, FiDatabase, FiCheckCircle } from 'react-icons/fi';

interface ServiceItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: string;
  glow_color: string;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Code: FiCode,
  Monitor: FiMonitor,
  Briefcase: FiBriefcase,
  Cpu: FiCpu,
  Palette: FiPenTool,
  PenTool: FiPenTool,
  Database: FiDatabase,
};

const fallbackServicesList: ServiceItem[] = [
  { id: 1, title: 'Website Development', slug: 'website-development', description: 'Custom Next.js & React websites built for high-performance and gorgeous user experiences.', icon: 'Code', glow_color: 'blue' },
  { id: 2, title: 'E-Commerce Website Development', slug: 'ecommerce-development', description: 'High-conversion online stores with Stripe payment integration and seamless checkouts.', icon: 'Monitor', glow_color: 'purple' },
  { id: 3, title: 'Business Website Development', slug: 'business-website-development', description: 'Professional corporate websites with dynamic CMS structures to showcase authority.', icon: 'Briefcase', glow_color: 'orange' },
  { id: 4, title: 'Software Development', slug: 'software-development', description: 'Bespoke web applications, CRM databases, and interactive real-time control panels.', icon: 'Cpu', glow_color: 'blue' },
  { id: 5, title: 'Graphic Designing', slug: 'graphic-designing', description: 'Futuristic brand books, pitch decks, vector illustrations, and gorgeous social assets.', icon: 'Palette', glow_color: 'purple' },
  { id: 6, title: 'UI/UX Designing', slug: 'ui-ux-designing', description: 'Interactive Figma mockups, user research flows, and premium high-fidelity wireframes.', icon: 'PenTool', glow_color: 'orange' }
];

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>(fallbackServicesList);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('http://127.0.0.1:8000/api/services')
      .then((res) => {
        if (!res.ok) throw new Error('API server down');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
        }
        setLoading(false);
      })
      .catch(() => {
        // Use local fallbacks
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-[#050816] text-white min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-t-2 border-blue-500 rounded-full animate-spin" />
          <span className="text-xs font-semibold text-slate-500 tracking-wider">Loading Digital Ecosystem...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050816] text-white min-h-screen flex flex-col font-body selection:bg-blue-500/20 selection:text-blue-200">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-36 pb-20 relative overflow-hidden flex items-center justify-center">
        {/* Glow orbs */}
        <div className="glow-orb glow-blue w-[600px] h-[600px] -top-40 -left-40" />
        <div className="glow-orb glow-purple w-[600px] h-[600px] top-1/3 -right-20 opacity-30" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-center relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-blue-500/5 border border-blue-500/15 px-4.5 py-1.5 rounded-full backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[10px] md:text-xs font-bold text-blue-300 uppercase tracking-widest">
              Digital Solutions
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-tight">
            Our Premium <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Digital Services
            </span>
          </h1>

          <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            We partner with digital visionaries to build high-end platforms that engage, inspire, and grow. Inspect our premium design book or choose from our custom services.
          </p>
        </div>
      </section>

      {/* Services Grid List */}
      <section className="pb-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item, index) => {
              const IconComp = iconMap[item.icon] || FiCheckCircle;
              
              const glowBorderClass = item.glow_color === 'purple'
                ? 'hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] text-purple-400'
                : item.glow_color === 'orange'
                  ? 'hover:border-orange-500/30 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] text-orange-400'
                  : 'hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] text-blue-400';

              return (
                <div
                  key={item.slug}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className={`glass-card rounded-3xl p-8 border border-white/5 transition-all duration-300 text-left relative overflow-hidden group flex flex-col justify-between min-h-[320px] animate-fade-in-up ${glowBorderClass}`}
                >
                  <div className="space-y-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/3 border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-current group-hover:border-current/25 transition-all">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white tracking-tight font-heading group-hover:text-current transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-8">
                    <Link
                      href={`/services/${item.slug}`}
                      className="inline-flex items-center text-xs font-bold text-slate-300 group-hover:text-current transition-colors"
                    >
                      Learn More
                      <FiArrowRight className="ml-2 group-hover:transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Bottom Section */}
      <section className="py-24 relative overflow-hidden border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <div className="glass-card rounded-3xl border border-white/5 p-12 md:p-16 shadow-2xl relative overflow-hidden space-y-8">
            <div className="absolute w-24 h-24 rounded-full bg-blue-500/20 blur-xl top-6 left-6" />
            <div className="absolute w-32 h-32 rounded-full bg-purple-500/20 blur-xl bottom-6 right-6" />

            <div className="space-y-4 max-w-xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-heading text-white leading-tight">
                Have a Custom Project <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  In Mind?
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

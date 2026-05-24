'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowRight, 
  FiCheck, 
  FiStar, 
  FiChevronLeft, 
  FiChevronRight, 
  FiActivity, 
  FiBriefcase, 
  FiAward, 
  FiUsers, 
  FiZap, 
  FiPlus, 
  FiMinus, 
  FiInfo, 
  FiX 
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
interface PricingPlanItem {
  id: number;
  name: string;
  subtitle: string;
  price: string;
  billing_period: string;
  features: string[];
  is_popular: boolean;
}

interface FaqItem {
  id: number;
  question: string;
  answer: string;
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

// Fallbacks
const fallbackPlans: PricingPlanItem[] = [
  {
    id: 1,
    name: 'Starter Plan',
    subtitle: 'Perfect for small projects & startups',
    price: '2,999',
    billing_period: '/month',
    features: ['5 Pages Website', 'Responsive Design', 'Basic SEO', '1 Month Support'],
    is_popular: false,
  },
  {
    id: 2,
    name: 'Professional Plan',
    subtitle: 'Best for growing businesses',
    price: '5,999',
    billing_period: '/month',
    features: ['15 Pages Website', 'Responsive Design', 'Advanced SEO & Schema', 'Custom Animations', '3 Months Support', 'Admin Panel Integration'],
    is_popular: true,
  },
  {
    id: 3,
    name: 'Enterprise Plan',
    subtitle: 'For advanced requirements',
    price: '12,999',
    billing_period: '/month',
    features: ['Unlimited Pages', 'E-commerce Integration', 'Bespoke Database & API', '6 Months Support', '24/7 Priority Support', 'Dedicated Project Manager'],
    is_popular: false,
  },
];

const fallbackFaqs: FaqItem[] = [
  { id: 1, question: 'What is included in the Starter Plan?', answer: 'The Starter Plan is designed for startups and small projects, featuring up to 5 custom pages, responsive styling, and basic search engine setup.' },
  { id: 2, question: 'Can I upgrade or downgrade my plan at any time?', answer: 'Yes, you can upgrade or downgrade your active service plan. Contact our team and we will adjust your billing and features accordingly.' },
  { id: 3, question: 'How do monthly and yearly payments work?', answer: 'Monthly billing is charged recurringly. Yearly billing provides a discount of 20% compared to the monthly rate and is billed in one installment.' },
  { id: 4, question: 'Do you provide custom design services?', answer: 'Absolutely. If none of our standard plans fit your requirements, we can create a custom plan tailored to your business needs.' },
  { id: 5, question: 'What technologies do you use for development?', answer: 'We build premium frontends using Next.js, React, and Tailwind CSS. The backends are powered by secure Laravel REST APIs and MySQL databases.' }
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

const processSteps = [
  { number: '01', title: 'Discovery', description: 'We understand your requirements, analyze targets, and map out your business goals.', glow: 'border-blue-500/30 text-blue-400 bg-blue-500/5' },
  { number: '02', title: 'Planning', description: 'We design stunning visual blueprints, mockups, and outline technical parameters.', glow: 'border-purple-500/30 text-purple-400 bg-purple-500/5' },
  { number: '03', title: 'Development', description: 'We craft clean backend endpoints, modular frontend blocks, and configure performance.', glow: 'border-orange-500/30 text-orange-400 bg-orange-500/5' },
  { number: '04', title: 'Launch', description: 'We deploy the high-fidelity app with full optimization and complete testing protocols.', glow: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5' },
];

const comparisonMatrix = [
  { feature: 'Pages', starter: 'Up to 5 Pages', professional: 'Up to 15 Pages', enterprise: 'Unlimited Pages' },
  { feature: 'Custom Design', starter: 'Template Customization', professional: 'Bespoke UI/UX Design', enterprise: 'High-End Art Design & Animation' },
  { feature: 'SEO Optimization', starter: 'Basic On-page', professional: 'Advanced & Schema Tags', enterprise: 'Complete Strategy & Content SEO' },
  { feature: 'Database Support', starter: 'No', professional: 'Yes (Standard MySQL)', enterprise: 'Bespoke Clusters & Optimization' },
  { feature: 'Admin Panel', starter: 'No', professional: 'Yes (Laravel Dashboard)', enterprise: 'Multi-Role CMS & Auditing Tools' },
  { feature: 'API Integrations', starter: 'No', professional: 'Up to 2 APIs', enterprise: 'Unlimited Custom Endpoints' },
  { feature: 'Speed Optimization', starter: 'Standard Caching', professional: 'Next.js SSR & Edge caching', enterprise: '95+ Lighthouse Score Guarantee' },
  { feature: 'Support Duration', starter: '1 Month support', professional: '3 Months support', enterprise: '6 Months priority support' },
  { feature: 'Hosting Config', starter: 'Basic setup', professional: 'Vercel / AWS config', enterprise: 'Custom VPS & Load Balancers' },
  { feature: 'Maintenance', starter: 'Optional add-on', professional: 'Monthly patching', enterprise: 'Bi-weekly updates & security audits' },
];

export default function PricingPage() {
  const [plans, setPlans] = useState<PricingPlanItem[]>(fallbackPlans);
  const [faqs, setFaqs] = useState<FaqItem[]>(fallbackFaqs);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(fallbackTestimonials);
  const [loading, setLoading] = useState(true);
  const [isYearly, setIsYearly] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://127.0.0.1:8000/api/pricing-page-data')
      .then((res) => {
        if (!res.ok) throw new Error('API server down');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data.plans) && data.plans.length > 0) {
          const parsedPlans = data.plans.map((p: any) => ({
            ...p,
            features: typeof p.features === 'string' ? JSON.parse(p.features) : p.features,
            is_popular: Boolean(p.is_popular)
          }));
          setPlans(parsedPlans);
        }
        if (Array.isArray(data.faqs) && data.faqs.length > 0) setFaqs(data.faqs);
        if (Array.isArray(data.testimonials) && data.testimonials.length > 0) setTestimonials(data.testimonials);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const calculateDisplayPrice = (plan: PricingPlanItem) => {
    const rawVal = plan.price.replace(/,/g, '');
    const monthlyPrice = parseInt(rawVal, 10);
    
    if (isNaN(monthlyPrice)) {
      return plan.price;
    }

    if (isYearly) {
      // Apply 20% discount on 12 months
      const discountedYearly = Math.round(monthlyPrice * 12 * 0.8);
      return discountedYearly.toLocaleString('en-IN');
    }

    return plan.price;
  };

  const getBillingLabel = (plan: PricingPlanItem) => {
    if (isYearly) {
      return '/year';
    }
    return plan.billing_period;
  };

  if (loading) {
    return (
      <div className="bg-[#050816] text-white min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-t-2 border-blue-500 rounded-full animate-spin" />
          <span className="text-xs font-semibold text-slate-500 tracking-wider">Loading Pricing Tiers...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050816] text-white min-h-screen flex flex-col font-body selection:bg-blue-500/20 selection:text-blue-200 overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section id="hero" className="min-h-screen relative flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#050816]">
        {/* Glow Ambient background */}
        <div className="glow-orb glow-blue w-[600px] h-[600px] -top-40 -left-40 opacity-40" />
        <div className="glow-orb glow-purple w-[600px] h-[600px] top-1/3 -right-20 opacity-35" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-center">
          {/* Left Side Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-8 text-left"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-500/5 border border-blue-500/15 px-4.5 py-1.5 rounded-full backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[10px] md:text-xs font-bold text-blue-300 uppercase tracking-widest">
                Premium Pricing
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] font-heading">
              Simple <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">Pricing</span> <br />
              For Powerful Digital Solutions
            </h1>

            <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed max-w-lg">
              Transparent, value-driven tiers built to scale your application. From basic storefront setups to complete real-time corporate software systems.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#plans-grid"
                className="inline-flex items-center justify-center text-xs font-bold px-7 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 active:scale-95 group"
              >
                Choose Your Plan
                <FiArrowRight className="ml-2 group-hover:transform group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center text-xs font-bold px-7 py-4 border border-white/10 rounded-full text-slate-300 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300 active:scale-95"
              >
                Contact Team
              </Link>
            </div>
          </motion.div>

          {/* Right Side Mockup (Floating cards, neon rings, animated charts) */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[400px] md:min-h-[500px]">
            {/* Glowing rings */}
            <div className="absolute w-[320px] h-[320px] md:w-[440px] md:h-[440px] rounded-full border-2 border-blue-500/10 flex items-center justify-center animate-[spin_180s_linear_infinite]">
              <div className="w-[85%] h-[85%] rounded-full border border-dashed border-purple-500/10" />
            </div>
            <div className="absolute w-[240px] h-[240px] rounded-full bg-purple-500/10 blur-[80px]" />

            {/* Main Mockup Card */}
            <motion.div
              initial={{ opacity: 0, rotateY: -15, rotateX: 10, y: 30 }}
              animate={{ opacity: 1, rotateY: -10, rotateX: 8, y: 0 }}
              transition={{ type: 'spring', stiffness: 60, damping: 15, delay: 0.3 }}
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
              className="relative z-20 w-[300px] h-[200px] md:w-[360px] md:h-[240px] glass-card p-6 rounded-2xl border border-blue-500/20 shadow-2xl flex flex-col justify-between"
            >
              {/* Fake dashboard headers */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Plan Telemetry</span>
              </div>

              {/* Fake chart/graph */}
              <div className="flex-1 flex items-end space-x-3 pt-6 pb-2">
                <div className="w-full bg-blue-500/10 rounded-t h-[40%] relative group">
                  <div className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t h-[60%] animate-pulse" />
                </div>
                <div className="w-full bg-purple-500/10 rounded-t h-[75%] relative">
                  <div className="absolute bottom-0 left-0 right-0 bg-purple-500 rounded-t h-[80%]" />
                </div>
                <div className="w-full bg-indigo-500/10 rounded-t h-[50%] relative">
                  <div className="absolute bottom-0 left-0 right-0 bg-indigo-500 rounded-t h-[50%]" />
                </div>
                <div className="w-full bg-blue-500/10 rounded-t h-[90%] relative">
                  <div className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t h-[90%]" />
                </div>
              </div>

              {/* Telemetry info row */}
              <div className="flex justify-between items-center text-[9px] text-slate-500 mt-2 font-mono">
                <span>CONVERSION: +24%</span>
                <span>LATENCY: 12ms</span>
              </div>
            </motion.div>

            {/* Overlapping Floating Starter Card */}
            <motion.div
              initial={{ opacity: 0, x: -60, y: -40 }}
              animate={{ opacity: 1, x: -100, y: -60 }}
              transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.5 }}
              className="absolute z-30 p-4 rounded-xl border border-white/10 bg-[#090d23]/80 backdrop-blur-md shadow-xl text-left space-y-2 w-44 hover:border-blue-500/40 transition-colors duration-300"
            >
              <div className="flex items-center space-x-1.5 text-blue-400">
                <FiZap className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Starter</span>
              </div>
              <h4 className="text-base font-extrabold text-white font-heading">₹2,999<span className="text-[9px] text-slate-500 font-light">/mo</span></h4>
              <p className="text-[9px] text-slate-400 leading-normal">5 Custom Pages, Responsive Design grid, SEO.</p>
            </motion.div>

            {/* Overlapping Floating Popular Card */}
            <motion.div
              initial={{ opacity: 0, x: 60, y: 80 }}
              animate={{ opacity: 1, x: 100, y: 90 }}
              transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.6 }}
              className="absolute z-10 p-4 rounded-xl border border-purple-500/30 bg-[#0b0c1e]/90 backdrop-blur-md shadow-xl text-left space-y-2 w-48 shadow-purple-500/5 hover:border-purple-500/50 transition-colors duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-purple-400">
                  <FiStar className="w-3.5 h-3.5 fill-purple-400/30" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Pro Plan</span>
                </div>
                <span className="text-[7px] font-bold px-1.5 py-0.5 bg-purple-500/20 text-purple-300 rounded border border-purple-500/30 uppercase">Popular</span>
              </div>
              <h4 className="text-base font-extrabold text-white font-heading">₹5,999<span className="text-[9px] text-slate-500 font-light">/mo</span></h4>
              <p className="text-[9px] text-slate-400 leading-normal">15 Pages, Custom animations, Admin panel integration.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRICING PLANS GRID SECTION */}
      <section id="plans-grid" className="py-24 relative overflow-hidden bg-[#050816] border-t border-white/5">
        <div className="glow-orb glow-orange w-[500px] h-[500px] bottom-10 left-1/4 opacity-10" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
          {/* Header & Toggle */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="text-left space-y-4 max-w-xl">
              <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
                <span className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-widest">
                  Pricing Plans
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-white">
                Choose the Right Tier
              </h2>
              <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed">
                Unlock high-fidelity interfaces and custom coding pipelines. Start small or build enterprise software.
              </p>
            </div>

            {/* Billing Toggle Component */}
            <div className="flex items-center space-x-4 bg-white/5 border border-white/10 p-1.5 rounded-full self-start md:self-end">
              <button 
                onClick={() => setIsYearly(false)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  !isYearly 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setIsYearly(true)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center space-x-1.5 ${
                  isYearly 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Yearly</span>
                <span className="text-[8px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const displayPrice = calculateDisplayPrice(plan);
              const displayBilling = getBillingLabel(plan);
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`glass-card rounded-3xl p-8 flex flex-col justify-between hover:border-white/15 hover:bg-white/5 transition-all duration-500 relative group ${
                    plan.is_popular ? 'border-purple-500/40 ring-1 ring-purple-500/30' : ''
                  }`}
                >
                  {plan.is_popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow shadow-blue-500/20">
                      Most Popular
                    </span>
                  )}

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-white font-heading">{plan.name}</h3>
                      <p className="text-xs text-slate-500 mt-1 font-light">{plan.subtitle}</p>
                      
                      <div className="flex items-baseline mt-6">
                        <span className="text-slate-400 text-base font-bold mr-1">₹</span>
                        <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight transition-all duration-300">
                          {displayPrice}
                        </span>
                        <span className="text-slate-500 text-xs ml-1 font-light transition-all duration-300">
                          {displayBilling}
                        </span>
                      </div>
                      {isYearly && (
                        <span className="text-[10px] text-emerald-400 font-bold block mt-1">
                          Billed yearly (Save 20% included)
                        </span>
                      )}
                    </div>

                    <div className="h-px bg-white/5" />

                    <ul className="space-y-4">
                      {plan.features.map(feat => (
                        <li key={feat} className="flex items-start text-sm text-slate-300">
                          <FiCheck className="w-4.5 h-4.5 text-blue-400 mr-3 shrink-0 mt-0.5" />
                          <span className="font-light">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8 mt-8 border-t border-white/5">
                    <Link
                      href="/#contact"
                      className={`w-full text-center inline-flex items-center justify-center text-xs font-bold py-3.5 px-6 rounded-xl transition-all duration-300 active:scale-[0.98] ${
                        plan.is_popular
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/10'
                          : 'bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white'
                      }`}
                    >
                      Choose Plan
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURE COMPARISON TABLE */}
      <section id="comparison" className="py-24 relative overflow-hidden bg-[#030612] border-t border-white/5">
        <div className="glow-orb glow-purple w-[400px] h-[400px] top-10 right-10 opacity-5" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
              <span className="text-[10px] md:text-xs font-bold text-purple-400 uppercase tracking-widest">
                Features Matrix
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-white">
              Compare Features
            </h2>
            <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed">
              Analyze side-by-side specifications of Starter, Professional, and Enterprise levels.
            </p>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-white">
                  <th className="px-6 py-5 text-sm font-extrabold tracking-wider font-heading uppercase">Feature</th>
                  <th className="px-6 py-5 text-sm font-extrabold tracking-wider font-heading uppercase text-slate-300">Starter</th>
                  <th className="px-6 py-5 text-sm font-extrabold tracking-wider font-heading uppercase text-blue-400">Professional</th>
                  <th className="px-6 py-5 text-sm font-extrabold tracking-wider font-heading uppercase text-purple-400">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-slate-300">
                {comparisonMatrix.map((row, index) => (
                  <tr key={index} className="hover:bg-white/[0.01] transition-colors">
                    <td className="px-6 py-4.5 font-semibold text-white">{row.feature}</td>
                    <td className="px-6 py-4.5 text-slate-400 font-light">{row.starter}</td>
                    <td className="px-6 py-4.5 text-slate-300 font-light bg-blue-500/[0.01]">{row.professional}</td>
                    <td className="px-6 py-4.5 text-slate-200 font-medium bg-purple-500/[0.01]">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Comparison Cards (Fallback list for responsive layout) */}
          <div className="block md:hidden space-y-6">
            {comparisonMatrix.map((row, index) => (
              <div key={index} className="glass-card p-5 rounded-xl border border-white/5 space-y-3.5 text-left">
                <h4 className="text-sm font-extrabold text-blue-400 uppercase tracking-wide border-b border-white/5 pb-2">
                  {row.feature}
                </h4>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider">Starter</span>
                    <span className="text-slate-300 mt-1 block font-light">{row.starter}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] font-bold text-blue-500 uppercase tracking-wider">Pro</span>
                    <span className="text-slate-200 mt-1 block font-semibold">{row.professional}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] font-bold text-purple-500 uppercase tracking-wider">Enterprise</span>
                    <span className="text-white mt-1 block font-bold">{row.enterprise}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE SECTION */}
      <section id="process" className="py-24 relative overflow-hidden bg-[#050816] border-t border-white/5">
        <div className="glow-orb glow-blue w-[400px] h-[400px] top-1/2 left-1/4 opacity-5" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
          <div className="text-left space-y-4 max-w-xl">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
              <span className="text-[10px] md:text-xs font-bold text-orange-400 uppercase tracking-widest">
                Our Timeline
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-white">
              The Journey of Your Project
            </h2>
            <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed">
              We guide your digital product from low-fidelity wireframes in Figma to production-ready Next.js repositories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-7 left-10 right-10 h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 -z-10" />

            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="space-y-6 text-left group"
              >
                <div className={`w-14 h-14 rounded-full border flex items-center justify-center font-heading font-extrabold text-lg transition-transform duration-300 group-hover:scale-110 shadow-lg relative ${step.glow}`}>
                  {step.number}
                  <div className="absolute inset-0 rounded-full border border-dashed border-white/10 scale-125 animate-[spin_20s_linear_infinite]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK SECTION */}
      <section id="tech-stack" className="py-24 relative overflow-hidden bg-[#030612] border-t border-white/5">
        <div className="glow-orb glow-blue w-[400px] h-[400px] -bottom-20 -right-20 opacity-5" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
              <span className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-widest">
                Our Tech Ecosystem
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-white">
              Built on Modern Frameworks
            </h2>
            <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed">
              We leverage premium open-source stacks to engineer speed, security, and scalability into your digital pipeline.
            </p>
          </div>

          {/* Grid of icons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {technologiesList.map((tech, index) => {
              const IconComp = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center relative group overflow-hidden transition-all duration-300"
                >
                  {/* Subtle hover background glow */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl pointer-events-none"
                    style={{ backgroundColor: tech.glowColor }}
                  />
                  
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 group-hover:border-blue-500/30 transition-all duration-300 group-hover:bg-blue-500/5">
                    <IconComp className="w-8 h-8 text-slate-300 group-hover:text-blue-400 transition-colors" />
                  </div>
                  
                  <h4 className="text-base font-bold text-white mt-4">{tech.name}</h4>
                  <span className="text-[10px] text-slate-500 font-medium mt-1 uppercase tracking-wide">{tech.category}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CLIENT TESTIMONIALS */}
      <section id="testimonials" className="py-24 relative overflow-hidden bg-[#050816] border-t border-white/5">
        <div className="glow-orb glow-purple w-[500px] h-[500px] top-1/4 -right-1/4 opacity-10" />

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

          {/* Testimonial slider / carousel card */}
          <div className="relative glass-card border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden hover:border-white/10 transition-colors duration-500">
            {/* Ambient blur */}
            <div className="absolute w-[200px] h-[200px] bg-blue-500/5 blur-[50px] -top-10 -left-10 rounded-full" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-left"
              >
                {/* Rating stars */}
                <div className="flex space-x-1">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <FiStar key={i} className="w-5.5 h-5.5 text-yellow-500 fill-yellow-500/25" />
                  ))}
                </div>

                <p className="text-base md:text-xl text-slate-200 font-light leading-relaxed italic">
                  "{testimonials[activeTestimonial].review}"
                </p>

                <div className="flex items-center space-x-4 pt-4 border-t border-white/5">
                  <div className="w-12 h-12 rounded-full bg-slate-900 border border-white/10 overflow-hidden flex items-center justify-center">
                    <span className="text-xs font-bold text-slate-500">
                      {testimonials[activeTestimonial].name.substring(0, 2)}
                    </span>
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
            </AnimatePresence>

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

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 relative overflow-hidden bg-[#030612] border-t border-white/5">
        <div className="glow-orb glow-blue w-[400px] h-[400px] bottom-10 left-10 opacity-5" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-16">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
              <span className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-widest">
                Support Hub
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md overflow-hidden hover:border-white/10 transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between text-base font-bold text-white font-heading focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <span className="p-1 rounded-lg bg-white/5 text-slate-400 shrink-0 ml-4 group-hover:text-white transition-colors">
                      {isOpen ? <FiMinus className="w-4 h-4" /> : <FiPlus className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-1 text-sm text-slate-400 font-light leading-relaxed border-t border-white/5">
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

      {/* CTA SECTION */}
      <section id="cta" className="py-28 relative overflow-hidden bg-[#050816] border-t border-white/5">
        {/* Extreme glowing radial background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06)_0%,transparent_70%)] pointer-events-none" />
        
        {/* Glow ambient blurs */}
        <div className="absolute w-[400px] h-[400px] bg-purple-500/10 blur-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-12">
          {/* Futuristic cosmic decorations */}
          <div className="relative w-full max-w-[200px] mx-auto min-h-[140px] flex items-center justify-center">
            {/* Neon planet circles */}
            <div className="absolute w-24 h-24 rounded-full border border-dashed border-purple-500/30 animate-[spin_40s_linear_infinite] flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-400 absolute -top-1" />
            </div>
            
            {/* Glowing cosmic rocket */}
            <motion.div
              animate={{ 
                y: [0, -12, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 5, 
                ease: 'easeInOut' 
              }}
              className="text-4xl text-blue-400 filter drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]"
            >
              🚀
            </motion.div>
            
            {/* Tiny stars */}
            <div className="absolute top-4 left-6 text-xs text-white/20 animate-pulse">✦</div>
            <div className="absolute bottom-8 right-4 text-xs text-white/30 animate-pulse delay-500">✦</div>
            <div className="absolute top-16 right-8 text-[9px] text-white/10 animate-pulse delay-1000">✦</div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-heading leading-tight">
              Have A Project In Mind?<br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Let’s Build Something Amazing.
              </span>
            </h2>
            <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed max-w-lg mx-auto">
              Ready to take your digital presence to the next level? Get in touch and let's craft a luxury user experience together.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center text-xs font-bold px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 active:scale-95 group"
            >
              Start Your Project
              <FiArrowRight className="ml-2 group-hover:transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center text-xs font-bold px-8 py-4 border border-white/10 rounded-full text-slate-300 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300 active:scale-95"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

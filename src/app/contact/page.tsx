'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiClock, 
  FiArrowRight, 
  FiCheckCircle, 
  FiCalendar, 
  FiMessageSquare, 
  FiUsers, 
  FiDollarSign, 
  FiAlertCircle, 
  FiSend,
  FiChevronDown,
  FiChevronUp,
  FiCornerDownRight,
  FiInfo
} from 'react-icons/fi';
import { 
  FaInstagram, 
  FaLinkedinIn, 
  FaFacebookF, 
  FaBehance, 
  FaDribbble, 
  FaWhatsapp 
} from 'react-icons/fa';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// FAQ Interface
interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const fallbackFaqs: FaqItem[] = [
  {
    id: 1,
    question: 'How quickly does the team respond to new project inquiries?',
    answer: 'We typically respond within 2 to 4 business hours. Every inquiry is reviewed by our lead partners to ensure you receive immediate technical and strategic feedback.'
  },
  {
    id: 2,
    question: 'What is the process for scheduling a video consultation?',
    answer: 'Simply use our "Schedule Consultation" tab above, pick your preferred date and time, and our system will automatically lock in a slot. A Calendar invite with a Google Meet link will be generated and emailed to you.'
  },
  {
    id: 3,
    question: 'Do you work with startups, or only established enterprises?',
    answer: 'We collaborate with both! We have flexible budget plans tailored for early-stage startups who need MVP wireframes, as well as robust engineering architectures for corporate scale.'
  },
  {
    id: 4,
    question: 'Can you work under an NDA before discussing project details?',
    answer: 'Absolutely. We respect intellectual property and can sign a mutual Non-Disclosure Agreement (NDA) prior to analyzing your project wireframes or database schemas.'
  }
];

export default function ContactPage() {
  const [formType, setFormType] = useState<'contact' | 'meeting'>('contact');
  const [faqs, setFaqs] = useState<FaqItem[]>(fallbackFaqs);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  // General Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactService, setContactService] = useState('Website Development');
  const [contactBudget, setContactBudget] = useState('$5,000 - $10,000');
  const [contactMessage, setContactMessage] = useState('');

  // Meeting Form State
  const [meetingName, setMeetingName] = useState('');
  const [meetingEmail, setMeetingEmail] = useState('');
  const [meetingPhone, setMeetingPhone] = useState('');
  const [meetingService, setMeetingService] = useState('Website Development');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('10:00 AM - 11:00 AM');
  const [meetingMessage, setMeetingMessage] = useState('');

  // Bot protection state
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  // Status handlers
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  useEffect(() => {
    // Attempt fetching FAQs from backend
    fetch('http://127.0.0.1:8000/api/pricing-page-data')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.faqs) && data.faqs.length > 0) {
          setFaqs(data.faqs.slice(0, 5));
        }
      })
      .catch(() => {});
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaAnswer.trim() !== '8') {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);
    setSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('http://127.0.0.1:8000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          phone: contactPhone,
          service: contactService,
          budget: contactBudget,
          message: contactMessage,
        }),
      });

      const resData = await response.json();
      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully! Our project managers will contact you shortly.' });
        // Clear fields
        setContactName('');
        setContactEmail('');
        setContactPhone('');
        setContactMessage('');
        setCaptchaAnswer('');
      } else {
        setStatus({ 
          type: 'error', 
          message: resData.errors ? Object.values(resData.errors).flat().join(' ') : (resData.message || 'Something went wrong.') 
        });
      }
    } catch {
      setStatus({ type: 'error', message: 'Failed to connect to the backend server. Your submission has been securely simulated.' });
      // Simulate success for offline demo
      setTimeout(() => {
        setStatus({ type: 'success', message: 'Inquiry simulated successfully! We will connect soon.' });
        setContactName('');
        setContactEmail('');
        setContactPhone('');
        setContactMessage('');
        setCaptchaAnswer('');
      }, 1000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleMeetingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaAnswer.trim() !== '8') {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);
    setSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('http://127.0.0.1:8000/api/meetings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: meetingName,
          email: meetingEmail,
          phone: meetingPhone,
          service: meetingService,
          preferred_date: meetingDate,
          preferred_time: meetingTime,
          message: meetingMessage,
        }),
      });

      const resData = await response.json();
      if (response.ok) {
        setStatus({ type: 'success', message: 'Consultation slot locked in! A meeting invite has been sent to your inbox.' });
        setMeetingName('');
        setMeetingEmail('');
        setMeetingPhone('');
        setMeetingDate('');
        setMeetingMessage('');
        setCaptchaAnswer('');
      } else {
        setStatus({ 
          type: 'error', 
          message: resData.errors ? Object.values(resData.errors).flat().join(' ') : (resData.message || 'Validation failed.') 
        });
      }
    } catch {
      setStatus({ type: 'error', message: 'API offline. Simulating local calendar request...' });
      setTimeout(() => {
        setStatus({ type: 'success', message: 'Consultation simulated! Your calendar invitation is scheduled for approval.' });
        setMeetingName('');
        setMeetingEmail('');
        setMeetingPhone('');
        setMeetingDate('');
        setMeetingMessage('');
        setCaptchaAnswer('');
      }, 1000);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="bg-[#050816] text-white min-h-screen flex flex-col font-body selection:bg-blue-500/20 selection:text-blue-200 overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-[#050816] border-b border-white/5">
        {/* Glow Spheres */}
        <div className="glow-orb glow-blue w-[600px] h-[600px] -top-30 -left-10 opacity-20 pointer-events-none" />
        <div className="glow-orb glow-purple w-[500px] h-[500px] top-1/4 -right-10 opacity-15 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side details */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-blue-500/5 border border-blue-500/15 px-4.5 py-1.5 rounded-full backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-[10px] md:text-xs font-bold text-blue-300 uppercase tracking-widest">
                    Contact Maan Creatix
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] font-heading text-white">
                  Let’s Build Something<br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">Amazing Together</span>
                </h1>
                <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed max-w-lg">
                  Partner with a creative digital agency driven by performance. Drop us an inquiry below or schedule a consultation slot directly with our directors.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#contact-form-block"
                  className="px-7 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-xs font-bold text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center group active:scale-97"
                >
                  <span>Start Inquiry</span>
                  <FiArrowRight className="ml-2 w-4 h-4 group-hover:transform group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  className="px-7 py-4 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 flex items-center space-x-2 active:scale-97"
                >
                  <FaWhatsapp className="text-emerald-400 w-4.5 h-4.5" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Right side floating graphics */}
            <div className="lg:col-span-5 relative h-[380px] hidden lg:block select-none">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_60%)] pointer-events-none" />

              {/* Floating Element 1: Glowing tech sphere */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-10 right-12 w-48 h-48 rounded-full bg-gradient-to-tr from-blue-900/30 to-purple-900/30 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-2xl"
              >
                <div className="absolute w-36 h-36 rounded-full border border-blue-500/10 animate-ping pointer-events-none" />
                <div className="absolute w-28 h-28 rounded-full border border-purple-500/20 animate-spin pointer-events-none border-dashed" />
                <FiUsers className="w-10 h-10 text-blue-400/80 animate-pulse" />
              </motion.div>

              {/* Floating Element 2: Direct contact bubbles */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [1, -2, 1]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute top-44 left-8 w-[240px] glass-card p-4.5 rounded-2xl border border-white/10 shadow-2xl relative text-left"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/25 to-transparent" />
                <div className="space-y-2">
                  <div className="text-[9px] bg-blue-500/10 border border-blue-500/20 text-blue-400 px-2 py-0.5 rounded w-max font-bold uppercase tracking-wider">
                    Live Chat Simulation
                  </div>
                  <div className="bg-white/5 border border-white/5 p-2 rounded-lg text-[10px] text-slate-300 font-light leading-snug">
                    Hey team! We need a dashboard built in NextJS.
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/10 p-2 rounded-lg text-[10px] text-blue-300 font-light leading-snug text-right ml-4">
                    Absolutely! We can wire that in 15 days.
                  </div>
                </div>
              </motion.div>

              {/* Floating Element 3: Budget picker preview */}
              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotate: [-2, 2, -2]
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute bottom-4 right-8 w-[220px] glass-card p-4 rounded-2xl border border-white/10 shadow-2xl text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-slate-500 font-semibold font-mono">ESTIMATE SELECTOR</span>
                  <FiDollarSign className="text-emerald-400 w-3.5 h-3.5" />
                </div>
                <div className="text-xs font-bold text-white mb-2">Flexible Budget Scale</div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full w-[70%]" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 font-mono">$10K+</span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACT INFO CARDS SECTION */}
      <section className="py-20 relative overflow-hidden bg-[#050816]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Card 1: Phone */}
            <div className="glass-card p-8 rounded-2xl border border-white/5 hover:border-blue-500/25 transition-all duration-500 text-left space-y-4 group relative">
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
              <div className="w-12 h-12 rounded-xl bg-blue-500/5 border border-blue-500/15 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <FiPhone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest font-heading">Call Support</h3>
                <p className="text-base font-bold text-white">+91 99999 99999</p>
                <span className="text-[10px] text-slate-500 font-light block">Direct project consult line</span>
              </div>
            </div>

            {/* Card 2: Email */}
            <div className="glass-card p-8 rounded-2xl border border-white/5 hover:border-purple-500/25 transition-all duration-500 text-left space-y-4 group relative">
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
              <div className="w-12 h-12 rounded-xl bg-purple-500/5 border border-purple-500/15 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                <FiMail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest font-heading">Email Address</h3>
                <p className="text-base font-bold text-white">hello@maancreatix.com</p>
                <span className="text-[10px] text-slate-500 font-light block">Business & general inquiries</span>
              </div>
            </div>

            {/* Card 3: Address */}
            <div className="glass-card p-8 rounded-2xl border border-white/5 hover:border-indigo-500/25 transition-all duration-500 text-left space-y-4 group relative">
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
              <div className="w-12 h-12 rounded-xl bg-indigo-500/5 border border-indigo-500/15 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <FiMapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest font-heading">Our Studio</h3>
                <p className="text-base font-bold text-white">New Delhi, India</p>
                <span className="text-[10px] text-slate-500 font-light block">Digital Agency HQ hub</span>
              </div>
            </div>

            {/* Card 4: Working Hours */}
            <div className="glass-card p-8 rounded-2xl border border-white/5 hover:border-emerald-500/25 transition-all duration-500 text-left space-y-4 group relative">
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
              <div className="w-12 h-12 rounded-xl bg-emerald-500/5 border border-emerald-500/15 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                <FiClock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest font-heading">Active Hours</h3>
                <p className="text-base font-bold text-white">Mon - Sat, 10am - 7pm</p>
                <span className="text-[10px] text-slate-500 font-light block">UTC+05:30 Standard Time</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TABS & CONTACT FORM / SCHEDULE MEETING BLOCK */}
      <section id="contact-form-block" className="py-16 relative overflow-hidden bg-[#050816]">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          
          {/* Toggles */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/5 p-1 rounded-2xl border border-white/10 flex items-center max-w-md w-full">
              <button
                onClick={() => { setFormType('contact'); setStatus({ type: null, message: '' }); }}
                className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${
                  formType === 'contact' 
                    ? 'bg-blue-600 text-white shadow shadow-blue-500/10' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Start Project Inquiry
              </button>
              <button
                onClick={() => { setFormType('meeting'); setStatus({ type: null, message: '' }); }}
                className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${
                  formType === 'meeting' 
                    ? 'bg-blue-600 text-white shadow shadow-blue-500/10' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Schedule Consultation
              </button>
            </div>
          </div>

          {/* Form wrapper */}
          <div className="glass-card p-6 md:p-10 rounded-3xl border border-white/5 relative overflow-hidden text-left shadow-2xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full pointer-events-none" />

            {status.type && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 mb-8 rounded-xl border text-sm flex items-center space-x-2.5 ${
                  status.type === 'success' 
                    ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                }`}
              >
                {status.type === 'success' ? (
                  <FiCheckCircle className="w-5 h-5 shrink-0" />
                ) : (
                  <FiAlertCircle className="w-5 h-5 shrink-0" />
                )}
                <span>{status.message}</span>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {formType === 'contact' ? (
                <motion.form 
                  key="contact-form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleContactSubmit} 
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Your Name</label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="John Doe"
                        required
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-slate-950/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="john@example.com"
                        required
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-slate-950/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="+91 99999 99999"
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-slate-950/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Required Service</label>
                      <select
                        value={contactService}
                        onChange={(e) => setContactService(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500/50 focus:bg-slate-950/50 transition-colors cursor-pointer"
                      >
                        <option value="Website Development">Website Development</option>
                        <option value="E-Commerce Development">E-Commerce Development</option>
                        <option value="Business Website">Business Website</option>
                        <option value="Software Development">Software Development</option>
                        <option value="Graphic Designing">Graphic Designing</option>
                        <option value="UI/UX Designing">UI/UX Designing</option>
                        <option value="SEO Marketing">SEO & Growth Marketing</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Project Budget Scale</label>
                      <select
                        value={contactBudget}
                        onChange={(e) => setContactBudget(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500/50 focus:bg-slate-950/50 transition-colors cursor-pointer"
                      >
                        <option value="Under $5,000">Under $5,000</option>
                        <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                        <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                        <option value="$25,000+">$25,000+ (Enterprise)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Project Brief & Details</label>
                    <textarea
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Outline your requirements, page designs, or tech stack constraints..."
                      rows={5}
                      required
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-slate-950/50 transition-colors resize-none font-sans"
                    />
                  </div>

                  {/* Anti-spam validation */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center bg-white/[0.01] border border-white/5 p-4 rounded-2xl">
                    <div className="flex items-center space-x-2 text-xs text-slate-400">
                      <FiInfo className="text-blue-400 w-4 h-4 shrink-0" />
                      <span>Security Validation: What is 5 + 3?</span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={captchaAnswer}
                        onChange={(e) => setCaptchaAnswer(e.target.value)}
                        placeholder="Enter mathematical answer"
                        required
                        className={`w-full bg-slate-900 border rounded-xl px-4 py-3 text-xs placeholder-slate-600 focus:outline-none focus:bg-slate-950/50 transition-colors ${
                          captchaError ? 'border-red-500/50' : 'border-white/10 focus:border-blue-500/50'
                        }`}
                      />
                      {captchaError && (
                        <span className="absolute -bottom-5 left-1 text-[9px] text-red-400 font-semibold font-sans">Incorrect spam validation answer.</span>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all active:scale-97 shadow shadow-blue-500/10 space-x-2 cursor-pointer"
                  >
                    <span>{submitting ? 'Submitting Inquiry...' : 'Submit Inquiry'}</span>
                    {!submitting && <FiSend className="w-3.5 h-3.5" />}
                  </button>
                </motion.form>
              ) : (
                <motion.form 
                  key="meeting-form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleMeetingSubmit} 
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Your Name</label>
                      <input
                        type="text"
                        value={meetingName}
                        onChange={(e) => setMeetingName(e.target.value)}
                        placeholder="John Doe"
                        required
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-slate-950/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                      <input
                        type="email"
                        value={meetingEmail}
                        onChange={(e) => setMeetingEmail(e.target.value)}
                        placeholder="john@example.com"
                        required
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-slate-950/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={meetingPhone}
                        onChange={(e) => setMeetingPhone(e.target.value)}
                        placeholder="+91 99999 99999"
                        required
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-slate-950/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Service of Interest</label>
                      <select
                        value={meetingService}
                        onChange={(e) => setMeetingService(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500/50 focus:bg-slate-950/50 transition-colors cursor-pointer"
                      >
                        <option value="Website Development">Website Development</option>
                        <option value="E-Commerce Development">E-Commerce Development</option>
                        <option value="Business Website">Business Website</option>
                        <option value="Software Development">Software Development</option>
                        <option value="Graphic Designing">Graphic Designing</option>
                        <option value="UI/UX Designing">UI/UX Designing</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Preferred Meeting Date</label>
                      <input
                        type="date"
                        value={meetingDate}
                        onChange={(e) => setMeetingDate(e.target.value)}
                        required
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500/50 focus:bg-slate-950/50 transition-colors cursor-pointer text-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Preferred Time Slot</label>
                      <select
                        value={meetingTime}
                        onChange={(e) => setMeetingTime(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500/50 focus:bg-slate-950/50 transition-colors cursor-pointer"
                      >
                        <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                        <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                        <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                        <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</option>
                        <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Inquiry / Consultation Notes</label>
                    <textarea
                      value={meetingMessage}
                      onChange={(e) => setMeetingMessage(e.target.value)}
                      placeholder="Add any specific context or details you want to cover during the consultation call..."
                      rows={4}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-slate-950/50 transition-colors resize-none font-sans"
                    />
                  </div>

                  {/* Anti-spam validation */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center bg-white/[0.01] border border-white/5 p-4 rounded-2xl">
                    <div className="flex items-center space-x-2 text-xs text-slate-400">
                      <FiInfo className="text-blue-400 w-4 h-4 shrink-0" />
                      <span>Security Validation: What is 5 + 3?</span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={captchaAnswer}
                        onChange={(e) => setCaptchaAnswer(e.target.value)}
                        placeholder="Enter mathematical answer"
                        required
                        className={`w-full bg-slate-900 border rounded-xl px-4 py-3 text-xs placeholder-slate-600 focus:outline-none focus:bg-slate-950/50 transition-colors ${
                          captchaError ? 'border-red-500/50' : 'border-white/10 focus:border-blue-500/50'
                        }`}
                      />
                      {captchaError && (
                        <span className="absolute -bottom-5 left-1 text-[9px] text-red-400 font-semibold font-sans">Incorrect spam validation answer.</span>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all active:scale-97 shadow shadow-blue-500/10 space-x-2 cursor-pointer"
                  >
                    <span>{submitting ? 'Locking Consultation Slot...' : 'Schedule Consultation'}</span>
                    {!submitting && <FiCalendar className="w-3.5 h-3.5" />}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* MAP SECTION */}
      <section className="py-12 relative overflow-hidden bg-[#050816]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="glass-card rounded-3xl border border-white/5 overflow-hidden shadow-2xl h-[380px] w-full relative">
            {/* Embedded map with high-end dark filter overlay */}
            <div className="w-full h-full filter invert-[90%] hue-rotate-[180deg] brightness-[95%] contrast-[90%]">
              <iframe
                title="Maan Creatix HQ Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.201736173003!2d77.206585!3d28.613939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5d0fdfb555%3A0x6b5cd827b5e40e0!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%2C%20India!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>
            {/* Overlay Grid */}
            <div className="absolute inset-0 bg-blue-500/[0.01] pointer-events-none border border-white/10 rounded-3xl" />
          </div>
        </div>
      </section>

      {/* SOCIAL SECTION */}
      <section className="py-16 relative overflow-hidden bg-[#050816]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-xl font-bold font-heading text-white tracking-tight">Connect with Us Globally</h2>
            <p className="text-xs text-slate-400 font-light max-w-sm mx-auto">Follow our active design layouts, wireframe iterations, and code logs on social networks.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 hover:border-pink-500/30 text-slate-400 hover:text-pink-400 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 text-slate-400 hover:text-blue-400 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <FaLinkedinIn className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 hover:border-blue-600/30 text-slate-400 hover:text-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a
              href="https://behance.net"
              target="_blank"
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 hover:border-blue-400/30 text-slate-400 hover:text-blue-400 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <FaBehance className="w-5 h-5" />
            </a>
            <a
              href="https://dribbble.com"
              target="_blank"
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 hover:border-pink-400/30 text-slate-400 hover:text-pink-400 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <FaDribbble className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 relative overflow-hidden bg-[#050816] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-left space-y-12">
          <div className="space-y-3 text-center sm:text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-heading text-white">Inquiry FAQ Guide</h2>
            <p className="text-xs md:text-sm text-slate-400 font-light max-w-md">Common queries related to scheduling video sessions and discussing budgets.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div 
                key={faq.id}
                className="glass-card rounded-2xl border border-white/5 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/[0.01] transition-colors"
                >
                  <span className="text-xs md:text-sm font-bold text-white tracking-tight">{faq.question}</span>
                  {expandedFaq === faq.id ? (
                    <FiChevronUp className="w-4 h-4 text-blue-400" />
                  ) : (
                    <FiChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {expandedFaq === faq.id && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-slate-400 font-light leading-relaxed border-t border-white/[0.02]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COSMIC CTA SECTION */}
      <section className="py-24 relative overflow-hidden bg-[#030612] border-t border-white/5">
        {/* Glow Spheres */}
        <div className="glow-orb glow-purple w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.02),transparent_70%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-white">
              Launch Your Product with Maan Creatix
            </h2>
            <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed max-w-lg mx-auto">
              Our directors, designers, and systems architects are ready. We align code templates with dynamic visual experiences.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#contact-form-block"
              className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-xs font-bold text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              Start Consultation
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

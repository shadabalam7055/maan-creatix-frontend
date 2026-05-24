'use client';

import { useState } from 'react';
import { FiSend, FiMail, FiPhone, FiMapPin, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill out all fields.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#050816] border-b border-white/5">
      {/* Glow ambient backgrounds */}
      <div className="glow-orb glow-blue w-[500px] h-[500px] top-1/3 -left-20 opacity-10 glowing-orb-animated" />
      <div className="glow-orb glow-purple w-[400px] h-[400px] -bottom-20 right-10 opacity-5 glowing-orb-animated" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT COLUMN: Contact Information */}
          <div className="lg:col-span-5 space-y-10 text-center lg:text-left flex flex-col items-center lg:items-start reveal-fade-left">
            <div className="space-y-4 flex flex-col items-center lg:items-start">
              <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
                <span className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-widest">
                  Let's Connect
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-white text-center lg:text-left">
                Start Your Digital <br className="hidden md:inline" />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Journey Today
                </span>
              </h2>
              <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed max-w-sm text-center lg:text-left">
                Have a project in mind, or just want to chat? Fill out the form, and our engineering team will get back to you within 24 hours.
              </p>
            </div>

            <div className="space-y-6 pt-4 w-full flex flex-col items-center lg:items-start">
              {/* Mail Detail */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-2 sm:space-y-0 sm:space-x-4 group/item">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 transition-transform group-hover/item:scale-110">
                  <FiMail className="w-5 h-5" />
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Email Us</span>
                  <a href="mailto:hello@maancreatix.com" className="text-sm font-semibold text-white hover:text-blue-400 transition-colors mt-0.5 block">
                    hello@maancreatix.com
                  </a>
                </div>
              </div>

              {/* Phone Detail */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-2 sm:space-y-0 sm:space-x-4 group/item">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 transition-transform group-hover/item:scale-110">
                  <FiPhone className="w-5 h-5" />
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Call Us</span>
                  <a href="tel:+916396566630" className="text-sm font-semibold text-white hover:text-purple-400 transition-colors mt-0.5 block text-center sm:text-left">
                    +91 6396566630 <br />
                    +91 7055953578 <br />
                    +91 8006835201
                  </a>
                </div>
              </div>

              {/* Location Detail */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-2 sm:space-y-0 sm:space-x-4 group/item">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 transition-transform group-hover/item:scale-110">
                  <FiMapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Our Studio</span>
                  <span className="text-sm font-semibold text-white mt-0.5 block text-center sm:text-left">
                    Amroha, Uttar Pradesh, India - 244221
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <div className="lg:col-span-7 reveal-fade-right">
            <div className="glass-card rounded-3xl p-8 md:p-10 border border-white/5 relative premium-card-hover">
              {status === 'success' ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <FiCheckCircle className="w-16 h-16 text-emerald-400 animate-bounce" />
                  <h3 className="text-2xl font-bold text-white font-heading">Thank You!</h3>
                  <p className="text-sm text-slate-400 font-light max-w-sm leading-relaxed">
                    Your message has been sent successfully. We will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Input */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                        className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/30 transition-all"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="abc@gmail.com"
                        required
                        className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/30 transition-all"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Briefly tell us about your project requirements..."
                      rows={5}
                      required
                      className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-orange-500/40 focus:ring-1 focus:ring-orange-500/30 transition-all resize-none"
                    />
                  </div>

                  {/* Status Banner */}
                  {status === 'error' && (
                    <div className="flex items-center space-x-2 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-xs">
                      <FiAlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full md:w-auto inline-flex items-center justify-center text-xs font-bold px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full transition-all duration-300 shadow-md shadow-blue-500/10 disabled:opacity-50 cursor-pointer active:scale-95 group premium-btn-primary"
                    >
                      {status === 'submitting' ? (
                        <span>Sending Request...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <FiSend className="ml-2 group-hover:transform group-hover:translate-x-1.5 group-hover:translate-y-[-0.5px] transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';
import { useSettings } from '@/context/SettingsContext';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact', href: '/contact' },
];

const servicesDropdownItems = [
  { name: 'Website Development', href: '/services/website-development', desc: 'Custom high-performance web applications' },
  { name: 'E-Commerce Website Development', href: '/services/ecommerce-development', desc: 'Secure, scalable online stores' },
  { name: 'Business Website Development', href: '/services/business-website-development', desc: 'Premium corporate digital presence' },
  { name: 'Software Development', href: '/services/software-development', desc: 'Custom enterprise software solutions' },
  { name: 'Graphic Designing', href: '/services/graphic-designing', desc: 'Stunning brand identity and visual designs' },
  { name: 'UI/UX Designing', href: '/services/ui-ux-designing', desc: 'Immersive and intuitive user interfaces' },
];

export default function Navbar({ settings: propSettings }: { settings?: any }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesHovered, setServicesHovered] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const { settings: contextSettings } = useSettings();
  const settings = propSettings || contextSettings || {};

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initial scroll check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isSubPage = pathname !== '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled || isSubPage
            ? 'bg-[#050816]/75 backdrop-blur-md border-b border-white/5 py-4'
            : 'bg-transparent py-4 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex flex-col group justify-center"
          >
            {settings.site_logo ? (
              <img 
                src={settings.site_logo} 
                alt={settings.site_name || "Maan Creatix"} 
                className="h-8 md:h-10 w-auto object-contain"
              />
            ) : (
              <>
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  {settings.site_name || "Maan Creatix"}
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wide">
                  Crafting Digital Excellence
                </span>
              </>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 bg-white/5 border border-white/5 px-4 py-1.5 rounded-full backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              
              if (link.name === 'Services') {
                const isServicesActive = pathname.startsWith('/services');
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setServicesHovered(true)}
                    onMouseLeave={() => setServicesHovered(false)}
                  >
                    <Link
                      href="/services"
                      onClick={(e) => {
                        if (pathname === '/services') {
                          e.preventDefault();
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className={`relative px-4 py-2 text-xs font-semibold tracking-wide transition-colors flex items-center gap-1 z-10 group/nav ${
                        isServicesActive
                          ? 'text-white font-bold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Services
                      <svg
                        className={`w-3 h-3 transition-transform duration-300 ${
                          servicesHovered ? 'rotate-180 text-blue-400' : 'text-slate-500'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                      <span className={`absolute bottom-[-2px] left-4 right-6 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-transform duration-300 origin-left ${
                        isServicesActive ? 'scale-x-100' : 'scale-x-0 group-hover/nav:scale-x-100'
                      }`} />
                    </Link>

                    {/* Services Dropdown */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] bg-[#050816]/95 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-5 grid grid-cols-2 gap-3 shadow-[0_0_30px_rgba(59,130,246,0.2)] z-50 transition-all duration-200 origin-top ${
                        servicesHovered
                          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                          : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
                      }`}
                    >
                      {servicesDropdownItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setServicesHovered(false)}
                          className="group/item flex flex-col p-2.5 rounded-xl hover:bg-blue-500/10 border border-transparent hover:border-blue-500/20 transition-all duration-300"
                        >
                          <span className="text-xs font-bold text-white group-hover/item:text-blue-400 transition-colors">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-slate-400 mt-1 line-clamp-1 group-hover/item:text-slate-300 transition-colors">
                            {item.desc}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (pathname === link.href) {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className={`relative px-4 py-2 text-xs font-semibold tracking-wide transition-colors duration-300 z-10 group/nav ${
                    isActive ? 'text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-[-2px] left-4 right-4 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-transform duration-300 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover/nav:scale-x-100'
                  }`} />
                </Link>
              );
            })}
          </nav>

          {/* Theme Toggle & CTA Button */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <Link
              href="/contact"
              className="relative inline-flex items-center justify-center text-xs font-bold px-6 py-3 border border-white/10 rounded-full text-white bg-slate-950 hover:bg-white hover:text-[#050816] hover:border-white transition-all duration-300 shadow shadow-blue-500/5 group"
            >
              Let's Talk
              <FiArrowRight className="ml-2 group-hover:transform group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white transition-colors animate-fade-in"
            >
              {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-[68px] sm:top-20 left-0 w-full max-h-[calc(100vh-68px)] sm:max-h-[calc(100vh-80px)] overflow-y-auto bg-[#050816] border-b border-white/5 backdrop-blur-xl z-40 md:hidden p-6 shadow-2xl transition-all duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center justify-center text-center space-y-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

            if (link.name === 'Services') {
              return (
                <div key={link.name} className="flex flex-col items-center w-full border-b border-white/5 pb-2">
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="flex items-center justify-center gap-2 text-sm font-semibold tracking-wide text-slate-400 hover:text-slate-200 transition-colors w-full py-2"
                  >
                    <span>Services</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${
                        mobileServicesOpen ? 'rotate-180 text-blue-400' : 'text-slate-500'
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden flex flex-col items-center mt-2 transition-all duration-300 ${
                      mobileServicesOpen ? 'max-h-96 opacity-100 space-y-2' : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
                  >
                    {servicesDropdownItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileServicesOpen(false);
                        }}
                        className="text-xs font-medium text-slate-400 hover:text-blue-400 transition-colors py-2 text-center"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold tracking-wide py-2 w-full border-b border-white/5 text-center transition-colors ${
                  isActive ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center inline-flex items-center justify-center text-xs font-bold px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white mt-4 max-w-xs transition-transform active:scale-95"
          >
            Let's Talk
            <FiArrowRight className="ml-2" />
          </Link>
        </nav>
      </div>
    </>
  );
}


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
      ? 'bg-[#050816]/80 backdrop-blur-md border-b border-white/5 py-2'
      : 'bg-transparent py-2 md:py-3'
  }`}
>
  <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">

    {/* Logo */}
    <Link
      href="/"
      onClick={(e) => {
        if (pathname === '/') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }}
      className="flex items-center gap-2 group"
    >
      <img
        src="/logo.png"
        alt="Maan Creatix"
        className="h-10 w-10 object-contain"
      />

      <div className="leading-tight">
        <span className="block text-2xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
          {settings.site_name || "Maan Creatix"}
        </span>

        <span className="block text-[11px] text-slate-400 font-medium tracking-wide">
          Crafting Digital Excellence
        </span>
      </div>
    </Link>

    {/* Desktop Navigation */}
    <nav className="hidden md:flex items-center space-x-1 bg-white/5 border border-white/5 px-4 py-1.5 rounded-full backdrop-blur-md">
      {navLinks.map((link) => {
        const isActive =
          pathname === link.href ||
          (link.href !== '/' && pathname.startsWith(link.href));

        return (
          <Link
            key={link.name}
            href={link.href}
            className={`relative px-4 py-2 text-xs font-semibold tracking-wide transition-colors duration-300 z-10 group/nav ${
              isActive
                ? 'text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {link.name}

            <span
              className={`absolute bottom-[-2px] left-4 right-4 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-transform duration-300 origin-left ${
                isActive
                  ? 'scale-x-100'
                  : 'scale-x-0 group-hover/nav:scale-x-100'
              }`}
            />
          </Link>
        );
      })}
    </nav>

    {/* Right Side */}
    <div className="hidden md:flex items-center space-x-3">
      <ThemeToggle />

      <Link
        href="/contact"
        className="relative inline-flex items-center justify-center text-xs font-bold px-5 py-2.5 border border-white/10 rounded-full bg-white text-[#050816] hover:bg-transparent hover:text-white transition-all duration-300"
      >
        Let's Talk
        <FiArrowRight className="ml-2" />
      </Link>
    </div>

    {/* Mobile Menu Button */}
    <div className="flex items-center space-x-2 md:hidden">
      <ThemeToggle />

      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="p-2 text-slate-300 hover:text-white transition-colors"
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


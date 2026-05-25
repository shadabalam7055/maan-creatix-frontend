import { FiLinkedin, FiInstagram, FiFacebook, FiTwitter, FiPhone, FiMail, FiMapPin, FiClock, FiArrowUp } from 'react-icons/fi';
import Link from 'next/link';

interface FooterProps {
  settings?: any;
}

export default function Footer({ settings = {} }: FooterProps) {
  return (
    <footer className="bg-[#030612] border-t border-white/5 py-16 md:py-20 relative overflow-hidden text-slate-400">
      {/* Background Subtle Glow Orb */}
      <div className="glow-orb glow-blue w-[500px] h-[500px] -bottom-40 left-1/2 -translate-x-1/2 opacity-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 text-center sm:text-left">
          
          {/* Column 1: Brand Info */}
          <div className="sm:col-span-2 lg:col-span-5 space-y-6 flex flex-col items-center sm:items-start">
            <div className="space-y-2 flex flex-col items-center sm:items-start w-full">
              {settings.site_logo ? (
                <img 
                  src={settings.site_logo} 
                  alt={settings.site_name || "Maan Creatix"} 
                  className="h-8 w-auto object-contain mx-auto sm:mx-0"
                />
              ) : (
                <>
                  <h3 className="text-xl font-bold tracking-tight text-white font-heading text-center sm:text-left">
                    {settings.site_name || "Maan Creatix"}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium tracking-wide text-center sm:text-left">
                    Crafting Digital Excellence
                  </p>
                </>
              )}
            </div>
            <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed max-w-sm mx-auto sm:mx-0 text-center sm:text-left">
              We design and engineer bespoke web experiences, graphic identities, and custom software systems for high-growth modern brands. 
            </p>
            {/* Social Icons */}
            <div className="flex items-center justify-center sm:justify-start space-x-3.5 w-full">
              {settings.social_linkedin && (
                <a href={settings.social_linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:border-white/10 hover:bg-white/10 transition-all">
                  <FiLinkedin className="w-4 h-4" />
                </a>
              )}
              {settings.social_instagram && (
                <a href={settings.social_instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:border-white/10 hover:bg-white/10 transition-all">
                  <FiInstagram className="w-4 h-4" />
                </a>
              )}
              {settings.social_facebook && (
                <a href={settings.social_facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:border-white/10 hover:bg-white/10 transition-all">
                  <FiFacebook className="w-4 h-4" />
                </a>
              )}
              {settings.social_twitter && (
                <a href={settings.social_twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:border-white/10 hover:bg-white/10 transition-all">
                  <FiTwitter className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="sm:col-span-1 lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-blue-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-blue-400 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-blue-400 transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="sm:col-span-1 lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/services/website-development" className="hover:text-blue-400 transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services/graphic-designing" className="hover:text-blue-400 transition-colors">
                  Graphic Design
                </Link>
              </li>
              <li>
                <Link href="/services/software-development" className="hover:text-blue-400 transition-colors">
                  Software Solutions
                </Link>
              </li>
              <li>
                <Link href="/services/ui-ux-designing" className="hover:text-blue-400 transition-colors">
                  UI/UX Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-4">
  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
    Contact Us
  </h4>

  <ul className="space-y-3 text-xs font-medium text-slate-400">

    {/* Phone */}
    <li className="flex items-center justify-center sm:items-start sm:justify-start space-x-2">
      <a
        href="tel:+916396566630"
        className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-300"
      >
        <FiPhone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
        <span className="break-all text-center sm:text-left">
          +91 6396566630
        </span>
      </a>
    </li>

    <li className="flex items-center justify-center sm:items-start sm:justify-start space-x-2">
      <a
        href="tel:+917055953578"
        className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-300"
      >
        <FiPhone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
        <span className="break-all text-center sm:text-left">
          +91 7055953578
        </span>
      </a>
    </li>

    <li className="flex items-center justify-center sm:items-start sm:justify-start space-x-2">
      <a
        href="tel:+918006835201"
        className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-300"
      >
        <FiPhone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
        <span className="break-all text-center sm:text-left">
          +91 8006835201
        </span>
      </a>
    </li>

    {/* Email */}
    <li className="flex items-center justify-center sm:items-start sm:justify-start space-x-2">
      <a
        href="mailto:hello@maancreatix.com"
        className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-300"
      >
        <FiMail className="w-3.5 h-3.5 text-purple-400 shrink-0" />
        <span className="break-all text-center sm:text-left">
          hello@maancreatix.com
        </span>
      </a>
    </li>

    {/* Address */}
    <li className="flex items-center justify-center sm:items-start sm:justify-start space-x-2">
      <a
        href="https://maps.google.com/?q=Amroha,UP,India"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-300"
      >
        <FiMapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
        <span className="text-center sm:text-left">
          Amroha, UP, India
        </span>
      </a>
    </li>

    {/* Timing */}
    <li className="flex items-center justify-center sm:items-start sm:justify-start space-x-2">
      <FiClock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
      <span className="text-center sm:text-left">
        Mon - Sat, 10AM - 7PM
      </span>
    </li>

  </ul>
</div>

        </div>

        <div className="h-px bg-white/5 w-full" />

        {/* Bottom footer bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
          <div className="text-slate-500">
            {settings.footer_copyright || `© ${new Date().getFullYear()} Maan Creatix. All rights reserved.`}
          </div>
          
          <div className="flex space-x-4 text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

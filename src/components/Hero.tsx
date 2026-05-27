import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiExternalLink, FiStar, FiCode, FiPenTool, FiCpu } from 'react-icons/fi';

const clientAvatars = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80',
];

interface HeroProps {
  settings?: any;
}

export default function Hero({ settings = {} }: HeroProps) {
  return (
    <section id="home" className="relative flex items-center justify-center py-20 md:py-28 overflow-hidden bg-[#050816] border-b border-white/5">
      {/* Background Ambient Glow Orbs - animated for a dynamic cinematic feel */}
      <div className="glow-orb glow-blue w-[600px] h-[600px] -top-30 -left-30 opacity-15 glowing-orb-animated" />
      <div className="glow-orb glow-purple w-[600px] h-[600px] top-1/3 -right-20 opacity-15 glowing-orb-animated" />
      <div className="glow-orb glow-orange w-[400px] h-[400px] -bottom-20 left-1/3 opacity-5 glowing-orb-animated" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-center">
        {/* LEFT COLUMN: Content */}
        <div className="lg:col-span-6 space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md animate-fade-in-up delay-100">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] md:text-xs font-bold text-slate-300 uppercase tracking-widest">
              {settings.hero_badge || "WELCOME TO MAAN CREATIX"}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1] font-heading text-white text-center lg:text-left animate-fade-in-up delay-200">
            {settings.hero_title ? (
              <span>{settings.hero_title}</span>
            ) : (
              <>
                Premium Web Development <br className="hidden md:inline" />

                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  & Custom Software Solutions
                </span>

                <br className="hidden md:inline" />

                for Modern Brands
              </>
            )}
          </h1>

          {/* Paragraph */}
          <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-lg font-body font-light text-center lg:text-left animate-fade-in-up delay-300">
            {settings.hero_description || "Maan Creatix is a premium digital agency providing web development, e-commerce website development, business websites, UI/UX design, graphic designing, branding, and custom software solutions for modern businesses."}
          </p>

          {/* CTAs */}
          {/* CTAs */}
            <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start animate-fade-in-up delay-450">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center text-xs font-bold px-5 py-3 md:px-7 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white active:scale-95 group premium-btn-primary animate-btn-glow"
              >
                {settings.hero_button_primary_text || "Start Your Project"}
                <FiArrowRight className="ml-2 group-hover:translate-x-1.5 transition-transform" />
              </Link>

              <Link
                href="/projects"
                className="inline-flex items-center justify-center text-xs font-bold px-5 py-3 md:px-7 md:py-4 border border-white/10 rounded-full text-slate-300 active:scale-95 group premium-btn-secondary"
              >
                {settings.hero_button_secondary_text || "Explore Projects"}
                <FiExternalLink className="ml-2 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

          {/* Divider */}
          <div className="h-px bg-white/5 w-full max-w-md mx-auto lg:mx-0 animate-fade-in-up delay-600" />

          {/* Trust / Social Proof */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6 w-full text-center sm:text-left animate-fade-in-up delay-600">
            {/* Avatars */}
            <div className="flex -space-x-3.5 justify-center sm:justify-start">
              {clientAvatars.map((url, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#050816] overflow-hidden bg-slate-900 relative avatar-hover-trigger cursor-pointer transition-all duration-300">
                  <Image
                    src={url}
                    alt="Happy Client of Maan Creatix"
                    fill
                    sizes="40px"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-[#050816] bg-white/5 backdrop-blur-md flex items-center justify-center text-[10px] font-bold text-slate-300 avatar-hover-trigger cursor-pointer transition-all duration-300">
                +100
              </div>
            </div>
            {/* Trust info */}
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold text-center sm:text-left">Trusted by 100+ Clients Worldwide</p>
              <div className="flex items-center justify-center sm:justify-start mt-1 space-x-1.5">
                <span className="text-sm font-bold text-white">4.9</span>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-slate-400 ml-1">Google Reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Realistic 3D Laptop Mockup & Floating Cards */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[300px] sm:min-h-[420px] md:min-h-[500px]">
          {/* Circular Neon Light Ring behind laptop */}
          <div className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[400px] md:h-[400px] rounded-full border-2 border-blue-500/30 flex items-center justify-center animate-[spin_120s_linear_infinite] z-0 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
            <div className="w-[90%] h-[90%] rounded-full border border-dashed border-purple-500/20" />
          </div>
          <div className="absolute w-[180px] h-[180px] sm:w-[250px] sm:h-[250px] rounded-full bg-blue-500/10 filter blur-3xl z-0" />

          {/* Perspective Wrapper */}
          <div className="relative z-10 w-full max-w-[380px] md:max-w-[420px] flex flex-col items-center hero-laptop-wrapper floating-laptop">
            
            {/* Screen */}
            <div
              style={{ transformStyle: 'preserve-3d', perspective: '1000px', transform: 'rotateX(10deg) rotateY(-10deg) translateY(0px)' }}
              className="w-[280px] h-[180px] md:w-[340px] md:h-[210px] bg-[#0c0f1d] border border-blue-500/20 rounded-t-xl p-3 flex flex-col justify-between shadow-2xl relative transition-transform duration-500 hover:scale-102"
            >
              <div className="absolute inset-0 border border-purple-500/15 rounded-t-xl pointer-events-none" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-700/50 absolute top-1 left-1/2 -translate-x-1/2" />
              
              {/* Screen Contents */}
              <div className="flex-1 rounded-lg border border-white/5 bg-[#030612]/80 backdrop-blur-md flex flex-col items-center justify-center text-center p-4">
                <h4 className="text-sm md:text-base font-bold tracking-tight text-white font-heading">
                  Maan Creatix
                </h4>
                <p className="text-[9px] md:text-[10px] text-slate-500 font-light mt-1">
                  Crafting Digital Excellence
                </p>
                <Link
                  href="/services"
                  className="mt-4 px-3.5 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-[9px] font-semibold rounded-full transition-all text-white inline-flex items-center space-x-1"
                >
                  <span>Discover More</span>
                  <FiArrowRight className="w-2.5 h-2.5" />
                </Link>
              </div>
            </div>

            {/* Keyboard Deck */}
            <div
              className="w-[330px] h-[120px] md:w-[400px] md:h-[140px] bg-slate-900 border-t border-slate-800 rounded-b-2xl shadow-3xl flex flex-col justify-between p-2 relative -mt-4 origin-top"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)',
                transform: 'rotateX(60deg)',
              }}
            >
              <div className="flex-1 rounded bg-[#070b16] border border-white/5 p-2 grid grid-cols-12 gap-0.5 opacity-80">
                {[...Array(48)].map((_, i) => (
                  <div key={i} className="bg-slate-900 rounded-[1px] border-[0.5px] border-white/5" />
                ))}
              </div>
              <div className="w-16 h-8 md:w-20 md:h-9 bg-slate-950/80 border border-white/5 rounded mx-auto mt-1" />
            </div>

            {/* FLOATING ORBITING CARDS - Statically positioned, animated via CPU-friendly CSS */}
            
            {/* Web Development Card (Top Right) */}
            <div className="hidden md:block absolute -top-8 -right-12 w-48 p-4 bg-[#050816]/90 border border-blue-500/30 rounded-xl backdrop-blur-md shadow-lg shadow-blue-500/5 group hover:border-blue-500/50 hover:bg-[#050816] transition-all duration-300 animate-float-slow z-20">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Web Development</span>
                <div className="p-1.5 bg-blue-500/10 text-blue-400 rounded-lg">
                  <FiCode className="w-3.5 h-3.5" />
                </div>
              </div>
              <p className="text-[9px] text-slate-500 mt-2 font-light leading-relaxed">
                Modern & Responsive Websites
              </p>
            </div>

            {/* Graphic Design Card (Middle Right) */}
            <div className="hidden md:block absolute top-16 -right-16 w-48 p-4 bg-[#050816]/90 border border-purple-500/30 rounded-xl backdrop-blur-md shadow-lg shadow-purple-500/5 group hover:border-purple-500/50 hover:bg-[#050816] transition-all duration-300 animate-float-medium z-20">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Graphic Design</span>
                <div className="p-1.5 bg-purple-500/10 text-purple-400 rounded-lg">
                  <FiPenTool className="w-3.5 h-3.5" />
                </div>
              </div>
              <p className="text-[9px] text-slate-500 mt-2 font-light leading-relaxed">
                Creative Designs That Inspire
              </p>
            </div>

            {/* Software Solutions Card (Bottom Right) */}
            <div className="hidden md:block absolute top-[160px] -right-20 w-48 p-4 bg-[#050816]/90 border border-orange-500/30 rounded-xl backdrop-blur-md shadow-lg shadow-orange-500/5 group hover:border-orange-500/50 hover:bg-[#050816] transition-all duration-300 animate-float-fast z-20">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Software Solutions</span>
                <div className="p-1.5 bg-orange-500/10 text-orange-400 rounded-lg">
                  <FiCpu className="w-3.5 h-3.5" />
                </div>
              </div>
              <p className="text-[9px] text-slate-500 mt-2 font-light leading-relaxed">
                Powerful Enterprise Apps
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

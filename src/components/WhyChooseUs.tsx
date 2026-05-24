import { FiCpu, FiTrendingUp, FiLayers } from 'react-icons/fi';

const features = [
  {
    icon: FiLayers,
    title: 'Premium Aesthetics',
    description: 'We design bespoke luxury interfaces that command attention and elevate your brand presence.',
    color: 'text-blue-400',
  },
  {
    icon: FiCpu,
    title: 'Clean Engineering',
    description: 'High-performance Next.js architectures with clean, maintainable codebases built to scale.',
    color: 'text-purple-400',
  },
  {
    icon: FiTrendingUp,
    title: 'Strategic Growth',
    description: 'We align design and technology with your business objectives to increase conversions and sales.',
    color: 'text-orange-400',
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-24 relative overflow-hidden bg-[#050816] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center md:text-left space-y-4 max-w-xl mx-auto md:mx-0 reveal-fade-up">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
            <span className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-widest">
              Why Maan Creatix
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-white">
            Designed for Impact
          </h2>
          <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed">
            We reject template-driven styles. We build fast, tailored, and premium digital solutions that make your business stand out.
          </p>
        </div>

        {/* Features List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 reveal-stagger-container">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="glass-card rounded-2xl p-5 md:p-8 flex flex-col justify-between items-center md:items-start text-center md:text-left hover:bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-550 group reveal-stagger-item premium-card-hover"
              >
                <div className="space-y-4 flex flex-col items-center md:items-start w-full">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-white/10 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{feat.title}</h3>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">{feat.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

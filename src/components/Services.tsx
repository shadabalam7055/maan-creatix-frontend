import { FiCode, FiPenTool, FiCpu, FiMonitor, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

const iconMap: Record<string, React.ComponentType<any>> = {
  Code2: FiCode,
  Code: FiCode,
  Palette: FiPenTool,
  Cpu: FiCpu,
  Monitor: FiMonitor,
};

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  glow_color: string;
  link: string;
}

const fallbackServices: ServiceItem[] = [
  {
    id: 1,
    title: 'Web Development',
    description: 'We build modern, fast & responsive websites that convert visitors into customers.',
    icon: 'Code2',
    glow_color: 'blue',
    link: '/services/website-development',
  },
  {
    id: 2,
    title: 'Graphic Design',
    description: 'Stunning visuals that capture attention and make your brand stand out.',
    icon: 'Palette',
    glow_color: 'purple',
    link: '/services/graphic-designing',
  },
  {
    id: 3,
    title: 'Software Solutions',
    description: 'Custom software solutions to streamline your business processes.',
    icon: 'Cpu',
    glow_color: 'orange',
    link: '/services/software-development',
  },
];

interface ServicesProps {
  initialServices?: ServiceItem[];
}

export default function Services({ initialServices = [] }: ServicesProps) {
  const services = initialServices.length > 0 ? initialServices : fallbackServices;

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-[#050816] border-b border-white/5">
      {/* Glow ambient background */}
      <div className="glow-orb glow-purple w-[500px] h-[500px] top-1/4 left-1/2 -translate-x-1/2 opacity-10 glowing-orb-animated" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center md:text-left space-y-4 max-w-xl mx-auto md:mx-0 reveal-fade-up">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
            <span className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-widest">
              WHAT WE DO
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-white">
            Our Services
          </h2>
          <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed">
            We provide end-to-end digital solutions for your business growth, combining premium aesthetics with clean architectures.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 reveal-stagger-container">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon] || FiMonitor;
            
            // Determine hover glow shadow classes based on glow_color
            let borderHoverClass = 'hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]';
            let iconBgClass = 'bg-blue-500/10 text-blue-400';
            if (service.glow_color === 'purple') {
              borderHoverClass = 'hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]';
              iconBgClass = 'bg-purple-500/10 text-purple-400';
            } else if (service.glow_color === 'orange') {
              borderHoverClass = 'hover:border-orange-500/40 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]';
              iconBgClass = 'bg-orange-500/10 text-orange-400';
            }

            // Map custom slugs if they are default hash values
            let targetLink = service.link;
            if (!targetLink || targetLink === '#' || targetLink === '#contact') {
              if (service.title.toLowerCase().includes('web')) {
                targetLink = '/services/website-development';
              } else if (service.title.toLowerCase().includes('design')) {
                targetLink = '/services/graphic-designing';
              } else if (service.title.toLowerCase().includes('software')) {
                targetLink = '/services/software-development';
              } else {
                targetLink = '/services';
              }
            }

            return (
              <Link
                key={service.id}
                href={targetLink}
                className={`glass-card rounded-2xl p-5 md:p-8 flex flex-col justify-between h-auto min-h-[250px] md:h-[300px] items-center md:items-start text-center md:text-left transition-all duration-500 relative group cursor-pointer reveal-stagger-item premium-card-hover ${borderHoverClass}`}
              >
                {/* Card Glow Backdrop Spot */}
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-full filter blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${
                  service.glow_color === 'blue' ? 'bg-blue-500' : service.glow_color === 'purple' ? 'bg-purple-500' : 'bg-orange-500'
                }`} />

                <div className="space-y-6 flex flex-col items-center md:items-start w-full">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${iconBgClass}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Text */}
                  <div className="space-y-2 text-center md:text-left w-full">
                    <h3 className="text-xl font-bold tracking-tight text-white">{service.title}</h3>
                    <p className="text-sm text-slate-400 font-light leading-relaxed">{service.description}</p>
                  </div>
                </div>

                {/* Explore Link */}
                <div className="inline-flex items-center justify-center md:justify-start text-xs font-bold text-white transition-colors group-hover:text-blue-400 pt-4 w-full md:w-auto">
                  <span>Explore More</span>
                  <FiArrowRight className="ml-2 group-hover:transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

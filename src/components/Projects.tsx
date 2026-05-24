import { FiArrowRight, FiExternalLink } from 'react-icons/fi';
import Link from 'next/link';

interface ProjectItem {
  id: number;
  title: string;
  description: string;
  image_url: string;
  category: string;
  tags: string[];
  demo_link: string;
  slug?: string;
}

const fallbackProjects: ProjectItem[] = [
  {
    id: 1,
    title: 'E-Commerce Website',
    description: 'Next-generation luxury e-commerce platform with head-turning 3D transitions and blazing fast edge rendering.',
    image_url: '/images/projects/ecommerce.png',
    category: 'Web Development',
    tags: ['Next.js', 'Tailwind', 'Laravel'],
    demo_link: '#',
    slug: 'ecommerce-website',
  },
  // {
  //   id: 2,
  //   title: 'Brand Identity Design',
  //   description: 'A comprehensive visual design system, typography guide, and custom logo architecture for a high-end fashion label.',
  //   image_url: '/images/projects/branding.png',
  //   category: 'Graphic Design',
  //   tags: ['Branding', 'UI/UX', 'Figma'],
  //   demo_link: '#',
  //   slug: 'brand-identity-design',
  // },
  // {
  //   id: 3,
  //   title: 'Dashboard Software',
  //   description: 'Real-time telemetry control panel with active websocket hooks, sleek interactive charts, and optimized DB operations.',
  //   image_url: '/images/projects/dashboard.png',
  //   category: 'Software Development',
  //   tags: ['React', 'Laravel', 'Tailwind'],
  //   demo_link: '#',
  //   slug: 'dashboard-software',
  // },
  {
    id: 4,
    title: 'Restaurant Website',
    description: 'Delightful food ordering website with a customized checkout page, mobile responsive design, and smooth GSAP layout reveals.',
    image_url: '/images/projects/restaurant.png',
    category: 'Web Development',
    tags: ['Next.js', 'Tailwind', 'Framer'],
    demo_link: '#',
    slug: 'restaurant-website',
  },
];

interface ProjectsProps {
  initialProjects?: ProjectItem[];
}

export default function Projects({ initialProjects = [] }: ProjectsProps) {
  const projects = initialProjects.length > 0 ? initialProjects : fallbackProjects;

  const renderProjectMockup = (title: string) => {
    if (title.includes('E-Commerce')) {
      return (
        <div className="w-full h-full bg-gradient-to-br from-blue-950/40 to-slate-900 flex flex-col justify-between p-4 font-sans border border-blue-500/10">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-[8px] text-blue-400 font-bold uppercase tracking-wider">AURA.SHOP</span>
            <div className="flex space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
              <span className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center py-6">
            <div className="w-24 h-24 rounded-lg bg-blue-500/5 border border-blue-500/20 flex items-center justify-center rotate-6 relative">
              <div className="w-full h-full absolute -top-1 -left-1 border border-purple-500/20 rounded-lg bg-[#050816]/60 flex flex-col items-center justify-center p-2">
                <span className="text-[7px] text-white font-bold">$129.99</span>
                <span className="text-[6px] text-slate-500">Luxury Watch</span>
              </div>
            </div>
          </div>
          <div className="text-[7px] text-slate-500">Responsive Checkout Active</div>
        </div>
      );
    }
    if (title.includes('Brand Identity')) {
      return (
        <div className="w-full h-full bg-gradient-to-tr from-purple-950/30 to-slate-900 flex flex-col justify-center items-center p-6 border border-purple-500/10">
          <div className="w-16 h-16 rounded-full border border-purple-500/20 flex items-center justify-center relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center font-heading text-xs font-bold text-white shadow-lg shadow-purple-500/20">
              A
            </div>
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-pink-500" />
          </div>
          <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-4">Brand Guidelines v1</span>
        </div>
      );
    }
    if (title.includes('Dashboard')) {
      return (
        <div className="w-full h-full bg-gradient-to-tr from-slate-900 to-[#0c0f1d] flex flex-col justify-between p-4 border border-white/5">
          <div className="flex items-center space-x-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider">Dashboard Portal</span>
          </div>
          <div className="flex-1 flex flex-col justify-center py-4 space-y-1">
            <div className="h-1.5 w-16 bg-white/10 rounded" />
            <div className="h-1.5 w-24 bg-white/5 rounded" />
            <div className="h-1.5 w-12 bg-white/5 rounded" />
          </div>
          <span className="text-[6px] text-slate-600">Telemetry Active</span>
        </div>
      );
    }
    return (
      <div className="w-full h-full bg-gradient-to-tr from-slate-900 to-[#0c0f1d] flex flex-col justify-between p-4 border border-white/5">
        <div className="flex items-center space-x-1.5 justify-between">
          <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider">Restaurant App</span>
          <span className="w-2 h-2 rounded-full bg-orange-500" />
        </div>
        <div className="flex-1 flex items-center justify-center py-4">
          <div className="w-14 h-14 rounded-full border-4 border-dashed border-orange-500/20 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-[10px]">🍔</div>
          </div>
        </div>
        <span className="text-[6px] text-slate-600">Ordering System Online</span>
      </div>
    );
  };

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden bg-[#050816] border-b border-white/5">
      {/* Glow Ambient Blurs */}
      <div className="glow-orb glow-purple w-[400px] h-[400px] top-10 -left-10 opacity-10 glowing-orb-animated" />
      <div className="glow-orb glow-blue w-[400px] h-[400px] bottom-10 -right-10 opacity-5 glowing-orb-animated" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 reveal-fade-up">
          <div className="text-center md:text-left space-y-4 max-w-xl mx-auto md:mx-0">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
              <span className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-widest">
                OUR LATEST WORK
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-white">
              Featured Projects
            </h2>
            <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed">
              Some of our recent work that made an impact. We design and code bespoke digital products that achieve real-world results.
            </p>
          </div>

          {/* Main projects view link */}
          <div>
            <Link
              href="/projects"
              className="inline-flex items-center text-xs font-bold bg-white/5 border border-white/10 rounded-full text-white transition-all duration-300 group premium-btn-secondary py-3.5 px-6"
            >
              <span>View All Projects</span>
              <FiArrowRight className="ml-2 group-hover:transform group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Projects 2x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 reveal-stagger-container">
          {projects.slice(0, 4).map((project) => {
            const projectSlug = project.slug || 'project-detail';
            return (
              <Link
                key={project.id}
                href={`/projects/${projectSlug}`}
                className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.08)] group transition-all duration-500 reveal-stagger-item premium-card-hover w-full cursor-pointer"
              >
                <div className="p-5 md:p-6 flex flex-col space-y-4 items-center sm:items-start w-full">
                  {/* Visual Box Mockup */}
                  <div className="h-48 w-full rounded-xl overflow-hidden bg-slate-900 border border-white/5 relative group-hover:border-white/10 transition-colors">
                    {renderProjectMockup(project.title)}
                    
                    {/* Category tag inside card overlay */}
                    <div className="absolute top-3 left-3 px-2 py-0.5 bg-slate-950/75 border border-white/10 text-slate-300 text-[9px] font-bold rounded uppercase tracking-wider backdrop-blur-sm">
                      {project.category}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-2 text-center sm:text-left w-full">
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-400 font-light leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Footer details */}
                <div className="px-5 pb-5 pt-3 md:px-6 md:pb-6 md:pt-4 border-t border-white/5 bg-slate-950/20 flex flex-col sm:flex-row gap-4 items-center justify-between w-full">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-0.5 bg-white/5 text-[10px] text-slate-500 font-medium rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center justify-center sm:justify-start space-x-2 text-slate-400 group-hover:text-blue-400 transition-colors text-xs font-bold">
                    <span>View Case Study</span>
                    <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

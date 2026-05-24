'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  FiArrowLeft, 
  FiCalendar, 
  FiUser, 
  FiClock, 
  FiExternalLink, 
  FiCpu, 
  FiLayers, 
  FiTrendingUp,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

// Interfaces
interface CategoryItem {
  id: number;
  name: string;
  slug: string;
}

interface ProjectItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  case_study: string;
  image_url: string;
  category?: string;
  tags?: string[];
  demo_link?: string;
  client?: string;
  duration?: string;
  completion_date?: string;
  is_featured: boolean;
  category_relation?: CategoryItem;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [project, setProject] = useState<ProjectItem | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(false);

    fetch(`http://127.0.0.1:8000/api/projects/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Project not found');
        return res.json();
      })
      .then(data => {
        if (data.project) {
          const parsedProject = {
            ...data.project,
            tags: typeof data.project.tags === 'string' ? JSON.parse(data.project.tags) : (Array.isArray(data.project.tags) ? data.project.tags : [])
          };
          setProject(parsedProject);

          if (Array.isArray(data.related_projects)) {
            const parsedRelated = data.related_projects.map((p: any) => ({
              ...p,
              tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : (Array.isArray(p.tags) ? p.tags : [])
            }));
            setRelatedProjects(parsedRelated);
          }
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-[#050816] text-white min-h-screen flex items-center justify-center flex-col space-y-4">
        <div className="w-12 h-12 border-t-2 border-blue-500 rounded-full animate-spin" />
        <span className="text-xs font-semibold text-slate-500 tracking-wider">Loading Case Study Details...</span>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="bg-[#050816] text-white min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto text-center py-20 px-6 space-y-6">
          <h2 className="text-3xl font-extrabold text-white font-heading">Case Study Not Found</h2>
          <p className="text-slate-400 text-sm leading-relaxed">The project you are looking for does not exist or has been removed from the platform.</p>
          <button 
            onClick={() => router.push('/projects')}
            className="inline-flex items-center text-xs font-bold bg-white text-slate-900 px-6 py-3 rounded-full hover:bg-slate-200 transition-colors"
          >
            <FiArrowLeft className="mr-2 w-4 h-4" /> Back to Projects
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#050816] text-white min-h-screen flex flex-col font-body selection:bg-blue-500/20 selection:text-blue-200 overflow-x-hidden">
      <Navbar />

      {/* Hero Banner Header */}
      <section className="relative pt-32 pb-12 overflow-hidden bg-slate-950/20 border-b border-white/5">
        <div className="glow-orb glow-blue w-[500px] h-[500px] -top-30 -left-20 opacity-20 pointer-events-none" />
        <div className="glow-orb glow-purple w-[400px] h-[400px] bottom-0 right-0 opacity-15 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-6 text-left">
          {/* Back button */}
          <Link 
            href="/projects" 
            className="inline-flex items-center text-xs text-slate-400 hover:text-white font-semibold transition-colors"
          >
            <FiArrowLeft className="mr-1.5 w-4 h-4" /> Back to portfolio
          </Link>

          <div className="space-y-4">
            <span className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
              {project.category_relation?.name || project.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-white max-w-4xl leading-tight">
              {project.title}
            </h1>
            <p className="text-slate-400 font-light text-sm md:text-base leading-relaxed max-w-2xl">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <main className="py-16 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 text-left relative">
        
        {/* Left Column: Markdown / Case study description */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Showcase Image */}
          <div className="rounded-3xl overflow-hidden border border-white/10 relative aspect-[16/9] shadow-2xl bg-slate-950">
            <img 
              src={project.image_url} 
              alt={project.title} 
              className="object-cover w-full h-full"
            />
          </div>

          {/* Case study content details */}
          <div className="glass-card rounded-2xl border border-white/5 p-8 md:p-10 space-y-6">
            <h2 className="text-2xl font-bold font-heading text-white border-b border-white/5 pb-4">
              Project Case Study & Development Details
            </h2>
            <div className="text-slate-300 font-light leading-relaxed space-y-6 text-sm md:text-base whitespace-pre-line">
              {project.case_study || 'No detailed case study has been written yet for this project. Keep watching for future updates.'}
            </div>
          </div>
        </div>

        {/* Right Column: Project Meta Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card rounded-2xl border border-white/5 p-6 md:p-8 space-y-6 sticky top-28 bg-[#090d23]/40 backdrop-blur-md">
            <h3 className="text-lg font-bold font-heading text-white border-b border-white/5 pb-3">
              Project Parameters
            </h3>

            <div className="space-y-4">
              <div>
                <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Client</span>
                <span className="text-slate-200 mt-1 font-semibold block">{project.client || 'Internal Project'}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Project Timeline</span>
                <span className="text-slate-200 mt-1 font-semibold block">{project.duration || 'N/A'}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Completion Date</span>
                <span className="text-slate-200 mt-1 font-semibold block">{project.completion_date || 'N/A'}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Category / Service</span>
                <span className="text-slate-200 mt-1 font-semibold block">{project.category_relation?.name || project.category}</span>
              </div>
            </div>

            <div className="h-px bg-white/5" />

            {/* Tags / Stack */}
            <div className="space-y-3">
              <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Core Technologies</span>
              <div className="flex flex-wrap gap-1.5">
                {project.tags && project.tags.length > 0 ? (
                  project.tags.map(tag => (
                    <span key={tag} className="text-[10px] bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded text-blue-300 font-medium">
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500">No technology tags specified.</span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 space-y-3">
              {project.demo_link && (
                <a 
                  href={project.demo_link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full inline-flex items-center justify-center text-xs font-bold py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/10 transition-all duration-300 group active:scale-95"
                >
                  Launch Live Preview
                  <FiExternalLink className="ml-2 w-4 h-4" />
                </a>
              )}
              <Link 
                href="/#contact"
                className="w-full text-center inline-flex items-center justify-center text-xs font-bold py-3.5 px-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all duration-300 active:scale-95"
              >
                Hire Us For A Similar Project
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* RELATED PROJECTS SECTION */}
      {relatedProjects.length > 0 && (
        <section className="py-20 border-t border-white/5 relative bg-slate-950/20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
            <div className="flex justify-between items-end">
              <div className="text-left space-y-3">
                <span className="text-[10px] md:text-xs font-bold text-purple-400 uppercase tracking-widest">Explore More</span>
                <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-white">Related Case Studies</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((proj) => (
                <div 
                  key={proj.id}
                  className="glass-card rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between hover:border-white/10 hover:bg-white/[0.02] transition-all duration-500 group text-left"
                >
                  <div className="aspect-[16/10] overflow-hidden border-b border-white/5 relative bg-slate-950">
                    <img 
                      src={proj.image_url} 
                      alt={proj.title} 
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                  </div>
                  <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <h4 className="text-lg font-bold font-heading text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                        {proj.title}
                      </h4>
                      <p className="text-slate-400 font-light text-xs line-clamp-2 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-4 border-t border-white/5">
                      <span className="text-slate-500 font-light">Client: <strong className="font-semibold text-slate-300">{proj.client || 'Internal'}</strong></span>
                      <Link 
                        href={`/projects/${proj.slug}`}
                        className="text-blue-400 font-bold hover:text-blue-300"
                      >
                        Read Study
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

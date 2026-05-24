import { FiStar } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import Image from 'next/image';

interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  company: string;
  review: string;
  rating: number;
  image_url: string;
}

const fallbackTestimonials: TestimonialItem[] = [
  // {
  //   id: 1,
  //   name: 'Rahul Sharma',
  //   role: 'CEO',
  //   company: 'TechNove',
  //   review: 'Maan Creatix delivered a fantastic website that exceeded our expectations. Highly professional and on-time delivery!',
  //   rating: 5,
  //   image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
  // },
  // {
  //   id: 2,
  //   name: 'Priya Verma',
  //   role: 'Marketing Head',
  //   company: 'Aura Brand',
  //   review: 'The designs were creative, modern and exactly what our brand needed. Great experience!',
  //   rating: 5,
  //   image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
  // },
  // {
  //   id: 3,
  //   name: 'Vikram Singh',
  //   role: 'Founder',
  //   company: 'Foodies Hub',
  //   review: 'Their software solution helped us manage our business efficiently. Excellent work and support!',
  //   rating: 5,
  //   image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80',
  // },
];

interface TestimonialsProps {
  initialTestimonials?: TestimonialItem[];
}

export default function Testimonials({ initialTestimonials = [] }: TestimonialsProps) {
  const items = initialTestimonials.length > 0 ? initialTestimonials : fallbackTestimonials;

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-[#050816] border-b border-white/5">
      <div className="glow-orb glow-blue w-[400px] h-[400px] top-10 right-10 opacity-5 glowing-orb-animated" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center md:text-left space-y-4 max-w-xl mx-auto md:mx-0 reveal-fade-up">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
            <span className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-widest">
              WHAT CLIENTS SAY
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-white">
            Client Testimonials
          </h2>
          <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed">
            We take pride in delivering results that our clients love. Read what founders and CEOs say about their Maan Creatix experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 reveal-stagger-container">
          {items.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-2xl p-5 md:p-8 relative flex flex-col justify-between items-center md:items-start text-center md:text-left hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.08)] group transition-all duration-300 reveal-stagger-item premium-card-hover"
            >
              {/* Quote Icon */}
              <FaQuoteRight className="absolute top-6 right-6 text-blue-500/10 w-10 h-10 pointer-events-none" />

              <div className="space-y-6 w-full flex flex-col items-center md:items-start">
                {/* Star Rating */}
                <div className="flex text-amber-500 space-x-1 justify-center md:justify-start">
                  {[...Array(item.rating)].map((_, i) => (
                    <FiStar key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm md:text-base text-slate-300 leading-relaxed font-light italic text-center md:text-left">
                  "{item.review}"
                </p>
              </div>

              {/* Client Info Block */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 pt-6 mt-6 border-t border-white/5 w-full justify-center md:justify-start text-center sm:text-left">
                <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden bg-slate-900 shrink-0 relative avatar-hover-trigger cursor-pointer transition-all duration-300">
                  <Image
                    src={item.image_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80'}
                    alt={item.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <h4 className="font-bold text-white text-sm tracking-wide">{item.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {item.role}, <span className="text-slate-400 font-medium">{item.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

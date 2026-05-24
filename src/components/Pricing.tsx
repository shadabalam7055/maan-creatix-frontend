import { FiCheck } from 'react-icons/fi';
import Link from 'next/link';

interface PricingPlanItem {
  id: number;
  name: string;
  subtitle: string;
  price: string;
  billing_period: string;
  features: string[];
  is_popular: boolean;
}

const fallbackPricing: PricingPlanItem[] = [
  {
    id: 1,
    name: 'Basic Plan',
    subtitle: 'Perfect for small projects',
    price: '4,999',
    billing_period: '/project',
    features: ['5 Pages Website', 'Responsive Design', 'Basic SEO', '1 Month Support'],
    is_popular: false,
  },
  {
    id: 2,
    name: 'Standard Plan',
    subtitle: 'Best for growing businesses',
    price: '9,999',
    billing_period: '/project',
    features: ['10 Pages Website', 'Responsive Design', 'SEO Optimized', '3 Month Support', 'Basic Animations'],
    is_popular: true,
  },
  {
    id: 3,
    name: 'Premium Plan',
    subtitle: 'For advanced requirements',
    price: '19,999',
    billing_period: '/project',
    features: ['Unlimited Pages', 'Advanced Features', 'SEO & Speed Optimized', '6 Month Support', 'Premium Animations'],
    is_popular: false,
  },
];

interface PricingProps {
  initialPlans?: PricingPlanItem[];
}

export default function Pricing({ initialPlans }: PricingProps) {
  const plans = initialPlans && initialPlans.length > 0 ? initialPlans : fallbackPricing;

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-[#050816] border-b border-white/5">
      {/* Glow ambient backgrounds */}
      <div className="glow-orb glow-orange w-[400px] h-[400px] -top-20 -right-20 opacity-5 glowing-orb-animated" />
      <div className="glow-orb glow-blue w-[500px] h-[500px] bottom-10 left-1/4 opacity-10 glowing-orb-animated" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center md:text-left space-y-4 max-w-xl mx-auto md:mx-0 reveal-fade-up">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
            <span className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-widest">
              OUR PRICING
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-white">
            Simple Pricing
          </h2>
          <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed">
            Choose the perfect plan for your business needs. Flexible tiers built around your goals.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 reveal-stagger-container">
          {plans.slice(0, 3).map((plan) => (
            <div
              key={plan.id}
              className={`glass-card rounded-3xl p-5 md:p-8 flex flex-col justify-between items-center md:items-start text-center md:text-left hover:border-white/15 hover:bg-white/5 transition-all duration-300 relative group reveal-stagger-item premium-card-hover ${
                plan.is_popular ? 'border-blue-500/40 ring-1 ring-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]' : ''
              }`}
            >
              {/* Most popular label */}
              {plan.is_popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow shadow-blue-500/20">
                  Most Popular
                </span>
              )}

              <div className="space-y-8 w-full flex flex-col items-center md:items-start">
                <div className="flex flex-col items-center md:items-start w-full">
                  <h3 className="text-xl font-bold text-white font-heading text-center md:text-left">{plan.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 font-light text-center md:text-left">{plan.subtitle}</p>
                  
                  <div className="flex items-baseline mt-6 justify-center md:justify-start w-full">
                    <span className="text-slate-400 text-base font-bold mr-1">₹</span>
                    <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight text-center md:text-left">
                      {plan.price}
                    </span>
                    <span className="text-slate-500 text-xs ml-1 font-light">
                      {plan.billing_period}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-white/5 w-full" />

                {/* Features list */}
                <div className="flex flex-col items-center md:items-start w-full">
                  <ul className="space-y-4 text-left w-full max-w-[240px] md:max-w-none">
                    {plan.features.map(feat => (
                      <li key={feat} className="flex items-start text-sm text-slate-300">
                        <FiCheck className="w-4.5 h-4.5 text-blue-400 mr-3 shrink-0 mt-0.5" />
                        <span className="font-light">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Button CTA */}
              <div className="pt-8 mt-8 border-t border-white/5 w-full">
                <Link
                  href="/contact"
                  className={`w-full text-center inline-flex items-center justify-center text-xs font-bold py-3.5 px-6 rounded-xl transition-all duration-300 premium-btn-primary ${
                    plan.is_popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/10'
                      : 'bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white'
                  }`}
                >
                  Choose Plan
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

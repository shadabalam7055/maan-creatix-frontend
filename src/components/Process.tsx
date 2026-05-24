const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'We understand your requirements, analyze targets, and map out your business goals.',
    glow: 'border-blue-500/30 text-blue-400 bg-blue-500/5',
  },
  {
    number: '02',
    title: 'Design',
    description: 'We create stunning visual designs, wireframes, and prototypes that match your brand.',
    glow: 'border-purple-500/30 text-purple-400 bg-purple-500/5',
  },
  {
    number: '03',
    title: 'Develop',
    description: 'We build fast, scalable, responsive, and high-quality production-ready systems.',
    glow: 'border-orange-500/30 text-orange-400 bg-orange-500/5',
  },
  {
    number: '04',
    title: 'Launch',
    description: 'We test everything thoroughly and deploy the final product with speed optimization.',
    glow: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5',
  },
];

export default function Process() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#050816] border-b border-white/5">
      {/* Glow ambient background */}
      <div className="glow-orb glow-blue w-[400px] h-[400px] top-1/2 left-1/4 opacity-5 glowing-orb-animated" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center md:text-left space-y-4 max-w-xl mx-auto md:mx-0 reveal-fade-up">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
            <span className="text-[10px] md:text-xs font-bold text-orange-400 uppercase tracking-widest">
              OUR PROCESS
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-white">
            How We Work
          </h2>
          <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed">
            A simple, structured, and efficient process designed to translate your ideas into scalable digital reality.
          </p>
        </div>

        {/* Workflow steps grid with connectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative reveal-stagger-container">
          {/* Horizontal connector line for large screens */}
          <div className="hidden lg:block absolute top-7 left-10 right-10 h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 -z-10" />

          {steps.map((step) => (
            <div
              key={step.number}
              className="space-y-6 text-center md:text-left flex flex-col items-center md:items-start group reveal-stagger-item"
            >
              {/* Step Node */}
              <div className={`w-14 h-14 rounded-full border flex items-center justify-center font-heading font-extrabold text-lg transition-transform duration-300 group-hover:scale-110 shadow-lg relative ${step.glow}`}>
                {step.number}
                
                {/* Orbiting tiny node dot */}
                <div className="absolute inset-0 rounded-full border border-dashed border-white/10 scale-125 animate-[spin_20s_linear_infinite]" />
              </div>

              {/* Content */}
              <div className="space-y-2 text-center md:text-left">
                <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

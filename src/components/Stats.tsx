import { FiUsers, FiBriefcase, FiAward, FiCalendar } from 'react-icons/fi';

interface StatItem {
  id: number;
  label: string;
  value: string;
  icon: string;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Users: FiUsers,
  Briefcase: FiBriefcase,
  Award: FiAward,
  Calendar: FiCalendar,
};

const fallbackStats: StatItem[] = [
  { id: 1, label: 'Happy Clients', value: '150+', icon: 'Users' },
  { id: 2, label: 'Projects Completed', value: '250+', icon: 'Briefcase' },
  { id: 3, label: 'Years Experience', value: '4+', icon: 'Calendar' },
  { id: 4, label: 'Client Satisfaction', value: '99%', icon: 'Award' },
];

interface StatsProps {
  initialStats?: StatItem[];
}

export default function Stats({ initialStats = [] }: StatsProps) {
  const stats = initialStats.length > 0 ? initialStats : fallbackStats;

  return (
    <section className="py-12 bg-slate-950/40 border-y border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 md:divide-x divide-white/5 reveal-stagger-container">
          {stats.map((stat) => {
            const IconComponent = iconMap[stat.icon] || FiBriefcase;
            return (
              <div
                key={stat.id}
                className="flex flex-col items-center text-center justify-center p-4 first:pt-0 md:first:pt-4 md:pl-0 reveal-stagger-item"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-blue-400 transition-transform duration-300 hover:scale-110">
                    <IconComponent className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="text-left">
                    <span className="block text-2xl md:text-3xl font-extrabold font-heading text-white tracking-tight">
                      {stat.value}
                    </span>
                    <span className="block text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-semibold mt-0.5">
                      {stat.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

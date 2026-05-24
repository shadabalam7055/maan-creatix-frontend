import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Stats from "@/components/Stats";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

async function getHomeData() {
  try {
    const [settingsRes, projectsRes, testimonialsRes, pricingRes, servicesRes, statsRes] = await Promise.all([
      fetch('http://127.0.0.1:8000/api/settings', { cache: 'no-store' }),
      fetch('http://127.0.0.1:8000/api/projects', { cache: 'no-store' }),
      fetch('http://127.0.0.1:8000/api/testimonials', { cache: 'no-store' }),
      fetch('http://127.0.0.1:8000/api/pricing-plans', { cache: 'no-store' }),
      fetch('http://127.0.0.1:8000/api/services', { cache: 'no-store' }),
      fetch('http://127.0.0.1:8000/api/stats', { cache: 'no-store' }),
    ]);

    const settings = settingsRes.ok ? await settingsRes.json() : {};
    const projects = projectsRes.ok ? await projectsRes.json() : [];
    const testimonials = testimonialsRes.ok ? await testimonialsRes.json() : [];
    const pricing = pricingRes.ok ? await pricingRes.json() : [];
    const services = servicesRes.ok ? await servicesRes.json() : [];
    const stats = statsRes.ok ? await statsRes.json() : [];

    // Convert string-based booleans to actual boolean types
    const parsedSettings: Record<string, any> = {};
    Object.keys(settings).forEach(key => {
      const val = settings[key];
      if (val === 'true') {
        parsedSettings[key] = true;
      } else if (val === 'false') {
        parsedSettings[key] = false;
      } else {
        parsedSettings[key] = val;
      }
    });

    // Parse projects tags from stringified JSON if needed
    const parsedProjects = Array.isArray(projects)
      ? projects.map((p: any) => ({
          ...p,
          tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags,
        }))
      : [];

    // Parse pricing features from stringified JSON if needed
    const parsedPricing = Array.isArray(pricing)
      ? pricing.map((p: any) => ({
          ...p,
          features: typeof p.features === 'string' ? JSON.parse(p.features) : p.features,
          is_popular: Boolean(p.is_popular),
        }))
      : [];

    return {
      settings: parsedSettings,
      projects: parsedProjects,
      testimonials,
      pricing: parsedPricing,
      services,
      stats,
    };
  } catch (err) {
    console.error("Failed to fetch home page data on server:", err);
    return {
      settings: {},
      projects: [],
      testimonials: [],
      pricing: [],
      services: [],
      stats: [],
    };
  }
}

export default async function Home() {
  const { settings, projects, testimonials, pricing, services, stats } = await getHomeData();

  return (
    <>
      <Navbar settings={settings} />
      <main className="flex-1">
        {settings.section_hero_enabled !== false && <Hero settings={settings} />}
        {settings.section_services_enabled !== false && <Services initialServices={services} />}
        {settings.section_projects_enabled !== false && <Projects initialProjects={projects} />}
        <Stats initialStats={stats} />
        <Process />
        {settings.section_pricing_enabled !== false && <Pricing initialPlans={pricing} />}
        {settings.section_testimonials_enabled !== false && <Testimonials initialTestimonials={testimonials} />}
        <ContactForm />
      </main>
      <Footer settings={settings} />
    </>
  );
}

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

const defaultServices = [
  {
    id: 1,
    title: 'Web Development',
    description: 'We build modern, fast & responsive websites that convert visitors into customers.',
    icon: 'Code',
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

const defaultProjects = [
  {
    id: 1,
    title: 'E-Commerce Website',
    description: 'Next-generation luxury e-commerce platform with head-turning 3D transitions and blazing fast edge rendering.',
    image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80',
    category: 'Web Development',
    tags: ['Next.js', 'Tailwind', 'Laravel'],
    demo_link: '#',
    slug: 'ecommerce-website',
    is_featured: true,
  },
  {
    id: 4,
    title: 'Restaurant Website',
    description: 'Delightful food ordering website with a customized checkout page, mobile responsive design, and smooth GSAP layout reveals.',
    image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    category: 'Web Development',
    tags: ['Next.js', 'Tailwind', 'Framer'],
    demo_link: '#',
    slug: 'restaurant-website',
    is_featured: false,
  },
];

const defaultTestimonials = [
  {
    id: 1,
    name: 'Rahul Sharma',
    role: 'CEO',
    company: 'TechNove',
    review: 'Maan Creatix delivered a fantastic website that exceeded our expectations. Highly professional and on-time delivery!',
    rating: 5,
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
  },
  {
    id: 2,
    name: 'Priya Verma',
    role: 'Marketing Head',
    company: 'Aura Brand',
    review: 'The designs were creative, modern and exactly what our brand needed. Great experience!',
    rating: 5,
    image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
  },
  {
    id: 3,
    name: 'Vikram Singh',
    role: 'Founder',
    company: 'Foodies Hub',
    review: 'Their software solution helped us manage our business efficiently. Excellent work and support!',
    rating: 5,
    image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80',
  },
];

const defaultPricing = [
  {
    id: 1,
    name: 'Starter Plan',
    subtitle: 'Perfect for small projects & startups',
    price: '4,999',
    billing_period: '/month',
    features: ['5 Pages Website', 'Responsive Design', 'Basic SEO', '1 Month Support'],
    is_popular: false,
  },
  {
    id: 2,
    name: 'Professional Plan',
    subtitle: 'Best for growing businesses',
    price: '9,999',
    billing_period: '/month',
    features: ['15 Pages Website', 'Responsive Design', 'Advanced SEO & Schema', 'Custom Animations', '3 Months Support', 'Admin Panel Integration'],
    is_popular: true,
  },
  {
    id: 3,
    name: 'Enterprise Plan',
    subtitle: 'For advanced requirements',
    price: '19,999+',
    billing_period: '/month',
    features: ['Unlimited Pages', 'E-commerce Integration', 'Bespoke Database & API', '6 Months Support', '24/7 Priority Support', 'Dedicated Project Manager'],
    is_popular: false,
  },
];

const defaultStats = [
  { id: 1, label: 'Happy Clients', value: '150+', icon: 'Users' },
  { id: 2, label: 'Projects Completed', value: '250+', icon: 'Briefcase' },
  { id: 3, label: 'Years Experience', value: '4+', icon: 'Calendar' },
  { id: 4, label: 'Client Satisfaction', value: '99%', icon: 'Award' },
];

async function getHomeData() {
  return {
    settings: {
      site_name: "Maan Creatix",
      hero_badge: "WELCOME TO MAAN CREATIX",
      hero_title: "We Build Digital Experiences That Grow Brands",
      hero_description: "Maan Creatix is your all-in-one digital partner for web development, graphic design & custom software solutions.",
      hero_button_primary_text: "Start Your Project",
      hero_button_secondary_text: "Explore Projects",
      section_hero_enabled: true,
      section_services_enabled: true,
      section_projects_enabled: true,
      section_pricing_enabled: true,
      section_testimonials_enabled: true,
      section_cta_enabled: true,
    },
    projects: defaultProjects,
    testimonials: defaultTestimonials,
    pricing: defaultPricing,
    services: defaultServices,
    stats: defaultStats,
  };
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

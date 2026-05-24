'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiGrid, 
  FiBriefcase, 
  FiLayers, 
  FiDollarSign, 
  FiMail, 
  FiMessageSquare, 
  FiBookOpen, 
  FiUploadCloud, 
  FiSliders, 
  FiGlobe, 
  FiUsers, 
  FiLogOut,
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiCheck, 
  FiX, 
  FiCopy, 
  FiEye,
  FiUserPlus,
  FiMenu
} from 'react-icons/fi';

type TabType = 
  | 'overview' 
  | 'content' 
  | 'projects' 
  | 'services' 
  | 'pricing' 
  | 'submissions' 
  | 'testimonials' 
  | 'blogs' 
  | 'media' 
  | 'theme' 
  | 'seo' 
  | 'admins';

export default function AdminDashboardPage() {
  const { admin, token, logout, loading: authLoading } = useAdminAuth();
  const router = useRouter();

  // Navigation state
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // CMS Database states
  const [stats, setStats] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [pricingPlans, setPricingPlans] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [admins, setAdmins] = useState<any[]>([]);
  
  // Submissions lists
  const [submissions, setSubmissions] = useState<any>({
    contacts: [],
    meetings: [],
    subscribers: [],
    comments: []
  });
  const [submissionTab, setSubmissionTab] = useState<'contacts' | 'meetings' | 'subscribers' | 'comments'>('contacts');

  // Website Settings CMS key-value state
  const [settings, setSettings] = useState<any>({});
  const [settingsInput, setSettingsInput] = useState<any>({});

  const [loadingData, setLoadingData] = useState(true);

  // Uploaded media history session
  const [uploadedMedia, setUploadedMedia] = useState<string[]>([]);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Modal forms states
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<string | null>(null); // 'project' | 'service' | 'pricing' | 'testimonial' | 'blog' | 'admin'

  // Form templates
  const [projectForm, setProjectForm] = useState({
    title: '', slug: '', description: '', case_study: '', image_url: '',
    category: 'Web Design', tags: '', demo_link: '', client: '', duration: '',
    completion_date: '', is_featured: false, service_id: '', category_id: ''
  });

  const [serviceForm, setServiceForm] = useState({
    title: '', slug: '', description: '', icon: 'Code', glow_color: 'blue',
    image: '', hero_title: '', hero_description: '', features: '', seo_title: '',
    seo_description: '', link: ''
  });

  const [pricingForm, setPricingForm] = useState({
    name: '', subtitle: '', price: '', billing_period: '/project',
    features: '', is_popular: false, service_id: ''
  });

  const [testimonialForm, setTestimonialForm] = useState({
    name: '', role: '', company: '', review: '', rating: 5, image_url: ''
  });

  const [blogForm, setBlogForm] = useState({
    title: '', slug: '', content: '', image_url: '', category: 'Web Development',
    author: 'Maan Creatix Team', read_time: '5 min read'
  });

  const [adminForm, setAdminForm] = useState({
    name: '', email: '', password: ''
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !admin) {
      router.replace('/admin/login');
    }
  }, [admin, authLoading, router]);

  // Load resource details whenever active tab changes
  useEffect(() => {
    if (token) {
      fetchTabResources();
    }
  }, [token, activeTab]);

  const fetchTabResources = async () => {
    if (!token) return;
    try {
      setLoadingData(true);
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      };

      // Load overview stats
      const statsRes = await fetch('http://127.0.0.1:8000/api/admin/dashboard', { headers });
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.stats);
      }

      if (activeTab === 'overview') {
        // Stats calls already loaded it
      } else if (activeTab === 'content') {
        const res = await fetch('http://127.0.0.1:8000/api/admin/settings', { headers });
        if (res.ok) {
          const d = await res.json();
          setSettings(d.settings);
          setSettingsInput(d.settings);
        }
      } else if (activeTab === 'projects') {
        const res = await fetch('http://127.0.0.1:8000/api/admin/projects', { headers });
        if (res.ok) {
          const d = await res.json();
          setProjects(d.projects || []);
          setCategories(d.categories || []);
          setServices(d.services || []);
        }
      } else if (activeTab === 'services') {
        const res = await fetch('http://127.0.0.1:8000/api/admin/services', { headers });
        if (res.ok) {
          const d = await res.json();
          setServices(d.services || []);
        }
      } else if (activeTab === 'pricing') {
        const res = await fetch('http://127.0.0.1:8000/api/admin/pricing', { headers });
        if (res.ok) {
          const d = await res.json();
          setPricingPlans(d.plans || []);
          setServices(d.services || []);
        }
      } else if (activeTab === 'submissions') {
        const res = await fetch('http://127.0.0.1:8000/api/admin/submissions', { headers });
        if (res.ok) {
          const d = await res.json();
          setSubmissions(d.submissions || { contacts: [], meetings: [], subscribers: [], comments: [] });
        }
      } else if (activeTab === 'testimonials') {
        const res = await fetch('http://127.0.0.1:8000/api/admin/testimonials', { headers });
        if (res.ok) {
          const d = await res.json();
          setTestimonials(d.testimonials || []);
        }
      } else if (activeTab === 'blogs') {
        const res = await fetch('http://127.0.0.1:8000/api/admin/blogs', { headers });
        if (res.ok) {
          const d = await res.json();
          setBlogs(d.blogs || []);
        }
      } else if (activeTab === 'theme' || activeTab === 'seo') {
        const res = await fetch('http://127.0.0.1:8000/api/admin/settings', { headers });
        if (res.ok) {
          const d = await res.json();
          setSettings(d.settings);
          setSettingsInput(d.settings);
        }
      } else if (activeTab === 'admins') {
        const res = await fetch('http://127.0.0.1:8000/api/admin/users', { headers });
        if (res.ok) {
          const d = await res.json();
          setAdmins(d.users || []);
        }
      }
    } catch (err) {
      console.error('Failed to load CMS resource parameters', err);
    } finally {
      setLoadingData(false);
    }
  };

  // Helper copy to clipboard
  const copyPath = (path: string) => {
    navigator.clipboard.writeText(path);
    alert('Public asset URL path copied: ' + path);
  };

  // Media file uploader logic
  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !selectedFile) return;
    try {
      setUploadingFile(true);
      const formData = new FormData();
      formData.append('file', selectedFile);

      const res = await fetch('http://127.0.0.1:8000/api/admin/media/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setUploadedMedia(prev => [data.url, ...prev]);
        setSelectedFile(null);
        alert('File uploaded successfully!');
      } else {
        alert('Upload failed. Image formats only under 10MB.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploadingFile(false);
    }
  };

  // Settings CMS updates
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const res = await fetch('http://127.0.0.1:8000/api/admin/settings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ settings: settingsInput }),
      });

      if (res.ok) {
        fetchTabResources();
        alert('Site content settings updated globally!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Projects CRM logic
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    const isEdit = currentEditId !== null;
    const url = isEdit ? `http://127.0.0.1:8000/api/admin/projects/${currentEditId}` : 'http://127.0.0.1:8000/api/admin/projects';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const payload = {
        ...projectForm,
        tags: projectForm.tags.split(',').map(t => t.trim()).filter(Boolean),
        is_featured: !!projectForm.is_featured,
        service_id: projectForm.service_id || null,
        category_id: projectForm.category_id || null,
      };

      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowModal(null);
        setCurrentEditId(null);
        setProjectForm({
          title: '', slug: '', description: '', case_study: '', image_url: '',
          category: 'Web Design', tags: '', demo_link: '', client: '', duration: '',
          completion_date: '', is_featured: false, service_id: '', category_id: ''
        });
        fetchTabResources();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!token || !confirm('Are you sure you want to delete this project?')) return;
    try {
      await fetch(`http://127.0.0.1:8000/api/admin/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchTabResources();
    } catch (err) {
      console.error(err);
    }
  };

  // Services CRM logic
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    const isEdit = currentEditId !== null;
    const url = isEdit ? `http://127.0.0.1:8000/api/admin/services/${currentEditId}` : 'http://127.0.0.1:8000/api/admin/services';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const payload = {
        ...serviceForm,
        features: serviceForm.features.split('\n').map(l => {
          const [t, d] = l.split(':');
          return { title: (t || '').trim(), description: (d || '').trim(), icon: 'Activity' };
        }).filter(f => f.title)
      };

      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowModal(null);
        setCurrentEditId(null);
        setServiceForm({
          title: '', slug: '', description: '', icon: 'Code', glow_color: 'blue',
          image: '', hero_title: '', hero_description: '', features: '', seo_title: '',
          seo_description: '', link: ''
        });
        fetchTabResources();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteService = async (id: number) => {
    if (!token || !confirm('Are you sure you want to remove this service sheet?')) return;
    try {
      await fetch(`http://127.0.0.1:8000/api/admin/services/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchTabResources();
    } catch (err) {
      console.error(err);
    }
  };

  // Pricing Plan CRUD logic
  const handleSavePricing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    const isEdit = currentEditId !== null;
    const url = isEdit ? `http://127.0.0.1:8000/api/admin/pricing/${currentEditId}` : 'http://127.0.0.1:8000/api/admin/pricing';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const payload = {
        ...pricingForm,
        features: pricingForm.features.split(',').map(f => f.trim()).filter(Boolean),
        is_popular: !!pricingForm.is_popular,
        service_id: pricingForm.service_id || null
      };

      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowModal(null);
        setCurrentEditId(null);
        setPricingForm({
          name: '', subtitle: '', price: '', billing_period: '/project',
          features: '', is_popular: false, service_id: ''
        });
        fetchTabResources();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePricing = async (id: number) => {
    if (!token || !confirm('Delete this pricing plan?')) return;
    try {
      await fetch(`http://127.0.0.1:8000/api/admin/pricing/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchTabResources();
    } catch (err) {
      console.error(err);
    }
  };

  // Testimonial CRUD logic
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    const isEdit = currentEditId !== null;
    const url = isEdit ? `http://127.0.0.1:8000/api/admin/testimonials/${currentEditId}` : 'http://127.0.0.1:8000/api/admin/testimonials';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(testimonialForm),
      });

      if (res.ok) {
        setShowModal(null);
        setCurrentEditId(null);
        setTestimonialForm({ name: '', role: '', company: '', review: '', rating: 5, image_url: '' });
        fetchTabResources();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTestimonial = async (id: number) => {
    if (!token || !confirm('Delete this client review?')) return;
    try {
      await fetch(`http://127.0.0.1:8000/api/admin/testimonials/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchTabResources();
    } catch (err) {
      console.error(err);
    }
  };

  // Blog CRUD logic
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    const isEdit = currentEditId !== null;
    const url = isEdit ? `http://127.0.0.1:8000/api/admin/blogs/${currentEditId}` : 'http://127.0.0.1:8000/api/admin/blogs';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const data = { ...blogForm };
      if (!data.slug) {
        delete (data as any).slug;
      }
      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setShowModal(null);
        setCurrentEditId(null);
        setBlogForm({
          title: '', slug: '', content: '', image_url: '', category: 'Web Development',
          author: 'Maan Creatix Team', read_time: '5 min read'
        });
        fetchTabResources();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBlog = async (id: number) => {
    if (!token || !confirm('Delete this blog post?')) return;
    try {
      await fetch(`http://127.0.0.1:8000/api/admin/blogs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchTabResources();
    } catch (err) {
      console.error(err);
    }
  };

  // Admin CRUD logic
  const handleSaveAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    const isEdit = currentEditId !== null;
    const url = isEdit ? `http://127.0.0.1:8000/api/admin/users/${currentEditId}` : 'http://127.0.0.1:8000/api/admin/users';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(adminForm),
      });

      if (res.ok) {
        setShowModal(null);
        setCurrentEditId(null);
        setAdminForm({ name: '', email: '', password: '' });
        fetchTabResources();
      } else {
        const errors = await res.json();
        alert('Validation error: ' + JSON.stringify(errors.errors));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAdmin = async (id: number) => {
    if (!token || !confirm('Are you sure you want to remove this admin?')) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchTabResources();
      } else {
        const error = await res.json();
        alert(error.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Submissions
  const handleDeleteSubmission = async (type: string, id: number) => {
    if (!token || !confirm('Permanently delete this submission from log?')) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/admin/submissions/${type}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchTabResources();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (authLoading || !admin) {
    return (
      <div className="bg-[#050816] text-white min-h-screen flex items-center justify-center flex-col space-y-4">
        <div className="w-12 h-12 border-t-2 border-blue-500 rounded-full animate-spin" />
        <span className="text-xs font-semibold text-slate-500 tracking-wider">Verifying Admin Session...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-[#f8fafc] flex flex-col md:flex-row relative overflow-hidden font-sans admin-dashboard-container">
      {/* Background ambient glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Mobile Toggle bar */}
      <div className="md:hidden w-full bg-[#0b0f19] border-b border-white/5 p-4 flex items-center justify-between relative z-30">
        <span className="text-sm font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Maan Creatix</span>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 border border-white/10 rounded-lg text-slate-300">
          <FiMenu className="w-4 h-4" />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 w-64 border-r border-white/5 bg-[#0b0f19]/90 backdrop-blur-md flex flex-col justify-between shrink-0 z-20 transition-transform duration-300 md:translate-x-0 md:static ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="overflow-y-auto flex-1">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Maan Creatix
              </span>
              <span className="block text-[9px] text-slate-500 tracking-widest font-bold uppercase mt-1">CMS Control Hub</span>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(false)} 
              className="md:hidden p-1.5 border border-white/10 hover:border-white/20 rounded-lg text-slate-400 hover:text-white"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>

          <nav className="p-4 space-y-1">
            {[
              { id: 'overview', name: 'Overview', icon: FiGrid },
              { id: 'content', name: 'Web Content', icon: FiLayers },
              { id: 'projects', name: 'Projects CMS', icon: FiBriefcase },
              { id: 'services', name: 'Services CMS', icon: FiSliders },
              { id: 'pricing', name: 'Pricing Tiers', icon: FiDollarSign },
              { id: 'submissions', name: 'Submissions Log', icon: FiMail },
              { id: 'testimonials', name: 'Client Reviews', icon: FiMessageSquare },
              { id: 'blogs', name: 'Blog Posts', icon: FiBookOpen },
              { id: 'media', name: 'Media Vault', icon: FiUploadCloud },
              { id: 'theme', name: 'Theme Settings', icon: FiSliders },
              { id: 'seo', name: 'SEO Metadata', icon: FiGlobe },
              { id: 'admins', name: 'Admin Staff', icon: FiUsers },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as TabType);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-2.5 rounded-xl transition-all text-xs font-semibold ${
                    activeTab === tab.id 
                      ? 'bg-blue-500/10 border-l-4 border-blue-500 text-blue-400 font-bold' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-white/5 bg-slate-950/20 flex items-center justify-between">
          <div className="text-left">
            <span className="block text-xs font-bold text-slate-200 truncate w-36">{admin.name}</span>
            <span className="block text-[9px] text-slate-500">Global Admin</span>
          </div>
          <button 
            onClick={logout} 
            className="p-2 bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-white text-red-400 rounded-lg transition-all"
            title="Log Out"
          >
            <FiLogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 flex flex-col justify-start relative z-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {/* Upper Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-8">
          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'content' && 'Website Content Management'}
              {activeTab === 'projects' && 'Projects CMS Manager'}
              {activeTab === 'services' && 'Services Sheets Control'}
              {activeTab === 'pricing' && 'Pricing Plan Configs'}
              {activeTab === 'submissions' && 'Contact Inquiries & Submissions'}
              {activeTab === 'testimonials' && 'Client Testimonial Reviews'}
              {activeTab === 'blogs' && 'Blog Article CMS'}
              {activeTab === 'media' && 'Media Assets Upload Vault'}
              {activeTab === 'theme' && 'Branding & Theme Customization'}
              {activeTab === 'seo' && 'Search Engine Optimization (SEO)'}
              {activeTab === 'admins' && 'Administrator User Management'}
            </h2>
            <p className="text-xs text-slate-500 font-light mt-0.5">Control panel database actions.</p>
          </div>
        </div>

        {/* Tab content wrapper */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="w-full flex-1"
          >
            {loadingData && activeTab !== 'media' ? (
              <div className="flex items-center justify-center py-20 space-x-3 text-xs text-slate-400 font-medium">
                <div className="w-4 h-4 border-t-2 border-blue-500 rounded-full animate-spin" />
                <span>Loading CMS Parameters...</span>
              </div>
            ) : (
              <>
                {/* 1. OVERVIEW TAB */}
                {activeTab === 'overview' && (
                  <div className="space-y-8 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { title: 'Total Projects', count: stats?.total_projects ?? 0, icon: FiBriefcase, color: 'bg-blue-500/10 border-blue-500/20 text-blue-400' },
                        { title: 'Total Services', count: stats?.total_services ?? 0, icon: FiLayers, color: 'bg-purple-500/10 border-purple-500/20 text-purple-400' },
                        { title: 'Client Reviews', count: stats?.total_testimonials ?? 0, icon: FiMessageSquare, color: 'bg-orange-500/10 border-orange-500/20 text-orange-400' },
                        { title: 'Contact Submissions', count: stats?.total_submissions ?? 0, icon: FiMail, color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' },
                      ].map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <div key={idx} className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-6 flex items-center justify-between">
                            <div className="space-y-1">
                              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">{item.title}</span>
                              <h3 className="text-3xl font-extrabold text-white">{item.count}</h3>
                            </div>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${item.color}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      <div className="lg:col-span-12 bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-6 space-y-4">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Recent Contact Inquiries</h4>
                        <div className="space-y-3.5">
                          {stats?.recent_submissions && stats.recent_submissions.length > 0 ? (
                            stats.recent_submissions.map((sub: any) => (
                              <div key={sub.id} className="p-4 bg-white/[0.01] border border-white/5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="space-y-1 text-left">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs font-bold text-white">{sub.name}</span>
                                    <span className="text-[9px] px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 font-bold border border-blue-500/20">{sub.submission_type}</span>
                                  </div>
                                  <span className="text-[10px] text-slate-500 block">{sub.email} • {sub.phone || 'No phone'}</span>
                                  <p className="text-xs text-slate-300 font-light mt-1.5">{sub.message}</p>
                                </div>
                                <span className="text-[10px] text-slate-500 font-mono self-end sm:self-center">{new Date(sub.created_at).toLocaleDateString()}</span>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-10 text-xs text-slate-500">No recent submissions found.</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. WEBSITE CONTENT MANAGEMENT */}
                {activeTab === 'content' && (
                  <div className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-6 max-w-3xl text-left">
                    <h4 className="text-sm font-bold text-white pb-3 border-b border-white/5 mb-6 uppercase tracking-wider">Homepage & Sections CMS</h4>
                    <form onSubmit={handleSaveSettings} className="space-y-5">
                      {[
                        { key: 'hero_badge', label: 'Hero Badge Headline', type: 'text' },
                        { key: 'hero_title', label: 'Hero Section Title', type: 'text' },
                        { key: 'hero_description', label: 'Hero Description Text', type: 'textarea' },
                        { key: 'hero_button_primary_text', label: 'Hero Primary Button Label', type: 'text' },
                        { key: 'hero_button_secondary_text', label: 'Hero Secondary Button Label', type: 'text' },
                        { key: 'services_badge', label: 'Services Section Badge', type: 'text' },
                        { key: 'services_title', label: 'Services Title Headline', type: 'text' },
                        { key: 'services_description', label: 'Services Section Description', type: 'textarea' },
                        { key: 'pricing_badge', label: 'Pricing Section Badge', type: 'text' },
                        { key: 'pricing_title', label: 'Pricing Title Headline', type: 'text' },
                        { key: 'pricing_description', label: 'Pricing Section Description', type: 'textarea' },
                      ].map(field => (
                        <div key={field.key} className="space-y-1.5">
                          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{field.label}</label>
                          {field.type === 'textarea' ? (
                            <textarea 
                              value={settingsInput[field.key] || ''} 
                              onChange={e => setSettingsInput((prev: any) => ({ ...prev, [field.key]: e.target.value }))}
                              rows={3}
                              className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white resize-none"
                            />
                          ) : (
                            <input 
                              type="text" 
                              value={settingsInput[field.key] || ''} 
                              onChange={e => setSettingsInput((prev: any) => ({ ...prev, [field.key]: e.target.value }))}
                              className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white"
                            />
                          )}
                        </div>
                      ))}
                      <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-blue-500/10 cursor-pointer">
                        Update Section Content
                      </button>
                    </form>
                  </div>
                )}

                {/* 3. PROJECTS MANAGEMENT */}
                {activeTab === 'projects' && (
                  <div className="space-y-6 text-left">
                    <div className="flex justify-end">
                      <button 
                        onClick={() => {
                          setCurrentEditId(null);
                          setProjectForm({
                            title: '', slug: '', description: '', case_study: '', image_url: '',
                            category: 'Web Design', tags: '', demo_link: '', client: '', duration: '',
                            completion_date: '', is_featured: false, service_id: services[0]?.id?.toString() || '',
                            category_id: categories[0]?.id?.toString() || ''
                          });
                          setShowModal('project');
                        }}
                        className="flex items-center px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        <FiPlus className="w-4 h-4 mr-2" /> Create Project
                      </button>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-white/5 bg-slate-950/20 text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
                              <th className="p-4">Project Details</th>
                              <th className="p-4">Category</th>
                              <th className="p-4">Client</th>
                              <th className="p-4">Featured</th>
                              <th className="p-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-xs">
                            {projects.map(p => (
                              <tr key={p.id} className="hover:bg-white/[0.01]">
                                <td className="p-4">
                                  <div className="flex items-center space-x-3">
                                    <img src={p.image_url} alt={p.title} className="w-10 h-10 object-cover rounded-lg border border-white/5" />
                                    <div>
                                      <span className="font-bold text-white block">{p.title}</span>
                                      <span className="text-[10px] text-slate-500 block">slug: {p.slug}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4 text-slate-300">{p.category}</td>
                                <td className="p-4 text-slate-300">{p.client || 'Internal'}</td>
                                <td className="p-4">
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                    p.is_featured ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'bg-slate-800 text-slate-400'
                                  }`}>{p.is_featured ? 'Featured' : 'Regular'}</span>
                                </td>
                                <td className="p-4 text-right space-x-2">
                                  <button 
                                    onClick={() => {
                                      setCurrentEditId(p.id);
                                      setProjectForm({
                                        title: p.title || '',
                                        slug: p.slug || '',
                                        description: p.description || '',
                                        case_study: p.case_study || '',
                                        image_url: p.image_url || '',
                                        category: p.category || 'Web Design',
                                        tags: Array.isArray(p.tags) ? p.tags.join(', ') : '',
                                        demo_link: p.demo_link || '',
                                        client: p.client || '',
                                        duration: p.duration || '',
                                        completion_date: p.completion_date || '',
                                        is_featured: !!p.is_featured,
                                        service_id: p.service_id?.toString() || '',
                                        category_id: p.category_id?.toString() || ''
                                      });
                                      setShowModal('project');
                                    }}
                                    className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg transition-colors cursor-pointer"
                                  >
                                    <FiEdit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteProject(p.id)}
                                    className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors cursor-pointer"
                                  >
                                    <FiTrash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. SERVICES MANAGEMENT */}
                {activeTab === 'services' && (
                  <div className="space-y-6 text-left">
                    <div className="flex justify-end">
                      <button 
                        onClick={() => {
                          setCurrentEditId(null);
                          setServiceForm({
                            title: '', slug: '', description: '', icon: 'Code', glow_color: 'blue',
                            image: '', hero_title: '', hero_description: '', features: '', seo_title: '',
                            seo_description: '', link: ''
                          });
                          setShowModal('service');
                        }}
                        className="flex items-center px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        <FiPlus className="w-4 h-4 mr-2" /> Add Service Card
                      </button>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-white/5 bg-slate-950/20 text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
                              <th className="p-4">Title</th>
                              <th className="p-4">Icon Name</th>
                              <th className="p-4">Glow Tint</th>
                              <th className="p-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-xs">
                            {services.map(s => (
                              <tr key={s.id} className="hover:bg-white/[0.01]">
                                <td className="p-4 text-white font-bold">{s.title}</td>
                                <td className="p-4 text-slate-300 font-mono">{s.icon}</td>
                                <td className="p-4">
                                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-${s.glow_color}-500/10 text-${s.glow_color}-400`}>
                                    {s.glow_color}
                                  </span>
                                </td>
                                <td className="p-4 text-right space-x-2">
                                  <button 
                                    onClick={() => {
                                      setCurrentEditId(s.id);
                                      setServiceForm({
                                        title: s.title || '',
                                        slug: s.slug || '',
                                        description: s.description || '',
                                        icon: s.icon || 'Code',
                                        glow_color: s.glow_color || 'blue',
                                        image: s.image || '',
                                        hero_title: s.hero_title || '',
                                        hero_description: s.hero_description || '',
                                        features: Array.isArray(s.features) ? s.features.map((f: any) => `${f.title}: ${f.description}`).join('\n') : '',
                                        seo_title: s.seo_title || '',
                                        seo_description: s.seo_description || '',
                                        link: s.link || ''
                                      });
                                      setShowModal('service');
                                    }}
                                    className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg transition-colors cursor-pointer"
                                  >
                                    <FiEdit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteService(s.id)}
                                    className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors cursor-pointer"
                                  >
                                    <FiTrash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. PRICING PLANS */}
                {activeTab === 'pricing' && (
                  <div className="space-y-6 text-left">
                    <div className="flex justify-end">
                      <button 
                        onClick={() => {
                          setCurrentEditId(null);
                          setPricingForm({
                            name: '', subtitle: '', price: '', billing_period: '/project',
                            features: '', is_popular: false, service_id: services[0]?.id?.toString() || ''
                          });
                          setShowModal('pricing');
                        }}
                        className="flex items-center px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        <FiPlus className="w-4 h-4 mr-2" /> Add Pricing Tier
                      </button>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-white/5 bg-slate-950/20 text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
                              <th className="p-4">Plan Name</th>
                              <th className="p-4">Price</th>
                              <th className="p-4">Billing</th>
                              <th className="p-4">Highlight</th>
                              <th className="p-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-xs">
                            {pricingPlans.map(plan => (
                              <tr key={plan.id} className="hover:bg-white/[0.01]">
                                <td className="p-4 text-white font-bold">{plan.name}</td>
                                <td className="p-4 text-white font-semibold">₹{plan.price}</td>
                                <td className="p-4 text-slate-400">{plan.billing_period}</td>
                                <td className="p-4">
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                    plan.is_popular ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-slate-800 text-slate-400'
                                  }`}>{plan.is_popular ? 'Popular' : 'Standard'}</span>
                                </td>
                                <td className="p-4 text-right space-x-2">
                                  <button 
                                    onClick={() => {
                                      setCurrentEditId(plan.id);
                                      setPricingForm({
                                        name: plan.name || '',
                                        subtitle: plan.subtitle || '',
                                        price: plan.price || '',
                                        billing_period: plan.billing_period || '/project',
                                        features: Array.isArray(plan.features) ? plan.features.join(', ') : '',
                                        is_popular: !!plan.is_popular,
                                        service_id: plan.service_id?.toString() || ''
                                      });
                                      setShowModal('pricing');
                                    }}
                                    className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg transition-colors cursor-pointer"
                                  >
                                    <FiEdit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button 
                                    onClick={() => handleDeletePricing(plan.id)}
                                    className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors cursor-pointer"
                                  >
                                    <FiTrash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. CONTACT / SUBMISSIONS LOG */}
                {activeTab === 'submissions' && (
                  <div className="space-y-6 text-left">
                    <div className="flex border-b border-white/5 space-x-4">
                      {[
                        { id: 'contacts', name: 'Contact Inquiries' },
                        { id: 'meetings', name: 'Meeting Requests' },
                        { id: 'subscribers', name: 'Subscribers' },
                        { id: 'comments', name: 'Blog Comments' }
                      ].map(tab => (
                        <button
                          key={tab.id}
                          onClick={() => setSubmissionTab(tab.id as any)}
                          className={`pb-3 text-xs font-bold tracking-wider uppercase border-b-2 transition-all ${
                            submissionTab === tab.id 
                              ? 'border-blue-500 text-blue-400' 
                              : 'border-transparent text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          {tab.name}
                        </button>
                      ))}
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-4">
                      {submissionTab === 'contacts' && (
                        <div className="space-y-4">
                          {submissions.contacts.map((sub: any) => (
                            <div key={sub.id} className="p-4 bg-white/[0.01] border border-white/5 rounded-xl flex items-center justify-between gap-4">
                              <div className="space-y-1">
                                <span className="text-xs font-bold text-white">{sub.name} ({sub.email})</span>
                                <span className="block text-[10px] text-slate-500">Phone: {sub.phone || '--'} • service: {sub.service || 'General'} • Budget: {sub.budget || 'Not specified'}</span>
                                <p className="text-xs text-slate-300 font-light mt-2 bg-slate-950/20 p-2.5 rounded-lg border border-white/[0.02]">{sub.message}</p>
                              </div>
                              <button onClick={() => handleDeleteSubmission('contact', sub.id)} className="p-2 text-red-400 bg-red-500/10 hover:bg-red-500 hover:text-white rounded-lg transition-colors cursor-pointer shrink-0">
                                <FiTrash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                          {submissions.contacts.length === 0 && <p className="text-xs text-slate-500 text-center py-6">No contact messages received.</p>}
                        </div>
                      )}

                      {submissionTab === 'meetings' && (
                        <div className="space-y-4">
                          {submissions.meetings.map((sub: any) => (
                            <div key={sub.id} className="p-4 bg-white/[0.01] border border-white/5 rounded-xl flex items-center justify-between gap-4">
                              <div className="space-y-1">
                                <span className="text-xs font-bold text-white">{sub.name} ({sub.email})</span>
                                <span className="block text-[10px] text-slate-500">Phone: {sub.phone} • service: {sub.service}</span>
                                <span className="block text-[10px] text-purple-400 font-mono mt-1 font-bold">Preferred Time: {sub.preferred_date} @ {sub.preferred_time}</span>
                                {sub.message && <p className="text-xs text-slate-300 font-light mt-1 bg-slate-950/20 p-2 rounded-lg border border-white/[0.02]">{sub.message}</p>}
                              </div>
                              <button onClick={() => handleDeleteSubmission('meeting', sub.id)} className="p-2 text-red-400 bg-red-500/10 hover:bg-red-500 hover:text-white rounded-lg transition-colors cursor-pointer shrink-0">
                                <FiTrash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                          {submissions.meetings.length === 0 && <p className="text-xs text-slate-500 text-center py-6">No meeting requests scheduled.</p>}
                        </div>
                      )}

                      {submissionTab === 'subscribers' && (
                        <div className="space-y-2">
                          {submissions.subscribers.map((sub: any) => (
                            <div key={sub.id} className="p-3 bg-white/[0.01] border border-white/5 rounded-xl flex items-center justify-between gap-4">
                              <span className="text-xs text-slate-200 font-mono font-bold">{sub.email}</span>
                              <button onClick={() => handleDeleteSubmission('subscriber', sub.id)} className="p-1.5 text-red-400 bg-red-500/10 hover:bg-red-500 hover:text-white rounded-lg transition-colors cursor-pointer shrink-0">
                                <FiTrash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                          {submissions.subscribers.length === 0 && <p className="text-xs text-slate-500 text-center py-6">No newsletter subscribers.</p>}
                        </div>
                      )}

                      {submissionTab === 'comments' && (
                        <div className="space-y-4">
                          {submissions.comments.map((sub: any) => (
                            <div key={sub.id} className="p-4 bg-white/[0.01] border border-white/5 rounded-xl flex items-center justify-between gap-4">
                              <div className="space-y-1">
                                <span className="text-xs font-bold text-white">{sub.name} ({sub.email})</span>
                                <span className="block text-[10px] text-slate-500">Post: "{sub.blog?.title}"</span>
                                <p className="text-xs text-slate-300 font-light mt-1.5">{sub.content}</p>
                              </div>
                              <button onClick={() => handleDeleteSubmission('comment', sub.id)} className="p-2 text-red-400 bg-red-500/10 hover:bg-red-500 hover:text-white rounded-lg transition-colors cursor-pointer shrink-0">
                                <FiTrash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                          {submissions.comments.length === 0 && <p className="text-xs text-slate-500 text-center py-6">No blog comments posted.</p>}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 7. TESTIMONIALS */}
                {activeTab === 'testimonials' && (
                  <div className="space-y-6 text-left">
                    <div className="flex justify-end">
                      <button 
                        onClick={() => {
                          setCurrentEditId(null);
                          setTestimonialForm({ name: '', role: '', company: '', review: '', rating: 5, image_url: '' });
                          setShowModal('testimonial');
                        }}
                        className="flex items-center px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        <FiPlus className="w-4 h-4 mr-2" /> Add Client Review
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {testimonials.map(t => (
                        <div key={t.id} className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-5 flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                              {t.image_url && <img src={t.image_url} alt={t.name} className="w-10 h-10 object-cover rounded-full border border-white/5" />}
                              <div>
                                <span className="font-bold text-white block text-sm">{t.name}</span>
                                <span className="text-[10px] text-slate-500 block">{t.role} @ {t.company}</span>
                              </div>
                            </div>
                            <p className="text-xs text-slate-300 font-light italic leading-relaxed">"{t.review}"</p>
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t border-white/5">
                            <span className="text-[10px] font-bold text-orange-400">Rating: {'★'.repeat(t.rating)}</span>
                            <div className="flex space-x-1">
                              <button 
                                onClick={() => {
                                  setCurrentEditId(t.id);
                                  setTestimonialForm({
                                    name: t.name || '',
                                    role: t.role || '',
                                    company: t.company || '',
                                    review: t.review || '',
                                    rating: t.rating ?? 5,
                                    image_url: t.image_url || ''
                                  });
                                  setShowModal('testimonial');
                                }}
                                className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors cursor-pointer"
                              >
                                <FiEdit2 className="w-3.5 h-3.5" />
                              </button>
                              <button onClick={() => handleDeleteTestimonial(t.id)} className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer">
                                <FiTrash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 8. BLOG POSTS */}
                {activeTab === 'blogs' && (
                  <div className="space-y-6 text-left">
                    <div className="flex justify-end">
                      <button 
                        onClick={() => {
                          setCurrentEditId(null);
                          setBlogForm({
                            title: '', slug: '', content: '', image_url: '', category: 'Web Development',
                            author: 'Maan Creatix Team', read_time: '5 min read'
                          });
                          setShowModal('blog');
                        }}
                        className="flex items-center px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        <FiPlus className="w-4 h-4 mr-2" /> Write Article
                      </button>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-white/5 bg-slate-950/20 text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
                              <th className="p-4">Post Title</th>
                              <th className="p-4">Category</th>
                              <th className="p-4">Author</th>
                              <th className="p-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-xs">
                            {blogs.map(b => (
                              <tr key={b.id} className="hover:bg-white/[0.01]">
                                <td className="p-4 text-white font-bold">{b.title}</td>
                                <td className="p-4 text-slate-300">{b.category}</td>
                                <td className="p-4 text-slate-400">{b.author}</td>
                                <td className="p-4 text-right space-x-2">
                                  <button 
                                    onClick={() => {
                                      setCurrentEditId(b.id);
                                      setBlogForm({
                                        title: b.title || '',
                                        slug: b.slug || '',
                                        content: b.content || '',
                                        image_url: b.image_url || '',
                                        category: b.category || 'Web Development',
                                        author: b.author || 'Maan Creatix Team',
                                        read_time: b.read_time || '5 min read'
                                      });
                                      setShowModal('blog');
                                    }}
                                    className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg transition-colors cursor-pointer"
                                  >
                                    <FiEdit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteBlog(b.id)}
                                    className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors cursor-pointer"
                                  >
                                    <FiTrash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* 9. MEDIA UPLOADS VAULT */}
                {activeTab === 'media' && (
                  <div className="space-y-6 text-left max-w-3xl">
                    <div className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-6">
                      <h4 className="text-sm font-bold text-white pb-3 border-b border-white/5 mb-4 uppercase tracking-wider">Upload New Image Asset</h4>
                      <form onSubmit={handleFileUpload} className="space-y-4">
                        <div className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center space-y-3 hover:border-blue-500/30 transition-colors">
                          <FiUploadCloud className="w-8 h-8 text-slate-500" />
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={e => setSelectedFile(e.target.files?.[0] || null)}
                            className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-500/10 file:text-blue-400 hover:file:bg-blue-500/20 cursor-pointer"
                          />
                          {selectedFile && <span className="text-[10px] text-emerald-400 block font-bold">{selectedFile.name} ({(selectedFile.size/1024/1024).toFixed(2)} MB)</span>}
                        </div>
                        <button 
                          type="submit" 
                          disabled={uploadingFile || !selectedFile}
                          className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/10 cursor-pointer"
                        >
                          {uploadingFile ? 'Uploading and tokenizing...' : 'Upload Image'}
                        </button>
                      </form>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-6 space-y-4">
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">Recently Uploaded Files</h4>
                      <div className="space-y-2">
                        {uploadedMedia.map((url, idx) => (
                          <div key={idx} className="p-3 bg-slate-900 border border-white/5 rounded-xl flex items-center justify-between text-xs gap-4">
                            <div className="flex items-center space-x-2 overflow-hidden">
                              <img src={`http://127.0.0.1:8000${url}`} alt="Uploaded asset" className="w-8 h-8 object-cover rounded-md border border-white/10 shrink-0" />
                              <span className="text-slate-300 font-mono truncate w-64 block">{url}</span>
                            </div>
                            <div className="flex space-x-2 shrink-0">
                              <a href={`http://127.0.0.1:8000${url}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg" title="Open File">
                                <FiEye className="w-3.5 h-3.5" />
                              </a>
                              <button onClick={() => copyPath(url)} className="p-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg cursor-pointer" title="Copy Path URL">
                                <FiCopy className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                        {uploadedMedia.length === 0 && <p className="text-xs text-slate-500 text-center py-4">No uploaded files in this session yet.</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* 10. THEME SETTINGS */}
                {activeTab === 'theme' && (
                  <div className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-6 max-w-3xl text-left">
                    <h4 className="text-sm font-bold text-white pb-3 border-b border-white/5 mb-6 uppercase tracking-wider">Site Logos & Visual parameters</h4>
                    <form onSubmit={handleSaveSettings} className="space-y-4">
                      {[
                        { key: 'site_name', label: 'Agency Name', type: 'text' },
                        { key: 'site_logo', label: 'Site Logo Path (Upload in Vault and paste URL)', type: 'text' },
                        { key: 'site_favicon', label: 'Favicon Path', type: 'text' },
                        { key: 'theme_mode', label: 'Default Theme Mode (dark / light)', type: 'text' },
                        { key: 'theme_primary_color', label: 'Primary Brand Color Hex', type: 'text' },
                        { key: 'theme_secondary_color', label: 'Secondary Color Hex', type: 'text' },
                        { key: 'footer_copyright', label: 'Footer Copyright Notice', type: 'text' },
                        { key: 'contact_email', label: 'Contact Email Address', type: 'text' },
                        { key: 'contact_phone', label: 'Contact Phone Number', type: 'text' },
                        { key: 'contact_address', label: 'Business Location Address', type: 'text' },
                        { key: 'contact_hours', label: 'Active Studio Business Hours', type: 'text' },
                        { key: 'contact_whatsapp', label: 'WhatsApp Chat API Link', type: 'text' },
                        { key: 'social_facebook', label: 'Facebook URL Link', type: 'text' },
                        { key: 'social_instagram', label: 'Instagram URL Link', type: 'text' },
                        { key: 'social_linkedin', label: 'LinkedIn URL Link', type: 'text' },
                        { key: 'social_twitter', label: 'Twitter/X URL Link', type: 'text' },
                      ].map(field => (
                        <div key={field.key} className="space-y-1.5">
                          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{field.label}</label>
                          <input 
                            type="text" 
                            value={settingsInput[field.key] || ''} 
                            onChange={e => setSettingsInput((prev: any) => ({ ...prev, [field.key]: e.target.value }))}
                            className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white"
                          />
                        </div>
                      ))}
                      <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-blue-500/10 cursor-pointer">
                        Save Theme Configurations
                      </button>
                    </form>
                  </div>
                )}

                {/* 11. SEO SETTINGS */}
                {activeTab === 'seo' && (
                  <div className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-6 max-w-3xl text-left">
                    <h4 className="text-sm font-bold text-white pb-3 border-b border-white/5 mb-6 uppercase tracking-wider">Search Engine Index Metadata</h4>
                    <form onSubmit={handleSaveSettings} className="space-y-4">
                      {[
                        { key: 'seo_meta_title', label: 'Default SEO Title Tag', type: 'text' },
                        { key: 'seo_meta_description', label: 'SEO Meta Description', type: 'textarea' },
                        { key: 'seo_meta_keywords', label: 'Keywords (Comma Separated)', type: 'text' },
                        { key: 'analytics_scripts', label: 'Custom Head Scripts (e.g. Google Analytics)', type: 'textarea' },
                        { key: 'custom_css', label: 'Custom CSS Styles Injection', type: 'textarea' },
                        { key: 'custom_js', label: 'Custom JS Script Execution', type: 'textarea' },
                      ].map(field => (
                        <div key={field.key} className="space-y-1.5">
                          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{field.label}</label>
                          {field.type === 'textarea' ? (
                            <textarea 
                              value={settingsInput[field.key] || ''} 
                              onChange={e => setSettingsInput((prev: any) => ({ ...prev, [field.key]: e.target.value }))}
                              rows={4}
                              className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white resize-none"
                            />
                          ) : (
                            <input 
                              type="text" 
                              value={settingsInput[field.key] || ''} 
                              onChange={e => setSettingsInput((prev: any) => ({ ...prev, [field.key]: e.target.value }))}
                              className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white"
                            />
                          )}
                        </div>
                      ))}
                      <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-blue-500/10 cursor-pointer">
                        Update Global SEO Tags
                      </button>
                    </form>
                  </div>
                )}

                {/* 12. ADMIN STAFF USER MANAGEMENT */}
                {activeTab === 'admins' && (
                  <div className="space-y-6 text-left max-w-3xl">
                    <div className="flex justify-end">
                      <button 
                        onClick={() => {
                          setCurrentEditId(null);
                          setAdminForm({ name: '', email: '', password: '' });
                          setShowModal('admin');
                        }}
                        className="flex items-center px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        <FiUserPlus className="w-4 h-4 mr-2" /> Add Admin User
                      </button>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-white/5 bg-slate-950/20 text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
                              <th className="p-4">Name</th>
                              <th className="p-4">Email</th>
                              <th className="p-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-xs">
                            {admins.map(usr => (
                              <tr key={usr.id} className="hover:bg-white/[0.01]">
                                <td className="p-4 text-white font-bold">{usr.name}</td>
                                <td className="p-4 text-slate-300 font-mono">{usr.email}</td>
                                <td className="p-4 text-right space-x-2">
                                  <button 
                                    onClick={() => {
                                      setCurrentEditId(usr.id);
                                      setAdminForm({ name: usr.name || '', email: usr.email || '', password: '' });
                                      setShowModal('admin');
                                    }}
                                    className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg transition-colors cursor-pointer"
                                  >
                                    <FiEdit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteAdmin(usr.id)}
                                    className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors cursor-pointer"
                                  >
                                    <FiTrash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* CRM MODALS */}

      {/* 1. Project Modal */}
      {showModal === 'project' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0a0d21] border border-white/10 rounded-3xl p-6 relative shadow-2xl space-y-4 text-left my-8">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">{currentEditId ? 'Edit Project Profile' : 'Create Project'}</h3>
            <form onSubmit={handleSaveProject} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-semibold">Project Title</label>
                  <input type="text" required value={projectForm.title} onChange={e => setProjectForm(prev => ({ ...prev, title: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-semibold">Custom Slug (Optional)</label>
                  <input type="text" value={projectForm.slug} onChange={e => setProjectForm(prev => ({ ...prev, slug: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" placeholder="auto-generated-if-empty" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-semibold">Category Type</label>
                  <input type="text" required value={projectForm.category} onChange={e => setProjectForm(prev => ({ ...prev, category: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-semibold">Client Name</label>
                  <input type="text" value={projectForm.client} onChange={e => setProjectForm(prev => ({ ...prev, client: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-semibold">Duration String</label>
                  <input type="text" value={projectForm.duration} onChange={e => setProjectForm(prev => ({ ...prev, duration: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" placeholder="e.g. 6 Weeks" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-semibold">Completion Date</label>
                  <input type="date" value={projectForm.completion_date} onChange={e => setProjectForm(prev => ({ ...prev, completion_date: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-semibold">Demo URL Link</label>
                  <input type="text" value={projectForm.demo_link} onChange={e => setProjectForm(prev => ({ ...prev, demo_link: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-semibold">Link Service Sheet</label>
                  <select value={projectForm.service_id} onChange={e => setProjectForm(prev => ({ ...prev, service_id: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white">
                    <option value="">Select service...</option>
                    {services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-semibold">Link Category Relation</label>
                  <select value={projectForm.category_id} onChange={e => setProjectForm(prev => ({ ...prev, category_id: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white">
                    <option value="">Select category...</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-slate-400 uppercase font-semibold">Feature Image URL (Upload in vault and paste path)</label>
                <input type="text" required value={projectForm.image_url} onChange={e => setProjectForm(prev => ({ ...prev, image_url: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-slate-400 uppercase font-semibold">Tags (Comma Separated)</label>
                <input type="text" value={projectForm.tags} onChange={e => setProjectForm(prev => ({ ...prev, tags: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" placeholder="Next.js, Tailwind, Laravel" />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-slate-400 uppercase font-semibold">Short Description</label>
                <textarea required rows={2} value={projectForm.description} onChange={e => setProjectForm(prev => ({ ...prev, description: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white resize-none" />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-slate-400 uppercase font-semibold">Case Study Markdown Body</label>
                <textarea rows={4} value={projectForm.case_study} onChange={e => setProjectForm(prev => ({ ...prev, case_study: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white font-mono resize-none" placeholder="## Executive Summary..." />
              </div>

              <div className="flex items-center space-x-2 py-2">
                <input type="checkbox" id="proj_feat" checked={projectForm.is_featured} onChange={e => setProjectForm(prev => ({ ...prev, is_featured: e.target.checked }))} className="w-4 h-4 bg-slate-900 border border-white/5 rounded" />
                <label htmlFor="proj_feat" className="text-xs text-slate-300 uppercase font-semibold select-none cursor-pointer">Feature on homepage grid</label>
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button type="button" onClick={() => setShowModal(null)} className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg text-xs transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-blue-500/10">Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Service Modal */}
      {showModal === 'service' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0a0d21] border border-white/10 rounded-3xl p-6 relative shadow-2xl space-y-4 text-left my-8">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">{currentEditId ? 'Edit Service Sheet' : 'Add Service'}</h3>
            <form onSubmit={handleSaveService} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-semibold">Service Title</label>
                  <input type="text" required value={serviceForm.title} onChange={e => setServiceForm(prev => ({ ...prev, title: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-semibold">Unique Slug URL</label>
                  <input type="text" required value={serviceForm.slug} onChange={e => setServiceForm(prev => ({ ...prev, slug: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-semibold">Lucide Icon Name</label>
                  <input type="text" required value={serviceForm.icon} onChange={e => setServiceForm(prev => ({ ...prev, icon: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-semibold">Glow tint color</label>
                  <select value={serviceForm.glow_color} onChange={e => setServiceForm(prev => ({ ...prev, glow_color: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white">
                    <option value="blue">Blue neon glow</option>
                    <option value="purple">Purple neon glow</option>
                    <option value="orange">Orange neon glow</option>
                    <option value="emerald">Emerald neon glow</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-semibold">Link URL Path</label>
                  <input type="text" value={serviceForm.link} onChange={e => setServiceForm(prev => ({ ...prev, link: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" placeholder="e.g. /services/website-development" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-slate-400 uppercase font-semibold">Hero Title Headline (Detail Page)</label>
                <input type="text" value={serviceForm.hero_title} onChange={e => setServiceForm(prev => ({ ...prev, hero_title: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-slate-400 uppercase font-semibold">Hero Short Description</label>
                <textarea rows={2} value={serviceForm.hero_description} onChange={e => setServiceForm(prev => ({ ...prev, hero_description: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white resize-none" />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-slate-400 uppercase font-semibold">Features bullets (One title:desc per line)</label>
                <textarea rows={3} value={serviceForm.features} onChange={e => setServiceForm(prev => ({ ...prev, features: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white font-mono resize-none" placeholder="SSR: pre-rendered SEO performance&#10;Speed: load speed optimized" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-semibold">Detail Page SEO Title</label>
                  <input type="text" value={serviceForm.seo_title} onChange={e => setServiceForm(prev => ({ ...prev, seo_title: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-semibold">Detail Page SEO Description</label>
                  <input type="text" value={serviceForm.seo_description} onChange={e => setServiceForm(prev => ({ ...prev, seo_description: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-slate-400 uppercase font-semibold">Feature Image URL Path</label>
                <input type="text" value={serviceForm.image} onChange={e => setServiceForm(prev => ({ ...prev, image: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-slate-400 uppercase font-semibold">Core Description</label>
                <textarea required rows={2} value={serviceForm.description} onChange={e => setServiceForm(prev => ({ ...prev, description: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white resize-none" />
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button type="button" onClick={() => setShowModal(null)} className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg text-xs transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-blue-500/10">Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Pricing Modal */}
      {showModal === 'pricing' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0a0d21] border border-white/10 rounded-3xl p-6 relative shadow-2xl space-y-4 text-left">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">{currentEditId ? 'Edit Pricing Plan' : 'Add Pricing Plan'}</h3>
            <form onSubmit={handleSavePricing} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[9px] text-slate-400 uppercase font-semibold">Plan Name</label>
                <input type="text" required value={pricingForm.name} onChange={e => setPricingForm(prev => ({ ...prev, name: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" placeholder="e.g. Starter Plan" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] text-slate-400 uppercase font-semibold">Subtitle Description</label>
                <input type="text" value={pricingForm.subtitle} onChange={e => setPricingForm(prev => ({ ...prev, subtitle: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-semibold">Price (INR)</label>
                  <input type="text" required value={pricingForm.price} onChange={e => setPricingForm(prev => ({ ...prev, price: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" placeholder="4,999" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-semibold">Billing Frequency</label>
                  <input type="text" required value={pricingForm.billing_period} onChange={e => setPricingForm(prev => ({ ...prev, billing_period: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-slate-400 uppercase font-semibold">Features (Comma Separated)</label>
                <textarea rows={3} required value={pricingForm.features} onChange={e => setPricingForm(prev => ({ ...prev, features: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white resize-none" placeholder="5 Pages, 1 Month support, Responsive Design" />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-slate-400 uppercase font-semibold">Link Service (Optional)</label>
                <select value={pricingForm.service_id} onChange={e => setPricingForm(prev => ({ ...prev, service_id: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white">
                  <option value="">Global Pricing Page Plan</option>
                  {services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                </select>
              </div>

              <div className="flex items-center space-x-2 py-1">
                <input type="checkbox" id="price_pop" checked={pricingForm.is_popular} onChange={e => setPricingForm(prev => ({ ...prev, is_popular: e.target.checked }))} className="w-4 h-4 bg-slate-900 border border-white/5 rounded" />
                <label htmlFor="price_pop" className="text-xs text-slate-300 uppercase font-semibold cursor-pointer select-none">Mark as popular / recommended tier</label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(null)} className="px-4 py-2 bg-white/5 text-slate-400 hover:text-white rounded-lg text-xs">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold">Save Plan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Testimonial Modal */}
      {showModal === 'testimonial' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0a0d21] border border-white/10 rounded-3xl p-6 relative shadow-2xl space-y-4 text-left">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">{currentEditId ? 'Edit client review' : 'Add testimonial'}</h3>
            <form onSubmit={handleSaveTestimonial} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[9px] text-slate-400 uppercase font-semibold">Client Name</label>
                <input type="text" required value={testimonialForm.name} onChange={e => setTestimonialForm(prev => ({ ...prev, name: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-semibold">Designation / Role</label>
                  <input type="text" required value={testimonialForm.role} onChange={e => setTestimonialForm(prev => ({ ...prev, role: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" placeholder="e.g. CTO" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-semibold">Company Name</label>
                  <input type="text" required value={testimonialForm.company} onChange={e => setTestimonialForm(prev => ({ ...prev, company: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-semibold">Rating (1-5)</label>
                  <input type="number" required min={1} max={5} value={testimonialForm.rating} onChange={e => setTestimonialForm(prev => ({ ...prev, rating: parseInt(e.target.value) || 5 }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-semibold">Avatar Image URL</label>
                  <input type="text" value={testimonialForm.image_url} onChange={e => setTestimonialForm(prev => ({ ...prev, image_url: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] text-slate-400 uppercase font-semibold">Review content text</label>
                <textarea required rows={3} value={testimonialForm.review} onChange={e => setTestimonialForm(prev => ({ ...prev, review: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white resize-none" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(null)} className="px-4 py-2 bg-white/5 text-slate-400 hover:text-white rounded-lg text-xs">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold">Save Review</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Blog Modal */}
      {showModal === 'blog' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0a0d21] border border-white/10 rounded-3xl p-6 relative shadow-2xl space-y-4 text-left my-8">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">{currentEditId ? 'Edit blog post' : 'Create blog post'}</h3>
            <form onSubmit={handleSaveBlog} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-semibold">Article Title</label>
                  <input type="text" required value={blogForm.title} onChange={e => setBlogForm(prev => ({ ...prev, title: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-semibold">Post URL Slug (Optional)</label>
                  <input type="text" value={blogForm.slug} onChange={e => setBlogForm(prev => ({ ...prev, slug: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" placeholder="auto-generated-if-empty" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-semibold">Category</label>
                  <input type="text" required value={blogForm.category} onChange={e => setBlogForm(prev => ({ ...prev, category: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-semibold">Author Name</label>
                  <input type="text" required value={blogForm.author} onChange={e => setBlogForm(prev => ({ ...prev, author: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-semibold">Read Time String</label>
                  <input type="text" required value={blogForm.read_time} onChange={e => setBlogForm(prev => ({ ...prev, read_time: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" placeholder="e.g. 5 min read" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-slate-400 uppercase font-semibold">Cover Image URL (Vault path)</label>
                <input type="text" required value={blogForm.image_url} onChange={e => setBlogForm(prev => ({ ...prev, image_url: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-slate-400 uppercase font-semibold">Article Markdown Content</label>
                <textarea required rows={8} value={blogForm.content} onChange={e => setBlogForm(prev => ({ ...prev, content: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white font-mono resize-none" placeholder="# Introduction..." />
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button type="button" onClick={() => setShowModal(null)} className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg text-xs transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-blue-500/10">Publish Post</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Admin User Modal */}
      {showModal === 'admin' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0a0d21] border border-white/10 rounded-3xl p-6 relative shadow-2xl space-y-4 text-left">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">{currentEditId ? 'Edit Administrator' : 'Add Administrator'}</h3>
            <form onSubmit={handleSaveAdmin} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[9px] text-slate-400 uppercase font-semibold">Staff Name</label>
                <input type="text" required value={adminForm.name} onChange={e => setAdminForm(prev => ({ ...prev, name: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] text-slate-400 uppercase font-semibold">Email Address</label>
                <input type="email" required value={adminForm.email} onChange={e => setAdminForm(prev => ({ ...prev, email: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] text-slate-400 uppercase font-semibold">Password {currentEditId && '(Leave blank to keep current)'}</label>
                <input type="password" required={!currentEditId} value={adminForm.password} onChange={e => setAdminForm(prev => ({ ...prev, password: e.target.value }))} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2.5 text-xs text-white" />
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button type="button" onClick={() => setShowModal(null)} className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg text-xs transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all shadow-md">Save Admin</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

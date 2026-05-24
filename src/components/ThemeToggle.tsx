'use client';

import { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
      applyTheme('dark');
    }
  }, []);

  const applyTheme = (t: 'light' | 'dark') => {
    const html = document.documentElement;
    if (t === 'light') {
      html.classList.add('light');
    } else {
      html.classList.remove('light');
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="p-2 rounded-full border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-200 active:scale-95 flex items-center justify-center shrink-0"
      title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    >
      {theme === 'light' ? <FiMoon className="w-4 h-4" /> : <FiSun className="w-4 h-4" />}
    </button>
  );
}

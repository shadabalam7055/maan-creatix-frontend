'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminProfile {
  name: string;
  email: string;
}

interface AdminAuthType {
  admin: AdminProfile | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  fetchAdminProfile: (authToken: string) => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthType>({
  admin: null,
  token: null,
  loading: true,
  login: async () => ({ success: false }),
  logout: async () => {},
  fetchAdminProfile: async () => {},
});

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load token on initial render
  useEffect(() => {
    const savedToken = localStorage.getItem('admin-token');
    if (savedToken) {
      setToken(savedToken);
      fetchAdminProfile(savedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchAdminProfile = async (authToken: string) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/me', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAdmin(data.user);
      } else {
        localStorage.removeItem('admin-token');
        setToken(null);
        setAdmin(null);
      }
    } catch (err) {
      console.error('Failed to retrieve admin profile', err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('admin-token', data.token);
        setToken(data.token);
        setAdmin(data.user);
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Invalid credentials.' };
      }
    } catch (err) {
      return { success: false, message: 'Server connection failed.' };
    }
  };

  const logout = async () => {
    if (!token) return;

    try {
      await fetch('http://127.0.0.1:8000/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
    } catch (err) {
      console.error('Logout request failed', err);
    } finally {
      localStorage.removeItem('admin-token');
      setToken(null);
      setAdmin(null);
    }
  };

  return (
    <AdminAuthContext.Provider value={{ admin, token, loading, login, logout, fetchAdminProfile }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);

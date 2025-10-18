import React, { createContext, useContext, useState, useEffect } from 'react';
import * as apiAuth from '../utils/auth';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  kycStatus?: 'pending' | 'approved' | 'rejected' | 'incomplete';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  viewMode: 'user' | 'admin';
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, phone: string) => Promise<void>;
  adminLogin: (adminId: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchToUserView: () => void;
  switchToAdminView: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext(undefined as AuthContextType | undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(null as User | null);
  const [viewMode, setViewMode] = useState('user' as 'user' | 'admin');

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('kwick_user');
    const savedViewMode = localStorage.getItem('kwick_view_mode');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedViewMode) {
      setViewMode(savedViewMode as 'user' | 'admin');
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Call backend login
    const resp = await apiAuth.login({ email, password });
    if (resp && resp.token && resp.user) {
      // normalize backend user shape to local User
      const u: User = {
        id: String((resp.user as any).userId || (resp.user as any).user_id || resp.user.id || ''),
        name: (resp.user as any).name || resp.user.name || '',
        email: (resp.user as any).email || resp.user.email || email,
        phone: (resp.user as any).phone || resp.user.phone || '',
        role: 'user',
        kycStatus: (resp.user as any).kycStatus || (resp.user as any).kyc_status || 'incomplete',
      };
      setUser(u);
      localStorage.setItem('kwick_user', JSON.stringify(u));
    } else {
      throw new Error(resp?.error || 'Login failed');
    }
  };

  const signup = async (name: string, email: string, password: string, phone: string) => {
    const resp = await apiAuth.signup({ name, email, phone, password });
    if (resp && resp.token && resp.user) {
      const u: User = {
        id: String((resp.user as any).userId || (resp.user as any).user_id || resp.user.id || ''),
        name: (resp.user as any).name || resp.user.name || name,
        email: (resp.user as any).email || resp.user.email || email,
        phone: (resp.user as any).phone || resp.user.phone || phone || '',
        role: 'user',
        kycStatus: (resp.user as any).kycStatus || (resp.user as any).kyc_status || 'incomplete',
      };
      setUser(u);
      localStorage.setItem('kwick_user', JSON.stringify(u));
    } else {
      throw new Error(resp?.error || 'Signup failed');
    }
  };

  const adminLogin = async (adminId: string, password: string) => {
    // Mock admin authentication
    if (adminId === 'admin' && password === 'password') {
      const adminUser: User = {
        id: 'ADM001',
        name: 'Admin User',
        email: 'admin@kwick.local',
        phone: '+91 90000 00000',
        role: 'admin',
        kycStatus: 'approved',
      };
      setUser(adminUser);
      setViewMode('admin');
      localStorage.setItem('kwick_user', JSON.stringify(adminUser));
      localStorage.setItem('kwick_view_mode', 'admin');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setViewMode('user');
    localStorage.removeItem('kwick_user');
    localStorage.removeItem('kwick_view_mode');
  };

  const switchToUserView = () => {
    setViewMode('user');
    localStorage.setItem('kwick_view_mode', 'user');
  };

  const switchToAdminView = () => {
    if (user?.role === 'admin') {
      setViewMode('admin');
      localStorage.setItem('kwick_view_mode', 'admin');
    }
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('kwick_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        viewMode,
        login,
        adminLogin,
        signup,
        logout,
        switchToUserView,
        switchToAdminView,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

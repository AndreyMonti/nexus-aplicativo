import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { User } from '../constants/Types';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isSeller: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, type: 'buyer' | 'seller') => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const u = await authService.getCurrentUser();
        setUser(u);
        // simple rule: if email contains 'seller' mark as seller
        setIsSeller(Boolean(u && u.email && u.email.includes('seller')));
      } catch (e) {
        // ignore in static mode
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const u = await authService.login(email, password);
      setUser(u);
      setIsSeller(Boolean(u.email.includes('seller')));
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, type: 'buyer' | 'seller') => {
    setLoading(true);
    try {
      const u = await authService.register(email, password, name, type);
      setUser(u);
      setIsSeller(type === 'seller');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setIsSeller(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isSeller, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

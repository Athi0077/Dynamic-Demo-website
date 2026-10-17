/* oxlint-disable react/only-export-components */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const token = localStorage.getItem('nova_admin_token') || sessionStorage.getItem('nova_admin_token');
      // If there's no JWT token, clear any stale mock user from previous steps
      if (!token) {
        localStorage.removeItem('nova_admin_auth');
        sessionStorage.removeItem('nova_admin_auth');
        return null;
      }
      const stored = localStorage.getItem('nova_admin_auth') || sessionStorage.getItem('nova_admin_auth');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('nova_admin_auth');
    localStorage.removeItem('nova_admin_token');
    sessionStorage.removeItem('nova_admin_auth');
    sessionStorage.removeItem('nova_admin_token');
  }, []);

  // Listen for 401 logout events from API client
  useEffect(() => {
    const handleForceLogout = () => {
      logout();
    };
    window.addEventListener('nova_auth_logout', handleForceLogout);
    return () => {
      window.removeEventListener('nova_auth_logout', handleForceLogout);
    };
  }, [logout]);

  // Validate existing token with backend on mount
  useEffect(() => {
    const token = localStorage.getItem('nova_admin_token') || sessionStorage.getItem('nova_admin_token');
    if (!token) return;

    let isMounted = true;
    api.get('/auth/me')
      .then((res) => {
        if (!isMounted) return;
        if (res.success && res.data?.admin) {
          setUser(res.data.admin);
        } else if (res.status === 401) {
          logout();
        }
      })
      .catch(() => {
        // Backend offline, keep existing session if available
      });

    return () => {
      isMounted = false;
    };
  }, [logout]);

  const login = async (email, password, rememberMe = false) => {
    setLoading(true);
    setError('');

    const normalizedEmail = email.trim().toLowerCase();

    // 1. Attempt Real Backend API Authentication
    const res = await api.post('/auth/login', {
      email: normalizedEmail,
      password,
    });

    if (res.success && res.data) {
      const { token, admin } = res.data;

      const authUser = {
        id: admin.id || admin._id,
        name: admin.name || 'Alex Rivera',
        email: admin.email || normalizedEmail,
        role: admin.role || 'ADMIN',
        avatar: admin.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        loginTime: new Date().toISOString(),
      };

      setUser(authUser);
      setError('');
      setLoading(false);

      if (rememberMe) {
        localStorage.setItem('nova_admin_token', token);
        localStorage.setItem('nova_admin_auth', JSON.stringify(authUser));
      } else {
        sessionStorage.setItem('nova_admin_token', token);
        sessionStorage.setItem('nova_admin_auth', JSON.stringify(authUser));
      }

      return { success: true };
    }

    // 2. Offline Resilience Fallback
    // If backend is unreachable, gracefully fall back to local demo credentials
    if (res.isOffline) {
      const correctEmail = 'admin@nova.com';
      const correctPassword = 'Admin@123';

      if (normalizedEmail === correctEmail && password === correctPassword) {
        const mockUser = {
          id: 'demo-admin-offline',
          name: 'Alex Rivera',
          email: 'admin@nova.com',
          role: 'ADMIN',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          loginTime: new Date().toISOString(),
          isOfflineDemo: true,
        };

        setUser(mockUser);
        setError('');
        setLoading(false);

        const mockToken = 'mock-jwt-token-offline-mode';
        if (rememberMe) {
          localStorage.setItem('nova_admin_token', mockToken);
          localStorage.setItem('nova_admin_auth', JSON.stringify(mockUser));
        } else {
          sessionStorage.setItem('nova_admin_token', mockToken);
          sessionStorage.setItem('nova_admin_auth', JSON.stringify(mockUser));
        }

        return { success: true, notice: 'Logged in using offline fallback.' };
      }
    }

    // Authentication failure
    setLoading(false);
    const errorMsg = res.error || 'Invalid email or password. Please use the demo credentials.';
    setError(errorMsg);
    return { success: false, error: errorMsg };
  };

  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        setError,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

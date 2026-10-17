import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { CartProvider } from './context/CartContext';
import { WebsiteProvider } from './context/WebsiteContext';
import { ProtectedRoute } from './auth/ProtectedRoute';

// Public Page
import { Home } from './pages/Home';

// Admin Pages & Layout
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminSections } from './pages/admin/AdminSections';
import { AdminMedia } from './pages/admin/AdminMedia';
import { AdminSettings } from './pages/admin/AdminSettings';
import { WebsiteEditor } from './pages/admin/WebsiteEditor';
import { EasyEdit } from './pages/admin/EasyEdit';

export function App() {
  return (
    <AuthProvider>
      <WebsiteProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              {/* PUBLIC USER SIDE */}
              <Route path="/" element={<Home />} />

              {/* ADMIN AUTHENTICATION */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* DEDICATED IN-PAGE EASY EDIT (NEW) */}
              <Route
                path="/admin/easy-edit"
                element={
                  <ProtectedRoute>
                    <EasyEdit />
                  </ProtectedRoute>
                }
              />

              {/* DEDICATED FULL-VIEWPORT WEBSITE EDITOR (STEP 3) */}
              <Route
                path="/admin/editor"
                element={
                  <ProtectedRoute>
                    <WebsiteEditor />
                  </ProtectedRoute>
                }
              />

              {/* PROTECTED ADMIN DASHBOARD ROUTES */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="sections" element={<AdminSections />} />
                <Route path="media" element={<AdminMedia />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              {/* CATCH-ALL REDIRECT */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </WebsiteProvider>
    </AuthProvider>
  );
}

export default App;

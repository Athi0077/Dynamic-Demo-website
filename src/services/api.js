// Centralized API Client with JWT Bearer Token Support, Silent 401 Handling, and Error Fallback

const rawApiUrl = (import.meta.env.VITE_API_URL || 'https://dynamic-demo-website.onrender.com/api').trim().replace(/\/+$/, '');
const API_BASE_URL = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl}/api`;

/**
 * Retrieves the stored JWT token
 */
export const getAuthToken = () => {
  return localStorage.getItem('nova_admin_token') || sessionStorage.getItem('nova_admin_token') || null;
};

/**
 * Builds request headers including JSON content type and authorization header if token exists
 */
const getHeaders = (extraHeaders = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...extraHeaders,
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Core fetch wrapper with timeout, 401 auto-logout, and JSON parsing
 */
const request = async (endpoint, options = {}) => {
  const isProtectedAdminRoute = endpoint.includes('/admin') || endpoint.includes('/auth/me');

  // Guard: If requesting a protected admin route without an active token, don't spam 401 errors
  if (isProtectedAdminRoute && !getAuthToken()) {
    return {
      success: false,
      error: 'Not authorized: No authentication token.',
      status: 401,
      isUnauthenticated: true,
    };
  }

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const config = {
    ...options,
    headers: getHeaders(options.headers),
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    const response = await fetch(url, {
      ...config,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Parse JSON response safely
    const data = await response.json().catch(() => ({}));

    // Handle 401 Unauthorized: clear stale credentials & notify AuthProvider
    if (response.status === 401) {
      localStorage.removeItem('nova_admin_token');
      localStorage.removeItem('nova_admin_auth');
      sessionStorage.removeItem('nova_admin_token');
      sessionStorage.removeItem('nova_admin_auth');
      window.dispatchEvent(new Event('nova_auth_logout'));

      return {
        success: false,
        error: data?.error || 'Session expired or unauthorized.',
        status: 401,
        isUnauthenticated: true,
      };
    }

    if (!response.ok) {
      const errorMsg = data?.error || data?.message || `Request failed with status ${response.status}`;
      const error = new Error(errorMsg);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    if (error.name === 'AbortError') {
      console.warn(`[API Timeout] Request to ${url} timed out`);
      return { success: false, error: 'Server timeout. Check if backend is reachable.', isOffline: true };
    }
    // Network errors (e.g. connection refused)
    if (error.message.includes('fetch') || error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
      console.warn(`[API Network Error] Could not connect to ${url}`);
      return { success: false, error: 'Backend server appears to be offline.', isOffline: true };
    }
    return { success: false, error: error.message, status: error.status, data: error.data };
  }
};

export const api = {
  get: (endpoint, options) => request(endpoint, { method: 'GET', ...options }),
  post: (endpoint, body, options) => request(endpoint, { method: 'POST', body: JSON.stringify(body), ...options }),
  put: (endpoint, body, options) => request(endpoint, { method: 'PUT', body: JSON.stringify(body), ...options }),
  delete: (endpoint, options) => request(endpoint, { method: 'DELETE', ...options }),
};

export default api;

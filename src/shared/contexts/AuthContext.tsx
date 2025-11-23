// ============================================================================
// AUTH CONTEXT - Global authentication state management
// ============================================================================

import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/authApi';
import { tokenManager } from '../services/httpClient';
import { useToast } from '../hooks/useToast';
import type {
  User,
  LoginRequest,
  RegisterRequest,
  AuthState,
  LoginResponse,
  JWTPayload,
} from '../types/auth';

// ============================================================================
// Context Type
// ============================================================================

interface AuthContextType extends AuthState {
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

// Internal context - exported at the end for useAuth hook
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================================================
// Helper Functions
// ============================================================================

const decodeToken = (token: string): JWTPayload | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload as JWTPayload;
  } catch {
    return null;
  }
};

const isTokenExpired = (token: string): boolean => {
  const payload = decodeToken(token);
  if (!payload) return true;
  
  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
};

const setUserFromToken = (token: string): User | null => {
  const payload = decodeToken(token);
  
  if (!payload) return null;

  const user: User = {
    id: payload.sub,
    email: payload.email,
    full_name: '', // Will be fetched from profile endpoint
    phone: '',
    role: payload.role,
    email_confirmed: true,
    created_at: '',
    session_version: payload.sessionVersion,
  };

  return user;
};

// ============================================================================
// Auth Provider Component
// ============================================================================

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  console.log('[AuthProvider] Rendering...');
  
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  const navigate = useNavigate();
  const { success, error: showError, info } = useToast();
  
  console.log('[AuthProvider] Current state:', { isLoading: state.isLoading, isAuthenticated: state.isAuthenticated });

  // ============================================================================
  // Login
  // ============================================================================

  const login = useCallback(async (data: LoginRequest) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response: LoginResponse = await authApi.login(data);

      // Store tokens
      tokenManager.setTokens(response.access_token, response.refresh_token);

      // Set user from token
      const user = setUserFromToken(response.access_token);

      setState({
        user,
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      success('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao fazer login';
      
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      showError(errorMessage);
      throw error;
    }
  }, [navigate, success, showError]);

  // ============================================================================
  // Register
  // ============================================================================

  const register = useCallback(async (data: RegisterRequest) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await authApi.register(data);

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: null,
      }));

      success(response.message);
      navigate('/login?registered=true');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao criar conta';
      
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      showError(errorMessage);
      throw error;
    }
  }, [navigate, success, showError]);

  // ============================================================================
  // Logout
  // ============================================================================

  const logout = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const refreshToken = tokenManager.getRefreshToken();

      if (refreshToken) {
        await authApi.logout({ refresh_token: refreshToken });
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      // Clear tokens and state
      tokenManager.clearTokens();

      setState({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });

      info('Logout realizado com sucesso');
      navigate('/');
    }
  }, [navigate, info]);

  // ============================================================================
  // Refresh Authentication
  // ============================================================================

  const refreshAuth = useCallback(async () => {
    const refreshToken = tokenManager.getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await authApi.refresh({ refresh_token: refreshToken });

      // Store new tokens
      tokenManager.setTokens(response.access_token, response.refresh_token);

      // Set user from token
      const user = setUserFromToken(response.access_token);

      setState((prev) => ({
        ...prev,
        user,
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        isAuthenticated: true,
      }));
    } catch (error) {
      // Refresh failed - logout
      await logout();
      throw error;
    }
  }, [logout]);

  // ============================================================================
  // Check Authentication on Mount
  // ============================================================================

  const checkAuth = useCallback(async () => {
    console.log('[checkAuth] Starting auth check...');
    const accessToken = tokenManager.getAccessToken();
    const refreshToken = tokenManager.getRefreshToken();

    console.log('[checkAuth] Has tokens:', { hasAccess: !!accessToken, hasRefresh: !!refreshToken });

    if (!accessToken || !refreshToken) {
      console.log('[checkAuth] No tokens found - setting to unauthenticated');
      setState({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
      return;
    }

    // Check if access token is expired
    if (isTokenExpired(accessToken)) {
      // Token expired - clear auth and let user login again
      console.log('[checkAuth] Token expired - clearing');
      tokenManager.clearTokens();
      setState({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } else {
      // Token is valid
      console.log('[checkAuth] Token valid - setting user');
      const user = setUserFromToken(accessToken);

      setState({
        user,
        accessToken,
        refreshToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    }
    console.log('[checkAuth] Auth check completed');
  }, []);

  // ============================================================================
  // Setup auto-refresh interval
  // ============================================================================

  useEffect(() => {
    if (state.isAuthenticated && state.accessToken) {
      const payload = decodeToken(state.accessToken);
      
      if (payload) {
        const expiresIn = payload.exp * 1000 - Date.now();
        const refreshTime = expiresIn - 5 * 60 * 1000; // Refresh 5 minutes before expiry

        if (refreshTime > 0) {
          const timeoutId = setTimeout(() => {
            refreshAuth().catch(console.error);
          }, refreshTime);

          return () => clearTimeout(timeoutId);
        }
      }
    }
  }, [state.isAuthenticated, state.accessToken, refreshAuth]);

  // ============================================================================
  // Listen to auth events from httpClient
  // ============================================================================

  useEffect(() => {
    const handleLogout = () => {
      logout();
    };

    const handleEmailNotConfirmed = (event: Event) => {
      const customEvent = event as CustomEvent;
      showError('Por favor, confirme seu e-mail antes de fazer login.');
      navigate(`/resend-verification?email=${customEvent.detail.email}`);
    };

    const handleRateLimit = (event: Event) => {
      const customEvent = event as CustomEvent<{ message: string; retryAfter: number }>;
      showError(`${customEvent.detail.message} Aguarde ${customEvent.detail.retryAfter}s.`);
    };

    window.addEventListener('auth:logout', handleLogout);
    window.addEventListener('auth:email-not-confirmed', handleEmailNotConfirmed);
    window.addEventListener('auth:rate-limit', handleRateLimit);

    return () => {
      window.removeEventListener('auth:logout', handleLogout);
      window.removeEventListener('auth:email-not-confirmed', handleEmailNotConfirmed);
      window.removeEventListener('auth:rate-limit', handleRateLimit);
    };
  }, [logout, navigate, showError]);

  // ============================================================================
  // Check auth on mount
  // ============================================================================

  useEffect(() => {
    console.log('[AuthProvider] Mounting - checking auth...');
    checkAuth().then(() => {
      console.log('[AuthProvider] Auth check completed');
    }).catch((err) => {
      console.error('[AuthProvider] Auth check failed:', err);
    });
  }, [checkAuth]);

  // ============================================================================
  // Context Value
  // ============================================================================

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    refreshAuth,
    checkAuth,
  };

  console.log('[AuthProvider] About to render - isLoading:', state.isLoading);
  
  // DEBUG: Visual indicator
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__AUTH_STATE__ = state;
  }
  
  return (
    <AuthContext.Provider value={value}>
      {/* Debug indicator - remove after fixing */}
      {state.isLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: 'yellow',
          padding: '10px',
          zIndex: 99999,
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          🔄 AUTH LOADING... (Debug Mode)
        </div>
      )}
      {children}
    </AuthContext.Provider>
  );
};

// Export context for useAuth hook (after component to avoid Fast Refresh warning)
export { AuthContext };

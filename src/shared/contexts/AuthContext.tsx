// ============================================================================
// AUTH CONTEXT - Global authentication state management
// ============================================================================

import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi, tokenApi } from '../services/authApi';
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

  // Return minimal user from token - full data will be fetched via /auth/me
  const user: User = {
    id: payload.sub,
    email: payload.email,
    full_name: '',
    phone: '',
    role: payload.role,
    email_confirmed: true,
    created_at: '',
    session_version: payload.sessionVersion,
  };

  return user;
};

// Fetch full user data from /auth/me endpoint
const fetchUserData = async (): Promise<User | null> => {
  try {
    const userData = await tokenApi.getProfile();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

// ============================================================================
// Auth Provider Component
// ============================================================================

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
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

  // ============================================================================
  // Login
  // ============================================================================

  const login = useCallback(async (data: LoginRequest) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response: LoginResponse = await authApi.login(data);

      // Store tokens (remember determines localStorage vs sessionStorage)
      tokenManager.setTokens(response.access_token, response.refresh_token, data.remember ?? false);

      // Fetch full user data from /auth/me
      const userData = await fetchUserData();
      const user = userData || setUserFromToken(response.access_token);

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
      // Check if it's a 403 email not confirmed error (handled by event listener)
      const is403Error = error instanceof Error && 
                         (error.message.includes('E-mail não verificado') || 
                          error.message.includes('confirme seu e-mail'));
      
      if (!is403Error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro ao fazer login';
        
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
      } else {
        // For 403 errors, just reset loading state (error is handled by event)
        setState((prev) => ({
          ...prev,
          isLoading: false,
        }));
      }
      
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

      // Store new tokens (preserve storage type - if token was in localStorage, keep it there)
      const wasInLocalStorage = !!localStorage.getItem('pixelaria_refresh_token');
      tokenManager.setTokens(response.access_token, response.refresh_token, wasInLocalStorage);

      // Fetch full user data from /auth/me
      const userData = await fetchUserData();
      const user = userData || setUserFromToken(response.access_token);

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
    const accessToken = tokenManager.getAccessToken();
    const refreshToken = tokenManager.getRefreshToken();

    if (!accessToken || !refreshToken) {
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
      // Token is valid - fetch full user data
      const userData = await fetchUserData();
      const user = userData || setUserFromToken(accessToken);

      setState({
        user,
        accessToken,
        refreshToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    }
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
      const customEvent = event as CustomEvent<{ email?: string; message?: string }>;
      const message = customEvent.detail.message || 'Por favor, confirme seu e-mail antes de fazer login.';
      showError(message);
      
      if (customEvent.detail.email) {
        navigate(`/resend-verification?email=${customEvent.detail.email}`);
      } else {
        navigate('/resend-verification');
      }
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
    checkAuth();
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
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Export context for useAuth hook (after component to avoid Fast Refresh warning)
export { AuthContext };

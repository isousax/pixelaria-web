// ============================================================================
// HTTP CLIENT - Axios instance with interceptors for auth
// ============================================================================

import axios, { AxiosError } from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import type { AuthErrorResponse, RateLimitError } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://auth.pixelaria.com.br';

// ============================================================================
// Token Management
// ============================================================================

const TOKEN_KEY = 'pixelaria_access_token';
const REFRESH_TOKEN_KEY = 'pixelaria_refresh_token';

export const tokenManager = {
  getAccessToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  },

  setAccessToken: (token: string, remember: boolean = true): void => {
    if (remember) {
      localStorage.setItem(TOKEN_KEY, token);
      sessionStorage.removeItem(TOKEN_KEY);
    } else {
      sessionStorage.setItem(TOKEN_KEY, token);
      localStorage.removeItem(TOKEN_KEY);
    }
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_KEY) || sessionStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setRefreshToken: (token: string, remember: boolean = true): void => {
    if (remember) {
      localStorage.setItem(REFRESH_TOKEN_KEY, token);
      sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    } else {
      sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  },

  clearTokens: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  setTokens: (accessToken: string, refreshToken: string, remember: boolean = true): void => {
    tokenManager.setAccessToken(accessToken, remember);
    tokenManager.setRefreshToken(refreshToken, remember);
  },
};

// ============================================================================
// Axios Instance
// ============================================================================

const httpClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================================================
// Request Interceptor - Add auth token
// ============================================================================

httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenManager.getAccessToken();
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// ============================================================================
// Response Interceptor - Handle errors and auto-refresh
// ============================================================================

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

httpClient.interceptors.response.use(
  (response: import('axios').AxiosResponse) => response,
  async (error: AxiosError<AuthErrorResponse | RateLimitError>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle 401 Unauthorized - Try to refresh token
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      const authError = error.response.data as AuthErrorResponse;
      
      // If token expired, try to refresh
      if (authError.reason === 'expired' && !isRefreshing) {
        originalRequest._retry = true;

        if (isRefreshing) {
          // Wait for token refresh
          return new Promise((resolve) => {
            addRefreshSubscriber((token: string) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              resolve(httpClient(originalRequest));
            });
          });
        }

        isRefreshing = true;

        try {
          const refreshToken = tokenManager.getRefreshToken();
          
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          // Call refresh endpoint
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refresh_token: refreshToken,
          });

          const { access_token, refresh_token } = response.data;

          // Save new tokens
          tokenManager.setTokens(access_token, refresh_token);

          // Notify subscribers
          onRefreshed(access_token);

          // Retry original request
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
          }

          return httpClient(originalRequest);
        } catch (refreshError) {
          // Refresh failed - clear tokens and redirect to login
          tokenManager.clearTokens();
          window.dispatchEvent(new CustomEvent('auth:logout'));
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // If not expired or refresh failed, only logout if user is authenticated
      // Don't logout on public endpoints (email verification, password reset, etc)
      const publicEndpoints = ['/auth/confirm-email', '/auth/reset-password', '/auth/verify-email'];
      const isPublicEndpoint = publicEndpoints.some(endpoint => originalRequest?.url?.includes(endpoint));
      
      if (authError.reason !== 'expired' && !isPublicEndpoint) {
        const hasTokens = tokenManager.getAccessToken() || tokenManager.getRefreshToken();
        if (hasTokens) {
          tokenManager.clearTokens();
          window.dispatchEvent(new CustomEvent('auth:logout'));
        }
      }
    }

    // Handle 403 Forbidden - Email not confirmed
    if (error.response?.status === 403) {
      const errorData = error.response.data as AuthErrorResponse;
      const errorMessage = errorData.error?.toLowerCase() || '';
      const isEmailNotVerified = errorMessage.includes('e-mail não verificado') || 
                                 errorMessage.includes('email não verificado') ||
                                 errorMessage.includes('confirme seu e-mail') ||
                                 errorMessage.includes('verifique sua caixa de entrada');
      
      if (isEmailNotVerified) {
        window.dispatchEvent(new CustomEvent('auth:email-not-confirmed', { 
          detail: { 
            email: errorData.field,
            message: errorData.error 
          } 
        }));
      }
    }

    // Handle 429 Rate Limit
    if (error.response?.status === 429) {
      const rateLimitError = error.response.data as RateLimitError;
      // Note: Retry-After header may not be accessible due to CORS
      // Backend should send retry_after_seconds in response body
      const retryAfter = rateLimitError.retry_after_seconds || 60;
      
      window.dispatchEvent(new CustomEvent('auth:rate-limit', {
        detail: {
          message: rateLimitError.error || 'Muitas tentativas. Aguarde antes de tentar novamente.',
          retryAfter: parseInt(String(retryAfter), 10) || 60,
        },
      }));
    }

    return Promise.reject(error);
  }
);

// ============================================================================
// Error Handler Helper
// ============================================================================

export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<AuthErrorResponse | RateLimitError>;
    
    if (axiosError.response?.data) {
      const errorData = axiosError.response.data;
      return errorData.error || 'Erro ao processar requisição';
    }

    if (axiosError.message === 'Network Error') {
      return 'Erro de conexão. Verifique sua internet.';
    }

    if (axiosError.code === 'ECONNABORTED') {
      return 'Tempo de requisição esgotado. Tente novamente.';
    }
  }

  return 'Erro inesperado. Tente novamente.';
};

export default httpClient;

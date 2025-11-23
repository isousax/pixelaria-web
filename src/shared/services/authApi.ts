// ============================================================================
// AUTH API CLIENT - Typed functions for all auth endpoints
// ============================================================================

import httpClient, { handleApiError } from './httpClient';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshRequest,
  RefreshResponse,
  LogoutRequest,
  RequestPasswordResetRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  ResendVerificationRequest,
  ConfirmVerificationRequest,
  IntrospectResponse,
} from '../types/auth';

// ============================================================================
// Authentication Endpoints
// ============================================================================

export const authApi = {
  /**
   * Login user with email and password
   * Rate Limit: 5 req/min
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await httpClient.post<LoginResponse>('/auth/login', data);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Register new user
   * Rate Limit: 5 req/min
   */
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await httpClient.post<RegisterResponse>('/auth/register', data);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Logout user and revoke refresh token
   */
  async logout(data: LogoutRequest): Promise<void> {
    try {
      await httpClient.post('/auth/logout', data);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Refresh access token
   * Automatically rotates refresh token
   */
  async refresh(data: RefreshRequest): Promise<RefreshResponse> {
    try {
      const response = await httpClient.post<RefreshResponse>('/auth/refresh', data);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};

// ============================================================================
// Email Verification Endpoints
// ============================================================================

export const emailVerificationApi = {
  /**
   * Resend verification email
   * Rate Limit: 5 req/min
   * Cooldown: 60 seconds
   */
  async resendVerification(data: ResendVerificationRequest): Promise<{ ok: boolean; message: string }> {
    try {
      const response = await httpClient.post<{ ok: boolean; message: string }>(
        '/auth/resend-verification',
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Confirm email with verification token
   * Idempotent operation
   */
  async confirmVerification(data: ConfirmVerificationRequest): Promise<{ ok: boolean; message: string }> {
    try {
      const response = await httpClient.post<{ ok: boolean; message: string }>(
        '/auth/confirm-verification',
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};

// ============================================================================
// Password Management Endpoints
// ============================================================================

export const passwordApi = {
  /**
   * Request password reset email
   * Rate Limit: 3 req/5min
   * Cooldown: 60 seconds (silent)
   * Always returns success to prevent email enumeration
   */
  async requestReset(data: RequestPasswordResetRequest): Promise<{ ok: boolean; message: string }> {
    try {
      const response = await httpClient.post<{ ok: boolean; message: string }>(
        '/auth/request-reset',
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Reset password with token
   * Rate Limit: 3 req/5min
   */
  async resetPassword(data: ResetPasswordRequest): Promise<{ ok: boolean; message: string }> {
    try {
      const response = await httpClient.post<{ ok: boolean; message: string }>(
        '/auth/reset-password',
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Change password (requires authentication)
   * Rate Limit: 3 req/5min
   */
  async changePassword(data: ChangePasswordRequest): Promise<{ ok: boolean; message: string }> {
    try {
      const response = await httpClient.post<{ ok: boolean; message: string }>(
        '/auth/change-password',
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};

// ============================================================================
// Token Management Endpoints
// ============================================================================

export const tokenApi = {
  /**
   * Get authenticated user profile
   * Requires valid JWT token
   */
  async getProfile(): Promise<import('../types/auth').User> {
    try {
      const response = await httpClient.get<import('../types/auth').User>('/auth/me');
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Validate JWT token
   * Token can be provided via Authorization header or in body
   */
  async introspect(token?: string): Promise<IntrospectResponse> {
    try {
      const response = await httpClient.post<IntrospectResponse>('/auth/introspect', 
        token ? { token } : undefined
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Get JWKS public keys
   */
  async getJWKS(): Promise<{ keys: unknown[] }> {
    try {
      const response = await httpClient.get<{ keys: unknown[] }>('/auth/.well-known/jwks.json');
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};

// Export all APIs as single object
export default {
  auth: authApi,
  emailVerification: emailVerificationApi,
  password: passwordApi,
  token: tokenApi,
};

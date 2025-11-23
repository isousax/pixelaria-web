// ============================================================================
// AUTH TYPES - Based on OpenAPI Spec
// ============================================================================

export interface User {
  id: string;
  email: string;
  full_name: string;
  display_name?: string | null;
  phone: string;
  birth_date?: string | null;
  role: 'user' | 'admin';
  email_confirmed: boolean;
  created_at: string;
  session_version: number;
}

export interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: 'Bearer';
  expires_in: number; // seconds
  remember_me: boolean;
  user: {
    id: string;
    email: string;
    role: 'user' | 'admin';
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  full_name: string;
  display_name?: string;
  phone: string;
  birth_date?: string;
}

export interface RegisterResponse {
  ok: boolean;
  message: string;
  user_id: string;
}

export interface RefreshRequest {
  refresh_token: string;
}

export interface RefreshResponse {
  access_token: string;
  refresh_token: string;
  token_type: 'Bearer';
  expires_in: number;
  user: {
    id: string;
    email: string;
    role: 'user' | 'admin';
  };
}

export interface LogoutRequest {
  refresh_token: string;
}

export interface RequestPasswordResetRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  new_password: string;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

export interface ResendVerificationRequest {
  email: string;
}

export interface ConfirmVerificationRequest {
  token: string;
}

export interface JWTPayload {
  sub: string; // user_id
  email: string;
  role: 'user' | 'admin';
  sessionVersion: number;
  iss: string; // issuer
  aud: string; // audience
  exp: number; // expiration timestamp
  jti: string; // JWT ID for revocation
}

export interface IntrospectResponse {
  valid: boolean;
  payload?: JWTPayload;
  reason?: string | null;
}

// Error Responses
export interface AuthErrorResponse {
  error: string;
  field?: string;
  code?: string;
  reason?: 'expired' | 'invalid_signature' | 'revoked' | 'invalid_issuer' | 'invalid_audience' | 'malformed';
}

export interface RateLimitError {
  error: string;
  code: 'TOO_MANY_ATTEMPTS' | 'RATE_LIMIT_EXCEEDED';
  retry_after_seconds: number;
}

// Auth State
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

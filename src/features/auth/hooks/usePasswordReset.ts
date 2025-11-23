// ============================================================================
// usePasswordReset Hook - Specialized hook for password reset flow
// ============================================================================

import { useState } from 'react';
import { passwordApi } from '../../../shared/services/authApi';
import type { RequestPasswordResetRequest, ResetPasswordRequest, ChangePasswordRequest } from '../../../shared/types/auth';

interface UsePasswordResetReturn {
  requestReset: (data: RequestPasswordResetRequest) => Promise<void>;
  resetPassword: (data: ResetPasswordRequest) => Promise<void>;
  changePassword: (data: ChangePasswordRequest) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  clearError: () => void;
  clearSuccess: () => void;
}

export const usePasswordReset = (): UsePasswordResetReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const requestReset = async (data: RequestPasswordResetRequest) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await passwordApi.requestReset(data);
      setSuccess(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao solicitar reset';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (data: ResetPasswordRequest) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await passwordApi.resetPassword(data);
      setSuccess(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao redefinir senha';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (data: ChangePasswordRequest) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await passwordApi.changePassword(data);
      setSuccess(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao alterar senha';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);
  const clearSuccess = () => setSuccess(false);

  return {
    requestReset,
    resetPassword,
    changePassword,
    isLoading,
    error,
    success,
    clearError,
    clearSuccess,
  };
};

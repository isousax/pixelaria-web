// ============================================================================
// useEmailVerification Hook - For email verification flow
// ============================================================================

import { useState } from 'react';
import { emailVerificationApi } from '../../../shared/services/authApi';
import type { ResendVerificationRequest, ConfirmVerificationRequest } from '../../../shared/types/auth';

interface UseEmailVerificationReturn {
  resendVerification: (data: ResendVerificationRequest) => Promise<void>;
  confirmVerification: (data: ConfirmVerificationRequest) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  message: string | null;
  clearError: () => void;
  clearSuccess: () => void;
}

export const useEmailVerification = (): UseEmailVerificationReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const resendVerification = async (data: ResendVerificationRequest) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    setMessage(null);

    try {
      const response = await emailVerificationApi.resendVerification(data);
      setSuccess(true);
      setMessage(response.message);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao reenviar email';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const confirmVerification = async (data: ConfirmVerificationRequest) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    setMessage(null);

    try {
      const response = await emailVerificationApi.confirmVerification(data);
      setSuccess(true);
      setMessage(response.message);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao confirmar email';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);
  const clearSuccess = () => setSuccess(false);

  return {
    resendVerification,
    confirmVerification,
    isLoading,
    error,
    success,
    message,
    clearError,
    clearSuccess,
  };
};

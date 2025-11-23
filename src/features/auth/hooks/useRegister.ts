// ============================================================================
// useRegister Hook - Specialized hook for registration with loading state
// ============================================================================

import { useState } from 'react';
import { useAuth } from '../../../shared/hooks/useAuth';
import type { RegisterRequest } from '../../../shared/types/auth';

interface UseRegisterReturn {
  register: (data: RegisterRequest) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  clearError: () => void;
  clearSuccess: () => void;
}

export const useRegister = (): UseRegisterReturn => {
  const { register: authRegister } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const register = async (data: RegisterRequest) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await authRegister(data);
      setSuccess(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar conta';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);
  const clearSuccess = () => setSuccess(false);

  return {
    register,
    isLoading,
    error,
    success,
    clearError,
    clearSuccess,
  };
};

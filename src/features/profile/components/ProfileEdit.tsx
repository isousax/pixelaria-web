// ============================================================================
// ProfileEdit Component
// ============================================================================

import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { User, Phone, Calendar } from 'lucide-react';
import { Button } from '../../../shared/components/ui/Button';
import { Input } from '../../../shared/components/ui/Input';
import { Card } from '../../../shared/components/ui/Card';
import { useAuth } from '../../../shared/hooks/useAuth';
import httpClient from '../../../shared/services/httpClient';
import type { User as UserType } from '../../../shared/types/auth';

interface ProfileFormData {
  full_name: string;
  phone: string;
  birth_date: string;
}

export const ProfileEdit = () => {
  const { user, refreshAuth } = useAuth();
  const [formData, setFormData] = useState<ProfileFormData>({
    full_name: '',
    phone: '',
    birth_date: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        phone: user.phone || '',
        birth_date: user.birth_date || ''
      });
    }
  }, [user]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.full_name || formData.full_name.trim().length < 3) {
      errors.full_name = 'Nome deve ter pelo menos 3 caracteres';
    }

    if (formData.phone && !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.phone)) {
      errors.phone = 'Telefone inválido. Use o formato (XX) XXXXX-XXXX';
    }

    if (formData.birth_date) {
      const birthDate = new Date(formData.birth_date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < 18 || age > 120) {
        errors.birth_date = 'Você deve ter entre 18 e 120 anos';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await httpClient.put<UserType>('/auth/profile', formData);
      
      // Refresh auth context to update user data
      await refreshAuth();
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro ao atualizar perfil');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValidationErrors(prev => ({ ...prev, [field]: '' }));
    setError('');
  };

  return (
    <Card padding="lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Editar Perfil</h2>
        <p className="text-neutral-600">Atualize suas informações pessoais</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={user?.email || ''}
            disabled
            className="bg-neutral-50 cursor-not-allowed"
          />
          <p className="mt-1 text-xs text-neutral-500">
            O email não pode ser alterado
          </p>
        </div>

        <div>
          <label htmlFor="full_name" className="block text-sm font-medium text-neutral-700 mb-2">
            Nome Completo *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <Input
              id="full_name"
              type="text"
              value={formData.full_name}
              onChange={(e) => handleChange('full_name', e.target.value)}
              className="pl-10"
              placeholder="Seu nome completo"
              disabled={isLoading}
            />
          </div>
          {validationErrors.full_name && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.full_name}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
            Telefone
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="pl-10"
              placeholder="(XX) XXXXX-XXXX"
              disabled={isLoading}
            />
          </div>
          {validationErrors.phone && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="birth_date" className="block text-sm font-medium text-neutral-700 mb-2">
            Data de Nascimento
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <Input
              id="birth_date"
              type="date"
              value={formData.birth_date}
              onChange={(e) => handleChange('birth_date', e.target.value)}
              className="pl-10"
              disabled={isLoading}
            />
          </div>
          {validationErrors.birth_date && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.birth_date}</p>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-600">✓ Perfil atualizado com sucesso!</p>
          </div>
        )}

        <Button
          type="submit"
          variant="gradient"
          size="lg"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </form>
    </Card>
  );
};

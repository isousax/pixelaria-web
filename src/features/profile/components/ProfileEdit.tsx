// ============================================================================
// ProfileEdit Component
// ============================================================================

import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { User, Phone, Tag, Cake } from 'lucide-react';
import { Button } from '../../../shared/components/ui/Button';
import { Input } from '../../../shared/components/ui/Input';
import { Card } from '../../../shared/components/ui/Card';
import { useAuth } from '../../../shared/hooks/useAuth';
import httpClient from '../../../shared/services/httpClient';
import type { User as UserType } from '../../../shared/types/auth';

interface ProfileFormData {
  full_name: string;
  display_name: string;
  phone: string;
  birth_date: string;
}

// Phone utility functions
const normalizePhone = (phone: string): string => {
  // Remove tudo exceto números
  return phone.replace(/\D/g, '');
};

const formatPhone = (phone: string): string => {
  const numbers = normalizePhone(phone);
  
  // Se tem código do país (+55), remove
  const localNumbers = numbers.startsWith('55') ? numbers.slice(2) : numbers;
  
  // Formata: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
  if (localNumbers.length === 11) {
    return `(${localNumbers.slice(0, 2)}) ${localNumbers.slice(2, 7)}-${localNumbers.slice(7)}`;
  } else if (localNumbers.length === 10) {
    return `(${localNumbers.slice(0, 2)}) ${localNumbers.slice(2, 6)}-${localNumbers.slice(6)}`;
  }
  
  return phone; // Retorna original se não conseguir formatar
};

const isValidPhone = (phone: string): boolean => {
  if (!phone) return true; // Campo opcional
  
  const numbers = normalizePhone(phone);
  
  // Aceita com ou sem código do país
  // 10 dígitos: (XX) XXXX-XXXX
  // 11 dígitos: (XX) XXXXX-XXXX
  // 12 dígitos: +55 XX XXXX-XXXX
  // 13 dígitos: +55 XX XXXXX-XXXX
  const localNumbers = numbers.startsWith('55') ? numbers.slice(2) : numbers;
  
  return localNumbers.length === 10 || localNumbers.length === 11;
};

export const ProfileEdit = () => {
  const { user, refreshAuth } = useAuth();
  const [formData, setFormData] = useState<ProfileFormData>({
    full_name: '',
    display_name: '',
    phone: '',
    birth_date: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  // Check if birth_date is already set (cannot be changed after set)
  const hasBirthDate = !!user?.birth_date;

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        display_name: user.display_name || '',
        phone: user.phone ? formatPhone(user.phone) : '',
        birth_date: user.birth_date || ''
      });
    }
  }, [user]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.full_name || formData.full_name.trim().length < 3) {
      errors.full_name = 'Nome deve ter pelo menos 3 caracteres';
    }

    if (formData.phone && !isValidPhone(formData.phone)) {
      errors.phone = 'Telefone inválido. Digite apenas números ou use (XX) XXXXX-XXXX';
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
      // Normaliza telefone antes de enviar (apenas números com +55)
      const dataToSend = {
        ...formData,
        phone: formData.phone ? `+55${normalizePhone(formData.phone)}` : formData.phone
      };
      
      await httpClient.put<UserType>('/auth/profile', dataToSend);
      
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
    // Formata telefone automaticamente enquanto digita
    const finalValue = field === 'phone' ? formatPhone(value) : value;
    
    setFormData(prev => ({ ...prev, [field]: finalValue }));
    setValidationErrors(prev => ({ ...prev, [field]: '' }));
    setError('');
  };

  return (
    <Card padding="lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Editar Perfil</h2>
      </div>

      {/* Current User Info */}
      <div className="mb-8 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
        <h3 className="text-sm font-semibold text-neutral-700 mb-3">Informações Atuais</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-neutral-500">Email:</span>
            <p className="font-medium text-neutral-900">{user?.email}</p>
          </div>
          <div>
            <span className="text-neutral-500">Nome Completo:</span>
            <p className="font-medium text-neutral-900">{user?.full_name || '-'}</p>
          </div>
          {user?.display_name && (
            <div>
              <span className="text-neutral-500">Nome de Exibição:</span>
              <p className="font-medium text-neutral-900">{user.display_name}</p>
            </div>
          )}
          <div>
            <span className="text-neutral-500">Telefone:</span>
            <p className="font-medium text-neutral-900">{user?.phone || '-'}</p>
          </div>
          <div>
            <span className="text-neutral-500">Data de Nascimento:</span>
            <p className="font-medium text-neutral-900">
              {user?.birth_date ? new Date(user.birth_date).toLocaleDateString('pt-BR') : '-'}
            </p>
          </div>
          <div>
            <span className="text-neutral-500">Conta Criada:</span>
            <p className="font-medium text-neutral-900">
              {user?.created_at ? new Date(user.created_at).toLocaleDateString('pt-BR') : '-'}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-1 text-neutral-400" />
            <Input
              id="full_name"
              type="text"
              value={formData.full_name}
              onChange={(e) => handleChange('full_name', e.target.value)}
              className="pl-10"
              placeholder="Nome Completo"
              disabled={isLoading}
            />
          </div>
          {validationErrors.full_name && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.full_name}</p>
          )}
        </div>

        <div>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-1 text-neutral-400" />
            <Input
              id="display_name"
              type="text"
              value={formData.display_name}
              onChange={(e) => handleChange('display_name', e.target.value)}
              className="pl-10"
              placeholder="Como você quer ser chamado"
              disabled={isLoading}
            />
          </div>
          <p className="mt-1 text-xs text-neutral-500">
            Nome curto ou apelido para exibição (opcional)
          </p>
        </div>

        <div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-1 text-neutral-400" />
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
          <p className="mt-1 text-xs text-neutral-500">
            Digite apenas números. Será formatado automaticamente.
          </p>
        </div>

        {!hasBirthDate && (
          <div>
            <div className="relative">
              <Cake className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-1 text-neutral-400" />
              <Input
                id="birth_date"
                type="date"
                value={formData.birth_date}
                onChange={(e) => handleChange('birth_date', e.target.value)}
                className="pl-10"
                disabled={isLoading}
                placeholder="Data de Nascimento"
              />
            </div>
            {validationErrors.birth_date && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.birth_date}</p>
            )}
            <p className="mt-1 text-xs text-amber-600">
              ⚠️ Após salvar, a data de nascimento não poderá mais ser alterada
            </p>
          </div>
        )}

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

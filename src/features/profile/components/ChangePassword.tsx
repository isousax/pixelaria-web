// ============================================================================
// ChangePassword Component
// ============================================================================

import { useState } from 'react';
import type { FormEvent } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../../shared/components/ui/Button';
import { Input } from '../../../shared/components/ui/Input';
import { Card } from '../../../shared/components/ui/Card';
import { usePasswordReset } from '../../auth/hooks/usePasswordReset';

export const ChangePassword = () => {
  const { changePassword, isLoading, error } = usePasswordReset();
  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const validatePassword = (pwd: string): string | null => {
    if (pwd.length < 8) return 'Senha deve ter no mínimo 8 caracteres';
    if (!/[A-Z]/.test(pwd)) return 'Senha deve conter pelo menos uma letra maiúscula';
    if (!/[a-z]/.test(pwd)) return 'Senha deve conter pelo menos uma letra minúscula';
    if (!/[0-9]/.test(pwd)) return 'Senha deve conter pelo menos um número';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) return 'Senha deve conter pelo menos um caractere especial';
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    setSuccess(false);

    if (!formData.current_password) {
      errors.current_password = 'Senha atual é obrigatória';
    }

    const passwordError = validatePassword(formData.new_password);
    if (passwordError) {
      errors.new_password = passwordError;
    }

    if (formData.new_password !== formData.confirm_password) {
      errors.confirm_password = 'As senhas não coincidem';
    }

    if (formData.current_password === formData.new_password) {
      errors.new_password = 'Nova senha deve ser diferente da senha atual';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await changePassword({
        current_password: formData.current_password,
        new_password: formData.new_password
      });

      // Reset form on success
      setFormData({
        current_password: '',
        new_password: '',
        confirm_password: ''
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch {
      // Error handled by hook
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValidationErrors(prev => ({ ...prev, [field]: '' }));
  };

  const togglePassword = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <Card padding="lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Alterar Senha</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-1 text-neutral-400" />
            <Input
              id="current_password"
              type={showPasswords.current ? 'text' : 'password'}
              value={formData.current_password}
              onChange={(e) => handleChange('current_password', e.target.value)}
              className="pl-10 pr-10"
              placeholder="Senha Atual"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => togglePassword('current')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {validationErrors.current_password && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.current_password}</p>
          )}
        </div>

        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-1 text-neutral-400" />
            <Input
              id="new_password"
              type={showPasswords.new ? 'text' : 'password'}
              value={formData.new_password}
              onChange={(e) => handleChange('new_password', e.target.value)}
              className="pl-10 pr-10"
              placeholder="Nova Senha"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => togglePassword('new')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {validationErrors.new_password && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.new_password}</p>
          )}
          <p className="mt-1 text-xs text-neutral-500">
            Mínimo 8 caracteres, com maiúscula, minúscula, número e caractere especial
          </p>
        </div>

        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-1 text-neutral-400" />
            <Input
              id="confirm_password"
              type={showPasswords.confirm ? 'text' : 'password'}
              value={formData.confirm_password}
              onChange={(e) => handleChange('confirm_password', e.target.value)}
              className="pl-10 pr-10"
              placeholder="Confirmar Nova Senha"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => togglePassword('confirm')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {validationErrors.confirm_password && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.confirm_password}</p>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-600">✓ Senha alterada com sucesso!</p>
          </div>
        )}

        <Button
          type="submit"
          variant="gradient"
          size="lg"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Alterando...' : 'Alterar Senha'}
        </Button>
      </form>
    </Card>
  );
};

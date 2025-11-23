// ============================================================================
// RegisterForm Component - Complete registration form with validation
// ============================================================================

import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../../shared/components/ui/Button';
import { Input } from '../../../shared/components/ui/Input';
import { useRegister } from '../hooks/useRegister';

export const RegisterForm = () => {
  const { register, isLoading, error, success } = useRegister();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    phone: '',
    birth_date: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      errors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email inválido';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 8) {
      errors.password = 'Senha deve ter no mínimo 8 caracteres';
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = 'Senha deve conter pelo menos 1 letra maiúscula';
    } else if (!/[a-z]/.test(formData.password)) {
      errors.password = 'Senha deve conter pelo menos 1 letra minúscula';
    } else if (!/[0-9]/.test(formData.password)) {
      errors.password = 'Senha deve conter pelo menos 1 número';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      errors.password = 'Senha deve conter pelo menos 1 caractere especial';
    }

    // Full name validation
    if (!formData.full_name) {
      errors.full_name = 'Nome completo é obrigatório';
    } else if (formData.full_name.length < 3) {
      errors.full_name = 'Nome deve ter no mínimo 3 caracteres';
    }

    // Phone validation
    if (!formData.phone) {
      errors.phone = 'Telefone é obrigatório';
    } else if (!/^[\d\s()+-]+$/.test(formData.phone)) {
      errors.phone = 'Telefone inválido';
    }

    // Birth date validation (optional but if provided, validate)
    if (formData.birth_date) {
      const birthDate = new Date(formData.birth_date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < 18) {
        errors.birth_date = 'Você deve ter pelo menos 18 anos';
      } else if (age > 120) {
        errors.birth_date = 'Data de nascimento inválida';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
    } catch {
      // Error handled by hook
    }
  };

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-neutral-900">Conta criada com sucesso!</h3>
        <p className="text-neutral-600">
          Enviamos um email de confirmação para <strong>{formData.email}</strong>.
          <br />
          Por favor, verifique sua caixa de entrada.
        </p>
        <Button as={Link} to="/login" variant="gradient" size="lg" className="mt-6">
          Ir para Login
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Full Name */}
      <div>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-1 text-neutral-400" />
          <Input
            id="full_name"
            type="text"
            value={formData.full_name}
            onChange={(e) => {
              setFormData({ ...formData, full_name: e.target.value });
              setValidationErrors({ ...validationErrors, full_name: '' });
            }}
            className="pl-10"
            placeholder="Nome Completo"
            disabled={isLoading}
          />
        </div>
        {validationErrors.full_name && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.full_name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-1 text-neutral-400" />
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              setValidationErrors({ ...validationErrors, email: '' });
            }}
            className="pl-10"
            placeholder="E-mail"
            disabled={isLoading}
          />
        </div>
        {validationErrors.email && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-1 text-neutral-400" />
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
              setValidationErrors({ ...validationErrors, phone: '' });
            }}
            className="pl-10"
            placeholder="Telefone"
            disabled={isLoading}
          />
        </div>
        {validationErrors.phone && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.phone}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-1 text-neutral-400" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              setValidationErrors({ ...validationErrors, password: '' });
            }}
            className="pl-10 pr-10"
            placeholder="Crie uma senha segura"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {validationErrors.password && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
        )}
        <p className="mt-1 text-xs text-neutral-500">
          Mínimo 8 caracteres, 1 maiúscula, 1 minúscula, 1 número e 1 caractere especial
        </p>
      </div>

      {/* Confirm Password
      <div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-1 text-neutral-400" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={(e) => {
              setFormData({ ...formData, confirmPassword: e.target.value });
              setValidationErrors({ ...validationErrors, confirmPassword: '' });
            }}
            className="pl-10 pr-10"
            placeholder="Confirmar Senha"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {validationErrors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.confirmPassword}</p>
        )}
      </div>
        */}
        
      {/* API Error */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="gradient"
        size="lg"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Criando conta...' : 'Criar Conta'}
      </Button>

      {/* Login Link */}
      <p className="text-center text-sm text-neutral-600">
        Já tem uma conta?{' '}
        <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium underline">
          Fazer login
        </Link>
      </p>
    </form>
  );
};

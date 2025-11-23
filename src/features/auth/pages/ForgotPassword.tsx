import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Input } from '../../../shared/components/ui/Input';
import { SEO } from '../../../shared/components/SEO';
import { usePasswordReset } from '../hooks/usePasswordReset';

export const ForgotPassword = () => {
  const { requestReset, isLoading, error, success } = usePasswordReset();
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!email) {
      setValidationError('Email é obrigatório');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError('Email inválido');
      return;
    }

    try {
      await requestReset({ email });
    } catch {
      // Error handled by hook
    }
  };

  if (success) {
    return (
      <>
        <SEO title="Email Enviado - Pixelaria" description="Instruções para redefinir sua senha foram enviadas" />
        <div className="min-h-screen bg-background-light flex items-center justify-center py-18 sm:py-30 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <Card padding="lg" className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Email enviado!</h2>
              <p className="text-neutral-600 mb-6">
                Se o email <strong>{email}</strong> estiver cadastrado, você receberá instruções para redefinir sua senha.
              </p>
              <Button as={Link} to="/login" variant="gradient" size="lg" className="w-full">
                Voltar para Login
              </Button>
            </Card>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Esqueci minha Senha - Pixelaria" description="Recupere o acesso à sua conta" />
      <div className="min-h-screen bg-background-light flex items-center justify-center py-18 sm:py-30 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-neutral-900 mb-2">
              Esqueceu sua senha?
            </h1>
            <p className="text-neutral-600">
              Digite seu email e enviaremos instruções para redefinir sua senha
            </p>
          </div>

          <Card padding="lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-1 text-neutral-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setValidationError('');
                    }}
                    className="pl-10"
                    placeholder="E-mail"
                    disabled={isLoading}
                  />
                </div>
                {validationError && (
                  <p className="mt-1 text-sm text-red-600">{validationError}</p>
                )}
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Enviando...' : 'Enviar Instruções'}
              </Button>

              <p className="text-center text-sm text-neutral-600">
                Lembrou sua senha?{' '}
                <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium underline">
                  Voltar para login
                </Link>
              </p>
            </form>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

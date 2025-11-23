import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Input } from '../../../shared/components/ui/Input';
import { SEO } from '../../../shared/components/SEO';
import { useEmailVerification } from '../hooks/useEmailVerification';

const COOLDOWN_SECONDS = 60;

export const ResendVerification = () => {
  const { resendVerification, isLoading, error, success } = useEmailVerification();
  const [searchParams] = useState(() => new URLSearchParams(window.location.search));
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [validationError, setValidationError] = useState('');
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

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
      await resendVerification({ email });
      setCooldown(COOLDOWN_SECONDS);
    } catch {
      // Error handled by hook
    }
  };

  if (success && cooldown === 0) {
    return (
      <>
        <SEO title="Email Enviado - Pixelaria" description="Um novo email de verificação foi enviado" />
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
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Email Enviado!</h2>
              <p className="text-neutral-600 mb-6">
                Enviamos um novo email de verificação para <strong>{email}</strong>. Verifique sua caixa de entrada e spam.
              </p>
              <div className="space-y-3">
                <Button onClick={() => window.location.reload()} variant="gradient" size="lg" className="w-full">
                  Enviar Novamente
                </Button>
                <Button as={Link} to="/login" variant="outline" size="lg" className="w-full">
                  Voltar para Login
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Reenviar Verificação - Pixelaria" description="Receba um novo email de verificação de conta" />
      <div className="min-h-screen bg-background-light flex items-center justify-center py-18 sm:py-30 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-neutral-900 mb-2">
              Reenviar Verificação
            </h1>
            <p className="text-neutral-600">
              Digite seu email para receber um novo link de verificação
            </p>
          </div>

          <Card padding="lg">
            {success && cooldown > 0 && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-green-800 mb-1">Email enviado com sucesso!</p>
                <p className="text-xs text-green-600">
                  Você pode reenviar em {cooldown} segundo{cooldown !== 1 ? 's' : ''}
                </p>
              </div>
            )}

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
                    disabled={isLoading || cooldown > 0}
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
                disabled={isLoading || cooldown > 0}
              >
                {isLoading 
                  ? 'Enviando...' 
                  : cooldown > 0 
                    ? `Aguarde ${cooldown}s` 
                    : 'Reenviar Email'}
              </Button>

              <p className="text-center text-sm text-neutral-600">
                Já verificou seu email?{' '}
                <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium underline">
                  Fazer login
                </Link>
              </p>
            </form>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

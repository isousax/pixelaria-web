import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { SEO } from '../../../shared/components/SEO';
import { useEmailVerification } from '../hooks/useEmailVerification';

export const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { confirmVerification, isLoading, error, success } = useEmailVerification();
  const hasVerified = useRef(false);

  useEffect(() => {
    if (token && !hasVerified.current) {
      hasVerified.current = true;
      confirmVerification({ token });
    }
  }, [token, confirmVerification]);

  if (!token) {
    return (
      <>
        <SEO title="Token Inválido - Pixelaria" description="O link de verificação de email é inválido" />
        <div className="min-h-screen bg-background-light flex items-center justify-center py-12 px-4">
          <Card padding="lg" className="max-w-md text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Token Inválido</h2>
            <p className="text-neutral-600 mb-6">
              O link de verificação é inválido. Solicite um novo email de verificação.
            </p>
            <Button as={Link} to="/resend-verification" variant="gradient" size="lg" className="w-full">
              Reenviar Email
            </Button>
          </Card>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <SEO title="Verificando Email - Pixelaria" description="Estamos verificando seu endereço de email" />
        <div className="min-h-screen bg-background-light flex items-center justify-center py-12 px-4">
          <Card padding="lg" className="max-w-md text-center">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Verificando...</h2>
            <p className="text-neutral-600">
              Aguarde enquanto verificamos seu email.
            </p>
          </Card>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SEO title="Erro na Verificação - Pixelaria" description="Não foi possível verificar seu email" />
        <div className="min-h-screen bg-background-light flex items-center justify-center py-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <Card padding="lg" className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Falha na Verificação</h2>
              <p className="text-neutral-600 mb-2">{error}</p>
              <p className="text-sm text-neutral-500 mb-6">
                O link pode ter expirado ou já foi usado. Solicite um novo email de verificação.
              </p>
              <div className="space-y-3">
                <Button as={Link} to="/resend-verification" variant="gradient" size="lg" className="w-full">
                  Reenviar Email
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

  if (success) {
    return (
      <>
        <SEO title="Email Verificado - Pixelaria" description="Sua conta foi verificada com sucesso" />
        <div className="min-h-screen bg-background-light flex items-center justify-center py-12 px-4">
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
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Email Verificado!</h2>
              <p className="text-neutral-600 mb-6">
                Sua conta foi verificada com sucesso. Agora você pode fazer login e começar a usar a plataforma.
              </p>
              <Button as={Link} to="/login" variant="gradient" size="lg" className="w-full">
                Fazer Login
              </Button>
            </Card>
          </motion.div>
        </div>
      </>
    );
  }

  return null;
};

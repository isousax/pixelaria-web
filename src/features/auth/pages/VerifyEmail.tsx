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
    const isTokenError = error.toLowerCase().includes('token') || error.toLowerCase().includes('inválido') || error.toLowerCase().includes('expirado');
    
    return (
      <>
        <SEO title="Erro na Verificação - Pixelaria" description="Não foi possível verificar seu email" />
        <div className="min-h-screen bg-background-light flex items-center justify-center py-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <Card padding="lg">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                  {isTokenError ? 'Link Expirado' : 'Falha na Verificação'}
                </h2>
                <p className="text-neutral-600 mb-2">{error}</p>
                {isTokenError && (
                  <p className="text-sm text-neutral-500">
                    Não se preocupe! Você pode solicitar um novo link de verificação abaixo.
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Button 
                  as={Link} 
                  to="/resend-verification" 
                  variant="gradient" 
                  size="lg" 
                  className="w-full"
                >
                  Solicitar Novo Link
                </Button>
                <Button 
                  as={Link} 
                  to="/login" 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                >
                  Ir para Login
                </Button>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>💡 Dica:</strong> Verifique sua caixa de spam. O email pode ter sido filtrado.
                </p>
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

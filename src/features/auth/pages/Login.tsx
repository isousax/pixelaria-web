import { motion } from 'framer-motion';
import { Card } from '../../../shared/components/ui/Card';
import { LoginForm } from '../components/LoginForm';
import { SEO } from '../../../shared/components/SEO';

export const Login = () => {
  return (
    <>
      <SEO 
        title="Login - Pixelaria"
        description="Acesse sua conta Pixelaria"
      />

      <div className="min-h-screen bg-background-light flex justify-center py-18 sm:py-30 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-neutral-900 mb-2">
              Bem-vindo de volta!
            </h1>
            <p className="text-neutral-600">
              Acesse sua conta para gerenciar seus sites
            </p>
          </div>

          <Card padding="lg">
            <LoginForm />
          </Card>
        </motion.div>
      </div>
    </>
  );
};

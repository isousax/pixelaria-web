import { motion } from 'framer-motion';
import { Card } from '../../../shared/components/ui/Card';
import { RegisterForm } from '../components/RegisterForm';
import { SEO } from '../../../shared/components/SEO';

export const Register = () => {
  return (
    <>
      <SEO 
        title="Criar Conta - Pixelaria"
        description="Crie sua conta na Pixelaria"
      />

      <div className="min-h-screen bg-background-light flex items-center justify-center py-18 sm:py-30 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-neutral-900 mb-2">
              Crie sua conta
            </h1>
            <p className="text-neutral-600">
              Comece a gerenciar seus sites hoje mesmo
            </p>
          </div>

          <Card padding="lg">
            <RegisterForm />
          </Card>
        </motion.div>
      </div>
    </>
  );
};

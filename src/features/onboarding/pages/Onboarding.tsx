import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Card } from '../../../shared/components/ui/Card';
import { Input } from '../../../shared/components/ui/Input';
import { Textarea } from '../../../shared/components/ui/Textarea';
import { Button } from '../../../shared/components/ui/Button';
import { useToast } from '../../../shared/hooks/useToast';
import { useNavigate } from 'react-router-dom';

interface OnboardingFormData {
  projectName?: string;
  projectType?: string;
  businessDescription?: string;
  objectives?: string;
  targetAudience?: string;
  pages?: string;
  contentNotes?: string;
  requiredFeatures?: string;
  referenceWebsites?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  additionalNotes?: string;
}

export const Onboarding = () => {
  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem('onboarding-step');
    return savedStep ? parseInt(savedStep) : 1;
  });
  
  const totalSteps = 5;
  
  const getSavedData = (): OnboardingFormData => {
    const savedData = localStorage.getItem('onboarding-data');
    return savedData ? JSON.parse(savedData) : {};
  };

  const { register, handleSubmit, formState: { errors }, getValues } = useForm<OnboardingFormData>({
    defaultValues: getSavedData()
  });
  
  const toast = useToast();
  const navigate = useNavigate();

  // Auto-save form data when changing steps
  const saveFormData = () => {
    const data = getValues();
    localStorage.setItem('onboarding-data', JSON.stringify(data));
  };

  const nextStep = () => {
    if (step < totalSteps) {
      saveFormData();
      const newStep = step + 1;
      setStep(newStep);
      localStorage.setItem('onboarding-step', newStep.toString());
    }
  };

  const prevStep = () => {
    if (step > 1) {
      saveFormData();
      const newStep = step - 1;
      setStep(newStep);
      localStorage.setItem('onboarding-step', newStep.toString());
    }
  };

  const onSubmit = (data: unknown) => {
    console.log('Onboarding data:', data);
    toast.success('Briefing recebido! Entraremos em contato em breve.');
    // Clear saved data after submission
    localStorage.removeItem('onboarding-data');
    localStorage.removeItem('onboarding-step');
    setTimeout(() => navigate('/'), 2000);
  };

  const steps = [
    { number: 1, title: 'Informações Básicas' },
    { number: 2, title: 'Objetivos' },
    { number: 3, title: 'Conteúdo' },
    { number: 4, title: 'Funcionalidades' },
    { number: 5, title: 'Contato' },
  ];

  return (
    <div className="bg-background-light py-20">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="section-title">Briefing do Projeto</h1>
          <p className="section-subtitle mx-auto">
            Nos conte sobre seu projeto em {totalSteps} passos simples
          </p>
          {localStorage.getItem('onboarding-data') && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-sm text-neutral-600">✓ Progresso salvo automaticamente</span>
              <button
                onClick={() => {
                  if (confirm('Deseja limpar o formulário e começar do zero?')) {
                    localStorage.removeItem('onboarding-data');
                    localStorage.removeItem('onboarding-step');
                    window.location.reload();
                  }
                }}
                className="text-sm text-primary-600 hover:text-primary-700 underline"
              >
                Limpar
              </button>
            </div>
          )}
        </motion.div>

        {/* Progress */}
        <div className="mb-12">
          <div className="flex justify-between mb-4">
            {steps.map((s) => (
              <div key={s.number} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step >= s.number
                      ? 'bg-primary-600'
                      : 'bg-neutral-200 text-neutral-500'
                  }`}
                >
                  {step > s.number ? <Check className="w-5 h-5" /> : s.number}
                </div>
                <span className="text-xs mt-2 text-neutral-600 text-center max-w-20">
                  {s.title}
                </span>
              </div>
            ))}
          </div>
          <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary-600"
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Card padding="lg">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold mb-6">Informações Básicas</h2>
                  <Input
                    label="Nome do Projeto"
                    {...register('projectName', { required: true })}
                    error={errors.projectName && 'Campo obrigatório'}
                  />
                  <Input
                    label="Tipo de Site"
                    placeholder="Ex: Site institucional, E-commerce, Landing page"
                    {...register('projectType', { required: true })}
                    error={errors.projectType && 'Campo obrigatório'}
                  />
                  <Textarea
                    label="Descrição do Negócio"
                    {...register('businessDescription', { required: true })}
                    error={errors.businessDescription && 'Campo obrigatório'}
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold mb-6">Objetivos do Projeto</h2>
                  <Textarea
                    label="Quais são seus objetivos?"
                    placeholder="Ex: Gerar leads, vender produtos, divulgar serviços..."
                    {...register('objectives')}
                  />
                  <Textarea
                    label="Público-alvo"
                    placeholder="Descreva seu público-alvo..."
                    {...register('targetAudience')}
                  />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold mb-6">Conteúdo do Site</h2>
                  <Textarea
                    label="Páginas necessárias"
                    placeholder="Ex: Home, Sobre, Serviços, Contato..."
                    {...register('pages')}
                  />
                  <Textarea
                    label="Já possui conteúdo pronto?"
                    placeholder="Descreva o conteúdo que já tem..."
                    {...register('contentNotes')}
                  />
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold mb-6">Funcionalidades</h2>
                  <Textarea
                    label="Funcionalidades desejadas"
                    placeholder="Ex: Formulário de contato, Chat, Agendamento..."
                    {...register('requiredFeatures')}
                  />
                  <Textarea
                    label="Sites de referência"
                    placeholder="Cole links de sites que você gosta..."
                    {...register('referenceWebsites')}
                  />
                </motion.div>
              )}

              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold mb-6">Informações de Contato</h2>
                  <Input
                    label="Seu Nome"
                    {...register('contactName', { required: true })}
                    error={errors.contactName && 'Campo obrigatório'}
                  />
                  <Input
                    label="E-mail"
                    type="email"
                    {...register('contactEmail', { required: true })}
                    error={errors.contactEmail && 'Campo obrigatório'}
                  />
                  <Input
                    label="Telefone/WhatsApp"
                    {...register('contactPhone', { required: true })}
                    error={errors.contactPhone && 'Campo obrigatório'}
                  />
                  <Textarea
                    label="Observações adicionais"
                    {...register('additionalNotes')}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-8 pt-6 border-t gap-5">
              <Button
                type="button"
                onClick={prevStep}
                variant="secondary"
                disabled={step === 1}
                leftIcon={<ChevronLeft className="w-5 h-5" />}
              >
                Voltar
              </Button>
              
              {step < totalSteps ? (
                <Button 
                  type="button" 
                  onClick={nextStep}
                  rightIcon={<ChevronRight className="w-5 h-5" />}
                >
                  Próximo
                </Button>
              ) : (
                <Button 
                  type="submit"
                  rightIcon={<Check className="w-5 h-5" />}
                >
                  Enviar Briefing
                </Button>
              )}
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
};

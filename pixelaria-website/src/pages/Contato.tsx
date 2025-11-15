import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { useToast } from '../hooks/useToast';
import { createWhatsAppLink, whatsAppMessages } from '../utils/helpers';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const Contato = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>();
  const toast = useToast();

  const onSubmit = (data: ContactForm) => {
    console.log('Contact form:', data);
    toast.success('Mensagem enviada com sucesso! Retornaremos em breve.');
    reset();
  };

  return (
    <div className="bg-background-light py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="section-title">Entre em Contato</h1>
          <p className="section-subtitle mx-auto">
            Estamos aqui para tirar suas dúvidas e criar seu projeto
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Fale Conosco</h2>
            <div className="space-y-6 mb-8">
              <Card padding="md" className="flex items-start gap-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">WhatsApp</h3>
                  <p className="text-neutral-600">(11) 99999-9999</p>
                </div>
              </Card>
              
              <Card padding="md" className="flex items-start gap-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">E-mail</h3>
                  <p className="text-neutral-600">contato@pixelaria.com.br</p>
                </div>
              </Card>
              
              <Card padding="md" className="flex items-start gap-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Localização</h3>
                  <p className="text-neutral-600">São Paulo, SP - Brasil</p>
                </div>
              </Card>
            </div>

            <Button
              onClick={() => window.open(createWhatsAppLink(whatsAppMessages.general), '_blank')}
              fullWidth
              size="lg"
            >
              <MessageSquare className="w-5 h-5" />
              Conversar no WhatsApp
            </Button>
          </div>

          {/* Contact Form */}
          <Card padding="lg">
            <h2 className="text-2xl font-bold mb-6">Envie uma Mensagem</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Nome"
                {...register('name', { required: 'Nome é obrigatório' })}
                error={errors.name?.message}
              />
              
              <Input
                label="E-mail"
                type="email"
                {...register('email', {
                  required: 'E-mail é obrigatório',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'E-mail inválido',
                  },
                })}
                error={errors.email?.message}
              />
              
              <Input
                label="Telefone"
                {...register('phone', { required: 'Telefone é obrigatório' })}
                error={errors.phone?.message}
              />
              
              <Input
                label="Assunto"
                {...register('subject', { required: 'Assunto é obrigatório' })}
                error={errors.subject?.message}
              />
              
              <Textarea
                label="Mensagem"
                rows={5}
                {...register('message', { required: 'Mensagem é obrigatória' })}
                error={errors.message?.message}
              />
              
              <Button type="submit" fullWidth size="lg">
                Enviar Mensagem
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

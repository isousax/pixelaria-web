import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Clock, Send, CheckCircle2, ChevronDown, Instagram, Facebook, Linkedin, Youtube, Globe, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { SEO } from '../components/SEO';
import { useToast } from '../hooks/useToast';
import { createWhatsAppLink, whatsAppMessages } from '../utils/helpers';
import { PAGE_SEO, SCHEMAS } from '../utils/seo';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// Contact methods
const contactMethods = [
  {
    icon: MessageSquare,
    title: 'WhatsApp',
    description: 'Resposta em minutos',
    info: '(11) 99999-9999',
    action: 'Abrir WhatsApp',
    link: createWhatsAppLink(whatsAppMessages.general),
    color: 'green',
    available: true,
  },
  {
    icon: Mail,
    title: 'E-mail',
    description: 'Resposta em até 24h',
    info: 'contato@pixelaria.com.br',
    action: 'Enviar E-mail',
    link: 'mailto:contato@pixelaria.com.br',
    color: 'blue',
    available: true,
  },
  {
    icon: Phone,
    title: 'Telefone',
    description: 'Seg-Sex, 9h-18h',
    info: '(11) 3333-4444',
    action: 'Ligar Agora',
    link: 'tel:+551133334444',
    color: 'purple',
    available: true,
  },
];

// Social media
const socialMedia = [
  { icon: Instagram, name: 'Instagram', link: 'https://instagram.com/pixelaria', handle: '@pixelaria' },
  { icon: Facebook, name: 'Facebook', link: 'https://facebook.com/pixelaria', handle: '/pixelaria' },
  { icon: Linkedin, name: 'LinkedIn', link: 'https://linkedin.com/company/pixelaria', handle: '/pixelaria' },
  { icon: Youtube, name: 'YouTube', link: 'https://youtube.com/@pixelaria', handle: '@pixelaria' },
];

// Business hours
const businessHours = [
  { day: 'Segunda a Sexta', hours: '9:00 - 18:00', available: true },
  { day: 'Sábado', hours: '9:00 - 13:00', available: true },
  { day: 'Domingo', hours: 'Fechado', available: false },
];

// Quick FAQs
const quickFaqs = [
  {
    question: 'Qual o prazo médio de resposta?',
    answer: 'Respondemos via WhatsApp em minutos e por e-mail em até 24 horas úteis.',
  },
  {
    question: 'Fazem atendimento presencial?',
    answer: 'Nosso atendimento é 100% online, o que nos permite oferecer preços mais competitivos e atender clientes de todo o Brasil.',
  },
  {
    question: 'Como funciona a primeira consulta?',
    answer: 'A primeira consulta é gratuita! Entre em contato e vamos entender suas necessidades para criar uma proposta personalizada.',
  },
];

export const Contato = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>();
  const toast = useToast();
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    console.log('Contact form:', data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Mensagem enviada com sucesso! Retornaremos em breve.');
    reset();
    setIsSubmitting(false);
  };

  return (
    <>
      <SEO
        title={PAGE_SEO.contato.title}
        description={PAGE_SEO.contato.description}
        canonical={PAGE_SEO.contato.canonical}
        keywords={PAGE_SEO.contato.keywords}
        schema={SCHEMAS.organization}
      />
      
      <div className="bg-neutral-50">
        {/* Hero Section */}
      <section className="relative bg-linear-to-br from-primary-600 to-secondary-600 py-20 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
          />
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="default" size="lg" className="mb-6 bg-white/20 text-white border-white/30">
              <MessageSquare className="w-4 h-4" />
              Fale Conosco
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-black mb-6">Entre em Contato</h1>
            <p className="text-xl text-white/90 mb-8">
              Estamos aqui para tirar suas dúvidas e criar seu projeto. <br />
              Escolha a forma de contato que preferir!
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-custom py-16">
        {/* Contact Methods */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-neutral-900 mb-4">Como Prefere Falar Conosco?</h2>
            <p className="text-xl text-neutral-600">
              Múltiplos canais para sua conveniência
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover="lift" padding="lg" className="h-full text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-${method.color}-100 rounded-2xl flex items-center justify-center`}>
                    <method.icon className={`w-8 h-8 text-${method.color}-600`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-neutral-900">{method.title}</h3>
                  <p className="text-sm text-neutral-600 mb-3">{method.description}</p>
                  <p className="text-lg font-semibold text-neutral-900 mb-4">{method.info}</p>
                  <Button
                    variant={index === 0 ? 'gradient' : 'primary'}
                    fullWidth
                    onClick={() => window.open(method.link, '_blank')}
                  >
                    {method.action}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card variant="elevated" padding="lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-6 h-6" />
                  Envie uma Mensagem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Nome Completo"
                      placeholder="João Silva"
                      {...register('name', { required: 'Nome é obrigatório' })}
                      error={errors.name?.message}
                      leftIcon={<Globe className="w-5 h-5" />}
                    />
                    
                    <Input
                      label="Telefone/WhatsApp"
                      placeholder="(11) 99999-9999"
                      {...register('phone', { required: 'Telefone é obrigatório' })}
                      error={errors.phone?.message}
                      leftIcon={<Phone className="w-5 h-5" />}
                    />
                  </div>
                  
                  <Input
                    label="E-mail"
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    {...register('email', {
                      required: 'E-mail é obrigatório',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'E-mail inválido',
                      },
                    })}
                    error={errors.email?.message}
                    leftIcon={<Mail className="w-5 h-5" />}
                  />
                  
                  <Input
                    label="Assunto"
                    placeholder="Sobre o que você quer falar?"
                    {...register('subject', { required: 'Assunto é obrigatório' })}
                    error={errors.subject?.message}
                  />
                  
                  <Textarea
                    label="Mensagem"
                    placeholder="Conte-nos sobre seu projeto ou dúvida..."
                    rows={6}
                    {...register('message', { required: 'Mensagem é obrigatória' })}
                    error={errors.message?.message}
                  />
                  
                  <Button
                    type="submit"
                    variant="gradient"
                    fullWidth
                    size="lg"
                    disabled={isSubmitting}
                    leftIcon={isSubmitting ? undefined : <Send className="w-5 h-5" />}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Business Hours */}
            <Card variant="elevated" padding="lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-6 h-6" />
                  Horário de Atendimento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {businessHours.map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <span className="font-medium text-neutral-900">{schedule.day}</span>
                      <Badge variant={schedule.available ? 'success' : 'default'}>
                        {schedule.hours}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-semibold">WhatsApp: 24/7 disponível</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card variant="gradient" padding="lg" className="text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-6 h-6" />
                  Nossa Localização
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/90 mb-4">
                  <strong>São Paulo, SP - Brasil</strong>
                  <br />
                  Atendimento 100% online para todo o país
                </p>
                <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                  <p className="text-sm">
                    🌎 Atendemos clientes de <strong>todo o Brasil</strong> com a mesma qualidade e eficiência
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card variant="bordered" padding="lg">
              <CardHeader>
                <CardTitle>Redes Sociais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {socialMedia.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 hover:scale-105 transition-all"
                    >
                      <social.icon className="w-6 h-6 text-primary-600" />
                      <span className="text-xs font-medium text-neutral-700">{social.name}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick FAQs */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-neutral-900 mb-4">Perguntas Rápidas</h2>
            <p className="text-xl text-neutral-600">
              Dúvidas comuns sobre nosso atendimento
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {quickFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card variant="bordered" padding="none" className="overflow-hidden hover:border-primary-300 transition-colors">
                  <button
                    onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-neutral-50 transition-colors"
                  >
                    <span className="font-bold text-lg text-neutral-900 flex-1">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: faqOpen === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0"
                    >
                      <ChevronDown className="w-6 h-6 text-primary-600" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {faqOpen === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-2 text-neutral-700 leading-relaxed border-t border-neutral-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-br from-primary-600 to-secondary-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              Preferir falar agora pelo WhatsApp?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Nosso time está online e pronto para te atender
            </p>
            <Button
              variant="secondary"
              size="xl"
              leftIcon={<MessageSquare className="w-6 h-6" />}
              onClick={() => window.open(createWhatsAppLink(whatsAppMessages.general), '_blank')}
            >
              Abrir WhatsApp Agora
            </Button>
          </motion.div>
        </div>
      </section>
      </div>
    </>
  );
};

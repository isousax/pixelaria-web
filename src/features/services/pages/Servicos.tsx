import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Badge } from '../../../shared/components/ui/Badge';
import { SEO } from '../../../shared/components/SEO';
import { services } from '../../../data/services';
import * as Icons from 'lucide-react';
import { Check, X, ChevronDown, ChevronUp, MessageCircle, Clock, DollarSign, Sparkles } from 'lucide-react';
import { createWhatsAppLink, whatsAppMessages } from '../../../shared/utils/helpers';
import { PAGE_SEO, SCHEMAS } from '../../../config/seo';

// Enhanced service data with pricing and process
const enhancedServices = [
  {
    ...services[0], // Criação de Sites
    price: 'A partir de R$ 90',
    priceRecurring: 'R$ 90/mês (manutenção)',
    duration: '15 dias úteis',
    included: [
      'Design profissional e responsivo',
      'Páginas customizadas',
      'Otimização SEO',
      'Conteúdo (textos e imagens)',
      'Integração com redes sociais',
      'Formulários de contato',
      'Integrações com APIs externas',
      'Google Analytics configurado',
      'Certificado SSL incluído',
      'Funcionalidades customizadas',
      'E-commerce avançado',
      'Hospedagem (cobrada separadamente)',
      '3 rodadas de revisão',
    ],
    notIncluded: [
      'Domínio personalizado',
    ],
    process: [
      { step: 'Briefing', description: 'Entendemos suas necessidades e objetivos', duration: '1 dia' },
      { step: 'Planejamento', description: 'Criamos a estrutura e wireframes', duration: '2 dias' },
      { step: 'Design', description: 'Desenvolvemos o visual do site', duration: '4 dias' },
      { step: 'Desenvolvimento', description: 'Codificamos e integramos funcionalidades', duration: '5 dias' },
      { step: 'Testes', description: 'Testamos em diferentes dispositivos', duration: '2 dias' },
      { step: 'Lançamento', description: 'Publicamos seu site no ar', duration: '1 dia' },
    ],
    color: 'blue',
  },
  {
    ...services[1], // Manutenção
    price: '- (já incluso)',
    priceRecurring: null,
    duration: 'Contínuo',
    included: [
      'Backups diários automatizados',
      'Atualizações de segurança semanais',
      'Monitoramento de uptime 24/7',
      'Correção de bugs ilimitada',
      'Otimização de performance mensal',
      'Suporte técnico prioritário',
      'Relatórios mensais detalhados',
      'Hospedagem inclusa',
    ],
    notIncluded: [
      'Mudanças de design',
      'Desenvolvimento de novas funcionalidades',
      'Criação de novo conteúdo',
      'Marketing digital',
      'Consultoria estratégica',
      'Treinamento de equipe',
    ],
    process: [
      { step: 'Configuração', description: 'Setup de backups e monitoramento', duration: 'Imediato' },
      { step: 'Monitoramento', description: 'Vigilância contínua de performance', duration: 'Contínuo' },
      { step: 'Updates', description: 'Aplicação de atualizações semanais', duration: 'Semanal' },
      { step: 'Relatórios', description: 'Envio de relatórios de saúde', duration: 'Mensal' },
    ],
    color: 'green',
  },
  {
    ...services[2], // SEO
    price: 'R$ 350',
    priceRecurring: null,
    duration: 'Mínimo 3 meses',
    included: [
      'Auditoria SEO completa',
      'Pesquisa de palavras-chave estratégica',
      'Otimização on-page de até 10 páginas',
      'Melhorias técnicas de SEO',
      'Otimização de velocidade',
      'Schema markup implementado',
      'Relatórios mensais com métricas',
      'Suporte e consultoria',
    ],
    notIncluded: [
      'Link building externo',
      'Criação de conteúdo novo',
      'Gerenciamento de Google Ads',
      'SEO internacional',
      'Recuperação de penalizações',
      'Monitoramento de concorrentes',
    ],
    process: [
      { step: 'Auditoria', description: 'Análise completa do site atual', duration: '3 dias' },
      { step: 'Estratégia', description: 'Definição de palavras-chave e plano', duration: '2 dias' },
      { step: 'Otimização', description: 'Implementação das melhorias', duration: '5 dias' },
      { step: 'Monitoramento', description: 'Acompanhamento de resultados', duration: 'Contínuo' },
    ],
    color: 'purple',
  },
  {
    ...services[3], // Conteúdo
    price: 'R$ 350',
    priceRecurring: null,
    duration: 'Por pacote',
    included: [
      'Até 4 páginas de conteúdo',
      'Redação profissional otimizada',
      'Seleção de imagens de banco (até 10)',
      'Copywriting persuasivo',
      'Revisão e edição incluídas',
      'SEO aplicado ao conteúdo',
      'Estratégia de conteúdo',
      '2 rodadas de ajustes',
    ],
    notIncluded: [
      'Fotografia profissional',
      'Produção de vídeos',
      'Design gráfico avançado',
      'Tradução de conteúdo',
      'Criação de infográficos',
      'Gestão de redes sociais',
    ],
    process: [
      { step: 'Briefing', description: 'Entendemos o tom e objetivos', duration: '1 dia' },
      { step: 'Pesquisa', description: 'Pesquisamos o tema e concorrentes', duration: '2 dias' },
      { step: 'Redação', description: 'Criamos o conteúdo otimizado', duration: '3 dias' },
      { step: 'Revisão', description: 'Ajustamos conforme feedback', duration: '1 dia' },
      { step: 'Publicação', description: 'Inserimos no site com formatação', duration: '1 dia' },
    ],
    color: 'orange',
  },
];

export const Servicos = () => {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setExpandedService(expandedService === id ? null : id);
  };

  return (
    <>
      <SEO
        title={PAGE_SEO.servicos.title}
        description={PAGE_SEO.servicos.description}
        canonical={PAGE_SEO.servicos.canonical}
        keywords={PAGE_SEO.servicos.keywords}
        schema={SCHEMAS.service}
      />
      
      <div className="bg-neutral-50">
        {/* Hero Section */}
      <section className="relative bg-linear-to-br from-primary-600 to-secondary-600 py-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"
          />
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="default" size="lg" className="mb-6 bg-white/20 border-white/30">
              <Sparkles className="w-4 h-4" />
              Serviços Completos
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-black mb-6">Nossos Serviços</h1>
            <p className="text-xl mb-8">
              Soluções completas para criar, manter e otimizar sua presença digital. <br />
              Preços transparentes e processos bem definidos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-8">
        <div className="container-custom">
          <div className="space-y-8">
            {enhancedServices.map((service, index) => {
              const IconComponent = Icons[service.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
              const isExpanded = expandedService === service.id;
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="elevated" padding="none" className="overflow-hidden">
                    {/* Service Header */}
                    <div className={`bg-${service.color}-50 p-8`}>
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex items-start gap-6">
                          <div className={`hidden lg:flex bg-${service.color}-100 w-16 h-16 rounded-2xl items-center justify-center text-${service.color}-600 shrink-0`}>
                            {IconComponent && <IconComponent className="w-8 h-8" />}
                          </div>
                          <div>
                            <h2 className="text-3xl font-bold mb-2 text-neutral-900">{service.name}</h2>
                            <p className="text-neutral-600 text-lg mb-4">{service.description}</p>
                            <div className="flex flex-wrap gap-3">
                              <Badge variant="default" size="md">
                                <DollarSign className="w-4 h-4" />
                                {service.price}
                              </Badge>
                              <Badge variant="default" size="md">
                                <Clock className="w-4 h-4" />
                                {service.duration}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-3 shrink-0">
                          <Button
                            variant="gradient"
                            size="lg"
                            leftIcon={<MessageCircle className="w-5 h-5" />}
                            onClick={() => window.open(createWhatsAppLink(whatsAppMessages.quote), '_blank')}
                          >
                            Contratar Agora
                          </Button>
                          <Button
                            variant="outline"
                            size="lg"
                            rightIcon={isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            onClick={() => toggleService(service.id)}
                          >
                            {isExpanded ? 'Ver Menos' : 'Ver Detalhes'}
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Expanded Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-8 bg-white border-t border-neutral-200">
                            <div className="grid lg:grid-cols-3 gap-8 mb-8">
                              {/* What's Included */}
                              <Card variant="bordered" padding="lg">
                                <h3 className="text-xl font-bold mb-4 text-green-700 flex items-center gap-2">
                                  <Check className="w-6 h-6" />
                                  O que está incluso
                                </h3>
                                <ul className="space-y-3">
                                  {service.included.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                      <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                                      <span className="text-neutral-700">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </Card>
                              
                              {/* What's NOT Included */}
                              <Card variant="bordered" padding="lg">
                                <h3 className="text-xl font-bold mb-4 text-red-700 flex items-center gap-2">
                                  <X className="w-6 h-6" />
                                  O que NÃO está incluso
                                </h3>
                                <ul className="space-y-3">
                                  {service.notIncluded.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                      <X className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                                      <span className="text-neutral-700">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </Card>
                              
                              {/* Process Timeline */}
                              <Card variant="gradient" padding="lg">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                  <Clock className="w-6 h-6" />
                                  Processo
                                </h3>
                                <div className="space-y-4">
                                  {service.process.map((step, idx) => (
                                    <div key={idx} className="relative pl-6 border-l-2 border-white/30 pb-4 last:pb-0">
                                      <div className="absolute -left-2 top-0 w-4 h-4 bg-white rounded-full" />
                                      <div className="text-sm mb-1 text-black">{step.step}</div>
                                      <div className="font-semibold mb-1 text-black">{step.description}</div>
                                      <Badge variant="default" size="sm" className="bg-white/20 border-white/30">
                                        {step.duration}
                                      </Badge>
                                    </div>
                                  ))}
                                </div>
                              </Card>
                            </div>
                            
                            {/* Features Grid */}
                            <div className="border-t border-neutral-200 pt-8">
                              <h3 className="text-xl font-bold mb-6 text-neutral-900">Funcionalidades Detalhadas</h3>
                              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {service.features.map((feature, idx) => (
                                  <div key={idx} className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
                                    <div className={`w-2 h-2 bg-${service.color}-600 rounded-full shrink-0`} />
                                    <span className="text-neutral-700 font-medium">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-br from-primary-600 to-secondary-600">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              Pronto para começar?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Entre em contato agora e descubra como podemos ajudar sua empresa a crescer online
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="xl"
                leftIcon={<MessageCircle className="w-6 h-6" />}
                onClick={() => window.open(createWhatsAppLink(whatsAppMessages.quote), '_blank')}
              >
                Falar no WhatsApp
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="bg-white/10 backdrop-blur-sm border-2 border-white hover:bg-white hover:text-primary-600"
                onClick={() => window.location.href = '/onboarding'}
              >
                Iniciar Briefing Online
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </>
  );
};

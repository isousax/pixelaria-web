import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Code2, Zap, Shield, HeadphonesIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { pricingPlans } from '../mocks/pricing';
import { createWhatsAppLink, whatsAppMessages, formatCurrency } from '../utils/helpers';
import { useState } from 'react';

export const Home = () => {
  const [pricingType, setPricingType] = useState<'subscription' | 'one-time'>('subscription');

  const selectedPlan = pricingPlans.find(p => p.type === pricingType);

  const benefits = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: 'Tecnologia Moderna',
      description: 'Desenvolvemos com React, TypeScript e as tecnologias mais atuais do mercado.',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Entrega Rápida',
      description: 'Seu site no ar em até 15 dias úteis, com qualidade e profissionalismo.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Segurança Garantida',
      description: 'Backups automáticos, SSL e monitoramento 24/7 para sua tranquilidade.',
    },
    {
      icon: <HeadphonesIcon className="w-6 h-6" />,
      title: 'Suporte Dedicado',
      description: 'Atendimento rápido via WhatsApp sempre que você precisar.',
    },
  ];

  const comparisonFeatures = [
    { feature: 'Site profissional completo', subscription: true, oneTime: true },
    { feature: 'Design responsivo', subscription: true, oneTime: true },
    { feature: 'Hospedagem inclusa', subscription: true, oneTime: false },
    { feature: 'Backups diários automáticos', subscription: true, oneTime: false },
    { feature: 'Atualizações de segurança', subscription: true, oneTime: false },
    { feature: 'Suporte técnico contínuo', subscription: true, oneTime: false },
    { feature: '1 alteração/mês inclusa', subscription: true, oneTime: false },
    { feature: 'Código-fonte entregue', subscription: false, oneTime: true },
    { feature: 'Documentação técnica', subscription: false, oneTime: true },
    { feature: 'Propriedade total', subscription: false, oneTime: true },
  ];

  return (
    <div className="bg-background-light">
      {/* Hero Section */}
      <section className="container-custom py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
              Seu site profissional
              <span className="text-primary-600"> por apenas R$90/mês</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8">
              Criação, hospedagem e manutenção inclusos. Ou compre o código-fonte e tenha total propriedade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => window.open(createWhatsAppLink(whatsAppMessages.general), '_blank')}
                size="lg"
              >
                Falar com Especialista
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button as={Link} to="/onboarding" variant="secondary" size="lg">
                Começar Agora
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
              alt="Desenvolvimento web"
              className="rounded-2xl shadow-soft-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Escolha o Modelo Ideal para Você</h2>
            <p className="section-subtitle mx-auto">
              Flexibilidade para atender suas necessidades específicas
            </p>
          </div>

          {/* Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-neutral-100 p-1 rounded-lg inline-flex">
              <button
                onClick={() => setPricingType('subscription')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  pricingType === 'subscription'
                    ? 'bg-white shadow-soft text-primary-600'
                    : 'text-neutral-600'
                }`}
              >
                Assinatura Mensal
              </button>
              <button
                onClick={() => setPricingType('one-time')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  pricingType === 'one-time'
                    ? 'bg-white shadow-soft text-primary-600'
                    : 'text-neutral-600'
                }`}
              >
                Compra Única
              </button>
            </div>
          </div>

          {/* Pricing Card */}
          {selectedPlan && (
            <motion.div
              key={pricingType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <Card padding="lg" className="text-center">
                <h3 className="text-3xl font-bold mb-2">{selectedPlan.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-primary-600">
                    {formatCurrency(selectedPlan.price)}
                  </span>
                  {pricingType === 'subscription' && (
                    <span className="text-neutral-600">/mês</span>
                  )}
                </div>
                <ul className="space-y-3 mb-8 text-left max-w-md mx-auto">
                  {selectedPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() =>
                      window.open(
                        createWhatsAppLink(
                          pricingType === 'subscription'
                            ? whatsAppMessages.subscription
                            : whatsAppMessages.oneTime
                        ),
                        '_blank'
                      )
                    }
                    size="lg"
                  >
                    Contratar via WhatsApp
                  </Button>
                  <Button as={Link} to={selectedPlan.ctaLink} variant="secondary" size="lg">
                    {selectedPlan.ctaText}
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Comparison Table */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8">Compare os Modelos</h3>
            <div className="max-w-4xl mx-auto overflow-x-auto">
              <table className="w-full bg-white rounded-2xl shadow-soft overflow-hidden">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-neutral-900 font-semibold">
                      Recurso
                    </th>
                    <th className="px-6 py-4 text-center text-neutral-900 font-semibold">
                      Assinatura
                    </th>
                    <th className="px-6 py-4 text-center text-neutral-900 font-semibold">
                      Compra Única
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((item, index) => (
                    <tr key={index} className="border-t border-neutral-100">
                      <td className="px-6 py-4 text-neutral-700">{item.feature}</td>
                      <td className="px-6 py-4 text-center">
                        {item.subscription ? (
                          <Check className="w-5 h-5 text-green-600 mx-auto" />
                        ) : (
                          <span className="text-neutral-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {item.oneTime ? (
                          <Check className="w-5 h-5 text-green-600 mx-auto" />
                        ) : (
                          <span className="text-neutral-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container-custom py-20">
        <div className="text-center mb-12">
          <h2 className="section-title">Por que escolher a Pixelaria?</h2>
          <p className="section-subtitle mx-auto">
            Tecnologia, qualidade e suporte que você pode confiar
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card hover padding="lg" className="text-center h-full">
                <div className="bg-primary-100 w-14 h-14 rounded-xl flex items-center justify-center text-primary-600 mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-neutral-600">{benefit.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-20">
        <div className="container-custom text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Pronto para começar seu projeto?
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Entre em contato agora e receba uma proposta personalizada em até 24 horas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.open(createWhatsAppLink(whatsAppMessages.quote), '_blank')}
              variant="secondary"
              size="lg"
            >
              Falar no WhatsApp
            </Button>
            <Button
              as={Link}
              to="/onboarding"
              variant="outline"
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white hover:text-primary-600"
            >
              Iniciar Briefing Online
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

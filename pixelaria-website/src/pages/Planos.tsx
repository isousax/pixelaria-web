import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { pricingPlans, additionalServices } from '../mocks/pricing';
import { formatCurrency, createWhatsAppLink, whatsAppMessages } from '../utils/helpers';

export const Planos = () => {
  return (
    <div className="bg-background-light py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="section-title">Planos e Preços</h1>
          <p className="section-subtitle mx-auto">
            Escolha o modelo que melhor se adapta às suas necessidades
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                padding="lg"
                className={`h-full ${plan.popular ? 'ring-2 ring-primary-600' : ''}`}
              >
                {plan.popular && (
                  <div className="bg-primary-600 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                    Mais Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-primary-600">
                    {formatCurrency(plan.price)}
                  </span>
                  {plan.type === 'subscription' && (
                    <span className="text-neutral-600">/mês</span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={() =>
                      window.open(
                        createWhatsAppLink(
                          plan.type === 'subscription'
                            ? whatsAppMessages.subscription
                            : whatsAppMessages.oneTime
                        ),
                        '_blank'
                      )
                    }
                    fullWidth
                  >
                    Contratar via WhatsApp
                  </Button>
                  <Button
                    as={Link}
                    to={plan.ctaLink}
                    variant="secondary"
                    fullWidth
                  >
                    {plan.ctaText}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Serviços Adicionais</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card padding="md">
                  <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                  <p className="text-neutral-600 text-sm mb-3">{service.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-primary-600">
                      {formatCurrency(service.price)}
                    </span>
                    <span className="text-neutral-600 text-sm">/{service.unit}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

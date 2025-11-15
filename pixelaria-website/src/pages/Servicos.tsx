import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { services } from '../mocks/services';
import * as Icons from 'lucide-react';

export const Servicos = () => {
  return (
    <div className="bg-background-light py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="section-title">Nossos Serviços</h1>
          <p className="section-subtitle mx-auto">
            Soluções completas para sua presença digital
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const IconComponent = Icons[service.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card padding="lg" className="h-full">
                  <div className="bg-primary-100 w-14 h-14 rounded-xl flex items-center justify-center text-primary-600 mb-4">
                    {IconComponent && <IconComponent className="w-7 h-7" />}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{service.name}</h3>
                  <p className="text-neutral-600 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-neutral-700">
                        <div className="w-1.5 h-1.5 bg-primary-600 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

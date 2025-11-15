import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { processSteps } from '../mocks/process';
import * as Icons from 'lucide-react';

export const Processo = () => {
  return (
    <div className="bg-background-light py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="section-title">Nosso Processo</h1>
          <p className="section-subtitle mx-auto">
            Do briefing ao lançamento, um processo transparente e eficiente
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {processSteps.map((step, index) => {
            const IconComponent = Icons[step.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
            
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative mb-8 last:mb-0"
              >
                <Card padding="lg" className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="bg-primary-600 w-16 h-16 rounded-xl flex items-center justify-center text-white">
                      {IconComponent && <IconComponent className="w-8 h-8" />}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-primary-100 text-primary-600 font-bold px-3 py-1 rounded-full text-sm">
                        Etapa {step.id}
                      </span>
                      <span className="text-neutral-600 text-sm">{step.duration}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                    <p className="text-neutral-700">{step.description}</p>
                  </div>
                </Card>
                
                {index < processSteps.length - 1 && (
                  <div className="w-1 h-8 bg-primary-200 mx-8 my-2" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

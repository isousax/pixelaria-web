import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { processSteps } from '../mocks/process';
import * as Icons from 'lucide-react';
import { ChevronDown, Clock, CheckCircle2, Circle, Target, TrendingUp, Sparkles, Calendar } from 'lucide-react';

// Enhanced process data with checklists
const enhancedSteps = processSteps.map((step) => {
  const checklists: Record<number, string[]> = {
    1: ['Preenchimento do briefing online', 'Reunião de alinhamento (opcional)', 'Definição de objetivos e KPIs', 'Análise de concorrentes'],
    2: ['Criação do sitemap', 'Definição de funcionalidades', 'Wireframes das páginas', 'Aprovação da estrutura'],
    3: ['Estudo da identidade visual', 'Criação de mockups', 'Escolha de cores e tipografia', 'Aprovação do design'],
    4: ['Setup do ambiente', 'Desenvolvimento front-end', 'Integração de funcionalidades', 'Testes de responsividade'],
    5: ['Apresentação do site', 'Coleta de feedback', 'Implementação de ajustes', 'Aprovação final'],
    6: ['Configuração de DNS', 'Deploy em produção', 'Configuração de SSL', 'Otimização final de SEO'],
    7: ['Monitoramento de performance', 'Suporte técnico contínuo', 'Backups automáticos', 'Relatórios mensais'],
  };
  
  return {
    ...step,
    checklist: checklists[step.id] || [],
  };
});

// Calculate total time range
const totalMinDays = enhancedSteps.reduce((sum, step) => {
  const days = step.duration.match(/\d+/g);
  return sum + (days ? parseInt(days[0]) : 0);
}, 0);

const totalMaxDays = enhancedSteps.reduce((sum, step) => {
  const days = step.duration.match(/\d+/g);
  return sum + (days && days[1] ? parseInt(days[1]) : days ? parseInt(days[0]) : 0);
}, 0);

export const Processo = () => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [simulatedProgress, setSimulatedProgress] = useState<number>(0);

  const toggleStep = (id: number) => {
    setExpandedStep(expandedStep === id ? null : id);
  };

  const handleProgressChange = (value: number) => {
    setSimulatedProgress(value);
    // Auto-expand current step
    if (value > 0 && value <= enhancedSteps.length) {
      setExpandedStep(value);
    }
  };

  return (
    <div className="bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-primary-600 to-secondary-600 py-12 overflow-hidden">
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
            <Badge variant="default" size="lg" className="mb-6 bg-white/20 border-white/30">
              <Target className="w-4 h-4" />
              Processo Transparente
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-black mb-6">Nosso Processo</h1>
            <p className="text-xl mb-8">
              Do briefing ao lançamento, cada etapa é planejada para garantir o melhor resultado. <br />
              Um processo transparente, ágil e eficiente.
            </p>
            
            <div className="flex grid-cols-3 items-center justify-evenly gap-6 mt-8">
              <div className="flex items-center gap-2">
                <Clock className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs sm:text-sm">Prazo Total</div>
                  <div className="text-lg sm:text-2xl font-bold">{totalMinDays}-{totalMaxDays}d</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs sm:text-sm">Etapas</div>
                  <div className="text-xl sm:text-2xl font-bold">{processSteps.length}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs sm:text-sm">Taxa de Sucesso</div>
                  <div className="text-lg sm:text-2xl font-bold">100%</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-18">
        <div className="container-custom max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-neutral-900 mb-4">Timeline Detalhada</h2>
            <p className="text-xl text-neutral-600">
              Clique em cada etapa para ver os detalhes e checklist
            </p>
          </motion.div>

          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-neutral-200 hidden lg:block" />
            <motion.div
              className="absolute left-8 top-0 w-1 bg-primary-600 hidden lg:block"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />

            <div className="space-y-6">
              {enhancedSteps.map((step, index) => {
                const IconComponent = Icons[step.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
                const isExpanded = expandedStep === step.id;
                const isCompleted = simulatedProgress >= step.id;
                
                return (
                  <motion.div
                    key={step.id}
                    id={`step-${step.id}`}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <Card
                      variant={isExpanded ? 'elevated' : 'bordered'}
                      padding="none"
                      className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${
                        isCompleted ? 'ring-2 ring-green-500 ring-opacity-50' : ''
                      }`}
                    >
                      {/* Step Header */}
                      <button
                        onClick={() => toggleStep(step.id)}
                        className="w-full p-6 lg:pl-20 flex items-center gap-6 text-left hover:bg-neutral-50 transition-colors"
                      >
                        {/* Timeline Dot */}
                        <motion.div
                          className="absolute left-6 w-8 h-8 rounded-full border-4 border-white bg-primary-600 shadow-lg hidden lg:flex items-center justify-center"
                          whileHover={{ scale: 1.2 }}
                          animate={{ scale: isCompleted ? 1.1 : 1 }}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <span className="text-xs font-bold">{step.id}</span>
                          )}
                        </motion.div>

                        {/* Icon */}
                        <motion.div 
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                            isCompleted ? 'bg-green-600' : isExpanded ? 'bg-primary-600' : 'bg-primary-100 text-primary-600'
                          }`}
                          animate={isCompleted ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-8 h-8" />
                          ) : (
                            IconComponent && <IconComponent className="w-8 h-8" />
                          )}
                        </motion.div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="primary" size="sm">
                              Etapa {step.id}
                            </Badge>
                            <Badge variant="default" size="sm">
                              <Clock className="w-3 h-3" />
                              {step.duration}
                            </Badge>
                          </div>
                          <h3 className="text-2xl font-bold text-neutral-900 mb-1">{step.title}</h3>
                          <p className="text-neutral-600">{step.description}</p>
                        </div>

                        {/* Expand Icon */}
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="shrink-0"
                        >
                          <ChevronDown className="w-6 h-6 text-primary-600" />
                        </motion.div>
                      </button>

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
                            <CardContent>
                              <div className="border-t border-neutral-200 pt-6 pb-2">
                                <h4 className="font-bold text-lg mb-4 text-neutral-900 flex items-center gap-2">
                                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                                  Checklist desta Etapa
                                </h4>
                                <div className="grid md:grid-cols-2 gap-3">
                                  {step.checklist.map((item, idx) => (
                                    <motion.div
                                      key={idx}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: idx * 0.05 }}
                                      className="flex items-start gap-3 p-3 bg-neutral-50 rounded-lg"
                                    >
                                      <Circle className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                                      <span className="text-neutral-700 text-sm">{item}</span>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Progress Simulator */}
          <Card variant="gradient" padding="lg" className="mt-12">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              Simule o Progresso do Seu Projeto
            </h3>
            <p className="mb-6">
              Mova o slider para ver como seria o progresso do seu site em cada etapa
            </p>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>0%</span>
                <span className="font-bold">
                  {Math.round((simulatedProgress / processSteps.length) * 100)}%
                </span>
                <span>100%</span>
              </div>
              <div className="relative h-4 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-linear-to-r from-green-400 to-green-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(simulatedProgress / processSteps.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>
            
            <input
              type="range"
              min="0"
              max={processSteps.length}
              value={simulatedProgress}
              onChange={(e) => handleProgressChange(Number(e.target.value))}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer mb-6"
              style={{
                background: `linear-gradient(to right, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.4) ${(simulatedProgress / processSteps.length) * 100}%, rgba(255,255,255,0.2) ${(simulatedProgress / processSteps.length) * 100}%, rgba(255,255,255,0.2) 100%)`
              }}
            />
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5" />
                  <span className="font-semibold">Etapa Atual</span>
                </div>
                <p className="text-2xl font-bold">
                  {simulatedProgress === 0 
                    ? 'Início do Projeto' 
                    : simulatedProgress === processSteps.length 
                    ? '🎉 Projeto Concluído!' 
                    : enhancedSteps[simulatedProgress - 1]?.title}
                </p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5" />
                  <span className="font-semibold">Tempo Estimado</span>
                </div>
                <p className="text-2xl font-bold">
                  {simulatedProgress === 0 
                    ? `${totalMinDays}-${totalMaxDays} dias` 
                    : simulatedProgress === processSteps.length
                    ? 'Site no Ar!'
                    : `${enhancedSteps.slice(0, simulatedProgress).reduce((sum, s) => {
                        const days = s.duration.match(/\d+/g);
                        return sum + (days ? parseInt(days[0]) : 0);
                      }, 0)}-${enhancedSteps.slice(0, simulatedProgress).reduce((sum, s) => {
                        const days = s.duration.match(/\d+/g);
                        return sum + (days && days[1] ? parseInt(days[1]) : days ? parseInt(days[0]) : 0);
                      }, 0)} dias decorridos`}
                </p>
              </div>
            </div>
            
            {simulatedProgress === processSteps.length && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 bg-white/20 rounded-lg p-4 text-center"
              >
                <CheckCircle2 className="w-12 h-12 mx-auto mb-2" />
                <p className="text-lg font-bold">
                  Parabéns! Seu site está pronto para conquistar a internet! 🚀
                </p>
              </motion.div>
            )}
            
            <div className="mt-4 flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleProgressChange(0)}
                disabled={simulatedProgress === 0}
              >
                Reiniciar
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleProgressChange(Math.min(simulatedProgress + 1, processSteps.length))}
                disabled={simulatedProgress === processSteps.length}
              >
                Próxima Etapa
              </Button>
              {simulatedProgress > 0 && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleProgressChange(processSteps.length)}
                >
                  Ir para o Final
                </Button>
              )}
            </div>
          </Card>
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
            <Calendar className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              Pronto para começar seu projeto?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Inicie agora e tenha seu site profissional no ar em até {totalMaxDays} dias
            </p>
            <Button
              variant="secondary"
              size="xl"
              onClick={() => window.location.href = '/onboarding'}
            >
              Iniciar Meu Projeto Agora
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

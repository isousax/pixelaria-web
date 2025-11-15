import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Star, TrendingUp, DollarSign, Calendar, Calculator, MessageCircle, ChevronDown, Sparkles, Shield, Zap, Award, Quote } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { pricingPlans, additionalServices } from '../mocks/pricing';
import { formatCurrency, createWhatsAppLink, whatsAppMessages } from '../utils/helpers';

// Comparison data
const comparisonFeatures = [
  { category: 'Desenvolvimento', features: [
    { name: 'Site profissional completo', subscription: true, oneTime: true },
    { name: 'Design responsivo', subscription: true, oneTime: true },
    { name: 'SEO básico', subscription: true, oneTime: true },
    { name: 'Código-fonte entregue', subscription: false, oneTime: true },
    { name: 'Documentação técnica', subscription: false, oneTime: true },
  ]},
  { category: 'Hospedagem & Infraestrutura', features: [
    { name: 'Hospedagem inclusa', subscription: true, oneTime: false },
    { name: 'SSL/HTTPS', subscription: true, oneTime: '30 dias' },
    { name: 'Backups automáticos', subscription: 'Diários', oneTime: false },
    { name: 'Monitoramento 24/7', subscription: true, oneTime: false },
  ]},
  { category: 'Suporte & Manutenção', features: [
    { name: 'Suporte técnico', subscription: 'Prioritário', oneTime: '30 dias' },
    { name: 'Atualizações de segurança', subscription: true, oneTime: false },
    { name: 'Alterações de conteúdo', subscription: '1/mês', oneTime: false },
    { name: 'Relatórios mensais', subscription: true, oneTime: false },
  ]},
];

// Testimonials
const planTestimonials = [
  {
    name: 'Carlos Mendes',
    role: 'CEO, TechSolutions',
    plan: 'Assinatura Mensal',
    image: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    content: 'A assinatura mensal é perfeita para minha empresa. Não me preocupo com hospedagem, backups ou atualizações. Tudo funciona perfeitamente!',
  },
  {
    name: 'Marina Costa',
    role: 'Proprietária, Studio Bella',
    plan: 'Compra Única',
    image: 'https://i.pravatar.cc/150?img=45',
    rating: 5,
    content: 'Optei pela compra única porque queria ter o código-fonte. O investimento valeu muito a pena e o suporte pós-entrega foi excelente.',
  },
];

// FAQs específicos de planos
const planFaqs = [
  {
    question: 'Qual a diferença entre Assinatura Mensal e Compra Única?',
    answer: 'Na Assinatura Mensal você paga R$ 90/mês e tem hospedagem, manutenção e suporte incluídos. Na Compra Única você paga R$ 2.500 uma vez e recebe o código-fonte, mas precisa contratar hospedagem separadamente.',
  },
  {
    question: 'Posso migrar da Assinatura para Compra Única?',
    answer: 'Sim! Se você está na assinatura e decide comprar o código-fonte, oferecemos um desconto de R$ 500. Basta entrar em contato conosco.',
  },
  {
    question: 'O que acontece se eu cancelar a Assinatura Mensal?',
    answer: 'Você pode cancelar a qualquer momento. Seu site ficará no ar até o fim do período pago. Se quiser manter o site, pode migrar para Compra Única com desconto especial.',
  },
  {
    question: 'Posso adicionar mais funcionalidades depois?',
    answer: 'Sim! Oferecemos serviços adicionais como novas páginas, e-commerce, integrações e muito mais. Consulte nossa tabela de serviços adicionais.',
  },
];

export const Planos = () => {
  const [showComparison, setShowComparison] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [roiMonths, setRoiMonths] = useState<number>(12);
  const [roiRevenue, setRoiRevenue] = useState<number>(5000);

  // ROI Calculator
  const subscriptionTotal = 90 * roiMonths;
  const oneTimeTotal = 2500 + (50 * roiMonths); // estimando R$ 50/mês de hospedagem
  const roiPercentage = ((roiRevenue - subscriptionTotal) / subscriptionTotal) * 100;

  return (
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
              <DollarSign className="w-4 h-4" />
              Preços Transparentes
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-black mb-6">Planos e Preços</h1>
            <p className="text-xl text-white/90 mb-8">
              Escolha o modelo que melhor se adapta às suas necessidades. <br />
              Sem taxas ocultas, sem surpresas.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-300" />
                <span>Sem taxas ocultas</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-300" />
                <span>Cancelamento gratuito</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-300" />
                <span>Garantia de satisfação</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container-custom py-16">

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                variant={plan.popular ? 'elevated' : 'bordered'}
                padding="none"
                className={`h-full overflow-hidden ${plan.popular ? 'ring-2 ring-primary-600 shadow-2xl scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="bg-linear-to-r from-primary-600 to-secondary-600 text-white text-center py-3 font-bold">
                    <Star className="w-5 h-5 inline-block mr-2" />
                    PLANO MAIS POPULAR
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-3xl font-black mb-2 text-neutral-900">{plan.name}</h3>
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-black text-primary-600">
                        {formatCurrency(plan.price)}
                      </span>
                      {plan.type === 'subscription' && (
                        <span className="text-2xl text-neutral-600">/mês</span>
                      )}
                    </div>
                    {plan.type === 'subscription' ? (
                      <p className="text-neutral-600 mt-2">Sem fidelidade • Cancele quando quiser</p>
                    ) : (
                      <p className="text-neutral-600 mt-2">Pagamento único • Código-fonte seu</p>
                    )}
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-neutral-700 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="space-y-3">
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
                      variant={plan.popular ? 'gradient' : 'primary'}
                      size="lg"
                      fullWidth
                      leftIcon={<MessageCircle className="w-5 h-5" />}
                    >
                      Contratar via WhatsApp
                    </Button>
                    <Button
                      as={Link}
                      to={plan.ctaLink}
                      variant="outline"
                      size="lg"
                      fullWidth
                    >
                      {plan.ctaText}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Comparison Toggle */}
        <div className="text-center mb-16">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowComparison(!showComparison)}
            rightIcon={<ChevronDown className={`w-5 h-5 transition-transform ${showComparison ? 'rotate-180' : ''}`} />}
          >
            {showComparison ? 'Ocultar' : 'Ver'} Comparação Detalhada
          </Button>
        </div>

        {/* Detailed Comparison Table */}
        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-16"
            >
              <Card variant="elevated" padding="lg">
                <h2 className="text-3xl font-bold text-center mb-8">Comparação Completa</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-neutral-200">
                        <th className="text-left p-4 font-bold text-neutral-900">Funcionalidade</th>
                        <th className="text-center p-4 font-bold text-primary-600">Assinatura Mensal</th>
                        <th className="text-center p-4 font-bold text-secondary-600">Compra Única</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonFeatures.map((category, catIdx) => (
                        <>
                          <tr key={`cat-${catIdx}`} className="bg-neutral-100">
                            <td colSpan={3} className="p-4 font-bold text-neutral-900">
                              {category.category}
                            </td>
                          </tr>
                          {category.features.map((feature, featIdx) => (
                            <tr key={`feat-${catIdx}-${featIdx}`} className="border-b border-neutral-200 hover:bg-neutral-50">
                              <td className="p-4 text-neutral-700">{feature.name}</td>
                              <td className="p-4 text-center">
                                {typeof feature.subscription === 'boolean' ? (
                                  feature.subscription ? (
                                    <Check className="w-6 h-6 text-green-600 mx-auto" />
                                  ) : (
                                    <X className="w-6 h-6 text-red-600 mx-auto" />
                                  )
                                ) : (
                                  <span className="text-neutral-700">{feature.subscription}</span>
                                )}
                              </td>
                              <td className="p-4 text-center">
                                {typeof feature.oneTime === 'boolean' ? (
                                  feature.oneTime ? (
                                    <Check className="w-6 h-6 text-green-600 mx-auto" />
                                  ) : (
                                    <X className="w-6 h-6 text-red-600 mx-auto" />
                                  )
                                ) : (
                                  <span className="text-neutral-700">{feature.oneTime}</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ROI Calculator */}
        <section className="mb-16">
          <Card variant="gradient" padding="xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-white mb-8"
            >
              <Calculator className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-4xl font-black mb-4">Calculadora de ROI</h2>
              <p className="text-xl text-white/90">
                Descubra quanto você economiza e quanto pode ganhar
              </p>
            </motion.div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Inputs */}
              <div className="space-y-6">
                <Card variant="elevated" padding="lg">
                  <h3 className="font-bold text-xl mb-4 text-neutral-900">Seus Números</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Por quantos meses você planeja manter o site?
                      </label>
                      <Input
                        type="number"
                        value={roiMonths}
                        onChange={(e) => setRoiMonths(Number(e.target.value))}
                        min={1}
                        max={60}
                        variant="filled"
                        leftIcon={<Calendar className="w-5 h-5" />}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Quanto você espera faturar por mês com o site?
                      </label>
                      <Input
                        type="number"
                        value={roiRevenue}
                        onChange={(e) => setRoiRevenue(Number(e.target.value))}
                        min={0}
                        step={100}
                        variant="filled"
                        leftIcon={<DollarSign className="w-5 h-5" />}
                      />
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* Results */}
              <div className="space-y-4">
                <Card variant="elevated" padding="lg">
                  <h3 className="font-bold text-xl mb-4 text-neutral-900">Assinatura Mensal</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-600">Custo total ({roiMonths} meses):</span>
                      <span className="text-2xl font-bold text-primary-600">{formatCurrency(subscriptionTotal)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-600">Receita estimada:</span>
                      <span className="text-2xl font-bold text-green-600">{formatCurrency(roiRevenue * roiMonths)}</span>
                    </div>
                    <div className="pt-3 border-t border-neutral-200">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-neutral-900">ROI:</span>
                        <span className="text-3xl font-black text-green-600">+{roiPercentage.toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card variant="elevated" padding="lg">
                  <h3 className="font-bold text-xl mb-4 text-neutral-900">Compra Única</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-600">Custo total:</span>
                      <span className="text-2xl font-bold text-secondary-600">{formatCurrency(oneTimeTotal)}</span>
                    </div>
                    <div className="text-sm text-neutral-600">
                      * Considerando R$ 50/mês de hospedagem própria
                    </div>
                    <div className="pt-3 border-t border-neutral-200">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-neutral-900">Economia vs Assinatura:</span>
                        <span className={`text-2xl font-bold ${subscriptionTotal > oneTimeTotal ? 'text-green-600' : 'text-red-600'}`}>
                          {subscriptionTotal > oneTimeTotal ? '-' : '+'}
                          {formatCurrency(Math.abs(subscriptionTotal - oneTimeTotal))}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-white/90 text-lg mb-4">
                💡 <strong>Dica:</strong> A assinatura é ideal para até {Math.floor(2500 / 90)} meses. Depois disso, a compra única se torna mais econômica.
              </p>
            </div>
          </Card>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="text-4xl font-black text-center mb-4 text-neutral-900">O que dizem nossos clientes</h2>
          <p className="text-xl text-neutral-600 text-center mb-12">
            Veja a experiência de quem já escolheu cada plano
          </p>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {planTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Card variant="elevated" padding="lg" className="h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-neutral-900">{testimonial.name}</h4>
                      <p className="text-sm text-neutral-600">{testimonial.role}</p>
                      <Badge variant="primary" size="sm" className="mt-1">
                        {testimonial.plan}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <Quote className="w-8 h-8 text-primary-200 mb-3" />
                  <p className="text-neutral-700 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-4xl font-black text-center mb-4 text-neutral-900">Perguntas Frequentes sobre Planos</h2>
          <p className="text-xl text-neutral-600 text-center mb-12">
            Tire suas dúvidas sobre nossos planos
          </p>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {planFaqs.map((faq, index) => (
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

        {/* Additional Services */}
        <section>
          <h2 className="text-4xl font-black text-center mb-4 text-neutral-900">Serviços Adicionais</h2>
          <p className="text-xl text-neutral-600 text-center mb-12">
            Expanda as funcionalidades do seu site quando precisar
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover="lift" padding="lg" className="h-full">
                  <h3 className="text-xl font-bold mb-2 text-neutral-900">{service.name}</h3>
                  <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                  <div className="flex items-baseline gap-1 mt-auto">
                    <span className="text-3xl font-bold text-primary-600">
                      {formatCurrency(service.price)}
                    </span>
                    <span className="text-neutral-600 text-sm">/{service.unit}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Final CTA */}
      <section className="py-20 bg-linear-to-br from-primary-600 to-secondary-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              Ainda tem dúvidas sobre qual plano escolher?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Fale conosco no WhatsApp e vamos te ajudar a escolher o melhor plano para sua necessidade
            </p>
            <Button
              variant="secondary"
              size="xl"
              leftIcon={<MessageCircle className="w-6 h-6" />}
              onClick={() => window.open(createWhatsAppLink(whatsAppMessages.quote), '_blank')}
            >
              Tirar Dúvidas no WhatsApp
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

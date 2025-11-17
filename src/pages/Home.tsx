import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Check,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  ChevronDown,
  Star,
  Quote,
  Zap,
  Users,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { SEO } from "../components/SEO";
import { pricingPlans } from "../mocks/pricing";
import {
  createWhatsAppLink,
  whatsAppMessages,
  formatCurrency,
} from "../utils/helpers";
import { PAGE_SEO, SCHEMAS } from "../utils/seo";
import { useState, useRef } from "react";
import {
  stats,
  benefits,
  differentiators,
  testimonials,
  faqs,
  comparisonFeatures,
} from "../mocks/DataPage/home";

export const Home = () => {
  const [pricingType, setPricingType] = useState<"subscription" | "one-time">(
    "subscription"
  );
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const selectedPlan = pricingPlans.find((p) => p.type === pricingType);

  return (
    <>
      <SEO
        title={PAGE_SEO.home.title}
        description={PAGE_SEO.home.description}
        canonical={PAGE_SEO.home.canonical}
        keywords={PAGE_SEO.home.keywords}
        schema={[SCHEMAS.organization, SCHEMAS.website, SCHEMAS.faq(faqs)]}
      />

      <div className="bg-background-light overflow-hidden">
        {/* Hero Section - Enhanced */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex py-10 lg:py-26 overflow-hidden"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-linear-to-br from-primary-50 via-white to-secondary-50 opacity-60" />
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{ y: heroY }}
          >
            <div className="absolute top-20 right-20 w-72 h-72 bg-primary-200 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary-200 rounded-full blur-3xl" />
          </motion.div>

          <div className="container-custom relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
                style={{ opacity: heroOpacity }}
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <Badge variant="primary" size="lg" pill>
                    <Sparkles className="w-4 h-4" />
                    <span>Mais de 200 sites criados</span>
                  </Badge>
                </motion.div>

                <h1 className="text-5xl lg:text-7xl font-black text-neutral-900 mb-6 leading-[1.1]">
                  Seu site profissional{" "}
                  <span className="gradient-text">por apenas R$90</span>{" "}
                  <span className="text-xl text-gray-500 font-normal">
                    /mês
                  </span>
                </h1>

                <p className="text-lg lg:text-2xl text-neutral-600 mb-4 leading-relaxed">
                  Criação, hospedagem, segurança e manutenção{" "}
                  <strong>tudo incluso</strong>.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button
                    as={Link}
                    to="/onboarding"
                    variant="outline"
                    size="lg"
                  >
                    Briefing Online
                  </Button>
                  <Button
                    onClick={() =>
                      window.open(
                        createWhatsAppLink(whatsAppMessages.general),
                        "_blank"
                      )
                    }
                    size="lg"
                    leftIcon={<MessageCircle className="w-5 h-5" />}
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                    variant="gradient"
                    className="gap-10"
                  >
                    Falar com Especialista
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-neutral-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span>Sem fidelidade</span>
                  </div>
                  <div className="hidden md:flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span>Zero burocracia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span>Cancele quando quiser</span>
                  </div>
                </div>
              </motion.div>

              {/* Hero Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-hover">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                    alt="Desenvolvimento web profissional"
                    className="w-full h-auto"
                  />
                  {/* Floating Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-soft-xl"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-neutral-600 mb-1">
                          Tempo médio de entrega
                        </p>
                        <p className="text-2xl font-bold text-primary-600">
                          10-15 dias
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                        <Zap className="w-6 h-6 text-primary-600" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Decorative Elements */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -top-8 -right-8 w-24 h-24 bg-secondary-200 rounded-full blur-2xl opacity-60"
                />
                <motion.div
                  animate={{
                    rotate: [360, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary-200 rounded-full blur-2xl opacity-60"
                />
              </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:block"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex flex-col items-center gap-2 text-neutral-400"
              >
                <span className="text-sm">Role para descobrir mais</span>
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white py-16">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 mx-auto mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-4xl font-black text-neutral-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-neutral-600">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="bg-white py-8 sm:py-18">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="section-title">
                Escolha o Modelo Ideal para Você
              </h2>
              <p className="section-subtitle mx-auto">
                Flexibilidade para atender suas necessidades específicas
              </p>
            </div>

            {/* Toggle */}
            <div className="flex justify-center mb-12">
              <div className="bg-neutral-100 p-1 rounded-lg inline-flex">
                <button
                  onClick={() => setPricingType("subscription")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    pricingType === "subscription"
                      ? "bg-white shadow-soft text-primary-600"
                      : "text-neutral-600"
                  }`}
                >
                  Assinatura Mensal
                </button>
                <button
                  onClick={() => setPricingType("one-time")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    pricingType === "one-time"
                      ? "bg-white shadow-soft text-primary-600"
                      : "text-neutral-600"
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
                  <h3 className="text-3xl font-bold mb-2">
                    {selectedPlan.name}
                  </h3>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-primary-600">
                      {formatCurrency(selectedPlan.price)}
                    </span>
                    {pricingType === "subscription" && (
                      <span className="text-neutral-600">/mês</span>
                    )}
                  </div>
                  <ul className="space-y-3 mb-8 text-left max-w-md mx-auto">
                    {selectedPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-neutral-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      as={Link}
                      to={selectedPlan.ctaLink}
                      variant="secondary"
                      size="lg"
                    >
                      {selectedPlan.ctaText}
                    </Button>
                    <Button
                      onClick={() =>
                        window.open(
                          createWhatsAppLink(
                            pricingType === "subscription"
                              ? whatsAppMessages.subscription
                              : whatsAppMessages.oneTime
                          ),
                          "_blank"
                        )
                      }
                      size="lg"
                      variant="gradient"
                    >
                      Falar no WhatsApp
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Comparison Table */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-center mb-8">
                Compare os Modelos
              </h3>
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
                        <td className="px-6 py-4 text-neutral-700">
                          {item.feature}
                        </td>
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

        {/* Differentiators Section */}
        <section className="bg-linear-to-br from-primary-600 to-secondary-600 py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>

          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge
                variant="default"
                className="mb-4 bg-white/20 border-white/30"
              >
                Por que somos diferentes
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-black mb-6">
                Transparência e Flexibilidade
              </h2>
              <p className="text-xl max-w-3xl mx-auto">
                Não escondemos nada e nos adaptamos às suas necessidades
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {differentiators.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <Card
                      variant="glass"
                      padding="lg"
                      className="h-full backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/20"
                    >
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                      <p className="leading-relaxed">{item.description}</p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="container-custom py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="primary" size="lg" className="mb-4">
              <Star className="w-4 h-4" />
              Benefícios Exclusivos
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-black text-neutral-900 mb-6">
              Por que escolher a Pixelaria?
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Tecnologia de ponta, processos ágeis e suporte humanizado
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    hover="lift"
                    glowColor={benefit.color}
                    padding="lg"
                    className="h-full group"
                  >
                    <div
                      className={`w-16 h-16 bg-${benefit.color}-100 rounded-2xl flex items-center justify-center text-${benefit.color}-600 mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-neutral-900">
                      {benefit.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-neutral-50 py-24">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge variant="secondary" size="lg" className="mb-4">
                <Users className="w-4 h-4" />
                Depoimentos
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-black text-neutral-900 mb-6">
                O que nossos clientes dizem
              </h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Satisfação comprovada em cada projeto entregue
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
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
                        <h4 className="font-bold text-neutral-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-neutral-600">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-yellow-400 text-yellow-400"
                          />
                        )
                      )}
                    </div>

                    <Quote className="w-8 h-8 text-primary-200 mb-3" />
                    <p className="text-neutral-700 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-white">
          <div className="container-custom max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge variant="primary" size="lg" className="mb-4">
                <MessageCircle className="w-4 h-4" />
                Perguntas Frequentes
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-black text-neutral-900 mb-6">
                Dúvidas? Temos as respostas
              </h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                As perguntas mais comuns dos nossos clientes
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    variant="bordered"
                    padding="none"
                    className="overflow-hidden hover:border-primary-300 transition-colors duration-300"
                  >
                    <button
                      onClick={() =>
                        setFaqOpen(faqOpen === index ? null : index)
                      }
                      className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-neutral-50 transition-colors duration-200"
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

                    <motion.div
                      initial={false}
                      animate={{
                        height: faqOpen === index ? "auto" : 0,
                        opacity: faqOpen === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-2 text-neutral-700 leading-relaxed border-t border-neutral-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <Card variant="gradient" padding="lg" className="inline-block">
                <p className="text-white mb-4 text-lg">
                  Não encontrou sua resposta?
                </p>
                <Button
                  onClick={() =>
                    window.open(
                      createWhatsAppLink(whatsAppMessages.support),
                      "_blank"
                    )
                  }
                  variant="secondary"
                  size="lg"
                  leftIcon={<MessageCircle className="w-5 h-5" />}
                >
                  Fale com nosso time
                </Button>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative py-32 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-linear-to-br from-primary-600 via-primary-700 to-secondary-600">
            <div className="absolute inset-0 opacity-20">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
              />
              <motion.div
                animate={{
                  scale: [1.2, 1, 1.2],
                  rotate: [0, -90, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-300 rounded-full blur-3xl"
              />
            </div>
          </div>

          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <Badge
                variant="default"
                size="lg"
                className="mb-6 bg-white/20 border-white/30"
              >
                <Sparkles className="w-4 h-4" />
                Última chamada
              </Badge>

              <h2 className="text-5xl lg:text-6xl font-black mb-6 leading-tight">
                Transforme sua ideia em realidade{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-200 to-yellow-400">
                  hoje mesmo
                </span>
              </h2>

              <p className="text-xl lg:text-2xl mb-8 text-primary-100 leading-relaxed">
                Mais de 200 empresas já confiam na Pixelaria para criar suas
                presenças digitais.
                <br />
                <strong>Você será o próximo?</strong>
              </p>

              <div className="flex flex-col items-center gap-6 mb-12">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() =>
                      window.open(
                        createWhatsAppLink(whatsAppMessages.quote),
                        "_blank"
                      )
                    }
                    variant="secondary"
                    size="xl"
                    leftIcon={<MessageCircle className="w-6 h-6" />}
                    className="shadow-2xl shadow-secondary-500/50"
                  >
                    Falar no WhatsApp
                  </Button>
                  <Button
                    as={Link}
                    to="/onboarding"
                    variant="outline"
                    size="xl"
                    leftIcon={<Sparkles className="w-6 h-6" />}
                    className="bg-white/10 backdrop-blur-sm border-2 border-white hover:bg-white hover:text-primary-600"
                  >
                    Iniciar Briefing Online
                  </Button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-300" />
                    <span>Resposta em 24h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-300" />
                    <span>Sem compromisso</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-300" />
                    <span>100% online</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 pt-8 border-t border-white/20">
                <div className="flex -space-x-3">
                  {testimonials.slice(0, 3).map((testimonial, i) => (
                    <img
                      key={i}
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full border-4 border-primary-600 object-cover"
                    />
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex gap-1 mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-300 text-yellow-300"
                      />
                    ))}
                  </div>
                  <p className="text-sm">
                    <strong>98% de satisfação</strong> · 200+ clientes atendidos
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

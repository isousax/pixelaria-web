import { 
  Code2, Zap, Shield, HeadphonesIcon,
  Star, TrendingUp, Users, Award, Sparkles, Clock, 
  CheckCircle2
} from 'lucide-react';

export const stats = [
    { value: '200+', label: 'Sites Criados', icon: Code2 },
    { value: '98%', label: 'Satisfação', icon: Star },
    { value: '15 dias', label: 'Entrega Média', icon: Clock },
    { value: '24/7', label: 'Suporte', icon: HeadphonesIcon },
  ];

  export const benefits = [
    {
      icon: Code2,
      title: 'Tecnologia de Ponta',
      description: 'React, TypeScript, Next.js e as ferramentas mais modernas do mercado para garantir performance e escalabilidade.',
      color: 'primary' as const,
    },
    {
      icon: Zap,
      title: 'Entrega Ágil',
      description: 'Metodologia ágil com entregas parciais a cada sprint. Veja seu projeto ganhar vida aos poucos.',
      color: 'secondary' as const,
    },
    {
      icon: Shield,
      title: 'Segurança Total',
      description: 'SSL grátis, backups automáticos a cada 6 horas, firewall WAF e monitoramento 24/7 para você dormir tranquilo.',
      color: 'success' as const,
    },
    {
      icon: HeadphonesIcon,
      title: 'Suporte VIP',
      description: 'Atendimento humanizado via WhatsApp com tempo médio de resposta de 2 horas em dias úteis.',
      color: 'primary' as const,
    },
    {
      icon: TrendingUp,
      title: 'SEO Otimizado',
      description: 'Seu site preparado para aparecer no Google com técnicas avançadas de otimização e performance.',
      color: 'warning' as const,
    },
    {
      icon: Users,
      title: 'Mobile First',
      description: 'Design responsivo testado em +50 dispositivos. Perfeito em smartphone, tablet e desktop.',
      color: 'primary' as const,
    },
  ];

  export const differentiators = [
    {
      title: 'Sem Surpresas',
      description: 'Preço fixo sem letras miúdas. Você sabe exatamente o que vai pagar desde o primeiro contato.',
      icon: CheckCircle2,
    },
    {
      title: 'Propriedade Flexível',
      description: 'Escolha entre assinatura mensal ou compra do código-fonte. Você decide o que faz mais sentido.',
      icon: Award,
    },
    {
      title: 'Processo Transparente',
      description: 'Acompanhe cada etapa do desenvolvimento em tempo real com acesso ao painel do cliente.',
      icon: Sparkles,
    },
  ];

  export const testimonials = [
    {
      name: 'Dr. Carlos Mendes',
      role: 'Clínica Vida Saudável',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop',
      content: 'A Pixelaria transformou completamente a presença online da minha clínica. Em 3 meses triplicamos os agendamentos via site!',
      rating: 5,
    },
    {
      name: 'Ana Paula Silva',
      role: 'Bistro da Vila',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
      content: 'O sistema de pedidos online que eles desenvolveram aumentou 40% nossas vendas. Suporte impecável!',
      rating: 5,
    },
    {
      name: 'Roberto Almeida',
      role: 'Tech Solutions',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop',
      content: 'Profissionalismo do início ao fim. Entregaram antes do prazo e com qualidade superior ao esperado.',
      rating: 5,
    },
  ];

  export const faqs = [
    {
      question: 'Qual a diferença entre assinatura e compra única?',
      answer: 'Na assinatura mensal (R$90/mês), cuidamos de tudo: hospedagem, backups, segurança, 1 alteração mensal e suporte contínuo. Na compra única (R$2.500), você recebe o código-fonte e tem propriedade total, mas precisa contratar hospedagem e fazer manutenções por conta própria.',
    },
    {
      question: 'Quanto tempo leva para criar meu site?',
      answer: 'Em média 10-15 dias úteis do briefing aprovado até o site no ar. Sites mais complexos com muitas funcionalidades podem levar até 30 dias. Você acompanha o progresso em tempo real pelo painel do cliente.',
    },
    {
      question: 'Posso mudar de assinatura para compra única depois?',
      answer: 'Sim! A qualquer momento você pode adquirir o código-fonte pagando a diferença proporcional ao tempo de assinatura. Por exemplo, após 6 meses, o valor seria menor que R$2.500.',
    },
    {
      question: 'O que está incluso na alteração mensal?',
      answer: 'Uma alteração pode ser: trocar textos/imagens, ajustar cores, adicionar uma seção simples, ou corrigir bugs. Alterações maiores como novas páginas ou funcionalidades complexas têm custo adicional de R$200-800 conforme a complexidade.',
    },
    {
      question: 'Vocês fazem e-commerce?',
      answer: 'Sim! E-commerce tem custo adicional de R$800 no setup inicial pois requer integração com gateway de pagamento, carrinho de compras, painel administrativo, etc. Inclui até 50 produtos cadastrados.',
    },
    {
      question: 'Como funciona o suporte?',
      answer: 'Suporte via WhatsApp em horário comercial (9h-18h dias úteis) com tempo médio de resposta de 2 horas. Para emergências fora do horário, temos plantão 24/7 para clientes do plano assinatura.',
    },
  ];

export const comparisonFeatures = [
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
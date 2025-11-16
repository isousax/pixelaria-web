import type { PricingPlan } from '../types';

export const pricingPlans: PricingPlan[] = [
  {
    id: 'subscription',
    name: 'Assinatura Mensal',
    type: 'subscription',
    price: 90,
    popular: true,
    features: [
      'Site profissional completo',
      'Hospedagem inclusa',
      'Backups diários automáticos',
      'Atualizações de segurança',
      'SSL/HTTPS incluído',
      '1 alteração de conteúdo por mês',
      'Suporte técnico prioritário',
      'Monitoramento de uptime 24/7',
      'SLA de 99.5% de disponibilidade',
      'Relatórios de desempenho',
    ],
    ctaText: 'Assinar Agora',
    ctaLink: '/onboarding?plan=subscription',
  },
  {
    id: 'one-time',
    name: 'Compra Única',
    type: 'one-time',
    price: 4500,
    features: [
      'Site profissional completo',
      'Código-fonte entregue',
      'Documentação técnica completa',
      'Design responsivo e moderno',
      'SEO implementado',
      'Formulários de contato',
      'Integração com redes sociais',
      'Google Analytics configurado',
      '30 dias de suporte pós-entrega',
      'Treinamento de uso do site',
    ],
    ctaText: 'Solicitar Orçamento',
    ctaLink: '/onboarding?plan=one-time',
  },
];

export const additionalServices = [
  {
    id: 'monthly-change',
    name: 'Alteração Extra',
    description: 'Alterações adicionais além do limite mensal',
    price: 40,
    unit: 'por alteração',
  },
  {
    id: 'urgent-change',
    name: 'Alteração Urgente',
    description: 'Alteração com prioridade máxima (24h)',
    price: 80,
    unit: 'por alteração',
  },
  {
    id: 'source-code',
    name: 'Código-Fonte',
    description: 'Entrega do código-fonte para clientes de assinatura (vide regulamento)',
    price: 3500,
    unit: 'único',
  },
  {
    id: 'new-page',
    name: 'Página Adicional',
    description: 'Criação de nova página no site',
    price: 200,
    unit: 'por página',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Adição de loja virtual ao site',
    price: 800,
    unit: 'único',
  },
];

import type { Service } from '../types';

export const services: Service[] = [
  {
    id: 'creation',
    name: 'Criação de Sites',
    description: 'Desenvolvemos sites profissionais, responsivos e otimizados para SEO. Do planejamento ao lançamento, cuidamos de cada detalhe para garantir um resultado excepcional.',
    icon: 'Code',
    features: [
      'Design moderno e responsivo',
      'Otimização para SEO',
      'Integração com redes sociais',
      'Formulários de contato',
      'Google Analytics',
      'Certificado SSL',
    ],
  },
  {
    id: 'maintenance',
    name: 'Manutenção',
    description: 'Mantemos seu site sempre atualizado, seguro e funcionando perfeitamente. Backups automáticos, atualizações de segurança e monitoramento contínuo.',
    icon: 'Settings',
    features: [
      'Backups diários',
      'Atualizações de segurança',
      'Monitoramento 24/7',
      'Correção de bugs',
      'Otimização de performance',
      'Suporte técnico',
    ],
  },
  {
    id: 'seo',
    name: 'SEO e Performance',
    description: 'Otimizamos seu site para aparecer nos resultados do Google. Análise de palavras-chave, otimização de conteúdo e melhorias de performance.',
    icon: 'TrendingUp',
    features: [
      'Análise de palavras-chave',
      'Otimização on-page',
      'Melhoria de velocidade',
      'Meta tags otimizadas',
      'Schema markup',
      'Relatórios mensais',
    ],
  },
  {
    id: 'content',
    name: 'Criação de Conteúdo',
    description: 'Produzimos conteúdo relevante e otimizado para seu site. Textos persuasivos, imagens profissionais e estratégia de conteúdo.',
    icon: 'FileText',
    features: [
      'Redação profissional',
      'Seleção de imagens',
      'Copywriting persuasivo',
      'Revisão e edição',
      'Estratégia de conteúdo',
      'Blog posts',
    ],
  },
];

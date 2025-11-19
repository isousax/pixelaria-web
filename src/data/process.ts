import type { ProcessStep } from '../shared/types';

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: 'Briefing',
    description: 'Entendemos suas necessidades, objetivos e público-alvo através de um questionário detalhado.',
    duration: '1-2 dias',
    icon: 'MessageSquare',
  },
  {
    id: 2,
    title: 'Planejamento',
    description: 'Criamos a estrutura do site, definimos funcionalidades e elaboramos o wireframe.',
    duration: '2-3 dias',
    icon: 'FileText',
  },
  {
    id: 3,
    title: 'Design',
    description: 'Desenvolvemos o layout visual do site com base na identidade da sua marca.',
    duration: '3-5 dias',
    icon: 'Palette',
  },
  {
    id: 4,
    title: 'Desenvolvimento',
    description: 'Programamos o site com tecnologias modernas, garantindo performance e responsividade.',
    duration: '5-10 dias',
    icon: 'Code',
  },
  {
    id: 5,
    title: 'Aprovação',
    description: 'Apresentamos o site para sua aprovação e realizamos os ajustes necessários.',
    duration: '2-3 dias',
    icon: 'CheckCircle',
  },
  {
    id: 6,
    title: 'Deploy',
    description: 'Publicamos o site no ar com todos os ajustes finais de SEO e performance.',
    duration: '1 dia',
    icon: 'Rocket',
  },
  {
    id: 7,
    title: 'Suporte',
    description: 'Acompanhamos o desempenho do site e oferecemos suporte contínuo.',
    duration: 'Contínuo',
    icon: 'Headphones',
  },
];

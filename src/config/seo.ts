export const SEO_CONFIG = {
  defaultTitle: 'Pixelaria - Criação de Sites Profissionais',
  defaultDescription: 'Crie seu site profissional por apenas R$90. Criação, hospedagem, manutenção e suporte inclusos. Mais de 200 sites criados com sucesso.',
  siteUrl: 'https://www.pixelaria.com.br', // IMPORTANTE: Substitua pela sua URL real
  siteName: 'Pixelaria',
  twitterHandle: '@pixelaria', // Substitua pelo seu handle do Twitter
  logo: '/logo.png',
  ogImage: '/og-image.jpg', // Certifique-se de ter essa imagem em public/
  
  // Informações da empresa
  company: {
    name: 'Pixelaria',
    legalName: 'Pixelaria Desenvolvimento Web LTDA',
    email: 'contato@pixelaria.com.br',
    phone: '+55 81 99272-0219', // Substitua pelo seu telefone
    address: {
      street: 'Apenas Online',
      city: 'Recife',
      state: 'PE',
      postalCode: '54100-000',
      country: 'BR',
    },
  },
};

export const PAGE_SEO = {
  home: {
    title: 'Criação de Sites Profissionais por R$90/mês',
    description: 'Crie seu site profissional com a Pixelaria. Assinatura mensal R$90. Criação, hospedagem, segurança e manutenção inclusos. Mais de 200 sites criados.',
    canonical: '/',
    keywords: [
      'criação de sites',
      'sites profissionais',
      'desenvolvimento web',
      'site barato',
      'site por assinatura',
      'sites responsivos',
      'criar site',
      'criar site para minha empresa',
      'criar site profissional',
    ],
  },
  
  projetos: {
    title: 'Portfólio de Projetos - Sites Criados',
    description: 'Conheça os sites profissionais que já criamos. Mais de 200 projetos entregues para empresas de diversos segmentos. Veja nosso portfólio completo.',
    canonical: '/projetos',
    keywords: [
      'portfólio web',
      'projetos de sites',
      'sites criados',
      'exemplos de sites',
      'trabalhos anteriores',
    ],
  },
  
  servicos: {
    title: 'Nossos Serviços - Desenvolvimento Web Completo',
    description: 'Oferecemos criação de sites profissionais, landing pages, e-commerce, aplicações web e muito mais. Soluções completas para sua presença digital.',
    canonical: '/servicos',
    keywords: [
      'serviços web',
      'desenvolvimento de sites',
      'criação de landing page',
      'e-commerce',
      'aplicações web',
      'design responsivo',
    ],
  },
  
  processo: {
    title: 'Nosso Processo de Trabalho - Como Criamos Seu Site',
    description: 'Conheça nosso processo de criação de sites: do briefing à entrega. Metodologia ágil, transparência total e você acompanha tudo em tempo real.',
    canonical: '/processo',
    keywords: [
      'processo de criação',
      'metodologia ágil',
      'como criar site',
      'etapas desenvolvimento',
    ],
  },
  
  planos: {
    title: 'Planos e Preços - R$90/mês ou R$2.500 único',
    description: 'Escolha o melhor plano para você: Assinatura mensal R$90 com tudo incluso ou Compra única R$2.500 com propriedade total do código-fonte.',
    canonical: '/planos',
    keywords: [
      'preços de sites',
      'quanto custa um site',
      'planos de criação de sites',
      'site barato',
      'assinatura site',
    ],
  },
  
  contato: {
    title: 'Entre em Contato - Fale Conosco',
    description: 'Entre em contato com a Pixelaria. Tire suas dúvidas, solicite um orçamento ou inicie seu projeto. Atendimento rápido via WhatsApp.',
    canonical: '/contato',
    keywords: [
      'contato',
      'orçamento site',
      'falar com especialista',
      'whatsapp',
      'atendimento',
    ],
  },
  
  onboarding: {
    title: 'Briefing Online - Inicie Seu Projeto',
    description: 'Preencha nosso briefing online e dê o primeiro passo para ter seu site profissional. Processo rápido, simples e 100% online.',
    canonical: '/onboarding',
    keywords: [
      'briefing online',
      'iniciar projeto',
      'contratar site',
      'formulário site',
    ],
    noindex: false, // Mudar para true se quiser ocultar do Google
  },
  
  dashboard: {
    title: 'Painel do Cliente - Acompanhe Seu Projeto',
    description: 'Acesse o painel do cliente e acompanhe o desenvolvimento do seu site em tempo real. Transparência total do início ao fim.',
    canonical: '/dashboard',
    noindex: true, // Área privada - não indexar
    nofollow: true,
  },
  
  blog: {
    title: 'Blog - Dicas e Novidades sobre Web',
    description: 'Fique por dentro das últimas tendências em desenvolvimento web, dicas de marketing digital e novidades do mercado.',
    canonical: '/blog',
    keywords: [
      'blog web',
      'dicas de site',
      'marketing digital',
      'desenvolvimento web',
    ],
  },
  
  termos: {
    title: 'Termos de Uso e Serviço',
    description: 'Leia nossos termos de uso e serviço. Transparência e clareza nos direitos e deveres de clientes e prestadores.',
    canonical: '/termos',
    noindex: true, // Páginas legais geralmente não precisam indexação
  },
  
  privacidade: {
    title: 'Política de Privacidade',
    description: 'Nossa política de privacidade e proteção de dados pessoais conforme LGPD. Seus dados estão seguros conosco.',
    canonical: '/privacidade',
    noindex: true,
  },
};

// Schema.org structured data templates
export const SCHEMAS = {
  // Organization Schema
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SEO_CONFIG.company.name,
    legalName: SEO_CONFIG.company.legalName,
    url: SEO_CONFIG.siteUrl,
    logo: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.logo}`,
    description: SEO_CONFIG.defaultDescription,
    email: SEO_CONFIG.company.email,
    telephone: SEO_CONFIG.company.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SEO_CONFIG.company.address.street,
      addressLocality: SEO_CONFIG.company.address.city,
      addressRegion: SEO_CONFIG.company.address.state,
      postalCode: SEO_CONFIG.company.address.postalCode,
      addressCountry: SEO_CONFIG.company.address.country,
    },
    sameAs: [
      // Adicione suas redes sociais aqui
      // 'https://www.facebook.com/pixelaria',
      'https://www.instagram.com/pixelaria',
      // 'https://www.linkedin.com/company/pixelaria',
    ],
  },

  // Website Schema
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    description: SEO_CONFIG.defaultDescription,
    publisher: {
      '@type': 'Organization',
      name: SEO_CONFIG.company.name,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SEO_CONFIG.siteUrl}/projetos?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  },

  // Service Schema
  service: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Criação de Sites Profissionais',
    provider: {
      '@type': 'Organization',
      name: SEO_CONFIG.company.name,
      url: SEO_CONFIG.siteUrl,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Brasil',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de Desenvolvimento Web',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Assinatura Mensal de Site',
            description: 'Site profissional com hospedagem, manutenção e suporte inclusos',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Compra Única de Site',
            description: 'Propriedade total do código-fonte do seu site',
          },
        },
      ],
    },
  },

  // Breadcrumb helper
  breadcrumb: (items: Array<{ name: string; url: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SEO_CONFIG.siteUrl}${item.url}`,
    })),
  }),

  // FAQ helper
  faq: (questions: Array<{ question: string; answer: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }),

  // Article/Blog Post
  article: (data: {
    title: string;
    description: string;
    author: string;
    publishedDate: string;
    modifiedDate?: string;
    image?: string;
    url: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    image: data.image || `${SEO_CONFIG.siteUrl}${SEO_CONFIG.ogImage}`,
    author: {
      '@type': 'Person',
      name: data.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SEO_CONFIG.company.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.logo}`,
      },
    },
    datePublished: data.publishedDate,
    dateModified: data.modifiedDate || data.publishedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.url,
    },
  }),
};

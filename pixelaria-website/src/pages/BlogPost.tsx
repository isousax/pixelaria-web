import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark, Tag, ChevronRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/SEO';
import { SCHEMAS } from '../utils/seo';

// Mock de posts do blog (mesmo array da página Blog)
const blogPosts = [
  {
    id: 1,
    title: 'Como escolher o melhor plano para criar seu site profissional',
    slug: 'como-escolher-plano-site-profissional',
    excerpt: 'Descubra qual modelo de contratação se encaixa melhor no seu negócio: assinatura mensal ou compra única. Compare custos, benefícios e tome a decisão certa.',
    content: `
      <h2>Por que escolher o plano certo é fundamental?</h2>
      <p>A escolha do plano ideal para criar seu site profissional pode fazer toda a diferença nos resultados do seu negócio. Cada empresa tem necessidades específicas, e entender qual modelo de contratação se alinha melhor com seus objetivos é o primeiro passo para o sucesso online.</p>

      <h2>Modelos de Contratação: Assinatura vs Compra Única</h2>
      <p>Existem dois modelos principais no mercado:</p>
      
      <h3>1. Plano de Assinatura Mensal</h3>
      <p>Neste modelo, você paga uma mensalidade que geralmente inclui:</p>
      <ul>
        <li>Hospedagem do site</li>
        <li>Manutenção e atualizações contínuas</li>
        <li>Suporte técnico prioritário</li>
        <li>Melhorias e novos recursos ao longo do tempo</li>
        <li>Backup automático e segurança</li>
      </ul>
      <p><strong>Vantagens:</strong> Investimento inicial menor, custos previsíveis, site sempre atualizado.</p>
      <p><strong>Ideal para:</strong> Empresas que preferem distribuir o investimento ao longo do tempo e valorizam suporte contínuo.</p>

      <h3>2. Compra Única (Projeto Fechado)</h3>
      <p>Neste modelo, você paga um valor único pelo desenvolvimento completo do site.</p>
      <ul>
        <li>Propriedade total do código</li>
        <li>Pagamento único sem mensalidades</li>
        <li>Hospedagem por conta própria</li>
        <li>Manutenção opcional (contratação separada)</li>
      </ul>
      <p><strong>Vantagens:</strong> Investimento pontual, propriedade completa, autonomia total.</p>
      <p><strong>Ideal para:</strong> Empresas com equipe técnica interna ou que preferem controlar todos os aspectos.</p>

      <h2>Como Decidir?</h2>
      <p>Faça-se estas perguntas:</p>
      <ol>
        <li>Qual é o meu orçamento disponível hoje?</li>
        <li>Tenho equipe técnica para manutenção?</li>
        <li>Preciso de suporte contínuo?</li>
        <li>Quero atualizações frequentes?</li>
        <li>Prefiro investimento único ou parcelado?</li>
      </ol>

      <h2>Na Pixelaria, oferecemos ambas as opções</h2>
      <p>Nossos planos de assinatura começam em R$ 147/mês e incluem tudo que você precisa. Já o modelo de projeto único varia conforme a complexidade, com valores a partir de R$ 2.500.</p>
      
      <p>O mais importante é escolher o modelo que faz sentido para sua realidade. Nossa equipe está pronta para te ajudar a tomar essa decisão.</p>
    `,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
    author: 'Equipe Pixelaria',
    publishedDate: '2025-11-10',
    readTime: '8 min',
    category: 'Negócios',
    tags: ['Planos', 'Dicas', 'Custos'],
    featured: true,
  },
  {
    id: 2,
    title: 'SEO para Iniciantes: Como fazer seu site aparecer no Google',
    slug: 'seo-iniciantes-google',
    excerpt: 'Aprenda os fundamentos de SEO e descubra técnicas práticas para melhorar o posicionamento do seu site nos resultados de busca do Google.',
    content: `
      <h2>O que é SEO?</h2>
      <p>SEO (Search Engine Optimization) é o conjunto de técnicas e estratégias usadas para melhorar o posicionamento de um site nos resultados de busca do Google e outros mecanismos de pesquisa. Um bom SEO significa mais visibilidade, mais visitantes e, consequentemente, mais oportunidades de negócio.</p>

      <h2>Por que SEO é importante para seu negócio?</h2>
      <p>Estar bem posicionado no Google não é questão de sorte - é resultado de um trabalho consistente de otimização. Considere que:</p>
      <ul>
        <li>75% dos usuários nunca passam da primeira página do Google</li>
        <li>O primeiro resultado orgânico recebe 28% dos cliques</li>
        <li>SEO gera tráfego gratuito e qualificado</li>
        <li>Sites otimizados transmitem mais credibilidade</li>
      </ul>

      <h2>Fundamentos de SEO: O que você precisa saber</h2>
      
      <h3>1. Palavras-chave (Keywords)</h3>
      <p>São os termos que seus clientes digitam no Google. Identifique as palavras-chave relevantes para seu negócio e use-as estrategicamente em:</p>
      <ul>
        <li>Títulos das páginas</li>
        <li>Descrições (meta descriptions)</li>
        <li>Conteúdo do site</li>
        <li>URLs das páginas</li>
        <li>Alt text das imagens</li>
      </ul>

      <h3>2. Conteúdo de Qualidade</h3>
      <p>O Google prioriza sites que oferecem valor real aos usuários. Crie conteúdo:</p>
      <ul>
        <li>Original e relevante</li>
        <li>Bem estruturado com títulos e subtítulos</li>
        <li>Atualizado regularmente</li>
        <li>Que responda às dúvidas dos usuários</li>
      </ul>

      <h3>3. Otimização Técnica</h3>
      <p>Aspectos técnicos que o Google avalia:</p>
      <ul>
        <li>Velocidade de carregamento</li>
        <li>Responsividade mobile</li>
        <li>Certificado SSL (HTTPS)</li>
        <li>Estrutura de URLs clara</li>
        <li>Sitemap XML</li>
      </ul>

      <h3>4. Link Building</h3>
      <p>Links de outros sites apontando para o seu aumentam sua autoridade. Obtenha links através de:</p>
      <ul>
        <li>Conteúdo de qualidade que vale compartilhar</li>
        <li>Parcerias com outros sites</li>
        <li>Guest posts em blogs relevantes</li>
        <li>Presença em diretórios confiáveis</li>
      </ul>

      <h2>Checklist básico de SEO</h2>
      <ol>
        <li>✅ Pesquise palavras-chave relevantes</li>
        <li>✅ Otimize títulos e meta descriptions</li>
        <li>✅ Crie conteúdo original e valioso</li>
        <li>✅ Otimize imagens (tamanho e alt text)</li>
        <li>✅ Garanta que o site é responsivo</li>
        <li>✅ Melhore a velocidade de carregamento</li>
        <li>✅ Instale certificado SSL</li>
        <li>✅ Cadastre no Google Search Console</li>
        <li>✅ Crie e envie sitemap XML</li>
        <li>✅ Produza conteúdo regularmente (blog)</li>
      </ol>

      <h2>Resultados levam tempo</h2>
      <p>SEO não é mágica instantânea. Os resultados geralmente aparecem após 3-6 meses de trabalho consistente. A chave é começar agora e manter a constância.</p>

      <h2>A Pixelaria cuida do SEO do seu site</h2>
      <p>Todos os nossos projetos incluem otimização SEO básica. Além disso, oferecemos consultoria avançada de SEO para empresas que querem dominar os resultados de busca em seu nicho.</p>
    `,
    image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=1200&h=600&fit=crop',
    author: 'Equipe Pixelaria',
    publishedDate: '2025-11-08',
    readTime: '12 min',
    category: 'SEO',
    tags: ['SEO', 'Google', 'Marketing Digital'],
    featured: true,
  },
  {
    id: 3,
    title: '10 Erros que podem arruinar o site da sua empresa',
    slug: '10-erros-site-empresa',
    excerpt: 'Evite os erros mais comuns que prejudicam a performance, experiência do usuário e conversões do seu site. Confira nossa lista completa.',
    content: `
      <h2>Introdução</h2>
      <p>Investir em um site profissional é fundamental, mas alguns erros podem comprometer completamente seus resultados. Veja os 10 erros mais comuns e como evitá-los.</p>

      <h2>1. Site lento demais</h2>
      <p>53% dos usuários abandonam sites que demoram mais de 3 segundos para carregar. Otimize imagens, use cache e escolha uma hospedagem de qualidade.</p>

      <h2>2. Não ser responsivo (mobile)</h2>
      <p>Mais de 60% dos acessos vêm de celulares. Se seu site não funciona bem no mobile, você está perdendo mais da metade dos seus visitantes.</p>

      <h2>3. Navegação confusa</h2>
      <p>Menu complicado, links quebrados, estrutura bagunçada - tudo isso faz o usuário desistir rapidamente. Mantenha a navegação simples e intuitiva.</p>

      <h2>4. Falta de Call-to-Action (CTA)</h2>
      <p>Se o visitante não sabe o que fazer no seu site, ele simplesmente vai embora. Use CTAs claros: "Solicite um orçamento", "Entre em contato", "Saiba mais".</p>

      <h2>5. Textos genéricos e sem propósito</h2>
      <p>Evite textos vagos como "somos uma empresa que preza pela qualidade". Seja específico: o que você faz, para quem, e quais problemas resolve.</p>

      <h2>6. Ausência de informações de contato</h2>
      <p>Esconder telefone, e-mail ou endereço gera desconfiança. Deixe suas informações de contato sempre visíveis e acessíveis.</p>

      <h2>7. Design ultrapassado</h2>
      <p>Um site com visual de 2010 transmite a mensagem de que sua empresa está parada no tempo. Invista em um design moderno e profissional.</p>

      <h2>8. Não ter certificado SSL (HTTPS)</h2>
      <p>Sites sem HTTPS são marcados como "não seguros" pelo navegador, afastando visitantes e prejudicando seu SEO no Google.</p>

      <h2>9. Conteúdo desatualizado</h2>
      <p>Ter uma seção de notícias com o último post de 2019 passa uma péssima impressão. Mantenha seu conteúdo atualizado ou remova seções obsoletas.</p>

      <h2>10. Falta de integração com redes sociais</h2>
      <p>Não aproveitar o potencial das redes sociais é desperdiçar oportunidades. Adicione links para seus perfis e botões de compartilhamento.</p>

      <h2>Conclusão</h2>
      <p>Evitar esses erros já coloca seu site na frente de muitos concorrentes. Na Pixelaria, todos os nossos projetos são desenvolvidos com as melhores práticas do mercado, garantindo um site profissional que realmente converte.</p>
    `,
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=600&fit=crop',
    author: 'Equipe Pixelaria',
    publishedDate: '2025-11-05',
    readTime: '10 min',
    category: 'Design',
    tags: ['UX/UI', 'Erros Comuns', 'Boas Práticas'],
    featured: false,
  },
  {
    id: 4,
    title: 'Landing Page vs Site Completo: Qual é melhor para você?',
    slug: 'landing-page-vs-site-completo',
    excerpt: 'Entenda as diferenças entre landing pages e sites completos, quando usar cada um e como maximizar suas conversões online.',
    content: `
      <h2>O que é uma Landing Page?</h2>
      <p>Landing Page (página de aterrissagem) é uma página única, focada em uma ação específica: capturar leads, vender um produto, promover um evento, etc. Ela tem um objetivo claro e elimina distrações.</p>

      <h2>O que é um Site Completo?</h2>
      <p>Um site completo é formado por múltiplas páginas (home, sobre, serviços, blog, contato, etc.) e oferece uma visão abrangente da empresa, seus produtos e serviços.</p>

      <h2>Quando usar Landing Page?</h2>
      <p>Landing Pages são ideais para:</p>
      <ul>
        <li>Campanhas de anúncios específicas (Google Ads, Facebook Ads)</li>
        <li>Lançamento de produtos ou serviços</li>
        <li>Captura de leads com iscas digitais (e-books, webinars)</li>
        <li>Promoções e eventos temporários</li>
        <li>Testes de validação de ideias</li>
      </ul>

      <h2>Quando usar Site Completo?</h2>
      <p>Sites completos são melhores para:</p>
      <ul>
        <li>Empresas estabelecidas que precisam apresentar portfólio completo</li>
        <li>Negócios com múltiplos serviços ou produtos</li>
        <li>Estratégia de marketing de conteúdo (blog)</li>
        <li>Construção de autoridade e credibilidade de longo prazo</li>
        <li>E-commerce com catálogo de produtos</li>
      </ul>

      <h2>Comparação direta</h2>
      
      <h3>Landing Page</h3>
      <p><strong>Vantagens:</strong></p>
      <ul>
        <li>Foco total em uma ação</li>
        <li>Taxa de conversão mais alta</li>
        <li>Desenvolvimento mais rápido</li>
        <li>Ideal para testes A/B</li>
        <li>Investimento menor</li>
      </ul>
      <p><strong>Desvantagens:</strong></p>
      <ul>
        <li>Escopo limitado</li>
        <li>Não serve para SEO de longo prazo</li>
        <li>Não apresenta empresa de forma completa</li>
      </ul>

      <h3>Site Completo</h3>
      <p><strong>Vantagens:</strong></p>
      <ul>
        <li>Apresentação completa da empresa</li>
        <li>Melhor para estratégias de SEO</li>
        <li>Mais credibilidade e profissionalismo</li>
        <li>Múltiplos pontos de conversão</li>
        <li>Suporta crescimento do negócio</li>
      </ul>
      <p><strong>Desvantagens:</strong></p>
      <ul>
        <li>Investimento maior</li>
        <li>Desenvolvimento mais demorado</li>
        <li>Requer mais manutenção</li>
      </ul>

      <h2>A melhor estratégia: Usar os dois!</h2>
      <p>A estratégia ideal para muitos negócios é ter:</p>
      <ul>
        <li>Um site completo como base institucional</li>
        <li>Landing Pages específicas para cada campanha ou produto</li>
      </ul>
      <p>Assim você constrói autoridade com o site principal e otimiza conversões com landing pages focadas.</p>

      <h2>Na Pixelaria, criamos ambos</h2>
      <p>Oferecemos tanto landing pages de alta conversão quanto sites completos robustos. Conte para nós seu objetivo e vamos recomendar a melhor solução.</p>
    `,
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=600&fit=crop',
    author: 'Equipe Pixelaria',
    publishedDate: '2025-11-03',
    readTime: '7 min',
    category: 'Estratégia',
    tags: ['Landing Page', 'Conversão', 'Estratégia'],
    featured: false,
  },
  {
    id: 5,
    title: 'Design Responsivo: Por que seu site precisa funcionar no mobile',
    slug: 'design-responsivo-mobile',
    excerpt: 'Mais de 60% dos acessos vêm de celulares. Descubra por que um design responsivo não é mais opcional e como ele impacta seus resultados.',
    content: `
      <h2>O mundo é mobile</h2>
      <p>Em 2025, mais de 60% de todo o tráfego da internet vem de dispositivos móveis. Se seu site não funciona bem no celular, você está literalmente perdendo mais da metade dos seus potenciais clientes.</p>

      <h2>O que é Design Responsivo?</h2>
      <p>Design Responsivo é a técnica que faz um site se adaptar automaticamente a qualquer tamanho de tela: desktop, tablet, celular. O layout, imagens e textos se reorganizam para proporcionar a melhor experiência em cada dispositivo.</p>

      <h2>Por que é crucial para seu negócio?</h2>

      <h3>1. Experiência do Usuário</h3>
      <p>Ninguém fica em um site que precisa dar zoom, rolar horizontalmente ou clicar em botões minúsculos. Um site responsivo oferece navegação confortável em qualquer tela.</p>

      <h3>2. SEO e Google</h3>
      <p>Desde 2015, o Google prioriza sites mobile-friendly nos resultados de busca. Sites não responsivos são penalizados e aparecem nas últimas posições.</p>

      <h3>3. Taxa de Conversão</h3>
      <p>57% dos usuários afirmam que não recomendam uma empresa com site mal otimizado para mobile. Um site responsivo aumenta significativamente suas conversões.</p>

      <h3>4. Credibilidade</h3>
      <p>Um site que não funciona bem no celular transmite amadorismo e falta de profissionalismo. Sua primeira impressão precisa ser impecável.</p>

      <h2>Características de um bom site responsivo</h2>
      <ul>
        <li>Layout fluído que se adapta a qualquer tela</li>
        <li>Imagens que redimensionam automaticamente</li>
        <li>Botões e links grandes o suficiente para tocar</li>
        <li>Menu mobile-friendly (hamburger menu)</li>
        <li>Textos legíveis sem zoom</li>
        <li>Velocidade de carregamento rápida</li>
        <li>Formulários fáceis de preencher no celular</li>
      </ul>

      <h2>Mobile First</h2>
      <p>A tendência atual é o "Mobile First" - desenvolver pensando primeiro na experiência mobile e depois adaptar para desktop. Por quê?</p>
      <ul>
        <li>A maioria dos acessos vem do celular</li>
        <li>Força a priorizar o essencial</li>
        <li>Melhora a performance geral</li>
        <li>Facilita a navegação em todas as telas</li>
      </ul>

      <h2>Teste seu site agora</h2>
      <p>Abra seu site no celular agora mesmo. Pergunte-se:</p>
      <ul>
        <li>É fácil navegar?</li>
        <li>Consigo ler tudo claramente?</li>
        <li>Os botões são fáceis de clicar?</li>
        <li>Carrega rápido?</li>
        <li>Formulários funcionam bem?</li>
      </ul>
      <p>Se a resposta for "não" para alguma dessas perguntas, está na hora de atualizar seu site.</p>

      <h2>Todos os sites da Pixelaria são 100% responsivos</h2>
      <p>Desenvolvemos com abordagem Mobile First, garantindo experiência perfeita em todos os dispositivos. Seu site funcionará impecavelmente em celulares, tablets e desktops.</p>
    `,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=600&fit=crop',
    author: 'Equipe Pixelaria',
    publishedDate: '2025-11-01',
    readTime: '6 min',
    category: 'Design',
    tags: ['Mobile', 'Responsivo', 'UX'],
    featured: false,
  },
  {
    id: 6,
    title: 'Como atrair mais clientes com Marketing de Conteúdo',
    slug: 'atrair-clientes-marketing-conteudo',
    excerpt: 'Estratégias comprovadas de marketing de conteúdo para aumentar sua autoridade online e conquistar mais clientes através do seu site.',
    content: `
      <h2>O que é Marketing de Conteúdo?</h2>
      <p>Marketing de Conteúdo é a estratégia de criar e distribuir conteúdo relevante e valioso para atrair, engajar e converter seu público-alvo. Em vez de vender diretamente, você educa e constrói relacionamento.</p>

      <h2>Por que funciona tão bem?</h2>
      <p>As pessoas não querem ser bombardeadas com anúncios. Elas querem soluções para seus problemas. Quando você oferece conteúdo útil gratuitamente, você:</p>
      <ul>
        <li>Constrói confiança e autoridade</li>
        <li>Atrai visitantes qualificados</li>
        <li>Educa seu mercado</li>
        <li>Fica na mente dos consumidores</li>
        <li>Melhora seu SEO organicamente</li>
      </ul>

      <h2>Tipos de Conteúdo que Convertem</h2>

      <h3>1. Blog Posts</h3>
      <p>Artigos educativos como este são a base do marketing de conteúdo. Responda perguntas frequentes, ensine, compartilhe experiências.</p>

      <h3>2. Vídeos</h3>
      <p>Tutoriais, bastidores, cases de sucesso. Vídeos geram mais engajamento que qualquer outro formato.</p>

      <h3>3. E-books e Guias</h3>
      <p>Materiais aprofundados são excelentes para captura de leads. Ofereça algo valioso em troca do e-mail.</p>

      <h3>4. Infográficos</h3>
      <p>Informações complexas de forma visual. Fáceis de consumir e compartilhar.</p>

      <h3>5. Cases de Sucesso</h3>
      <p>Mostre resultados reais. Nada vende mais que prova social.</p>

      <h3>6. Webinars e Lives</h3>
      <p>Interação em tempo real cria conexão forte com sua audiência.</p>

      <h2>Como criar uma estratégia de Marketing de Conteúdo</h2>

      <h3>Passo 1: Conheça sua persona</h3>
      <p>Quem é seu cliente ideal? Quais são suas dores, dúvidas, objetivos? Crie conteúdo pensando nessa pessoa específica.</p>

      <h3>Passo 2: Mapeie a jornada do cliente</h3>
      <ul>
        <li><strong>Descoberta:</strong> Conteúdo educativo amplo</li>
        <li><strong>Consideração:</strong> Comparativos, guias</li>
        <li><strong>Decisão:</strong> Cases, demonstrações, garantias</li>
      </ul>

      <h3>Passo 3: Crie um calendário editorial</h3>
      <p>Consistência é fundamental. Planeje seus conteúdos com antecedência. Estabeleça uma frequência realista (ex: 2 posts por semana) e mantenha.</p>

      <h3>Passo 4: Diversifique os canais</h3>
      <p>Não dependa de um único canal. Publique no blog, compartilhe nas redes sociais, envie newsletter, grave vídeos.</p>

      <h3>Passo 5: Otimize para SEO</h3>
      <p>Use palavras-chave estratégicas, otimize títulos e meta descriptions, crie links internos. Seu conteúdo precisa ser encontrado.</p>

      <h3>Passo 6: Promova seu conteúdo</h3>
      <p>Criar é só metade do trabalho. Promova ativamente nas redes sociais, grupos, parcerias, e-mail marketing.</p>

      <h3>Passo 7: Meça resultados</h3>
      <p>Acompanhe métricas: visitas, tempo de página, compartilhamentos, conversões. Ajuste sua estratégia com base nos dados.</p>

      <h2>Erros comuns a evitar</h2>
      <ul>
        <li>Vender demais, educar de menos</li>
        <li>Inconsistência na publicação</li>
        <li>Conteúdo raso e genérico</li>
        <li>Ignorar SEO</li>
        <li>Não promover o conteúdo</li>
        <li>Não ter CTA claro</li>
      </ul>

      <h2>Comece hoje mesmo</h2>
      <p>Você não precisa de um blog super elaborado para começar. Comece simples:</p>
      <ol>
        <li>Liste 10 perguntas que seus clientes fazem</li>
        <li>Escreva um artigo respondendo cada uma</li>
        <li>Publique uma vez por semana</li>
        <li>Compartilhe nas redes sociais</li>
        <li>Repita o processo</li>
      </ol>

      <h2>A Pixelaria pode te ajudar</h2>
      <p>Todos os nossos sites incluem estrutura para blog otimizado para SEO. Além disso, oferecemos consultoria de marketing de conteúdo para empresas que querem dominar sua presença digital.</p>
    `,
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=600&fit=crop',
    author: 'Equipe Pixelaria',
    publishedDate: '2025-10-28',
    readTime: '9 min',
    category: 'Marketing',
    tags: ['Marketing Digital', 'Conteúdo', 'Clientes'],
    featured: false,
  },
];

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Buscar o artigo pelo slug
  const post = blogPosts.find(p => p.slug === slug);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Redirecionar se artigo não encontrado
  if (!post) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Card variant="elevated" padding="xl" className="text-center max-w-md">
          <h1 className="text-3xl font-bold mb-4 text-neutral-900">Artigo não encontrado</h1>
          <p className="text-neutral-600 mb-6">
            O artigo que você procura não existe ou foi removido.
          </p>
          <Button variant="primary" onClick={() => navigate('/blog')}>
            Voltar ao Blog
          </Button>
        </Card>
      </div>
    );
  }

  // Artigos relacionados (mesma categoria ou tags)
  const relatedPosts = blogPosts
    .filter(p => 
      p.id !== post.id && 
      (p.category === post.category || p.tags.some(tag => post.tags.includes(tag)))
    )
    .slice(0, 3);

  return (
    <>
      <SEO
        title={`${post.title} | Blog Pixelaria`}
        description={post.excerpt}
        canonical={`https://pixelaria.com.br/blog/${post.slug}`}
        keywords={post.tags.join(', ')}
        ogImage={post.image}
        schema={SCHEMAS.article({
          title: post.title,
          description: post.excerpt,
          image: post.image,
          author: post.author,
          datePublished: post.publishedDate,
        })}
      />

      <div className="bg-neutral-50 min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-neutral-200">
          <div className="container-custom py-4">
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Link to="/" className="hover:text-primary-600 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/blog" className="hover:text-primary-600 transition-colors">
                Blog
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-neutral-900 font-medium line-clamp-1">{post.title}</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          <Button
            variant="outline"
            leftIcon={<ArrowLeft className="w-5 h-5" />}
            onClick={() => navigate('/blog')}
            className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm hover:bg-white"
          >
            Voltar
          </Button>
        </div>

        {/* Content */}
        <div className="container-custom -mt-32 relative z-10 pb-16">
          <div className="max-w-4xl mx-auto">
            <Card variant="elevated" padding="none" className="overflow-hidden">
              {/* Header */}
              <div className="p-8 md:p-12 bg-white">
                <Badge variant="primary" size="lg" className="mb-6">
                  {post.category}
                </Badge>
                
                <h1 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6 leading-tight">
                  {post.title}
                </h1>

                <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-neutral-200">
                  <div className="flex items-center gap-2 text-neutral-600">
                    <User className="w-5 h-5 text-primary-600" />
                    <span className="font-medium">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-600">
                    <Calendar className="w-5 h-5 text-primary-600" />
                    <span>
                      {new Date(post.publishedDate).toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-600">
                    <Clock className="w-5 h-5 text-primary-600" />
                    <span>{post.readTime} de leitura</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Share2 className="w-4 h-4" />}
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: post.title,
                          text: post.excerpt,
                          url: window.location.href,
                        });
                      }
                    }}
                  >
                    Compartilhar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Bookmark className="w-4 h-4" />}
                  >
                    Salvar
                  </Button>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-8 md:p-12 bg-white border-t border-neutral-200">
                <div 
                  className="prose prose-lg max-w-none
                    prose-headings:font-bold prose-headings:text-neutral-900
                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                    prose-p:text-neutral-700 prose-p:leading-relaxed prose-p:mb-6
                    prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-neutral-900 prose-strong:font-semibold
                    prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                    prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
                    prose-li:text-neutral-700 prose-li:my-2
                    prose-blockquote:border-l-4 prose-blockquote:border-primary-500
                    prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-neutral-600"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              {/* Tags */}
              <div className="p-8 md:p-12 bg-neutral-50 border-t border-neutral-200">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-primary-600" />
                  <h3 className="font-bold text-neutral-900">Tags:</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="default">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 rounded-2xl p-10 text-center text-white overflow-hidden shadow-soft-lg">
                <div className="absolute inset-0 opacity-10">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute -top-20 -right-20 w-64 h-64 bg-white rounded-full blur-3xl"
                  />
                </div>

                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-4">
                    Gostou deste conteúdo?
                  </h2>
                  <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
                    Então você vai amar trabalhar conosco. Vamos criar seu site profissional?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={() => navigate('/planos')}
                    >
                      Ver Planos
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="bg-white/10 border-white text-white hover:bg-white hover:text-primary-600"
                      onClick={() => navigate('/contato')}
                    >
                      Falar com Especialista
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-16"
              >
                <h2 className="text-3xl font-bold mb-8 text-neutral-900">
                  Artigos Relacionados
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <Card
                      key={relatedPost.id}
                      hover="lift"
                      padding="none"
                      className="overflow-hidden group cursor-pointer"
                      onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-6">
                        <Badge variant="primary" size="sm" className="mb-3">
                          {relatedPost.category}
                        </Badge>
                        <h3 className="text-lg font-bold mb-2 text-neutral-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-neutral-600 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

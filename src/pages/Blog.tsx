import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, Search, Tag, TrendingUp, Sparkles, BookOpen } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { SEO } from '../components/SEO';
import { PAGE_SEO, SCHEMAS } from '../utils/seo';

// Mock de posts do blog
const blogPosts = [
  {
    id: 1,
    title: 'Como escolher o melhor plano para criar seu site profissional',
    slug: 'como-escolher-plano-site-profissional',
    excerpt: 'Descubra qual modelo de contratação se encaixa melhor no seu negócio: assinatura mensal ou compra única. Compare custos, benefícios e tome a decisão certa.',
    content: 'Conteúdo completo do artigo...',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
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
    content: 'Conteúdo completo do artigo...',
    image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&h=500&fit=crop',
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
    content: 'Conteúdo completo do artigo...',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=500&fit=crop',
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
    content: 'Conteúdo completo do artigo...',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop',
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
    content: 'Conteúdo completo do artigo...',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop',
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
    content: 'Conteúdo completo do artigo...',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop',
    author: 'Equipe Pixelaria',
    publishedDate: '2025-10-28',
    readTime: '9 min',
    category: 'Marketing',
    tags: ['Marketing Digital', 'Conteúdo', 'Clientes'],
    featured: false,
  },
];

const categories = ['Todos', ...Array.from(new Set(blogPosts.map(post => post.category)))];
const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

export const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
    
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const latestPost = featuredPosts[0];

  return (
    <>
      <SEO
        title={PAGE_SEO.blog.title}
        description={PAGE_SEO.blog.description}
        canonical={PAGE_SEO.blog.canonical}
        keywords={PAGE_SEO.blog.keywords}
        schema={SCHEMAS.website}
      />

      <div className="bg-neutral-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 py-20 overflow-hidden border-b border-neutral-200">
          <div className="absolute inset-0 opacity-5">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 20, repeat: Infinity }}
              className="absolute top-0 right-0 w-96 h-96 bg-primary-400 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-400 rounded-full blur-3xl"
            />
          </div>

          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <Badge variant="primary" size="lg" className="mb-6">
                <BookOpen className="w-4 h-4" />
                Blog Pixelaria
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-black mb-6 text-neutral-900">
                Dicas e Insights sobre Web
              </h1>
              <p className="text-xl text-neutral-600 mb-8">
                Aprenda sobre desenvolvimento web, SEO, design e estratégias para fazer seu negócio crescer online
              </p>

              {/* Search Bar */}
              <div className="max-w-xl mx-auto">
                <Input
                  type="text"
                  placeholder="Buscar artigos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="w-5 h-5" />}
                  variant="filled"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <div className="container-custom py-16">
          {/* Featured Post */}
          {latestPost && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-primary-600" />
                <h2 className="text-2xl font-bold text-neutral-900">Artigo em Destaque</h2>
              </div>
              
              <Card hover="lift" padding="none" className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto">
                    <img
                      src={latestPost.image}
                      alt={latestPost.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge variant="warning" className="absolute top-4 left-4">
                      <Sparkles className="w-3 h-3" />
                      Destaque
                    </Badge>
                  </div>
                  <div className="p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant="primary">{latestPost.category}</Badge>
                        {latestPost.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="default" size="sm">{tag}</Badge>
                        ))}
                      </div>
                      <h3 className="text-3xl font-bold mb-4 text-neutral-900 line-clamp-2">
                        {latestPost.title}
                      </h3>
                      <p className="text-neutral-600 mb-6 line-clamp-3">
                        {latestPost.excerpt}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(latestPost.publishedDate).toLocaleDateString('pt-BR', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {latestPost.readTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {latestPost.author}
                        </div>
                      </div>
                      <Button
                        variant="primary"
                        rightIcon={<ArrowRight className="w-5 h-5" />}
                        onClick={() => window.location.href = `/blog/${latestPost.slug}`}
                      >
                        Ler Artigo Completo
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Filters */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-primary-600" />
              <h3 className="font-bold text-neutral-900">Categorias:</h3>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map(category => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? 'primary' : 'default'}
                  size="lg"
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedTag(null);
                  }}
                  className="cursor-pointer hover:scale-105 transition-transform"
                >
                  {category}
                </Badge>
              ))}
            </div>

            {selectedTag && (
              <div className="flex items-center gap-2 mb-4">
                <Badge
                  variant="secondary"
                  size="lg"
                  removable
                  onRemove={() => setSelectedTag(null)}
                >
                  Tag: {selectedTag}
                </Badge>
              </div>
            )}
          </div>

          {/* Posts Grid */}
          <div className="mb-8">
            <p className="text-neutral-600 mb-6">
              Mostrando <strong>{filteredPosts.length}</strong> artigo{filteredPosts.length !== 1 ? 's' : ''}
            </p>
          </div>

          {filteredPosts.length === 0 ? (
            <Card variant="elevated" padding="xl" className="text-center">
              <p className="text-neutral-600 text-lg">
                Nenhum artigo encontrado com os filtros selecionados.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Todos');
                  setSelectedTag(null);
                }}
                className="mt-4"
              >
                Limpar Filtros
              </Button>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    hover="lift"
                    padding="none"
                    className="h-full flex flex-col overflow-hidden group cursor-pointer"
                    onClick={() => window.location.href = `/blog/${post.slug}`}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="mb-3">
                        <Badge variant="primary" size="sm">{post.category}</Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-neutral-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-neutral-600 text-sm mb-4 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-neutral-500 pt-4 border-t border-neutral-100">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.publishedDate).toLocaleDateString('pt-BR', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Tags Cloud */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <Card variant="elevated" padding="lg">
              <h3 className="text-xl font-bold mb-4 text-neutral-900">Tags Populares</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTag === tag ? 'secondary' : 'default'}
                    onClick={() => setSelectedTag(tag)}
                    className="cursor-pointer hover:scale-105 transition-transform"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 rounded-2xl p-10 text-center  overflow-hidden shadow-soft-lg">
              {/* Background decoration */}
              <div className="absolute inset-0 opacity-10">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                  transition={{ duration: 20, repeat: Infinity }}
                  className="absolute -top-20 -right-20 w-64 h-64 bg-white rounded-full blur-3xl"
                />
                <motion.div
                  animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
                  transition={{ duration: 15, repeat: Infinity }}
                  className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary-300 rounded-full blur-3xl"
                />
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-4">
                  Pronto para criar seu site profissional?
                </h2>
                <p className="text-lg mb-6 max-w-2xl mx-auto">
                  Aplique o conhecimento do blog e transforme sua presença digital com a Pixelaria
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="secondary"
                    size="lg"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Ver Planos
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white/10 border-white hover:bg-white hover:text-primary-600"
                  >
                    Falar com Especialista
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

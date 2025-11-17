import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark, Tag, ChevronRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/SEO';
import { SCHEMAS } from '../utils/seo';

import { blogPosts } from '../mocks/blog';

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
        keywords={post.tags}
        ogImage={post.image}
        schema={SCHEMAS.article({
          title: post.title,
          description: post.excerpt,
          image: post.image,
          author: post.author,
          publishedDate: post.publishedDate,
          url: `https://pixelaria.com.br/blog/${post.slug}`,
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
              <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 rounded-2xl p-10 text-center overflow-hidden shadow-soft-lg">
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
                  <p className="text-lg mb-6 max-w-2xl mx-auto">
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
                      className="bg-white/10 border-white hover:bg-white hover:text-primary-600"
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

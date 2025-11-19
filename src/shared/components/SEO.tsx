import { Helmet } from 'react-helmet-async';

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  ogImageAlt?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  nofollow?: boolean;
  schema?: object;
}

export const SEO = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = '/og-image.jpg',
  ogImageAlt = 'Pixelaria - Criação de Sites Profissionais',
  twitterCard = 'summary_large_image',
  keywords = [],
  author = 'Pixelaria',
  publishedTime,
  modifiedTime,
  noindex = false,
  nofollow = false,
  schema,
}: SEOProps) => {
  const siteUrl = 'https://www.pixelaria.com.br'; // Substitua pela sua URL real
  const fullUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const fullTitle = `${title} | Pixelaria`;
  const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  // Default keywords if none provided
  const allKeywords = [
    'criação de sites',
    'desenvolvimento web',
    'sites profissionais',
    'design responsivo',
    ...keywords,
  ].join(', ');

  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow',
  ].join(', ');

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robotsContent} />
      {canonical && <link rel="canonical" href={fullUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:site_name" content="Pixelaria" />
      <meta property="og:locale" content="pt_BR" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={ogImageAlt} />

      {/* Additional SEO Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#6366f1" />

      {/* Structured Data (Schema.org) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

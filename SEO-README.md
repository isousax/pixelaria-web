# SEO - Configuração Completa

## ✅ O que foi implementado

### 1. **Componente SEO Reutilizável** (`src/components/SEO.tsx`)
- Meta tags essenciais (title, description, keywords)
- Open Graph para Facebook/LinkedIn
- Twitter Cards
- Canonical URLs
- Schema.org structured data (JSON-LD)

### 2. **Arquivo de Configuração SEO** (`src/utils/seo.ts`)
- Dados SEO para todas as páginas
- Templates de Schema.org (Organization, Website, Service, FAQ, Article)
- Configurações centralizadas

### 3. **Meta Tags Base** (`index.html`)
- Tags essenciais no HTML
- Favicons configurados
- Preconnect para performance

### 4. **SEO Implementado em Todas as Páginas**
- ✅ Home
- ✅ Projetos
- ✅ Serviços
- ✅ Planos
- ✅ Contato
- ✅ Processo (se existir)
- ✅ Blog (se existir)

### 5. **Arquivos de Indexação**
- `public/robots.txt` - Controla indexação de bots
- `public/sitemap.xml` - Mapa do site para Google

## 🔧 Próximos Passos IMPORTANTES

### 1. **Substitua a URL do site**
No arquivo `src/utils/seo.ts`, linha 1, altere:
```typescript
siteUrl: 'https://www.pixelaria.com.br', // MUDAR PARA SUA URL REAL
```

Também atualize em:
- `public/robots.txt` (última linha)
- `public/sitemap.xml` (todas as URLs)

### 2. **Crie a Imagem Open Graph**
Crie uma imagem `og-image.jpg` na pasta `public/` com as seguintes características:
- **Tamanho:** 1200x630px (recomendado pelo Facebook/LinkedIn)
- **Formato:** JPG ou PNG
- **Conteúdo sugerido:**
  - Logo da Pixelaria
  - Slogan: "Criação de Sites Profissionais por R$90/mês"
  - Visual atraente e profissional
  - Texto legível mesmo em miniaturas

**Ferramentas para criar:**
- Canva (templates de Open Graph prontos)
- Figma
- Adobe Photoshop/Illustrator

### 3. **Configure Favicons**
Adicione na pasta `public/`:
- `favicon.svg` (ícone principal)
- `favicon-32x32.png`
- `favicon-16x16.png`
- `apple-touch-icon.png` (180x180px)
- `site.webmanifest`

**Gerador recomendado:** https://realfavicongenerator.net/

### 4. **Google Search Console**
1. Acesse: https://search.google.com/search-console
2. Adicione sua propriedade (domínio ou URL)
3. Verifique a propriedade:
   - Copie o código de verificação fornecido
   - Cole no `index.html` na linha 41 (descomente e substitua)
4. Envie o sitemap:
   - URL: `https://www.pixelaria.com.br/sitemap.xml`

### 5. **Teste suas Meta Tags**
Antes de publicar, teste em:

**Facebook/LinkedIn Debugger:**
- https://developers.facebook.com/tools/debug/

**Twitter Card Validator:**
- https://cards-dev.twitter.com/validator

**Rich Results Test (Google):**
- https://search.google.com/test/rich-results

**Schema Markup Validator:**
- https://validator.schema.org/

### 6. **Adicione Redes Sociais**
No arquivo `src/utils/seo.ts`, linha 32-36, descomente e adicione suas URLs:
```typescript
sameAs: [
  'https://www.facebook.com/pixelaria',
  'https://www.instagram.com/pixelaria',
  'https://www.linkedin.com/company/pixelaria',
],
```

## 📊 Monitoramento

### Google Analytics
Já está configurado? Se não:
1. Crie conta no Google Analytics 4
2. Adicione o código de tracking no `index.html`

### Google Tag Manager (Opcional)
Para tracking avançado de eventos e conversões.

## 🎯 Boas Práticas Implementadas

✅ **Títulos únicos por página** - Cada página tem título específico
✅ **Descrições otimizadas** - 150-160 caracteres, persuasivas
✅ **Keywords relevantes** - Palavras-chave estratégicas por página
✅ **Canonical URLs** - Evita conteúdo duplicado
✅ **Structured Data** - Rich snippets no Google
✅ **Open Graph** - Compartilhamento bonito nas redes sociais
✅ **Mobile-friendly** - Meta viewport configurada
✅ **Robots.txt** - Controle de indexação
✅ **Sitemap.xml** - Facilita descoberta pelo Google

## ⚠️ Evitando Problemas Comuns

### Problema: DNS aparece no lugar do título
**Solução:** ✅ Já resolvido! O componente SEO define títulos específicos por página.

### Problema: Descrição genérica
**Solução:** ✅ Já resolvido! Cada página tem descrição única e persuasiva.

### Problema: Imagem quebrada no compartilhamento
**Solução:** Crie o arquivo `og-image.jpg` conforme instruções acima.

### Problema: Site não aparece no Google
**Soluções:**
1. Verifique se está no Google Search Console
2. Aguarde 1-2 semanas após indexação
3. Crie backlinks (outros sites linkando para você)
4. Publique conteúdo regularmente no blog

## 🚀 Performance SEO

Para melhorar ainda mais:

1. **Core Web Vitals** - Otimize velocidade (Lighthouse)
2. **Conteúdo de qualidade** - Publique blog posts regularmente
3. **Backlinks** - Consiga links de sites relevantes
4. **Local SEO** - Cadastre no Google Meu Negócio
5. **SSL/HTTPS** - Certifique-se que está ativo

## 📝 Checklist Final

Antes de publicar, verifique:

- [ ] URL do site atualizada em `seo.ts`
- [ ] Imagem `og-image.jpg` criada e na pasta `public/`
- [ ] Favicons criados e na pasta `public/`
- [ ] Google Search Console configurado
- [ ] Sitemap enviado ao Google
- [ ] Redes sociais adicionadas em `seo.ts`
- [ ] Meta tags testadas nos validadores
- [ ] robots.txt com URL correta
- [ ] sitemap.xml com URLs corretas

## 💡 Dicas Extras

1. **Atualize datas regularmente** - Mantenha `lastmod` no sitemap atualizado
2. **Monitore posições** - Use Google Search Console para ver ranking
3. **Analise concorrentes** - Veja o que sites similares estão fazendo
4. **Crie conteúdo** - Blog posts ajudam muito no SEO
5. **Links internos** - Link entre páginas do seu site

---

## 🆘 Suporte

Se tiver dúvidas sobre SEO, consulte:
- [Google Search Central](https://developers.google.com/search)
- [Moz Beginner's Guide to SEO](https://moz.com/beginners-guide-to-seo)
- [Schema.org Documentation](https://schema.org/docs/documents.html)

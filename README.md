# Pixelaria - Site Institucional

Site institucional e painel do cliente da agência Pixelaria — serviço de criação e manutenção de sites profissionais.

## 🚀 Rodar localmente

```bash
npm i && npm run dev
```

O site estará disponível em `http://localhost:5173`

## 🛠️ Tech Stack

- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS v4** - Estilização
- **React Router DOM** - Roteamento
- **Framer Motion** - Animações
- **React Hook Form** - Gerenciamento de formulários
- **Zustand** - Estado global (toasts)
- **Lucide React** - Ícones

## 📁 Estrutura do Projeto

```
pixelaria-website/
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer, Layout
│   │   └── ui/              # Button, Card, Input, Textarea, Modal, Toast
│   ├── pages/               # 11 páginas
│   │   ├── Home.tsx         # Landing page com pricing
│   │   ├── Servicos.tsx     # Lista de serviços
│   │   ├── Planos.tsx       # Planos e serviços adicionais
│   │   ├── Projetos.tsx     # Portfólio (grid + modal)
│   │   ├── Processo.tsx     # 7 etapas do processo
│   │   ├── Onboarding.tsx   # Wizard multi-step
│   │   ├── Dashboard.tsx    # Área do cliente
│   │   ├── Blog.tsx
│   │   ├── Contato.tsx
│   │   ├── Terms.tsx
│   │   └── Privacy.tsx
│   ├── mocks/               # Dados mockados
│   │   ├── projects.ts      # 9 projetos
│   │   ├── pricing.ts       # Planos e serviços
│   │   ├── services.ts      # 4 serviços
│   │   ├── dashboard.ts     # Sites, faturas, tickets
│   │   └── process.ts       # 7 etapas
│   ├── hooks/
│   │   └── useToast.ts      # Zustand store
│   ├── utils/
│   │   └── helpers.ts       # WhatsApp, formatadores
│   ├── types/
│   │   └── index.ts         # TypeScript types
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 📄 Páginas e Rotas

### Públicas
- `/` - Home com hero, pricing toggle, comparação de planos
- `/servicos` - Grid de serviços com ícones
- `/planos` - Cards de planos (R$90/mês e R$2500 única vez)
- `/projetos` - Portfólio com filtro por categoria + modal
- `/processo` - 7 etapas do processo de desenvolvimento
- `/blog` - Blog (placeholder)
- `/contato` - Formulário com integração WhatsApp
- `/terms` - Termos de uso
- `/privacy` - Política de privacidade

### Área do Cliente
- `/onboarding` - Wizard 5 etapas para briefing
- `/dashboard` - Painel com sites, faturas e tickets

## 🎨 Design System

### Cores
- **Primary**: Azul (#4d5ff5 → #2e3889)
- **Secondary**: Roxo (#9333ea → #581c87)
- **Background**: #F6F7F9 (cinza claro)
- **Neutral**: Escala de cinzas

### Tipografia
- Font: Inter (Google Fonts)
- Sizes: text-sm, base, lg, xl, 2xl, 3xl, 4xl

### Componentes
- **Button**: 4 variantes (primary, secondary, outline, ghost) + 3 tamanhos
- **Card**: Container com sombra suave e hover effect
- **Input/Textarea**: Campos com label, erro e helper text
- **Modal**: Overlay com AnimatePresence, ESC key e backdrop click
- **Toast**: Notificações (success, error, info) com auto-dismiss

## 📱 Funcionalidades Principais

### Home
- Hero section com proposta de valor
- **Pricing toggle**: Assinatura (R$90/mês) vs Compra única (R$2500)
- Tabela comparativa com 10 recursos
- 4 cards de benefícios
- CTAs com integração WhatsApp

### Projetos
- Grid responsivo 3 colunas
- Filtro por categoria (Todos, Corporativo, E-commerce, etc.)
- Modal com detalhes: imagens, descrição, tech stack, data
- Badge "Destaque" nos projetos featured

### Onboarding
- **5 etapas**:
  1. Informações básicas (nome, email, empresa, site atual)
  2. Objetivos (propósito, público-alvo, diferencial)
  3. Conteúdo (seções, imagens, textos prontos)
  4. Funcionalidades (formulários, galeria, blog, e-commerce)
  5. Contato final
- Validação com React Hook Form
- Barra de progresso
- Navegação entre etapas com animação

### Dashboard
- **Sites**: Lista com status (ativo, manutenção, em desenvolvimento)
- **Faturas**: Tabela com status de pagamento e valores
- **Tickets**: Sistema completo
  - Criar solicitação (tipo, descrição, estimativa de custo)
  - Visualizar tickets com status
  - Modal com detalhes
- Simulação de API com delays

## 🔧 Configuração

### Variáveis de Ambiente
Crie `.env` na raiz:

```env
# WhatsApp
VITE_WHATSAPP_NUMBER=5511999999999

# API (futuro backend)
VITE_API_URL=http://localhost:3000/api
```

### WhatsApp
Edite em `src/utils/helpers.ts`:

```typescript
export const WHATSAPP_NUMBER = '5511999999999';
```

Usado em:
- CTAs da Home
- Botão "Fale Conosco" do Header
- Página de Contato

## 🚀 Deploy

### Build

```bash
npm run build
```

Arquivos otimizados em `dist/`.

### Vercel

```bash
npm i -g vercel
vercel
```

Ou conecte o repositório no dashboard.

### Netlify

```bash
npm run build
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

Ou arraste `dist/` no dashboard.

### GitHub Pages

```bash
# Adicionar no vite.config.ts:
base: '/pixelaria-website/'

npm run build
npx gh-pages -d dist
```

## 🧪 Scripts

```bash
npm run dev      # Dev server na porta 5173
npm run build    # Build para produção
npm run preview  # Preview da build
npm run lint     # Checar erros ESLint
```

## 🔄 Migração para Backend Real

Atualmente usa **mocks** em `src/mocks/`. Para integrar backend:

### 1. Criar serviço de API

```typescript
// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### 2. Substituir imports

**Antes (mock):**
```typescript
import { dashboardApi } from '../mocks/dashboard';
const sites = await dashboardApi.getSites();
```

**Depois (API real):**
```typescript
import api from '../services/api';
const { data } = await api.get('/sites');
```

### 3. Endpoints necessários

```
GET    /sites              # Sites do cliente
GET    /invoices           # Faturas
GET    /tickets            # Tickets
POST   /tickets            # Criar ticket
PATCH  /tickets/:id        # Aprovar ticket
POST   /onboarding         # Enviar briefing
POST   /contact            # Formulário contato
GET    /projects           # Portfólio (público)
```

### 4. Autenticação

Dashboard precisa de:
- Login (`POST /auth/login`)
- Token JWT armazenado em `localStorage`
- Rota privada com redirect para `/login`

Exemplo:

```typescript
// src/components/PrivateRoute.tsx
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

// App.tsx
<Route path="/dashboard" element={
  <PrivateRoute>
    <Dashboard />
  </PrivateRoute>
} />
```

## 📝 Dados Mockados

### `projects.ts`
9 projetos em categorias variadas:
- Corporativo (consultoria médica, advocacia, educação)
- E-commerce (restaurante)
- Portfólio (construtora, imobiliária)
- Landing Page (academia)
- Institucional (odontologia, tecnologia)

### `pricing.ts`
**Plano Assinatura**: R$90/mês
- Hospedagem inclusa
- Backups automáticos
- 1 alteração/mês
- Suporte prioritário
- SLA 24h

**Plano Compra Única**: R$2.500
- Site completo
- Entrega de código-fonte
- Treinamento
- 30 dias de suporte

**Serviços adicionais**:
- Alteração extra: R$40
- Alteração urgente: R$80
- Código-fonte: R$1.500
- Página adicional: R$200
- E-commerce: R$800

### `dashboard.ts`
- 2 sites (1 ativo, 1 em manutenção)
- 4 faturas (2 pagas, 2 pendentes)
- 4 tickets (aberto, em andamento, aprovado, concluído)

## 🎯 Próximos Passos

### Funcionalidades
- [ ] Sistema de autenticação (JWT)
- [ ] Gateway de pagamento (Mercado Pago/Stripe)
- [ ] Blog com CMS (Strapi/Sanity)
- [ ] Upload de imagens no onboarding
- [ ] Painel admin
- [ ] Email notifications (SendGrid/Resend)
- [ ] Chat ao vivo (Tawk.to)
- [ ] Google Analytics

### Melhorias Técnicas
- [ ] Testes (Vitest + Testing Library)
- [ ] E2E tests (Playwright)
- [ ] CI/CD (GitHub Actions)
- [ ] Docker
- [ ] Sentry (error tracking)
- [ ] Lighthouse optimization

## 📄 Licença

Propriedade da Pixelaria.

## 👥 Contato

- Email: contato@pixelaria.com.br
- WhatsApp: (11) 99999-9999

---

Desenvolvido com ❤️ pela equipe Pixelaria

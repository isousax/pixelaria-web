# Fluxos de Usuário - Pixelaria

Este documento descreve os principais fluxos de navegação e interação no site da Pixelaria.

## 1. Fluxo de Contratação (Visitante → Cliente)

### 1.1. Descoberta
```
Landing Page (/) 
  → Visualiza proposta de valor
  → Vê planos e preços
  → Compara recursos (assinatura vs compra única)
```

### 1.2. Exploração
```
Portfólio (/projetos)
  → Filtra por categoria
  → Abre modal de projeto
  → Visualiza detalhes técnicos

Serviços (/servicos)
  → Conhece serviços oferecidos
  → Entende diferenciais

Processo (/processo)
  → Visualiza as 7 etapas
  → Entende metodologia
```

### 1.3. Decisão
```
Planos (/planos)
  → Compara planos detalhadamente
  → Vê serviços adicionais
  → Clica em "Escolher Plano"
```

### 1.4. Conversão
```
Contato via WhatsApp
  ├─ CTA Header "Fale Conosco"
  ├─ CTAs na Home
  ├─ Botões dos planos
  └─ Página de Contato (/contato)
      → Preenche formulário
      → Abre WhatsApp com mensagem pré-formatada
```

### 1.5. Onboarding
```
Wizard Multi-Step (/onboarding)
  
Etapa 1: Informações Básicas
  → Nome, email, empresa
  → URL do site atual (se houver)
  
Etapa 2: Objetivos
  → Propósito do site
  → Público-alvo
  → Diferencial competitivo
  
Etapa 3: Conteúdo
  → Seções desejadas
  → Tem imagens próprias?
  → Tem textos prontos?
  
Etapa 4: Funcionalidades
  → Formulário de contato
  → Galeria de imagens
  → Blog
  → E-commerce
  → Outras
  
Etapa 5: Finalização
  → Telefone
  → Melhor horário para contato
  → Observações
  → Submete briefing
```

## 2. Fluxo do Cliente (Área Logada)

### 2.1. Dashboard Principal
```
Login (futuro) 
  → Dashboard (/dashboard)
      ├─ Visualiza sites ativos
      ├─ Consulta faturas
      └─ Gerencia tickets
```

### 2.2. Gerenciamento de Sites
```
Dashboard - Seção "Meus Sites"
  → Lista de sites do cliente
      ├─ Status: Ativo | Em Manutenção | Em Desenvolvimento
      ├─ Botão "Visualizar"
      └─ Botão "Solicitar Alteração"
```

### 2.3. Controle Financeiro
```
Dashboard - Seção "Faturas"
  → Tabela de faturas
      ├─ Status: Paga | Pendente | Vencida
      ├─ Valores
      ├─ Datas de vencimento
      └─ Botão "Ver Detalhes" / "Pagar" (futuro)
```

### 2.4. Sistema de Tickets
```
Dashboard - Seção "Solicitações"

2.4.1. Visualizar Tickets
  → Lista de tickets
      ├─ Status: Aberto | Em Andamento | Aguardando Aprovação | Concluído
      ├─ Tipo: Alteração | Correção | Novo Recurso
      ├─ Data de criação
      └─ Botão "Ver Detalhes"

2.4.2. Criar Novo Ticket
  → Clica "Nova Solicitação"
  → Modal abre com formulário:
      ├─ Tipo de solicitação
      ├─ Descrição detalhada
      ├─ Estimativa de custo (calculada automaticamente)
      └─ Submete
  → Ticket criado com status "Aberto"

2.4.3. Aprovar Orçamento
  → Ticket com status "Aguardando Aprovação"
  → Clica "Aprovar"
  → Status muda para "Em Andamento"
  → Cliente aguarda conclusão
```

## 3. Fluxos de Navegação Secundários

### 3.1. Blog
```
Header → Blog (/blog)
  → Página placeholder
  → (Futuro: listagem de posts)
```

### 3.2. Páginas Legais
```
Footer → Termos de Uso (/terms)
Footer → Política de Privacidade (/privacy)
```

### 3.3. Redes Sociais
```
Footer → Links externos
  ├─ Instagram
  ├─ Facebook
  ├─ LinkedIn
  └─ YouTube
```

## 4. Fluxos de Comunicação

### 4.1. WhatsApp
```
Mensagem pré-formatada enviada:

"Olá! Gostaria de contratar [tipo de plano] da Pixelaria.

Meu interesse:
- Plano escolhido: [nome do plano]
- Empresa: [nome]
- Contato: [telefone]

Aguardo retorno!"
```

Acionado em:
- Header "Fale Conosco"
- Home → CTAs principais
- Planos → "Escolher Plano"
- Contato → Formulário

### 4.2. Formulário de Contato
```
Página de Contato (/contato)
  → Preenche:
      ├─ Nome
      ├─ Email
      ├─ Telefone
      ├─ Assunto
      └─ Mensagem
  → Submete
  → (Mock) Toast de sucesso
  → (Futuro) Email enviado + notificação equipe
```

## 5. Fluxos de Validação

### 5.1. Onboarding
```
Cada etapa valida:
  ✓ Campos obrigatórios preenchidos
  ✓ Email no formato correto
  ✓ Telefone no formato correto
  ✗ Não permite avançar se inválido
```

### 5.2. Contato
```
Formulário valida:
  ✓ Nome (mínimo 3 caracteres)
  ✓ Email válido
  ✓ Telefone (formato brasileiro)
  ✓ Mensagem (mínimo 10 caracteres)
  ✗ Exibe erros inline
```

### 5.3. Dashboard - Criar Ticket
```
Modal valida:
  ✓ Tipo selecionado
  ✓ Descrição (mínimo 20 caracteres)
  ✗ Calcula custo automaticamente
```

## 6. Fluxos de Estados (Loading/Erro)

### 6.1. Dashboard
```
Loading States:
  → Busca sites: Skeleton screens
  → Busca faturas: Spinner
  → Busca tickets: Skeleton
  → Cria ticket: Botão "Carregando..."

Error States:
  → Falha na API: Toast de erro
  → Retry automático (mock: sempre sucesso)
```

### 6.2. Formulários
```
Submissão:
  → Estado "Enviando..."
  → Botão desabilitado
  → (Mock) Delay de 1.5s
  → Toast de sucesso/erro
  → Reset do formulário (sucesso)
```

## 7. Fluxos Mobile

### 7.1. Menu Responsivo
```
Mobile/Tablet:
  → Hamburger menu no Header
  → Clica → Menu slide-in
  → Navegação por links
  → Fecha ao clicar fora ou no X
```

### 7.2. Dashboard Mobile
```
Layout adaptativo:
  → Cards empilhados verticalmente
  → Tabelas com scroll horizontal
  → Botões full-width
  → Modals ocupam tela inteira
```

### 7.3. Onboarding Mobile
```
Wizard otimizado:
  → 1 campo por vez (scroll)
  → Barra de progresso no topo
  → Navegação fixa no bottom
  → Inputs adaptados para mobile (tel, email)
```

## 8. Fluxos Futuros (Backend Real)

### 8.1. Autenticação
```
Login → Dashboard
  ├─ Verifica token
  ├─ Se válido: Dashboard
  └─ Se inválido: Redirect /login

Logout
  → Remove token
  → Redirect para Home
```

### 8.2. Pagamentos
```
Fatura → Clicar "Pagar"
  → Redirect Gateway (Stripe/Mercado Pago)
  → Pagamento processado
  → Webhook atualiza status
  → Email de confirmação
```

### 8.3. Notificações
```
Ticket atualizado:
  → Email para cliente
  → Badge de notificação no Dashboard
  
Fatura nova:
  → Email de cobrança
  → Lembrete próximo ao vencimento
```

### 8.4. Upload de Arquivos
```
Onboarding - Etapa 3:
  → Upload de imagens
  → Preview antes de enviar
  → Validação de formato/tamanho
  
Dashboard - Criar Ticket:
  → Anexar prints/arquivos
  → Múltiplos uploads
```

## 9. Métricas e Conversão

### 9.1. Eventos de Tracking (futuro Google Analytics)
```
Pageviews:
  ├─ Home
  ├─ Projetos
  ├─ Planos
  └─ Contato

Events:
  ├─ Click CTA WhatsApp
  ├─ Toggle Pricing (Assinatura ↔ Única vez)
  ├─ Filtro Projetos
  ├─ Submit Contato
  ├─ Submit Onboarding
  ├─ Create Ticket
  └─ Approve Ticket

Conversions:
  ├─ WhatsApp enviado
  ├─ Onboarding completo
  └─ Ticket criado
```

---

**Atualizado em:** Dezembro 2024  
**Versão:** 1.0

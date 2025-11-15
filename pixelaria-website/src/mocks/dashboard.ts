import type { Invoice, ClientSite, Ticket } from '../types';

// Mock de sites do cliente
export const mockClientSites: ClientSite[] = [
  {
    id: 'site-1',
    clientId: 'client-1',
    name: 'Minha Empresa Principal',
    url: 'https://minhaempresa.com.br',
    status: 'active',
    planType: 'subscription',
    createdAt: '2024-06-15',
    lastUpdate: '2024-11-10',
    monthlyChangesUsed: 0,
    monthlyChangesLimit: 1,
    sourceCodeAvailable: false,
  },
  {
    id: 'site-2',
    clientId: 'client-1',
    name: 'Landing Page Produto',
    url: 'https://produto.minhaempresa.com.br',
    status: 'active',
    planType: 'one-time',
    createdAt: '2024-09-01',
    lastUpdate: '2024-09-15',
    monthlyChangesUsed: 0,
    monthlyChangesLimit: 0,
    sourceCodeAvailable: true,
  },
];

// Mock de faturas
export const mockInvoices: Invoice[] = [
  {
    id: 'inv-001',
    clientId: 'client-1',
    amount: 90,
    status: 'paid',
    dueDate: '2024-11-05',
    paidDate: '2024-11-03',
    description: 'Assinatura Mensal - Novembro 2024',
    downloadUrl: '#',
  },
  {
    id: 'inv-002',
    clientId: 'client-1',
    amount: 90,
    status: 'paid',
    dueDate: '2024-10-05',
    paidDate: '2024-10-02',
    description: 'Assinatura Mensal - Outubro 2024',
    downloadUrl: '#',
  },
  {
    id: 'inv-003',
    clientId: 'client-1',
    amount: 90,
    status: 'pending',
    dueDate: '2024-12-05',
    description: 'Assinatura Mensal - Dezembro 2024',
  },
  {
    id: 'inv-004',
    clientId: 'client-1',
    amount: 2500,
    status: 'paid',
    dueDate: '2024-09-10',
    paidDate: '2024-09-08',
    description: 'Desenvolvimento Landing Page Produto',
    downloadUrl: '#',
  },
];

// Mock de tickets
export const mockTickets: Ticket[] = [
  {
    id: 'ticket-001',
    clientId: 'client-1',
    siteId: 'site-1',
    title: 'Atualizar foto da equipe',
    description: 'Gostaria de atualizar as fotos da equipe na página "Sobre Nós". Tenho as novas imagens prontas.',
    category: 'change-request',
    status: 'completed',
    priority: 'low',
    createdAt: '2024-10-15T10:30:00Z',
    updatedAt: '2024-10-16T14:20:00Z',
    completedAt: '2024-10-16T14:20:00Z',
    estimatedCost: 0,
    approved: true,
    response: 'Fotos atualizadas com sucesso! As alterações já estão no ar.',
  },
  {
    id: 'ticket-002',
    clientId: 'client-1',
    siteId: 'site-1',
    title: 'Adicionar novo serviço',
    description: 'Preciso adicionar um novo serviço à página de serviços: "Consultoria Empresarial". Inclui descrição e imagem.',
    category: 'change-request',
    status: 'in-progress',
    priority: 'medium',
    createdAt: '2024-11-08T09:15:00Z',
    updatedAt: '2024-11-10T16:45:00Z',
    estimatedCost: 40,
    approved: true,
    response: 'Trabalhando na implementação. Previsão de conclusão: 2 dias úteis.',
  },
  {
    id: 'ticket-003',
    clientId: 'client-1',
    siteId: 'site-1',
    title: 'Solicitar código-fonte',
    description: 'Gostaria de receber o código-fonte completo do site para fins de documentação interna.',
    category: 'source-code',
    status: 'pending-approval',
    priority: 'low',
    createdAt: '2024-11-12T11:00:00Z',
    updatedAt: '2024-11-12T11:00:00Z',
    estimatedCost: 1500,
    approved: false,
    response: 'Solicitação recebida. Valor: R$ 1.500,00. Aguardando aprovação do orçamento.',
  },
  {
    id: 'ticket-004',
    clientId: 'client-1',
    siteId: 'site-1',
    title: 'Erro no formulário de contato',
    description: 'O formulário de contato não está enviando emails. Testei várias vezes e não recebo as mensagens.',
    category: 'bug',
    status: 'completed',
    priority: 'high',
    createdAt: '2024-10-28T14:20:00Z',
    updatedAt: '2024-10-28T16:30:00Z',
    completedAt: '2024-10-28T16:30:00Z',
    estimatedCost: 0,
    approved: true,
    response: 'Problema identificado e corrigido. Era uma configuração do servidor de email. Testado e funcionando normalmente.',
  },
];

// Função para simular delay de API
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API Mock para Dashboard
export const dashboardApi = {
  getSites: async () => {
    await delay(500);
    return mockClientSites;
  },
  
  getInvoices: async () => {
    await delay(300);
    return mockInvoices;
  },
  
  getTickets: async () => {
    await delay(400);
    return mockTickets;
  },
  
  createTicket: async (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => {
    await delay(600);
    const newTicket: Ticket = {
      ...ticket,
      id: `ticket-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'open',
      estimatedCost: ticket.category === 'change-request' ? 40 : 0,
    };
    mockTickets.unshift(newTicket);
    return newTicket;
  },
  
  approveTicket: async (ticketId: string) => {
    await delay(400);
    const ticket = mockTickets.find(t => t.id === ticketId);
    if (ticket) {
      ticket.approved = true;
      ticket.status = 'in-progress';
      ticket.updatedAt = new Date().toISOString();
    }
    return ticket;
  },
};

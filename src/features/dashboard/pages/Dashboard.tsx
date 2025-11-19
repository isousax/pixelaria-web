import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, MessageSquare, Plus } from 'lucide-react';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Input } from '../../../shared/components/ui/Input';
import { Textarea } from '../../../shared/components/ui/Textarea';
import { Modal } from '../../../shared/components/ui/Modal';
import { useToast } from '../../../shared/hooks/useToast';
import { dashboardApi } from '../../../data/dashboard';
import { formatCurrency, formatShortDate } from '../../../shared/utils/helpers';
import type { ClientSite, Invoice, Ticket } from '../../../shared/types';

export const Dashboard = () => {
  const [sites, setSites] = useState<ClientSite[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [newTicket, setNewTicket] = useState({ title: '', description: '', category: 'change-request' });
  const toast = useToast();

  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [sitesData, invoicesData, ticketsData] = await Promise.all([
        dashboardApi.getSites(),
        dashboardApi.getInvoices(),
        dashboardApi.getTickets(),
      ]);
      setSites(sitesData);
      setInvoices(invoicesData);
      setTickets(ticketsData);
    } catch {
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTicket = async () => {
    if (!newTicket.title || !newTicket.description) {
      toast.error('Preencha todos os campos');
      return;
    }

    try {
      await dashboardApi.createTicket({
        ...newTicket,
        clientId: 'client-1',
        siteId: sites[0]?.id || 'site-1',
        status: 'open',
        priority: 'medium',
        category: newTicket.category as Ticket['category'],
      });
      toast.success('Solicitação criada com sucesso!');
      setShowTicketModal(false);
      setNewTicket({ title: '', description: '', category: 'change-request' });
      loadData();
    } catch {
      toast.error('Erro ao criar solicitação');
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
      open: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800',
      'pending-approval': 'bg-yellow-100 text-yellow-800',
    };
    return colors[status as keyof typeof colors] || 'bg-neutral-100 text-neutral-800';
  };

  if (loading) {
    return (
      <div className="bg-background-light min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-neutral-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-light py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="section-title">Área do Cliente</h1>
          <p className="text-neutral-600">Gerencie seus sites e solicitações</p>
        </motion.div>

        {/* Sites */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Meus Sites</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {sites.map((site) => (
              <Card key={site.id} padding="lg">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Globe className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{site.name}</h3>
                    {site.url && (
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 text-sm hover:underline"
                      >
                        {site.url}
                      </a>
                    )}
                    <div className="flex items-center gap-2 mt-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(site.status)}`}>
                        {site.status}
                      </span>
                      <span className="text-xs text-neutral-600">
                        {site.planType === 'subscription' ? 'Assinatura' : 'Compra Única'}
                      </span>
                    </div>
                    {site.planType === 'subscription' && (
                      <p className="text-sm text-neutral-600 mt-2">
                        Alterações: {site.monthlyChangesUsed}/{site.monthlyChangesLimit} este mês
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Invoices */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Faturas</h2>
          <Card padding="sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Descrição</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Vencimento</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Valor</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.slice(0, 5).map((invoice) => (
                    <tr key={invoice.id} className="border-t border-neutral-100">
                      <td className="px-4 py-3 text-sm">{invoice.description}</td>
                      <td className="px-4 py-3 text-sm">{formatShortDate(invoice.dueDate)}</td>
                      <td className="px-4 py-3 text-sm font-semibold">{formatCurrency(invoice.amount)}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(invoice.status)}`}>
                          {invoice.status === 'paid' ? 'Pago' : 'Pendente'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* Tickets */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Solicitações</h2>
            <Button onClick={() => setShowTicketModal(true)}>
              <Plus className="w-5 h-5" />
              Nova Solicitação
            </Button>
          </div>

          <div className="space-y-4">
            {tickets.map((ticket) => (
              <Card key={ticket.id} padding="md">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <MessageSquare className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold mb-1">{ticket.title}</h3>
                      <p className="text-sm text-neutral-600 mb-2">{ticket.description}</p>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                        <span className="text-xs text-neutral-600">
                          {formatShortDate(ticket.createdAt)}
                        </span>
                        {ticket.estimatedCost && ticket.estimatedCost > 0 && (
                          <span className="text-xs font-semibold text-primary-600">
                            {formatCurrency(ticket.estimatedCost)}
                          </span>
                        )}
                      </div>
                      {ticket.response && (
                        <div className="mt-3 p-3 bg-neutral-50 rounded-lg">
                          <p className="text-sm text-neutral-700">{ticket.response}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Modal */}
        <Modal
          isOpen={showTicketModal}
          onClose={() => setShowTicketModal(false)}
          title="Nova Solicitação"
        >
          <div className="space-y-4">
            <Input
              label="Título"
              value={newTicket.title}
              onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
              placeholder="Ex: Atualizar texto da home"
            />
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Categoria
              </label>
              <select
                value={newTicket.category}
                onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                className="input-field"
              >
                <option value="change-request">Alteração de Conteúdo</option>
                <option value="bug">Reportar Bug</option>
                <option value="question">Dúvida</option>
                <option value="source-code">Solicitar Código-Fonte</option>
              </select>
            </div>
            
            <Textarea
              label="Descrição"
              value={newTicket.description}
              onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
              placeholder="Descreva sua solicitação em detalhes..."
              rows={5}
            />
            
            <div className="flex gap-3">
              <Button onClick={handleCreateTicket} fullWidth>
                Enviar Solicitação
              </Button>
              <Button onClick={() => setShowTicketModal(false)} variant="secondary" fullWidth>
                Cancelar
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

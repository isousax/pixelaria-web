export const WHATSAPP_NUMBER = '5511999999999'; // Altere para o número real

export const createWhatsAppLink = (message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

export const whatsAppMessages = {
  subscription: 'Olá! Tenho interesse no plano de Assinatura Mensal (R$90/mês). Gostaria de mais informações.',
  oneTime: 'Olá! Tenho interesse no plano de Compra Única. Gostaria de solicitar um orçamento.',
  general: 'Olá! Gostaria de saber mais sobre os serviços da Pixelaria.',
  support: 'Olá! Preciso de suporte técnico.',
  quote: 'Olá! Gostaria de solicitar um orçamento para criação de site.',
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString));
};

export const formatShortDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(dateString));
};

export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  imageUrl: string;
  url?: string;
  technologies: string[];
  completedDate: string;
  featured: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  type: 'subscription' | 'one-time';
  price: number;
  features: string[];
  popular?: boolean;
  ctaText: string;
  ctaLink: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Invoice {
  id: string;
  clientId: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  paidDate?: string;
  description: string;
  downloadUrl?: string;
}

export interface Ticket {
  id: string;
  clientId: string;
  siteId: string;
  title: string;
  description: string;
  category: 'change-request' | 'bug' | 'question' | 'source-code';
  status: 'open' | 'in-progress' | 'completed' | 'pending-approval';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  estimatedCost?: number;
  approved?: boolean;
  completedAt?: string;
  response?: string;
}

export interface ClientSite {
  id: string;
  clientId: string;
  name: string;
  url?: string;
  status: 'active' | 'in-development' | 'maintenance' | 'inactive';
  planType: 'subscription' | 'one-time';
  createdAt: string;
  lastUpdate: string;
  monthlyChangesUsed: number;
  monthlyChangesLimit: number;
  sourceCodeAvailable: boolean;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  sites: ClientSite[];
}

export interface OnboardingData {
  // Step 1: Informações básicas
  projectName: string;
  projectType: string;
  businessDescription: string;
  
  // Step 2: Objetivos e público-alvo
  objectives: string[];
  targetAudience: string;
  
  // Step 3: Estrutura e conteúdo
  pages: string[];
  hasExistingContent: boolean;
  contentNotes?: string;
  
  // Step 4: Design e funcionalidades
  designPreferences?: string;
  referenceWebsites?: string[];
  requiredFeatures: string[];
  
  // Step 5: Integrações
  integrations: string[];
  thirdPartyServices?: string[];
  
  // Step 6: Hospedagem e domínio
  hasDomain: boolean;
  domainName?: string;
  hostingPreference?: string;
  
  // Step 7: Contato e prazo
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  desiredLaunchDate?: string;
  additionalNotes?: string;
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  duration: string;
  icon: string;
}

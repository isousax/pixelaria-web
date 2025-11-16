import type { HTMLAttributes, ReactNode } from 'react';
import { X } from 'lucide-react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  pill?: boolean;
}

const badgeVariants = {
  default: 'bg-neutral-100 text-neutral-700 border border-neutral-300',
  primary: 'bg-primary-100 text-primary-700 border border-primary-300',
  secondary: 'bg-secondary-100 text-secondary-700 border border-secondary-300',
  success: 'bg-green-100 text-green-700 border border-green-300',
  warning: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
  error: 'bg-red-100 text-red-700 border border-red-300',
  info: 'bg-blue-100 text-blue-700 border border-blue-300',
};

const badgeSizes = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-1.5',
};

const dotColors = {
  default: 'bg-neutral-500',
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
};

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  removable = false,
  onRemove,
  pill = false,
  className = '',
  ...props
}: BadgeProps) => {
  const baseClasses = `
    inline-flex items-center justify-center gap-1.5
    font-semibold
    transition-all duration-200
    whitespace-nowrap
    flex-row
    ${pill ? 'rounded-full' : 'rounded-lg'}
    ${badgeVariants[variant]}
    ${badgeSizes[size]}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  return (
    <span
      className={baseClasses}
      {...props}
    >
      {dot && (
        <span
          className={`w-2 h-2 rounded-full ${dotColors[variant]} animate-pulse flex-shrink-0`}
          aria-hidden="true"
        />
      )}
      
      {children}
      
      {removable && onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors flex-shrink-0"
          aria-label="Remover badge"
        >
          <X className="w-3 h-3" aria-hidden="true" />
        </button>
      )}
    </span>
  );
};

// Status Badge - Pre-configured variants
export const StatusBadge = ({
  status,
  ...props
}: Omit<BadgeProps, 'variant' | 'dot'> & {
  status: 'active' | 'inactive' | 'pending' | 'completed' | 'error' | 'warning';
}) => {
  const statusConfig = {
    active: { variant: 'success' as const, text: 'Ativo', dot: true },
    inactive: { variant: 'default' as const, text: 'Inativo', dot: false },
    pending: { variant: 'warning' as const, text: 'Pendente', dot: true },
    completed: { variant: 'success' as const, text: 'Concluído', dot: false },
    error: { variant: 'error' as const, text: 'Erro', dot: true },
    warning: { variant: 'warning' as const, text: 'Atenção', dot: true },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} dot={config.dot} {...props}>
      {config.text}
    </Badge>
  );
};

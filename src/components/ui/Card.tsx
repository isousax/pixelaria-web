import type { HTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'bordered' | 'elevated' | 'flat' | 'gradient' | 'glass';
  hover?: boolean | 'lift' | 'glow' | 'scale';
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  as?: 'div' | 'article' | 'section';
  interactive?: boolean;
  glowColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

const cardVariants = {
  default: 'bg-white border border-neutral-200 shadow-soft',
  bordered: 'bg-white border-2 border-neutral-300',
  elevated: 'bg-white shadow-soft-lg',
  flat: 'bg-neutral-50',
  gradient: 'bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600',
  glass: 'bg-white/80 backdrop-blur-lg border border-white/30 shadow-soft',
};

const hoverVariants = {
  lift: 'hover:shadow-soft-xl hover:-translate-y-2',
  glow: 'hover:shadow-soft-lg',
  scale: 'hover:scale-[1.02]',
};

const paddingSizes = {
  none: 'p-0',
  xs: 'p-3',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

const glowColors = {
  primary: 'hover:shadow-[0_0_30px_rgba(77,95,245,0.3)]',
  secondary: 'hover:shadow-[0_0_30px_rgba(147,51,234,0.3)]',
  success: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]',
  warning: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]',
  error: 'hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]',
};

export const Card = ({
  children,
  variant = 'default',
  hover = true,
  padding = 'md',
  className = '',
  as = 'div',
  interactive = false,
  glowColor,
  ...props
}: CardProps) => {
  const Component = motion[as];
  
  const hoverClass = hover
    ? typeof hover === 'string'
      ? hoverVariants[hover]
      : 'hover:shadow-soft-lg hover:-translate-y-1'
    : '';
  
  const glowClass = glowColor ? glowColors[glowColor] : '';
  const interactiveClass = interactive ? 'cursor-pointer active:scale-[0.98]' : '';
  
  const combinedClasses = `
    ${cardVariants[variant]}
    ${paddingSizes[padding]}
    ${hoverClass}
    ${glowClass}
    ${interactiveClass}
    ${className}
    rounded-2xl
    transition-all
    duration-300
    ease-out
    overflow-hidden
    relative
  `.trim().replace(/\s+/g, ' ');

  const motionProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
    whileHover: interactive
      ? { scale: 1.02, transition: { duration: 0.2 } }
      : undefined,
  };

  return (
    <Component
      {...motionProps}
      className={combinedClasses}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      {...(props as any)}
    >
      {/* Decorative gradient overlay for gradient variant */}
      {variant === 'gradient' && (
        <div className="absolute inset-0 bg-linear-to-br from-primary-500/5 to-secondary-500/5 pointer-events-none" />
      )}
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </Component>
  );
};

// Sub-components for better composition
export const CardHeader = ({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({
  children,
  className = '',
  as = 'h3',
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' }) => {
  const Component = as;
  return (
    <Component
      className={`text-xl font-bold text-neutral-900 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export const CardDescription = ({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={`text-neutral-600 text-sm mt-1 ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent = ({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={`${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={`mt-6 pt-4 border-t border-neutral-200 ${className}`} {...props}>
    {children}
  </div>
);

import type { ButtonHTMLAttributes, ElementType, ReactNode } from 'react';
import { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'danger' | 'success';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  as?: ElementType;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  tooltip?: string;
  to?: string;
  href?: string;
  [key: string]: any; // Allow any additional props for polymorphic components
}

const buttonVariants = {
  primary: 
    'bg-primary-600 hover:bg-primary-700 active:bg-primary-800 shadow-soft hover:shadow-soft-lg ' +
    'focus:ring-4 focus:ring-primary-200 disabled:bg-primary-300 disabled:shadow-none ' +
    'border border-primary-700 hover:border-primary-800',
  
  secondary: 
    'bg-white hover:bg-neutral-50 active:bg-neutral-100 text-neutral-800 ' +
    'border-2 border-neutral-300 hover:border-neutral-400 shadow-soft hover:shadow-soft-lg ' +
    'focus:ring-4 focus:ring-neutral-200 disabled:bg-neutral-100 disabled:text-neutral-400',
  
  outline: 
    'bg-transparent hover:bg-primary-50 active:bg-primary-100 text-primary-600 hover:text-primary-700 ' +
    'border-2 border-primary-600 hover:border-primary-700 ' +
    'focus:ring-4 focus:ring-primary-200 disabled:border-primary-300 disabled:text-primary-300',
  
  ghost: 
    'bg-transparent hover:bg-neutral-100 active:bg-neutral-200 text-neutral-700 hover:text-neutral-900 ' +
    'focus:ring-4 focus:ring-neutral-200 disabled:text-neutral-400',
  
  gradient: 
    'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 ' +
    'shadow-soft-lg hover:shadow-soft-xl ' +
    'focus:ring-4 focus:ring-primary-200 disabled:from-primary-300 disabled:to-secondary-300 ' +
    'border border-primary-700',
  
  danger: 
    'bg-red-600 hover:bg-red-700 active:bg-red-800 shadow-soft hover:shadow-soft-lg ' +
    'focus:ring-4 focus:ring-red-200 disabled:bg-red-300 ' +
    'border border-red-700 hover:border-red-800',
  
  success: 
    'bg-green-600 hover:bg-green-700 active:bg-green-800 shadow-soft hover:shadow-soft-lg ' +
    'focus:ring-4 focus:ring-green-200 disabled:bg-green-300 ' +
    'border border-green-700 hover:border-green-800',
};

const buttonSizes = {
  xs: 'px-3 py-1.5 text-xs font-medium gap-1.5',
  sm: 'px-4 py-2 text-sm font-medium gap-2',
  md: 'px-6 py-3 text-base font-semibold gap-2',
  lg: 'px-8 py-4 text-lg font-semibold gap-2.5',
  xl: 'px-10 py-5 text-xl font-bold gap-3',
};

const iconSizes = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-7 h-7',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      loadingText = 'Carregando...',
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = '',
      disabled,
      as,
      type = 'button',
      ariaLabel,
      tooltip,
      ...props
    },
    ref
  ) => {
    const Component = as || 'button';
    
    const baseStyles = 
      'relative inline-flex items-center justify-center font-medium rounded-xl ' +
      'transition-all duration-200 ease-out ' +
      'disabled:cursor-not-allowed disabled:opacity-60 ' +
      'focus:outline-none focus-visible:outline-none ' +
      'select-none touch-manipulation ' +
      'overflow-hidden';
    
    const widthClass = fullWidth ? 'w-full' : '';
    const finalClassName = `${baseStyles} ${buttonVariants[variant as keyof typeof buttonVariants]} ${buttonSizes[size as keyof typeof buttonSizes]} ${widthClass} ${className}`;
    
    const isDisabled = disabled || isLoading;
    
    const iconSize = iconSizes[size as keyof typeof iconSizes];
    
    const content = (
      <>
        {/* Ripple effect overlay */}
        <span className="absolute inset-0 overflow-hidden rounded-xl">
          <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </span>
        
        {/* Content */}
        <span className="relative flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <Loader2 className={`${iconSize} animate-spin`} aria-hidden="true" />
              <span>{loadingText}</span>
            </>
          ) : (
            <>
              {leftIcon && (
                <span className={`inline-flex ${iconSize}`} aria-hidden="true">
                  {leftIcon}
                </span>
              )}
              <span>{children}</span>
              {rightIcon && (
                <span className={`inline-flex ${iconSize}`} aria-hidden="true">
                  {rightIcon}
                </span>
              )}
            </>
          )}
        </span>
      </>
    );
    
    // If using custom component (like Link), render without motion
    if (Component !== 'button') {
      return (
        <Component
          ref={ref}
          className={finalClassName}
          aria-label={ariaLabel}
          title={tooltip}
          aria-disabled={isDisabled}
          {...props}
        >
          {content}
        </Component>
      );
    }
    
    // Render as motion button
    return (
      <motion.button
        ref={ref}
        type={type}
        className={`${finalClassName} group`}
        disabled={isDisabled}
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
        aria-busy={isLoading}
        title={tooltip}
        whileHover={!isDisabled ? { scale: 1.02, y: -1 } : undefined}
        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.2,
          ease: [0.4, 0, 0.2, 1],
        }}
        {...(props as HTMLMotionProps<'button'>)}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

import type { ButtonHTMLAttributes, ElementType } from 'react';
import { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  as?: ElementType;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      className = '',
      disabled,
      as,
      ...props
    },
    ref
  ) => {
    const Component = as || 'button';
    const baseStyles = 'font-medium rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2';
    
    const variants = {
      primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-soft hover:shadow-soft-lg disabled:bg-primary-300',
      secondary: 'bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-300 shadow-soft hover:shadow-soft-lg',
      outline: 'bg-transparent hover:bg-neutral-50 text-primary-600 border border-primary-600',
      ghost: 'bg-transparent hover:bg-neutral-100 text-neutral-700',
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };
    
    const widthClass = fullWidth ? 'w-full' : '';
    
    if (Component !== 'button') {
      return (
        <Component
          ref={ref}
          className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className} disabled:cursor-not-allowed disabled:opacity-60`}
          {...props}
        >
          {children}
        </Component>
      );
    }
    
    const MotionButton = motion.button;
    
    return (
      <MotionButton
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className} disabled:cursor-not-allowed disabled:opacity-60`}
        disabled={disabled || isLoading}
        type={props.type || 'button'}
        onClick={props.onClick}
        onSubmit={props.onSubmit}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Carregando...
          </>
        ) : (
          children
        )}
      </MotionButton>
    );
  }
);

Button.displayName = 'Button';

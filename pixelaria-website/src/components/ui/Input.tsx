import type { InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  success?: boolean;
  variant?: 'default' | 'filled' | 'flushed';
  inputSize?: 'sm' | 'md' | 'lg';
  showPasswordToggle?: boolean;
}

const inputSizes = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-5 py-4 text-lg',
};

const inputVariants = {
  default: 'bg-white border-2 border-neutral-300 focus:border-primary-500',
  filled: 'bg-neutral-100 border-2 border-transparent focus:border-primary-500 focus:bg-white',
  flushed: 'bg-transparent border-b-2 border-neutral-300 focus:border-primary-500 rounded-none px-0',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      success,
      variant = 'default',
      inputSize = 'md',
      showPasswordToggle = false,
      className = '',
      type = 'text',
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    
    const isPassword = type === 'password';
    const actualType = isPassword && showPassword ? 'text' : type;
    
    const hasError = !!error;
    const hasSuccess = success && !hasError;
    
    const inputClasses = `
      w-full
      ${inputSizes[inputSize]}
      ${inputVariants[variant]}
      ${leftIcon ? 'pl-11' : ''}
      ${rightIcon || hasError || hasSuccess || (isPassword && showPasswordToggle) ? 'pr-11' : ''}
      ${hasError ? '!border-red-500 focus:!border-red-500 focus:ring-4 focus:ring-red-100' : ''}
      ${hasSuccess ? '!border-green-500 focus:!border-green-500 focus:ring-4 focus:ring-green-100' : ''}
      ${!hasError && !hasSuccess ? 'focus:ring-4 focus:ring-primary-100' : ''}
      ${disabled ? 'opacity-60 cursor-not-allowed bg-neutral-100' : ''}
      ${className}
      rounded-xl
      font-medium
      text-neutral-900
      placeholder:text-neutral-400
      transition-all
      duration-200
      outline-none
    `.trim().replace(/\s+/g, ' ');
    
    const labelId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full">
        {label && (
          <motion.label
            htmlFor={labelId}
            className={`
              block text-sm font-semibold mb-2
              transition-colors duration-200
              ${isFocused ? 'text-primary-600' : 'text-neutral-700'}
              ${hasError ? 'text-red-600' : ''}
              ${hasSuccess ? 'text-green-600' : ''}
            `}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {label}
            {props.required && (
              <span className="text-red-500 ml-1 font-bold" aria-label="obrigatório">
                *
              </span>
            )}
          </motion.label>
        )}
        
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
              {leftIcon}
            </div>
          )}
          
          {/* Input Field */}
          <input
            ref={ref}
            id={labelId}
            type={actualType}
            className={inputClasses}
            disabled={disabled}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${labelId}-error` : helperText ? `${labelId}-helper` : undefined
            }
            {...props}
          />
          
          {/* Right Icons/Status */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {hasError && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <AlertCircle className="w-5 h-5 text-red-500" aria-hidden="true" />
              </motion.div>
            )}
            
            {hasSuccess && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <CheckCircle2 className="w-5 h-5 text-green-500" aria-hidden="true" />
              </motion.div>
            )}
            
            {isPassword && showPasswordToggle && !hasError && !hasSuccess && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-neutral-400 hover:text-neutral-600 transition-colors"
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Eye className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            )}
            
            {rightIcon && !hasError && !hasSuccess && !(isPassword && showPasswordToggle) && (
              <div className="text-neutral-400">{rightIcon}</div>
            )}
          </div>
          
          {/* Focus Ring Animation */}
          <AnimatePresence>
            {isFocused && !hasError && (
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{
                  boxShadow: '0 0 0 4px rgba(77, 95, 245, 0.1)',
                }}
              />
            )}
          </AnimatePresence>
        </div>
        
        {/* Error Message */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              id={`${labelId}-error`}
              className="mt-2 text-sm text-red-600 font-medium flex items-center gap-1"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              role="alert"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              {error}
            </motion.p>
          )}
          
          {/* Helper Text */}
          {helperText && !error && (
            <motion.p
              id={`${labelId}-helper`}
              className="mt-2 text-sm text-neutral-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              {helperText}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = 'Input';

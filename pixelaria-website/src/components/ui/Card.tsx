import { HTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export const Card = ({
  children,
  hover = true,
  padding = 'md',
  className = '',
  ...props
}: CardProps) => {
  const paddingSizes = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverClass = hover ? 'hover:shadow-soft-lg' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-2xl shadow-soft transition-all duration-200 ${hoverClass} ${paddingSizes[padding]} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

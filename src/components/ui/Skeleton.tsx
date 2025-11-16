import type { HTMLAttributes } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton = ({
  variant = 'text',
  width,
  height,
  animation = 'wave',
  className = '',
  style,
  ...props
}: SkeletonProps) => {
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-xl',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'skeleton',
    none: '',
  };

  const inlineStyles = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
    ...style,
  };

  return (
    <div
      className={`
        bg-neutral-200
        ${variantClasses[variant]}
        ${animationClasses[animation]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      style={inlineStyles}
      aria-hidden="true"
      {...props}
    />
  );
};

// Skeleton Text - for text loading
export const SkeletonText = ({
  lines = 3,
  lastLineWidth = '60%',
  className = '',
}: {
  lines?: number;
  lastLineWidth?: string;
  className?: string;
}) => (
  <div className={`space-y-3 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton
        key={index}
        variant="text"
        height={16}
        width={index === lines - 1 ? lastLineWidth : '100%'}
      />
    ))}
  </div>
);

// Skeleton Card - for card loading
export const SkeletonCard = ({ className = '' }: { className?: string }) => (
  <div className={`bg-white rounded-2xl shadow-soft p-6 ${className}`}>
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" height={20} width="40%" />
          <Skeleton variant="text" height={16} width="60%" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Skeleton variant="text" height={16} />
        <Skeleton variant="text" height={16} />
        <Skeleton variant="text" height={16} width="80%" />
      </div>

      {/* Footer */}
      <div className="flex gap-3 pt-4">
        <Skeleton variant="rounded" width={100} height={36} />
        <Skeleton variant="rounded" width={100} height={36} />
      </div>
    </div>
  </div>
);

// Skeleton Table Row
export const SkeletonTableRow = ({
  columns = 4,
  className = '',
}: {
  columns?: number;
  className?: string;
}) => (
  <tr className={className}>
    {Array.from({ length: columns }).map((_, index) => (
      <td key={index} className="px-6 py-4">
        <Skeleton variant="text" height={16} />
      </td>
    ))}
  </tr>
);

// Skeleton Avatar with Text
export const SkeletonAvatarText = ({ className = '' }: { className?: string }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <Skeleton variant="circular" width={40} height={40} />
    <div className="flex-1 space-y-2">
      <Skeleton variant="text" height={16} width="50%" />
      <Skeleton variant="text" height={14} width="70%" />
    </div>
  </div>
);

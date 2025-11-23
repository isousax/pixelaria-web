// ============================================================================
// RateLimitNotification - Visual countdown for 429 errors
// ============================================================================

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Clock } from 'lucide-react';

interface RateLimitNotificationProps {
  message: string;
  retryAfter: number; // seconds
  onDismiss?: () => void;
}

export const RateLimitNotification = ({ 
  message, 
  retryAfter: initialRetryAfter,
  onDismiss 
}: RateLimitNotificationProps) => {
  const [retryAfter, setRetryAfter] = useState(isNaN(initialRetryAfter) ? 60 : initialRetryAfter);

  useEffect(() => {
    if (retryAfter <= 0) {
      onDismiss?.();
      return;
    }

    const timer = setInterval(() => {
      setRetryAfter((prev) => {
        if (prev <= 1) {
          onDismiss?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [retryAfter, onDismiss]);

  const formatTime = (seconds: number): string => {
    if (!seconds || isNaN(seconds) || seconds < 0) {
      return '0s';
    }
    if (seconds < 60) {
      return `${seconds}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-200 max-w-md w-full mx-4"
    >
      <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="shrink-0">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-yellow-900 mb-1">
              Limite de Requisições Atingido
            </h3>
            <p className="text-sm text-yellow-800 mb-3">
              {message}
            </p>

            {/* Countdown */}
            <div className="flex items-center gap-2 text-yellow-900">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">
                Aguarde <span className="font-bold">{formatTime(retryAfter)}</span> para tentar novamente
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 h-2 bg-yellow-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-yellow-600"
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: initialRetryAfter, ease: 'linear' }}
              />
            </div>
          </div>

          {/* Close Button */}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="shrink-0 text-yellow-600 hover:text-yellow-800 transition-colors"
              aria-label="Fechar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// RateLimitManager - Global rate limit handler
// ============================================================================

interface RateLimitState {
  show: boolean;
  message: string;
  retryAfter: number;
}

export const useRateLimitManager = () => {
  const [state, setState] = useState<RateLimitState>({
    show: false,
    message: '',
    retryAfter: 0,
  });

  useEffect(() => {
    const handleRateLimit = (event: Event) => {
      const customEvent = event as CustomEvent<{ message: string; retryAfter: number }>;
      
      setState({
        show: true,
        message: customEvent.detail.message,
        retryAfter: customEvent.detail.retryAfter,
      });
    };

    window.addEventListener('auth:rate-limit', handleRateLimit);

    return () => {
      window.removeEventListener('auth:rate-limit', handleRateLimit);
    };
  }, []);

  const dismiss = () => {
    setState({ show: false, message: '', retryAfter: 0 });
  };

  return {
    ...state,
    dismiss,
  };
};

// ============================================================================
// RateLimitProvider - Component to add to App
// ============================================================================

interface RateLimitProviderProps {
  children: React.ReactNode;
}

export const RateLimitProvider = ({ children }: RateLimitProviderProps) => {
  const { show, message, retryAfter, dismiss } = useRateLimitManager();

  return (
    <>
      {children}
      <AnimatePresence>
        {show && (
          <RateLimitNotification
            message={message}
            retryAfter={retryAfter}
            onDismiss={dismiss}
          />
        )}
      </AnimatePresence>
    </>
  );
};

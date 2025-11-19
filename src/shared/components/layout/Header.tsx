import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Início' },
    { to: '/servicos', label: 'Serviços' },
    { to: '/planos', label: 'Planos' },
    { to: '/projetos', label: 'Projetos' },
    { to: '/processo', label: 'Processo' },
    { to: '/blog', label: 'Blog' },
    { to: '/contato', label: 'Contato' },
  ];

  useEffect(() => {
    let ticking = false;
    const threshold = 50; // Aumentei o threshold
    const hysteresis = 10; // Margem para evitar tremor
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          
          // Se já está scrolled, precisa voltar mais para desativar (threshold - hysteresis)
          // Se não está scrolled, precisa descer mais para ativar (threshold + hysteresis)
          if (isScrolled) {
            if (scrollY < threshold - hysteresis) {
              setIsScrolled(false);
            }
          } else {
            if (scrollY > threshold + hysteresis) {
              setIsScrolled(true);
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  // Previne scroll da página quando o menu mobile está aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header 
        className={`sticky top-0 z-90 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-lg py-2' 
            : 'bg-white/80 backdrop-blur-md py-4'
        }`}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <div className="bg-linear-to-br from-primary-600 to-primary-700 p-2 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-lg">
                  <Code2 className="w-6 h-6" />
                </div>
                <div className="absolute inset-0 bg-linear-to-br from-primary-400 to-primary-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
              </div>
              <span className="text-2xl font-bold bg-linear-to-r from-neutral-900 to-primary-700 bg-clip-text ">
                Pixelaria
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
                    location.pathname === link.to
                      ? 'text-primary-600'
                      : 'text-neutral-700 hover:text-primary-600'
                  }`}
                >
                  {link.label}
                  <span 
                    className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-linear-to-r from-primary-600 to-primary-400 transition-all duration-300 group-hover:w-4/5 group-hover:left-1/10 ${
                      location.pathname === link.to ? 'w-4/5 left-1/10' : ''
                    }`}
                  />
                </Link>
              ))}
              <Link
                to="/dashboard"
                className="ml-4 px-6 py-2.5 bg-linear-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 bg-gray-100"
              >
                Área do Cliente
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-3 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-all duration-300 active:scale-95"
              aria-label="Abrir menu"
            >
              <Menu className="w-6 h-6 text-neutral-700" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar - Fora do header para evitar problemas de z-index */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-100"
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="lg:hidden fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-2xl z-101 border-l border-neutral-200 overflow-y-auto"
            >
              {/* Header da Sidebar */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                <div className="flex items-center gap-3">
                  <div className="bg-linear-to-br from-primary-600 to-primary-700 p-2 rounded-xl">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-bold text-neutral-900">Pixelaria</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-all duration-300 active:scale-95"
                  aria-label="Fechar menu"
                >
                  <X className="w-6 h-6 text-neutral-700" />
                </button>
              </div>

              {/* Links de Navegação */}
              <nav className="flex flex-col p-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-4 px-4 rounded-xl font-medium transition-all duration-300 ${
                      location.pathname === link.to
                        ? 'bg-primary-50 text-primary-600 border border-primary-100'
                        : 'text-neutral-700 hover:bg-neutral-50 hover:text-primary-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                
                <div className="mt-6 pt-4 border-t border-neutral-200">
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full py-4 text-center bg-linear-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 rounded-xl font-semibold transition-all duration-300 shadow-lg active:scale-95 bg-gray-100"
                  >
                    Área do Cliente
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTop } from '../../utils/ScrollToTop';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  // Páginas onde o footer não deve aparecer (apenas login, register e resend verification)
  const hideFooterPaths = ['/login', '/register', '/resend-verification', '/verify-email', '/reset-password', '/forgot-password'];
  const shouldHideFooter = hideFooterPaths.includes(location.pathname);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      {!shouldHideFooter && <Footer />}
      <ScrollToTop />
    </div>
  );
};

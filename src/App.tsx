import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './shared/components/layout/Layout';
import { ToastContainer } from './shared/components/ui/Toast';
import { AuthProvider } from './shared/contexts/AuthContext';
import { ProtectedRoute, GuestRoute } from './shared/components/guards/RouteGuards';
import { RateLimitProvider } from './shared/components/ui/RateLimitNotification';

// Public Pages
import { Home } from './features/home/pages/Home';
import { Servicos } from './features/services/pages/Servicos';
import { Planos } from './features/pricing/pages/Planos';
import { Projetos } from './features/projects/pages/Projetos';
import { Processo } from './features/processos/pages/Processo';
import { Onboarding } from './features/onboarding/pages/Onboarding';
import { Blog } from './features/blog/pages/Blog';
import { BlogPost } from './features/blog/pages/BlogPost';
import { Contato } from './features/contato/pages/Contato';
import { Terms } from './features/legal/pages/Terms';
import { Privacy } from './features/legal/pages/Privacy';

// Auth Pages
import { Login } from './features/auth/pages/Login';
import { Register } from './features/auth/pages/Register';
import { ForgotPassword } from './features/auth/pages/ForgotPassword';
import { ResetPassword } from './features/auth/pages/ResetPassword';
import { VerifyEmail } from './features/auth/pages/VerifyEmail';
import { ResendVerification } from './features/auth/pages/ResendVerification';

// Protected Pages
import { Dashboard } from './features/dashboard/pages/Dashboard';
import { Profile } from './features/profile/pages/Profile';

function App() {
  console.log('[App] Rendering...');
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <RateLimitProvider>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/servicos" element={<Servicos />} />
              <Route path="/planos" element={<Planos />} />
              <Route path="/projetos" element={<Projetos />} />
              <Route path="/processo" element={<Processo />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />

              {/* Auth Routes (Guest Only) */}
              <Route 
                path="/login" 
                element={
                  <GuestRoute>
                    <Login />
                  </GuestRoute>
                } 
              />
              <Route 
                path="/register" 
                element={
                  <GuestRoute>
                    <Register />
                  </GuestRoute>
                } 
              />
              
              {/* Auth Routes (Public - any state) */}
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/confirm-email" element={<VerifyEmail />} /> {/* Alias for verify-email */}
              <Route path="/resend-verification" element={<ResendVerification />} />

              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Layout>
          <ToastContainer />
        </RateLimitProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

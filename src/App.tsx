import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './shared/components/layout/Layout';
import { ToastContainer } from './shared/components/ui/Toast';
import { Home } from './features/home/pages/Home';
import { Servicos } from './features/services/pages/Servicos';
import { Planos } from './features/pricing/pages/Planos';
import { Projetos } from './features/projects/pages/Projetos';
import { Processo } from './features/processos/pages/Processo';
import { Onboarding } from './features/onboarding/pages/Onboarding';
import { Dashboard } from './features/dashboard/pages/Dashboard';
import { Blog } from './features/blog/pages/Blog';
import { BlogPost } from './features/blog/pages/BlogPost';
import { Contato } from './features/contato/pages/Contato';
import { Terms } from './features/legal/pages/Terms';
import { Privacy } from './features/legal/pages/Privacy';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/planos" element={<Planos />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/processo" element={<Processo />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </Layout>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;

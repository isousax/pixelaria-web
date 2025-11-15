import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ToastContainer } from './components/ui/Toast';
import { Home } from './pages/Home';
import { Servicos } from './pages/Servicos';
import { Planos } from './pages/Planos';
import { Projetos } from './pages/Projetos';
import { Processo } from './pages/Processo';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { Blog } from './pages/Blog';
import { Contato } from './pages/Contato';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';

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

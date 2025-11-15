import { Link } from 'react-router-dom';
import { Code2, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Pixelaria</span>
            </div>
            <p className="text-sm mb-4">
              Criamos sites profissionais que transformam visitantes em clientes. Sua presença digital começa aqui.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-neutral-800 hover:bg-primary-600 rounded-lg transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-neutral-800 hover:bg-primary-600 rounded-lg transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-neutral-800 hover:bg-primary-600 rounded-lg transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-neutral-800 hover:bg-primary-600 rounded-lg transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-white font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Início</Link></li>
              <li><Link to="/servicos" className="hover:text-white transition-colors">Serviços</Link></li>
              <li><Link to="/planos" className="hover:text-white transition-colors">Planos</Link></li>
              <li><Link to="/projetos" className="hover:text-white transition-colors">Projetos</Link></li>
              <li><Link to="/processo" className="hover:text-white transition-colors">Processo</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="text-white font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/onboarding" className="hover:text-white transition-colors">Começar Agora</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Área do Cliente</Link></li>
              <li><Link to="/contato" className="hover:text-white transition-colors">Contato</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Termos de Uso</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Política de Privacidade</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:contato@pixelaria.com.br" className="hover:text-white transition-colors">
                  contato@pixelaria.com.br
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="tel:+5511999999999" className="hover:text-white transition-colors">
                  (11) 99999-9999
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>São Paulo, SP - Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {currentYear} Pixelaria. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

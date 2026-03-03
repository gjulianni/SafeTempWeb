import { useState } from 'react';
import { LayoutDashboard, History, GitCompare, Settings, Menu, X, User } from 'lucide-react';
import logoSafetemp from '../../assets/logost.png';
import { useAuth } from '../../contexts/auth/authContext';
import { useNavigate } from 'react-router-dom';
import UserDropdown from './dropdown/UserDropdown';


const linksNavegacao = [
  { nome: 'Dashboard', path: '#dashboard', icon: LayoutDashboard, ativo: true },
  { nome: 'Histórico', path: '#historico', icon: History, ativo: false },
  { nome: 'Comparações', path: '#comparacoes', icon: GitCompare, ativo: false },
  { nome: 'Configurações', path: '#config', icon: Settings, ativo: false },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login')
  };

  const handleHomeClick = () => {
    navigate('/home');
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <div className="w-full max-w-7xl bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl px-6 py-3">
        <div className="flex justify-between items-center">
          
          <div className="flex items-center gap-2 group cursor-pointer">
            <img 
              className="h-10 w-auto group-hover:scale-105 transition-transform" 
              src={logoSafetemp} 
              alt="SafeTemp Logo" 
              onClick={handleHomeClick}
            />
          </div>

          <div className="hidden md:flex items-center gap-2">
            {linksNavegacao.map((link) => (
              <a
                key={link.nome}
                href={link.path}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl text-md font-semibold transition-all duration-300
                  ${link.ativo 
                    ? 'bg-brand-purple text-white shadow-md shadow-brand-purple/20' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-brand-purple'
                  }`}
              >
                <link.icon size={18} />
                {link.nome}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <UserDropdown />
            ) : (
            <button onClick={handleLoginClick} className="hidden sm:block px-5 py-2 bg-brand-purple text-white text-sm font-bold rounded-xl hover:opacity-90 cursor-pointer transition-opacity shadow-sm">
              Entrar
            </button>
            )}

            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-100 space-y-2 animate-in fade-in slide-in-from-top-4">
            {linksNavegacao.map((link) => (
              <a
                key={link.nome}
                href={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  link.ativo 
                  ? 'bg-purple-50 text-brand-purple border-l-4 border-brand-purple' 
                  : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <link.icon size={20} />
                {link.nome}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
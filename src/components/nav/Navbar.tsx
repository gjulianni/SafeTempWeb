import { useState } from 'react';
import { LayoutDashboard, History, GitCompare, Settings, Menu, X, ChevronDown } from 'lucide-react';
import logoSafetemp from '../../assets/logost.png';
import { useAuth } from '../../contexts/auth/authContext';
import { useNavigate, useLocation } from 'react-router-dom';
import UserDropdown from './dropdown/UserDropdown';
import HistoryMegaMenu from './history/HistoryMegaMenu';
import { AnimatePresence, motion } from 'framer-motion';


const linksNavegacao = [
  { nome: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { nome: 'Histórico', path: '/historico', icon: History },
  { nome: 'Comparações', path: '/comparacoes', icon: GitCompare },
  { nome: 'Configurações', path: '/config', icon: Settings },
];

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAtivo = (path: string) => location.pathname === path;
  const toggleMenu = (menuName: string) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const handleLoginClick = () => {
    navigate('/login')
  };

  const handleHomeClick = () => {
    navigate('/home');
  };

 return (
   <nav className={`
      fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-in-out
      ${activeMenu ? 'p-0' : 'p-4'} 
    `}>
      {activeMenu && (
        <div 
          className="fixed inset-0 z-40 cursor-default" 
          onClick={() => setActiveMenu(null)} 
        />
      )}
      <AnimatePresence>
    {activeMenu && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setActiveMenu(null)}
        className="fixed inset-0 bg-black/60 z-30 cursor-default" 
      />
    )}
  </AnimatePresence>
     <div className={`
        relative w-full bg-white backdrop-blur-md border border-white/20 shadow-lg px-6 py-3 z-40 transition-all duration-500 ease-in-out
        ${activeMenu 
          ? 'max-w-full rounded-none border-x-0 border-t-0 shadow-xl' 
          : 'max-w-7xl rounded-[2.5rem]'
        }
      `}>
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          
          <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <img
              className="h-10 w-auto group-hover:scale-105 transition-transform"
              src={logoSafetemp}
              alt="SafeTemp Logo"
              onClick={handleHomeClick}
            />
          </div>
          </div>
            <div className="hidden md:flex items-center gap-2">
            {linksNavegacao.map((link) => {
              const ativo = isAtivo(link.path);
              const temSubmenu = link.nome === 'Histórico' || link.nome === 'Comparações';
              const isOpen = activeMenu === link.nome;

              return (
                <div key={link.nome} className="relative">
                  <button
                    onClick={() => {
                      if (temSubmenu) {
                        toggleMenu(link.nome);
                      } else {
                        setActiveMenu(null);
                        navigate(link.path);
                      }
                    }}
                    className={`
                      relative group overflow-hidden cursor-pointer flex items-center gap-2 px-6 py-2 rounded-xl text-md font-semibold transition-all duration-500
                      ${ativo || isOpen ? 'text-white' : 'text-gray-600 hover:text-white transition-all duration-100'}
                    `}
                  >
                    <span className={`
                      absolute inset-0 bg-brand-purple transition-transform duration-200 ease-out z-0
                      ${ativo || isOpen ? 'scale-100' : 'scale-0 group-hover:scale-100'}
                    `} style={{ transformOrigin: 'center' }} />

                    <span className="relative z-10 flex items-center gap-2">
                      <link.icon size={18} />
                      {link.nome}
                      {temSubmenu && (
                        <ChevronDown 
                          size={14} 
                          className={`ml-1 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                        />
                      )}
                    </span>
                  </button>
                </div>
              );
            })}
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
        <AnimatePresence>
        {activeMenu === 'Histórico' && <HistoryMegaMenu />}
      </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
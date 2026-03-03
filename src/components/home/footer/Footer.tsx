
import { Github, Linkedin, Mail, ArrowUpCircle } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-brand-purple text-white pt-20 pb-10">
       <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform -translate-y-[99%] pointer-events-none">
    <svg 
      viewBox="0 0 1200 140" 
      preserveAspectRatio="none" 
      className="relative block w-full h-[100px] rotate-180"
    >
      <path 
         d="M0,60 
     C150,20 300,20 450,50 
     C600,80 750,80 900,50 
     C1020,25 1100,30 1200,60 
     L1200,0 
     L0,0 
     Z"  
        className="fill-brand-purple" 
      ></path>
    </svg>
  </div>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/20">
          
   
          <div className="space-y-6">
            <h2 className="text-4xl font-black tracking-wide text-white ">
              SafeTemp
            </h2>
            <p className="text-white/80 leading-relaxed font-medium">
              Monitoramento inteligente e preciso para estufas laboratoriais. Desenvolvido por estudantes para transformar a ciência.
            </p>
            <div className="flex gap-4">
              <button className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all cursor-pointer">
                <Github size={20} />
              </button>
              <button className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all cursor-pointer">
                <Linkedin size={20} />
              </button>
              <button className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all cursor-pointer">
                <Mail size={20} />
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-black/40">Tecnologias</h4>
            <ul className="space-y-4 font-bold text-white/90">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                React Native & Expo
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                TypeScript & Node.js
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                Azure SQL Database
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-black/40">Projeto</h4>
            <ul className="space-y-4 font-bold text-white/90">
              <li className="hover:translate-x-1 transition-transform cursor-pointer">Documentação</li>
              <li className="hover:translate-x-1 transition-transform cursor-pointer">Funcionalidades</li>
              <li className="hover:translate-x-1 transition-transform cursor-pointer">Histórico de Dados</li>
            </ul>
          </div>
        </div>

        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">
            © 2026 SafeTemp. Criado para inovação laboratorial.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            Voltar ao topo
            <ArrowUpCircle size={20} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
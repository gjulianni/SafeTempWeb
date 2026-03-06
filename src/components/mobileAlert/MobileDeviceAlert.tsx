import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuSmartphone, LuX } from 'react-icons/lu';

const MobileDeviceAlert = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;

    const hasBeenDismissed = localStorage.getItem('@SafeTemp:mobileAlertDismissed');

    if (isMobile && !hasBeenDismissed) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('@SafeTemp:mobileAlertDismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-purple/5 rounded-full" />
            
            <button onClick={handleDismiss} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 cursor-pointer">
              <LuX size={20} />
            </button>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-brand-purple/10 rounded-2xl flex items-center justify-center text-brand-purple">
                <LuSmartphone size={32} />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-black text-gray-800">Versão Mobile Disponível</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Detectamos que você está em um dispositivo móvel. Para uma melhor experiência, é recomendado utilizar o app do <strong>SafeTemp</strong>.
                </p>
              </div>

              <button 
                onClick={handleDismiss}
                className="w-full py-4 bg-brand-purple text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-brand-purple/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                Entendido, continuar aqui
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileDeviceAlert;
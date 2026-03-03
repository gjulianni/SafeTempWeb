import { ArrowRight, Zap } from 'lucide-react';
import Navbar from '../../nav/Navbar';
import { motion } from 'framer-motion';
import DashboardCard from '../infoCard/Card';

const Hero = () => {
  return (
    <>
    <Navbar />
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 overflow-hidden pt-20">
<div className="absolute top-1/2 -left-1/4 w-[800px] h-[800px] bg-brand-purple/5 rounded-full blur-[120px]"></div>

<div className="absolute bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-brand-orange/5 rounded-full blur-[120px]"></div>

      <div className="max-w-8xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        
        <motion.div
            className="w-full lg:max-w-none bg-transparent p-8 rounded-lg"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >     
<div className="w-full flex justify-start">
        <motion.h1
  className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-[1.1] mb-6 font-sans"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
>
  Sua estufa <span className="text-brand-purple inline-block">inteligente.</span>
</motion.h1>
</div>
        
            <motion.p
              className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-xl font-medium mb-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            >
          O <span className='text-brand-purple'>SafeTemp</span> é um sistema de monitoramento inteligente desenvolvido para acompanhar, em tempo real, a temperatura de estufas 
          laboratoriais. A plataforma permite a consulta do histórico completo de dados, possibilitando que você visualize 
          medições passadas, identifique padrões e acompanhe variações ao longo do tempo.
            </motion.p>
             <div className='mt-10 flex flex-wrap gap-4'>
            <button className="group flex items-center gap-2 px-8 py-4 bg-brand-purple text-white font-bold rounded-2xl shadow-xl shadow-brand-purple/20 hover:scale-105 cursor-pointer transition-all">
              Explorar
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="hidden sm:flex items-center gap-3">
    </div>
          </div>
          </motion.div>
         
        <div className="relative flex justify-center items-center">
          <div className="z-20 transform hover:scale-[1.02] transition-transform duration-500">
            <DashboardCard />
          </div>

          <div className="absolute -top-12 -right-8 bg-white p-5 rounded-3xl shadow-xl border border-gray-50 flex items-center gap-4 z-30 animate-bounce-slow">
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-brand-orange">
              <Zap size={24} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-black">Eficiência</p>
              <p className="text-xl font-black text-gray-800">99.9%</p>
            </div>
          </div>
        </div>

      </div>
    </section>
    </>
  );
};

export default Hero;
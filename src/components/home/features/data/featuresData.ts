import { LineChart, FileText, Database, Bell, Cloud, Cpu, BarChart3, ShieldCheck } from 'lucide-react';

export const featurePages = [
  [
    { title: "Gráficos", icon: LineChart, color: "bg-blue-500", desc: "Visualização dinâmica." },
    { title: "Relatórios", icon: FileText, color: "bg-emerald-500", desc: "Exportação em PDF/Excel." },
    { title: "Histórico", icon: Database, color: "bg-amber-500", desc: "Banco completo." },
    { title: "Alertas", icon: Bell, color: "bg-orange-600", desc: "Notificações inteligentes." },
  ],
  [
    { title: "Cloud", icon: Cloud, color: "bg-cyan-500", desc: "Acesso global." },
    { title: "Hardware", icon: Cpu, color: "bg-slate-700", desc: "Integração direta." },
    { title: "Analytics", icon: BarChart3, color: "bg-teal-500", desc: "Cálculos de precisão." },
    { title: "Segurança", icon: ShieldCheck, color: "bg-indigo-500", desc: "Dados protegidos." },
  ]
];

export const features = [
  { 
    title: "Gráficos", 
    icon: LineChart, 
    color: "bg-blue-500", 
    desc: "Visualização dinâmica.",
    longDesc: "Acompanhe a evolução térmica da sua estufa através de gráficos de área e linha interativos. Identifique padrões e picos de temperatura com uma interface projetada para análise rápida."
  },
  { 
    title: "Relatórios", 
    icon: FileText, 
    color: "bg-emerald-500/90", 
    desc: "Exportação em PDF/Excel.",
    longDesc: "Gere documentos técnicos detalhados com apenas um clique. Perfeito para auditorias e registros científicos, consolidando todos os dados coletados em formatos profissionais."
  },
  { 
    title: "Histórico", 
    icon: Database, 
    color: "bg-amber-500/90", 
    desc: "Banco de dados completo.",
    longDesc: "Nada se perde. Acesse o histórico completo de medições — que já ultrapassa a marca de 31.000 registros — permitindo uma análise retroativa profunda de cada experimento."
  },
  { 
    title: "Alertas", 
    icon: Bell, 
    color: "bg-orange-600", 
    desc: "Notificações inteligentes.",
    longDesc: "Configure limites de segurança e receba avisos imediatos caso o ambiente saia dos parâmetros ideais. Proteção ativa para garantir a integridade da sua produção."
  },
  { 
    title: "Segurança", 
    icon: ShieldCheck, 
    color: "bg-indigo-500", 
    desc: "Dados protegidos.",
    longDesc: "Protocolos de criptografia e autenticação robustos para garantir que os dados da sua estufa estejam sempre protegidos contra acessos não autorizados."
  },
  { 
    title: "Cloud", 
    icon: Cloud, 
    color: "bg-cyan-500", 
    desc: "Acesso global via nuvem.",
    longDesc: "Sua estufa no seu bolso. Graças à infraestrutura em nuvem, você pode monitorar e gerenciar seus dados de qualquer lugar do mundo, com sincronização em tempo real entre web e mobile."
  },
  { 
    title: "Hardware", 
    icon: Cpu, 
    color: "bg-slate-700", 
    desc: "Integração direta.",
    longDesc: "Compatibilidade total com sensores de precisão via protocolos de baixa latência. Uma ponte robusta entre o mundo físico e a análise digital de dados."
  },
  { 
    title: "Analytics", 
    icon: BarChart3, 
    color: "bg-teal-500", 
    desc: "Cálculos de precisão.",
    longDesc: "O SafeTemp processa automaticamente métricas complexas como Desvio Padrão e Variância, entregando indicadores reais sobre a estabilidade térmica do seu ambiente."
  },
];
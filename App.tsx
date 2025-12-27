
import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import { Language } from './types';
import { translations } from './i18n';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Strategy from './components/Strategy';
import Principles from './components/Principles';
import Process from './components/Process';
import Services from './components/Services';
import Team from './components/Team';
import Contact from './components/Contact';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.pl) => string;
  isRtl: boolean;
  activeLocation: string;
  setActiveLocation: (loc: string) => void;
  activeSectionIndex: number;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};

const MobileHUD: React.FC<{ index: number }> = ({ index }) => {
  const { t } = useLanguage();
  const sections = ['HERO', 'ABOUT', 'STRATEGY', 'LOGIC', 'PROCESS', 'AREAS', 'TEAM', 'CONTACT'];
  
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] md:hidden">
      <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-5 py-2.5 flex items-center gap-4 shadow-2xl">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-tech text-[9px] text-white/40 tracking-[0.2em]">LIVE_NODE</span>
        </div>
        <div className="w-[1px] h-3 bg-white/10" />
        <div className="text-tech text-[10px] text-white font-bold tracking-widest min-w-[80px] text-center">
          {sections[index] || 'SYSTEM'}
        </div>
        <div className="w-[1px] h-3 bg-white/10" />
        <div className="text-tech text-[10px] text-white/40">
          0{index + 1}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('pl');
  const [activeLocation, setActiveLocation] = useState('DUBAI');
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const t = (key: keyof typeof translations.pl) => {
    return translations[language][key] || translations.pl[key];
  };

  const isRtl = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;

    const sections = ['#', '#o-nas', '#strategia', '#how', '#process-structure', '#uslugi', '#team', '#kontakt'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      sections.forEach((id, idx) => {
        const el = id === '#' ? document.body : document.querySelector(id);
        if (el && (el as HTMLElement).offsetTop <= scrollPos) {
          setActiveSectionIndex(idx);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [language, isRtl]);

  const value = {
    language,
    setLanguage,
    t,
    isRtl,
    activeLocation,
    setActiveLocation,
    activeSectionIndex
  };

  return (
    <LanguageContext.Provider value={value}>
      <div className="min-h-screen selection:bg-mtg-gold selection:text-black">
        <Header />
        <MobileHUD index={activeSectionIndex} />
        <main>
          <Hero />
          <About />
          <Strategy />
          <Principles />
          <Process />
          <Services />
          <Team />
          <Contact />
        </main>
        <footer className="bg-black py-14 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-9 items-start">
              <div className="space-y-4">
                <div className="text-tech text-[10px] text-white/25">OPERATIONAL_NODES</div>
                <div className="text-tech text-xs text-white/70">SYS_NODE_099</div>
                <div className="text-tech text-xs text-white/70">AUTH_MODE_AES</div>
              </div>
              <div className="space-y-4">
                <div className="text-tech text-[10px] text-white/25">IMPRINT_DATA</div>
                <div className="text-tech text-xs text-white/70">MTG_GRP_OPS_LTD</div>
                <div className="text-tech text-xs text-white/70">REG_ID: 0X9928F1</div>
              </div>
              <div className="space-y-4">
                <div className="text-tech text-[10px] text-white/25">LEGAL_PROTOCOLS</div>
                <a href="#" className="block text-tech text-xs text-white/50 hover:text-white/90 border-b border-white/10 w-fit pb-1 transition-colors">Privacy_Policy</a>
                <a href="#" className="block text-tech text-xs text-white/50 hover:text-white/90 border-b border-white/10 w-fit pb-1 transition-colors">GDPR_Data</a>
              </div>
              <div className="flex justify-end gap-3.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)] mt-2 shrink-0" />
                <div className="text-tech text-[11px] text-emerald-500/70 leading-relaxed">
                  DESIGN_VERSION_6.0
                  <span className="block text-white/20 mt-1.5 tracking-widest">OLO_WEBMASTER</span>
                </div>
              </div>
            </div>
            <div className="mt-14 pt-5 border-t border-white/10 flex justify-between gap-5 flex-wrap text-tech text-[10px] text-white/20">
              <span>© 2025 | ALL_SYSTEMS_OPERATIONAL</span>
              <span>GR-882_AUTH</span>
            </div>
          </div>
        </footer>
      </div>
    </LanguageContext.Provider>
  );
};

export default App;


import React, { useState, createContext, useContext, useEffect } from 'react';
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
import Footer from './components/Footer';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.pl) => string;
  isRtl: boolean;
  activeLocation: string;
  setActiveLocation: (loc: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('pl');
  const [activeLocation, setActiveLocation] = useState('FINANSE');

  const t = (key: keyof typeof translations.pl) => {
    return translations[language][key] || translations.pl[key];
  };

  const isRtl = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRtl]);

  const value = {
    language,
    setLanguage,
    t,
    isRtl,
    activeLocation,
    setActiveLocation
  };

  return (
    <LanguageContext.Provider value={value}>
      <div className="min-h-screen">
        <Header />
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
        <Footer />
      </div>
    </LanguageContext.Provider>
  );
};

export default App;

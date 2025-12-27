
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../App';

const Header: React.FC = () => {
  const { language, setLanguage, t, activeLocation } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('');

  const navItems = [
    { href: "#o-nas", label: t('nav_about'), id: 'o-nas' },
    { href: "#strategia", label: t('nav_strategy'), id: 'strategia' },
    { href: "#uslugi", label: t('nav_services'), id: 'uslugi' },
    { href: "#how", label: t('nav_how'), id: 'how' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [language]); // Re-run when language changes as translations might affect layout slightly

  return (
    <header className="sticky top-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <a href="#" className="flex flex-col leading-none group overflow-hidden">
          <span className="font-head font-bold text-lg tracking-wider">MTG</span>
          <div className="h-5 overflow-hidden">
            <span 
              key={`${activeLocation}-${language}`}
              className="block font-mono text-[13px] tracking-[0.3em] text-mtg-gold uppercase mt-1 animate-[subtextReveal_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]"
            >
              {activeLocation}
            </span>
          </div>
        </a>

        <nav className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`font-mono text-[11px] tracking-[0.26em] uppercase relative py-2 group transition-all duration-300 ease-out ${
                  isActive ? 'text-white font-bold' : 'text-mtg-muted2 hover:text-white/90 font-medium'
                }`}
              >
                {item.label}
                <span 
                  className={`absolute left-0 bottom-[-2px] h-[1.5px] bg-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive 
                      ? 'w-full opacity-100 shadow-[0_0_8px_rgba(255,255,255,0.4)]' 
                      : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-30'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            {(['pl', 'en', 'ar'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`font-mono text-[11px] tracking-[0.22em] border px-2.5 py-1.5 rounded-lg uppercase transition-all duration-300 hover:scale-110 active:scale-95 ${
                  language === lang 
                    ? 'text-white border-white/20 bg-white/5' 
                    : 'text-mtg-muted2 border-white/10 hover:border-white/20 hover:text-white/80'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
          <a
            href="#kontakt"
            className="font-mono text-[11px] tracking-[0.22em] border border-white/20 bg-white/5 hover:bg-white/10 text-white px-4 py-3 rounded-xl flex items-center gap-2 uppercase transition-all whitespace-nowrap"
          >
            {t('cta_contact')} <span className="opacity-90">→</span>
          </a>
        </div>
      </div>
      <style>{`
        @keyframes subtextReveal {
          0% { 
            opacity: 0; 
            transform: translateY(100%);
            filter: blur(4px);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0);
            filter: blur(0);
          }
        }
      `}</style>
    </header>
  );
};

export default Header;

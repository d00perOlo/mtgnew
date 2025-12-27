
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../App';

const JustifiedChars = ({ text, className = "", scramble = false }: { text: string; className?: string; scramble?: boolean }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "01X/_#$";
  
  useEffect(() => {
    if (!scramble) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        text.split('').map((char, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 40);
    
    return () => clearInterval(interval);
  }, [text, scramble]);

  const charArray = displayText.split('');
  return (
    <div className={`flex justify-between w-full ${className}`}>
      {charArray.map((char, i) => (
        <span key={i} className="inline-block transition-all duration-300">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [language]);

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-[100px] flex items-center justify-between">
        <div className="relative flex items-center gap-6">
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 pointer-events-none select-none flex flex-col items-start leading-[0.7] z-0">
            <span className="text-tech text-[52px] md:text-[60px] font-black text-white/[0.04] tracking-[0.1em] uppercase">
              HUB
            </span>
            <span className="text-tech text-[24px] md:text-[28px] font-black text-white/[0.03] tracking-[0.2em] uppercase ml-1">
              ACTIVITY
            </span>
          </div>

          <a href="#" className="relative z-10 group flex flex-col items-start">
            <div className="w-[85px] md:w-[130px] flex flex-col">
              <JustifiedChars 
                text="MTG" 
                className="font-head font-bold text-[32px] md:text-[44px] tracking-tighter text-white leading-none"
              />
              <div className="h-[1.5px] w-full bg-white/15 my-1.5 overflow-hidden">
                <div className="h-full w-1/3 bg-mtg-gold/60 animate-[scanline_2s_linear_infinite]" />
              </div>
              <div className="relative h-5 overflow-visible">
                <div 
                  key={`${activeLocation}-${language}`}
                  className="absolute inset-0 flex items-center animate-[locationLock_0.4s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                >
                  <span className="text-tech text-[10px] md:text-[14px] font-bold text-mtg-gold tracking-[0.08em] uppercase cursor-pointer group-hover:brightness-125 transition-all duration-300 drop-shadow-[0_0_15px_rgba(215,178,91,0.5)] w-full">
                    <JustifiedChars text={activeLocation} scramble={true} />
                  </span>
                </div>
              </div>
            </div>
          </a>
          
          <div className="h-14 w-[1px] bg-white/10 hidden md:block ml-6" />
        </div>

        <nav className="hidden lg:flex gap-10 items-center">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`text-tech text-[11px] relative py-2 group transition-all duration-300 ease-out ${
                  isActive ? 'text-white font-bold' : 'text-white/40 hover:text-white/90 font-medium'
                }`}
              >
                {item.label}
                <span 
                  className={`absolute left-0 bottom-[-4px] h-[2px] bg-mtg-gold transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive 
                      ? 'w-full opacity-100 shadow-[0_0_15px_rgba(215,178,91,0.8)]' 
                      : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-40'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-5">
          <div className="hidden sm:flex gap-1.5 p-1 bg-white/5 rounded-xl border border-white/5">
            {(['pl', 'en', 'ar'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`text-tech text-[10px] uppercase font-bold px-3 py-1.5 rounded-lg transition-all duration-300 ${
                  language === lang 
                    ? 'text-black bg-white shadow-[0_0_10px_rgba(255,255,255,0.2)]' 
                    : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
          <a
            href="#kontakt"
            className="text-tech text-[11px] font-bold bg-white text-black px-5 py-3 rounded-xl flex items-center gap-2 transition-all hover:bg-mtg-gold hover:scale-105 active:scale-95 whitespace-nowrap shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            {t('cta_contact')} <span className="text-lg leading-none">→</span>
          </a>
        </div>
      </div>
      <style>{`
        @keyframes locationLock {
          0% { 
            opacity: 0; 
            transform: translateY(8px);
            filter: blur(4px) brightness(2);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0);
            filter: blur(0) brightness(1);
          }
        }
        @keyframes scanline {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </header>
  );
};

export default Header;

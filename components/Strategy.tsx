
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../App';

const StrategyCard: React.FC<{ stage: any; index: number; isActive: boolean; onClick: () => void }> = ({ stage, index, isActive, onClick }) => {
  return (
    <article 
      onClick={onClick}
      className={`strategy-tile relative p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/10 overflow-hidden transition-all duration-700 cursor-pointer md:cursor-default min-h-[80px] md:h-[380px] ${
        isActive ? 'bg-white/[0.06] md:bg-white/[0.04]' : 'bg-transparent'
      }`}
    >
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 md:hidden" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 md:hidden" />
      
      <div className={`absolute top-0 left-0 h-[2px] bg-white transition-all duration-700 ease-in-out ${isActive ? 'w-full opacity-60' : 'w-0 opacity-0'}`} />
      
      <div className={`flex justify-between text-tech text-[9px] md:text-[10px] text-white/25 mb-2 md:mb-0 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
        <span className={`${isActive ? 'text-white/60' : ''}`}>{stage.stage}</span>
        <span className="hidden md:inline">{stage.time}</span>
      </div>
      
      <div className={`md:absolute md:bottom-8 md:left-8 md:right-8 transition-all duration-500`}>
        <div className="flex items-center justify-between md:block py-2 md:py-0">
          <h3 className={`font-head font-bold text-[18px] md:text-h3 md:mb-5 transition-all duration-500 ${isActive ? 'text-white translate-y-0' : 'text-white/50 md:text-white/40 translate-y-0 md:translate-y-2'}`}>
            {stage.h}
          </h3>
          <span className={`md:hidden text-white/30 transition-transform duration-500 ${isActive ? 'rotate-180' : ''}`}>▼</span>
        </div>

        <div className={`overflow-hidden transition-all duration-500 ease-out ${isActive ? 'max-h-40 opacity-100 mt-4 md:mt-0' : 'max-h-0 opacity-0 md:max-h-[500px] md:opacity-100'}`}>
          <p className={`text-tech text-[10px] md:text-[11px] leading-[1.6] ${isActive ? 'text-white/60' : 'text-white/20'}`}>
            {stage.p}
          </p>
          <div className="md:hidden mt-4 pt-3 border-t border-white/5 text-[9px] text-white/20 flex gap-4 uppercase tracking-widest">
             <span>{stage.time}</span>
             <span>ID_{stage.stage}</span>
          </div>
        </div>

        <div className={`absolute -bottom-4 -right-4 font-head text-[60px] md:text-[120px] font-bold select-none pointer-events-none transition-all duration-700 ${isActive ? 'text-white/[0.08] -translate-x-2 -translate-y-2' : 'text-white/[0.02]'}`}>
          {`0${index + 1}`}
        </div>
      </div>
    </article>
  );
};

const Strategy: React.FC = () => {
  const { t, setActiveLocation } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const stages = [
    { h: t('s2_t1_h'), p: t('s2_t1_p'), stage: 'STAGE_01', time: '[15–45 MIN]' },
    { h: t('s2_t2_h'), p: t('s2_t2_p'), stage: 'STAGE_02', time: '[2–24 GODZ]' },
    { h: t('s2_t3_h'), p: t('s2_t3_p'), stage: 'STAGE_03', time: '[48 GODZ – 7 DNI]' },
    { h: t('s2_t4_h'), p: t('s2_t4_p'), stage: 'STAGE_04', time: '[24–48 GODZ]' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveLocation(t('city_warsaw'));
            const tileIdx = Number(entry.target.getAttribute('data-idx'));
            if (!isNaN(tileIdx)) setActiveIdx(tileIdx);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-25% 0px -25% 0px" }
    );

    const tiles = document.querySelectorAll('.strategy-tile');
    tiles.forEach((tile, idx) => {
      tile.setAttribute('data-idx', String(idx));
      observer.observe(tile);
    });
    return () => observer.disconnect();
  }, [t, setActiveLocation]);

  return (
    <section id="strategia" ref={sectionRef} className="py-16 md:py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <header className="relative flex flex-col md:flex-row justify-between items-start md:items-center mb-10 md:mb-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 text-tech text-[11px] text-mtg-muted2 mb-6">
              <span className="opacity-90">/</span> {t('s2_kicker')}
            </div>
            <div className="flex flex-col gap-y-1.5 md:gap-y-2 text-[28px] md:text-h2 font-head font-bold leading-none text-left">
              <span className={`transition-all duration-500 ${activeIdx === 0 ? 'text-white' : 'text-white/20'}`}>ANALIZA.</span>
              <span className={`transition-all duration-500 ${activeIdx === 1 || activeIdx === 2 ? 'text-white' : 'text-white/20'}`}>STRUKTURA.</span>
              <span className={`transition-all duration-500 ${activeIdx === 3 ? 'text-white' : 'text-white/20'}`}>RAPORT.</span>
            </div>
          </div>

          <div className="hidden md:block">
            <nav className="flex gap-3 items-center bg-white/[0.03] p-2 rounded-2xl border border-white/10">
              {stages.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`group flex items-center gap-3 text-tech text-[11px] px-5 py-3 rounded-xl transition-all duration-500 ${
                    activeIdx === i ? 'text-white bg-white/20 border border-white/30' : 'text-mtg-muted2 hover:text-white/80'
                  }`}
                >
                  <span>{`0${i+1}`}</span>
                  <span className={`rounded-[1px] transition-all duration-500 ${activeIdx === i ? 'bg-white w-2 h-2 rotate-45' : 'bg-white/20 w-1.5 h-1.5'}`} />
                </button>
              ))}
            </nav>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-white/10 bg-white/[0.01]">
          {stages.map((stage, i) => (
            <StrategyCard 
              key={i} 
              stage={stage} 
              index={i} 
              isActive={activeIdx === i} 
              onClick={() => setActiveIdx(i)} 
            />
          ))}
        </div>

        <div className="h-[1px] w-full bg-white/10 mt-12 md:mt-16" />
        <div className="text-tech text-[10px] text-mtg-muted2 text-center mt-8">
          --- {t('s2_sentence')} ---
        </div>
      </div>
    </section>
  );
};

export default Strategy;

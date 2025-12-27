
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../App';

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

  const handleNavClick = (idx: number) => {
    const target = document.querySelector(`[data-idx="${idx}"]`);
    if (target) {
      // Offset calculation for better centering on various viewports
      const targetRect = target.getBoundingClientRect();
      const offset = (window.innerHeight - targetRect.height) / 2;
      const top = window.pageYOffset + targetRect.top - offset;

      window.scrollTo({
        top,
        behavior: 'smooth'
      });
      
      setActiveIdx(idx);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveLocation(t('city_dubai'));
            const tileIdx = Number(entry.target.getAttribute('data-idx'));
            if (!isNaN(tileIdx)) {
              setActiveIdx(tileIdx);
            }
          }
        });
      },
      { 
        // Higher threshold combined with specific root margins for precise centering detection
        threshold: 0.5,
        rootMargin: "-25% 0px -25% 0px"
      }
    );

    const tiles = document.querySelectorAll('.strategy-tile');
    tiles.forEach(tile => observer.observe(tile));

    return () => observer.disconnect();
  }, [t, setActiveLocation]);

  return (
    <section id="strategia" ref={sectionRef} className="py-28 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <header className="relative flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-mtg-muted2 uppercase mb-4">
              <span className="opacity-90">/</span> {t('s2_kicker')}
            </div>
            <div className="flex flex-wrap gap-x-7 gap-y-2 font-head text-[clamp(34px,5.5vw,72px)] font-bold tracking-tight uppercase leading-none text-white/40">
              <span className={`transition-colors duration-500 ${activeIdx === 0 ? 'text-white' : ''}`}>ANALIZA.</span>
              <span className={`transition-colors duration-500 ${activeIdx === 1 || activeIdx === 2 ? 'text-white' : ''}`}>STRUKTURA.</span>
              <span className={`transition-colors duration-500 ${activeIdx === 3 ? 'text-white' : ''}`}>RAPORT.</span>
            </div>
          </div>

          <nav className="flex gap-4 items-center mt-8 md:mt-0 bg-white/[0.03] p-1.5 rounded-2xl border border-white/10">
            {stages.map((_, i) => (
              <button 
                key={i}
                onClick={() => handleNavClick(i)}
                className={`group flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] px-5 py-3 rounded-xl transition-all duration-500 ${
                  activeIdx === i 
                    ? 'text-white bg-white/20 shadow-[0_4px_25px_rgba(255,255,255,0.12)] scale-[1.08] border border-white/20' 
                    : 'text-mtg-muted2 hover:text-white/80 border border-transparent'
                }`}
              >
                <span className={`transition-opacity duration-300 ${activeIdx === i ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>
                  {`0${i+1}`}
                </span>
                <span className={`rounded-[1px] transition-all duration-500 ${
                  activeIdx === i 
                    ? 'bg-white w-2 h-2 rotate-45 shadow-[0_0_8px_rgba(255,255,255,0.8)]' 
                    : 'bg-white/20 w-1.5 h-1.5'
                }`} />
              </button>
            ))}
          </nav>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 border border-white/10 bg-white/[0.01]">
          {stages.map((stage, i) => (
            <article 
              key={i} 
              data-idx={i}
              className={`strategy-tile relative h-[380px] p-8 border-r border-b lg:border-b-0 border-white/10 overflow-hidden transition-all duration-700 cursor-default ${
                activeIdx === i ? 'bg-white/[0.04]' : 'bg-transparent'
              }`}
            >
              {/* Animated highlight bar for active state */}
              <div className={`absolute top-0 left-0 h-[2px] bg-white transition-all duration-700 ease-in-out ${activeIdx === i ? 'w-full opacity-60' : 'w-0 opacity-0'}`} />
              
              <div className="flex justify-between font-mono text-[10px] tracking-[0.3em] text-white/25 uppercase">
                <span className={activeIdx === i ? 'text-white/60 transition-colors duration-500' : ''}>{stage.stage}</span>
                <span className="whitespace-nowrap">{stage.time}</span>
              </div>
              
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className={`font-head text-2xl font-bold uppercase tracking-tight mb-5 transition-all duration-500 ${activeIdx === i ? 'text-white translate-y-0' : 'text-white/40 translate-y-2'}`}>
                  {stage.h}
                </h3>
                <p className={`font-mono text-[11px] tracking-[0.2em] leading-[1.7] uppercase transition-all duration-500 ${activeIdx === i ? 'text-white/50 opacity-100' : 'text-white/20 opacity-60'}`}>
                  {stage.p}
                </p>
                <div className={`absolute -bottom-6 -right-6 font-head text-[120px] font-bold select-none pointer-events-none transition-all duration-700 ${activeIdx === i ? 'text-white/[0.12] -translate-x-2 -translate-y-2' : 'text-white/[0.03]'}`}>
                  {`0${i+1}`}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="h-[1px] w-full bg-white/10 mt-16" />
        <div className="font-mono text-[10px] tracking-[0.4em] text-mtg-muted2 uppercase text-center mt-6">
          {t('sentence_time')}
        </div>
      </div>
    </section>
  );
};

export default Strategy;

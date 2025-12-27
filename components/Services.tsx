
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../App';

const Services: React.FC = () => {
  const { t, setActiveLocation } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveLocation(t('city_berlin'));
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [t, setActiveLocation]);

  const items = [
    { tag: 'AREA_0X01', q: t('s5_q1'), id: 'service-01' },
    { tag: 'AREA_0X02', q: t('s5_q2'), id: 'service-02' },
    { tag: 'AREA_0X03', q: t('s5_q3'), id: 'service-03' },
    { tag: 'AREA_0X04', q: t('s5_q4'), id: 'service-04' },
    { tag: 'AREA_0X05', q: t('s5_q5'), id: 'service-05' },
  ];

  return (
    <section ref={sectionRef} id="uslugi" className="py-20 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 md:gap-12 items-start">
          <div>
            <div className="flex items-center gap-3 text-tech text-[11px] text-mtg-muted2 mb-4">
              <span className="opacity-90">/</span> {t('s5_kicker')}
            </div>
            <h2 className="text-h2 uppercase leading-[1.1] tracking-[-0.01em] md:leading-[1.15] md:tracking-normal">
              KLUCZOWE<br/><span className="text-white/90">OBSZARY</span><br/>DZIAŁANIA.
            </h2>
            <div className="mt-8 border border-white/10 bg-white/5 p-5 md:p-6 max-w-xl rounded-2xl">
              <p className="font-body text-[14px] md:text-base text-white/70 leading-[1.7]">
                {t('s5_copy')}
              </p>
            </div>
          </div>

          <div className="border border-white/10 bg-white/[0.01] rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
            {items.map((item, i) => {
              const isOpen = openIdx === i;
              return (
                <div key={i} className={`border-t first:border-t-0 border-white/10 transition-colors duration-500 ${isOpen ? 'bg-white/[0.04]' : ''}`}>
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`content-${item.id}`}
                    className="w-full text-left p-5 md:p-6 flex items-start justify-between gap-5 group outline-none min-h-[44px]"
                  >
                    <span>
                      <span className={`block text-tech text-[9px] md:text-[10px] mb-2 transition-colors duration-300 ${isOpen ? 'text-mtg-gold' : 'text-white/20 group-hover:text-white/40'}`}>
                        {item.tag}
                      </span>
                      <span className={`block font-head font-bold leading-tight transition-all duration-500 text-[17px] md:text-[clamp(18px,2.2vw,22px)] ${isOpen ? 'text-white translate-x-1.5' : 'text-white/50 group-hover:text-white/90'}`}>
                        {item.q}
                      </span>
                    </span>
                    <span className={`flex-shrink-0 w-8 h-8 rounded-xl border border-white/10 flex items-center justify-center text-white/30 transition-all duration-500 font-mono text-lg ${isOpen ? 'rotate-[135deg] text-white bg-mtg-gold/20 border-mtg-gold/40 shadow-[0_0_20px_rgba(215,178,91,0.15)]' : 'group-hover:border-white/20'}`}>
                      +
                    </span>
                  </button>
                  
                  <div 
                    id={`content-${item.id}`}
                    role="region"
                    className={`grid transition-[grid-template-rows,opacity] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'grid-template-rows-[1fr] opacity-100' : 'grid-template-rows-[0fr] opacity-0'}`}
                  >
                    <div className="overflow-hidden">
                      <div className={`px-5 md:px-6 pb-8 transition-all duration-700 delay-100 ease-out ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
                        <div className="h-[1px] w-12 bg-mtg-gold/30 mb-5" />
                        <p className="font-body text-[14px] text-white/50 leading-[1.8] max-w-2xl">
                          W tym obszarze realizujemy projekty o wysokim stopniu sformalizowania, opierając się na dedykowanych protokołach bezpieczeństwa transakcyjnego. Każdy etap poddawany jest rygorystycznej weryfikacji przez zespół Compliance.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          <span className="text-tech text-[8px] tracking-[0.2em] text-emerald-500/80 border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 rounded-full">ACTIVE_NODE</span>
                          <span className="text-tech text-[8px] tracking-[0.2em] text-white/20 border border-white/5 bg-white/5 px-3 py-1 rounded-full">MTG_SYS_0{i+1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent mt-16 md:mt-20" />
        <div className={`text-tech text-[10px] text-white/20 text-center mt-10 transition-opacity duration-1000 ${openIdx !== null ? 'opacity-40' : 'opacity-100'}`}>
          --- {t('s5_sentence')} ---
        </div>
      </div>
    </section>
  );
};

export default Services;

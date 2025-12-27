
import React, { useState } from 'react';
import { useLanguage } from '../App';

const Services: React.FC = () => {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const items = [
    { tag: 'AREA_0X01', q: t('s5_q1'), id: 'service-01' },
    { tag: 'AREA_0X02', q: t('s5_q2'), id: 'service-02' },
    { tag: 'AREA_0X03', q: t('s5_q3'), id: 'service-03' },
    { tag: 'AREA_0X04', q: t('s5_q4'), id: 'service-04' },
    { tag: 'AREA_0X05', q: t('s5_q5'), id: 'service-05' },
  ];

  return (
    <section id="uslugi" className="py-28 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-start">
          <div>
            <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-mtg-muted2 uppercase mb-4">
              <span className="opacity-90">/</span> {t('s5_kicker')}
            </div>
            <h2 className="font-head text-[clamp(44px,6.6vw,86px)] font-bold leading-[0.95] tracking-tight uppercase">
              KLUCZOWE<br/>OBSZARY<br/>DZIAŁANIA.
            </h2>
            <div className="mt-5 border border-white/10 bg-white/5 p-5 max-w-xl">
              <p className="font-body text-sm text-white/80 leading-[1.75]">
                {t('s5_copy')}
              </p>
            </div>
          </div>

          <div className="border border-white/10 bg-white/[0.01]">
            {items.map((item, i) => {
              const isOpen = openIdx === i;
              return (
                <div key={i} className={`border-t first:border-t-0 border-white/10 transition-colors duration-500 ${isOpen ? 'bg-white/[0.02]' : ''}`}>
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`content-${item.id}`}
                    className="w-full text-left p-6 flex items-start justify-between gap-5 group outline-none"
                  >
                    <span>
                      <span className={`block font-mono text-[11px] tracking-[0.28em] uppercase mb-2 transition-colors duration-300 ${isOpen ? 'text-white/60' : 'text-white/20 group-hover:text-white/40'}`}>
                        {item.tag}
                      </span>
                      <span className={`block font-head text-[clamp(16px,1.6vw,22px)] font-bold uppercase transition-all duration-500 ${isOpen ? 'text-white translate-x-1' : 'text-white/50 group-hover:text-white/80'}`}>
                        {item.q}
                      </span>
                    </span>
                    <span className={`flex-shrink-0 w-8 h-8 rounded-xl border border-white/10 flex items-center justify-center text-white/30 transition-all duration-500 font-mono text-lg ${isOpen ? 'rotate-[135deg] text-white/90 border-white/40 bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'group-hover:border-white/20'}`}>
                      +
                    </span>
                  </button>
                  <div 
                    id={`content-${item.id}`}
                    role="region"
                    className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{ 
                      maxHeight: isOpen ? '300px' : '0',
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? 'translateY(0)' : 'translateY(-10px)'
                    }}
                  >
                    <div className="px-6 pb-8">
                      <div className="h-[1px] w-12 bg-white/10 mb-5" />
                      <p className="font-body text-sm text-white/40 leading-[1.8] max-w-3xl">
                        Operacje w tym obszarze podlegają rygorystycznym protokołom weryfikacji. 
                        Każdy projekt przechodzi przez zdefiniowane węzły decyzyjne, zapewniając pełną 
                        zgodność z kryteriami ryzyka i poufności grupy MTG. Szczegółowy zakres 
                        dostępny po wstępnej weryfikacji KYC.
                      </p>
                      <div className="mt-4 flex gap-3">
                        <span className="font-mono text-[9px] tracking-[0.2em] text-white/20 border border-white/5 px-2 py-1 rounded uppercase">Status: Active</span>
                        <span className="font-mono text-[9px] tracking-[0.2em] text-white/20 border border-white/5 px-2 py-1 rounded uppercase">Protocol: MTG-0{i+1}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="h-[1px] w-full bg-white/10 mt-14" />
      </div>
    </section>
  );
};

export default Services;


import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../App';

const Team: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const members = [
    { 
      code: 'MP-001', 
      icon: '◎', 
      pl: t('s6_r1_pl'), 
      en: t('s6_r1_en'),
      duty: "Odpowiada za strategiczne kierowanie grupą oraz relacje z kluczowymi inwestorami."
    },
    { 
      code: 'HT-004', 
      icon: '⚡', 
      pl: t('s6_r2_pl'), 
      en: t('s6_r2_en'),
      duty: "Nadzoruje architekturę finansową i proces negocjacji skomplikowanych umów handlowych."
    },
    { 
      code: 'LL-002', 
      icon: '⚙', 
      pl: t('s6_r3_pl'), 
      en: t('s6_r3_en'),
      duty: "Zapewnia ciągłość operacyjną łańcucha dostaw i bezpieczeństwo logistyczne projektów."
    },
    { 
      code: 'CS-009', 
      icon: '⛨', 
      pl: t('s6_r4_pl'), 
      en: 'COMPLIANCE',
      duty: "Gwarantuje pełną zgodność prawną i proceduralną z globalnymi standardami compliance."
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-black relative overflow-hidden">
      {/* Refined scanning background animation - Less frequent & softer */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-mtg-gold/5 to-transparent animate-[scan_10s_infinite_linear]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(215,178,91,0.03)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-10">
          <div className="max-w-xl">
            <div className={`flex items-center gap-3 text-tech text-[10px] md:text-[11px] text-mtg-muted2 mb-4 md:mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
              <span className="opacity-90">/</span> {t('s6_kicker')}
            </div>
            
            <h2 className="font-head font-bold leading-[1] tracking-tighter uppercase flex flex-col gap-0.5">
              <span className={`text-[28px] md:text-[52px] transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                Najważniejszy
              </span>
              <span className={`text-[28px] md:text-[52px] transition-all duration-[1200ms] delay-200 cubic-bezier(0.16, 1, 0.3, 1) ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                Jest
              </span>
              <span className={`text-[34px] md:text-[64px] text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-[1200ms] delay-400 cubic-bezier(0.16, 1, 0.3, 1) ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                Zespół
              </span>
            </h2>
          </div>

          <div className={`max-w-md transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="border-l border-emerald-500/30 pl-5 md:pl-6 font-body text-[14px] md:text-base text-white/50 leading-[1.6]">
              {t('s6_copy')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-white/10 bg-white/[0.01] mt-12 md:mt-20 overflow-hidden">
          {members.map((m, i) => (
            <article 
              key={i} 
              onClick={() => setActiveIdx(activeIdx === i ? null : i)}
              style={{ transitionDelay: `${800 + i * 150}ms` }}
              className={`relative h-[220px] md:h-[300px] p-7 md:p-8 border-b md:border-r md:border-b-0 border-white/10 group hover:bg-white/[0.04] transition-all duration-[800ms] cubic-bezier(0.16, 1, 0.3, 1) cursor-pointer overflow-hidden bg-black ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              } ${activeIdx === i ? 'bg-white/[0.07]' : ''}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative z-10 flex justify-between items-center text-tech text-[9px] md:text-[10px] text-white/20">
                {/* Slow-blinking CODE animation */}
                <span className="animate-[codeBlink_6s_infinite_ease-in-out] group-hover:text-white/60 transition-colors duration-300 tracking-widest">{m.code}</span>
                <span className={`w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:border-emerald-500 group-hover:text-emerald-500 group-hover:bg-emerald-500/5 transition-all duration-500 ${activeIdx === i ? 'border-emerald-500 text-emerald-500 bg-emerald-500/10' : ''}`}>
                  {m.icon}
                </span>
              </div>
              
              <div className="absolute bottom-7 left-7 right-7 md:bottom-8 md:left-8 md:right-8 z-10 flex flex-col gap-1 transition-all duration-500">
                <div className={`transition-all duration-500 ${activeIdx === i ? 'opacity-0 -translate-y-4 invisible h-0' : 'opacity-100 visible'}`}>
                  <div className="text-[17px] md:text-h4 text-white/50 group-hover:text-white uppercase transition-colors duration-300 leading-tight tracking-tight font-bold">
                    {m.pl}
                  </div>
                  {m.en && (
                    <div className="text-tech text-[9px] md:text-[10px] text-white/20 group-hover:text-white/40 transition-colors duration-300">
                      {m.en}
                    </div>
                  )}
                </div>

                <div className={`transition-all duration-500 ${activeIdx === i ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible h-0'}`}>
                  {/* Subtle pulsing animation to expanded duty text */}
                  <p className={`text-body text-[13px] md:text-[14px] text-white/90 leading-relaxed italic border-l-2 border-emerald-500 pl-4 py-1 ${activeIdx === i ? 'animate-[dutyPulse_4s_infinite_ease-in-out]' : ''}`}>
                    {m.duty}
                  </p>
                </div>

                <div className={`h-[2px] w-0 bg-emerald-500/40 mt-3 group-hover:w-full transition-all duration-700 ease-out ${activeIdx === i ? 'w-full bg-emerald-500' : ''}`} />
              </div>

              {/* Decorative background number - Responsive scaling */}
              <div className="absolute -bottom-4 -right-2 md:-bottom-6 md:-right-2 font-head text-[80px] md:text-[100px] font-bold text-white/[0.015] select-none pointer-events-none transition-all duration-700 group-hover:text-white/[0.04] group-hover:scale-105">
                0{i + 1}
              </div>
            </article>
          ))}
        </div>

        <div className={`h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent mt-16 transition-all duration-[2000ms] delay-1000 origin-left ${isVisible ? 'scale-x-100' : 'scale-x-0'}`} />
        
        <div className={`text-tech text-[9px] md:text-[10px] text-white/20 text-center mt-10 transition-all duration-1000 delay-[1.5s] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          --- {t('s6_sentence')} ---
        </div>
      </div>
      
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 0.15; }
          90% { opacity: 0.15; }
          100% { transform: translateY(1200px); opacity: 0; }
        }
        @keyframes dutyPulse {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.01); filter: brightness(1.15); }
        }
        @keyframes codeBlink {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.45; }
        }
      `}</style>
    </section>
  );
};

export default Team;

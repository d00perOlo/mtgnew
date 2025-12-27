
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../App';

export default function Principles() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const items = [
    { h: t('s3_i1_h'), p: t('s3_i1_p'), code: 'PRT-A1' },
    { h: t('s3_i2_h'), p: t('s3_i2_p'), code: 'PRT-B4' },
    { h: t('s3_i3_h'), p: t('s3_i3_p'), code: 'PRT-C2' },
    { h: t('s3_i4_h'), p: t('s3_i4_p'), code: 'PRT-D9' },
  ];

  return (
    <section id="how" ref={sectionRef} className="py-16 md:py-24 bg-white text-black overflow-hidden relative">
      {/* Subtle Animated Grid Background - Refined speed for mobile presence */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-[-200px] opacity-[0.03] md:opacity-[0.015] animate-[gridMove_60s_linear_infinite] md:animate-[gridMove_100s_linear_infinite]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr_0.5fr] gap-10 items-end mb-12 md:mb-16">
          <div className="overflow-hidden">
            <h2 className={`text-h2 transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              WSPÓŁPRACA.<br/>
              KONSEKWENCJA.<br/>
              ZASADY.
            </h2>
          </div>
          
          <div className={`transition-all duration-[1200ms] delay-300 cubic-bezier(0.16, 1, 0.3, 1) ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 text-tech text-[11px] text-black/45 mb-4 md:mb-6">
              <span className="opacity-90">/</span> {t('s3_kicker')}
            </div>
            <p className="font-body text-black/70 text-[14px] md:text-lg leading-[1.6] max-w-md">
              {t('s3_copy')}
            </p>
          </div>

          <div className={`hidden lg:flex flex-col items-end gap-2 text-tech text-[9px] text-black/30 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <span>VERIFIED_BY_MTG</span>
            <div className="w-16 h-[1px] bg-black/10" />
            <span>0x9928F1_SEC</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-start">
          <div className="space-y-0">
            {items.map((item, i) => (
              <div 
                key={i} 
                className={`group flex gap-5 md:gap-6 py-5 md:py-8 border-b border-black/10 transition-all duration-[1000ms] cubic-bezier(0.19, 1, 0.22, 1) ${
                  isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-[0.92]'
                }`} 
                style={{ transitionDelay: `${200 + i * 150}ms` }}
              >
                <div className="flex flex-col items-center pt-1.5 shrink-0">
                   <div className={`w-2.5 h-2.5 bg-black rotate-45 rounded-[1px] md:group-hover:scale-125 transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-0'}`} />
                   <span className="text-tech text-[8px] text-black/20 vertical-rl rotate-180 hidden md:inline mt-4">{item.code}</span>
                </div>
                <div>
                  <div className="font-head font-bold text-[16px] md:text-h4 mb-1 md:mb-2 text-black">
                    {item.h}
                  </div>
                  <div className="font-body text-[14px] md:text-[15px] text-black leading-snug md:leading-[1.6] max-w-lg transition-colors group-hover:text-black/80 line-clamp-2 md:line-clamp-none">
                    <span className="md:hidden mr-2">•</span>{item.p}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="sticky top-28 hidden md:block">
            <div className={`relative w-full aspect-[4/5] border border-black/5 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px] transition-all duration-[2000ms] cubic-bezier(0.16, 1, 0.3, 1) delay-[800ms] overflow-hidden ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 blur-sm'
            }`}>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`w-[85%] h-[85%] border border-black/[0.04] rounded-full transition-all duration-[1500ms] delay-[1000ms] ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
                <div className={`absolute w-[60%] h-[60%] border border-dashed border-black/[0.06] rounded-full transition-all duration-[2500ms] delay-[1200ms] ${isVisible ? 'rotate-180 opacity-100 scale-100' : 'rotate-0 opacity-0 scale-50'}`} />
              </div>
              <div className={`absolute bottom-4 right-4 text-tech text-[8px] text-black/10 transition-all duration-1000 delay-[2000ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                FRAME_V6_PRT
              </div>
            </div>
          </div>
        </div>

        <div className={`h-[1px] w-full bg-black/10 mt-12 md:mt-16 transition-all duration-[1500ms] delay-[1800ms] origin-left ${isVisible ? 'scale-x-100' : 'scale-x-0'}`} />
        <div className={`text-tech text-[10px] text-black/40 text-center mt-8 transition-all duration-1000 delay-[2200ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          --- {t('s3_sentence')} ---
        </div>
      </div>
      <style>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
      `}</style>
    </section>
  );
}


import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../App';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const requirements = [
    { n: '01', text: t('s7_r1') },
    { n: '02', text: t('s7_r2') },
    { n: '03', text: t('s7_r3') },
  ];

  const handleInputInteraction = () => {
    if (window.innerWidth < 768 && !showDescription) {
      setShowDescription(true);
    }
  };

  return (
    <section id="kontakt" ref={sectionRef} className="py-16 md:py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-12 md:gap-14 items-start">
          <div>
            <div className="flex items-center gap-3 text-tech text-[10px] md:text-[11px] text-mtg-muted2 mb-4">
              <span className="opacity-90" aria-hidden="true">/</span> {t('s7_kicker')}
            </div>
            <h2 className="text-h2 uppercase mb-4 md:mb-6">
              ROZPOCZNIJ<br/>WSPÓŁPRACĘ.
            </h2>
            <p className="border-l border-white/20 pl-6 font-body text-[14px] md:text-sm text-white/60 leading-[1.7] max-w-xl">
              {t('s7_copy')}
            </p>
            
            <div className="hidden lg:block mt-10 pt-6 border-t border-white/5">
              <div className="text-tech text-[10px] text-white/30 mb-4">/ REQUIREMENTS</div>
              <div className="flex flex-col gap-4 text-tech text-[11px] text-white/45">
                {requirements.map((r, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-white/20 shrink-0">{r.n}</span>
                    <span>{r.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-white/10 bg-white/[0.01] p-6 md:p-10 relative overflow-hidden">
            <form 
              className="space-y-6 md:space-y-8" 
              onSubmit={(e) => e.preventDefault()}
              aria-label="Formularz kontaktowy"
            >
              <div className="flex flex-col gap-6">
                <div className="space-y-2.5">
                  <label htmlFor="name" className="block text-tech text-[9px] md:text-[10px] text-white/50 font-bold uppercase tracking-widest">
                    {t('s7_f1')}
                  </label>
                  <input 
                    id="name" 
                    type="text" 
                    placeholder="---" 
                    onFocus={handleInputInteraction}
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-4 text-white/90 focus:outline-none focus:border-white/40 transition-all font-body text-[16px] h-[60px]"
                  />
                </div>
                <div className="space-y-2.5">
                  <label htmlFor="email" className="block text-tech text-[9px] md:text-[10px] text-white/50 font-bold uppercase tracking-widest">
                    {t('s7_f2')}
                  </label>
                  <input 
                    id="email" 
                    type="email" 
                    placeholder="SECURE@DOMAIN" 
                    onFocus={handleInputInteraction}
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-4 text-white/90 focus:outline-none focus:border-white/40 transition-all font-body text-[16px] h-[60px]"
                  />
                </div>
                
                <div className={`space-y-2.5 transition-all duration-600 overflow-hidden ${(!showDescription && window.innerWidth < 768) ? 'max-h-0 opacity-0 invisible' : 'max-h-[400px] opacity-100 visible'}`}>
                  <label htmlFor="desc" className="block text-tech text-[9px] md:text-[10px] text-white/50 font-bold uppercase tracking-widest">
                    {t('s7_f3')}
                  </label>
                  <textarea 
                    id="desc" 
                    rows={isFocused ? 6 : 4}
                    onFocus={() => setIsFocused(true)}
                    placeholder="---" 
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-4 text-white/90 focus:outline-none focus:border-white/40 transition-all placeholder:text-white/10 resize-none font-body text-[16px] min-h-[140px]"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:justify-end items-center gap-4 pt-4">
                <button 
                  type="submit"
                  className="relative w-full md:w-auto overflow-hidden inline-flex items-center justify-center gap-4 bg-mtg-gold/10 border border-mtg-gold/30 px-10 py-5 rounded-xl text-tech text-[12px] font-bold text-white group min-h-[64px] transition-all duration-300 active:scale-[0.98] hover:border-mtg-gold/60"
                >
                  <span className="w-8 h-8 border border-white/15 rounded-lg flex items-center justify-center text-white/50 group-hover:text-white transition-all">↗</span>
                  {t('s7_submit')}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:animate-[sweep_1.5s_infinite] pointer-events-none" />
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 space-y-8">
                <div id="form-note" className="text-white/40 font-body text-[13px] leading-[1.7] italic px-1">
                  {t('s7_note')}
                </div>

                <div className="lg:hidden space-y-5">
                  <div className="text-tech text-[9px] text-white/30 uppercase tracking-[0.2em]">/ REQUIREMENTS</div>
                  <div className="flex flex-col gap-4 text-tech text-[10px] text-white/40">
                    {requirements.map((r, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <span className="text-white/20 shrink-0 mt-0.5">{r.n}</span>
                        <span className="leading-relaxed">{r.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center text-tech text-[9px] text-white/10 uppercase tracking-[0.25em] px-1">
                  <span>NODE: AWAITING_TX</span>
                  <span>PROTOCOL: V6.0_SEC</span>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className={`fixed bottom-6 left-6 right-6 z-[60] md:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <button 
            onClick={() => {
              const form = document.querySelector('form');
              if (form) form.requestSubmit();
            }}
            className="relative w-full bg-mtg-gold h-[64px] rounded-xl text-tech text-[12px] font-black text-black shadow-[0_15px_30px_rgba(0,0,0,0.5)] flex items-center justify-center gap-3 active:scale-[0.96] transition-all overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-3 uppercase tracking-widest">
              {t('s7_call_cta')} <span className="opacity-60 text-lg leading-none">↗</span>
            </span>
            <span className="absolute inset-0 bg-white/20 translate-x-[-150%] group-active:translate-x-[150%] transition-transform duration-500 pointer-events-none" />
          </button>
        </div>

        <div className="h-[1px] w-full bg-white/10 mt-16" />
        <div className="text-tech text-[10px] text-white/20 text-center mt-10">
          --- {t('s7_sentence')} ---
        </div>
      </div>
      <style>{`
        @keyframes sweep {
          0% { transform: translateX(-150%) skewX(-15deg); }
          100% { transform: translateX(150%) skewX(-15deg); }
        }
      `}</style>
    </section>
  );
};

export default Contact;

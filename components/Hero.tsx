
import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../App';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollPos, setScrollPos] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePos({ x, y });
    };

    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const SplitLine = ({ text, delay }: { text: string; delay: number }) => {
    return (
      <div className="font-head text-[clamp(44px,7.2vw,96px)] font-bold leading-[0.92] tracking-tighter whitespace-nowrap overflow-visible flex flex-wrap mb-1">
        {text.split('').map((char, i) => (
          <span
            key={i}
            className="inline-block animate-[dataStream_0.4s_steps(4)_forwards] opacity-0"
            style={{ 
              animationDelay: `${delay + i * 45}ms`, 
              minWidth: char === ' ' ? '0.3em' : 'auto',
              filter: 'blur(2px)'
            }}
          >
            {char}
          </span>
        ))}
      </div>
    );
  };

  // Calculate fade out for "poufne" as it reaches about 500px scroll
  // We use a slightly more aggressive fade and translation for a parallax look
  const poufneOpacity = Math.max(0, 1 - scrollPos / 400);
  const poufneTranslate = scrollPos * 0.7;

  return (
    <section className="min-h-[calc(100vh-72px)] flex items-start pt-7 pb-24 relative overflow-hidden" ref={containerRef}>
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute -right-[5%] top-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent blur-[60px] transition-transform duration-700 ease-out"
          style={{ transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 30}px)` }}
        />
        <div 
          className="absolute left-[10%] bottom-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-white/[0.05] to-transparent blur-[40px] transition-transform duration-500 ease-out"
          style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -15}px)` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col items-start lg:pl-20">
        <div className="relative">
          {/* Vertical Intro: / poufne / */}
          <div 
            className={`absolute left-[-40px] lg:left-[-60px] top-0 flex flex-col items-center gap-1 font-mono text-[11px] tracking-[0.28em] text-mtg-gold/60 uppercase select-none pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isMounted ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
              transform: `translateY(${poufneTranslate + (isMounted ? 0 : 20)}px)`,
              opacity: isMounted ? poufneOpacity : 0,
            }}
          >
            <span className={`opacity-90 transition-all duration-700 delay-300 ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>/</span>
            {'poufne'.split('').map((c, i) => (
              <span 
                key={i} 
                className={`leading-none transition-all duration-700 ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{ transitionDelay: `${400 + i * 80}ms` }}
              >
                {c}
              </span>
            ))}
            <span className={`opacity-90 transition-all duration-700 delay-[1000ms] ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>/</span>
          </div>

          <div className="sr-only">MTG GROUP. TRANSAKCJE. GWARANCJE.</div>
          
          <div className="headline-wrapper">
            <SplitLine text="MTG GROUP" delay={100} />
            <SplitLine text="TRANSAKCJE" delay={600} />
            <SplitLine text="GWARANCJE" delay={1100} />
          </div>

          <div className="w-20 h-[1px] bg-gradient-to-r from-white/30 to-transparent mt-7 mb-5" />

          <p className="font-body text-base text-mtg-muted leading-[1.7] max-w-2xl opacity-0 animate-[fadeInUp_0.8s_1.8s_ease_forwards]">
            {t('hero_desc')}
          </p>

          <div className="mt-7 flex gap-4 opacity-0 animate-[fadeInUp_0.8s_2s_ease_forwards]">
            <a href="#kontakt" className="font-mono text-[11px] tracking-[0.22em] border border-white/20 bg-white/5 px-5 py-4 rounded-xl uppercase hover:bg-white/10 transition-all flex items-center gap-3">
              {t('hero_cta')} <span className="opacity-80">→</span>
            </a>
          </div>

          <aside className="lg:absolute lg:right-[-250px] lg:top-16 mt-10 lg:mt-0 font-mono text-[11px] tracking-[0.28em] text-mtg-muted2 flex flex-col gap-3 uppercase select-none opacity-0 animate-[fadeInUp_0.8s_2.2s_ease_forwards]">
            <div>{t('hero_m1')}</div>
            <div>{t('hero_m2')}</div>
            <div>{t('hero_m3')}</div>
          </aside>
        </div>
      </div>

      <style>{`
        @keyframes dataStream {
          0% { opacity: 0; filter: blur(8px); transform: scale(0.9); }
          50% { opacity: 0.5; filter: blur(2px); transform: scale(1.05); }
          100% { opacity: 1; filter: blur(0); transform: scale(1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .headline-wrapper {
          position: relative;
        }
      `}</style>
    </section>
  );
};

export default Hero;

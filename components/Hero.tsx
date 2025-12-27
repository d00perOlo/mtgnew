
import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../App';

const SplitLine = ({ text, delay, className = "" }: { text: string; delay: number; className?: string }) => {
  const chars = text.split('');
  
  return (
    <div className={`${className} flex justify-between items-center`}>
      {chars.map((char, i) => (
        <span
          key={i}
          className="inline-block animate-[dataStream_0.4s_cubic-bezier(0.16,1,0.3,1)_forwards] opacity-0"
          style={{ 
            animationDelay: `${delay + i * 40}ms`, 
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

const BackgroundParticles = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      <div 
        className="absolute top-[20%] left-[15%] w-[1px] h-[1px] bg-white rounded-full transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${scrollY * -0.2}px)` }}
      />
      <div 
        className="absolute top-[40%] right-[10%] w-2 h-2 border border-white/10 rounded-full transition-transform duration-150 ease-out"
        style={{ transform: `translateY(${scrollY * 0.15}px) scale(${1 + scrollY * 0.001})` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(215,178,91,0.04)_0%,transparent_60%)] animate-[pulse_12s_infinite_ease-in-out]" />
    </div>
  );
};

const Hero: React.FC = () => {
  const { t, setActiveLocation } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      if (!parallaxRef.current) return;
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      parallaxRef.current.style.transform = `translate(${x * 40}px, ${y * 30}px)`;
    };

    const handleScroll = () => {
      if (!sidebarRef.current) return;
      const scrollPos = window.scrollY;
      const opacity = Math.max(0, 1 - scrollPos / 400);
      const translate = scrollPos * 0.5;
      sidebarRef.current.style.opacity = String(opacity);
      sidebarRef.current.style.transform = `translateY(${translate}px)`;
    };

    if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Setting FINANCE as the first location in the sequence
          setActiveLocation(t('brand_finance'));
        }
      },
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [t, setActiveLocation]);

  return (
    <section ref={sectionRef} className="min-h-[calc(100vh-100px)] flex items-center pt-24 md:pt-32 pb-20 relative overflow-hidden bg-black">
      <BackgroundParticles />

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          ref={parallaxRef}
          className="gradient-orb transition-transform duration-[600ms] ease-out"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col items-start md:pl-24">
        <div className="relative w-full">
          
          <div 
            ref={sidebarRef}
            className={`md:hidden absolute left-[-32px] top-0 flex flex-col items-center gap-2 text-tech text-[10px] text-mtg-gold/40 select-none pointer-events-none transition-opacity duration-1000 ease-out ${isMounted ? 'opacity-100' : 'opacity-0'}`}
          >
            <span className="opacity-60">/</span>
            {'MTG'.split('').map((c, i) => (
              <span key={i} className="font-bold">{c}</span>
            ))}
            <span className="opacity-60">/</span>
          </div>

          <div className="headline-wrapper flex flex-col items-start w-full max-w-[320px] md:max-w-[850px]">
            <div className="mb-6 md:mb-10 opacity-0 animate-[fadeInUp_1s_0.2s_ease_forwards] w-full">
               <h1 className="font-head font-bold text-[clamp(52px,18vw,140px)] text-white tracking-tighter leading-[0.9] mb-4">
                 MTG GROUP
               </h1>
               <div className="h-[2px] w-full md:w-1/2 bg-gradient-to-r from-mtg-gold to-transparent scale-x-0 origin-left animate-[scaleIn_1.2s_1s_cubic-bezier(0.16,1,0.3,1)_forwards]" />
            </div>
            
            <div className="w-full flex flex-col gap-3 md:gap-5">
              <div className="opacity-0 animate-[fadeInUp_0.8s_1.2s_ease_forwards] w-full max-w-[280px] md:max-w-[480px]">
                <SplitLine 
                  text="TRANSAKCJA" 
                  delay={1200} 
                  className="font-head font-semibold text-[clamp(24px,8vw,52px)] md:text-[56px] tracking-[0.15em] md:tracking-[0.25em] leading-none text-white/90 uppercase" 
                />
              </div>
              
              <div className="opacity-0 animate-[fadeInUp_0.8s_1.6s_ease_forwards] w-full max-w-[280px] md:max-w-[480px]">
                <SplitLine 
                  text="GWARANCJA" 
                  delay={1600} 
                  className="font-head font-semibold text-[clamp(24px,8vw,52px)] md:text-[56px] tracking-[0.15em] md:tracking-[0.25em] leading-none text-white/90 uppercase" 
                />
              </div>
            </div>
            
            <div className="mt-16 md:mt-24 flex flex-col items-start gap-3 w-full opacity-0 animate-[fadeInUp_0.8s_2.2s_ease_forwards]">
               <div className="flex items-center gap-5">
                 <span className="font-head text-[14px] md:text-[18px] font-bold text-mtg-gold tracking-[0.45em] uppercase">
                    DORADZTWO | RESTRUKTURYZACJA
                 </span>
               </div>
               <div className="h-[1px] w-48 bg-mtg-gold/20" />
            </div>
          </div>

          <div className="w-32 md:w-48 h-[1px] bg-gradient-to-r from-white/10 to-transparent mt-20 mb-12" />

          <div className="max-w-2xl opacity-0 animate-[fadeInUp_0.8s_2.6s_ease_forwards]">
            <p className="font-body text-[18px] md:text-[19px] font-normal text-white/50 leading-[1.8] tracking-wide">
              {t('hero_desc')}
            </p>
          </div>

          <div className="mt-16 md:mt-24 flex flex-col sm:flex-row gap-8 opacity-0 animate-[fadeInUp_0.8s_3s_ease_forwards]">
            <a 
              href="#strategia" 
              className="group relative w-full sm:w-auto text-tech text-[12px] font-bold border border-white/10 bg-white/[0.02] px-12 py-6 rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] active:scale-[0.98] hover:bg-white/5 hover:border-mtg-gold/40 flex items-center justify-center gap-5 overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)]"
            >
              <span className="relative z-10 tracking-[0.15em]">EKSPLORUJ MODEL</span>
              <span className="relative z-10 opacity-30 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">→</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-mtg-gold/5 to-transparent translate-x-[-150%] group-hover:animate-[sweep_2.5s_infinite] pointer-events-none" />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dataStream {
          0% { opacity: 0; transform: translateY(10px); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes sweep {
          0% { transform: translateX(-150%) skewX(-15deg); }
          100% { transform: translateX(150%) skewX(-15deg); }
        }

        .gradient-orb {
          position: absolute;
          z-index: 0;
          pointer-events: none;
          border-radius: 9999px;
          animation: orbAppear 4s ease forwards;
        }

        @media (min-width: 768px) {
          .gradient-orb {
            right: -15%;
            top: 5%;
            width: 900px;
            height: 900px;
            filter: blur(140px);
            background: radial-gradient(circle at center, rgba(215,178,91,0.05) 0%, rgba(255,255,255,0.01) 70%, transparent 100%);
          }
        }

        @media (max-width: 767px) {
          .gradient-orb {
            right: -25%;
            top: 40%;
            width: 350px;
            height: 350px;
            filter: blur(60px);
            opacity: 0;
            background: radial-gradient(circle at center, rgba(215,178,91,0.08) 0%, transparent 100%);
          }
        }

        .headline-wrapper { min-height: 280px; }
        @media (min-width: 768px) { .headline-wrapper { min-height: 480px; } }
      `}</style>
    </section>
  );
};

export default Hero;

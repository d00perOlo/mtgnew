
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../App';

const ScramblerTitle = ({ text, isVisible, delay = 0 }: { text: string; isVisible: boolean; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = "!@#$%^&*()_+{}:<>?|1234567890";
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isVisible) {
      setDisplayText('');
      return;
    }

    let iteration = 0;
    const timeout = setTimeout(() => {
      intervalRef.current = window.setInterval(() => {
        setDisplayText(prev => 
          text.split('').map((char, index) => {
            if (index < iteration) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          }).join('')
        );

        if (iteration >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
        iteration += 1/3;
      }, 30);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isVisible, text, delay]);

  return (
    <div className="overflow-hidden">
      <div className={`text-h2 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {displayText || (isVisible ? text : '')}
      </div>
    </div>
  );
};

const About: React.FC = () => {
  const { t, setActiveLocation } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasEntered(true);
          setActiveLocation(t('city_dubai'));
        }
      },
      { 
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
      }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [t, setActiveLocation]);

  const Item = ({ kicker, text, delay }: { kicker: string; text: string; delay: number }) => (
    <div 
      className={`pt-5 md:pt-6 border-t border-white/10 group transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1) ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-tech text-[10px] md:text-[11px] text-mtg-muted2 mb-3 flex items-center gap-3">
        <span className={`w-1.5 h-1.5 bg-mtg-gold/40 rounded-[2px] transition-all duration-700 ${isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-45'}`} />
        {kicker}
      </div>
      <div className="font-body text-[14px] md:text-base font-semibold text-white/50 leading-[1.6] transition-colors duration-500 group-hover:text-white">
        {text}
      </div>
    </div>
  );

  return (
    <section id="o-nas" ref={sectionRef} className="pt-12 md:pt-16 pb-16 md:pb-24 relative lg:pl-20 overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div 
          className={`md:hidden absolute left-[-28px] top-0 flex flex-col items-center gap-2 text-tech text-[9px] text-mtg-muted2 select-none pointer-events-none transition-all duration-1000 ease-out ${
            hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <span className="opacity-70">/</span>
          {'naszewartosci'.split('').map((c, i) => <span key={i} className="leading-none">{c}</span>)}
          <span className="opacity-70">/</span>
        </div>

        <div className={`flex items-center gap-3 text-tech text-[11px] text-mtg-muted2 mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
          <span className="opacity-90">/</span> {t('s1_kicker')}
        </div>

        <div className={`h-[1px] bg-gradient-to-r from-mtg-gold/40 to-transparent mt-2 mb-10 md:mb-12 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'w-32 md:w-40' : 'w-0'}`} />

        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-16 items-start">
          <div>
            <h2 className="mb-6 md:mb-8 flex flex-col gap-1 md:gap-1.5">
              <ScramblerTitle text="JAKOŚĆ." isVisible={isVisible} delay={100} />
              <ScramblerTitle text="TRAFNOŚĆ." isVisible={isVisible} delay={300} />
              <ScramblerTitle text="DECYZJA." isVisible={isVisible} delay={500} />
            </h2>
            <div className={`font-body text-[14px] md:text-lg text-mtg-muted leading-[1.7] max-w-lg transition-all duration-[1000ms] delay-400 cubic-bezier(0.16, 1, 0.3, 1) border-l-2 border-mtg-gold/20 pl-6 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              {t('s1_copy')}
            </div>
          </div>

          <div className="flex flex-col gap-8 md:gap-8">
            <div className={`text-tech text-[10px] text-mtg-muted2 transition-all duration-1000 ease-out delay-[500ms] ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}>
              [ {t('s1_rightLabel')} ]
            </div>
            
            <div className="flex flex-col space-y-2">
              <Item kicker={t('s1_i1_h')} text={t('s1_i1_p')} delay={600} />
              <Item kicker={t('s1_i2_h')} text={t('s1_i2_p')} delay={750} />
              <Item kicker={t('s1_i3_h')} text={t('s1_i3_p')} delay={900} />
            </div>
          </div>
        </div>

        <div className={`h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent mt-16 md:mt-20 transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-left ${
          isVisible ? 'scale-x-100' : 'scale-x-0'
        }`} />
        <div className={`text-tech text-[10px] text-mtg-muted2 text-center mt-10 transition-all duration-1000 delay-[1s] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          --- {t('s1_sentence')} ---
        </div>
      </div>
    </section>
  );
};

export default About;

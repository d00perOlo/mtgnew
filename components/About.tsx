
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../App';

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
          setActiveLocation(t('city_warsaw'));
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [t, setActiveLocation]);

  const Item = ({ kicker, text, delay }: { kicker: string; text: string; delay: number }) => (
    <div 
      className={`pt-6 border-t border-white/5 group transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-[4px]'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="font-mono text-[11px] tracking-[0.28em] text-mtg-muted2 uppercase mb-3 flex items-center gap-3">
        <span className={`w-1.5 h-1.5 bg-white/20 rounded-[2px] transition-all duration-700 ${isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-45'}`} />
        {kicker}
      </div>
      <div className="font-body text-base font-semibold text-white/40 leading-[1.55] transition-colors group-hover:text-white/80">
        {text}
      </div>
    </div>
  );

  const TitleLine = ({ text, delay }: { text: string; delay: number }) => (
    <div className="overflow-hidden">
      <div 
        className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {text}
      </div>
    </div>
  );

  return (
    <section id="o-nas" ref={sectionRef} className="py-28 relative lg:pl-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Vertical Intro: / nasze wartości / */}
        <div 
          className={`absolute left-[-40px] lg:left-[-60px] top-0 flex flex-col items-center gap-1 font-mono text-[11px] tracking-[0.28em] text-mtg-muted2 uppercase select-none pointer-events-none transition-all duration-1000 ease-out ${
            hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <span className="opacity-90">/</span>
          {'naszewartosci'.split('').map((c, i) => <span key={i} className="leading-none">{c}</span>)}
          <span className="opacity-90">/</span>
        </div>

        <div className={`h-[1px] bg-gradient-to-r from-white/20 to-transparent mt-5 mb-10 transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'w-32' : 'w-0'}`} />

        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-16 items-start">
          <div>
            <h2 className="font-head text-[clamp(40px,6vw,84px)] font-bold leading-[0.94] tracking-tight uppercase mb-8">
              <TitleLine text="JAKOŚĆ." delay={100} />
              <TitleLine text="TRAFNOŚĆ." delay={250} />
              <TitleLine text="DECYZJA." delay={400} />
            </h2>
            <p className={`font-body text-mtg-muted leading-[1.7] max-w-lg transition-all duration-1000 delay-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {t('s1_copy')}
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <div className={`font-mono text-[11px] tracking-[0.28em] text-mtg-muted2 uppercase transition-all duration-1000 ease-out delay-600 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}>
              {t('s1_rightLabel')}
            </div>
            
            <div className="flex flex-col gap-0">
              <Item kicker={t('s1_i1_h')} text={t('s1_i1_p')} delay={700} />
              <Item kicker={t('s1_i2_h')} text={t('s1_i2_p')} delay={850} />
              <Item kicker={t('s1_i3_h')} text={t('s1_i3_p')} delay={1000} />
            </div>
          </div>
        </div>

        <div className={`h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent mt-16 transition-all duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-left ${
          isVisible ? 'scale-x-100' : 'scale-x-0'
        }`} />
        <div className={`font-mono text-[11px] tracking-[0.3em] text-mtg-muted2 uppercase text-center mt-6 transition-all duration-1000 delay-[1.2s] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          {t('sentence_time')}
        </div>
      </div>
    </section>
  );
};

export default About;

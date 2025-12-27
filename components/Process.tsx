
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../App';

interface StageProps {
  stage: {
    stage: string;
    h: string;
    tags: string[];
  };
  index: number;
}

const ProcessStage: React.FC<StageProps> = ({ stage, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -5% 0px' 
      }
    );

    if (stageRef.current) observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={stageRef}
      className={`relative border-b border-white/10 md:border-b-0 md:pb-12 last:border-b-0 md:last:pb-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className={`hidden md:block absolute -left-[33px] top-1.5 w-2.5 h-2.5 rounded-[2px] border border-white/20 transition-all duration-700 delay-300 ${isVisible ? 'bg-white/10 scale-100 rotate-45' : 'bg-transparent scale-0'}`} />
      
      <button
        onClick={() => { if (window.innerWidth < 768) setIsOpen(!isOpen); }}
        className="w-full text-left py-6 md:py-0 md:cursor-default flex flex-col md:block outline-none group focus-visible:ring-0"
        aria-expanded={isOpen}
      >
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col gap-1.5">
            <div className={`text-tech text-[10px] md:text-[11px] transition-colors duration-500 ${isOpen ? 'text-mtg-gold' : 'text-white/30 group-hover:text-white/50'}`}>
              {stage.stage}
            </div>
            <h3 className={`text-h3 transition-all duration-500 tracking-tight ${isOpen ? 'text-white translate-x-1' : 'text-white/80 md:text-white/90 md:group-hover:text-white'}`}>
              {stage.h}
            </h3>
          </div>
          
          <div className={`md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-white/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'rotate-180 bg-white/10 border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'bg-white/5'}`}>
            <span className="text-white/30 text-[10px]">▼</span>
          </div>
        </div>
      </button>
      
      <div 
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen 
            ? 'grid-template-rows-[1fr] opacity-100' 
            : 'grid-template-rows-[0fr] opacity-0 md:grid-template-rows-[1fr] md:opacity-100'
        }`}
      >
        <div className="overflow-hidden">
          <div className={`md:mt-6 pb-6 md:pb-0 flex flex-wrap gap-2.5 transition-all duration-700 ${isOpen ? 'translate-y-0' : 'translate-y-4 md:translate-y-0'}`}>
            {stage.tags.map((tag, j) => (
              <span 
                key={j} 
                className={`text-tech text-[9px] md:text-[10px] text-white/40 border border-white/10 bg-white/[0.02] px-4 py-3 rounded-xl transition-all duration-500 hover:border-white/40 hover:text-white/80 hover:bg-white/5 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ 
                  transitionDelay: `${isVisible ? 400 + (j * 80) : 0}ms` 
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Process: React.FC = () => {
  const { t, setActiveLocation } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          setActiveLocation(t('city_praha'));
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [t, setActiveLocation]);

  const stages = [
    { stage: 'STAGE_01', h: t('s4_s1_h'), tags: [t('s4_s1_t1'), t('s4_s1_t2'), t('s4_s1_t3')] },
    { stage: 'STAGE_02', h: t('s4_s2_h'), tags: [t('s4_s2_t1'), t('s4_s2_t2'), t('s4_s2_t3')] },
    { stage: 'STAGE_03', h: t('s4_s3_h'), tags: [t('s4_s3_t1'), t('s4_s3_t2'), t('s4_s3_t3')] },
    { stage: 'STAGE_04', h: t('s4_s4_h'), tags: [t('s4_s4_t1'), t('s4_s4_t2'), t('s4_s4_t3')] },
  ];

  return (
    <section id="process-structure" className="py-16 md:py-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-12 md:gap-20 items-start">
          <div className="md:sticky md:top-32">
            <div className={`flex items-center gap-3 text-tech text-[11px] text-mtg-muted2 mb-6 transition-all duration-1000 ${sectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
              <span className="opacity-90">/</span> {t('s4_kicker')}
            </div>
            <h2 className={`text-h2 transition-all duration-1000 delay-100 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {t('s4_title')}
            </h2>
            <p className={`mt-6 font-body text-[15px] md:text-lg text-white/50 leading-[1.8] max-w-lg transition-all duration-1000 delay-200 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              {t('s4_copy')}
            </p>
            <div className="mt-10 mb-6 md:mb-0">
              <a 
                href="#" 
                className={`inline-flex items-center justify-center gap-4 px-8 py-5 border border-white/10 bg-white/5 rounded-2xl text-tech text-[11px] font-bold text-white/80 hover:bg-white/10 hover:border-mtg-gold/40 hover:text-white transition-all duration-700 delay-300 ${
                  sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <span className="text-mtg-gold">▢</span> {t('s4_pdf')} <span className="opacity-40">↗</span>
              </a>
            </div>
          </div>

          <div className={`relative md:pl-10 md:border-l md:border-white/10 transition-all duration-1000 delay-500 ${sectionVisible ? 'opacity-100' : 'opacity-0'}`}>
            {stages.map((stage, i) => (
              <ProcessStage key={i} stage={stage} index={i} />
            ))}
          </div>
        </div>
        
        <div className={`h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent mt-20 transition-all duration-1000 ease-out origin-left ${sectionVisible ? 'scale-x-100' : 'scale-x-0'}`} />
        <div className={`text-tech text-[10px] text-white/20 text-center mt-10 transition-opacity duration-1000 delay-1000 ${sectionVisible ? 'opacity-100' : 'opacity-0'}`}>
          --- {t('s4_sentence')} ---
        </div>
      </div>
    </section>
  );
};

export default Process;

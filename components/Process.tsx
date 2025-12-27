
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
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, we can stop observing to preserve performance
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px' 
      }
    );

    if (stageRef.current) observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={stageRef}
      className={`relative pb-12 last:pb-0 group transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Visual Connector Dot */}
      <div className={`absolute -left-[33px] top-1.5 w-2 h-2 rounded-[2px] transition-all duration-700 delay-300 ${isVisible ? 'bg-white/40 scale-100' : 'bg-transparent scale-0'} group-hover:bg-mtg-gold`} />
      
      <div className="font-mono text-[11px] tracking-[0.28em] text-white/35 mb-2.5 uppercase">
        {stage.stage}
      </div>
      
      <h3 className="font-head text-3xl font-bold text-white/80 uppercase leading-none mb-5 group-hover:text-white transition-colors duration-300">
        {stage.h}
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {stage.tags.map((tag, j) => (
          <span 
            key={j} 
            className={`font-mono text-[10px] tracking-[0.22em] text-white/40 border border-white/10 bg-white/[0.01] px-3 py-2.5 rounded-xl uppercase transition-all duration-700 hover:border-white/30 hover:text-white/70 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ 
              transitionDelay: `${isVisible ? 400 + (j * 100) : 0}ms` 
            }}
          >
            {tag}
          </span>
        ))}
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
          setActiveLocation(t('city_berlin'));
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
    <section id="how" className="py-28 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={sectionRef} className="grid md:grid-cols-[1.05fr_1fr] gap-14 items-start">
          <div className="sticky top-28">
            <div className={`flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-mtg-muted2 uppercase mb-4 transition-all duration-1000 ${sectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
              <span className="opacity-90">/</span> {t('s4_kicker')}
            </div>
            <h2 className={`font-head text-[clamp(40px,6vw,86px)] font-bold leading-[0.98] uppercase tracking-tight transition-all duration-1000 delay-100 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {t('s4_title')}
            </h2>
            <p className={`mt-5 font-body text-white/70 leading-[1.7] max-w-lg transition-all duration-1000 delay-200 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              {t('s4_copy')}
            </p>
            <a 
              href="#" 
              className={`mt-10 inline-flex items-center gap-3 px-5 py-4 border border-white/10 bg-white/5 rounded-xl font-mono text-[11px] tracking-[0.22em] text-white/80 uppercase hover:bg-white/10 hover:border-white/20 transition-all duration-1000 delay-300 ${
                sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <span className="opacity-90">▢</span> {t('s4_pdf')} <span className="opacity-80">↗</span>
            </a>
          </div>

          <div className={`relative pl-7 border-l border-white/10 transition-all duration-1000 delay-500 ${sectionVisible ? 'opacity-100' : 'opacity-0'}`}>
            {stages.map((stage, i) => (
              <ProcessStage key={i} stage={stage} index={i} />
            ))}
          </div>
        </div>
        <div className={`h-[1px] w-full bg-white/10 mt-14 transition-all duration-1000 ease-out ${sectionVisible ? 'scale-x-100' : 'scale-x-0'}`} />
      </div>
    </section>
  );
};

export default Process;

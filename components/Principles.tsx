
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../App';

const Principles: React.FC = () => {
  const { t, setActiveLocation } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setActiveLocation(t('city_praha'));
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [t, setActiveLocation]);

  const items = [
    { h: t('s3_i1_h'), p: t('s3_i1_p') },
    { h: t('s3_i2_h'), p: t('s3_i2_p') },
    { h: t('s3_i3_h'), p: t('s3_i3_p') },
    { h: t('s3_i4_h'), p: t('s3_i4_p') },
  ];

  return (
    <section id="how" ref={sectionRef} className="py-28 bg-white text-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[0.95fr_1.55fr] gap-14">
          <h2 className={`font-head text-[clamp(44px,6.6vw,84px)] font-bold leading-[0.95] tracking-tight uppercase transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            WSPÓŁPRACA.<br/>
            KONSEKWENCJA.<br/>
            ZASADY.
          </h2>

          <div>
            <div className={`flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-black/45 uppercase mb-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <span className="opacity-90">/</span> {t('s3_kicker')}
            </div>
            <p className={`font-body text-black/70 leading-[1.6] max-w-xl transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              {t('s3_copy')}
            </p>

            <div className="mt-7 grid md:grid-cols-[1.05fr_0.95fr] gap-9">
              <div className="flex flex-col border-t border-black/10">
                {items.map((item, i) => (
                  <div key={i} className={`flex gap-4 py-6 border-b border-black/10 transition-all duration-700`} style={{ transitionDelay: `${400 + i * 100}ms` }}>
                    <div className="w-3.5 h-3.5 border border-black/20 bg-black/[0.02] rounded-[4px] mt-1 shrink-0" />
                    <div>
                      <div className="font-mono text-[13px] tracking-[0.2em] font-semibold text-black/90 uppercase">{item.h}</div>
                      <div className="mt-2.5 font-body text-sm text-black/55 leading-[1.7] max-w-sm">{item.p}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={`relative w-full h-[520px] border border-black/10 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:120px_120px] transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <div className="absolute inset-14 rounded-full border border-black/10 bg-radial-gradient from-black/5 to-transparent opacity-50" />
                <div className="absolute inset-[80px] rounded-full border border-dashed border-black/15" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[1px] bg-black/5" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[120%] w-[1px] bg-black/5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Principles;

import React from 'react';
import { useLanguage } from '../App';

const Team: React.FC = () => {
  const { t } = useLanguage();

  const members = [
    { code: 'MP-001', icon: '◎', pl: t('s6_r1_pl'), en: t('s6_r1_en') },
    { code: 'HT-004', icon: '⚡', pl: t('s6_r2_pl'), en: t('s6_r2_en') },
    { code: 'LL-002', icon: '⚙', pl: t('s6_r3_pl'), en: t('s6_r3_en') },
    { code: 'CS-009', icon: '⛨', pl: t('s6_r4_pl'), en: '' },
  ];

  return (
    <section className="py-28 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-mtg-muted2 uppercase mb-4">
          <span className="opacity-90">/</span> {t('s6_kicker')}
        </div>
        <h2 className="font-head text-[clamp(44px,6.6vw,86px)] font-bold leading-[0.95] tracking-tight uppercase">
          {t('s6_title')}
        </h2>
        <p className="mt-4 border-l border-white/20 pl-5 font-body text-sm text-white/60 leading-[1.75] max-w-3xl">
          {t('s6_copy')}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 border border-white/10 bg-white/[0.01] mt-9 overflow-hidden">
          {members.map((m, i) => (
            <article 
              key={i} 
              className="relative h-[340px] p-6 border-r border-b lg:border-b-0 border-white/10 group hover:bg-white/[0.04] hover:scale-[1.02] hover:z-10 hover:border-white/30 transition-all duration-500 cursor-default overflow-hidden bg-black"
            >
              {/* Inner glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10 flex justify-between items-center font-mono text-[11px] tracking-[0.28em] text-white/30 uppercase">
                <span>{m.code}</span>
                <span className="w-8 h-8 rounded-xl border border-white/10 flex items-center justify-center bg-white/[0.01] group-hover:border-white/30 group-hover:text-mtg-gold group-hover:bg-white/5 transition-all duration-300">
                  {m.icon}
                </span>
              </div>
              
              <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col gap-1.5 transition-transform duration-500 group-hover:-translate-y-2">
                <div className="font-head text-lg font-bold text-white/60 group-hover:text-white uppercase leading-tight tracking-wide transition-colors">
                  {m.pl}
                </div>
                {m.en && (
                  <div className="font-mono text-sm font-medium text-white/30 uppercase tracking-wider group-hover:text-white/50 transition-colors">
                    {m.en}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
        <div className="h-[1px] w-full bg-white/10 mt-14" />
      </div>
    </section>
  );
};

export default Team;


import React from 'react';
import { useLanguage } from '../App';

const Contact: React.FC = () => {
  const { t } = useLanguage();

  const requirements = [
    { n: '01', text: t('s7_r1') },
    { n: '02', text: t('s7_r2') },
    { n: '03', text: t('s7_r3') },
  ];

  return (
    <section id="kontakt" className="py-28 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_1.25fr] gap-12 items-start">
          <div>
            <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-mtg-muted2 uppercase mb-4">
              <span className="opacity-90">/</span> {t('s7_kicker')}
            </div>
            <h2 className="font-head text-[clamp(44px,7.2vw,96px)] font-bold leading-[0.95] tracking-tight uppercase">
              ROZPOCZNIJ<br/>WSPÓŁPRACĘ.
            </h2>
            <p className="mt-5 border-l border-white/20 pl-5 font-body text-sm text-white/60 leading-[1.75] max-w-xl">
              {t('s7_copy')}
            </p>
            <div className="mt-7 border border-white/10 bg-white/5 p-5 max-w-xl text-white/60 font-body text-[13px] leading-[1.7] italic">
              {t('s7_note')}
            </div>

            <div className="mt-9 pt-5">
              <div className="font-mono text-[11px] tracking-[0.3em] text-white/40 uppercase mb-4">/ REQUIREMENTS</div>
              <div className="flex flex-col gap-3 font-mono text-xs tracking-wider leading-relaxed text-white/45 uppercase">
                {requirements.map((r, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-white/20 shrink-0">{r.n}</span>
                    <span>{r.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-white/10 bg-white/[0.01] p-7 md:p-9 relative overflow-hidden">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2.5">
                  <label htmlFor="name" className="block font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">
                    {t('s7_f1')}
                  </label>
                  <input 
                    id="name" 
                    type="text" 
                    placeholder="---" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white/80 focus:outline-none focus:border-white/20 transition-all placeholder:text-white/20"
                  />
                </div>
                <div className="space-y-2.5">
                  <label htmlFor="email" className="block font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">
                    {t('s7_f2')}
                  </label>
                  <input 
                    id="email" 
                    type="email" 
                    placeholder="SECURE@DOMAIN" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white/80 focus:outline-none focus:border-white/20 transition-all placeholder:text-white/20"
                  />
                </div>
              </div>
              <div className="space-y-2.5">
                <label htmlFor="desc" className="block font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">
                  {t('s7_f3')}
                </label>
                <textarea 
                  id="desc" 
                  rows={6}
                  placeholder="---" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white/80 focus:outline-none focus:border-white/20 transition-all placeholder:text-white/20 resize-none"
                />
              </div>

              <div className="flex justify-end items-center gap-3">
                <button 
                  type="submit"
                  className="relative overflow-hidden inline-flex items-center gap-4 bg-white/5 border border-white/20 px-5 py-4 rounded-xl font-mono text-[11px] tracking-[0.3em] text-white/70 uppercase group"
                >
                  <span className="w-7 h-7 border border-white/15 rounded-lg flex items-center justify-center text-white/50 group-hover:text-white transition-colors">↗</span>
                  {t('s7_submit')}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" />
                </button>
              </div>
              <div className="text-right font-mono text-[10px] tracking-[0.28em] text-white/15 uppercase">
                NODE: AWAITING_TX
              </div>
            </form>
          </div>
        </div>
        <div className="h-[1px] w-full bg-white/10 mt-14" />
      </div>
    </section>
  );
};

export default Contact;

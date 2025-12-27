
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-14 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-9 items-start">
          <div className="space-y-4">
            <div className="font-mono text-[10px] tracking-[0.3em] text-white/25 uppercase">OPERATIONAL_NODES</div>
            <div className="font-mono text-xs tracking-wider text-white/70">SYS_NODE_099</div>
            <div className="font-mono text-xs tracking-wider text-white/70">AUTH_MODE_AES</div>
          </div>

          <div className="space-y-4">
            <div className="font-mono text-[10px] tracking-[0.3em] text-white/25 uppercase">IMPRINT_DATA</div>
            <div className="font-mono text-xs tracking-wider text-white/70 uppercase">MTG_GRP_OPS_LTD</div>
            <div className="font-mono text-xs tracking-wider text-white/70 uppercase">REG_ID: 0X9928F1</div>
          </div>

          <div className="space-y-4">
            <div className="font-mono text-[10px] tracking-[0.3em] text-white/25 uppercase">LEGAL_PROTOCOLS</div>
            <a href="#" className="block font-mono text-xs tracking-wider text-white/50 hover:text-white/90 border-b border-white/10 w-fit pb-1 transition-colors">Privacy_Policy</a>
            <a href="#" className="block font-mono text-xs tracking-wider text-white/50 hover:text-white/90 border-b border-white/10 w-fit pb-1 transition-colors">GDPR_Data</a>
          </div>

          <div className="flex justify-end gap-3.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)] mt-2 shrink-0" />
            <div className="font-mono text-[11px] tracking-[0.26em] text-emerald-500/70 leading-relaxed uppercase">
              DESIGN_VERSION_6.0
              <span className="block text-white/20 mt-1.5 uppercase tracking-widest">OLO_WEBMASTER</span>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-5 border-t border-white/10 flex justify-between gap-5 flex-wrap font-mono text-[10px] tracking-[0.26em] text-white/20 uppercase">
          <span>© 2025 | ALL_SYSTEMS_OPERATIONAL</span>
          <span>GR-882_AUTH</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';

// Technical router-bit and toolpath vector glyphs
export const RouterBitGlyph = ({ className = "w-5 h-5 text-walnut" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    stroke="currentColor" 
    strokeWidth="1.5"
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {/* Shank */}
    <line x1="12" y1="2" x2="12" y2="8" />
    <line x1="9" y1="8" x2="15" y2="8" />
    {/* Cutting flutes */}
    <path d="M9 8v6c0 1.5 1.5 3 3 4 1.5-1 3-2.5 3-4V8" />
    <path d="M12 18v4" />
    <circle cx="12" cy="22" r="1" fill="currentColor" />
  </svg>
);

export const ToolpathLine = ({ className = "w-full h-8" }) => (
  <svg 
    viewBox="0 0 400 30" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    preserveAspectRatio="none"
  >
    <path 
      d="M0 15 H120 L130 5 H170 L180 15 H280 L290 25 H330 L340 15 H400" 
      stroke="#DAD5CC" 
      strokeWidth="1" 
      strokeDasharray="3 3" 
    />
    <circle cx="125" cy="10" r="2" fill="#8A5A34" />
    <circle cx="335" cy="20" r="2" fill="#8A5A34" />
  </svg>
);

export const CutSheetDiagram = () => (
  <div className="relative border border-hairline bg-paper p-6 overflow-hidden cut-grid">
    {/* Corner datum registration marks */}
    <div className="absolute top-2 left-2 font-mono text-[9px] text-warm-gray">+ [0, 0]</div>
    <div className="absolute top-2 right-2 font-mono text-[9px] text-warm-gray">[2440, 0] +</div>
    <div className="absolute bottom-2 left-2 font-mono text-[9px] text-warm-gray">+ [0, 1220]</div>
    <div className="absolute bottom-2 right-2 font-mono text-[9px] text-warm-gray">[2440, 1220] +</div>

    {/* Cutline wireframes simulating CNC nests */}
    <div className="border border-charcoal/40 p-4 mb-3 bg-ivory/80 flex justify-between items-center relative">
      <span className="font-mono text-xs text-charcoal font-medium">PANEL_A1 // FLUTED VENEER</span>
      <span className="font-mono text-[10px] text-walnut px-2 py-0.5 border border-walnut/40 bg-paper">TOOLPATH: 3.175mm</span>
    </div>

    <div className="grid grid-cols-2 gap-3 mb-3">
      <div className="border border-dashed border-hairline p-3 bg-paper flex flex-col justify-between h-24">
        <span className="font-mono text-[10px] text-warm-gray">CUT_SEC_B2</span>
        <span className="font-mono text-[11px] text-charcoal">FINGER JOINT CASING</span>
        <span className="font-mono text-[9px] text-warm-gray">FEED: 1800mm/min</span>
      </div>
      <div className="border border-hairline p-3 bg-ash/40 flex flex-col justify-between h-24 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-8 border-l border-hairline flex flex-col justify-around py-1 text-center">
          <div className="w-1 h-1 bg-walnut mx-auto rounded-full"></div>
          <div className="w-1 h-1 bg-walnut mx-auto rounded-full"></div>
          <div className="w-1 h-1 bg-walnut mx-auto rounded-full"></div>
        </div>
        <span className="font-mono text-[10px] text-warm-gray">SCREEN_C1</span>
        <span className="font-mono text-[11px] text-charcoal">PERFORATED LATTICE</span>
        <span className="font-mono text-[9px] text-walnut">TOLERANCE ±0.15mm</span>
      </div>
    </div>

    {/* Ledger status strip */}
    <div className="flex items-center justify-between pt-3 border-t border-hairline font-mono text-[10px] text-warm-gray">
      <span>SUBSTRATE: 18MM CALIBRATED MDF</span>
      <span className="text-walnut font-medium">PASS: 01/02 COMPLETE</span>
    </div>
  </div>
);

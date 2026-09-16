import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, FileText } from 'lucide-react';
import { CutSheetDiagram, RouterBitGlyph } from './LineworkVector';
import MaterialSwatch from './MaterialSwatch';

const CutSheetHero = () => {
  return (
    <section className="relative pt-8 pb-16 lg:py-20 bg-paper overflow-hidden border-b border-hairline">
      {/* Subtle background technical grid marks */}
      <div className="absolute inset-0 cut-grid pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT / TOP: Typography & Action */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Category Eyebrow & Brand Tag */}
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-warm-gray tracking-wider uppercase">
                <span className="w-2 h-2 bg-walnut rounded-none"></span>
                <span>INTERIOR DECORATOR — CUSTOM WOOD & CNC DESIGN</span>
              </div>
              <div className="font-mono text-sm text-charcoal font-medium tracking-tight">
                Wood CNC Design Shop - RealCNC
              </div>
            </div>

            {/* Original Technical Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold text-charcoal leading-[1.12] tracking-tight">
              Cut With Precision.<br />
              Finished With Purpose.
            </h1>

            {/* Controlled description without unsupported business claims */}
            <p className="text-base sm:text-lg text-warm-gray max-w-xl leading-relaxed">
              Workshop-driven interior decorative elements, CNC-routed acoustic screening, 
              and tailored timber features. Designed with calibrated tolerances and finished for 
              considered architectural spaces in Lahore.
            </p>

            {/* Two Distinct CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center px-6 py-3.5 border border-hairline bg-paper text-charcoal hover:bg-ash/40 hover:border-charcoal font-mono text-xs tracking-wider uppercase transition-all duration-200"
              >
                <span>View Portfolio</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-walnut hover:bg-walnut-hover text-paper font-mono text-xs tracking-wider uppercase transition-all duration-200 shadow-sm"
              >
                <span>Contact Us</span>
                <Phone className="w-3.5 h-3.5 ml-2" />
              </Link>
            </div>

            {/* Verified Shop Ledger Coordinates */}
            <div className="pt-4 border-t border-hairline grid grid-cols-2 gap-4 font-mono text-[11px] text-warm-gray">
              <div>
                <span className="block text-[10px] text-charcoal uppercase font-semibold">LOCATION</span>
                <span>Ichhra Lahore, 54000, PK</span>
              </div>
              <div>
                <span className="block text-[10px] text-charcoal uppercase font-semibold">DIRECT LINE</span>
                <a href="tel:+923026776926" className="text-walnut hover:underline">+92 302 6776926</a>
              </div>
            </div>
          </div>

          {/* RIGHT / VISUAL: Technical Cut-Sheet Composition Panel */}
          <div className="lg:col-span-6">
            <div className="relative border border-hairline bg-ivory p-4 sm:p-6 shadow-sm">
              
              {/* Header of Cut-Sheet */}
              <div className="flex items-center justify-between border-b border-hairline pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <RouterBitGlyph className="w-4 h-4 text-walnut" />
                  <span className="font-mono text-xs font-semibold text-charcoal">
                    CUT-SHEET // REF: PANEL 01
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-[10px] font-mono text-warm-gray">
                  <span className="border border-hairline px-2 py-0.5 bg-paper">DESIGN</span>
                  <span>→</span>
                  <span className="border border-hairline px-2 py-0.5 bg-paper">CUT</span>
                  <span>→</span>
                  <span className="border border-hairline px-2 py-0.5 bg-paper text-walnut">FINISH</span>
                </div>
              </div>

              {/* Vector Cut Layout Diagram */}
              <CutSheetDiagram />

              {/* Material Swatch Strip */}
              <div className="mt-5 pt-4 border-t border-hairline">
                <MaterialSwatch compact={true} />
              </div>

              {/* Technical Caption */}
              <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-warm-gray border-t border-hairline/80 pt-2">
                <span>CANVAS SPEC: 2440 × 1220mm</span>
                <span className="text-walnut">CALIBRATION CHECK: VERIFIED</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CutSheetHero;

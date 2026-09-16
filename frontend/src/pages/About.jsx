import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, ArrowRight, ShieldCheck, Layers, Cpu, CheckCircle2 } from 'lucide-react';
import SEO from '../components/common/SEO';
import { RouterBitGlyph } from '../components/cutsheet/LineworkVector';
import MaterialSwatch from '../components/cutsheet/MaterialSwatch';

const About = () => {
  return (
    <>
      <SEO 
        title="About" 
        description="About Wood CNC Design Shop - RealCNC. Interior Decorator specializing in custom wood and CNC design located in Ichhra Lahore, Pakistan." 
      />

      {/* Header section with Cut-Sheet Ledger styling */}
      <section className="bg-ivory border-b border-hairline py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-xs font-mono text-warm-gray tracking-wider uppercase mb-2">
            <span className="w-2 h-2 bg-walnut"></span>
            <span>PROFILE // WORKSHOP LEDGER</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
            About Wood CNC Design Shop - RealCNC
          </h1>
          <p className="mt-4 text-base sm:text-lg text-warm-gray max-w-3xl leading-relaxed">
            Operating as an Interior Decorator with focused expertise in custom wood design 
            and computer-numerical-control (CNC) routing, serving residential and commercial 
            interior environments in Lahore.
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-16 sm:py-20 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* SECTION 1: Interior Decorator / Custom Wood & CNC Design */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 border-l-2 border-walnut pl-4">
              <span className="font-mono text-xs text-warm-gray uppercase tracking-widest block">
                SECTION 01
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-charcoal mt-1">
                Interior Decorator / Custom Wood & CNC Design
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-4 text-sm sm:text-base text-warm-gray leading-relaxed">
              <p>
                <strong className="text-charcoal font-semibold">Wood CNC Design Shop - RealCNC</strong> integrates 
                decorative spatial design with direct machine-shop wood fabrication. Rather than relying solely on 
                mass-manufactured components, our studio focuses on tailored wooden profiles, precision architectural 
                joinery, and digitally routed panels.
              </p>
              <p>
                As an interior decorator, our work encompasses custom wall accents, fluted surfaces, decorative privacy 
                screens, and purpose-built cabinetry designed to complement architectural proportions and lighting conditions.
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-hairline" />

          {/* SECTION 2: Design & Material Approach */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 border-l-2 border-walnut pl-4">
              <span className="font-mono text-xs text-warm-gray uppercase tracking-widest block">
                SECTION 02
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-charcoal mt-1">
                Design & Material Approach
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-6">
              <p className="text-sm sm:text-base text-warm-gray leading-relaxed">
                Wood is an organic substrate with natural grain variations, structural movement, and surface tension. 
                Our approach pairs proper substrate selection with specific toolpaths to prevent tear-out, maintain 
                structural integrity, and accentuate the natural timber figure.
              </p>

              {/* Substrates Swatch Display */}
              <div className="border border-hairline p-6 bg-ivory/50">
                <MaterialSwatch />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="border border-hairline p-4 bg-paper">
                  <span className="font-mono text-xs text-walnut uppercase block mb-1">CALIBRATED BOARDS</span>
                  <p className="text-xs text-warm-gray">
                    High-density MDF, moisture-resistant substrates, and stable core panels optimized for precise 2D & 3D relief routing.
                  </p>
                </div>
                <div className="border border-hairline p-4 bg-paper">
                  <span className="font-mono text-xs text-walnut uppercase block mb-1">SOLID TIMBERS & VENEERS</span>
                  <p className="text-xs text-warm-gray">
                    Natural hardwoods including Walnut, Oak, and Ash carefully calibrated for grain continuity across adjoining panels.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-hairline" />

          {/* SECTION 3: Precision & Finishing */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 border-l-2 border-walnut pl-4">
              <span className="font-mono text-xs text-warm-gray uppercase tracking-widest block">
                SECTION 03
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-charcoal mt-1">
                Precision & Finishing
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-4 text-sm sm:text-base text-warm-gray leading-relaxed">
              <p>
                Computer-controlled router tables deliver consistent step-over resolutions and clean contouring. 
                However, machine cutting is only the preliminary phase. Every cut component undergoes hand-finishing, 
                edge calibration, surface de-fuzzing, and meticulous sanding before any coat of oil, lacquer, or wax is applied.
              </p>
              
              <div className="border border-hairline bg-ivory p-5 font-mono text-xs space-y-2 text-charcoal">
                <div className="flex items-center space-x-2 text-walnut font-medium">
                  <RouterBitGlyph className="w-4 h-4" />
                  <span>WORKSHOP STANDARDS SUMMARY</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px]">
                  <div>
                    <span className="text-warm-gray block">AXIS TOLERANCE:</span>
                    <span className="font-semibold">±0.15mm Digital Register</span>
                  </div>
                  <div>
                    <span className="text-warm-gray block">BIT CALIBRATION:</span>
                    <span className="font-semibold">Solid Carbide Spiral & Ball</span>
                  </div>
                  <div>
                    <span className="text-warm-gray block">SURFACE SEALING:</span>
                    <span className="font-semibold">Low-Sheen Protective Curing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-hairline" />

          {/* SECTION 4: Verified Location */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 border-l-2 border-walnut pl-4">
              <span className="font-mono text-xs text-warm-gray uppercase tracking-widest block">
                SECTION 04
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-charcoal mt-1">
                Workshop Location
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-4">
              <p className="text-sm sm:text-base text-warm-gray leading-relaxed">
                Wood CNC Design Shop - RealCNC is physically located in the established commercial 
                and crafting precinct of Ichhra, Lahore.
              </p>

              <div className="bg-ivory border border-hairline p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 font-mono text-xs text-charcoal font-semibold">
                    <MapPin className="w-4 h-4 text-walnut" />
                    <span>468 Sultan Ahmed Rd, Ichhra Lahore, 54000, Pakistan</span>
                  </div>
                  <div className="flex items-center space-x-2 font-mono text-xs text-warm-gray pl-6">
                    <Phone className="w-3.5 h-3.5 text-walnut" />
                    <a href="tel:+923026776926" className="hover:text-walnut">+92 302 6776926</a>
                  </div>
                </div>

                <div className="shrink-0 flex items-center space-x-3">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=468+Sultan+Ahmed+Rd,+Ichhra+Lahore,+54000,+Pakistan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-charcoal text-xs font-mono tracking-wider uppercase text-charcoal hover:bg-charcoal hover:text-paper transition-colors"
                  >
                    Google Maps
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-4 py-2 bg-walnut text-xs font-mono tracking-wider uppercase text-paper hover:bg-walnut-hover transition-colors"
                  >
                    Contact Shop
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default About;

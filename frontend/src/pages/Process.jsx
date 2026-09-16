import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, ArrowRight, Phone, CheckCircle, FileSpreadsheet, Scissors, Layers, Wrench, Shield } from 'lucide-react';
import SEO from '../components/common/SEO';
import { RouterBitGlyph } from '../components/cutsheet/LineworkVector';
import MaterialSwatch from '../components/cutsheet/MaterialSwatch';

const workflowStages = [
  {
    step: '01',
    title: 'Consultation',
    headline: 'Space Evaluation, Dimensional Intent & Material Review',
    summary: 'Initial dialogue aligning spatial constraints, decorative intent, and client expectations.',
    details: [
      'Site dimension verification or architectural plan intake.',
      'Review of spatial aesthetics: wall cladding, partitions, screening, or tailored casework.',
      'Initial discussion of timber species, veneer finishes, and budget-compatible board substrates.',
      'Identification of structural anchoring points and services clearance.'
    ],
    technicalSpec: 'INTAKE FORMATS: DWG, DXF, PDF, Hand Sketches with Calibrated Dimensions'
  },
  {
    step: '02',
    title: 'Design & Layout',
    headline: 'CAD Vector Geometry, Cut-Sheets & Joint Detailing',
    summary: 'Translating design visions into precision digital vector paths ready for CNC routing.',
    details: [
      '2D/3D CAD drafting of panels, screen patterns, or cabinetry frameworks.',
      'Toolpath strategy optimization: determining inside vs. outside cuts, pocketing depth, and ballnose relief passes.',
      'Sheet nesting calculation to minimize kerf loss and maximize timber yield.',
      'Joint tolerance specification (mortise, tenon, rebate, or finger joint register).'
    ],
    technicalSpec: 'CAM PARAMETERS: Lead-in ramps, step-over percentages (15-20%), feed/speed calculation'
  },
  {
    step: '03',
    title: 'Material Selection',
    headline: 'Grain Orientation, Substrate Density & Core Stability',
    summary: 'Procuring and preparing calibrated hardwoods and engineered boards for machining.',
    details: [
      'Selection of solid hardwoods (Walnut, White Oak, Ash) or calibrated high-density boards (MDF, Valchromat).',
      'Inspection for warp, twist, moisture equilibrium, and grain orientation consistency.',
      'Surface pre-planing and thickness calibration to guarantee uniform routing depths.',
      'Veneer matching (book-matched, slip-matched) where architectural paneling is specified.'
    ],
    technicalSpec: 'SUBSTRATE STANDARDS: Grade-A Calibrated Moisture-Resistant Boards & Seasoned Hardwoods'
  },
  {
    step: '04',
    title: 'CNC Cutting & Fabrication',
    headline: 'Computer-Controlled Routing, Pocketing & Contour Profiling',
    summary: 'Precision machining on the CNC flatbed table followed by hand-bench craftsmanship.',
    details: [
      'Vacuum-bed hold-down and mechanical fixture stabilization on the CNC router table.',
      'Execution of multi-tool operations using solid carbide spiral and profile bits.',
      'Fine step-over finishing passes to eliminate machine tooling chatter lines.',
      'Bench detailing: manual edge beveling, deburring, dry assembly testing, and meticulous multi-grit sanding.'
    ],
    technicalSpec: 'MACHINE TOLERANCE: ±0.15mm Digital Axis Register • Multi-Flute Solid Carbide Tooling'
  },
  {
    step: '05',
    title: 'Installation & Handover',
    headline: 'On-Site Fitting, Alignment Verification & Protective Finishing',
    summary: 'Clean structural installation in the client space with durable protective finishing.',
    details: [
      'Transport with protective edge guards to prevent corner impact.',
      'Concealed French cleat or precision fastener mounting on prepared walls and structures.',
      'Hairline expansion reveal alignment between adjacent modular panels.',
      'Application of low-sheen protective sealers, natural hardwax oils, or polyurethane coats.'
    ],
    technicalSpec: 'FINAL AUDIT: Laser level alignment verification, surface touch-up & maintenance guidance'
  }
];

const Process = () => {
  const [expandedStages, setExpandedStages] = useState({
    '01': true,
    '02': true,
    '03': false,
    '04': false,
    '05': false
  });

  const toggleStage = (step) => {
    setExpandedStages(prev => ({
      ...prev,
      [step]: !prev[step]
    }));
  };

  return (
    <>
      <SEO 
        title="Process" 
        description="General design and fabrication process of Wood CNC Design Shop - RealCNC in Lahore. From initial consultation and CAD cut-sheets to CNC routing and on-site finishing." 
      />

      {/* Header Banner */}
      <section className="bg-ivory border-b border-hairline py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-xs font-mono text-warm-gray tracking-wider uppercase mb-2">
            <span className="w-2 h-2 bg-walnut"></span>
            <span>METHODOLOGY // GENERAL WORKFLOW</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
            Design & Fabrication Process
          </h1>
          <p className="mt-4 text-base sm:text-lg text-warm-gray max-w-3xl leading-relaxed">
            Framed as a general workflow framework: a systematic 5-stage methodology bridging 
            creative interior decoration with computer-aided machine routing.
          </p>
        </div>
      </section>

      {/* Vertical Expandable Timeline */}
      <section className="py-16 sm:py-24 bg-paper relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="font-mono text-xs text-warm-gray uppercase tracking-widest block">
              FABRICATION CADENCE
            </span>
            <p className="text-sm text-warm-gray">
              Each stage below outlines standard procedures in our workshop approach. Click any stage to inspect specific technical tasks.
            </p>
          </div>

          {/* Timeline Wrapper with fine central/left cut-line guide */}
          <div className="relative border-l-2 border-hairline ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
            
            {workflowStages.map((stage) => {
              const isOpen = !!expandedStages[stage.step];
              return (
                <div key={stage.step} className="relative group">
                  
                  {/* Timeline Node on the guide line */}
                  <div className="absolute -left-[35px] sm:-left-[51px] top-6 w-8 h-8 rounded-none bg-paper border-2 border-walnut flex items-center justify-center font-mono text-xs font-bold text-charcoal shadow-sm">
                    {stage.step}
                  </div>

                  {/* Stage Card */}
                  <div className="border border-hairline bg-paper hover:border-charcoal/40 transition-colors">
                    
                    {/* Header bar / Toggle */}
                    <button
                      onClick={() => toggleStage(stage.step)}
                      className="w-full text-left p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 focus:outline-none bg-paper hover:bg-ivory/40 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs text-walnut uppercase tracking-widest">
                            STAGE {stage.step}
                          </span>
                          <span className="text-warm-gray text-xs">•</span>
                          <span className="font-mono text-xs text-warm-gray uppercase">
                            {stage.title}
                          </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-charcoal">
                          {stage.headline}
                        </h2>
                        <p className="text-xs sm:text-sm text-warm-gray pt-1">
                          {stage.summary}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center space-x-2 text-xs font-mono text-warm-gray">
                        <span className="hidden sm:inline uppercase">
                          {isOpen ? 'LESS' : 'DETAILS'}
                        </span>
                        <span className="p-1.5 border border-hairline bg-paper text-charcoal group-hover:text-walnut">
                          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </span>
                      </div>
                    </button>

                    {/* Expandable Content */}
                    {isOpen && (
                      <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-hairline bg-ivory/20 animate-in fade-in duration-200 space-y-6">
                        
                        {/* Procedure check list */}
                        <div>
                          <h4 className="font-mono text-xs uppercase tracking-wider text-charcoal mb-3 font-semibold">
                            STAGE PROCEDURES & VERIFICATION POINTS:
                          </h4>
                          <ul className="space-y-2.5">
                            {stage.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-warm-gray leading-relaxed">
                                <span className="w-1.5 h-1.5 bg-walnut rounded-none mt-2 shrink-0"></span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technical Spec ledger box */}
                        <div className="border border-hairline bg-paper p-4 font-mono text-xs flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-charcoal">
                            <RouterBitGlyph className="w-4 h-4 text-walnut shrink-0" />
                            <span className="text-[11px] font-semibold">{stage.technicalSpec}</span>
                          </div>
                          <span className="text-[10px] text-warm-gray uppercase hidden sm:inline">
                            VERIFIED LEDGER
                          </span>
                        </div>

                      </div>
                    )}

                  </div>
                </div>
              );
            })}

          </div>

          {/* Bottom Consultation CTA */}
          <div className="mt-16 border border-hairline bg-ivory p-8 text-center space-y-4">
            <h3 className="text-xl font-bold text-charcoal">
              Ready To Review Your Cut-Sheet or Space Drawing?
            </h3>
            <p className="text-xs sm:text-sm text-warm-gray max-w-xl mx-auto">
              Our workshop is situated at 468 Sultan Ahmed Rd, Ichhra Lahore. 
              Bring your spatial dimensions or contact our direct phone line.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="tel:+923026776926"
                className="px-6 py-3 bg-walnut hover:bg-walnut-hover text-paper font-mono text-xs tracking-wider uppercase transition-colors inline-flex items-center"
              >
                <Phone className="w-3.5 h-3.5 mr-2" />
                <span>+92 302 6776926</span>
              </a>
              <Link
                to="/contact"
                className="px-6 py-3 border border-charcoal bg-paper text-charcoal hover:bg-charcoal hover:text-paper font-mono text-xs tracking-wider uppercase transition-colors"
              >
                <span>Submit Inquiry Form</span>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Process;

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    num: '01',
    title: 'Consultation',
    detail: 'Space review, design intent discussion & timber preference alignment.'
  },
  {
    num: '02',
    title: 'Design & Layout',
    detail: 'CAD vectors, cut-sheet generation & joinery tolerance detailing.'
  },
  {
    num: '03',
    title: 'Cutting & Fabrication',
    detail: 'CNC router path execution, contour milling & edge calibration.'
  },
  {
    num: '04',
    title: 'Installation & Finishing',
    detail: 'On-site joint fitting, alignment inspection & protective coat curing.'
  }
];

const ProcessStrip = () => {
  return (
    <section className="border-y border-hairline bg-ivory/60 py-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header caption framing as general workflow */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-hairline gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 bg-walnut rounded-full"></span>
            <span className="font-mono text-xs text-warm-gray tracking-wider uppercase">
              GENERAL WORKFLOW FRAMEWORK
            </span>
          </div>
          <Link 
            to="/process" 
            className="group inline-flex items-center text-xs font-mono text-charcoal hover:text-walnut transition-colors"
          >
            <span>EXPLORE DETAILED FABRICATION STAGES</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4-Stage Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div 
              key={step.num} 
              className="relative bg-paper p-5 border border-hairline hover:border-charcoal/40 transition-colors"
            >
              {/* Subtle animated progress indicator at top edge */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-ash overflow-hidden">
                <div 
                  className="h-full bg-walnut transition-all duration-700" 
                  style={{ width: `${(idx + 1) * 25}%` }}
                />
              </div>

              <div className="flex items-baseline justify-between mb-3 pt-1">
                <span className="font-mono text-xl font-bold text-walnut">
                  {step.num}
                </span>
                <span className="font-mono text-[10px] text-warm-gray uppercase tracking-wider">
                  STAGE {idx + 1} OF 4
                </span>
              </div>

              <h3 className="text-base font-semibold text-charcoal mb-1.5">
                {step.title}
              </h3>
              <p className="text-xs text-warm-gray leading-relaxed">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessStrip;

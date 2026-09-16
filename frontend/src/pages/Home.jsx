import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MapPin, Compass, ChevronRight, Layers } from 'lucide-react';
import SEO from '../components/common/SEO';
import CutSheetHero from '../components/cutsheet/CutSheetHero';
import ProcessStrip from '../components/cutsheet/ProcessStrip';
import { RouterBitGlyph, ToolpathLine } from '../components/cutsheet/LineworkVector';
import { shopService, projectService } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';

// Fallback generic business service offerings as specified in prompt section 8
const fallbackServices = [
  {
    _id: 'srv-1',
    order: 1,
    name: 'Custom Interior Woodwork',
    description: 'Precision architectural wall cladding, bespoke storage credenzas, and integrated structural timber features.'
  },
  {
    _id: 'srv-2',
    order: 2,
    name: 'CNC-Cut Panels & Furniture Pieces',
    description: 'Geometric lattice screening, fluted acoustic room dividers, and computer-routed custom timber pieces.'
  },
  {
    _id: 'srv-3',
    order: 3,
    name: 'Interior Layout & Decor Planning',
    description: 'Elevation drawings, substrate coordination, joint specification, and material ledger layout for interiors.'
  },
  {
    _id: 'srv-4',
    order: 4,
    name: 'Finishing & Installation',
    description: 'Hairline alignment, concealed fastening, edge-banding, and protective surface oil/polyurethane finishing.'
  }
];

const Home = () => {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    // Fetch Services dynamically
    shopService.getAll()
      .then(res => {
        if (res.data?.data && res.data.data.length > 0) {
          setServices(res.data.data.slice(0, 4));
        } else {
          setServices(fallbackServices);
        }
      })
      .catch(() => {
        setServices(fallbackServices);
      })
      .finally(() => setLoadingServices(false));

    // Fetch Projects
    projectService.getAll()
      .then(res => {
        if (res.data?.data) {
          setProjects(res.data.data.slice(0, 3));
        }
      })
      .catch(() => {
        setProjects([]);
      })
      .finally(() => setLoadingProjects(false));
  }, []);

  return (
    <>
      <SEO 
        title="Home" 
        description="Wood CNC Design Shop - RealCNC. Interior Decorator specializing in custom wood and CNC design. 468 Sultan Ahmed Rd, Ichhra Lahore, Pakistan." 
      />

      {/* Hero Section */}
      <CutSheetHero />

      {/* Process Strip */}
      <ProcessStrip />

      {/* SECTION 8: Services Index — Editorial Numbered List */}
      <section className="py-16 sm:py-24 bg-paper border-b border-hairline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-hairline gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-warm-gray tracking-wider uppercase mb-1">
                <span className="w-1.5 h-1.5 bg-walnut rounded-none"></span>
                <span>CATALOG INDEX // SERVICES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-charcoal tracking-tight">
                Interior Decoration & Wood Fabrication Capabilities
              </h2>
            </div>
            <Link
              to="/services"
              className="group inline-flex items-center text-xs font-mono text-charcoal hover:text-walnut transition-colors"
            >
              <span>VIEW FULL SERVICE DIRECTORY</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Numbered Row List */}
          {loadingServices ? (
            <LoadingSpinner label="Loading service index..." />
          ) : (
            <div className="divide-y divide-hairline border-y border-hairline">
              {services.map((item, idx) => (
                <Link
                  key={item._id || idx}
                  to="/services"
                  className="group flex flex-col md:flex-row md:items-center justify-between py-6 px-4 hover:bg-ivory transition-colors duration-150 relative"
                >
                  {/* Active highlight line on hover */}
                  <div className="hidden group-hover:block absolute left-0 top-0 bottom-0 w-1 bg-walnut" />

                  {/* Left: Number + Title */}
                  <div className="flex items-baseline space-x-6 md:w-5/12 mb-2 md:mb-0">
                    <span className="font-mono text-sm font-bold text-walnut">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-lg font-semibold text-charcoal group-hover:text-walnut transition-colors">
                      {item.name}
                    </h3>
                  </div>

                  {/* Center: Description */}
                  <p className="text-xs sm:text-sm text-warm-gray md:w-6/12 pl-12 md:pl-0 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Right: Technical Arrow */}
                  <div className="hidden md:flex md:w-1/12 justify-end">
                    <span className="p-2 border border-hairline rounded-none bg-paper text-charcoal group-hover:border-walnut group-hover:text-walnut transition-colors">
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Technical Note Below Services */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-warm-gray pt-2">
            <span>SPECIFICATION CODE: RE-CNC-LHE</span>
            <span>CUSTOM PROFILES ROUTED TO CLIENT CAD / DWG SPECIFICATIONS</span>
          </div>
        </div>
      </section>

      {/* SECTION 9: Asymmetric Visual Grid */}
      <section className="py-16 sm:py-24 bg-ivory/50 border-b border-hairline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-10 pb-4 border-b border-hairline flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-charcoal"></span>
              <span className="font-mono text-xs text-charcoal uppercase tracking-wider font-medium">
                WORKSHOP FABRICATION STUDIES // ASYMMETRIC GRID
              </span>
            </div>
            <span className="font-mono text-[10px] text-warm-gray">
              MATERIAL VISUALS (REPLACEABLE VIA ADMIN)
            </span>
          </div>

          {/* Asymmetric Grid Layout:
              1 large vertical panel, 1 small square panel, 1 wide horizontal panel, 1 text-only workshop note panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* 1. Large Vertical Panel (5 Cols) */}
            <div className="lg:col-span-5 bg-paper border border-hairline p-4 flex flex-col justify-between group">
              <div className="relative overflow-hidden bg-ash aspect-[4/5] mb-4">
                <img
                  src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1000&q=80"
                  alt="Fluted wood panel fabrication concept"
                  loading="lazy"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute top-2 left-2 bg-paper/90 px-2 py-1 border border-hairline font-mono text-[9px] text-charcoal">
                  STUDY_01 // 3D FLUTED PANEL
                </div>
              </div>
              <div className="pt-2 border-t border-hairline flex items-center justify-between font-mono text-[11px]">
                <span className="text-charcoal font-medium">MATERIAL: AMERICAN WALNUT</span>
                <span className="text-warm-gray">ROUTER BIT: 6.35mm BALLNOSE</span>
              </div>
            </div>

            {/* Right Column: Split into Wide, Square, Text */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              
              {/* 2. Wide Horizontal Panel */}
              <div className="bg-paper border border-hairline p-4 group">
                <div className="relative overflow-hidden bg-ash aspect-[21/9] mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                    alt="Interior geometric wood screening study"
                    loading="lazy"
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-paper/90 px-2 py-1 border border-hairline font-mono text-[9px] text-charcoal">
                    STUDY_02 // GEOMETRIC SCREENING
                  </div>
                </div>
                <div className="pt-2 border-t border-hairline flex items-center justify-between font-mono text-[11px]">
                  <span className="text-charcoal font-medium">SUBSTRATE: WHITE OAK SOLID</span>
                  <span className="text-warm-gray">PASS: CONTOUR CLEARANCE</span>
                </div>
              </div>

              {/* Bottom Row of Right Column: Square Panel + Workshop Note */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* 3. Small Square Panel */}
                <div className="bg-paper border border-hairline p-4 group">
                  <div className="relative overflow-hidden bg-ash aspect-square mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80"
                      alt="Joinery precision corner detail"
                      loading="lazy"
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-paper/90 px-2 py-1 border border-hairline font-mono text-[9px] text-charcoal">
                      STUDY_03 // CORNER JOINTS
                    </div>
                  </div>
                  <div className="pt-2 border-t border-hairline font-mono text-[11px] text-charcoal">
                    MITRED CASING & REVEAL
                  </div>
                </div>

                {/* 4. Text-Only Panel with Short Workshop Note */}
                <div className="bg-paper border border-hairline p-6 flex flex-col justify-between cut-grid relative">
                  <div>
                    <div className="flex items-center space-x-2 font-mono text-[10px] text-walnut uppercase tracking-widest mb-3">
                      <RouterBitGlyph className="w-3.5 h-3.5" />
                      <span>WORKSHOP NOTE // REALCNC</span>
                    </div>
                    <h4 className="text-base font-semibold text-charcoal mb-2">
                      Precision Calibration
                    </h4>
                    <p className="text-xs text-warm-gray leading-relaxed">
                      "Every sheet nested on our table is calculated for minimal kerf waste, 
                      crisp edge relief, and clean joint register. We bridge digital CAD drawings 
                      with organic timber character."
                    </p>
                  </div>

                  <div className="pt-4 border-t border-hairline mt-4 font-mono text-[10px] text-warm-gray flex justify-between">
                    <span>ICHHRA SHOP, LAHORE</span>
                    <span className="text-charcoal font-medium">REALCNC</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

          <div className="mt-4 text-center">
            <p className="font-mono text-[11px] text-warm-gray italic">
              Notice: The visuals above represent timber fabrication and material studies. Real project photography can be uploaded directly via the Admin Ledger.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION: Direct Workshop Inquiry Banner */}
      <section className="py-16 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-charcoal/20 bg-ivory p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-walnut uppercase tracking-wider">
                <span className="w-2 h-2 bg-walnut"></span>
                <span>DIRECT WORKSHOP CONSULTATION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-charcoal">
                Discuss Your Wood CNC Or Interior Decoration Specifications
              </h2>
              <p className="text-xs sm:text-sm text-warm-gray leading-relaxed">
                Connect directly with our workshop at 468 Sultan Ahmed Rd, Ichhra Lahore. 
                Submit your cutting dimensions, panel counts, or visit our shop.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href="tel:+923026776926"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-walnut hover:bg-walnut-hover text-paper font-mono text-xs tracking-wider uppercase transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                <span>+92 302 6776926</span>
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3.5 border border-charcoal bg-paper text-charcoal hover:bg-charcoal hover:text-paper font-mono text-xs tracking-wider uppercase transition-colors"
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

export default Home;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, ArrowRight, Layers, Phone } from 'lucide-react';
import SEO from '../components/common/SEO';
import { shopService } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import { RouterBitGlyph } from '../components/cutsheet/LineworkVector';

// Fallback categories per brief requirement 11
const defaultCategories = [
  {
    _id: 'svc-1',
    order: 1,
    name: 'Custom Interior Woodwork',
    description: 'Precision interior wooden architectural fixtures, tailored wall treatments, bespoke cabinetry, and structural interior timber features engineered to design specifications.',
    tooling: '3-axis CNC contour milling & mortise/tenon registers',
    substrate: 'Select Walnut, White Oak, Ash & Calibrated Veneers',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'svc-2',
    order: 2,
    name: 'CNC-Cut Panels & Décor Pieces',
    description: 'Computer-controlled router-cut geometric screening, acoustic timber wall patterns, 2D and 3D textured reliefs, and decorative lattice panels fabricated from engineered boards and solid timbers.',
    tooling: 'V-carve 60°/90°, 3.175mm ballnose & down-cut spirals',
    substrate: 'High-Density Calibrated MDF & Hardwood Planks',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'svc-3',
    order: 3,
    name: 'Custom Furniture Design',
    description: 'Made-to-measure statement desks, conference tables, storage credenzas, and integrated seating structures fabricated with CNC-assisted precision joinery.',
    tooling: 'Finger-joint slots, rebate channels & pocket milling',
    substrate: 'Solid Hardwoods, Marine Ply core with timber edge-banding',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'svc-4',
    order: 4,
    name: 'Interior Layout & Space Planning',
    description: 'Spatial wood element coordination, elevation planning, substrate specifications, joint detailing, and material ledger layout for cohesive interior decoration schemes.',
    tooling: 'CAD / CAM vector optimization & 2D cut nesting',
    substrate: 'Architectural specifications & fabrication sheets',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'svc-5',
    order: 5,
    name: 'Residential Interiors',
    description: 'Tailored living room feature walls, custom bedroom headboards, fluted vanity cladding, and decorative wooden ceiling baffles designed for private residences.',
    tooling: 'Calibrated surface planing & ultra-matte hardwax finish',
    substrate: 'Organic American Walnut, Oak & Natural Ash',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'svc-6',
    order: 6,
    name: 'Commercial Interiors',
    description: 'Feature reception wall cladding, conference partition screens, branded acoustic wood baffles, and display casework for corporate and retail environments.',
    tooling: 'Large-format nested sheet routing & fire-retardant seals',
    substrate: 'Commercial-grade engineered composites & hardwood veneers',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
  }
];

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(0); // First item open by default

  const fetchServices = () => {
    setLoading(true);
    shopService.getAll()
      .then(res => {
        if (res.data?.data && res.data.data.length > 0) {
          // Merge with fallback visual details if image not populated in custom service
          const merged = res.data.data.map((s, idx) => ({
            ...s,
            tooling: s.tooling || defaultCategories[idx % defaultCategories.length].tooling,
            substrate: s.substrate || defaultCategories[idx % defaultCategories.length].substrate,
            image: s.image || defaultCategories[idx % defaultCategories.length].image
          }));
          setServices(merged);
        } else {
          setServices(defaultCategories);
        }
      })
      .catch(() => {
        setServices(defaultCategories);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const toggleAccordion = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <>
      <SEO 
        title="Services" 
        description="Services offered by Wood CNC Design Shop - RealCNC. Custom interior woodwork, CNC-cut panels, interior space planning, and precision timber finishing in Lahore." 
      />

      {/* Header Banner */}
      <section className="bg-ivory border-b border-hairline py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-xs font-mono text-warm-gray tracking-wider uppercase mb-2">
            <span className="w-2 h-2 bg-walnut"></span>
            <span>SERVICES DIRECTORY // ACCORDION LEDGER</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
            Custom Wood & CNC Fabrication Services
          </h1>
          <p className="mt-4 text-base sm:text-lg text-warm-gray max-w-3xl leading-relaxed">
            Expand any category below to inspect fabrication specifications, tooling notes, 
            substrate requirements, and submit a targeted workshop inquiry.
          </p>
        </div>
      </section>

      {/* Accordion Directory */}
      <section className="py-16 sm:py-24 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {loading ? (
            <LoadingSpinner label="Loading service ledger entries..." />
          ) : services.length === 0 ? (
            <EmptyState 
              message="No services have been added yet." 
              onRetry={fetchServices}
            />
          ) : (
            <div className="border border-hairline divide-y divide-hairline">
              {services.map((item, idx) => {
                const isOpen = expandedIndex === idx;
                return (
                  <div key={item._id || idx} className="bg-paper transition-colors">
                    
                    {/* Header Row */}
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className="w-full text-left py-6 px-6 sm:px-8 flex items-center justify-between hover:bg-ivory/60 focus:outline-none focus:bg-ivory transition-colors group"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-baseline space-x-4 sm:space-x-6">
                        <span className="font-mono text-sm sm:text-base font-bold text-walnut shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <h2 className="text-lg sm:text-xl font-semibold text-charcoal group-hover:text-walnut transition-colors">
                          {item.name}
                        </h2>
                      </div>

                      <div className="flex items-center space-x-3 shrink-0">
                        <span className="hidden sm:inline font-mono text-xs text-warm-gray uppercase tracking-wider">
                          {isOpen ? 'COLLAPSE' : 'SPECIFICATIONS'}
                        </span>
                        <span className="p-1.5 border border-hairline rounded-none bg-paper text-charcoal group-hover:border-walnut group-hover:text-walnut">
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </span>
                      </div>
                    </button>

                    {/* Expandable Body */}
                    {isOpen && (
                      <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-hairline/60 bg-ivory/30 animate-in fade-in duration-200">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                          
                          {/* Left Description & Specifications */}
                          <div className="lg:col-span-7 space-y-5">
                            <p className="text-sm sm:text-base text-warm-gray leading-relaxed">
                              {item.description}
                            </p>

                            {/* Technical Ledger Specification Box */}
                            <div className="border border-hairline bg-paper p-5 font-mono text-xs space-y-3">
                              <div className="flex items-center space-x-2 text-walnut font-medium pb-2 border-b border-hairline">
                                <RouterBitGlyph className="w-3.5 h-3.5" />
                                <span>FABRICATION PROFILE & TOOLING</span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                                <div>
                                  <span className="text-warm-gray block uppercase">TOOLPATH / OPERATION</span>
                                  <span className="text-charcoal font-semibold">{item.tooling || '3-Axis CNC Machining'}</span>
                                </div>
                                <div>
                                  <span className="text-warm-gray block uppercase">TYPICAL SUBSTRATES</span>
                                  <span className="text-charcoal font-semibold">{item.substrate || 'Walnut, Oak, Calibrated MDF'}</span>
                                </div>
                              </div>
                            </div>

                            {/* Action CTA */}
                            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                              <Link
                                to={`/contact?subject=${encodeURIComponent(`Inquiry regarding: ${item.name}`)}`}
                                className="inline-flex items-center justify-center px-5 py-2.5 bg-walnut hover:bg-walnut-hover text-paper font-mono text-xs tracking-wider uppercase transition-colors"
                              >
                                <span>Inquire For This Service</span>
                                <ArrowRight className="w-3.5 h-3.5 ml-2" />
                              </Link>
                              
                              <a
                                href="tel:+923026776926"
                                className="inline-flex items-center justify-center px-5 py-2.5 border border-hairline bg-paper text-charcoal hover:border-charcoal font-mono text-xs tracking-wider uppercase transition-colors"
                              >
                                <Phone className="w-3.5 h-3.5 mr-2 text-walnut" />
                                <span>Call: +92 302 6776926</span>
                              </a>
                            </div>
                          </div>

                          {/* Right Supporting Visual */}
                          <div className="lg:col-span-5">
                            <div className="border border-hairline bg-paper p-3">
                              <div className="relative overflow-hidden bg-ash aspect-[4/3]">
                                <img
                                  src={item.image}
                                  alt={`${item.name} visual reference`}
                                  loading="lazy"
                                  className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-300"
                                />
                                <div className="absolute top-2 left-2 bg-paper/90 px-2 py-0.5 border border-hairline font-mono text-[9px] text-charcoal">
                                  REF_VIZ // {String(idx + 1).padStart(2, '0')}
                                </div>
                              </div>
                              <div className="pt-2 font-mono text-[10px] text-warm-gray flex justify-between">
                                <span>STUDY SPECIFICATION</span>
                                <span className="text-walnut">CALIBRATED</span>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom Note */}
          <div className="mt-8 border-t border-hairline pt-4 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-warm-gray gap-2">
            <span>CONFIGURABLE LEDGER: SERVICES CAN BE UPDATED VIA WORKSHOP ADMIN</span>
            <Link to="/contact" className="text-walnut hover:underline">
              NEED BESPOKE CUTTING DIMENSIONS? →
            </Link>
          </div>

        </div>
      </section>
    </>
  );
};

export default Services;

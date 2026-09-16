import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, CheckCircle2, Phone, Layers, ChevronRight } from 'lucide-react';
import SEO from '../components/common/SEO';
import { projectService } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Lightbox from '../components/common/Lightbox';
import { RouterBitGlyph } from '../components/cutsheet/LineworkVector';
import { defaultProjects } from '../data/defaultData';

const PortfolioDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(false);
    projectService.getById(id)
      .then(res => {
        if (res.data?.data) {
          setProject(res.data.data);
        } else {
          const found = defaultProjects.find(p => p._id === id);
          if (found) {
            setProject(found);
          } else {
            setError(true);
          }
        }
      })
      .catch(() => {
        const found = defaultProjects.find(p => p._id === id);
        if (found) {
          setProject(found);
        } else {
          setError(true);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner label="Loading project ledger record..." />
      </div>
    );
  }

  // Professional "project not found" state (not a generic broken page)
  if (error || !project) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
        <div className="max-w-lg w-full border border-hairline bg-ivory p-8 sm:p-10 text-center space-y-4">
          <div className="w-12 h-12 border border-hairline bg-paper text-walnut mx-auto flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
          <div className="font-mono text-xs text-warm-gray uppercase tracking-widest">
            ERROR // RECORD NOT FOUND
          </div>
          <h1 className="text-2xl font-bold text-charcoal">
            Project Record Not Found
          </h1>
          <p className="text-xs sm:text-sm text-warm-gray leading-relaxed">
            The project ledger ID you requested does not correspond to an active record 
            in the Wood CNC Design Shop archive.
          </p>
          <div className="pt-4">
            <Link
              to="/portfolio"
              className="inline-flex items-center px-5 py-2.5 bg-walnut text-paper font-mono text-xs tracking-wider uppercase hover:bg-walnut-hover transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Return to Portfolio Archive</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const images = project.images || [];

  return (
    <>
      <SEO 
        title={project.title} 
        description={`${project.title} - ${project.description.slice(0, 150)}`} 
      />

      {/* Breadcrumb Bar */}
      <section className="bg-ivory border-b border-hairline py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 font-mono text-xs text-warm-gray">
            <Link to="/" className="hover:text-walnut">HOME</Link>
            <ChevronRight className="w-3 h-3 text-hairline" />
            <Link to="/portfolio" className="hover:text-walnut">PORTFOLIO</Link>
            <ChevronRight className="w-3 h-3 text-hairline" />
            <span className="text-charcoal uppercase truncate max-w-xs">{project.title}</span>
          </div>
        </div>
      </section>

      {/* Main Detail Header */}
      <section className="bg-paper border-b border-hairline py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center space-x-3">
                <span className="bg-ash px-2.5 py-0.5 border border-hairline font-mono text-xs text-charcoal uppercase font-semibold">
                  {project.category}
                </span>
                <span className="font-mono text-xs text-warm-gray">
                  RECORD REF: {String(project._id).slice(-6).toUpperCase()}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
                {project.title}
              </h1>
            </div>

            <Link
              to="/portfolio"
              className="inline-flex items-center text-xs font-mono text-charcoal hover:text-walnut border border-hairline px-4 py-2 bg-paper hover:bg-ivory self-start transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-2" />
              <span>BACK TO ARCHIVE</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Content & Specifications Grid */}
      <section className="py-12 sm:py-16 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Visuals */}
            <div className="lg:col-span-7 space-y-6">
              {images.length > 0 ? (
                <div className="space-y-4">
                  {/* Primary Featured Image */}
                  <div 
                    onClick={() => { setActiveImageIndex(0); setLightboxOpen(true); }}
                    className="relative aspect-[16/10] bg-ash border border-hairline overflow-hidden cursor-pointer group"
                  >
                    <img
                      src={images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-paper text-charcoal font-mono text-xs px-3 py-1.5 border border-hairline">
                        EXPAND IN LIGHTBOX
                      </span>
                    </div>
                  </div>

                  {/* Thumbnail Strip if multiple images */}
                  {images.length > 1 && (
                    <div className="grid grid-cols-4 gap-3">
                      {images.map((img, idx) => (
                        <div
                          key={idx}
                          onClick={() => { setActiveImageIndex(idx); setLightboxOpen(true); }}
                          className={`relative aspect-square border cursor-pointer overflow-hidden ${
                            activeImageIndex === idx ? 'border-walnut ring-1 ring-walnut' : 'border-hairline'
                          }`}
                        >
                          <img
                            src={img}
                            alt={`${project.title} view ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-[16/10] border border-dashed border-hairline bg-ivory/50 flex flex-col items-center justify-center p-8 text-center cut-grid">
                  <Layers className="w-10 h-10 text-warm-gray mb-3" />
                  <p className="font-mono text-xs text-charcoal">NO PHOTOGRAPHY REGISTERED</p>
                  <p className="text-xs text-warm-gray mt-1">
                    Technical drawings and shop specifications recorded below.
                  </p>
                </div>
              )}
            </div>

            {/* Right Column: Project Ledger & Supplied Data */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Description Block */}
              <div className="border border-hairline bg-ivory/40 p-6 space-y-3">
                <div className="flex items-center space-x-2 font-mono text-xs text-charcoal font-semibold pb-2 border-b border-hairline">
                  <RouterBitGlyph className="w-4 h-4 text-walnut" />
                  <span>PROJECT LEDGER DESCRIPTION</span>
                </div>
                <p className="text-sm text-charcoal leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>

              {/* Supplied Metadata Block (ONLY supplied fields displayed) */}
              <div className="border border-hairline bg-paper p-6 space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-warm-gray pb-2 border-b border-hairline">
                  VERIFIED RECORD PARAMETERS
                </h3>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between py-1 border-b border-hairline/60">
                    <span className="text-warm-gray">CATEGORY:</span>
                    <span className="text-charcoal font-medium">{project.category}</span>
                  </div>

                  {project.location && (
                    <div className="flex items-center justify-between py-1 border-b border-hairline/60">
                      <span className="text-warm-gray">LOCATION:</span>
                      <span className="text-charcoal font-medium">{project.location}</span>
                    </div>
                  )}

                  {project.status && (
                    <div className="flex items-center justify-between py-1 border-b border-hairline/60">
                      <span className="text-warm-gray">STATUS:</span>
                      <span className="text-walnut font-medium">{project.status}</span>
                    </div>
                  )}

                  {project.date && (
                    <div className="flex items-center justify-between py-1 border-b border-hairline/60">
                      <span className="text-warm-gray">DATE RECORDED:</span>
                      <span className="text-charcoal font-medium">{project.date}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Inquiry Action Box */}
              <div className="border border-charcoal/30 bg-paper p-6 space-y-4">
                <h3 className="text-base font-bold text-charcoal">
                  Inquire Regarding Similar Woodwork
                </h3>
                <p className="text-xs text-warm-gray leading-relaxed">
                  Request custom timber specifications, CNC cutting schedules, or on-site measurement in Lahore.
                </p>
                <div className="flex flex-col gap-2.5">
                  <Link
                    to={`/contact?subject=${encodeURIComponent(`Inquiry on Project: ${project.title}`)}`}
                    className="w-full inline-flex items-center justify-center py-2.5 bg-walnut hover:bg-walnut-hover text-paper font-mono text-xs tracking-wider uppercase transition-colors"
                  >
                    Submit Project Inquiry
                  </Link>
                  <a
                    href="tel:+923026776926"
                    className="w-full inline-flex items-center justify-center py-2.5 border border-hairline text-charcoal hover:border-charcoal font-mono text-xs tracking-wider uppercase transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 mr-2 text-walnut" />
                    <span>Call +92 302 6776926</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Lightbox for full screen image viewing */}
      {lightboxOpen && images.length > 0 && (
        <Lightbox
          items={images.map(img => ({ image: img, title: project.title, category: project.category }))}
          currentIndex={activeImageIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={(newIdx) => setActiveImageIndex(newIdx)}
        />
      )}
    </>
  );
};

export default PortfolioDetails;

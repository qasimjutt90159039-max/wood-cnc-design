import React, { useState, useEffect } from 'react';
import { Layers, ZoomIn, Filter } from 'lucide-react';
import SEO from '../components/common/SEO';
import { galleryService } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import Lightbox from '../components/common/Lightbox';
import { defaultGallery } from '../data/defaultData';

const categories = ['All', 'Panels', 'Interiors', 'Furniture', 'Detail', 'Other'];

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const getFilteredDefaultGallery = () => {
    if (selectedCategory === 'All') return defaultGallery;
    return defaultGallery.filter(item => item.category === selectedCategory);
  };

  const fetchGallery = () => {
    setLoading(true);
    const params = {};
    if (selectedCategory !== 'All') {
      params.category = selectedCategory;
    }

    galleryService.getAll(params)
      .then(res => {
        if (res.data?.data && res.data.data.length > 0) {
          setItems(res.data.data);
        } else {
          setItems(getFilteredDefaultGallery());
        }
      })
      .catch(() => {
        setItems(getFilteredDefaultGallery());
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchGallery();
  }, [selectedCategory]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <SEO 
        title="Gallery" 
        description="Visual archive of Wood CNC Design Shop - RealCNC in Ichhra Lahore. Photographic record of routed panels, interior features, and joinery details." 
      />

      {/* Header Banner */}
      <section className="bg-ivory border-b border-hairline py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-xs font-mono text-warm-gray tracking-wider uppercase mb-2">
            <span className="w-2 h-2 bg-walnut"></span>
            <span>VISUAL LEDGER // REPOSITORY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
            Workshop Gallery
          </h1>
          <p className="mt-4 text-base sm:text-lg text-warm-gray max-w-3xl leading-relaxed">
            Photographic ledger of real timber projects, CNC-routed panels, and architectural 
            finishes executed by our workshop.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-paper border-b border-hairline py-5 sticky top-20 z-20 bg-paper/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center flex-wrap gap-2">
            <span className="font-mono text-xs text-warm-gray uppercase mr-2 hidden sm:inline">
              CATEGORY:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-colors ${
                  selectedCategory === cat
                    ? 'bg-charcoal text-paper border border-charcoal'
                    : 'bg-paper text-charcoal border border-hairline hover:border-charcoal'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-16 sm:py-24 bg-paper min-h-[450px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {loading ? (
            <LoadingSpinner label="Fetching visual archive from ledger..." />
          ) : items.length === 0 ? (
            /* EXACT REQUIRED EMPTY STATE STRING */
            <EmptyState 
              message="Gallery images will appear here once they are added." 
              onRetry={fetchGallery}
            />
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {items.map((item, idx) => (
                <div
                  key={item._id || idx}
                  onClick={() => openLightbox(idx)}
                  className="break-inside-avoid border border-hairline bg-paper p-3 group cursor-pointer hover:border-charcoal transition-all duration-200"
                >
                  <div className="relative overflow-hidden bg-ash">
                    <img
                      src={item.image}
                      alt={item.title || 'Wood CNC Workshop Visual'}
                      loading="lazy"
                      className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="p-2 bg-paper/95 border border-hairline text-charcoal">
                        <ZoomIn className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-2 left-2 bg-paper/95 border border-hairline px-2 py-0.5 font-mono text-[9px] text-charcoal uppercase">
                      {item.category || 'WORK'}
                    </div>
                  </div>

                  {/* Caption info if supplied */}
                  {(item.title || item.description) && (
                    <div className="pt-3 border-t border-hairline mt-3">
                      {item.title && (
                        <h3 className="text-xs font-semibold text-charcoal tracking-tight">
                          {item.title}
                        </h3>
                      )}
                      {item.description && (
                        <p className="text-[11px] text-warm-gray mt-0.5 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between font-mono text-[10px] text-warm-gray border-t border-hairline/60 mt-2">
                    <span>PANEL-{String(idx + 1).padStart(3, '0')}</span>
                    <span className="text-walnut">INSPECT</span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && items.length > 0 && (
        <Lightbox
          items={items}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </>
  );
};

export default Gallery;

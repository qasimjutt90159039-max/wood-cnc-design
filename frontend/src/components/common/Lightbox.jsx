import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Lightbox = ({ items, currentIndex, onClose, onNavigate }) => {
  if (!items || items.length === 0 || currentIndex === null) return null;

  const currentItem = items[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % items.length);
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [currentIndex, items.length, onClose, onNavigate]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 backdrop-blur-sm p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Container - Stop propagation on inner card */}
      <div 
        className="relative max-w-5xl w-full bg-paper border border-hairline shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-hairline bg-ivory">
          <div className="flex items-center space-x-3">
            <span className="inline-block w-2 h-2 bg-walnut rounded-full"></span>
            <span className="font-mono text-xs text-warm-gray tracking-wider uppercase">
              {currentItem.category || 'WORK'} • {String(currentIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-charcoal hover:text-walnut transition-colors rounded-sm focus:outline-none focus:ring-2 focus:ring-walnut"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Image Display */}
        <div className="relative bg-ash/30 flex items-center justify-center min-h-[300px] max-h-[70vh] overflow-hidden">
          <img
            src={currentItem.image || currentItem.images?.[0]}
            alt={currentItem.title || 'Wood CNC Workshop Visual'}
            className="max-h-[70vh] w-auto max-w-full object-contain mx-auto select-none"
          />

          {/* Navigation Arrows */}
          {items.length > 1 && (
            <>
              <button
                onClick={() => onNavigate((currentIndex - 1 + items.length) % items.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-paper/90 border border-hairline text-charcoal hover:text-walnut hover:bg-paper transition-all focus:outline-none"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => onNavigate((currentIndex + 1) % items.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-paper/90 border border-hairline text-charcoal hover:text-walnut hover:bg-paper transition-all focus:outline-none"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Footer info */}
        {(currentItem.title || currentItem.description) && (
          <div className="px-6 py-4 border-t border-hairline bg-paper flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              {currentItem.title && (
                <h4 className="text-sm font-semibold text-charcoal">{currentItem.title}</h4>
              )}
              {currentItem.description && (
                <p className="text-xs text-warm-gray mt-0.5">{currentItem.description}</p>
              )}
            </div>
            <div className="font-mono text-[10px] text-warm-gray border-l border-hairline sm:pl-4">
              REF: CUT-PANEL-{String(currentIndex + 1).padStart(3, '0')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lightbox;

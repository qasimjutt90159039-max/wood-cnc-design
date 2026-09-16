import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Layers } from 'lucide-react';
import SEO from '../components/common/SEO';
import { RouterBitGlyph } from '../components/cutsheet/LineworkVector';

const NotFound = () => {
  return (
    <>
      <SEO 
        title="404 - Page Not Found" 
        description="The requested cut-sheet or directory page was not found on the Wood CNC Design Shop - RealCNC portal." 
      />
      <div className="min-h-[75vh] flex items-center justify-center py-20 px-4 cut-grid">
        <div className="max-w-md w-full border border-hairline bg-paper p-8 sm:p-10 text-center space-y-6 shadow-sm">
          <div className="p-3 border border-hairline bg-ivory text-walnut inline-block mx-auto">
            <RouterBitGlyph className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="font-mono text-xs text-warm-gray uppercase tracking-widest block">
              STATUS CODE: 404
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-charcoal">
              Cut Coordinate Not Found
            </h1>
            <p className="text-xs sm:text-sm text-warm-gray leading-relaxed">
              The URL coordinate you navigated to does not exist in the workshop ledger.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-walnut hover:bg-walnut-hover text-paper font-mono text-xs tracking-wider uppercase transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Return to Workshop Home</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;

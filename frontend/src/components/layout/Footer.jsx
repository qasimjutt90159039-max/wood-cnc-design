import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { RouterBitGlyph } from '../cutsheet/LineworkVector';

const footerNav = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Process', path: '/process' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

const Footer = () => {
  return (
    <footer className="bg-ivory border-t border-hairline text-charcoal pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-hairline">
          
          {/* Column 1: Brand & Category */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 border border-hairline bg-paper">
                <RouterBitGlyph className="w-5 h-5 text-walnut" />
              </div>
              <div>
                <h3 className="font-bold text-base tracking-tight text-charcoal">
                  Wood CNC Design Shop - RealCNC
                </h3>
                <p className="font-mono text-xs text-walnut">
                  Interior Decorator
                </p>
              </div>
            </div>

            <p className="text-xs text-warm-gray leading-relaxed max-w-sm">
              Specialized timber interior fabrication, computer-controlled router cutting, 
              decorative wall screening, and tailored wooden architectural fixtures.
            </p>

            <div className="pt-2">
              <span className="font-mono text-[10px] text-warm-gray uppercase tracking-widest block mb-1">
                LEDGER ID
              </span>
              <span className="font-mono text-xs text-charcoal bg-paper px-2.5 py-1 border border-hairline inline-block">
                PK-LHE-CNC-54000
              </span>
            </div>
          </div>

          {/* Column 2: Exact Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-mono text-xs font-semibold text-charcoal uppercase tracking-wider pb-2 border-b border-hairline">
              Verified Workshop Location
            </h4>
            
            <div className="space-y-3 text-xs text-warm-gray">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-walnut shrink-0 mt-0.5" />
                <span className="text-charcoal">
                  468 Sultan Ahmed Rd, Ichhra Lahore, 54000, Pakistan
                </span>
              </div>

              <div className="flex items-center space-x-2.5 pt-1">
                <Phone className="w-4 h-4 text-walnut shrink-0" />
                <a 
                  href="tel:+923026776926" 
                  className="font-mono text-charcoal hover:text-walnut transition-colors font-medium"
                >
                  +92 302 6776926
                </a>
              </div>

              <div className="pt-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=468+Sultan+Ahmed+Rd,+Ichhra+Lahore,+54000,+Pakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[11px] font-mono text-walnut hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs font-semibold text-charcoal uppercase tracking-wider pb-2 border-b border-hairline">
              Directory
            </h4>
            <ul className="space-y-1.5 font-mono text-xs">
              {footerNav.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-warm-gray hover:text-walnut transition-colors block py-0.5"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to="/admin"
                  className="text-[11px] text-warm-gray hover:text-charcoal transition-colors block py-0.5 opacity-60 hover:opacity-100"
                >
                  Workshop Admin
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar - Notice: Strictly NO social links as specified */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between font-mono text-[11px] text-warm-gray gap-2">
          <div>
            © {new Date().getFullYear()} Wood CNC Design Shop - RealCNC. All rights reserved.
          </div>
          <div className="flex items-center space-x-4 text-[10px]">
            <span>ICHHRA, LAHORE</span>
            <span>•</span>
            <span>TOLERANCE ±0.15mm</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

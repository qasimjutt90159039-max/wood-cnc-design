import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { RouterBitGlyph } from '../cutsheet/LineworkVector';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Process', path: '/process' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-md border-b border-hairline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Identity: Text-based + Router-bit glyph */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-walnut"
          >
            <div className="p-2 border border-hairline bg-ivory group-hover:border-walnut transition-colors">
              <RouterBitGlyph className="w-5 h-5 text-walnut" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-base tracking-tight text-charcoal">
                Wood CNC Design Shop <span className="text-walnut font-normal">- RealCNC</span>
              </span>
              <span className="font-mono text-[10px] text-warm-gray tracking-wider uppercase">
                Interior Decorator • Lahore
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Main Navigation">
            {navLinks.slice(0, 6).map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all duration-150 relative ${
                    isActive
                      ? 'text-walnut font-medium after:content-[""] after:absolute after:bottom-[-2px] after:left-3 after:right-3 after:h-[2px] after:bg-walnut'
                      : 'text-charcoal hover:text-walnut hover:bg-ash/30'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Distinct Contact CTA Button */}
            <div className="pl-3 ml-2 border-l border-hairline">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `inline-flex items-center px-4 py-2 text-xs font-mono tracking-wider uppercase transition-colors duration-200 ${
                    isActive
                      ? 'bg-charcoal text-paper'
                      : 'bg-walnut hover:bg-walnut-hover text-paper'
                  }`
                }
              >
                <span>Contact</span>
              </NavLink>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden space-x-2">
            <a
              href="tel:+923026776926"
              className="p-2 border border-hairline text-charcoal hover:text-walnut"
              aria-label="Direct Phone Line"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-hairline text-charcoal hover:text-walnut focus:outline-none focus:ring-2 focus:ring-walnut"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-paper/98 backdrop-blur-lg border-t border-hairline z-50 flex flex-col justify-between overflow-y-auto p-6 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            <div className="font-mono text-[10px] text-warm-gray tracking-widest uppercase border-b border-hairline pb-2 mb-3">
              NAVIGATION DIRECTORY
            </div>
            {navLinks.map((link, idx) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `flex items-center justify-between py-3.5 px-3 border-b border-hairline/60 font-mono text-sm tracking-wider uppercase transition-colors ${
                    isActive
                      ? 'text-walnut bg-ivory font-semibold'
                      : 'text-charcoal hover:bg-ash/40'
                  }`
                }
              >
                <span>{link.name}</span>
                <span className="font-mono text-xs text-warm-gray">
                  0{idx + 1}
                </span>
              </NavLink>
            ))}
          </div>

          {/* Verified Contact Drawer Info */}
          <div className="pt-6 mt-6 border-t border-hairline bg-ivory p-4 space-y-3">
            <div className="font-mono text-[10px] text-warm-gray tracking-wider uppercase">
              WORKSHOP LEDGER
            </div>
            <div className="text-xs text-charcoal leading-tight">
              468 Sultan Ahmed Rd, Ichhra Lahore, 54000, Pakistan
            </div>
            <a
              href="tel:+923026776926"
              className="inline-flex items-center text-xs font-mono text-walnut font-medium"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5" />
              +92 302 6776926
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Layers, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import SEO from '../components/common/SEO';
import { projectService } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import { defaultProjects } from '../data/defaultData';

const categories = ['All', 'Residential', 'Commercial', 'Renovation', 'Other'];

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const getFilteredDefaultProjects = () => {
    let result = defaultProjects;
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) || 
        (p.location && p.location.toLowerCase().includes(q))
      );
    }
    return result;
  };

  const fetchProjects = () => {
    setLoading(true);
    const params = {};
    if (selectedCategory !== 'All') params.category = selectedCategory;
    if (searchQuery.trim()) params.search = searchQuery.trim();

    projectService.getAll(params)
      .then(res => {
        if (res.data?.data && res.data.data.length > 0) {
          setProjects(res.data.data);
        } else {
          setProjects(getFilteredDefaultProjects());
        }
      })
      .catch(() => {
        setProjects(getFilteredDefaultProjects());
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProjects();
  }, [selectedCategory]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProjects();
  };

  return (
    <>
      <SEO 
        title="Portfolio" 
        description="Project and work archive of Wood CNC Design Shop - RealCNC in Ichhra Lahore. Custom interior woodwork and CNC fabrication records." 
      />

      {/* Header Banner */}
      <section className="bg-ivory border-b border-hairline py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-xs font-mono text-warm-gray tracking-wider uppercase mb-2">
            <span className="w-2 h-2 bg-walnut"></span>
            <span>PROJECT LEDGER ARCHIVE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
            Work & Fabrication Records
          </h1>
          <p className="mt-4 text-base sm:text-lg text-warm-gray max-w-3xl leading-relaxed">
            Archive of custom timber interior installations, routed wall claddings, and precision 
            pieces fabricated at our Lahore workshop.
          </p>
        </div>
      </section>

      {/* Controls: Filter & Search Bar */}
      <section className="bg-paper border-b border-hairline py-6 sticky top-20 z-20 bg-paper/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Category Filter Tabs */}
            <div className="flex items-center flex-wrap gap-2">
              <span className="font-mono text-xs text-warm-gray uppercase mr-2 hidden sm:inline">
                FILTER:
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

            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-xs w-full">
              <input
                type="text"
                placeholder="Search ledger entries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs font-mono border border-hairline bg-ivory focus:bg-paper focus:outline-none focus:ring-1 focus:ring-walnut focus:border-walnut"
              />
              <Search className="w-3.5 h-3.5 text-warm-gray absolute left-3 top-1/2 -translate-y-1/2" />
            </form>

          </div>
        </div>
      </section>

      {/* Project Grid / Ledger Display */}
      <section className="py-16 sm:py-24 bg-paper min-h-[400px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {loading ? (
            <LoadingSpinner label="Querying project database..." />
          ) : projects.length === 0 ? (
            /* EXACT REQUIRED EMPTY STATE STRING */
            <EmptyState 
              message="No projects have been added yet."
              onRetry={fetchProjects}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((proj, idx) => (
                <article
                  key={proj._id}
                  className="border border-hairline bg-paper flex flex-col justify-between group hover:border-charcoal/50 transition-all duration-200"
                >
                  <div>
                    {/* Visual container */}
                    <div className="relative aspect-[16/10] bg-ash overflow-hidden border-b border-hairline">
                      {proj.images && proj.images.length > 0 ? (
                        <img
                          src={proj.images[0]}
                          alt={proj.title}
                          loading="lazy"
                          className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center cut-grid p-6 text-center">
                          <Layers className="w-8 h-8 text-warm-gray/60 mb-2" />
                          <span className="font-mono text-[10px] text-warm-gray">CAD / CNC ARCHIVE RECORD</span>
                        </div>
                      )}
                      
                      {/* Project Number badge */}
                      <div className="absolute top-2 left-2 bg-paper/95 border border-hairline px-2 py-0.5 font-mono text-[10px] font-bold text-walnut">
                        #{String(idx + 1).padStart(3, '0')}
                      </div>

                      {/* Category Tag */}
                      <div className="absolute top-2 right-2 bg-paper/95 border border-hairline px-2 py-0.5 font-mono text-[9px] text-charcoal uppercase">
                        {proj.category}
                      </div>
                    </div>

                    {/* Content details */}
                    <div className="p-6 space-y-3">
                      <h2 className="text-lg font-bold text-charcoal group-hover:text-walnut transition-colors">
                        <Link to={`/portfolio/${proj._id}`} className="focus:outline-none">
                          {proj.title}
                        </Link>
                      </h2>

                      <p className="text-xs text-warm-gray line-clamp-3 leading-relaxed">
                        {proj.description}
                      </p>

                      {/* Supplied fields only: location, status, date */}
                      <div className="pt-3 border-t border-hairline/80 space-y-1 font-mono text-[11px] text-warm-gray">
                        {proj.location && (
                          <div className="flex items-center space-x-1.5">
                            <MapPin className="w-3.5 h-3.5 text-walnut shrink-0" />
                            <span>{proj.location}</span>
                          </div>
                        )}
                        {proj.status && (
                          <div className="flex items-center space-x-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-walnut shrink-0" />
                            <span>STATUS: {proj.status}</span>
                          </div>
                        )}
                        {proj.date && (
                          <div className="flex items-center space-x-1.5">
                            <Calendar className="w-3.5 h-3.5 text-warm-gray shrink-0" />
                            <span>{proj.date}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer link */}
                  <div className="px-6 py-3 border-t border-hairline bg-ivory/40 flex items-center justify-between font-mono text-xs">
                    <Link
                      to={`/portfolio/${proj._id}`}
                      className="inline-flex items-center text-charcoal hover:text-walnut font-medium transition-colors"
                    >
                      <span>VIEW LEDGER DETAILS</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <span className="text-[10px] text-warm-gray">
                      REC-{String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default Portfolio;

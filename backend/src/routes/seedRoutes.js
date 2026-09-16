const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Gallery = require('../models/Gallery');
const Service = require('../models/Service');
const { protect } = require('../middleware/auth');
const { defaultServices } = require('../seeds/seedData');

// Sample catalog demo items (clearly marked as material samples)
const sampleProjects = [
  {
    title: 'Acoustic Fluted Walnut Feature Wall',
    category: 'Commercial',
    description: 'CNC toolpath fluted geometric acoustic wall panels routed from 18mm premium American walnut veneer MDF with matte polyurethane protective finish. Fabricated for sound dampening and visual cadence in an executive office setting.',
    images: ['https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80'],
    location: 'Lahore, Pakistan',
    status: 'Fabrication Completed',
    date: 'August 2026'
  },
  {
    title: 'Perforated Geometric Architectural Screen',
    category: 'Residential',
    description: 'Bespoke parametric lattice room divider cut on 3-axis CNC router with 6mm spiral up-cut bit. Crafted from solid white oak boards with hand-beveled edges and natural oil sealer.',
    images: ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'],
    location: 'Lahore, Pakistan',
    status: 'Installation Completed',
    date: 'July 2026'
  },
  {
    title: 'Cantilevered Teak Credenza & Slotted Facade',
    category: 'Renovation',
    description: 'Floating interior sideboard with CNC-milled finger pull details, soft-close hardware cutouts, and concealed wall hanging ledger system. Finished in low-sheen hardwax oil.',
    images: ['https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80'],
    location: 'Lahore, Pakistan',
    status: 'Completed',
    date: 'June 2026'
  }
];

const sampleGallery = [
  {
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80',
    title: 'CNC Fluted Wall Panel Detail',
    category: 'Panels',
    description: 'Router bit stepover 1.5mm, walnut finish'
  },
  {
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    title: 'Geometric Screening Partition',
    category: 'Interiors',
    description: 'White oak lattice screen panel cut on CNC table'
  },
  {
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
    title: 'Custom Credenza Joinery',
    category: 'Furniture',
    description: 'Milled finger joint and hidden ledger structure'
  },
  {
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    title: '3D Relief Timber Ceiling Baffle',
    category: 'Panels',
    description: 'Precision contour cutouts for acoustic optimization'
  },
  {
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    title: 'Curved Reception Desk Substrate',
    category: 'Commercial',
    description: 'Kerf-cut bendable plywood skeleton with walnut facing'
  },
  {
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
    title: 'Precision Mitre & Joint Detail',
    category: 'Detail',
    description: 'Hairline alignment on 45-degree router cut'
  }
];

// @route POST /api/seed/samples
// @desc Seeds sample catalog entries (Protected)
router.post('/samples', protect, async (req, res) => {
  try {
    await Project.deleteMany({});
    await Gallery.deleteMany({});
    await Service.deleteMany({});

    await Service.insertMany(defaultServices);
    await Project.insertMany(sampleProjects);
    await Gallery.insertMany(sampleGallery);

    res.json({
      success: true,
      message: 'Demo ledger data loaded successfully.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route POST /api/seed/clear
// @desc Clears projects and gallery to test strict empty states (Protected)
router.post('/clear', protect, async (req, res) => {
  try {
    await Project.deleteMany({});
    await Gallery.deleteMany({});
    res.json({
      success: true,
      message: 'Projects and Gallery cleared. Empty states are now active.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

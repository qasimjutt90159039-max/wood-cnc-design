const User = require('../models/User');
const Service = require('../models/Service');
const Project = require('../models/Project');
const Gallery = require('../models/Gallery');

const defaultServices = [
  {
    name: 'Custom Interior Woodwork',
    description: 'Precision interior wooden architectural fixtures, tailored wall treatments, bespoke cabinetry, and structural interior timber features engineered to design specifications.',
    image: '',
    active: true,
    order: 1
  },
  {
    name: 'CNC-Cut Panels & Décor Pieces',
    description: 'Computer-controlled router-cut geometric screening, acoustic timber wall patterns, 2D and 3D textured reliefs, and decorative lattice panels fabricated from engineered boards and solid timbers.',
    image: '',
    active: true,
    order: 2
  },
  {
    name: 'Interior Layout & Decor Planning',
    description: 'Spatial wood element coordination, elevation planning, substrate specifications, joint detailing, and material ledger layout for cohesive interior decoration schemes.',
    image: '',
    active: true,
    order: 3
  },
  {
    name: 'Finishing & Installation',
    description: 'Site fitting, hairline joint alignment, precision fastening, and surface finishing application to ensure timber elements sit seamlessly in designated interior spaces.',
    image: '',
    active: true,
    order: 4
  },
  {
    name: 'Custom Furniture Design',
    description: 'Made-to-measure statement desks, conference tables, storage credenzas, and integrated seating structures fabricated with CNC-assisted precision joinery.',
    image: '',
    active: true,
    order: 5
  },
  {
    name: 'Commercial Interiors',
    description: 'Feature reception wall cladding, conference partition screens, branded acoustic wood baffles, and display casework for corporate and retail environments.',
    image: '',
    active: true,
    order: 6
  }
];

const seedInitialData = async () => {
  try {
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      console.log('[RealCNC Seed] MongoDB offline. Skipping DB seed.');
      return;
    }

    // 1. Ensure Admin User exists
    const adminUser = (process.env.ADMIN_USER || 'admin').toLowerCase();
    const adminPass = process.env.ADMIN_PASS || 'realcnc2026!';

    const existingAdmin = await User.findOne({ username: adminUser });
    if (!existingAdmin) {
      await User.create({
        username: adminUser,
        password: adminPass,
        role: 'admin'
      });
      console.log(`[RealCNC Seed] Admin account initialized for: ${adminUser}`);
    }

    // 2. Ensure initial generic services exist if collection is empty
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany(defaultServices);
      console.log('[RealCNC Seed] Default service ledger entries seeded.');
    }
  } catch (error) {
    console.error('[RealCNC Seed Error]', error.message);
  }
};

module.exports = {
  seedInitialData,
  defaultServices
};

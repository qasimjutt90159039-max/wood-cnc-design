const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, 'Image URL or path is required']
    },
    title: {
      type: String,
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
      default: ''
    },
    category: {
      type: String,
      enum: ['Panels', 'Interiors', 'Furniture', 'Detail', 'Other'],
      default: 'Panels'
    },
    description: {
      type: String,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Gallery', GallerySchema);

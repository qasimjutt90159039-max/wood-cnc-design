const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Residential', 'Commercial', 'Renovation', 'Other'],
      default: 'Residential'
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [3000, 'Description cannot exceed 3000 characters']
    },
    images: {
      type: [String],
      default: []
    },
    location: {
      type: String,
      trim: true,
      maxlength: [100, 'Location cannot exceed 100 characters']
    },
    status: {
      type: String,
      trim: true,
      maxlength: [50, 'Status cannot exceed 50 characters']
    },
    date: {
      type: String,
      trim: true,
      maxlength: [50, 'Date cannot exceed 50 characters']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Project', ProjectSchema);

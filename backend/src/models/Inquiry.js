const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      maxlength: [30, 'Phone cannot exceed 30 characters']
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: ''
    },
    subject: {
      type: String,
      trim: true,
      maxlength: [150, 'Subject cannot exceed 150 characters'],
      default: 'General Consultation / Inquiry'
    },
    message: {
      type: String,
      required: [true, 'Message content is required'],
      maxlength: [3000, 'Message cannot exceed 3000 characters']
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      default: null
    },
    status: {
      type: String,
      enum: ['new', 'in-progress', 'replied', 'archived'],
      default: 'new'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Inquiry', InquirySchema);

const Inquiry = require('../models/Inquiry');

// @desc    Submit new inquiry
// @route   POST /api/inquiries
// @access  Public
const createInquiry = async (req, res, next) => {
  try {
    const { name, phone, email, subject, message, projectId } = req.body;

    // Strict validation
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name is required'
      });
    }

    if (!phone || !phone.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required'
      });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Inquiry message is required'
      });
    }

    const inquiry = await Inquiry.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : '',
      subject: subject ? subject.trim() : 'General Consultation / Inquiry',
      message: message.trim(),
      projectId: projectId || null,
      status: 'new'
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully. Wood CNC Design Shop - RealCNC has recorded your request.',
      data: {
        id: inquiry._id,
        name: inquiry.name,
        createdAt: inquiry.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Private (Admin)
const getInquiries = async (req, res, next) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status && status !== 'All') {
      query.status = status;
    }

    const inquiries = await Inquiry.find(query)
      .populate('projectId', 'title category')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update inquiry status
// @route   PUT /api/inquiries/:id
// @access  Private (Admin)
const updateInquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    let inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    inquiry.status = status || inquiry.status;
    await inquiry.save();

    res.json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete inquiry
// @route   DELETE /api/inquiries/:id
// @access  Private (Admin)
const deleteInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: 'Inquiry removed successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry
};

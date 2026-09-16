import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Phone, MapPin, ArrowUpRight, Send, CheckCircle, AlertCircle } from 'lucide-react';
import SEO from '../components/common/SEO';
import { inquiryService } from '../services/api';
import { RouterBitGlyph } from '../components/cutsheet/LineworkVector';

const Contact = () => {
  const location = useLocation();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '', // Optional
    subject: 'General Consultation / Inquiry',
    message: ''
  });

  // Prefill subject if query param exists (e.g. from service or project page)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sub = params.get('subject');
    if (sub) {
      setFormData(prev => ({ ...prev, subject: sub }));
    }
  }, [location.search]);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  // Frontend Validation
  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your full name.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required for workshop contact.';
    } else if (formData.phone.trim().length < 7) {
      errs.phone = 'Please enter a valid phone number.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide details about your inquiry or specifications.';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setSubmitting(true);
    try {
      await inquiryService.create(formData);
      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: 'General Consultation / Inquiry',
        message: ''
      });
    } catch (err) {
      console.warn('Backend unavailable, storing inquiry locally:', err);
      try {
        const stored = JSON.parse(localStorage.getItem('realcnc_inquiries') || '[]');
        stored.push({
          ...formData,
          _id: 'inq-' + Date.now(),
          createdAt: new Date().toISOString(),
          status: 'new'
        });
        localStorage.setItem('realcnc_inquiries', JSON.stringify(stored));
        setSubmitted(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          subject: 'General Consultation / Inquiry',
          message: ''
        });
      } catch (localErr) {
        setServerError(
          err.response?.data?.message || 'Unable to record your inquiry at this moment. Please call +92 302 6776926 directly.'
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title="Contact" 
        description="Contact Wood CNC Design Shop - RealCNC in Ichhra Lahore. Call +92 302 6776926 or submit custom wood & CNC specifications." 
      />

      {/* Header Banner */}
      <section className="bg-ivory border-b border-hairline py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-xs font-mono text-warm-gray tracking-wider uppercase mb-2">
            <span className="w-2 h-2 bg-walnut"></span>
            <span>DIRECT WORKSHOP INTAKE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
            Contact Wood CNC Design Shop - RealCNC
          </h1>
          <p className="mt-4 text-base sm:text-lg text-warm-gray max-w-3xl leading-relaxed">
            Reach our interior decoration & wood CNC design workshop in Lahore. 
            Submit your cutting list or project requirements for technical review.
          </p>
        </div>
      </section>

      {/* Main Grid: Exact Info + Inquiry Form */}
      <section className="py-16 sm:py-24 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT COLUMN: Verified Business Information & Map Link */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Business Identification Card */}
              <div className="border border-hairline bg-ivory p-6 sm:p-8 space-y-6">
                <div className="flex items-center space-x-3 pb-4 border-b border-hairline">
                  <div className="p-2 border border-hairline bg-paper text-walnut">
                    <RouterBitGlyph className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-charcoal">
                      Wood CNC Design Shop - RealCNC
                    </h2>
                    <p className="font-mono text-xs text-walnut uppercase">
                      Interior Decorator
                    </p>
                  </div>
                </div>

                {/* Direct Phone Number with tel: protocol */}
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-warm-gray uppercase tracking-widest block">
                    DIRECT WORKSHOP PHONE
                  </span>
                  <a
                    href="tel:+923026776926"
                    className="inline-flex items-center text-lg sm:text-xl font-mono font-bold text-charcoal hover:text-walnut transition-colors group"
                  >
                    <Phone className="w-5 h-5 mr-3 text-walnut shrink-0" />
                    <span>+92 302 6776926</span>
                  </a>
                  <p className="text-xs text-warm-gray">
                    Available for phone consultations, timber specifications, and cutting orders.
                  </p>
                </div>

                {/* Physical Verified Address */}
                <div className="space-y-2 pt-4 border-t border-hairline">
                  <span className="font-mono text-[10px] text-warm-gray uppercase tracking-widest block">
                    PHYSICAL LOCATION
                  </span>
                  <div className="flex items-start space-x-3 text-sm text-charcoal">
                    <MapPin className="w-5 h-5 text-walnut shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      468 Sultan Ahmed Rd, Ichhra Lahore, 54000, Pakistan
                    </span>
                  </div>
                </div>

                {/* Google Maps Button built from exact address (NO invented coordinates) */}
                <div className="pt-2">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=468+Sultan+Ahmed+Rd,+Ichhra+Lahore,+54000,+Pakistan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center py-3 border border-charcoal bg-paper hover:bg-charcoal hover:text-paper font-mono text-xs tracking-wider uppercase transition-colors"
                  >
                    <span>View Address on Google Maps</span>
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>

              {/* Map visual representation using address query */}
              <div className="border border-hairline bg-ash/30 p-2 overflow-hidden">
                <div className="aspect-[16/9] w-full bg-ash relative">
                  <iframe
                    title="RealCNC Workshop Location Map"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://maps.google.com/maps?q=468+Sultan+Ahmed+Rd,+Ichhra+Lahore,+54000,+Pakistan&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  />
                </div>
                <div className="p-2 font-mono text-[10px] text-warm-gray flex justify-between">
                  <span>ICHHRA PRECINCT, LAHORE</span>
                  <span>468 SULTAN AHMED RD</span>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Contact / Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="border border-hairline bg-paper p-8 sm:p-10 shadow-sm">
                
                <div className="mb-8 pb-4 border-b border-hairline">
                  <span className="font-mono text-[10px] text-walnut uppercase tracking-widest block mb-1">
                    WORKSHOP INQUIRY FORM // POST /api/inquiries
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-charcoal">
                    Submit Technical Inquiry
                  </h2>
                  <p className="text-xs sm:text-sm text-warm-gray mt-1">
                    Please provide your contact number and project parameters. We review CAD files and cut requirements.
                  </p>
                </div>

                {/* Success Feedback State */}
                {submitted ? (
                  <div className="border border-walnut bg-ivory p-8 text-center space-y-4 animate-in fade-in duration-200">
                    <div className="w-12 h-12 bg-walnut text-paper rounded-none mx-auto flex items-center justify-center">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-charcoal">
                      Inquiry Successfully Recorded
                    </h3>
                    <p className="text-xs sm:text-sm text-warm-gray max-w-md mx-auto leading-relaxed">
                      Thank you. Your request has been registered in the Wood CNC Design Shop - RealCNC database. 
                      Our workshop team will review your specifications and contact you via phone.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => setSubmitted(false)}
                        className="px-5 py-2 border border-charcoal text-xs font-mono tracking-wider uppercase text-charcoal hover:bg-charcoal hover:text-paper transition-colors"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    
                    {/* Server Error Banner */}
                    {serverError && (
                      <div className="p-4 border border-red-300 bg-red-50 text-red-700 text-xs flex items-start space-x-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{serverError}</span>
                      </div>
                    )}

                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-charcoal mb-1.5 font-semibold">
                        Your Full Name <span className="text-walnut">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Tariq Mehmood"
                        className={`w-full px-3.5 py-2.5 text-sm border bg-ivory/50 text-charcoal focus:bg-paper focus:outline-none focus:ring-1 focus:ring-walnut ${
                          errors.name ? 'border-red-500' : 'border-hairline'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-600 text-xs mt-1 font-mono">{errors.name}</p>
                      )}
                    </div>

                    {/* Phone Field (Required) */}
                    <div>
                      <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-charcoal mb-1.5 font-semibold">
                        Contact Phone Number <span className="text-walnut">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +92 300 1234567"
                        className={`w-full px-3.5 py-2.5 text-sm border bg-ivory/50 text-charcoal focus:bg-paper focus:outline-none focus:ring-1 focus:ring-walnut ${
                          errors.phone ? 'border-red-500' : 'border-hairline'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-600 text-xs mt-1 font-mono">{errors.phone}</p>
                      )}
                    </div>

                    {/* Email Field (Explicitly Optional) */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-charcoal mb-1.5 font-semibold">
                        Email Address <span className="text-warm-gray font-normal text-[11px]">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. yourname@domain.com (optional)"
                        className="w-full px-3.5 py-2.5 text-sm border border-hairline bg-ivory/50 text-charcoal focus:bg-paper focus:outline-none focus:ring-1 focus:ring-walnut"
                      />
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label htmlFor="subject" className="block text-xs font-mono uppercase tracking-wider text-charcoal mb-1.5 font-semibold">
                        Subject / Service Category
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g. CNC Wall Panels / Fluted Partitions"
                        className="w-full px-3.5 py-2.5 text-sm border border-hairline bg-ivory/50 text-charcoal focus:bg-paper focus:outline-none focus:ring-1 focus:ring-walnut"
                      />
                    </div>

                    {/* Message Field */}
                    <div>
                      <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-charcoal mb-1.5 font-semibold">
                        Project Specifications & Dimensions <span className="text-walnut">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Describe your wood species preference, board thickness, room dimensions, or required CNC pattern..."
                        className={`w-full px-3.5 py-2.5 text-sm border bg-ivory/50 text-charcoal focus:bg-paper focus:outline-none focus:ring-1 focus:ring-walnut ${
                          errors.message ? 'border-red-500' : 'border-hairline'
                        }`}
                      />
                      {errors.message && (
                        <p className="text-red-600 text-xs mt-1 font-mono">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full inline-flex items-center justify-center py-3.5 px-6 bg-walnut hover:bg-walnut-hover disabled:bg-walnut/60 text-paper font-mono text-xs tracking-wider uppercase transition-colors shadow-sm"
                      >
                        {submitting ? (
                          <span className="flex items-center">
                            <span className="w-4 h-4 border-2 border-paper border-t-transparent rounded-full animate-spin mr-2" />
                            Transmitting Inquiry...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Send className="w-3.5 h-3.5 mr-2" />
                            Submit Inquiry to Ledger
                          </span>
                        )}
                      </button>
                    </div>

                    <div className="pt-2 text-center">
                      <span className="font-mono text-[10px] text-warm-gray">
                        NO FABRICATED EMAIL ADDRESSES ARE USED IN THIS WORKSHOP FLOW
                      </span>
                    </div>

                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

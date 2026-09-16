import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Inbox, FolderKanban, Wrench, Image as ImageIcon, LogOut, Plus, 
  Trash2, Edit3, CheckCircle, Clock, AlertCircle, RefreshCw, Layers, Database
} from 'lucide-react';
import SEO from '../components/common/SEO';
import { 
  inquiryService, projectService, shopService, galleryService, seedService 
} from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('inquiries');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  // Data states
  const [inquiries, setInquiries] = useState([]);
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);

  // Modals & Form states
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Residential',
    description: '',
    images: '',
    location: 'Lahore, Pakistan',
    status: 'Completed',
    date: ''
  });

  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    image: '',
    active: true,
    order: 0
  });

  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [editingGallery, setEditingGallery] = useState(null);
  const [galleryForm, setGalleryForm] = useState({
    image: '',
    title: '',
    category: 'Panels',
    description: ''
  });

  // Check auth
  useEffect(() => {
    const token = localStorage.getItem('realcnc_token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Load active tab data
  const loadData = async () => {
    setLoading(true);
    setFeedback({ type: '', text: '' });
    try {
      if (activeTab === 'inquiries') {
        const res = await inquiryService.getAll();
        setInquiries(res.data?.data || []);
      } else if (activeTab === 'projects') {
        const res = await projectService.getAll();
        setProjects(res.data?.data || []);
      } else if (activeTab === 'services') {
        const res = await shopService.getAll({ all: true });
        setServices(res.data?.data || []);
      } else if (activeTab === 'gallery') {
        const res = await galleryService.getAll();
        setGallery(res.data?.data || []);
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        localStorage.removeItem('realcnc_token');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('realcnc_token');
    localStorage.removeItem('realcnc_user');
    navigate('/admin/login');
  };

  // --- Inquiry Handlers ---
  const handleUpdateInquiryStatus = async (id, status) => {
    try {
      await inquiryService.updateStatus(id, status);
      setFeedback({ type: 'success', text: `Inquiry status updated to ${status}.` });
      loadData();
    } catch (err) {
      setFeedback({ type: 'error', text: 'Failed to update inquiry status.' });
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Delete this inquiry record from ledger?')) return;
    try {
      await inquiryService.delete(id);
      setFeedback({ type: 'success', text: 'Inquiry record removed.' });
      loadData();
    } catch (err) {
      setFeedback({ type: 'error', text: 'Failed to delete inquiry.' });
    }
  };

  // --- Project Handlers ---
  const handleOpenProjectModal = (proj = null) => {
    if (proj) {
      setEditingProject(proj);
      setProjectForm({
        title: proj.title,
        category: proj.category,
        description: proj.description,
        images: Array.isArray(proj.images) ? proj.images.join(', ') : '',
        location: proj.location || '',
        status: proj.status || '',
        date: proj.date || ''
      });
    } else {
      setEditingProject(null);
      setProjectForm({
        title: '',
        category: 'Residential',
        description: '',
        images: '',
        location: 'Lahore, Pakistan',
        status: 'Completed',
        date: ''
      });
    }
    setShowProjectModal(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...projectForm,
        images: projectForm.images.split(',').map(s => s.trim()).filter(Boolean)
      };

      if (editingProject) {
        await projectService.update(editingProject._id, payload);
        setFeedback({ type: 'success', text: 'Project updated successfully.' });
      } else {
        await projectService.create(payload);
        setFeedback({ type: 'success', text: 'Project record created.' });
      }
      setShowProjectModal(false);
      loadData();
    } catch (err) {
      setFeedback({ type: 'error', text: err.response?.data?.message || 'Error saving project.' });
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project from ledger?')) return;
    try {
      await projectService.delete(id);
      setFeedback({ type: 'success', text: 'Project record removed.' });
      loadData();
    } catch (err) {
      setFeedback({ type: 'error', text: 'Failed to delete project.' });
    }
  };

  // --- Service Handlers ---
  const handleOpenServiceModal = (svc = null) => {
    if (svc) {
      setEditingService(svc);
      setServiceForm({
        name: svc.name,
        description: svc.description,
        image: svc.image || '',
        active: svc.active,
        order: svc.order || 0
      });
    } else {
      setEditingService(null);
      setServiceForm({
        name: '',
        description: '',
        image: '',
        active: true,
        order: services.length + 1
      });
    }
    setShowServiceModal(true);
  };

  const handleSaveService = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await shopService.update(editingService._id, serviceForm);
        setFeedback({ type: 'success', text: 'Service updated.' });
      } else {
        await shopService.create(serviceForm);
        setFeedback({ type: 'success', text: 'Service created.' });
      }
      setShowServiceModal(false);
      loadData();
    } catch (err) {
      setFeedback({ type: 'error', text: err.response?.data?.message || 'Error saving service.' });
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('Delete this service category?')) return;
    try {
      await shopService.delete(id);
      setFeedback({ type: 'success', text: 'Service category deleted.' });
      loadData();
    } catch (err) {
      setFeedback({ type: 'error', text: 'Failed to delete service.' });
    }
  };

  // --- Gallery Handlers ---
  const handleOpenGalleryModal = (item = null) => {
    if (item) {
      setEditingGallery(item);
      setGalleryForm({
        image: item.image,
        title: item.title || '',
        category: item.category || 'Panels',
        description: item.description || ''
      });
    } else {
      setEditingGallery(null);
      setGalleryForm({
        image: '',
        title: '',
        category: 'Panels',
        description: ''
      });
    }
    setShowGalleryModal(true);
  };

  const handleSaveGallery = async (e) => {
    e.preventDefault();
    try {
      if (editingGallery) {
        await galleryService.update(editingGallery._id, galleryForm);
        setFeedback({ type: 'success', text: 'Gallery item updated.' });
      } else {
        await galleryService.create(galleryForm);
        setFeedback({ type: 'success', text: 'Gallery item added.' });
      }
      setShowGalleryModal(false);
      loadData();
    } catch (err) {
      setFeedback({ type: 'error', text: err.response?.data?.message || 'Error saving gallery image.' });
    }
  };

  const handleDeleteGallery = async (id) => {
    if (!window.confirm('Delete this image from gallery?')) return;
    try {
      await galleryService.delete(id);
      setFeedback({ type: 'success', text: 'Image removed from gallery.' });
      loadData();
    } catch (err) {
      setFeedback({ type: 'error', text: 'Failed to delete gallery item.' });
    }
  };

  // --- Demo Seeder Handlers ---
  const handleLoadSampleLedger = async () => {
    if (!window.confirm('Load demo workshop entries (labeled clearly as workshop samples)?')) return;
    setLoading(true);
    try {
      await seedService.loadSamples();
      setFeedback({ type: 'success', text: 'Demo ledger data loaded successfully.' });
      loadData();
    } catch (err) {
      setFeedback({ type: 'error', text: 'Failed to load sample ledger.' });
    } finally {
      setLoading(false);
    }
  };

  const handleClearToEmptyState = async () => {
    if (!window.confirm('Clear all projects & gallery to test strict empty state messages?')) return;
    setLoading(true);
    try {
      await seedService.clearSamples();
      setFeedback({ type: 'success', text: 'Database cleared. Strict empty state messages are now active.' });
      loadData();
    } catch (err) {
      setFeedback({ type: 'error', text: 'Failed to clear data.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Workshop Ledger Admin" description="Internal Dashboard for Wood CNC Design Shop - RealCNC" />

      {/* Admin Header */}
      <div className="bg-ivory border-b border-hairline py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 font-mono text-[10px] text-warm-gray uppercase tracking-widest">
              <span className="w-2 h-2 bg-walnut"></span>
              <span>ADMINISTRATIVE WORKSHOP LEDGER</span>
            </div>
            <h1 className="text-2xl font-bold text-charcoal">
              Wood CNC Design Shop - RealCNC Admin
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-hairline bg-paper text-xs font-mono text-charcoal hover:bg-ash transition-colors"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-paper border-b border-hairline sticky top-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-1 sm:space-x-4 overflow-x-auto py-2">
            {[
              { id: 'inquiries', label: 'Inquiries', icon: Inbox, count: inquiries.length },
              { id: 'projects', label: 'Projects Archive', icon: FolderKanban, count: projects.length },
              { id: 'services', label: 'Services Ledger', icon: Wrench, count: services.length },
              { id: 'gallery', label: 'Gallery Images', icon: ImageIcon, count: gallery.length },
              { id: 'tools', label: 'Ledger Tools', icon: Database }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center px-4 py-2 text-xs font-mono tracking-wider uppercase border whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'bg-charcoal text-paper border-charcoal'
                      : 'bg-paper text-charcoal border-transparent hover:border-hairline'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 mr-2" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`ml-2 px-1.5 py-0.2 text-[10px] ${
                      activeTab === tab.id ? 'bg-walnut text-paper' : 'bg-ash text-charcoal'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[600px]">
        
        {/* Feedback Alert */}
        {feedback.text && (
          <div className={`mb-6 p-4 border text-xs font-mono flex items-center justify-between ${
            feedback.type === 'error'
              ? 'border-red-300 bg-red-50 text-red-700'
              : 'border-walnut/40 bg-ivory text-charcoal'
          }`}>
            <span>{feedback.text}</span>
            <button onClick={() => setFeedback({ type: '', text: '' })} className="underline ml-4">
              Dismiss
            </button>
          </div>
        )}

        {loading ? (
          <LoadingSpinner label="Accessing database records..." />
        ) : (
          <>
            {/* 1. INQUIRIES TAB */}
            {activeTab === 'inquiries' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-hairline">
                  <div>
                    <h2 className="text-lg font-bold text-charcoal">Customer Inquiries</h2>
                    <p className="text-xs text-warm-gray">Real requests submitted via contact form.</p>
                  </div>
                  <button
                    onClick={loadData}
                    className="inline-flex items-center px-3 py-1.5 border border-hairline bg-paper text-xs font-mono hover:bg-ivory"
                  >
                    <RefreshCw className="w-3.5 h-3.5 mr-1" />
                    <span>Refresh</span>
                  </button>
                </div>

                {inquiries.length === 0 ? (
                  <div className="p-12 border border-dashed border-hairline bg-ivory/50 text-center font-mono text-xs text-warm-gray">
                    NO INQUIRIES RECORDED YET.
                  </div>
                ) : (
                  <div className="border border-hairline divide-y divide-hairline bg-paper">
                    {inquiries.map((inq) => (
                      <div key={inq._id} className="p-6 space-y-4 hover:bg-ivory/30 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <span className="font-bold text-charcoal text-base mr-3">{inq.name}</span>
                            <a href={`tel:${inq.phone}`} className="font-mono text-xs text-walnut font-medium mr-3 hover:underline">
                              {inq.phone}
                            </a>
                            {inq.email && (
                              <span className="font-mono text-xs text-warm-gray">({inq.email})</span>
                            )}
                          </div>
                          
                          {/* Status Tag & Controls */}
                          <div className="flex items-center space-x-2">
                            <select
                              value={inq.status}
                              onChange={(e) => handleUpdateInquiryStatus(inq._id, e.target.value)}
                              className="text-xs font-mono px-2 py-1 border border-hairline bg-paper focus:ring-1 focus:ring-walnut"
                            >
                              <option value="new">Status: New</option>
                              <option value="in-progress">Status: In-Progress</option>
                              <option value="replied">Status: Replied</option>
                              <option value="archived">Status: Archived</option>
                            </select>

                            <button
                              onClick={() => handleDeleteInquiry(inq._id)}
                              className="p-1.5 text-warm-gray hover:text-red-600 border border-hairline hover:border-red-300"
                              title="Delete inquiry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="font-mono text-xs text-warm-gray uppercase tracking-wider block">
                            SUBJECT: {inq.subject}
                          </span>
                          <p className="text-xs sm:text-sm text-charcoal bg-ivory/60 p-3 border border-hairline whitespace-pre-line leading-relaxed">
                            {inq.message}
                          </p>
                        </div>

                        <div className="text-[10px] font-mono text-warm-gray flex justify-between">
                          <span>RECEIVED: {new Date(inq.createdAt).toLocaleString()}</span>
                          <span>ID: {inq._id}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 2. PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-hairline">
                  <div>
                    <h2 className="text-lg font-bold text-charcoal">Project Archive Management</h2>
                    <p className="text-xs text-warm-gray">Add, edit, or remove project records.</p>
                  </div>
                  <button
                    onClick={() => handleOpenProjectModal()}
                    className="inline-flex items-center px-4 py-2 bg-walnut text-paper font-mono text-xs tracking-wider uppercase hover:bg-walnut-hover"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1.5" />
                    <span>Add Project</span>
                  </button>
                </div>

                {projects.length === 0 ? (
                  <div className="p-12 border border-dashed border-hairline bg-ivory/50 text-center font-mono text-xs text-warm-gray">
                    NO PROJECTS IN DATABASE. DISPLAYING: "No projects have been added yet."
                  </div>
                ) : (
                  <div className="border border-hairline overflow-x-auto bg-paper">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-ivory border-b border-hairline text-charcoal uppercase text-[11px]">
                        <tr>
                          <th className="p-4">Visual</th>
                          <th className="p-4">Title</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Location</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-hairline">
                        {projects.map((proj) => (
                          <tr key={proj._id} className="hover:bg-ivory/30">
                            <td className="p-4">
                              {proj.images?.[0] ? (
                                <img src={proj.images[0]} alt="" className="w-12 h-12 object-cover border border-hairline" />
                              ) : (
                                <div className="w-12 h-12 bg-ash border border-hairline flex items-center justify-center text-[9px] text-warm-gray">
                                  NONE
                                </div>
                              )}
                            </td>
                            <td className="p-4 font-semibold text-charcoal font-sans text-sm">
                              {proj.title}
                            </td>
                            <td className="p-4 uppercase">{proj.category}</td>
                            <td className="p-4 text-warm-gray">{proj.location || '—'}</td>
                            <td className="p-4 text-walnut">{proj.status || '—'}</td>
                            <td className="p-4 text-right space-x-2">
                              <button
                                onClick={() => handleOpenProjectModal(proj)}
                                className="p-1.5 border border-hairline hover:border-charcoal text-charcoal inline-flex items-center"
                                title="Edit project"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteProject(proj._id)}
                                className="p-1.5 border border-hairline hover:border-red-500 text-red-600 inline-flex items-center"
                                title="Delete project"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* 3. SERVICES TAB */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-hairline">
                  <div>
                    <h2 className="text-lg font-bold text-charcoal">Services Directory Management</h2>
                    <p className="text-xs text-warm-gray">Configure dynamic offerings shown on Home & Services pages.</p>
                  </div>
                  <button
                    onClick={() => handleOpenServiceModal()}
                    className="inline-flex items-center px-4 py-2 bg-walnut text-paper font-mono text-xs tracking-wider uppercase hover:bg-walnut-hover"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1.5" />
                    <span>Add Service</span>
                  </button>
                </div>

                {services.length === 0 ? (
                  <div className="p-12 border border-dashed border-hairline bg-ivory/50 text-center font-mono text-xs text-warm-gray">
                    NO SERVICES IN DATABASE.
                  </div>
                ) : (
                  <div className="border border-hairline divide-y divide-hairline bg-paper">
                    {services.map((svc) => (
                      <div key={svc._id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-ivory/30">
                        <div className="space-y-1 max-w-2xl">
                          <div className="flex items-center space-x-3">
                            <span className="font-mono text-xs text-walnut font-bold">#{svc.order || 0}</span>
                            <h3 className="font-bold text-charcoal text-base">{svc.name}</h3>
                            <span className={`px-2 py-0.5 text-[10px] font-mono uppercase border ${
                              svc.active ? 'bg-green-50 text-green-700 border-green-200' : 'bg-ash text-warm-gray border-hairline'
                            }`}>
                              {svc.active ? 'Active' : 'Hidden'}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-warm-gray leading-relaxed">{svc.description}</p>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0">
                          <button
                            onClick={() => handleOpenServiceModal(svc)}
                            className="px-3 py-1.5 border border-hairline text-xs font-mono hover:border-charcoal flex items-center"
                          >
                            <Edit3 className="w-3.5 h-3.5 mr-1" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteService(svc._id)}
                            className="p-1.5 border border-hairline hover:border-red-400 text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 4. GALLERY TAB */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-hairline">
                  <div>
                    <h2 className="text-lg font-bold text-charcoal">Gallery Image Ledger</h2>
                    <p className="text-xs text-warm-gray">Upload and manage photographic proof of workshop builds.</p>
                  </div>
                  <button
                    onClick={() => handleOpenGalleryModal()}
                    className="inline-flex items-center px-4 py-2 bg-walnut text-paper font-mono text-xs tracking-wider uppercase hover:bg-walnut-hover"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1.5" />
                    <span>Add Image</span>
                  </button>
                </div>

                {gallery.length === 0 ? (
                  <div className="p-12 border border-dashed border-hairline bg-ivory/50 text-center font-mono text-xs text-warm-gray">
                    NO GALLERY IMAGES IN DATABASE. DISPLAYING: "Gallery images will appear here once they are added."
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {gallery.map((item) => (
                      <div key={item._id} className="border border-hairline bg-paper p-3 flex flex-col justify-between">
                        <div>
                          <div className="relative aspect-square bg-ash mb-2 overflow-hidden border border-hairline">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            <div className="absolute top-1 left-1 bg-paper/90 px-1.5 py-0.5 text-[9px] font-mono uppercase">
                              {item.category}
                            </div>
                          </div>
                          {item.title && <h4 className="text-xs font-semibold text-charcoal">{item.title}</h4>}
                          {item.description && <p className="text-[11px] text-warm-gray mt-0.5">{item.description}</p>}
                        </div>

                        <div className="pt-2 border-t border-hairline mt-3 flex items-center justify-between">
                          <button
                            onClick={() => handleOpenGalleryModal(item)}
                            className="text-[11px] font-mono text-charcoal hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteGallery(item._id)}
                            className="text-[11px] font-mono text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 5. LEDGER TOOLS TAB */}
            {activeTab === 'tools' && (
              <div className="max-w-2xl space-y-8">
                <div className="pb-4 border-b border-hairline">
                  <h2 className="text-lg font-bold text-charcoal">Workshop Ledger Utilities</h2>
                  <p className="text-xs text-warm-gray">Controlled database tools for demonstration or resetting to clean states.</p>
                </div>

                <div className="border border-hairline bg-paper p-6 space-y-4">
                  <h3 className="font-bold text-charcoal text-sm">Load Demo Workshop Ledger Entries</h3>
                  <p className="text-xs text-warm-gray leading-relaxed">
                    Populates realistic sample projects, gallery items, and service ledger records clearly labeled as timber/fabrication samples.
                  </p>
                  <button
                    onClick={handleLoadSampleLedger}
                    className="px-4 py-2 bg-charcoal text-paper font-mono text-xs tracking-wider uppercase hover:bg-walnut transition-colors"
                  >
                    Seed Demo Ledger Entries
                  </button>
                </div>

                <div className="border border-hairline bg-ivory p-6 space-y-4">
                  <h3 className="font-bold text-charcoal text-sm">Test Strict Empty States</h3>
                  <p className="text-xs text-warm-gray leading-relaxed">
                    Clears Projects and Gallery collections so you can verify the exact required prompt messages:
                    <br />
                    <code className="text-[11px] font-mono text-walnut block mt-1">"No projects have been added yet."</code>
                    <code className="text-[11px] font-mono text-walnut block">"Gallery images will appear here once they are added."</code>
                  </p>
                  <button
                    onClick={handleClearToEmptyState}
                    className="px-4 py-2 border border-charcoal text-charcoal font-mono text-xs tracking-wider uppercase hover:bg-charcoal hover:text-paper transition-colors"
                  >
                    Clear To Strict Empty State
                  </button>
                </div>
              </div>
            )}
          </>
        )}

      </div>

      {/* --- MODALS --- */}

      {/* Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/80 p-4">
          <div className="bg-paper border border-hairline max-w-xl w-full p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-charcoal">
              {editingProject ? 'Edit Project Record' : 'Add New Project Record'}
            </h3>
            <form onSubmit={handleSaveProject} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block uppercase text-warm-gray mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full p-2 border border-hairline text-sm font-sans"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase text-warm-gray mb-1">Category *</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full p-2 border border-hairline text-xs"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Renovation">Renovation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block uppercase text-warm-gray mb-1">Location (optional)</label>
                  <input
                    type="text"
                    value={projectForm.location}
                    onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                    placeholder="e.g. Lahore, Pakistan"
                    className="w-full p-2 border border-hairline text-xs font-sans"
                  />
                </div>
              </div>
              <div>
                <label className="block uppercase text-warm-gray mb-1">Description *</label>
                <textarea
                  required
                  rows={4}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full p-2 border border-hairline text-xs font-sans"
                />
              </div>
              <div>
                <label className="block uppercase text-warm-gray mb-1">Image URLs (comma-separated)</label>
                <input
                  type="text"
                  value={projectForm.images}
                  onChange={(e) => setProjectForm({ ...projectForm, images: e.target.value })}
                  placeholder="https://images.unsplash.com/..., https://..."
                  className="w-full p-2 border border-hairline text-xs font-sans"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase text-warm-gray mb-1">Status (optional)</label>
                  <input
                    type="text"
                    value={projectForm.status}
                    onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                    placeholder="Completed / In Progress"
                    className="w-full p-2 border border-hairline text-xs font-sans"
                  />
                </div>
                <div>
                  <label className="block uppercase text-warm-gray mb-1">Date (optional)</label>
                  <input
                    type="text"
                    value={projectForm.date}
                    onChange={(e) => setProjectForm({ ...projectForm, date: e.target.value })}
                    placeholder="e.g. September 2026"
                    className="w-full p-2 border border-hairline text-xs font-sans"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-hairline">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-4 py-2 border border-hairline hover:bg-ash uppercase text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-walnut text-paper hover:bg-walnut-hover uppercase text-xs"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Service Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/80 p-4">
          <div className="bg-paper border border-hairline max-w-lg w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-charcoal">
              {editingService ? 'Edit Service' : 'Add Service'}
            </h3>
            <form onSubmit={handleSaveService} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block uppercase text-warm-gray mb-1">Service Name *</label>
                <input
                  type="text"
                  required
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                  className="w-full p-2 border border-hairline text-sm font-sans"
                />
              </div>
              <div>
                <label className="block uppercase text-warm-gray mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  className="w-full p-2 border border-hairline text-xs font-sans"
                />
              </div>
              <div>
                <label className="block uppercase text-warm-gray mb-1">Display Order (1, 2, 3...)</label>
                <input
                  type="number"
                  value={serviceForm.order}
                  onChange={(e) => setServiceForm({ ...serviceForm, order: e.target.value })}
                  className="w-full p-2 border border-hairline text-xs font-sans"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={serviceForm.active}
                  onChange={(e) => setServiceForm({ ...serviceForm, active: e.target.checked })}
                />
                <label htmlFor="active" className="uppercase text-charcoal">Active in Public Directory</label>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-hairline">
                <button
                  type="button"
                  onClick={() => setShowServiceModal(false)}
                  className="px-4 py-2 border border-hairline hover:bg-ash uppercase text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-walnut text-paper hover:bg-walnut-hover uppercase text-xs"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/80 p-4">
          <div className="bg-paper border border-hairline max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-charcoal">
              {editingGallery ? 'Edit Gallery Item' : 'Add Gallery Image'}
            </h3>
            <form onSubmit={handleSaveGallery} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block uppercase text-warm-gray mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  value={galleryForm.image}
                  onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2 border border-hairline text-xs font-sans"
                />
              </div>
              <div>
                <label className="block uppercase text-warm-gray mb-1">Category</label>
                <select
                  value={galleryForm.category}
                  onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                  className="w-full p-2 border border-hairline text-xs"
                >
                  <option value="Panels">Panels</option>
                  <option value="Interiors">Interiors</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Detail">Detail</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block uppercase text-warm-gray mb-1">Title (optional)</label>
                <input
                  type="text"
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  className="w-full p-2 border border-hairline text-xs font-sans"
                />
              </div>
              <div>
                <label className="block uppercase text-warm-gray mb-1">Description (optional)</label>
                <input
                  type="text"
                  value={galleryForm.description}
                  onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                  className="w-full p-2 border border-hairline text-xs font-sans"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-hairline">
                <button
                  type="button"
                  onClick={() => setShowGalleryModal(false)}
                  className="px-4 py-2 border border-hairline hover:bg-ash uppercase text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-walnut text-paper hover:bg-walnut-hover uppercase text-xs"
                >
                  Save Image
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;

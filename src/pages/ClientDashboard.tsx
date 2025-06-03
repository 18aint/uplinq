import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import RequestEditsForm from '../components/RequestEditsForm';
import UploadArea from '../components/UploadArea';

interface ClientData {
  name: string;
  email: string;
  loginTime: string;
  projectStatus: string;
  websiteUrl: string;
}

const ClientDashboard = () => {
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedClientData = localStorage.getItem('uplinq-client');
    if (!storedClientData) {
      navigate('/client-login');
      return;
    }
    
    setClientData(JSON.parse(storedClientData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('uplinq-client');
    navigate('/client-login');
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Live':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending Feedback':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Revisions Requested':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Timeline steps
  const timelineSteps = [
    { name: 'Discovery', completed: true },
    { name: 'Design', completed: true },
    { name: 'Development', completed: true },
    { name: 'Review', completed: false, current: true },
    { name: 'Live', completed: false }
  ];

  if (!clientData) {
    return (
      <div className="min-h-screen bg-[#f9fbfd] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fbfd]">
      <SEO
        title="Client Dashboard | Uplinq Digital"
        description="View your project progress, request changes, and communicate with your development team"
        keywords="client dashboard, project progress, Uplinq Digital client portal"
        canonicalUrl="https://uplinq.digital/client-dashboard"
      />

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="/logo-uplinq.png" 
                alt="Uplinq Digital" 
                className="h-6 w-auto"
              />
              <span className="ml-2 text-xl font-medium text-gray-900">
                Uplinq Digital
              </span>
            </div>

            {/* Welcome + Logout */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {clientData.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Project Overview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-2xl font-light text-gray-900 mb-6">Project Overview</h2>
              
              <div className="space-y-6">
                {/* Website URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Live Website
                  </label>
                  <a
                    href={clientData.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {clientData.websiteUrl}
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                {/* Status Badge */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Status
                  </label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadgeColor(clientData.projectStatus)}`}>
                    {clientData.projectStatus}
                  </span>
                </div>

                {/* Timeline */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Project Timeline
                  </label>
                  <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                    {timelineSteps.map((step, index) => (
                      <div key={step.name} className="flex items-center flex-shrink-0">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 ${
                            step.completed 
                              ? 'bg-green-500 border-green-500 text-white' 
                              : step.current
                              ? 'bg-blue-500 border-blue-500 text-white'
                              : 'bg-gray-100 border-gray-300 text-gray-400'
                          }`}>
                            {step.completed ? '✓' : index + 1}
                          </div>
                          <span className={`mt-2 text-xs font-medium ${
                            step.completed || step.current ? 'text-gray-900' : 'text-gray-400'
                          }`}>
                            {step.name}
                          </span>
                        </div>
                        {index < timelineSteps.length - 1 && (
                          <div className={`w-12 h-0.5 mx-2 ${
                            step.completed ? 'bg-green-500' : 'bg-gray-200'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Request Edits */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-2xl font-light text-gray-900 mb-6">Request Changes</h2>
              <RequestEditsForm />
            </motion.section>

          </div>

          {/* Right Column */}
          <div className="space-y-8">
            
            {/* Upload Assets */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-light text-gray-900 mb-6">Upload Assets</h2>
              <UploadArea />
            </motion.section>

            {/* Message From Developer */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-light text-gray-900 mb-4">Message From Developer</h2>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-blue-800 text-sm leading-relaxed">
                  Thanks for your feedback! We're implementing the changes you requested. 
                  The updated homepage design will be ready for review by Friday. 
                  Please let us know if you have any questions.
                </p>
                <div className="mt-3 text-xs text-blue-600">
                  - Wayne, Lead Developer
                </div>
              </div>
            </motion.section>

            {/* Quick Links */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-light text-gray-900 mb-4">Quick Links</h2>
              <div className="space-y-3">
                <a
                  href="https://calendly.com/wayne-uplinq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <span className="text-gray-700 group-hover:text-gray-900">Book a handoff call</span>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                
                <a
                  href="https://www.loom.com/share/placeholder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <span className="text-gray-700 group-hover:text-gray-900">Rewatch onboarding video</span>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a1.5 1.5 0 011.5 1.5v1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a>
              </div>
            </motion.section>

          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard; 
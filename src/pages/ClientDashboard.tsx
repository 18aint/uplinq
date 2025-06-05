import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import DashboardHome from '../components/dashboard/DashboardHome';
import ProjectsView from '../components/dashboard/ProjectsView';
import AssetsView from '../components/dashboard/AssetsView';
import RequestsView from '../components/dashboard/RequestsView';
import MessagesView from '../components/dashboard/MessagesView';
import MeetingsView from '../components/dashboard/MeetingsView';
import BillingView from '../components/dashboard/BillingView';
import OnboardingView from '../components/dashboard/OnboardingView';
import AccountSettingsView from '../components/dashboard/AccountSettingsView';

interface ClientData {
  name: string;
  email: string;
  loginTime: string;
  projectStatus: string;
  websiteUrl: string;
  plan: string;
  avatar?: string;
}

type NavTab = 'dashboard' | 'projects' | 'assets' | 'requests' | 'messages' | 'meetings' | 'billing' | 'onboarding' | 'account';

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'home' },
  { id: 'projects', label: 'Projects', icon: 'folder' },
  { id: 'assets', label: 'Assets', icon: 'upload' },
  { id: 'requests', label: 'Requests', icon: 'edit' },
  { id: 'messages', label: 'Messages', icon: 'chat' },
  { id: 'meetings', label: 'Meetings', icon: 'calendar' },
  { id: 'billing', label: 'Billing', icon: 'credit-card' },
  { id: 'onboarding', label: 'Help', icon: 'question' },
  { id: 'account', label: 'Settings', icon: 'cog' }
];

const ClientDashboard = () => {
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedClientData = localStorage.getItem('uplinq-client');
    if (!storedClientData) {
      navigate('/client-login');
      return;
    }
    
    const data = JSON.parse(storedClientData);
    setClientData({
      ...data,
      plan: 'Professional'
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('uplinq-client');
    navigate('/client-login');
  };

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.JSX.Element } = {
      home: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
      folder: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />,
      upload: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />,
      edit: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
      chat: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />,
      calendar: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
      'credit-card': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />,
      question: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
      cog: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    };
    return icons[iconName] || icons.home;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome clientData={clientData} />;
      case 'projects':
        return <ProjectsView />;
      case 'assets':
        return <AssetsView />;
      case 'requests':
        return <RequestsView />;
      case 'messages':
        return <MessagesView />;
      case 'meetings':
        return <MeetingsView />;
      case 'billing':
        return <BillingView />;
      case 'onboarding':
        return <OnboardingView />;
      case 'account':
        return <AccountSettingsView />;
      default:
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 capitalize">{activeTab} Content</h2>
            <p className="text-gray-600">
              This is where the {activeTab} functionality will be implemented. 
              We'll build out each section with the full feature set from the checklist.
            </p>
          </div>
        );
    }
  };

  if (!clientData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SEO
        title="Client Dashboard | Uplinq Digital"
        description="Manage your projects, assets, and communications with your development team"
        keywords="client dashboard, project management, Uplinq Digital portal"
        canonicalUrl="https://uplinq.digital/client-dashboard"
      />

      {/* Sidebar Navigation */}
      <aside className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-3">
                <img src="/logo-uplinq.png" alt="Uplinq Digital" className="h-6 w-auto" />
                <span className="font-semibold text-gray-900">Portal</span>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* User Info */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {clientData.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{clientData.name}</p>
                <p className="text-xs text-gray-500">{clientData.plan} Plan</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as NavTab)}
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-start'} px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <svg className={`w-5 h-5 ${sidebarCollapsed ? '' : 'mr-3'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {getIcon(item.icon)}
              </svg>
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-start'} px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200`}
          >
            <svg className={`w-5 h-5 ${sidebarCollapsed ? '' : 'mr-3'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {!sidebarCollapsed && <span>Log Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-light text-gray-900 capitalize">{activeTab}</h1>
              <p className="text-sm text-gray-500 mt-1">
                {activeTab === 'dashboard' && 'Overview of your projects and recent activity'}
                {activeTab === 'projects' && 'Manage and track your project progress'}
                {activeTab === 'assets' && 'Upload and organize your project assets'}
                {activeTab === 'requests' && 'Submit and track change requests'}
                {activeTab === 'messages' && 'Communication with your development team'}
                {activeTab === 'meetings' && 'Schedule and manage meetings'}
                {activeTab === 'billing' && 'View invoices and manage payments'}
                {activeTab === 'onboarding' && 'Get help and access resources'}
                {activeTab === 'account' && 'Manage your account settings and preferences'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{clientData.name}</p>
                <p className="text-xs text-gray-500">{clientData.email}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard; 
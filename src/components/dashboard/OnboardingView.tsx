import { useState } from 'react';
import { motion } from 'framer-motion';

interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  thumbnailUrl: string;
  videoUrl: string;
  isWatched?: boolean;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful?: number;
}

interface SupportResource {
  id: string;
  title: string;
  description: string;
  type: 'guide' | 'download' | 'link';
  url: string;
  category: string;
}

const OnboardingView = () => {
  const [activeTab, setActiveTab] = useState<'tutorials' | 'faqs' | 'resources' | 'contact'>('tutorials');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const videoTutorials: VideoTutorial[] = [
    {
      id: '1',
      title: 'Getting Started with Your Client Portal',
      description: 'A comprehensive introduction to navigating your new client portal and understanding all available features.',
      duration: '8:45',
      category: 'Getting Started',
      thumbnailUrl: '/tutorials/getting-started-thumb.jpg',
      videoUrl: '/tutorials/getting-started.mp4',
      isWatched: true
    },
    {
      id: '2',
      title: 'Uploading and Managing Assets',
      description: 'Learn how to upload files, organize them with tags, and manage your asset library effectively.',
      duration: '6:30',
      category: 'Assets',
      thumbnailUrl: '/tutorials/assets-thumb.jpg',
      videoUrl: '/tutorials/assets.mp4'
    },
    {
      id: '3',
      title: 'Submitting Change Requests',
      description: 'Step-by-step guide on how to submit change requests and track their progress.',
      duration: '5:15',
      category: 'Requests',
      thumbnailUrl: '/tutorials/requests-thumb.jpg',
      videoUrl: '/tutorials/requests.mp4'
    },
    {
      id: '4',
      title: 'Communication and Messaging',
      description: 'How to use the messaging system to communicate with your development team.',
      duration: '4:20',
      category: 'Communication',
      thumbnailUrl: '/tutorials/messaging-thumb.jpg',
      videoUrl: '/tutorials/messaging.mp4'
    },
    {
      id: '5',
      title: 'Scheduling and Managing Meetings',
      description: 'Learn how to schedule meetings, access recordings, and manage your calendar.',
      duration: '7:10',
      category: 'Meetings',
      thumbnailUrl: '/tutorials/meetings-thumb.jpg',
      videoUrl: '/tutorials/meetings.mp4'
    },
    {
      id: '6',
      title: 'Understanding Your Billing',
      description: 'Overview of billing, invoices, payment methods, and subscription management.',
      duration: '5:45',
      category: 'Billing',
      thumbnailUrl: '/tutorials/billing-thumb.jpg',
      videoUrl: '/tutorials/billing.mp4'
    }
  ];

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I reset my password?',
      answer: 'To reset your password, click on the "Forgot Password" link on the login page. You\'ll receive an email with instructions to create a new password.',
      category: 'Account',
      helpful: 15
    },
    {
      id: '2',
      question: 'What file types can I upload?',
      answer: 'You can upload PDF, PNG, JPG, SVG, DOCX, and ZIP files. The maximum file size is 25MB per file.',
      category: 'Assets',
      helpful: 23
    },
    {
      id: '3',
      question: 'How long does it take to get a response to my request?',
      answer: 'We typically respond to requests within 24 hours on business days. Urgent requests are prioritized and may receive faster responses.',
      category: 'Requests',
      helpful: 18
    },
    {
      id: '4',
      question: 'Can I schedule meetings outside business hours?',
      answer: 'Yes, you can schedule meetings at any time using our Calendly integration. We\'ll confirm availability and send you meeting details.',
      category: 'Meetings',
      helpful: 12
    },
    {
      id: '5',
      question: 'How do I download my invoices?',
      answer: 'Go to the Billing section, click on the Invoices tab, and click the download icon next to any paid invoice.',
      category: 'Billing',
      helpful: 20
    },
    {
      id: '6',
      question: 'What happens if I cancel my subscription?',
      answer: 'You\'ll continue to have access until the end of your current billing period. After that, your access will be limited to view-only mode.',
      category: 'Billing',
      helpful: 14
    }
  ];

  const supportResources: SupportResource[] = [
    {
      id: '1',
      title: 'Client Portal User Guide',
      description: 'Complete PDF guide covering all portal features and functionality.',
      type: 'download',
      url: '/resources/client-portal-guide.pdf',
      category: 'Documentation'
    },
    {
      id: '2',
      title: 'Best Practices for Asset Organization',
      description: 'Tips and strategies for organizing your project assets effectively.',
      type: 'guide',
      url: '/resources/asset-organization-guide',
      category: 'Best Practices'
    },
    {
      id: '3',
      title: 'Project Communication Guidelines',
      description: 'How to communicate effectively with your development team.',
      type: 'guide',
      url: '/resources/communication-guidelines',
      category: 'Best Practices'
    },
    {
      id: '4',
      title: 'System Status Page',
      description: 'Check the current status of all portal services and any ongoing issues.',
      type: 'link',
      url: 'https://status.uplinq.digital',
      category: 'System'
    }
  ];

  const categories = Array.from(new Set([
    ...videoTutorials.map(v => v.category),
    ...faqs.map(f => f.category),
    ...supportResources.map(r => r.category)
  ]));

  const filteredTutorials = selectedCategory 
    ? videoTutorials.filter(v => v.category === selectedCategory)
    : videoTutorials;

  const filteredFAQs = selectedCategory 
    ? faqs.filter(f => f.category === selectedCategory)
    : faqs;

  const filteredResources = selectedCategory 
    ? supportResources.filter(r => r.category === selectedCategory)
    : supportResources;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Help & Support</h2>
            <p className="text-sm text-gray-500 mt-1">Get help with using your client portal</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'tutorials', label: 'Video Tutorials', icon: 'play' },
              { id: 'faqs', label: 'FAQs', icon: 'question' },
              { id: 'resources', label: 'Resources', icon: 'document' },
              { id: 'contact', label: 'Contact Support', icon: 'support' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Category Filter */}
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Filter by category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'tutorials' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.map((tutorial) => (
              <motion.div
                key={tutorial.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="relative">
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1M9 10v4a2 2 0 002 2h2a2 2 0 002-2v-4" />
                    </svg>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                    {tutorial.duration}
                  </div>
                  {tutorial.isWatched && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">{tutorial.category}</span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">{tutorial.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{tutorial.description}</p>
                  <button className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1M9 10v4a2 2 0 002 2h2a2 2 0 002-2v-4" />
                    </svg>
                    <span>Watch Tutorial</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'faqs' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="font-medium text-gray-900">{faq.question}</h3>
                        <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">{faq.category}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{faq.helpful} people found this helpful</span>
                      </div>
                    </div>
                    <svg 
                      className={`w-5 h-5 text-gray-400 transition-transform ${expandedFAQ === faq.id ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedFAQ === faq.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-gray-200 p-4 bg-gray-50"
                    >
                      <p className="text-gray-700 mb-4">{faq.answer}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-600">Was this helpful?</span>
                        <button className="flex items-center space-x-1 text-green-600 hover:text-green-700">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                          <span>Yes</span>
                        </button>
                        <button className="flex items-center space-x-1 text-red-600 hover:text-red-700">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                          </svg>
                          <span>No</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResources.map((resource) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    resource.type === 'download' ? 'bg-green-100' :
                    resource.type === 'guide' ? 'bg-blue-100' :
                    'bg-purple-100'
                  }`}>
                    {resource.type === 'download' && (
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                    {resource.type === 'guide' && (
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                    {resource.type === 'link' && (
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-gray-900">{resource.title}</h3>
                      <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">{resource.category}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                    <a
                      href={resource.url}
                      className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        resource.type === 'download' ? 'bg-green-500 hover:bg-green-600 text-white' :
                        resource.type === 'guide' ? 'bg-blue-500 hover:bg-blue-600 text-white' :
                        'bg-purple-500 hover:bg-purple-600 text-white'
                      }`}
                    >
                      <span>
                        {resource.type === 'download' ? 'Download' :
                         resource.type === 'guide' ? 'Read Guide' :
                         'Open Link'}
                      </span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Live Chat Support</h3>
                </div>
                <p className="text-gray-600 mb-4">Get instant help with our live chat support during business hours.</p>
                <p className="text-sm text-gray-500 mb-4">Available: Monday - Friday, 9AM - 6PM GMT</p>
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                  Start Live Chat
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Email Support</h3>
                </div>
                <p className="text-gray-600 mb-4">Send us an email and we'll get back to you within 24 hours.</p>
                <p className="text-sm text-gray-500 mb-4">support@uplinq.digital</p>
                <a 
                  href="mailto:support@uplinq.digital"
                  className="w-full block text-center bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Send Email
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Form</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>General Question</option>
                      <option>Technical Issue</option>
                      <option>Billing Question</option>
                      <option>Feature Request</option>
                      <option>Bug Report</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe your question or issue in detail..."
                  />
                </div>
                <div className="flex justify-end">
                  <button 
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default OnboardingView; 
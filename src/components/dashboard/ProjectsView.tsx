import { useState } from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'discovery' | 'design' | 'development' | 'review' | 'live';
  progress: number;
  startDate: string;
  dueDate: string;
  liveUrl?: string;
  stagingUrl?: string;
  client: string;
  team: string[];
  priority: 'low' | 'medium' | 'high';
  budget: number;
  spent: number;
}

interface ProjectComment {
  id: string;
  author: string;
  authorRole: 'client' | 'developer' | 'designer';
  content: string;
  timestamp: string;
  type: 'comment' | 'approval' | 'revision' | 'question';
}

interface ProjectPhase {
  id: string;
  name: string;
  status: 'completed' | 'active' | 'pending' | 'blocked';
  progress: number;
  startDate: string;
  endDate?: string;
  dueDate: string;
  description: string;
  deliverables: string[];
  comments: ProjectComment[];
  attachments: Attachment[];
}

interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  uploadedBy: string;
  url: string;
}

const ProjectsView = () => {
  const [selectedProject, setSelectedProject] = useState<string>('1');
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'files' | 'team'>('overview');
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [showCommentModal, setShowCommentModal] = useState(false);

  const projects: Project[] = [
    {
      id: '1',
      name: 'TechStartup Website Redesign',
      description: 'Complete website redesign with modern UI/UX, improved performance, and mobile optimization',
      status: 'development',
      progress: 65,
      startDate: '2024-11-01T00:00:00Z',
      dueDate: '2025-01-15T00:00:00Z',
      liveUrl: 'https://techstartup.com',
      stagingUrl: 'https://staging.techstartup.com',
      client: 'TechStartup Ltd',
      team: ['John Smith', 'Sarah Chen', 'Mike Johnson'],
      priority: 'high',
      budget: 15000,
      spent: 9750
    },
    {
      id: '2',
      name: 'E-commerce Platform',
      description: 'Custom e-commerce solution with payment integration and inventory management',
      status: 'design',
      progress: 30,
      startDate: '2024-12-01T00:00:00Z',
      dueDate: '2025-03-01T00:00:00Z',
      client: 'Retail Corp',
      team: ['Lisa Wong', 'David Brown'],
      priority: 'medium',
      budget: 25000,
      spent: 3500
    }
  ];

  const projectPhases: { [key: string]: ProjectPhase[] } = {
    '1': [
      {
        id: 'discovery',
        name: 'Discovery & Planning',
        status: 'completed',
        progress: 100,
        startDate: '2024-11-01T00:00:00Z',
        endDate: '2024-11-15T00:00:00Z',
        dueDate: '2024-11-15T00:00:00Z',
        description: 'Research, requirements gathering, and project planning phase',
        deliverables: ['Project Brief', 'User Personas', 'Site Architecture', 'Technical Specifications'],
        comments: [
          {
            id: '1',
            author: 'Sarah Johnson',
            authorRole: 'client',
            content: 'The project brief looks great! I especially like the focus on mobile-first design.',
            timestamp: '2024-11-10T14:30:00Z',
            type: 'approval'
          }
        ],
        attachments: [
          {
            id: '1',
            name: 'Project-Brief-v2.pdf',
            type: 'pdf',
            size: 2048576,
            uploadDate: '2024-11-08T10:00:00Z',
            uploadedBy: 'John Smith',
            url: '/files/project-brief-v2.pdf'
          }
        ]
      },
      {
        id: 'design',
        name: 'Design & Prototyping',
        status: 'completed',
        progress: 100,
        startDate: '2024-11-16T00:00:00Z',
        endDate: '2024-12-05T00:00:00Z',
        dueDate: '2024-12-05T00:00:00Z',
        description: 'UI/UX design, wireframes, and interactive prototypes',
        deliverables: ['Wireframes', 'Visual Designs', 'Design System', 'Interactive Prototype'],
        comments: [
          {
            id: '2',
            author: 'Mike Chen',
            authorRole: 'client',
            content: 'Love the new color scheme! Could we make the CTA buttons slightly larger?',
            timestamp: '2024-11-25T16:45:00Z',
            type: 'revision'
          }
        ],
        attachments: []
      },
      {
        id: 'development',
        name: 'Development',
        status: 'active',
        progress: 65,
        startDate: '2024-12-06T00:00:00Z',
        dueDate: '2025-01-10T00:00:00Z',
        description: 'Frontend and backend development, CMS integration',
        deliverables: ['Frontend Development', 'Backend API', 'CMS Setup', 'Performance Optimization'],
        comments: [
          {
            id: '3',
            author: 'John Smith',
            authorRole: 'developer',
            content: 'Homepage and about page are complete. Working on the contact form functionality now.',
            timestamp: '2024-12-18T11:20:00Z',
            type: 'comment'
          }
        ],
        attachments: []
      },
      {
        id: 'review',
        name: 'Testing & Review',
        status: 'pending',
        progress: 0,
        startDate: '2025-01-11T00:00:00Z',
        dueDate: '2025-01-14T00:00:00Z',
        description: 'Quality assurance, testing, and client review',
        deliverables: ['QA Testing', 'Performance Testing', 'Client Review', 'Bug Fixes'],
        comments: [],
        attachments: []
      },
      {
        id: 'launch',
        name: 'Launch & Go Live',
        status: 'pending',
        progress: 0,
        startDate: '2025-01-15T00:00:00Z',
        dueDate: '2025-01-15T00:00:00Z',
        description: 'Final deployment and launch',
        deliverables: ['DNS Setup', 'SSL Certificate', 'Go Live', 'Post-Launch Support'],
        comments: [],
        attachments: []
      }
    ]
  };

  const currentProject = projects.find(p => p.id === selectedProject);
  const currentPhases = projectPhases[selectedProject] || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'active':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'blocked':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCommentTypeIcon = (type: string) => {
    switch (type) {
      case 'approval':
        return (
          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'revision':
        return (
          <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
        );
      case 'question':
        return (
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Header with Project Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Project Management</h2>
            <p className="text-sm text-gray-500 mt-1">Track progress and manage your projects</p>
          </div>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'timeline', label: 'Timeline' },
              { id: 'files', label: 'Files' },
              { id: 'team', label: 'Team' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && currentProject && (
          <div className="space-y-6">
            {/* Project Overview */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-medium text-gray-900">{currentProject.name}</h3>
                      <p className="text-gray-600 mt-1">{currentProject.description}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(currentProject.priority)}`}>
                        {currentProject.priority} priority
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(currentProject.status)}`}>
                        {currentProject.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Progress</p>
                      <p className="text-xl font-medium text-gray-900">{currentProject.progress}%</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Budget</p>
                      <p className="text-xl font-medium text-gray-900">£{currentProject.budget.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Spent</p>
                      <p className="text-xl font-medium text-gray-900">£{currentProject.spent.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Remaining</p>
                      <p className="text-xl font-medium text-gray-900">£{(currentProject.budget - currentProject.spent).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Start Date</span>
                      <span className="font-medium">{formatDate(currentProject.startDate)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Due Date</span>
                      <span className="font-medium">{formatDate(currentProject.dueDate)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Client</span>
                      <span className="font-medium">{currentProject.client}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Quick Links</h4>
                    <div className="space-y-2">
                      {currentProject.liveUrl && (
                        <a
                          href={currentProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                        >
                          <span className="text-green-800 font-medium">Live Website</span>
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                      {currentProject.stagingUrl && (
                        <a
                          href={currentProject.stagingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <span className="text-blue-800 font-medium">Staging Site</span>
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Team Members</h4>
                    <div className="space-y-2">
                      {currentProject.team.map((member, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {member.charAt(0)}
                          </div>
                          <span className="text-gray-900">{member}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Overall Progress</h3>
              <div className="relative">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      {currentProject.progress}% Complete
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-gray-600">
                      {Math.ceil((new Date(currentProject.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div 
                    style={{ width: `${currentProject.progress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-blue-600"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Project Timeline</h3>
            
            <div className="space-y-6">
              {currentPhases.map((phase, index) => (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline connector */}
                  {index < currentPhases.length - 1 && (
                    <div className="absolute left-6 top-16 w-0.5 h-16 bg-gray-200"></div>
                  )}
                  
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                      phase.status === 'completed' ? 'bg-green-100 border-green-300' :
                      phase.status === 'active' ? 'bg-blue-100 border-blue-300' :
                      phase.status === 'blocked' ? 'bg-red-100 border-red-300' :
                      'bg-gray-100 border-gray-300'
                    }`}>
                      {phase.status === 'completed' ? (
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : phase.status === 'active' ? (
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : phase.status === 'blocked' ? (
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      ) : (
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                           onClick={() => setSelectedPhase(selectedPhase === phase.id ? null : phase.id)}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-medium text-gray-900">{phase.name}</h4>
                          <div className="flex items-center space-x-3">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(phase.status)}`}>
                              {phase.status}
                            </span>
                            <span className="text-sm text-gray-500">{phase.progress}%</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{phase.description}</p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>Due: {formatDate(phase.dueDate)}</span>
                          <span>{phase.comments.length} comments • {phase.attachments.length} files</span>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{phase.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                phase.status === 'completed' ? 'bg-green-500' :
                                phase.status === 'active' ? 'bg-blue-500' :
                                'bg-gray-400'
                              }`}
                              style={{ width: `${phase.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Phase Details */}
                      {selectedPhase === phase.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 bg-white border border-gray-200 rounded-lg p-4"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h5 className="font-medium text-gray-900 mb-3">Deliverables</h5>
                              <ul className="space-y-2">
                                {phase.deliverables.map((deliverable, idx) => (
                                  <li key={idx} className="flex items-center text-sm">
                                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                                    </svg>
                                    {deliverable}
                                  </li>
                                ))}
                              </ul>

                              {phase.attachments.length > 0 && (
                                <div className="mt-4">
                                  <h5 className="font-medium text-gray-900 mb-3">Attachments</h5>
                                  <div className="space-y-2">
                                    {phase.attachments.map((attachment) => (
                                      <div key={attachment.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                        <div className="flex items-center space-x-2">
                                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                          </svg>
                                          <span className="text-sm text-gray-900">{attachment.name}</span>
                                          <span className="text-xs text-gray-500">({formatFileSize(attachment.size)})</span>
                                        </div>
                                        <button className="text-blue-600 hover:text-blue-700 text-sm">Download</button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <h5 className="font-medium text-gray-900">Comments</h5>
                                <button
                                  onClick={() => setShowCommentModal(true)}
                                  className="text-sm text-blue-600 hover:text-blue-700"
                                >
                                  Add Comment
                                </button>
                              </div>
                              
                              <div className="space-y-3 max-h-64 overflow-y-auto">
                                {phase.comments.map((comment) => (
                                  <div key={comment.id} className="flex space-x-3">
                                    {getCommentTypeIcon(comment.type)}
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center space-x-2 mb-1">
                                        <span className="text-sm font-medium text-gray-900">{comment.author}</span>
                                        <span className="text-xs text-gray-500">{comment.authorRole}</span>
                                        <span className="text-xs text-gray-400">{formatDate(comment.timestamp)}</span>
                                      </div>
                                      <p className="text-sm text-gray-700">{comment.content}</p>
                                    </div>
                                  </div>
                                ))}
                                
                                {phase.comments.length === 0 && (
                                  <p className="text-sm text-gray-500 text-center py-4">No comments yet</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'files' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Project Files</h3>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Upload File
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentPhases.flatMap(phase => phase.attachments).map((file) => (
                <div key={file.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900 truncate">{file.name}</span>
                    </div>
                    <button className="text-gray-400 hover:text-blue-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                  </div>
                  <div className="text-xs text-gray-500">
                    <p>{formatFileSize(file.size)}</p>
                    <p>Uploaded by {file.uploadedBy}</p>
                    <p>{formatDate(file.uploadDate)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'team' && currentProject && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Project Team</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProject.team.map((member, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {member.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{member}</h4>
                      <p className="text-sm text-gray-500">
                        {index === 0 ? 'Project Manager' : index === 1 ? 'Designer' : 'Developer'}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Tasks Completed</span>
                      <span className="font-medium">{Math.floor(Math.random() * 10) + 5}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hours Logged</span>
                      <span className="font-medium">{Math.floor(Math.random() * 50) + 20}h</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Comment Modal */}
      {showCommentModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add Comment</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Comment Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="comment">General Comment</option>
                  <option value="question">Question</option>
                  <option value="approval">Approval</option>
                  <option value="revision">Revision Request</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your comment..."
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCommentModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add Comment
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectsView; 
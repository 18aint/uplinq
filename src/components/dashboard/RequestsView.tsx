import { useState } from 'react';
import { motion } from 'framer-motion';

interface ChangeRequest {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'submitted' | 'in-review' | 'approved' | 'in-progress' | 'testing' | 'completed' | 'rejected';
  category: 'content' | 'design' | 'functionality' | 'seo' | 'bug-fix' | 'enhancement';
  submittedAt: string;
  updatedAt: string;
  estimatedHours?: number;
  attachments?: string[];
  comments: {
    id: string;
    author: string;
    message: string;
    timestamp: string;
    type: 'client' | 'developer' | 'system';
  }[];
}

const RequestsView = () => {
  const [requests, setRequests] = useState<ChangeRequest[]>([
    {
      id: '1',
      title: 'Update homepage hero section',
      description: 'Change the main heading text to better reflect our new service offerings. Also need to update the CTA button color to match brand guidelines.',
      priority: 'medium',
      status: 'in-progress',
      category: 'content',
      submittedAt: '2024-12-18T14:30:00Z',
      updatedAt: '2024-12-20T09:15:00Z',
      estimatedHours: 3,
      comments: [
        {
          id: '1',
          author: 'You',
          message: 'Need this updated before the marketing campaign launch next week.',
          timestamp: '2024-12-18T14:30:00Z',
          type: 'client'
        },
        {
          id: '2',
          author: 'Development Team',
          message: 'Working on this now. Will have the text updates ready by tomorrow, CTA styling to follow.',
          timestamp: '2024-12-19T10:20:00Z',
          type: 'developer'
        }
      ]
    },
    {
      id: '2',
      title: 'Add contact form validation',
      description: 'The contact form should validate email addresses and show error messages for required fields.',
      priority: 'high',
      status: 'testing',
      category: 'functionality',
      submittedAt: '2024-12-15T11:20:00Z',
      updatedAt: '2024-12-20T16:45:00Z',
      estimatedHours: 5,
      comments: [
        {
          id: '3',
          author: 'Development Team',
          message: 'Form validation has been implemented and is ready for testing.',
          timestamp: '2024-12-20T16:45:00Z',
          type: 'developer'
        }
      ]
    },
    {
      id: '3',
      title: 'Mobile menu not closing',
      description: 'On mobile devices, the hamburger menu stays open after clicking a link.',
      priority: 'urgent',
      status: 'completed',
      category: 'bug-fix',
      submittedAt: '2024-12-12T09:45:00Z',
      updatedAt: '2024-12-13T15:20:00Z',
      estimatedHours: 2,
      comments: [
        {
          id: '4',
          author: 'System',
          message: 'Request marked as completed',
          timestamp: '2024-12-13T15:20:00Z',
          type: 'system'
        }
      ]
    }
  ]);

  const [showNewRequest, setShowNewRequest] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<ChangeRequest | null>(null);

  // New request form state
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
    category: 'content' as const
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
      case 'testing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'approved':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'submitted':
      case 'in-review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'in-progress':
        return (
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'testing':
        return (
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'rejected':
        return (
          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    const request: ChangeRequest = {
      id: Date.now().toString(),
      title: newRequest.title,
      description: newRequest.description,
      priority: newRequest.priority,
      status: 'submitted',
      category: newRequest.category,
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: [{
        id: Date.now().toString(),
        author: 'System',
        message: 'Request submitted for review',
        timestamp: new Date().toISOString(),
        type: 'system'
      }]
    };

    setRequests(prev => [request, ...prev]);
    setNewRequest({ title: '', description: '', priority: 'medium', category: 'content' });
    setShowNewRequest(false);
  };

  const filteredRequests = requests.filter(request => {
    const statusMatch = !filterStatus || request.status === filterStatus;
    const priorityMatch = !filterPriority || request.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Change Requests</h2>
            <p className="text-sm text-gray-500 mt-1">Submit and track website update requests</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNewRequest(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>New Request</span>
          </motion.button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">All Statuses</option>
            <option value="submitted">Submitted</option>
            <option value="in-review">In Review</option>
            <option value="approved">Approved</option>
            <option value="in-progress">In Progress</option>
            <option value="testing">Testing</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>

          <span className="text-sm text-gray-500 flex items-center">
            {filteredRequests.length} requests
          </span>
        </div>
      </motion.div>

      {/* New Request Modal */}
      {showNewRequest && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Submit New Request</h3>
              <button
                onClick={() => setShowNewRequest(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Request Title</label>
                <input
                  type="text"
                  value={newRequest.title}
                  onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of the change needed"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Provide detailed information about what needs to be changed and why"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={newRequest.priority}
                    onChange={(e) => setNewRequest({...newRequest, priority: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newRequest.category}
                    onChange={(e) => setNewRequest({...newRequest, category: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="content">Content Update</option>
                    <option value="design">Design Change</option>
                    <option value="functionality">New Functionality</option>
                    <option value="seo">SEO Optimization</option>
                    <option value="bug-fix">Bug Fix</option>
                    <option value="enhancement">Enhancement</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewRequest(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-gray-300 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-medium text-gray-900">{request.title}</h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${getPriorityColor(request.priority)}`}>
                    {request.priority}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${getStatusColor(request.status)}`}>
                    <span className="mr-1">{getStatusIcon(request.status)}</span>
                    {request.status.replace('-', ' ')}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{request.description}</p>
                
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>#{request.id}</span>
                  <span>{request.category.replace('-', ' ')}</span>
                  <span>Submitted {formatDate(request.submittedAt)}</span>
                  <span>Updated {formatDate(request.updatedAt)}</span>
                  {request.estimatedHours && (
                    <span>{request.estimatedHours}h estimated</span>
                  )}
                </div>
              </div>

              <button
                onClick={() => setSelectedRequest(selectedRequest?.id === request.id ? null : request)}
                className="ml-4 p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Expanded Details */}
            {selectedRequest?.id === request.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-gray-200 pt-4 mt-4"
              >
                <h4 className="text-sm font-medium text-gray-900 mb-3">Activity Timeline</h4>
                <div className="space-y-3">
                  {request.comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                        comment.type === 'client' ? 'bg-blue-100 text-blue-700' :
                        comment.type === 'developer' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {comment.author.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">{comment.author}</span>
                          <span className="text-xs text-gray-500">
                            {formatDate(comment.timestamp)} at {formatTime(comment.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{comment.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
          <p className="text-gray-500 mb-4">Submit your first change request to get started</p>
          <button
            onClick={() => setShowNewRequest(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Create Request
          </button>
        </div>
      )}
    </div>
  );
};

export default RequestsView; 
import { useState } from 'react';
import { motion } from 'framer-motion';

interface EditRequest {
  id: string;
  message: string;
  priority: 'Low' | 'Medium' | 'High';
  timestamp: string;
  status: 'Submitted' | 'In Progress' | 'Completed';
}

const RequestEditsForm = () => {
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requests, setRequests] = useState<EditRequest[]>(() => {
    // Load existing requests from localStorage
    const stored = localStorage.getItem('uplinq-edit-requests');
    return stored ? JSON.parse(stored) : [];
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);

    // Create new request
    const newRequest: EditRequest = {
      id: Date.now().toString(),
      message: message.trim(),
      priority,
      timestamp: new Date().toISOString(),
      status: 'Submitted'
    };

    // Update requests
    const updatedRequests = [newRequest, ...requests];
    setRequests(updatedRequests);
    
    // Save to localStorage
    localStorage.setItem('uplinq-edit-requests', JSON.stringify(updatedRequests));

    // Reset form
    setTimeout(() => {
      setMessage('');
      setPriority('Medium');
      setIsSubmitting(false);
    }, 500);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Submitted':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Request Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="edit-message" className="block text-sm font-medium text-gray-700 mb-2">
            What would you like updated?
          </label>
          <textarea
            id="edit-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Please describe the changes you'd like to see..."
            required
          />
          <div className="mt-1 text-xs text-gray-500">
            {message.length}/500 characters
          </div>
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'High')}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting || !message.trim()}
          className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200 focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            'Submit Request'
          )}
        </motion.button>
      </form>

      {/* Previous Requests */}
      {requests.length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Previous Requests</h3>
          <div className="space-y-4">
            {requests.slice(0, 3).map((request) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(request.priority)}`}>
                      {request.priority}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(request.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {request.message}
                </p>
              </motion.div>
            ))}
          </div>
          
          {requests.length > 3 && (
            <div className="mt-4 text-center">
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View all requests ({requests.length})
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RequestEditsForm; 
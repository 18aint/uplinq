import { useState } from 'react';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  subject: string;
  content: string;
  sender: string;
  senderType: 'client' | 'developer' | 'system';
  category: 'update' | 'announcement' | 'question' | 'milestone' | 'alert';
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'normal' | 'high';
  attachments?: string[];
  replies?: Message[];
  isReply?: boolean;
  parentId?: string;
}

const MessagesView = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      subject: 'Homepage Updates Complete',
      content: 'We\'ve successfully completed the homepage hero section updates you requested. The new heading text has been implemented and the CTA button now matches your brand guidelines. The changes are live on your staging site for review.',
      sender: 'Development Team',
      senderType: 'developer',
      category: 'update',
      timestamp: '2024-12-20T14:30:00Z',
      isRead: false,
      priority: 'normal',
      replies: [
        {
          id: '1-1',
          subject: 'Re: Homepage Updates Complete',
          content: 'Thank you! The changes look great. Can we also update the subheading text to be more engaging?',
          sender: 'You',
          senderType: 'client',
          category: 'question',
          timestamp: '2024-12-20T15:15:00Z',
          isRead: true,
          priority: 'normal',
          isReply: true,
          parentId: '1'
        }
      ]
    },
    {
      id: '2',
      subject: 'Weekly Project Milestone Reached',
      content: 'Congratulations! We\'ve reached an important milestone in your project. The contact form functionality has been fully implemented and tested. This completes Phase 2 of your website development. Next week we\'ll be focusing on SEO optimization and performance enhancements.',
      sender: 'Project Manager',
      senderType: 'developer',
      category: 'milestone',
      timestamp: '2024-12-19T10:00:00Z',
      isRead: true,
      priority: 'high'
    },
    {
      id: '3',
      subject: 'Security Update Applied',
      content: 'We\'ve applied the latest security updates to your website. All plugins and core files have been updated to their latest versions. Your site security score has improved to 98%. No action required on your part.',
      sender: 'System',
      senderType: 'system',
      category: 'announcement',
      timestamp: '2024-12-18T09:20:00Z',
      isRead: true,
      priority: 'normal'
    },
    {
      id: '4',
      subject: 'Performance Optimization Results',
      content: 'Great news! After our recent performance optimizations, your website speed has improved significantly. Page load time is now under 2 seconds (previously 4.2s), and your Google PageSpeed score has increased to 94. These improvements will positively impact your SEO rankings.',
      sender: 'Development Team',
      senderType: 'developer',
      category: 'update',
      timestamp: '2024-12-17T16:45:00Z',
      isRead: true,
      priority: 'high',
      attachments: ['performance-report.pdf']
    }
  ]);

  const [showCompose, setShowCompose] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  // New message form state
  const [newMessage, setNewMessage] = useState({
    subject: '',
    content: '',
    category: 'question' as const,
    priority: 'normal' as const
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'milestone':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'update':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'announcement':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'question':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'alert':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'milestone':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        );
      case 'update':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case 'announcement':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
        );
      case 'question':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'alert':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
    }
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === 'high') {
      return (
        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      );
    }
    return null;
  };

  const getSenderAvatar = (senderType: string, sender: string) => {
    const colors = {
      client: 'bg-blue-500',
      developer: 'bg-green-500',
      system: 'bg-gray-500'
    };

    return (
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${colors[senderType as keyof typeof colors]}`}>
        {sender.charAt(0)}
      </div>
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message: Message = {
      id: Date.now().toString(),
      subject: newMessage.subject,
      content: newMessage.content,
      sender: 'You',
      senderType: 'client',
      category: newMessage.category,
      timestamp: new Date().toISOString(),
      isRead: true,
      priority: newMessage.priority
    };

    setMessages(prev => [message, ...prev]);
    setNewMessage({ subject: '', content: '', category: 'question', priority: 'normal' });
    setShowCompose(false);
  };

  const markAsRead = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true } : msg
    ));
  };

  const handleReply = (parentMessage: Message, replyContent: string) => {
    const reply: Message = {
      id: `${parentMessage.id}-${Date.now()}`,
      subject: `Re: ${parentMessage.subject}`,
      content: replyContent,
      sender: 'You',
      senderType: 'client',
      category: 'question',
      timestamp: new Date().toISOString(),
      isRead: true,
      priority: 'normal',
      isReply: true,
      parentId: parentMessage.id
    };

    setMessages(prev => prev.map(msg => 
      msg.id === parentMessage.id 
        ? { ...msg, replies: [...(msg.replies || []), reply] }
        : msg
    ));
  };

  const filteredMessages = messages.filter(message => {
    const categoryMatch = !filterCategory || message.category === filterCategory;
    const readMatch = !showUnreadOnly || !message.isRead;
    return categoryMatch && readMatch && !message.isReply;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const unreadCount = messages.filter(msg => !msg.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Messages</h2>
              <p className="text-sm text-gray-500 mt-1">Communication with your development team</p>
            </div>
            {unreadCount > 0 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800 border border-red-200">
                {unreadCount} unread
              </span>
            )}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCompose(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>New Message</span>
          </motion.button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">All Categories</option>
            <option value="update">Updates</option>
            <option value="announcement">Announcements</option>
            <option value="milestone">Milestones</option>
            <option value="question">Questions</option>
            <option value="alert">Alerts</option>
          </select>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showUnreadOnly}
              onChange={(e) => setShowUnreadOnly(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">Unread only</span>
          </label>

          <span className="text-sm text-gray-500">
            {filteredMessages.length} messages
          </span>
        </div>
      </motion.div>

      {/* Compose Modal */}
      {showCompose && (
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
              <h3 className="text-lg font-medium text-gray-900">New Message</h3>
              <button
                onClick={() => setShowCompose(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What's this message about?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={newMessage.content}
                  onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Type your message here..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newMessage.category}
                    onChange={(e) => setNewMessage({...newMessage, category: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="question">Question</option>
                    <option value="update">Update Request</option>
                    <option value="announcement">General Message</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={newMessage.priority}
                    onChange={(e) => setNewMessage({...newMessage, priority: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCompose(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white rounded-xl p-6 shadow-sm border transition-all duration-200 cursor-pointer ${
              message.isRead ? 'border-gray-200 hover:border-gray-300' : 'border-blue-200 bg-blue-50'
            }`}
            onClick={() => {
              if (!message.isRead) markAsRead(message.id);
              setSelectedMessage(selectedMessage?.id === message.id ? null : message);
            }}
          >
            <div className="flex items-start space-x-4">
              {getSenderAvatar(message.senderType, message.sender)}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <h3 className={`font-medium ${message.isRead ? 'text-gray-900' : 'text-gray-900 font-medium'}`}>
                      {message.subject}
                    </h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${getCategoryColor(message.category)}`}>
                      <span className="mr-1">{getCategoryIcon(message.category)}</span>
                      {message.category}
                    </span>
                    {message.priority === 'high' && getPriorityIcon(message.priority)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{formatDate(message.timestamp)}</span>
                    {!message.isRead && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">From: {message.sender}</span>
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      {message.attachments.length} attachment{message.attachments.length > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2">{message.content}</p>

                {message.replies && message.replies.length > 0 && (
                  <div className="mt-3 text-sm text-blue-600">
                    {message.replies.length} {message.replies.length === 1 ? 'reply' : 'replies'}
                  </div>
                )}
              </div>
            </div>

            {/* Expanded Content */}
            {selectedMessage?.id === message.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 pt-6 border-t border-gray-200"
              >
                <div className="prose max-w-none text-sm text-gray-700 mb-4">
                  {message.content}
                </div>

                {message.attachments && message.attachments.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Attachments</h4>
                    <div className="space-y-2">
                      {message.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                          <span>{attachment}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Replies */}
                {message.replies && message.replies.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-900">Conversation</h4>
                    {message.replies.map((reply) => (
                      <div key={reply.id} className="flex space-x-3 p-3 bg-gray-50 rounded-lg">
                        {getSenderAvatar(reply.senderType, reply.sender)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-gray-900">{reply.sender}</span>
                            <span className="text-xs text-gray-500">{formatDate(reply.timestamp)}</span>
                          </div>
                          <p className="text-sm text-gray-600">{reply.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredMessages.length === 0 && (
        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
          <p className="text-gray-500 mb-4">Start a conversation with your development team</p>
          <button
            onClick={() => setShowCompose(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Send Message
          </button>
        </div>
      )}
    </div>
  );
};

export default MessagesView; 
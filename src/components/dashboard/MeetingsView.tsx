import { useState } from 'react';
import { motion } from 'framer-motion';

interface Meeting {
  id: string;
  title: string;
  description?: string;
  scheduledAt: string;
  duration: number; // in minutes
  status: 'upcoming' | 'completed' | 'cancelled' | 'rescheduled';
  type: 'project-review' | 'consultation' | 'training' | 'support' | 'general';
  attendees: string[];
  meetingLink?: string;
  recordingUrl?: string;
  notes?: string;
  agenda?: string[];
  createdAt: string;
}

const MeetingsView = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'Project Kickoff Meeting',
      description: 'Initial project discussion and requirements gathering',
      scheduledAt: '2024-12-23T14:00:00Z',
      duration: 60,
      status: 'upcoming',
      type: 'project-review',
      attendees: ['You', 'Project Manager', 'Lead Developer'],
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      agenda: ['Project scope review', 'Timeline discussion', 'Resource allocation', 'Q&A session'],
      createdAt: '2024-12-20T10:00:00Z'
    },
    {
      id: '2',
      title: 'Weekly Progress Review',
      description: 'Review development progress and address any concerns',
      scheduledAt: '2024-12-18T15:30:00Z',
      duration: 30,
      status: 'completed',
      type: 'project-review',
      attendees: ['You', 'Development Team'],
      meetingLink: 'https://meet.google.com/xyz-uvwx-yz',
      recordingUrl: 'https://drive.google.com/file/d/recording-123',
      notes: 'Discussed homepage updates and contact form implementation. Client approved design changes. Next steps: finalize mobile responsiveness.',
      agenda: ['Progress update', 'Demo new features', 'Feedback collection'],
      createdAt: '2024-12-15T09:00:00Z'
    },
    {
      id: '3',
      title: 'Website Launch Strategy',
      description: 'Planning the website launch and go-live process',
      scheduledAt: '2024-12-12T11:00:00Z',
      duration: 45,
      status: 'completed',
      type: 'consultation',
      attendees: ['You', 'Project Manager', 'SEO Specialist'],
      recordingUrl: 'https://drive.google.com/file/d/recording-456',
      notes: 'Covered launch checklist, SEO setup, analytics configuration, and post-launch monitoring. All systems ready for go-live.',
      createdAt: '2024-12-10T14:00:00Z'
    },
    {
      id: '4',
      title: 'Design Review Session',
      description: 'Review and approve final design mockups',
      scheduledAt: '2024-12-05T13:00:00Z',
      duration: 90,
      status: 'completed',
      type: 'project-review',
      attendees: ['You', 'UI/UX Designer', 'Project Manager'],
      recordingUrl: 'https://drive.google.com/file/d/recording-789',
      notes: 'Reviewed all page designs. Minor adjustments requested for color scheme and typography. Designer will implement changes by Friday.',
      createdAt: '2024-12-03T16:00:00Z'
    }
  ]);

  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');

  // New meeting form state
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    description: '',
    type: 'general' as const,
    duration: 30,
    preferredDate: '',
    preferredTime: '',
    agenda: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'rescheduled':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'project-review':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'consultation':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'training':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'support':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'general':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return (
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'completed':
        return (
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'cancelled':
        return (
          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'rescheduled':
        return (
          <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleScheduleMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    
    const meeting: Meeting = {
      id: Date.now().toString(),
      title: newMeeting.title,
      description: newMeeting.description,
      scheduledAt: new Date(`${newMeeting.preferredDate}T${newMeeting.preferredTime}`).toISOString(),
      duration: newMeeting.duration,
      status: 'upcoming',
      type: newMeeting.type,
      attendees: ['You', 'Development Team'],
      agenda: newMeeting.agenda ? newMeeting.agenda.split('\n').filter(item => item.trim()) : [],
      createdAt: new Date().toISOString()
    };

    setMeetings(prev => [meeting, ...prev]);
    setNewMeeting({
      title: '',
      description: '',
      type: 'general',
      duration: 30,
      preferredDate: '',
      preferredTime: '',
      agenda: ''
    });
    setShowSchedule(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredMeetings = meetings.filter(meeting => {
    const statusMatch = !filterStatus || meeting.status === filterStatus;
    const typeMatch = !filterType || meeting.type === filterType;
    return statusMatch && typeMatch;
  });

  const upcomingMeetings = meetings.filter(meeting => meeting.status === 'upcoming');
  const completedMeetings = meetings.filter(meeting => meeting.status === 'completed');

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
            <h2 className="text-lg font-medium text-gray-900">Meetings</h2>
            <p className="text-sm text-gray-500 mt-1">Schedule meetings and access recordings</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSchedule(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Schedule Meeting</span>
          </motion.button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Upcoming</p>
                <p className="text-xl font-medium text-blue-900">{upcomingMeetings.length}</p>
              </div>
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Completed</p>
                <p className="text-xl font-medium text-green-900">{completedMeetings.length}</p>
              </div>
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Recordings</p>
                <p className="text-xl font-medium text-purple-900">{completedMeetings.filter(m => m.recordingUrl).length}</p>
              </div>
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">All Statuses</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="rescheduled">Rescheduled</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">All Types</option>
            <option value="project-review">Project Review</option>
            <option value="consultation">Consultation</option>
            <option value="training">Training</option>
            <option value="support">Support</option>
            <option value="general">General</option>
          </select>

          <span className="text-sm text-gray-500">
            {filteredMeetings.length} meetings
          </span>
        </div>
      </motion.div>

      {/* Schedule Meeting Modal */}
      {showSchedule && (
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
              <h3 className="text-lg font-medium text-gray-900">Schedule New Meeting</h3>
              <button
                onClick={() => setShowSchedule(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-blue-900">Calendly Integration</span>
              </div>
              <p className="text-sm text-blue-700">
                You can also schedule meetings directly through our Calendly link for instant booking: 
                <a href="#" className="underline ml-1 hover:text-blue-800">calendly.com/uplinq-meetings</a>
              </p>
            </div>

            <form onSubmit={handleScheduleMeeting} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Title</label>
                <input
                  type="text"
                  value={newMeeting.title}
                  onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What would you like to discuss?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newMeeting.description}
                  onChange={(e) => setNewMeeting({...newMeeting, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Additional details about the meeting"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Type</label>
                  <select
                    value={newMeeting.type}
                    onChange={(e) => setNewMeeting({...newMeeting, type: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="general">General Discussion</option>
                    <option value="project-review">Project Review</option>
                    <option value="consultation">Consultation</option>
                    <option value="training">Training Session</option>
                    <option value="support">Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <select
                    value={newMeeting.duration}
                    onChange={(e) => setNewMeeting({...newMeeting, duration: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={45}>45 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={90}>1.5 hours</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                  <input
                    type="date"
                    value={newMeeting.preferredDate}
                    onChange={(e) => setNewMeeting({...newMeeting, preferredDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                  <input
                    type="time"
                    value={newMeeting.preferredTime}
                    onChange={(e) => setNewMeeting({...newMeeting, preferredTime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Agenda (optional)</label>
                <textarea
                  value={newMeeting.agenda}
                  onChange={(e) => setNewMeeting({...newMeeting, agenda: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What topics would you like to cover? (one per line)"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowSchedule(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  Schedule Meeting
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Meetings List */}
      <div className="space-y-4">
        {filteredMeetings.map((meeting) => (
          <motion.div
            key={meeting.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-gray-300 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-medium text-gray-900">{meeting.title}</h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${getStatusColor(meeting.status)}`}>
                    <span className="mr-1">{getStatusIcon(meeting.status)}</span>
                    {meeting.status}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${getTypeColor(meeting.type)}`}>
                    {meeting.type.replace('-', ' ')}
                  </span>
                </div>
                
                {meeting.description && (
                  <p className="text-sm text-gray-600 mb-3">{meeting.description}</p>
                )}
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(meeting.scheduledAt)}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatTime(meeting.scheduledAt)}
                  </span>
                  <span>{meeting.duration} min</span>
                  <span>{meeting.attendees.length} attendees</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {meeting.status === 'upcoming' && meeting.meetingLink && (
                    <a
                      href={meeting.meetingLink}
                      className="inline-flex items-center px-3 py-1 rounded-lg text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Join Meeting
                    </a>
                  )}
                  
                  {meeting.recordingUrl && (
                    <a
                      href={meeting.recordingUrl}
                      className="inline-flex items-center px-3 py-1 rounded-lg text-sm bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1M9 10v4a2 2 0 002 2h2a2 2 0 002-2v-4" />
                      </svg>
                      View Recording
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedMeeting(selectedMeeting?.id === meeting.id ? null : meeting)}
                    className="inline-flex items-center px-3 py-1 rounded-lg text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Details
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            {selectedMeeting?.id === meeting.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="border-t border-gray-200 pt-4 mt-4 space-y-4"
              >
                {meeting.agenda && meeting.agenda.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Agenda</h4>
                    <ul className="space-y-1">
                      {meeting.agenda.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Attendees</h4>
                  <div className="flex flex-wrap gap-2">
                    {meeting.attendees.map((attendee, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                        {attendee}
                      </span>
                    ))}
                  </div>
                </div>

                {meeting.notes && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Meeting Notes</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">{meeting.notes}</p>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredMeetings.length === 0 && (
        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No meetings found</h3>
          <p className="text-gray-500 mb-4">Schedule your first meeting to get started</p>
          <button
            onClick={() => setShowSchedule(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Schedule Meeting
          </button>
        </div>
      )}
    </div>
  );
};

export default MeetingsView; 
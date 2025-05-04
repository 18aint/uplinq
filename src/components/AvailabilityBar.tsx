import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AvailabilityBarProps {
  calendlyUrl?: string;
  variant?: 'default' | 'sticky' | 'floating';
}

// Mock Calendly event type for simulation
interface CalendlyEvent {
  startTime: Date;
  endTime: Date;
  available: boolean;
}

// Simulate a Calendly API client
const mockCalendlyClient = {
  getAvailability: async (from: Date, to: Date): Promise<CalendlyEvent[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const events: CalendlyEvent[] = [];
    const currentDate = new Date(from);
    
    // Generate 14 days of availability data
    while (currentDate <= to) {
      // Business hours are 9 AM to 5 PM, Monday to Friday
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) { // Skip weekends
        // Morning slot
        const morningStart = new Date(currentDate);
        morningStart.setHours(9, 0, 0, 0);
        const morningEnd = new Date(currentDate);
        morningEnd.setHours(12, 0, 0, 0);
        
        // Afternoon slot
        const afternoonStart = new Date(currentDate);
        afternoonStart.setHours(13, 0, 0, 0);
        const afternoonEnd = new Date(currentDate);
        afternoonEnd.setHours(17, 0, 0, 0);
        
        // Randomly decide if slots are available (70% chance of being booked for realistic simulation)
        const isMorningAvailable = Math.random() > 0.7;
        const isAfternoonAvailable = Math.random() > 0.7;
        
        events.push({
          startTime: morningStart,
          endTime: morningEnd,
          available: isMorningAvailable
        });
        
        events.push({
          startTime: afternoonStart,
          endTime: afternoonEnd,
          available: isAfternoonAvailable
        });
      }
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return events;
  }
};

const AvailabilityBar = ({ 
  calendlyUrl = 'https://calendly.com/waynekuvi', 
  variant = 'default' 
}: AvailabilityBarProps) => {
  // State for availability data
  const [nextAvailableDate, setNextAvailableDate] = useState<string>('');
  const [availabilityStatus, setAvailabilityStatus] = useState<'Fully booked' | '1 slot left' | 'Available'>('Available');
  const [isLoading, setIsLoading] = useState(true);
  const [availableSlotCount, setAvailableSlotCount] = useState<number>(0);

  // Fetch availability data
  useEffect(() => {
    const fetchAvailability = async () => {
      setIsLoading(true);
      
      try {
        // Define date range for next 3 weeks
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 21); // 3 weeks out
        
        // Get availability from mock Calendly client
        const events = await mockCalendlyClient.getAvailability(startDate, endDate);
        
        // Find available slots
        const availableEvents = events.filter(event => event.available);
        setAvailableSlotCount(availableEvents.length);
        
        // Determine status based on available slots
        if (availableEvents.length === 0) {
          setAvailabilityStatus('Fully booked');
        } else if (availableEvents.length <= 3) {
          setAvailabilityStatus('1 slot left');
        } else {
          setAvailabilityStatus('Available');
        }
        
        // Find the next available date
        if (availableEvents.length > 0) {
          // Sort available events by date
          availableEvents.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
          
          // Find the first available slot
          const nextAvailable = availableEvents[0].startTime;
          
          // Format date as Month Day (e.g., May 27)
          const formattedDate = nextAvailable.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric' 
          });
          
          setNextAvailableDate(formattedDate);
        } else {
          // If fully booked, show the date after the simulation period
          const futureDate = new Date(endDate);
          futureDate.setDate(endDate.getDate() + 7); // One week after the simulation period
          
          setNextAvailableDate(futureDate.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric' 
          }));
        }
      } catch (error) {
        console.error('Error fetching availability:', error);
        // Set fallback values
        setNextAvailableDate('May 27');
        setAvailabilityStatus('Available');
        setAvailableSlotCount(5);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAvailability();
    
    // Refresh availability every 30 minutes (in a real implementation)
    const intervalId = setInterval(fetchAvailability, 30 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Function to open Calendly
  const openCalendly = () => {
    window.open(calendlyUrl, '_blank');
  };
  
  // Determine status color
  const getStatusColor = () => {
    switch (availabilityStatus) {
      case 'Fully booked':
        return 'bg-red-500';
      case '1 slot left':
        return 'bg-yellow-500';
      case 'Available':
        return 'bg-green-500';
      default:
        return 'bg-blue-500';
    }
  };
  
  // Determine container classes based on variant
  const getContainerClasses = () => {
    switch (variant) {
      case 'sticky':
        return 'sticky top-0 z-40 shadow-md';
      case 'floating':
        return 'fixed bottom-24 right-6 z-40 shadow-lg rounded-xl';
      default:
        return 'rounded-xl shadow-md';
    }
  };

  // Availability text based on status
  const getAvailabilityText = () => {
    if (availabilityStatus === 'Fully booked') {
      return 'Fully booked until ' + nextAvailableDate;
    } else if (availabilityStatus === '1 slot left') {
      return `Only ${availableSlotCount} slots left`;
    } else {
      return 'Starting new projects from ' + nextAvailableDate;
    }
  };

  if (isLoading) {
    return (
      <div className={`bg-white ${getContainerClasses()} p-4 flex items-center justify-center`}>
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className={`bg-white ${getContainerClasses()} overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 gap-3 sm:gap-4">
        <div className="flex items-center w-full sm:w-auto">
          <div className="flex-shrink-0 mr-3 sm:mr-4">
            <svg 
              className="w-7 h-7 sm:w-8 sm:h-8 text-blue-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
          </div>
          <div className="min-w-0">
            <div className="text-xs sm:text-sm text-gray-500 font-medium truncate">Next Project Slot</div>
            <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">{getAvailabilityText()}</div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center w-full sm:w-auto gap-3 sm:gap-4">
          <div className="flex items-center mb-1 sm:mb-0">
            <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${getStatusColor()} mr-2`}></div>
            <span className="text-xs sm:text-sm font-medium text-gray-700">{availabilityStatus}</span>
          </div>
          <motion.button 
            onClick={openCalendly}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap text-sm sm:text-base mt-2 mb-[100px] sm:mt-0 sm:mb-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Discovery Call
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default AvailabilityBar; 
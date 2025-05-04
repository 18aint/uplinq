import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Service {
  id: number;
  title: string;
  description: string;
  number: string;
  mockup: React.ReactNode;
}

interface ServiceCardProps {
  title: string;
  description: string;
  number: string;
  mockup: React.ReactNode;
  isVisible: boolean;
}

const phrases = [
  "Best construction company in London",
  "Affordable wedding photographer NYC",
  "Top-rated SaaS design agency",
  "AI marketing tool for startups"
];

// Mockup components for each service
const WebsiteMockup = () => (
  <div className="relative w-full h-full bg-gray-50 rounded-xl p-4 overflow-hidden">
    <motion.div 
      initial={{ width: "0%" }}
      animate={{ width: "100%" }}
      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
      className="h-4 bg-gradient-to-r from-blue-200 via-blue-100 to-gray-100 rounded mb-3"
    />
    <div className="grid grid-cols-2 gap-2">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="bg-gradient-to-br from-blue-100/50 to-blue-50 rounded-lg h-16 relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 1,
              delay: i * 0.2,
            }}
          />
        </motion.div>
      ))}
    </div>
  </div>
);

const ConversionRateOptimization = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    goal: ''
  });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const sequence = async () => {
      // Initial state
      setStep(0);
      setFormData({ name: '', website: '', goal: '' });
      setShowCursor(true);
      setCursorPosition({ x: 120, y: 80 });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Start button click
      setStep(1);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Form filling sequence
      setStep(2);
      setCursorPosition({ x: 40, y: 140 });
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Type company name
      for (const char of 'Sarah Design Co') {
        setFormData(prev => ({ ...prev, name: prev.name + char }));
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Move to website field
      setCursorPosition({ x: 40, y: 200 });
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Type website
      for (const char of 'sarahdesign.co') {
        setFormData(prev => ({ ...prev, website: prev.website + char }));
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Move to goal field
      setCursorPosition({ x: 40, y: 260 });
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Type goal
      for (const char of 'Improve homepage conversions') {
        setFormData(prev => ({ ...prev, goal: prev.goal + char }));
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Move to submit button
      setCursorPosition({ x: 120, y: 340 });
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Submit and loading
      setStep(3);
      setShowCursor(false);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      setStep(4);
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Reset sequence
      setFormData({ name: '', website: '', goal: '' });
      setStep(0);
    };
    
    sequence();
    const interval = setInterval(sequence, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full bg-white rounded-xl overflow-hidden shadow-lg border">
      {/* Browser Chrome */}
      <div className="flex flex-col">
        {/* Tab Bar */}
        <div className="flex items-center px-4 py-2 bg-gray-100 border-b">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-t-lg border border-b-0">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-xs text-gray-600">Conversion Optimizer</span>
          </div>
        </div>
        
        {/* URL Bar */}
        <div className="flex items-center gap-3 px-4 py-2 bg-white border-b">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400 rounded-full" />
            <div className="w-3 h-3 bg-yellow-400 rounded-full" />
            <div className="w-3 h-3 bg-green-400 rounded-full" />
          </div>
          <div className="flex-1 flex items-center gap-2 px-3 py-1 bg-gray-50 rounded text-sm text-gray-600">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            uplinq.ai/optimize
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative h-[420px] md:h-[480px] bg-gradient-to-br from-gray-50 to-white p-6">
        {/* Initial Button */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            opacity: step === 0 ? 1 : 0,
            scale: step === 0 ? 1 : 0.9
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium text-base relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            CTA
            <motion.div
              className="absolute inset-0 bg-white/20"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.button>
        </motion.div>

        {/* Form */}
        <motion.div
          className="absolute inset-0 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [1, 2, 3].includes(step) ? 1 : 0,
            y: [1, 2, 3].includes(step) ? 0 : 20
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input
                type="text"
                value={formData.name}
                readOnly
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white"
                placeholder="Enter your company name"
              />
              <motion.div
                className="absolute right-3 top-[34px] w-0.5 h-4 bg-blue-500"
                animate={{
                  opacity: formData.name ? 0 : [1, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity
                }}
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
              <input
                type="text"
                value={formData.website}
                readOnly
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white"
                placeholder="Enter your website URL"
              />
              <motion.div
                className="absolute right-3 top-[34px] w-0.5 h-4 bg-blue-500"
                animate={{
                  opacity: formData.website ? 0 : [1, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity
                }}
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Optimization Goal</label>
              <input
                type="text"
                value={formData.goal}
                readOnly
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white"
                placeholder="What would you like to improve?"
              />
              <motion.div
                className="absolute right-3 top-[34px] w-0.5 h-4 bg-blue-500"
                animate={{
                  opacity: formData.goal ? 0 : [1, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity
                }}
              />
            </div>
            <motion.button
              className="w-full bg-blue-500 text-white py-2.5 rounded-lg font-medium relative overflow-hidden"
              animate={{
                scale: step === 3 ? [1, 1.02, 1] : 1
              }}
              transition={{ duration: 0.3 }}
            >
              {step === 3 ? (
                <motion.div
                  className="flex items-center justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Analyzing...
                </motion.div>
              ) : (
                "Submit"
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: step === 4 ? 1 : 0,
            scale: step === 4 ? 1 : 0.9
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center">
            <motion.div
              className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <span className="text-2xl text-green-500">✓</span>
            </motion.div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Analysis Started!</h3>
            <p className="text-sm text-gray-600">
              We'll analyze your site and send detailed CRO recommendations within 24 hours.
            </p>
          </div>
        </motion.div>

        {/* Animated Cursor */}
        {showCursor && (
          <motion.div
            className="absolute w-4 h-4 pointer-events-none z-50"
            style={{
              left: cursorPosition.x,
              top: cursorPosition.y,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-4 h-4 border-2 border-blue-500 rounded-full" />
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          </motion.div>
        )}
      </div>
    </div>
  );
};

const ChatBotMockup = () => {
  const messages = [
    { from: "user", text: "Hi, can I get a quote for a website redesign?" },
    { from: "bot", text: "Hello! I'd be happy to help you with that. What type of website are you looking to redesign?" },
    { from: "user", text: "It's an e-commerce site selling handmade jewelry" },
    { from: "bot", text: "Great choice! Approximately how many products do you have, and do you need any specific features like custom filtering or wishlists?" },
    { from: "user", text: "Around 50 products. Yes, we need filtering by material and price" },
    { from: "bot", text: "Perfect, I understand your needs. When would you like to start the project?" },
    { from: "user", text: "Looking to start in June if possible" },
    { from: "bot", text: "Excellent! I'll have our team prepare a detailed quote for an e-commerce redesign with:\n• 50+ product catalog\n• Material & price filtering\n• June start date" },
    { from: "user", text: "That sounds perfect, thank you!" },
    { from: "bot", text: "You're welcome! I'll send the quote to your email within 24 hours. Is there anything else you'd like to know?" }
  ];

  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleMessages((prev) => {
        if (prev >= messages.length) return 0;
        return prev + 1;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (visibleMessages < messages.length && messages[visibleMessages]?.from === "bot") {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 800);
      return () => clearTimeout(timer);
    }
  }, [visibleMessages, messages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      const scrollContainer = chatContainerRef.current;
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [visibleMessages, isTyping]);

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-gray-50 to-white rounded-xl overflow-hidden shadow-lg border">
      {/* Browser Top Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-gray-100 border-b">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-400 rounded-full" />
          <div className="w-3 h-3 bg-yellow-400 rounded-full" />
          <div className="w-3 h-3 bg-green-400 rounded-full" />
        </div>
        <div className="text-sm text-gray-600 flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-blue-500 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
          uplinq.ai/chat
        </div>
        <div className="w-12" />
      </div>

      {/* Header Branding */}
      <div className="px-6 py-4 bg-white border-b flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
          U
        </div>
        <div className="flex-1">
          <span className="text-sm font-medium text-gray-700">Uplinq Assistant</span>
          <div className="text-xs text-gray-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            Online
          </div>
        </div>
      </div>

      {/* Main Chat Container with Shadow Overlay */}
      <div className="relative h-[420px] md:h-[480px]">
        {/* Shadow Overlay */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none opacity-80" />
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none opacity-80" />

        {/* Chat Content */}
        <div 
          ref={chatContainerRef} 
          className="h-full px-6 py-6 flex flex-col gap-4 overflow-y-auto bg-gradient-to-br from-gray-50 to-white scroll-smooth"
        >
          <div className="flex-1 min-h-[60px]" /> {/* Spacer to push content to bottom */}
          {messages.slice(0, visibleMessages).map((msg, i) => (
            <motion.div
              key={i}
              className={`flex items-end gap-3 ${
                msg.from === "bot" ? "self-start" : "self-end flex-row-reverse"
              } max-w-[85%]`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              {msg.from === "bot" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  </div>
                </div>
              )}
              <div
                className={`px-5 py-3.5 rounded-2xl text-sm leading-relaxed ${
                  msg.from === "bot"
                    ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                    : "bg-white border shadow-sm text-gray-700"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              className="flex items-end gap-3 self-start max-w-[85%] mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 px-5 py-3.5 rounded-2xl">
                <motion.div 
                  className="flex gap-1.5"
                  animate={{
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-white rounded-full" />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Powered By Badge */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <div className="text-xs text-gray-400 flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full backdrop-blur-sm">
          Powered by
          <span className="text-gray-600 font-medium">Uplinq AI</span>
        </div>
      </div>
    </div>
  );
};

const MaintenanceMockup = () => {
  const [state, setState] = useState<'error' | 'fixing' | 'restored'>('error');
  const [showTerminal, setShowTerminal] = useState(false);

  useEffect(() => {
    const sequence = async () => {
      // Initial error state
      setState('error');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show terminal and fixing state
      setShowTerminal(true);
      setState('fixing');
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Show restored state
      setState('restored');
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      // Reset sequence
      setShowTerminal(false);
      setState('error');
    };

    sequence();
    const interval = setInterval(sequence, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full bg-white rounded-xl overflow-hidden shadow-lg border">
      {/* Browser Chrome */}
      <div className="flex flex-col">
        {/* Tab Bar */}
        <div className="flex items-center px-4 py-2 bg-gray-100 border-b">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-t-lg border border-b-0">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-xs text-gray-600">Portfolio Page</span>
          </div>
        </div>
        
        {/* URL Bar */}
        <div className="flex items-center gap-3 px-4 py-2 bg-white border-b">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400 rounded-full" />
            <div className="w-3 h-3 bg-yellow-400 rounded-full" />
            <div className="w-3 h-3 bg-green-400 rounded-full" />
          </div>
          <div className="flex-1 flex items-center gap-2 px-3 py-1 bg-gray-50 rounded text-sm text-gray-600">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            uplinq.ai/portfolio
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative h-[420px] md:h-[480px] bg-gradient-to-br from-gray-50 to-white">
        {/* Error State */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: state === 'error' ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 mb-6 text-red-500"
          >
            <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </motion.div>
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl font-medium text-gray-900 mb-2"
          >
            404 - Page Not Found
          </motion.h3>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-center max-w-sm"
          >
            The page you're looking for doesn't exist or has been moved.
          </motion.p>
        </motion.div>

        {/* Terminal/Fixing State */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: state === 'fixing' ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full max-w-md bg-gray-900 rounded-lg overflow-hidden shadow-xl">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="text-xs text-gray-400">maintenance.sh</div>
              <div className="w-12" />
            </div>
            <div className="p-4 font-mono text-sm">
              <div className="text-green-400">$ Running maintenance script...</div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-300 mt-2"
              >
                {'>'}  Checking file system...
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-gray-300 mt-1"
              >
                {'>'}  Repairing broken links...
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-gray-300 mt-1"
              >
                {'>'}  Restoring page content...
              </motion.div>
              <motion.div
                className="w-full h-1 bg-gray-800 rounded-full mt-4 overflow-hidden"
              >
                <motion.div
                  className="h-full bg-green-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2 }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Restored State */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: state === 'restored' ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 mb-6 text-green-500"
          >
            <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.div>
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl font-medium text-gray-900 mb-2"
          >
            Page Restored Successfully
          </motion.h3>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-center max-w-sm mb-4"
          >
            Your page has been automatically restored and is now accessible.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 text-sm font-medium rounded-full"
          >
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            Resolved via VitalFlow Plan
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const SEOMockup = () => {
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let i = 0;
    let current = phrases[currentIndex];
    let typing = true;

    const interval = setInterval(() => {
      if (typing) {
        if (i <= current.length) {
          setText(current.slice(0, i++));
        } else {
          typing = false;
          setTimeout(() => {}, 1000);
        }
      } else {
        if (i >= 0) {
          setText(current.slice(0, i--));
        } else {
          setCurrentIndex((prev) => (prev + 1) % phrases.length);
          typing = true;
        }
      }
    }, 80);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full h-full bg-gray-50 rounded-xl p-6">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
        </div>
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-3 flex items-center">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={text}
            readOnly
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none"
            placeholder="Search for..."
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1 h-5 bg-blue-500 animate-blink" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50" />
            <div className="flex-1">
              <div className="h-2 bg-gray-200 rounded w-3/4 mb-1" />
              <div className="h-2 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-purple-50" />
            <div className="flex-1">
              <div className="h-2 bg-gray-200 rounded w-2/3 mb-1" />
              <div className="h-2 bg-gray-200 rounded w-1/3" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-100 to-pink-50" />
            <div className="flex-1">
              <div className="h-2 bg-gray-200 rounded w-5/6 mb-1" />
              <div className="h-2 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const services: Service[] = [
  {
    id: 1,
    title: "SEO Optimization",
    description: "We craft data-driven, search-optimized content strategies tailored to rank your brand higher across every industry.",
    number: "01",
    mockup: <SEOMockup />,
  },
  {
    id: 2,
    title: "Conversion Rate Optimization",
    description: "Transform your app ideas into interactive prototypes with smooth animations and intuitive user flows.",
    number: "02",
    mockup: <ConversionRateOptimization />,
  },
  {
    id: 3,
    title: "Virtual Chat Assistant",
    description: "Enhance customer engagement with a smart, always-on virtual assistant that responds in real-time, collects leads, and automates FAQs—fully integrated and brand-aligned.",
    number: "03",
    mockup: <ChatBotMockup />,
  },
  {
    id: 4,
    title: "Website Maintenance & Monitoring",
    description: "Keep your site secure, lightning-fast, and always online. We provide real-time performance tracking, uptime monitoring, speed optimizations, and proactive technical maintenance.",
    number: "04",
    mockup: <MaintenanceMockup />,
  },
];

const ServiceCard = ({ title, description, number, mockup, isVisible }: ServiceCardProps) => {
  return (
    <div 
      className={`bg-white rounded-[20px] p-8 transition-all duration-700 ease-out transform ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      } hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 group text-left`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl text-gray-900 font-normal">{title}</h3>
        <span className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white text-sm rounded-full">
          {number}
        </span>
      </div>
      <p className="text-gray-600 text-base leading-relaxed mb-8">
        {description}
      </p>
      <div className="h-[420px] md:h-[480px] transition-all duration-300 overflow-hidden rounded-xl">
        {mockup}
      </div>
    </div>
  );
};

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-24 px-4 bg-white mt-[-200px]">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Section Label */}
        <div className={`flex items-center gap-2 mb-4 transition-all duration-700 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span className="text-sm text-gray-600">Services</span>
        </div>

        {/* Heading */}
        <h2 className={`text-[42px] leading-tight font-light text-gray-900 mb-20 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          Web services tailored for<br />your business goals
        </h2>


        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              {...service}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

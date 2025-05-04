import { motion } from 'framer-motion';
import { useState } from 'react';
import ChatModal from './ChatModal';

const ChatCTA = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <section className="px-4 py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full rounded-[24px] bg-gradient-to-r from-[#5F9CFF] to-[#2D72F9] px-6 py-16 md:py-20 flex flex-col items-center text-center"
        >
          {/* Icon */}
          <div className="mb-6">
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="text-white"
            >
              <path 
                d="M13 3L4.8 12.9c-.2.2-.3.4-.3.7 0 .6.4 1 1 1H11v6.6c0 .3.1.5.3.7.4.4 1.1.4 1.4 0l8.2-9.9c.2-.2.3-.4.3-.7 0-.6-.4-1-1-1H14V3.7c0-.3-.1-.5-.3-.7-.4-.4-1.1-.4-1.4 0z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Text Content */}
          <h2 className="text-3xl md:text-5xl font-thin text-white mb-3">
            Still don't know?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Ask Uplinq AI to help you decide.
          </p>

          {/* CTA Button */}
          <motion.button
            onClick={() => setShowChat(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-8 py-3 rounded-full bg-white text-blue-600 font-medium transition-colors hover:bg-white/95"
          >
            Ask now
            <svg 
              className="ml-2" 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none"
            >
              <path 
                d="M3.33337 8H12.6667M12.6667 8L8.00004 3.33333M12.6667 8L8.00004 12.6667" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>

          {/* Chat Modal */}
          <ChatModal isOpen={showChat} onClose={() => setShowChat(false)} />
        </motion.div>
      </div>
    </section>
  );
};

export default ChatCTA; 
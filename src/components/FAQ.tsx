import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "What services does Uplinq offer?",
    answer: "Uplinq delivers end-to-end website strategy—from design and build to SEO, CRO, branding, and ongoing maintenance."
  },
  {
    question: "Do you offer monthly retainers?",
    answer: "Yes. We offer flexible retainer packages for performance monitoring, design iterations, SEO, and support."
  },
  {
    question: "Can Uplinq optimize my existing website?",
    answer: "Absolutely. We specialize in optimizing existing websites through audits, conversions, and speed improvements."
  },
  {
    question: "How quickly can a project start?",
    answer: "Depending on scope, we can kick off within a few days following the discovery session."
  },
  {
    question: "What platforms do you support?",
    answer: "We build primarily on modern stacks (Next.js, Framer, Vercel, Webflow) and can integrate with most CMS platforms."
  }
];

const FAQItem = ({ question, answer, isOpen, onToggle }: { 
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <motion.div
      className="border border-gray-100 rounded-2xl overflow-hidden bg-white"
      initial={false}
      animate={{ backgroundColor: isOpen ? 'rgb(255, 255, 255)' : 'rgb(250, 250, 250)' }}
      transition={{ duration: 0.2 }}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between text-left"
      >
        <span className="text-base font-medium text-gray-900">{question}</span>
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? -135 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 ml-4"
        >
          <div className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-blue-500">
            <svg width="10" height="10" viewBox="0 0 10 10">
              <motion.path
                d="M5 0v10M0 5h10"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-blue-500"
                initial={false}
                animate={{ opacity: isOpen ? 0.6 : 1 }}
              />
            </svg>
          </div>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-4 text-gray-600">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-4 bg-[#F9FCFD]" id="faq">
      <div className="max-w-3xl mx-auto text-center">
        {/* Section Label */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span className="text-sm text-gray-600">FAQ's</span>
        </div>

        {/* Heading */}
        <h2 className="text-[42px] leading-tight font-light text-gray-900 mb-4">
          Answers to your common<br />website questions
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Get clarity on how Uplinq helps you scale, optimize, and grow your digital presence.
        </p>

        {/* FAQ Items */}
        <div className="space-y-4 text-left">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ; 
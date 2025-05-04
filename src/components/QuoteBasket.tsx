import { motion } from 'framer-motion';
import { ClipboardIcon, RemoveIcon, EmailIcon } from './QuoteIcons';

interface QuoteBasketProps {
  items: {
    id: string;
    category: string;
    name: string;
    price: number;
  }[];
  total: number;
  onRemoveItem: (itemId: string, category: string) => void;
  calendlyUrl: string;
}

const QuoteBasket = ({ items, total, onRemoveItem, calendlyUrl }: QuoteBasketProps) => {
  const handleDownloadQuote = () => {
    // Create quote data
    const quoteDate = new Date().toLocaleDateString();
    const quoteData = `
Uplinq Project Estimate
Generated on: ${quoteDate}

PROJECT SUMMARY
==============
${items.map(item => `${item.category}: ${item.name} - £${item.price.toLocaleString()}`).join('\n')}

TOTAL ESTIMATE: £${total.toLocaleString()}

This estimate is based on your selected options and is subject to final confirmation
during our discovery call. For more detailed information or to discuss your project,
please book a call at ${calendlyUrl}

Uplinq Digital Services
support@uplinq.co
`;

    // Create and trigger download
    const element = document.createElement('a');
    const file = new Blob([quoteData], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `uplinq-project-estimate-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  return (
    <aside className="w-full max-w-md mx-auto lg:mx-0 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-blue-100 p-4 md:p-6 flex flex-col min-h-[220px] transition-all duration-300 overflow-visible">
      <div className="flex-1 flex flex-col justify-between">
        {/* Empty State or Items */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8 px-2">
            <ClipboardIcon className="w-10 h-10 text-blue-200 mb-4" />
            <p className="text-base md:text-lg text-gray-500 mb-2">Start building your custom project — select a platform and features to get an instant quote.</p>
            <div className="w-full border-2 border-dashed border-blue-100 rounded-xl mt-4 p-4 flex items-center justify-center bg-blue-50/30 shadow-sm">
              <span className="text-blue-300 text-sm">Waiting for your selection…</span>
            </div>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-blue-50 mb-4">
              {items.map((item, idx) => (
                <motion.li
                  key={item.id + item.category}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2, delay: idx * 0.04 }}
                  className="flex items-center justify-between py-3 px-1 gap-2"
                >
                  <div className="flex-1 min-w-0">
                    <span className="block font-medium text-gray-900 dark:text-white text-sm md:text-base truncate">{item.name}</span>
                    <span className="block text-xs text-gray-400">{item.category}</span>
                  </div>
                  <span className="font-semibold text-blue-600 text-sm md:text-base">£{item.price.toLocaleString()}</span>
                  <button
                    onClick={() => onRemoveItem(item.id, item.category)}
                    className="ml-2 p-2 rounded hover:bg-blue-50 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={`Remove ${item.name}`}
                  >
                    <RemoveIcon className="w-4 h-4 text-blue-400" />
                  </button>
                </motion.li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-blue-100">
              <div className="flex justify-between items-center mb-4">
                <span className="text-base font-medium text-gray-900">Total Estimate</span>
                <span className="text-xl font-bold text-blue-600">£{total.toLocaleString()}</span>
              </div>
              <div className="flex flex-col gap-3 mt-4">
                <motion.a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg flex items-center justify-center transition-colors hover:bg-blue-700 shadow-sm"
                >
                  Book This Quote
                </motion.a>
                <motion.button
                  onClick={handleDownloadQuote}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 border border-blue-200 bg-white text-blue-700 font-semibold rounded-lg flex items-center justify-center transition-colors hover:bg-blue-50 shadow-sm"
                >
                  <EmailIcon className="w-5 h-5 mr-2" />
                  Send to My Email
                </motion.button>
              </div>
              <p className="text-xs text-gray-400 text-center mt-4">
                No commitment required. Let's explore how we can bring your vision to life.
              </p>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

export default QuoteBasket; 
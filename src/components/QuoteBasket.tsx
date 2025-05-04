import { motion } from 'framer-motion';

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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-100">
        <h3 className="text-xl font-medium text-gray-900 mb-1">Your Project Estimate</h3>
        <p className="text-sm text-gray-600">
          {items.length > 0 
            ? 'Based on your selected requirements' 
            : 'Select options to build your estimate'}
        </p>
      </div>
      
      <div className="p-6">
        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg 
              className="w-12 h-12 mx-auto mb-4 text-gray-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            <p>Start by selecting your project type</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {/* Group items by category */}
              {Array.from(new Set(items.map(item => item.category))).map(category => (
                <div key={category} className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">{category}</h4>
                  <div className="space-y-3">
                    {items
                      .filter(item => item.category === category)
                      .map(item => (
                        <div 
                          key={`${item.category}-${item.id}`} 
                          className="py-2 px-3 bg-gray-50 rounded-lg flex justify-between items-center"
                        >
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <div className="flex items-center">
                            <span className="text-blue-600 font-medium mr-3">£{item.price.toLocaleString()}</span>
                            <button 
                              onClick={() => onRemoveItem(item.id, item.category)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-medium text-gray-900">Total Estimate</span>
                <span className="text-xl font-semibold text-blue-600">£{total.toLocaleString()}</span>
              </div>
              
              <div className="text-sm text-gray-600 mb-6">
                <p>This is an initial estimate based on your selections. To discuss specific requirements and get a detailed proposal, schedule a discovery call with our team.</p>
              </div>
              
              <div className="space-y-3">
                <motion.a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg flex items-center justify-center transition-colors hover:bg-blue-700"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book Discovery Call
                </motion.a>
                
                <motion.button
                  onClick={handleDownloadQuote}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 border border-gray-300 bg-white text-gray-700 font-medium rounded-lg flex items-center justify-center transition-colors hover:bg-gray-50"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Estimate
                </motion.button>
              </div>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                No commitment required. Let's explore how we can bring your vision to life.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuoteBasket; 
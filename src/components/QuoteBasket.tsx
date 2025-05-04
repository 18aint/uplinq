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
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 bg-blue-50 border-b border-blue-100">
        <h3 className="text-xl font-medium text-gray-900 mb-1">Your Quote Basket</h3>
        <p className="text-sm text-gray-600">
          {items.length > 0 
            ? 'Your project configuration and estimate' 
            : 'Add items to get your estimate'}
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
            <p>Select options to build your quote</p>
          </div>
        ) : (
          <>
            <div className="divide-y">
              {items.map((item) => (
                <div key={`${item.category}-${item.id}`} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <p className="font-medium text-gray-900">{item.name}</p>
                  </div>
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
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-medium text-gray-900">Total Estimate</span>
                <span className="text-xl font-semibold text-blue-600">£{total.toLocaleString()}</span>
              </div>
              
              <div className="text-sm text-gray-600 mb-6">
                <p>This estimate is based on your selected options. For a detailed quote and timeline, book a discovery call with our team.</p>
              </div>
              
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
              
              <p className="text-xs text-gray-500 text-center mt-4">
                No commitment required. Discover how we can bring your project to life.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuoteBasket; 
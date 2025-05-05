import { motion } from 'framer-motion';
import { useState } from 'react';

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  plan?: string;
  priceId?: string; // Stripe price ID
  onCheckout?: (priceId: string, title: string, description: string) => void;
}

const PricingCard = ({ 
  title, 
  price, 
  description, 
  features, 
  cta, 
  highlight = false, 
  plan = "", 
  priceId = "",
  onCheckout
}: PricingCardProps) => {
  const [isLoading, setIsLoading] = useState(false);



  const handleClick = async () => {
    if (onCheckout) {
      setIsLoading(true);
      try {
        await onCheckout(priceId, title, description);
      } finally {
        setIsLoading(false);
      }
    } else {
      window.location.href = `/start-project?plan=${encodeURIComponent(plan || title)}&price=${encodeURIComponent(price)}`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative border rounded-2xl p-8 shadow-sm transition-all hover:shadow-md ${
        highlight ? "border-blue-500" : "border-gray-200"
      }`}
    >
      {highlight && (
        <div className="absolute -top-4 inset-x-0 mx-auto w-max px-4 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
          Most Popular
        </div>
      )}
      
      <h3 className="text-xl font-light mb-2">{title}</h3>
      <p className="text-3xl font-light mb-2">{price}</p>
      <p className="text-gray-500 mb-6 text-sm">{description}</p>
      
      <ul className="space-y-3 text-sm text-gray-700 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="mt-1.5 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <motion.button
        onClick={handleClick}
        disabled={isLoading}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        className={`w-full py-3 rounded-lg transition-colors ${
          highlight
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
        } ${isLoading ? 'cursor-not-allowed opacity-80' : ''}`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          cta
        )}
      </motion.button>
    </motion.div>
  );
};

export default PricingCard; 
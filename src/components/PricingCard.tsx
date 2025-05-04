import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  plan?: string;
}

const PricingCard = ({ title, price, description, features, cta, highlight = false, plan = "" }: PricingCardProps) => {
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
      
      <Link to={`/start-project?plan=${encodeURIComponent(plan || title)}&price=${encodeURIComponent(price)}`}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 rounded-lg transition-colors ${
            highlight
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          {cta}
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default PricingCard; 
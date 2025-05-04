import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuoteBasket from './QuoteBasket';

// Pricing data
interface PricingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  icon?: string;
}

interface SelectedItem {
  id: string;
  category: string;
  name: string;
  price: number;
}

// Platform options
const platformOptions: PricingOption[] = [
  { 
    id: 'web-app', 
    name: 'Web Application', 
    description: 'Full-featured web app with user accounts and data management',
    price: 8000,
    icon: '🖥️'
  },
  { 
    id: 'e-commerce', 
    name: 'E-commerce Site', 
    description: 'Online store with product catalog and checkout',
    price: 7000,
    icon: '🛒'
  },
  { 
    id: 'landing-page', 
    name: 'Landing Page', 
    description: 'High-converting single page site to showcase your product',
    price: 2500,
    icon: '📝'
  },
  { 
    id: 'mobile-app', 
    name: 'Mobile Application', 
    description: 'Native iOS and Android applications',
    price: 12000,
    icon: '📱'
  }
];

// Feature options
const featureOptions: PricingOption[] = [
  { 
    id: 'auth', 
    name: 'Authentication System', 
    description: 'User accounts, login, and permissions',
    price: 1500,
    icon: '🔐'
  },
  { 
    id: 'cms', 
    name: 'Content Management', 
    description: 'Easy content editing and publishing',
    price: 1800,
    icon: '📄'
  },
  { 
    id: 'payments', 
    name: 'Payment Processing', 
    description: 'Secure credit card and alternative payment methods',
    price: 2000,
    icon: '💳'
  },
  { 
    id: 'chat', 
    name: 'Live Chat', 
    description: 'Real-time customer support and messaging',
    price: 1200,
    icon: '💬'
  },
  { 
    id: 'admin', 
    name: 'Admin Dashboard', 
    description: 'Comprehensive control panel for your team',
    price: 2500,
    icon: '📊'
  }
];

// Complexity levels
const complexityOptions: PricingOption[] = [
  { 
    id: 'basic', 
    name: 'Basic', 
    description: 'Essential features with standard design',
    price: 0,  // Base price included in platform
    icon: '📌'
  },
  { 
    id: 'standard', 
    name: 'Standard', 
    description: 'Enhanced features and custom design elements',
    price: 3000,
    icon: '✨'
  },
  { 
    id: 'scalable', 
    name: 'Scalable Enterprise', 
    description: 'High-performance architecture ready for growth',
    price: 7000,
    icon: '🚀'
  }
];

// Timeline options
const timelineOptions: PricingOption[] = [
  { 
    id: 'standard', 
    name: 'Standard Timeline', 
    description: 'Regular development schedule',
    price: 0,  // Base price
    icon: '📅'
  },
  { 
    id: 'fast-track', 
    name: 'Fast-Track', 
    description: 'Expedited development with priority resources',
    price: 4000,
    icon: '⚡'
  }
];

// Add-on options
const addonOptions: PricingOption[] = [
  { 
    id: 'seo', 
    name: 'SEO Optimization', 
    description: 'On-page SEO setup and optimization',
    price: 1200,
    icon: '🔍'
  },
  { 
    id: 'analytics', 
    name: 'Analytics Integration', 
    description: 'Detailed tracking and reporting dashboard',
    price: 800,
    icon: '📈'
  },
  { 
    id: 'maintenance', 
    name: 'Ongoing Maintenance', 
    description: '3 months of updates and support',
    price: 2400,
    icon: '🔧'
  }
];

const PricingCalculator = () => {
  // State for selected options
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedComplexity, setSelectedComplexity] = useState<string>('basic');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('standard');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  
  // State for quote basket
  const [basketItems, setBasketItems] = useState<SelectedItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [basketVisible, setBasketVisible] = useState<boolean>(false);
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  
  // Update the quote basket whenever selections change
  useEffect(() => {
    const newBasketItems: SelectedItem[] = [];
    let newTotalPrice = 0;
    
    // Add platform
    if (selectedPlatform) {
      const platform = platformOptions.find(p => p.id === selectedPlatform);
      if (platform) {
        newBasketItems.push({
          id: platform.id,
          category: 'Platform',
          name: platform.name,
          price: platform.price
        });
        newTotalPrice += platform.price;
      }
    }
    
    // Add features
    selectedFeatures.forEach(featureId => {
      const feature = featureOptions.find(f => f.id === featureId);
      if (feature) {
        newBasketItems.push({
          id: feature.id,
          category: 'Feature',
          name: feature.name,
          price: feature.price
        });
        newTotalPrice += feature.price;
      }
    });
    
    // Add complexity
    const complexity = complexityOptions.find(c => c.id === selectedComplexity);
    if (complexity && complexity.price > 0) {
      newBasketItems.push({
        id: complexity.id,
        category: 'Complexity',
        name: complexity.name,
        price: complexity.price
      });
      newTotalPrice += complexity.price;
    }
    
    // Add timeline
    const timeline = timelineOptions.find(t => t.id === selectedTimeline);
    if (timeline && timeline.price > 0) {
      newBasketItems.push({
        id: timeline.id,
        category: 'Timeline',
        name: timeline.name,
        price: timeline.price
      });
      newTotalPrice += timeline.price;
    }
    
    // Add add-ons
    selectedAddons.forEach(addonId => {
      const addon = addonOptions.find(a => a.id === addonId);
      if (addon) {
        newBasketItems.push({
          id: addon.id,
          category: 'Add-on',
          name: addon.name,
          price: addon.price
        });
        newTotalPrice += addon.price;
      }
    });
    
    setBasketItems(newBasketItems);
    setTotalPrice(newTotalPrice);
    
    // Show quote basket if any selection is made
    if (newBasketItems.length > 0) {
      setBasketVisible(true);
      // Add a slight delay to fade in the basket for a smoother experience
      setTimeout(() => setFadeIn(true), 100);
    } else {
      setFadeIn(false);
      setTimeout(() => setBasketVisible(false), 300);
    }
  }, [selectedPlatform, selectedFeatures, selectedComplexity, selectedTimeline, selectedAddons]);
  
  // Handle platform selection
  const handlePlatformSelect = (platformId: string) => {
    setSelectedPlatform(platformId === selectedPlatform ? null : platformId);
  };
  
  // Handle feature toggle
  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId) 
        : [...prev, featureId]
    );
  };
  
  // Handle complexity selection
  const handleComplexitySelect = (complexityId: string) => {
    setSelectedComplexity(complexityId);
  };
  
  // Handle timeline selection
  const handleTimelineSelect = (timelineId: string) => {
    setSelectedTimeline(timelineId);
  };
  
  // Handle add-on toggle
  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId) 
        : [...prev, addonId]
    );
  };
  
  // Remove item from basket
  const handleRemoveItem = (itemId: string, category: string) => {
    if (category === 'Platform') {
      setSelectedPlatform(null);
    } else if (category === 'Feature') {
      setSelectedFeatures(prev => prev.filter(id => id !== itemId));
    } else if (category === 'Complexity') {
      setSelectedComplexity('basic');
    } else if (category === 'Timeline') {
      setSelectedTimeline('standard');
    } else if (category === 'Add-on') {
      setSelectedAddons(prev => prev.filter(id => id !== itemId));
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">Build Your Project Quote</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Configure your project requirements and get an instant estimate. Mix and match features to create your ideal solution.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-8">
          {/* Platform Selection */}
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-medium text-gray-900 mb-4">Choose Your Platform</h3>
            <p className="text-gray-600 mb-6">Select the type of digital product you want to build</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {platformOptions.map(platform => (
                <motion.div 
                  key={platform.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedPlatform === platform.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                  }`}
                  onClick={() => handlePlatformSelect(platform.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{platform.icon}</span>
                      <div>
                        <h4 className="font-medium text-gray-900">{platform.name}</h4>
                        <p className="text-sm text-gray-600">{platform.description}</p>
                      </div>
                    </div>
                    <span className="text-blue-600 font-medium">£{platform.price.toLocaleString()}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
          
          {/* Feature Selection */}
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-medium text-gray-900 mb-4">Select Features</h3>
            <p className="text-gray-600 mb-6">Choose the functionalities you need for your project</p>
            
            <div className="space-y-3">
              {featureOptions.map(feature => (
                <motion.div 
                  key={feature.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedFeatures.includes(feature.id) 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleFeatureToggle(feature.id)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{feature.icon}</span>
                      <div>
                        <h4 className="font-medium text-gray-900">{feature.name}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-blue-600 font-medium mr-3">£{feature.price.toLocaleString()}</span>
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                        selectedFeatures.includes(feature.id) 
                          ? 'bg-blue-500 border-blue-500 text-white' 
                          : 'border-gray-300'
                      }`}>
                        {selectedFeatures.includes(feature.id) && (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
          
          {/* Complexity and Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Complexity Selection */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Complexity Level</h3>
              <p className="text-gray-600 mb-6">Choose based on your project requirements</p>
              
              <div className="space-y-3">
                {complexityOptions.map(complexity => (
                  <motion.div 
                    key={complexity.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedComplexity === complexity.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleComplexitySelect(complexity.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-xl mr-3">{complexity.icon}</span>
                        <h4 className="font-medium text-gray-900">{complexity.name}</h4>
                      </div>
                      <span className="text-blue-600 font-medium">
                        {complexity.price > 0 ? `£${complexity.price.toLocaleString()}` : 'Included'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 ml-8">{complexity.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>
            
            {/* Timeline Selection */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Timeline Preference</h3>
              <p className="text-gray-600 mb-6">Select your preferred development speed</p>
              
              <div className="space-y-3">
                {timelineOptions.map(timeline => (
                  <motion.div 
                    key={timeline.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedTimeline === timeline.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleTimelineSelect(timeline.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-xl mr-3">{timeline.icon}</span>
                        <h4 className="font-medium text-gray-900">{timeline.name}</h4>
                      </div>
                      <span className="text-blue-600 font-medium">
                        {timeline.price > 0 ? `£${timeline.price.toLocaleString()}` : 'Included'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 ml-8">{timeline.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
          
          {/* Add-ons */}
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-medium text-gray-900 mb-4">Add-ons & Enhancements</h3>
            <p className="text-gray-600 mb-6">Optimize and extend your project with these additional services</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {addonOptions.map(addon => (
                <motion.div 
                  key={addon.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedAddons.includes(addon.id) 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleAddonToggle(addon.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">{addon.icon}</span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      selectedAddons.includes(addon.id) 
                        ? 'bg-blue-500 border-blue-500 text-white' 
                        : 'border-gray-300'
                    }`}>
                      {selectedAddons.includes(addon.id) && (
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <h4 className="font-medium text-gray-900">{addon.name}</h4>
                  <p className="text-xs text-gray-600 mb-2">{addon.description}</p>
                  <p className="text-blue-600 font-medium text-sm">£{addon.price.toLocaleString()}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
        
        {/* Quote Basket */}
        <div className="lg:col-span-1">
          <AnimatePresence>
            {basketVisible && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: fadeIn ? 1 : 0, y: fadeIn ? 0 : 20 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="sticky top-24"
              >
                <QuoteBasket 
                  items={basketItems} 
                  total={totalPrice} 
                  onRemoveItem={handleRemoveItem}
                  calendlyUrl="https://calendly.com/waynekuvi"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator; 
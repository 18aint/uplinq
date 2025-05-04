import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import QuoteBasket from './QuoteBasket';
import { WebIcon, StoreIcon, LandingIcon, MobileIcon, UserIcon, CMSIcon, PaymentsIcon, ChatIcon, NotificationIcon, AdminIcon, ReportingIcon, ComplexityIcon, TimelineIcon, SEOIcon, AnalyticsIcon, MaintenanceIcon, ContentIcon } from './QuoteIcons';

// Pricing data
interface PricingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  icon?: React.ReactNode;
  category?: string;
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
    name: 'Website & Web App', 
    description: 'Interactive site with user accounts and personalized experiences',
    price: 8000,
    icon: <WebIcon />
  },
  { 
    id: 'e-commerce', 
    name: 'Online Store', 
    description: 'Sell products online with a complete shopping experience',
    price: 7000,
    icon: <StoreIcon />
  },
  { 
    id: 'landing-page', 
    name: 'Landing Page', 
    description: 'Focused, high-converting page to showcase your offer',
    price: 2500,
    icon: <LandingIcon />
  },
  { 
    id: 'mobile-app', 
    name: 'Mobile App', 
    description: 'Native applications for iOS and Android devices',
    price: 12000,
    icon: <MobileIcon />
  }
];

// Feature options - Organized by categories
const featureOptions: PricingOption[] = [
  // Essentials
  { 
    id: 'auth', 
    name: 'User Accounts & Login', 
    description: 'Let users create accounts and access personalized features',
    price: 1500,
    icon: <UserIcon />,
    category: 'Essentials'
  },
  { 
    id: 'cms', 
    name: 'Content Management', 
    description: 'Easily update content without touching code',
    price: 1800,
    icon: <CMSIcon />,
    category: 'Essentials'
  },
  { 
    id: 'payments', 
    name: 'Secure Payments', 
    description: 'Accept credit cards and other payment methods securely',
    price: 2000,
    icon: <PaymentsIcon />,
    category: 'Essentials'
  },
  
  // Engagement
  { 
    id: 'chat', 
    name: 'Live Chat Support', 
    description: 'Talk with customers in real-time on your site',
    price: 1200,
    icon: <ChatIcon />,
    category: 'Engagement'
  },
  {
    id: 'notifications',
    name: 'User Notifications',
    description: 'Keep users informed with timely alerts and messages',
    price: 1400,
    icon: <NotificationIcon />,
    category: 'Engagement'
  },
  
  // Admin & Analytics
  { 
    id: 'admin', 
    name: 'Business Dashboard', 
    description: 'Manage your site with comprehensive controls and insights',
    price: 2500,
    icon: <AdminIcon />,
    category: 'Admin & Analytics'
  },
  {
    id: 'reporting',
    name: 'Advanced Reporting',
    description: 'Get detailed insights on users and performance',
    price: 1800,
    icon: <ReportingIcon />,
    category: 'Admin & Analytics'
  }
];

// Complexity levels
const complexityOptions: PricingOption[] = [
  { 
    id: 'basic', 
    name: 'Standard', 
    description: 'Core features with professional design and functionality',
    price: 0,  // Base price included in platform
    icon: <ComplexityIcon />
  },
  { 
    id: 'standard', 
    name: 'Enhanced', 
    description: 'Custom design touches and additional functionality',
    price: 3000,
    icon: <ComplexityIcon />
  },
  { 
    id: 'scalable', 
    name: 'Enterprise Ready', 
    description: 'Optimized for high traffic and future growth',
    price: 7000,
    icon: <ComplexityIcon />
  }
];

// Timeline options
const timelineOptions: PricingOption[] = [
  { 
    id: 'standard', 
    name: 'Standard Timeline', 
    description: 'Typical development schedule (8-12 weeks)',
    price: 0,  // Base price
    icon: <TimelineIcon />
  },
  { 
    id: 'fast-track', 
    name: 'Priority Timeline', 
    description: 'Expedited development (4-6 weeks)',
    price: 4000,
    icon: <TimelineIcon />
  }
];

// Enhancement options (formerly add-ons)
const enhancementOptions: PricingOption[] = [
  { 
    id: 'seo', 
    name: 'SEO Optimization', 
    description: 'Help your site rank higher in search results',
    price: 1200,
    icon: <SEOIcon />
  },
  { 
    id: 'analytics', 
    name: 'Analytics Setup', 
    description: 'Track visitor behavior with detailed insights',
    price: 800,
    icon: <AnalyticsIcon />
  },
  { 
    id: 'maintenance', 
    name: '3-Month Support', 
    description: 'Ongoing updates, improvements, and technical help',
    price: 2400,
    icon: <MaintenanceIcon />
  },
  {
    id: 'content',
    name: 'Content Creation',
    description: 'Professional copy and imagery for key pages',
    price: 1500,
    icon: <ContentIcon />
  }
];

const PricingCalculator = () => {
  // Refs for scrolling
  const featuresRef = useRef<HTMLDivElement>(null);
  const complexityRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const enhancementsRef = useRef<HTMLDivElement>(null);
  
  // State for selected options
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedComplexity, setSelectedComplexity] = useState<string>('basic');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('standard');
  const [selectedEnhancements, setSelectedEnhancements] = useState<string[]>([]);
  
  // State for UI
  const [activeStep, setActiveStep] = useState<number>(1);
  
  // State for quote basket
  const [basketItems, setBasketItems] = useState<SelectedItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  
  // Auto-scroll to next section when platform is selected
  useEffect(() => {
    if (selectedPlatform && featuresRef.current && activeStep === 1) {
      setTimeout(() => {
        featuresRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveStep(2);
      }, 300);
    }
  }, [selectedPlatform, activeStep]);
  
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
          category: feature.category || 'Feature',
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
    
    // Add enhancements
    selectedEnhancements.forEach(enhancementId => {
      const enhancement = enhancementOptions.find(a => a.id === enhancementId);
      if (enhancement) {
        newBasketItems.push({
          id: enhancement.id,
          category: 'Enhancement',
          name: enhancement.name,
          price: enhancement.price
        });
        newTotalPrice += enhancement.price;
      }
    });
    
    setBasketItems(newBasketItems);
    setTotalPrice(newTotalPrice);
  }, [selectedPlatform, selectedFeatures, selectedComplexity, selectedTimeline, selectedEnhancements]);
  
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
    
    // Auto-scroll to timeline section
    if (timelineRef.current && activeStep === 3) {
      setTimeout(() => {
        timelineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveStep(4);
      }, 300);
    }
  };
  
  // Handle timeline selection
  const handleTimelineSelect = (timelineId: string) => {
    setSelectedTimeline(timelineId);
    
    // Auto-scroll to enhancements section
    if (enhancementsRef.current && activeStep === 4) {
      setTimeout(() => {
        enhancementsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveStep(5);
      }, 300);
    }
  };
  
  // Handle enhancement toggle
  const handleEnhancementToggle = (enhancementId: string) => {
    setSelectedEnhancements(prev => 
      prev.includes(enhancementId) 
        ? prev.filter(id => id !== enhancementId) 
        : [...prev, enhancementId]
    );
  };
  
  // Remove item from basket
  const handleRemoveItem = (itemId: string, category: string) => {
    if (category === 'Platform') {
      setSelectedPlatform(null);
      setActiveStep(1);
    } else if (category === 'Essentials' || category === 'Engagement' || category === 'Admin & Analytics') {
      setSelectedFeatures(prev => prev.filter(id => id !== itemId));
    } else if (category === 'Complexity') {
      setSelectedComplexity('basic');
    } else if (category === 'Timeline') {
      setSelectedTimeline('standard');
    } else if (category === 'Enhancement') {
      setSelectedEnhancements(prev => prev.filter(id => id !== itemId));
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
      {/* Progress indicator */}
      <div className="hidden md:block mb-10">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {[
            { number: 1, label: 'Project Type' },
            { number: 2, label: 'Features' },
            { number: 3, label: 'Complexity' },
            { number: 4, label: 'Timeline' },
            { number: 5, label: 'Enhancements' }
          ].map((step) => (
            <div key={step.number} className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                  activeStep >= step.number 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {step.number}
              </div>
              <span className={`text-sm ${
                activeStep >= step.number ? 'text-gray-700' : 'text-gray-400'
              }`}>{step.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Mobile view quote basket - always visible */}
      <div className="md:hidden sticky top-0 z-10 py-2 bg-white border-b">
        <div className="pt-4 pb-2">
          <QuoteBasket 
            items={basketItems} 
            total={totalPrice} 
            onRemoveItem={handleRemoveItem}
            calendlyUrl="https://calendly.com/waynekuvi"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-8 md:space-y-12">
          {/* Platform Selection */}
          <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100" id="platform-section">
            <h3 className="text-xl font-medium text-gray-900 mb-2">1. What are you building?</h3>
            <p className="text-gray-600 mb-6">Choose the type of digital product you need</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {platformOptions.map(platform => (
                <motion.div 
                  key={platform.id}
                  className={`border rounded-xl p-4 md:p-5 cursor-pointer transition-all hover:shadow-md ${
                    selectedPlatform === platform.id 
                      ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500/20' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handlePlatformSelect(platform.id)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-start">
                    <span className="text-2xl mr-3 mt-1">{platform.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-medium text-gray-900">{platform.name}</h4>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          selectedPlatform === platform.id
                            ? 'bg-blue-500 text-white' 
                            : 'border border-gray-300'
                        }`}>
                          {selectedPlatform === platform.id && (
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 mb-3">{platform.description}</p>
                      <div className="text-blue-600 font-medium">Starting at £{platform.price.toLocaleString()}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
          
          {/* Feature Selection */}
          <section 
            ref={featuresRef}
            className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-opacity ${
              selectedPlatform ? 'opacity-100' : 'opacity-50'
            }`} 
            id="features-section"
          >
            <h3 className="text-xl font-medium text-gray-900 mb-2">2. What features do you need?</h3>
            <p className="text-gray-600 mb-6">Select the capabilities that matter most to your project</p>
            
            {/* Group features by category */}
            {['Essentials', 'Engagement', 'Admin & Analytics'].map((category) => (
              <div key={category} className="mb-8 last:mb-0">
                <h4 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                  <span 
                    className={`w-2 h-2 rounded-full mr-2 ${
                      category === 'Essentials' ? 'bg-blue-500' : 
                      category === 'Engagement' ? 'bg-green-500' : 'bg-purple-500'
                    }`}
                  ></span>
                  {category}
                </h4>
                
                <div className="space-y-3">
                  {featureOptions
                    .filter(feature => feature.category === category)
                    .map(feature => (
                      <motion.div 
                        key={feature.id}
                        className={`border rounded-xl p-4 cursor-pointer transition-all hover:shadow-sm ${
                          selectedFeatures.includes(feature.id) 
                            ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500/20' 
                            : 'border-gray-200 hover:border-blue-300'
                        } ${!selectedPlatform ? 'pointer-events-none' : ''}`}
                        onClick={() => handleFeatureToggle(feature.id)}
                        whileHover={selectedPlatform ? { scale: 1.01 } : {}}
                        whileTap={selectedPlatform ? { scale: 0.99 } : {}}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{feature.icon}</span>
                            <div>
                              <h4 className="font-medium text-gray-900">{feature.name}</h4>
                              <p className="text-sm text-gray-600">{feature.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-blue-600 font-medium whitespace-nowrap">£{feature.price.toLocaleString()}</span>
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                              selectedFeatures.includes(feature.id) 
                                ? 'bg-blue-500 border-blue-500 text-white' 
                                : 'border-gray-300'
                            }`}>
                              {selectedFeatures.includes(feature.id) && (
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            ))}
            
            {selectedFeatures.length > 0 && (
              <div className="mt-6 text-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (complexityRef.current) {
                      complexityRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      setActiveStep(3);
                    }
                  }}
                  className="px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-medium"
                >
                  Continue to Complexity
                </motion.button>
              </div>
            )}
          </section>
          
          {/* Complexity and Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {/* Complexity Selection */}
            <section 
              ref={complexityRef}
              className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-opacity ${
                selectedFeatures.length > 0 ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <h3 className="text-xl font-medium text-gray-900 mb-2">3. How sophisticated does it need to be?</h3>
              <p className="text-gray-600 mb-6">Choose based on your project requirements and future growth plans</p>
              
              <div className="space-y-4">
                {complexityOptions.map(complexity => (
                  <motion.div 
                    key={complexity.id}
                    className={`border rounded-xl p-5 cursor-pointer transition-all hover:shadow-md ${
                      selectedComplexity === complexity.id 
                        ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500/20' 
                        : 'border-gray-200 hover:border-blue-300'
                    } ${selectedFeatures.length === 0 ? 'pointer-events-none' : ''}`}
                    onClick={() => handleComplexitySelect(complexity.id)}
                    whileHover={selectedFeatures.length > 0 ? { scale: 1.01 } : {}}
                    whileTap={selectedFeatures.length > 0 ? { scale: 0.99 } : {}}
                  >
                    <div className="flex items-start">
                      <span className="text-2xl mr-3 mt-1">{complexity.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-medium text-gray-900">{complexity.name}</h4>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            selectedComplexity === complexity.id
                              ? 'bg-blue-500 text-white' 
                              : 'border border-gray-300'
                          }`}>
                            {selectedComplexity === complexity.id && (
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 mb-3">{complexity.description}</p>
                        <span className="text-blue-600 font-medium">
                          {complexity.price > 0 ? `£${complexity.price.toLocaleString()}` : 'Included in base price'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
            
            {/* Timeline Selection */}
            <section 
              ref={timelineRef}
              className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-opacity ${
                selectedComplexity ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <h3 className="text-xl font-medium text-gray-900 mb-2">4. How quickly do you need it?</h3>
              <p className="text-gray-600 mb-6">Select your preferred development timeline</p>
              
              <div className="space-y-4">
                {timelineOptions.map(timeline => (
                  <motion.div 
                    key={timeline.id}
                    className={`border rounded-xl p-5 cursor-pointer transition-all hover:shadow-md ${
                      selectedTimeline === timeline.id 
                        ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500/20' 
                        : 'border-gray-200 hover:border-blue-300'
                    } ${!selectedComplexity ? 'pointer-events-none' : ''}`}
                    onClick={() => handleTimelineSelect(timeline.id)}
                    whileHover={selectedComplexity ? { scale: 1.01 } : {}}
                    whileTap={selectedComplexity ? { scale: 0.99 } : {}}
                  >
                    <div className="flex items-start">
                      <span className="text-2xl mr-3 mt-1">{timeline.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-medium text-gray-900">{timeline.name}</h4>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            selectedTimeline === timeline.id
                              ? 'bg-blue-500 text-white' 
                              : 'border border-gray-300'
                          }`}>
                            {selectedTimeline === timeline.id && (
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 mb-3">{timeline.description}</p>
                        <span className="text-blue-600 font-medium">
                          {timeline.price > 0 ? `£${timeline.price.toLocaleString()}` : 'Included in base price'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
          
          {/* Enhancements (Add-ons) */}
          <section 
            ref={enhancementsRef}
            className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-opacity ${
              selectedTimeline ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <h3 className="text-xl font-medium text-gray-900 mb-2">5. Any additional enhancements?</h3>
            <p className="text-gray-600 mb-6">Optimize your project with these valuable extras</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {enhancementOptions.map(enhancement => (
                <motion.div 
                  key={enhancement.id}
                  className={`border rounded-xl p-4 cursor-pointer transition-all hover:shadow-sm ${
                    selectedEnhancements.includes(enhancement.id) 
                      ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500/20' 
                      : 'border-gray-200 hover:border-blue-300'
                  } ${!selectedTimeline ? 'pointer-events-none' : ''}`}
                  onClick={() => handleEnhancementToggle(enhancement.id)}
                  whileHover={selectedTimeline ? { scale: 1.01 } : {}}
                  whileTap={selectedTimeline ? { scale: 0.99 } : {}}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-1">{enhancement.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{enhancement.name}</h4>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          selectedEnhancements.includes(enhancement.id) 
                            ? 'bg-blue-500 border-blue-500 text-white' 
                            : 'border-gray-300'
                        }`}>
                          {selectedEnhancements.includes(enhancement.id) && (
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 mb-2">{enhancement.description}</p>
                      <p className="text-blue-600 font-medium text-sm">£{enhancement.price.toLocaleString()}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
        
        {/* Quote Basket - Desktop */}
        <div className="lg:col-span-1 hidden lg:block">
          <div className="sticky top-24">
            <QuoteBasket 
              items={basketItems} 
              total={totalPrice} 
              onRemoveItem={handleRemoveItem}
              calendlyUrl="https://calendly.com/waynekuvi"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator; 
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import botAnimation from '../assets/bot.json';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  hasQuickReplies?: boolean;
  isGuide?: boolean;
  guideTitle?: string;
  guideContent?: string[];
  showContactForm?: boolean;
  projectAnalysis?: ProjectAnalysis;
}

interface QuickReply {
  id: string;
  text: string;
  action: string;
}

interface ProjectAnalysis {
  projectType: string;
  techStack: string[];
  features: string[];
  timeline: string;
  complexity: 'Simple' | 'Moderate' | 'Complex';
}

// Sample quick replies for different topics
const quickRepliesByTopic: Record<string, QuickReply[]> = {
  general: [
    { id: 'q1', text: 'How to start a SaaS project?', action: 'saas_project' },
    { id: 'q2', text: 'Suggest tech stack', action: 'tech_stack' },
    { id: 'q3', text: 'Show recent projects', action: 'recent_projects' },
    { id: 'q4', text: 'Describe your project idea', action: 'project_idea' },
    { id: 'q5', text: 'Talk to a human', action: 'human' }
  ],
  tech_stack: [
    { id: 't1', text: 'Frontend frameworks', action: 'frontend_frameworks' },
    { id: 't2', text: 'Backend options', action: 'backend_options' },
    { id: 't3', text: 'Database selection', action: 'database_selection' },
    { id: 't4', text: 'Hosting solutions', action: 'hosting_solutions' }
  ],
  project_planning: [
    { id: 'p1', text: 'MVP development', action: 'mvp_development' },
    { id: 'p2', text: 'Cost estimation', action: 'cost_estimation' },
    { id: 'p3', text: 'Timeline planning', action: 'timeline_planning' },
    { id: 'p4', text: 'Feature prioritization', action: 'feature_prioritization' }
  ],
  project_idea: [
    { id: 'p1', text: 'Why this tech stack?', action: 'why_tech_stack' },
    { id: 'p2', text: 'Add more features', action: 'more_features' },
    { id: 'p3', text: 'Timeline details', action: 'timeline_details' },
    { id: 'p4', text: 'Book a call', action: 'book_call' }
  ]
};

// Knowledge base for AI assistant
const knowledgeBase: Record<string, string> = {
  saas_project: "To start a SaaS MVP, I recommend following our proven 5-step approach:\n\n1. Define core features that solve a specific problem\n2. Choose a scalable tech stack (we recommend Next.js + Node.js + PostgreSQL for most SaaS projects)\n3. Design a simple but professional UI\n4. Implement basic authentication, billing, and core features\n5. Set up analytics and get early user feedback\n\nTypically, a SaaS MVP takes 8-12 weeks to develop with a focused team.",
  
  tech_stack: "Our recommended technology stacks depend on your specific requirements. For most projects, we favor:\n\n**Frontend**: React/Next.js (SEO-friendly, great performance)\n**Backend**: Node.js with Express or NestJS\n**Database**: PostgreSQL for relational data, MongoDB for document-based needs\n**Hosting**: Vercel for frontend, AWS or DigitalOcean for backend\n\nWould you like more specific recommendations based on your project type?",
  
  recent_projects: "Here are some recent web projects we've completed:\n\n1. HealthTrack - Analytics dashboard for healthcare using React, D3, and Firebase\n2. EcoCommerce - Sustainable e-commerce platform with Shopify and custom theme\n3. FinTrack - Financial portal using Next.js, PostgreSQL and Auth0\n\nWould you like to see more details about any of these projects?",
  
  frontend_frameworks: "For frontend frameworks, we primarily work with:\n\n**React/Next.js**: Best for SEO, complex UIs, and when you need server-side rendering\n**Vue.js**: Great for rapid development and highly interactive UIs\n\nIn terms of SEO specifically, Next.js offers superior performance over Vue due to its built-in server-side rendering capabilities. However, Vue with Nuxt can also provide good SEO results.\n\nWe typically recommend Next.js for content-heavy sites and when SEO is critical.",
  
  mvp_development: "Our MVP development approach focuses on building only what's necessary to validate your core value proposition. This typically includes:\n\n1. User authentication\n2. 2-3 core features that solve your target problem\n3. Basic admin functionality\n4. Simple analytics\n\nWe avoid building comprehensive feature sets, complex integrations, or advanced customization options in the MVP phase.\n\nFor most web applications, our MVPs take 6-12 weeks to develop and cost between $20,000-$40,000 depending on complexity.",
  
  cost_estimation: "Our web development pricing is based on project complexity and scope:\n\n**Simple websites**: $5,000-$15,000 (4-6 weeks)\n**Web applications/MVPs**: $20,000-$50,000 (8-12 weeks)\n**Complex platforms**: $50,000-$150,000+ (12+ weeks)\n\nCommon components and their typical costs:\n- Authentication system: $2,000-$4,000\n- Payment processing: $3,000-$6,000\n- User dashboard: $4,000-$8,000\n- Admin panel: $5,000-$10,000\n- Third-party integrations: $1,500-$3,000 each\n\nWould you like a more specific estimate for your project?",
  
  human: "I understand you'd like to speak with a human representative. Our team is available Monday through Friday, 9am-6pm EST. Would you like me to have someone reach out to you via email, or would you prefer to schedule a call directly?",
  
  // Specific web development queries
  nextjs_vs_vue: "Both Next.js and Vue.js (with Nuxt) are excellent for SEO, but they have different strengths:\n\n**Next.js SEO advantages:**\n- Built-in SSR and static generation\n- Automatic image optimization\n- Incremental Static Regeneration for dynamic content\n- Better Core Web Vitals scores on average\n\n**Vue/Nuxt SEO considerations:**\n- Also offers SSR capabilities\n- Slightly simpler learning curve\n- Good meta tag management\n\nFor pure SEO performance, Next.js typically has an edge due to its performance optimizations and built-in features specifically designed for content-heavy sites.",
  
  websockets: "Yes, adding live chat with WebSockets is quite feasible in most web projects. We typically implement real-time features using:\n\n1. Socket.io for WebSocket connection management\n2. Redis for scaling across multiple servers\n3. Message queueing for reliability\n\nImplementation typically takes 2-3 weeks depending on complexity (basic chat vs. features like read receipts, typing indicators, file sharing, etc.)\n\nWould you like to see examples of our previous WebSocket implementations?",
  
  accessibility: "Our accessibility best practices include:\n\n1. Following WCAG 2.1 AA standards\n2. Semantic HTML structure\n3. Keyboard navigation support\n4. Proper contrast ratios (at least 4.5:1)\n5. Screen reader compatibility\n6. Focus management\n7. Aria attributes where necessary\n\nWe test with tools like Axe, WAVE, and manual screen reader testing. We can also provide documentation for maintaining accessibility as you update your site.",
  
  project_idea: "I'd be happy to analyze your project idea! Please describe what you're looking to build in plain English. Be as detailed as possible about the purpose, users, and key functionalities you have in mind.",
  
  why_tech_stack: "Our tech stack recommendations are based on several factors:\n\n1. **Project Requirements**: Different projects have different technical needs\n2. **Scalability**: We consider future growth and user base\n3. **Performance**: We optimize for speed and responsiveness\n4. **Development Efficiency**: We use technologies that allow for rapid, quality development\n5. **Maintainability**: We choose technologies with strong community support\n\nWe're happy to discuss alternatives if you have specific preferences!",
  
  more_features: "Here are some additional features you might consider:\n\n- **User Authentication**: Social login, 2FA, role-based access\n- **Analytics Dashboard**: Track user behavior and business metrics\n- **Notification System**: Email, in-app, or push notifications\n- **Search Functionality**: Advanced filters and search capabilities\n- **Multilingual Support**: For global audiences\n- **API Access**: For third-party integrations\n\nWould any of these be valuable for your project?",
  
  timeline_details: "Our project timelines are broken down into these phases:\n\n1. **Discovery & Planning** (1-2 weeks): Requirements gathering, wireframing\n2. **Design** (1-3 weeks): UI/UX design, prototyping\n3. **Development** (4-12 weeks): Frontend and backend implementation\n4. **Testing** (1-2 weeks): QA, bug fixes, performance testing\n5. **Deployment** (1 week): Launch preparation and go-live\n\nWe also offer ongoing maintenance and support packages.",
  
  book_call: "I'd be happy to set up a discovery call with our team! You can book a convenient time directly through our calendar:\n\n[**Book a Discovery Call**](https://calendly.com/waynekuvi)\n\nDuring this call, we'll discuss your project in detail, answer any questions, and outline next steps."
};

// Guide content
const guides: Record<string, { title: string, content: string[] }> = {
  tech_stack_guide: {
    title: "Choosing the Right Tech Stack",
    content: [
      "**Frontend Considerations**\nReact offers a robust ecosystem and is ideal for complex UIs.\nVue provides simplicity and ease of integration.\nNext.js and Nuxt add server-side rendering for SEO benefits.",
      "**Backend Options**\nNode.js excels at handling asynchronous requests and real-time features.\nDjango/Python offers rapid development with built-in admin features.\nRuby on Rails provides convention over configuration for faster development.",
      "**Database Selection**\nPostgreSQL is our go-to for relational data with complex queries.\nMongoDB works well for flexible schema requirements.\nRedis is excellent for caching and real-time data."
    ]
  },
  mvp_guide: {
    title: "Building a Successful MVP",
    content: [
      "**Define Core Value**\nIdentify the single most important problem you're solving.\nFocus only on features that directly address this problem.\nAvoid nice-to-have features that can be added later.",
      "**Development Approach**\nUse agile methodology with 1-2 week sprints.\nImplement continuous integration from the start.\nPrioritize user feedback loops over perfect implementation.",
      "**Post-Launch Strategy**\nSet up analytics to track key metrics.\nPlan for quick iterations based on user feedback.\nAllocate resources for rapid improvements to core features."
    ]
  }
};

const ChatModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Uplinq's AI Assistant. I can help with web development questions, project planning, tech recommendations, and more. How can I assist you today?",
      sender: 'assistant',
      timestamp: new Date(),
      hasQuickReplies: true
    },
  ]);
  const [input, setInput] = useState('');
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>(quickRepliesByTopic.general);
  const [isTyping, setIsTyping] = useState(false);
  const [expandedGuides, setExpandedGuides] = useState<Record<string, boolean>>({});
  const [currentTopic, setCurrentTopic] = useState<string>('general');
  
  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isAnalyzingProject, setIsAnalyzingProject] = useState(false);
  const [projectDescription, setProjectDescription] = useState('');
  const [waitingForProjectDescription, setWaitingForProjectDescription] = useState(false);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Analyze project description
  const analyzeProject = (description: string): ProjectAnalysis => {
    // Reset project description state
    setProjectDescription('');
    setWaitingForProjectDescription(false);
    
    // Project type detection logic
    let projectType = 'Web Application';
    if (description.toLowerCase().includes('e-commerce') || 
        description.toLowerCase().includes('ecommerce') || 
        description.toLowerCase().includes('shop') || 
        description.toLowerCase().includes('store') || 
        description.toLowerCase().includes('product') || 
        description.toLowerCase().includes('sell')) {
      projectType = 'E-commerce';
    } else if (description.toLowerCase().includes('blog') || 
               description.toLowerCase().includes('content') || 
               description.toLowerCase().includes('article') || 
               description.toLowerCase().includes('news')) {
      projectType = 'Content/Blog';
    } else if (description.toLowerCase().includes('portfolio') || 
               description.toLowerCase().includes('showcase') || 
               description.toLowerCase().includes('gallery')) {
      projectType = 'Portfolio';
    } else if (description.toLowerCase().includes('dashboard') || 
               description.toLowerCase().includes('analytics') || 
               description.toLowerCase().includes('data') || 
               description.toLowerCase().includes('monitor')) {
      projectType = 'Dashboard/Analytics';
    } else if (description.toLowerCase().includes('saas') || 
               description.toLowerCase().includes('subscription') || 
               description.toLowerCase().includes('service')) {
      projectType = 'SaaS Platform';
    }
    
    // Complexity assessment
    let complexity: 'Simple' | 'Moderate' | 'Complex' = 'Moderate';
    const words = description.split(' ').length;
    const featureMatches = description.toLowerCase().match(/feature|functionality|ability to|can do|should do/g)?.length || 0;
    
    if (words < 50 && featureMatches < 3) {
      complexity = 'Simple';
    } else if (words > 150 || featureMatches > 7 || 
              description.toLowerCase().includes('complex') || 
              description.toLowerCase().includes('advanced') || 
              description.toLowerCase().includes('real-time') || 
              description.toLowerCase().includes('ai') ||
              description.toLowerCase().includes('machine learning')) {
      complexity = 'Complex';
    }
    
    // Tech stack recommendation based on project type and complexity
    let techStack: string[] = [];
    if (projectType === 'E-commerce') {
      techStack = complexity === 'Simple' 
        ? ['Shopify', 'Liquid', 'TailwindCSS'] 
        : ['Next.js', 'Prisma', 'PostgreSQL', 'Stripe'];
    } else if (projectType === 'Content/Blog') {
      techStack = complexity === 'Simple'
        ? ['Next.js', 'Contentful', 'Vercel'] 
        : ['Next.js', 'Prisma', 'PostgreSQL', 'AWS S3'];
    } else if (projectType === 'Portfolio') {
      techStack = ['React', 'Framer Motion', 'TailwindCSS', 'Vercel'];
    } else if (projectType === 'Dashboard/Analytics') {
      techStack = ['React', 'D3.js', 'Express', 'MongoDB'];
    } else if (projectType === 'SaaS Platform') {
      techStack = complexity === 'Complex'
        ? ['Next.js', 'Node.js (NestJS)', 'PostgreSQL', 'Redis', 'AWS'] 
        : ['Next.js', 'Prisma', 'PostgreSQL', 'Stripe'];
    } else {
      // Default web application
      techStack = complexity === 'Simple'
        ? ['React', 'Firebase', 'TailwindCSS'] 
        : ['Next.js', 'Node.js', 'PostgreSQL', 'AWS'];
    }
    
    // Feature recommendations based on project type
    let recommendedFeatures: string[] = ['User authentication', 'Responsive design', 'SEO optimization'];
    
    if (projectType === 'E-commerce') {
      recommendedFeatures = [
        'Product catalog with search and filtering',
        'Shopping cart and checkout flow',
        'Payment integration',
        'User accounts and order history',
        'Admin dashboard'
      ];
    } else if (projectType === 'Content/Blog') {
      recommendedFeatures = [
        'Content management system',
        'Tag and category organization',
        'Search functionality',
        'Comment system',
        'Newsletter subscription'
      ];
    } else if (projectType === 'Portfolio') {
      recommendedFeatures = [
        'Project showcase with filtering',
        'About section and skills',
        'Contact form',
        'Testimonials',
        'Smooth animations and transitions'
      ];
    } else if (projectType === 'Dashboard/Analytics') {
      recommendedFeatures = [
        'Data visualization and charts',
        'Filtering and date range selection',
        'Export capabilities',
        'User roles and permissions',
        'Real-time updates'
      ];
    } else if (projectType === 'SaaS Platform') {
      recommendedFeatures = [
        'User authentication and authorization',
        'Subscription management',
        'User dashboard',
        'Admin controls',
        'API endpoints for integration'
      ];
    }
    
    // Timeline estimation based on complexity
    let timelineWeeks = 0;
    switch (complexity) {
      case 'Simple':
        timelineWeeks = 4 + Math.floor(Math.random() * 3); // 4-6 weeks
        break;
      case 'Moderate':
        timelineWeeks = 8 + Math.floor(Math.random() * 5); // 8-12 weeks
        break;
      case 'Complex':
        timelineWeeks = 12 + Math.floor(Math.random() * 9); // 12-20 weeks
        break;
    }
    
    const timeline = `${timelineWeeks} weeks`;
    
    return {
      projectType,
      techStack,
      features: recommendedFeatures,
      timeline,
      complexity
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    
    // Store project description if waiting for it
    if (waitingForProjectDescription) {
      setProjectDescription(input);
    }
    
    setInput('');

    // Show typing indicator
    setIsTyping(true);

    // Process the user's message and generate a response
    setTimeout(() => {
      setIsTyping(false);
      
      // If we're waiting for a project description, analyze it
      if (waitingForProjectDescription && input.trim().length > 10) {
        setIsAnalyzingProject(true);
        
        // Simulate analysis taking some time
        setTimeout(() => {
          const projectAnalysis = analyzeProject(input);
          
          const analysisResponse: Message = {
            id: Date.now().toString(),
            text: `Based on your description, I've analyzed your project needs:\n\n**Project Type**: ${projectAnalysis.projectType}\n**Complexity**: ${projectAnalysis.complexity}\n**Estimated Timeline**: ${projectAnalysis.timeline}\n\n**Recommended Tech Stack**:\n${projectAnalysis.techStack.map(tech => `- ${tech}`).join('\n')}\n\n**Core Features**:\n${projectAnalysis.features.map(feature => `- ${feature}`).join('\n')}\n\nWould you like to know more about why we recommend this tech stack or discuss additional features? Or, if you're ready to move forward, you can book a discovery call with our team.`,
            sender: 'assistant',
            timestamp: new Date(),
            hasQuickReplies: true,
            projectAnalysis: projectAnalysis
          };
          
          setMessages(prev => [...prev, analysisResponse]);
          setCurrentTopic('project_idea');
          setQuickReplies(quickRepliesByTopic.project_idea);
          setIsAnalyzingProject(false);
        }, 2000);
        
        return;
      }
      
      // Normal response generation
      const response = generateResponse(input);
      setMessages(prev => [...prev, response]);
      
      // Update quick replies based on the topic of conversation
      if (response.hasQuickReplies) {
        setQuickReplies(quickRepliesByTopic[currentTopic] || quickRepliesByTopic.general);
      }
    }, 1000 + Math.random() * 1000);
  };

  const generateResponse = (userInput: string): Message => {
    const normalizedInput = userInput.toLowerCase();
    
    // Check for specific queries
    if (normalizedInput.includes('saas') || normalizedInput.includes('mvp') || normalizedInput.includes('start a project')) {
      setCurrentTopic('project_planning');
      return {
        id: Date.now().toString(),
        text: knowledgeBase.saas_project,
        sender: 'assistant',
        timestamp: new Date(),
        hasQuickReplies: true,
        isGuide: true,
        guideTitle: guides.mvp_guide.title,
        guideContent: guides.mvp_guide.content
      };
    } 
    else if (normalizedInput.includes('next.js') && normalizedInput.includes('vue') || 
             normalizedInput.includes('seo')) {
      setCurrentTopic('tech_stack');
      return {
        id: Date.now().toString(),
        text: knowledgeBase.nextjs_vs_vue,
        sender: 'assistant',
        timestamp: new Date(),
        hasQuickReplies: true
      };
    }
    else if (normalizedInput.includes('tech stack') || normalizedInput.includes('framework') || 
             normalizedInput.includes('technology')) {
      setCurrentTopic('tech_stack');
      return {
        id: Date.now().toString(),
        text: knowledgeBase.tech_stack,
        sender: 'assistant',
        timestamp: new Date(),
        hasQuickReplies: true,
        isGuide: true,
        guideTitle: guides.tech_stack_guide.title,
        guideContent: guides.tech_stack_guide.content
      };
    }
    else if (normalizedInput.includes('websocket') || normalizedInput.includes('live chat') || 
             normalizedInput.includes('real-time') || normalizedInput.includes('realtime')) {
      return {
        id: Date.now().toString(),
        text: knowledgeBase.websockets,
        sender: 'assistant',
        timestamp: new Date(),
        hasQuickReplies: true
      };
    }
    else if (normalizedInput.includes('cost') || normalizedInput.includes('price') || 
             normalizedInput.includes('estimate') || normalizedInput.includes('budget')) {
      setCurrentTopic('project_planning');
      return {
        id: Date.now().toString(),
        text: knowledgeBase.cost_estimation,
        sender: 'assistant',
        timestamp: new Date(),
        hasQuickReplies: true
      };
    }
    else if (normalizedInput.includes('accessibility') || normalizedInput.includes('wcag') || 
             normalizedInput.includes('a11y') || normalizedInput.includes('screen reader')) {
      return {
        id: Date.now().toString(),
        text: knowledgeBase.accessibility,
        sender: 'assistant',
        timestamp: new Date(),
        hasQuickReplies: true
      };
    }
    else if (normalizedInput.includes('speak to') || normalizedInput.includes('talk to') || 
             normalizedInput.includes('human') || normalizedInput.includes('person')) {
      return {
        id: Date.now().toString(),
        text: knowledgeBase.human,
        sender: 'assistant',
        timestamp: new Date(),
        hasQuickReplies: false,
        showContactForm: true
      };
    }
    else {
      // Add project idea logic
      if (normalizedInput.includes('project') || 
          normalizedInput.includes('idea') || 
          normalizedInput.includes('build') || 
          normalizedInput.includes('create') || 
          normalizedInput.includes('develop')) {
        setWaitingForProjectDescription(true);
        setCurrentTopic('project_idea');
        return {
          id: Date.now().toString(),
          text: knowledgeBase.project_idea,
          sender: 'assistant',
          timestamp: new Date(),
          hasQuickReplies: false
        };
      }
      
      // Generic response for other inputs
      return {
        id: Date.now().toString(),
        text: "I'd be happy to help with that. Could you provide more specific details about your project requirements or what you're trying to accomplish? This will help me give you more targeted advice.",
        sender: 'assistant',
        timestamp: new Date(),
        hasQuickReplies: true
      };
    }
  };

  const handleQuickReplyClick = (action: string) => {
    // Find the quick reply text
    const quickReply = Object.values(quickRepliesByTopic)
      .flat()
      .find(qr => qr.action === action);
    
    if (!quickReply) return;
    
    // Add as user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: quickReply.text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Generate response based on the action
    setTimeout(() => {
      setIsTyping(false);
      
      // Project idea related actions
      if (action === 'project_idea') {
        setWaitingForProjectDescription(true);
        setCurrentTopic('project_idea');
        const response: Message = {
          id: Date.now().toString(),
          text: knowledgeBase.project_idea,
          sender: 'assistant',
          timestamp: new Date(),
          hasQuickReplies: false
        };
        setMessages(prev => [...prev, response]);
        return;
      }
      
      if (action === 'book_call') {
        const response: Message = {
          id: Date.now().toString(),
          text: knowledgeBase.book_call,
          sender: 'assistant',
          timestamp: new Date(),
          hasQuickReplies: true
        };
        setMessages(prev => [...prev, response]);
        return;
      }
      
      if (action === 'why_tech_stack') {
        const response: Message = {
          id: Date.now().toString(),
          text: knowledgeBase.why_tech_stack,
          sender: 'assistant',
          timestamp: new Date(),
          hasQuickReplies: true
        };
        setMessages(prev => [...prev, response]);
        return;
      }
      
      if (action === 'more_features') {
        const response: Message = {
          id: Date.now().toString(),
          text: knowledgeBase.more_features,
          sender: 'assistant',
          timestamp: new Date(),
          hasQuickReplies: true
        };
        setMessages(prev => [...prev, response]);
        return;
      }
      
      if (action === 'timeline_details') {
        const response: Message = {
          id: Date.now().toString(),
          text: knowledgeBase.timeline_details,
          sender: 'assistant',
          timestamp: new Date(),
          hasQuickReplies: true
        };
        setMessages(prev => [...prev, response]);
        return;
      }
      
      // Show contact form for the human action
      if (action === 'human') {
        const response: Message = {
          id: Date.now().toString(),
          text: knowledgeBase.human,
          sender: 'assistant',
          timestamp: new Date(),
          hasQuickReplies: false,
          showContactForm: true
        };
        setMessages(prev => [...prev, response]);
      }
      // Look up the response in the knowledge base
      else if (knowledgeBase[action]) {
        // Determine if we should show a guide
        let isGuide = false;
        let guideTitle = '';
        let guideContent: string[] = [];
        
        if (action === 'tech_stack') {
          isGuide = true;
          guideTitle = guides.tech_stack_guide.title;
          guideContent = guides.tech_stack_guide.content;
          setCurrentTopic('tech_stack');
        } else if (action === 'mvp_development') {
          isGuide = true;
          guideTitle = guides.mvp_guide.title;
          guideContent = guides.mvp_guide.content;
          setCurrentTopic('project_planning');
        } else if (action.includes('frontend') || action.includes('backend') || action.includes('database')) {
          setCurrentTopic('tech_stack');
        } else if (action.includes('cost') || action.includes('timeline')) {
          setCurrentTopic('project_planning');
        }
        
        const response: Message = {
          id: Date.now().toString(),
          text: knowledgeBase[action],
          sender: 'assistant',
          timestamp: new Date(),
          hasQuickReplies: true,
          isGuide: isGuide,
          guideTitle: guideTitle,
          guideContent: guideContent
        };
        
        setMessages(prev => [...prev, response]);
        setQuickReplies(quickRepliesByTopic[currentTopic] || quickRepliesByTopic.general);
      } else {
        // Generic response if no specific knowledge is found
        const response: Message = {
          id: Date.now().toString(),
          text: "I'd be happy to help with that. Could you provide more details about what you're looking for?",
          sender: 'assistant',
          timestamp: new Date(),
          hasQuickReplies: true
        };
        setMessages(prev => [...prev, response]);
      }
    }, 1000 + Math.random() * 1000);
  };

  const handleContactSubmit = (e: React.FormEvent, messageId: string) => {
    e.preventDefault();
    
    // Validate form
    if (!contactName || !contactEmail || !contactMessage) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      
      // Add confirmation message
      const confirmationMessage: Message = {
        id: Date.now().toString(),
        text: `Thanks, ${contactName}! Your request has been submitted. A member of our team will contact you at ${contactEmail} within 1 business day.`,
        sender: 'assistant',
        timestamp: new Date(),
        hasQuickReplies: true
      };
      
      setMessages(prev => [...prev, confirmationMessage]);
      
      // Reset form
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 1500);
  };

  const toggleGuideSection = (messageId: string) => {
    setExpandedGuides(prev => ({
      ...prev,
      [messageId]: !prev[messageId]
    }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <Lottie
                  animationData={botAnimation}
                  loop={true}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Uplinq AI Assistant</h3>
                <p className="text-sm text-gray-500">Web Development Expert</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="h-[400px] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {/* Regular message text with markdown support */}
                  <div className="text-sm whitespace-pre-line">
                    {message.text.split('\n').map((line, i) => (
                      <p key={i} className={line.startsWith('**') && line.endsWith('**') ? 'font-bold' : ''}>
                        {line.startsWith('**') && line.endsWith('**') 
                          ? line.substring(2, line.length - 2)
                          : line}
                      </p>
                    ))}
                  </div>
                  
                  {/* Contact Form */}
                  {message.sender === 'assistant' && message.showContactForm && !formSubmitted && (
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <form onSubmit={(e) => handleContactSubmit(e, message.id)} className="space-y-3">
                        <div>
                          <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                            placeholder="Your name"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                            placeholder="your.email@example.com"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="block text-xs font-medium text-gray-700 mb-1">
                            Message
                          </label>
                          <textarea
                            id="message"
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                            placeholder="Tell us about your project"
                          />
                        </div>
                        
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full py-2 px-4 text-sm text-white rounded-md flex justify-center items-center ${
                            isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="mr-2">Submitting</span>
                              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            </>
                          ) : (
                            'Get in touch'
                          )}
                        </button>
                      </form>
                    </div>
                  )}
                  
                  {/* Collapsible guide if this is a guide message */}
                  {message.isGuide && message.guideContent && (
                    <div className="mt-4 border-t border-gray-200 pt-3">
                      <button 
                        className="flex items-center justify-between w-full text-sm font-medium text-blue-600"
                        onClick={() => toggleGuideSection(message.id)}
                      >
                        <span>{message.guideTitle || "View Guide"}</span>
                        <svg 
                          className={`w-4 h-4 transform ${expandedGuides[message.id] ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {expandedGuides[message.id] && (
                        <div className="mt-3 space-y-2 text-sm bg-blue-50 p-3 rounded-lg">
                          {message.guideContent.map((section, idx) => (
                            <div key={idx} className="border-b border-blue-100 pb-2 last:border-b-0 last:pb-0">
                              {section.split('\n').map((line, i) => (
                                <p key={i} className={line.startsWith('**') && line.endsWith('**') ? 'font-bold' : ''}>
                                  {line.startsWith('**') && line.endsWith('**') 
                                    ? line.substring(2, line.length - 2)
                                    : line}
                                </p>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Quick reply buttons */}
                  {message.sender === 'assistant' && message.hasQuickReplies && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {quickReplies.map((reply) => (
                        <button
                          key={reply.id}
                          onClick={() => handleQuickReplyClick(reply.action)}
                          className="bg-white text-blue-600 px-3 py-1 rounded-full text-xs border border-blue-200 hover:bg-blue-50 transition-colors"
                        >
                          {reply.text}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <span className="text-xs opacity-70 mt-2 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </motion.div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="max-w-[80%] rounded-2xl p-4 bg-gray-100 text-gray-900">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Add analyzing indicator */}
            {isAnalyzingProject && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="max-w-[80%] rounded-2xl p-4 bg-gray-100 text-gray-900">
                  <div className="flex items-center space-x-2">
                    <svg className="animate-spin h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-sm">Analyzing your project requirements...</span>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
            <div className="flex space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about web development, project planning, tech stack..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              For complex queries or project quotes, our team is ready to help you directly.
            </p>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatModal; 
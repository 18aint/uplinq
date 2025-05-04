import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavbarContact';
import Footer from '../components/FooterContact';
import FloatingChatButton from '../components/FloatingChatButton';
import ChatModal from '../components/ChatModal';

// CSS for custom cursor
const customCursorStyle = `
  .custom-cursor-container {
    position: relative;
  }
  
  .custom-cursor {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    opacity: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s ease;
  }
  
  .cursor-visible {
    opacity: 1;
  }
  
  .cursor-ring {
    position: relative;
    width: 80px;
    height: 80px;
    border: 2px solid rgba(59, 130, 246, 0.6);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(4px);
    transform: scale(0.8);
    transition: transform 0.2s ease;
  }
  
  .cursor-text {
    font-size: 12px;
    font-weight: 500;
    color: #fff;
    letter-spacing: 0.5px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }
  
  .mockup-hover:hover .cursor-ring {
    transform: scale(1);
    background-color: rgba(59, 130, 246, 0.2);
  }
`;

// Project data structure with enhanced fields
interface Project {
  id: number;
  title: string;
  type: string;
  image: string;
  tags: string[];
  goals: string;
  process: string;
  results: string;
  stats: string[];
  techStack: string[];
  clientName?: string;
  clientTitle?: string;
  testimonial?: string;
  featured?: boolean;
  videoUrl?: string;
}

// Enhanced project data
const projects: Project[] = [
  {
    id: 1,
    title: "HealthTrack Analytics Dashboard",
    type: "Healthcare SaaS",
    image: "/health.png",
    tags: ["UI/UX", "React", "Analytics", "Healthcare"],
    goals: "Create an intuitive analytics dashboard for healthcare professionals to track patient outcomes and optimize treatment plans.",
    process: "We started with comprehensive user research, interviewing healthcare professionals to understand their workflow. Our design team created wireframes focused on data clarity and accessibility, followed by high-fidelity prototypes. Development was completed in 6 sprints with constant stakeholder feedback.",
    results: "The delivered dashboard significantly improved decision-making time for healthcare providers, with clear data visualization that highlighted key patient metrics at a glance.",
    stats: ["+68% faster data analysis", "92% user satisfaction", "Delivered in 12 weeks"],
    techStack: ["React", "TypeScript", "D3.js", "Firebase"],
    clientName: "Dr. Sarah Johnson",
    clientTitle: "Chief Medical Officer, MedCare Solutions",
    testimonial: "Uplinq's analytics dashboard transformed how we review patient data. What used to take hours now takes minutes, with insights that directly improve patient outcomes.",
    featured: true
  },
  {
    id: 2,
    title: "EcoCommerce Platform",
    type: "E-commerce",
    image: "/ecommerce.png",
    tags: ["E-commerce", "Shopify", "Mobile-first", "Sustainability"],
    goals: "Build a high-conversion e-commerce platform for sustainable products with seamless mobile experience and customized checkout flow.",
    process: "Our team developed a custom Shopify theme with extensive UX improvements. We implemented A/B testing throughout development to optimize conversion points, particularly product pages and checkout.",
    results: "The new platform increased mobile conversions significantly, with improved product discovery and streamlined checkout reducing cart abandonment.",
    stats: ["+42% conversion rate", "-28% cart abandonment", "15% higher AOV"],
    techStack: ["Shopify", "JavaScript", "Liquid", "TailwindCSS"],
    clientName: "Michael Chen",
    clientTitle: "Founder, EcoEssentials",
    testimonial: "The new platform not only looks amazing but has dramatically improved our conversion rates. The mobile experience is flawless."
  },
  {
    id: 3,
    title: "FinTrack Investment Portal",
    type: "Financial Web App",
    image: "/Fintrack.png",
    tags: ["FinTech", "Dashboard", "Next.js", "Financial Services"],
    goals: "Create a secure, responsive financial portal enabling users to track investments, analyze performance, and receive personalized insights.",
    process: "We employed a security-first development approach with extensive authentication and data protection measures. The interface was designed to simplify complex financial information with intuitive data visualization.",
    results: "The platform delivered enterprise-grade security with a consumer-friendly interface, resulting in exceptional user retention and engagement metrics.",
    stats: ["89% user retention", "+62% feature engagement", "99.9% uptime"],
    techStack: ["Next.js", "PostgreSQL", "Auth0", "Chart.js"],
    clientName: "Alexandra Rivera",
    clientTitle: "VP of Digital, FinWise Investments",
    testimonial: "Uplinq delivered a platform that makes complex financial data accessible to our clients while maintaining the highest security standards."
  },
  {
    id: 4,
    title: "CreativeHub Portfolio Platform",
    type: "Creative SaaS",
    image: "/work/work3.png",
    tags: ["Portfolio", "Creative", "Vue.js", "Design"],
    goals: "Build a platform for creative professionals to showcase their work with customizable portfolio templates and client interaction tools.",
    process: "We designed a flexible system of portfolio templates with extensive customization options. The platform included integrated messaging, client feedback tools, and analytics to help creatives optimize their portfolios.",
    results: "The platform launched successfully with strong adoption among photographers, designers, and other creative professionals. Users reported significant client engagement improvements.",
    stats: ["+125% client interactions", "Portfolio setup in <1 hour", "5,000+ users in first month"],
    techStack: ["Vue.js", "Supabase", "Cloudinary", "TailwindCSS"],
    clientName: "Jordan Taylor",
    clientTitle: "CEO, CreativeCollective",
    testimonial: "The platform has revolutionized how our creative professionals showcase their work and interact with clients. It's intuitive, beautiful, and powerful."
  },
  {
    id: 5,
    title: "LogisticsX Supply Chain Dashboard",
    type: "B2B Platform",
    image: "/Logistics.png",
    tags: ["B2B", "Supply Chain", "Dashboard", "Logistics"],
    goals: "Develop a comprehensive supply chain management dashboard to provide real-time visibility into logistics operations for enterprise clients.",
    process: "Our team created a modular dashboard system with customizable widgets to accommodate varying business needs. We integrated multiple data sources to provide unified visibility across the supply chain.",
    results: "The solution significantly improved operational efficiency and reduced costs by providing actionable insights and proactive issue alerts.",
    stats: ["32% operational cost reduction", "Real-time tracking across 24 countries", "12TB data processed daily"],
    techStack: ["Angular", "Node.js", "MongoDB", "WebSockets"],
    clientName: "Robert Daniels",
    clientTitle: "COO, GlobalLogistics Inc.",
    testimonial: "This dashboard has transformed our ability to manage global supply chains. The real-time insights have saved us millions in operational costs."
  },
  {
    id: 6,
    title: "EdLearn Course Platform",
    type: "Education",
    image: "/learn.png",
    tags: ["EdTech", "LMS", "Accessibility", "Education"],
    goals: "Create an accessible, engaging online learning platform with interactive course content and comprehensive analytics for educators.",
    process: "We prioritized accessibility and engagement throughout development, incorporating gamification elements and adaptive learning paths. The platform was tested extensively with diverse user groups to ensure universal usability.",
    results: "The platform received exceptionally positive feedback for its accessibility features and engagement metrics, with strong adoption among educational institutions.",
    stats: ["+87% course completion rate", "WCAG AAA compliance", "50% reduction in administrative tasks"],
    techStack: ["React", "Express", "PostgreSQL", "AWS"],
    clientName: "Dr. Lisa Washington",
    clientTitle: "Director of E-Learning, National Education Alliance",
    testimonial: "The platform's accessibility features and engaging interface have transformed our online education program. Our completion rates have soared."
  }
];

// All available categories based on project tags
const allCategories = Array.from(new Set(projects.flatMap(project => project.tags)));

// Get featured project
const featuredProject = projects.find(project => project.featured) || projects[0];

export default function Results() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  
  // Refs for scroll animations
  const featuredRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  
  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }, []);
  
  // Scroll-based animations
  const { scrollYProgress: featuredScrollProgress } = useScroll({
    target: featuredRef,
    offset: ["start end", "end start"]
  });
  
  const featuredParallax = useTransform(featuredScrollProgress, [0, 1], [0, -100]);
  const featuredOpacity = useTransform(featuredScrollProgress, [0, 0.5, 1], [1, 1, 0.5]);
  const featuredScale = useTransform(featuredScrollProgress, [0, 0.5], [1, 1.05]);
  
  // Handle cursor movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Filter projects by category
  const filteredProjects = activeCategory 
    ? projects.filter(project => project.tags.includes(activeCategory))
    : projects;

  // Open project modal
  const openModal = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  // Close project modal
  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  // Toggle category filter modal
  const toggleFilterModal = () => {
    setFilterModalOpen(!filterModalOpen);
  };

  // Select a category
  const selectCategory = (category: string | null) => {
    setActiveCategory(category);
    setFilterModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      
      {/* Custom Cursor */}
      <style dangerouslySetInnerHTML={{ __html: customCursorStyle }} />
      <div 
        className={`custom-cursor ${isCursorVisible ? 'cursor-visible' : ''}`} 
        style={{ 
          transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
          pointerEvents: 'none' 
        }}
      >
        <div className="cursor-ring">
          <span className="cursor-text">View Case</span>
        </div>
      </div>

      <main className="pt-24 bg-transparent">
        {/* Section Label */}
        <div className="flex flex-col items-center text-center bg-transparent transparent-header">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-sm text-blue-600 font-medium">Enquire Project</span>
            </div>
           <motion.p 
            className="text-gray-900 max-w-2xl mx-auto text-lg font-medium mb-12 bg-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Transforming ideas into digital experiences that deliver measurable results
          </motion.p>
        </div>

        {/* Featured Project Section with Parallax */}
        <motion.section 
          ref={featuredRef}
          className="relative mb-24 z-10 mt-24 bg-transparent"
          style={{ 
            opacity: featuredOpacity,
            scale: featuredScale
          }}
        >
          {/* Background Gradient Overlay */}
          {/* Removed background overlay */}

          <div className="container mx-auto px-4 bg-transparent">
            <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center">
              {/* Featured Project Image */}
              <motion.div 
                className="w-full md:w-7/12 rounded-2xl overflow-hidden mockup-hover bg-transparent"
                style={{ y: featuredParallax }}
                onMouseEnter={() => setIsCursorVisible(true)}
                onMouseLeave={() => setIsCursorVisible(false)}
                onClick={() => openModal(featuredProject)}
              >
                <div className="aspect-w-16 aspect-h-9 relative rounded-2xl overflow-hidden shadow-xl">
                  {/* Browser Chrome */}
                  <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 flex items-center px-3 z-10">
                    <div className="flex space-x-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    </div>
                    <div className="ml-4 h-3 bg-gray-700 rounded-full w-48 max-w-[70%]"></div>
                  </div>
                  
                  <motion.img 
                    src={featuredProject.image} 
                    alt={featuredProject.title} 
                    className="w-full h-full object-cover object-left-top rounded-b-2xl"
                    style={{ marginTop: '24px' }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                  />

                  {/* Play Button for Video (if available) */}
                  {featuredProject.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors duration-300">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 5v10l7-5-7-5z" />
                        </svg>
                      </button>
                    </div>
                  )}
                  
                  {/* Hover overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-blue-600/20 backdrop-blur-sm flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-white/30 backdrop-blur-md p-3 rounded-full">
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-5-5m0 0l5-5m-5 5h12" />
                        </svg>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Featured Project Content */}
              <div className="w-full md:w-5/12">
                <motion.div 
                  className="flex items-center mb-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="h-0.5 w-6 bg-blue-500 mr-3"></div>
                  <span className="text-blue-500 uppercase tracking-wide text-sm font-medium">Featured Project</span>
                </motion.div>
                
                <motion.h2 
                  className="text-3xl md:text-4xl font-medium text-gray-900 mb-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {featuredProject.title}
                </motion.h2>
                
                <motion.p 
                  className="text-gray-600 mb-6 text-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {featuredProject.goals}
                </motion.p>
                
                <motion.div 
                  className="grid grid-cols-2 gap-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {featuredProject.stats.slice(0, 4).map((stat, index) => (
                    <motion.div 
                      key={index} 
                      className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-gray-100"
                      whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: "rgba(255, 255, 255, 1)",
                        boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)"
                      }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <p className="text-blue-600 font-medium text-lg">{stat}</p>
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Client Testimonial */}
                {featuredProject.testimonial && (
                  <motion.blockquote 
                    className="relative border-l-4 border-blue-500 pl-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <p className="text-gray-700 italic mb-2">{featuredProject.testimonial}</p>
                    <footer className="text-sm text-gray-600">
                      <strong>{featuredProject.clientName}</strong> - {featuredProject.clientTitle}
                    </footer>
                  </motion.blockquote>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal(featuredProject)}
                  className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  Explore Case Study
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Floating Category Filter Button */}
        <div className="fixed bottom-8 left-8 z-30">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleFilterModal}
            className="flex items-center px-5 py-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-gray-200 text-gray-800 font-medium hover:bg-white transition-colors"
          >
            {activeCategory ? 
              <><span>Showing: {activeCategory}</span><span className="ml-2 text-blue-600">×</span></> : 
              <>
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Explore By Category
              </>
            }
          </motion.button>
        </div>

        {/* Category Filter Modal */}
        <AnimatePresence>
          {filterModalOpen && (
            <motion.div 
              className="fixed inset-0 z-40 flex items-center justify-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                onClick={toggleFilterModal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-xl relative z-10 w-full max-w-md"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-medium text-gray-900">Explore By Category</h3>
                  <button 
                    onClick={toggleFilterModal}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <button
                    onClick={() => selectCategory(null)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      activeCategory === null 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Projects
                  </button>
                  
                  {allCategories.map(category => (
                    <button
                      key={category}
                      onClick={() => selectCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm transition-all ${
                        activeCategory === category 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Grid Section */}
        <section 
          className="container mx-auto px-4 pb-20"
          ref={projectsRef}
        >
          {/* Category Indicator */}
          {activeCategory && (
            <div className="mb-8 px-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full shadow-sm"
              >
                <span>Showing: {activeCategory}</span>
                <button 
                  onClick={() => setActiveCategory(null)}
                  className="ml-2 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors"
                >
                  <svg className="w-3 h-3 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            </div>
          )}
          
          {/* Project Grid with Staggered Animation */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              },
              hidden: {}
            }}
          >
            {filteredProjects
              .filter(project => !project.featured || activeCategory) // Exclude featured project if no category filter
              .map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onOpen={() => openModal(project)}
                isHovered={hoveredProject === project.id}
                onHover={() => {
                  setHoveredProject(project.id);
                  setIsCursorVisible(true);
                }}
                onLeave={() => {
                  setHoveredProject(null);
                  setIsCursorVisible(false);
                }}
              />
            ))}
          </motion.div>
          
          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="py-16 text-center">
              <h3 className="text-xl text-gray-800 mb-2">No projects found</h3>
              <p className="text-gray-600 mb-6">Try selecting a different category</p>
              <button
                onClick={() => setActiveCategory(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-full"
              >
                View All Projects
              </button>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-6">Ready to achieve similar results?</h2>
            <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg">
              Let our team transform your vision into a successful digital product that delivers measurable business impact.
            </p>
            <Link
              to="/start-project"
              className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl"
            >
              Start Your Project
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {modalOpen && selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto"
            >
              <motion.div 
                className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
                onClick={closeModal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
              
              <motion.div
                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 50, opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", damping: 30 }}
                className="bg-white rounded-2xl overflow-hidden relative z-10 w-full max-w-5xl max-h-[90vh] shadow-2xl flex flex-col"
              >
                {/* Modal Header with Device Frame */}
                <div className="relative">
                  <div className="absolute top-4 right-4 z-10">
                    <motion.button 
                      onClick={closeModal}
                      className="p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors shadow-md"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </div>
                  
                  {/* Project Image with Browser Frame */}
                  <div className="bg-gradient-to-b from-blue-50 to-white pt-8 pb-12">
                    <div className="max-w-4xl mx-auto px-4">
                      <motion.div 
                        className="w-full rounded-lg overflow-hidden shadow-2xl border border-gray-200"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        {/* Browser Chrome */}
                        <div className="h-8 bg-gray-800 flex items-center px-3">
                          <div className="flex space-x-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                          </div>
                          <div className="ml-4 px-4 py-0.5 rounded text-xs text-gray-300 bg-gray-700 max-w-[180px] truncate">
                            uplinq.ai/{selectedProject.type.toLowerCase().replace(/\s+/g, '-')}
                          </div>
                        </div>
                        
                        {/* Project Screenshot */}
                        <div className="h-[400px] overflow-hidden bg-white relative">
                          <motion.img 
                            src={selectedProject.image} 
                            alt={selectedProject.title} 
                            className="w-full h-full object-cover object-left-top" 
                            initial={{ scale: 1.05 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8 }}
                          />
                          
                          {/* Video Overlay if Available */}
                          {selectedProject.videoUrl && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <motion.button 
                                className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
                                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 1)" }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M8 5v10l7-5-7-5z" />
                                </svg>
                              </motion.button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Project Title Bar */}
                  <div className="absolute left-0 right-0 bottom-0 transform translate-y-1/2">
                    <div className="max-w-4xl mx-auto px-4">
                      <motion.div 
                        className="bg-white shadow-lg rounded-lg p-4 md:p-6 border border-gray-100"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        <h3 className="text-2xl md:text-3xl font-medium text-gray-900">{selectedProject.title}</h3>
                        <div className="flex items-center">
                          <p className="text-blue-600">{selectedProject.type}</p>
                          <div className="ml-3 flex gap-1">
                            {selectedProject.tags.slice(0, 3).map((tag, i) => (
                              <span 
                                key={i} 
                                className="inline-block px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
                
                {/* Modal Body with Content */}
                <div className="overflow-y-auto pt-16 pb-8 flex-grow">
                  <div className="max-w-4xl mx-auto px-4">
                    {/* Project Summary */}
                    <motion.p 
                      className="text-lg text-gray-700 mb-8 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      {selectedProject.goals}
                    </motion.p>
                    
                    {/* Key Stats */}
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      {selectedProject.stats.map((stat, index) => (
                        <motion.div 
                          key={index} 
                          className="bg-blue-50 rounded-lg p-4 border border-blue-100 flex items-center"
                          whileHover={{ 
                            scale: 1.03, 
                            backgroundColor: "rgba(239, 246, 255, 1)",
                            boxShadow: "0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -1px rgba(59, 130, 246, 0.06)" 
                          }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="mr-3 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          </div>
                          <p className="font-medium text-blue-800">{stat}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                    
                    {/* Process and Results */}
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      <motion.div
                        whileHover={{ 
                          backgroundColor: "rgba(239, 246, 255, 0.5)", 
                          borderRadius: "0.75rem",
                          padding: "1rem"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <h4 className="text-xl font-medium text-gray-900 mb-4 flex items-center">
                          <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                          Our Process
                        </h4>
                        <p className="text-gray-700 leading-relaxed">{selectedProject.process}</p>
                      </motion.div>
                      
                      <motion.div
                        whileHover={{ 
                          backgroundColor: "rgba(239, 246, 255, 0.5)", 
                          borderRadius: "0.75rem",
                          padding: "1rem"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <h4 className="text-xl font-medium text-gray-900 mb-4 flex items-center">
                          <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                          The Results
                        </h4>
                        <p className="text-gray-700 leading-relaxed">{selectedProject.results}</p>
                      </motion.div>
                    </motion.div>
                    
                    {/* Technologies Used */}
                    <motion.div 
                      className="mb-12"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      <h4 className="text-xl font-medium text-gray-900 mb-4">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.techStack.map((tech, i) => (
                          <motion.span 
                            key={i} 
                            className="inline-block px-4 py-2 rounded-full bg-gray-100 text-gray-800 text-sm"
                            whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                    
                    {/* Client Testimonial */}
                    {selectedProject.testimonial && (
                      <motion.div 
                        className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                        whileHover={{ boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.1), 0 4px 6px -2px rgba(59, 130, 246, 0.05)" }}
                      >
                        <blockquote className="text-lg text-gray-800 italic mb-4">
                          "{selectedProject.testimonial}"
                        </blockquote>
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center mr-3">
                            <span className="text-blue-600 font-medium">
                              {selectedProject.clientName?.charAt(0) || 'C'}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{selectedProject.clientName}</p>
                            <p className="text-sm text-gray-600">{selectedProject.clientTitle}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
                
                {/* Modal Footer with Actions */}
                <motion.div 
                  className="border-t border-gray-200 p-4 bg-gray-50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Link 
                        to={`/start-project?type=${encodeURIComponent(selectedProject.type)}`}
                        className="inline-flex items-center px-5 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-md"
                      >
                        Start Similar Project
                        <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </motion.div>
                    
                    <div className="flex gap-3">
                      {/* Share Button */}
                      <motion.button 
                        className="p-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                        whileHover={{ scale: 1.1, backgroundColor: "#f9fafb" }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </motion.button>
                      
                      {/* Download Case Study Button */}
                      <motion.button 
                        className="p-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                        whileHover={{ scale: 1.1, backgroundColor: "#f9fafb" }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <Footer />
      <FloatingChatButton />
    </div>
  );
}

// ProjectCard Component with Animations
function ProjectCard({ 
  project, 
  onOpen, 
  isHovered, 
  onHover, 
  onLeave 
}: { 
  project: Project; 
  onOpen: () => void;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const { scrollYProgress } = useScroll({
    target: useRef<HTMLDivElement>(null),
    offset: ["start end", "end start"]
  });
  
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  
  return (
    <motion.div
      ref={useRef<HTMLDivElement>(null)}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
      style={{ scale: scaleProgress, opacity: opacityProgress }}
      className="group"
    >
      <motion.div 
        className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 h-full flex flex-col"
        whileHover={{ 
          y: -8, 
          transition: { type: "spring", stiffness: 300 }
        }}
        animate={isHovered ? { y: -8 } : { y: 0 }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onClick={onOpen}
      >
        {/* Project Image */}
        <div className="relative h-48 md:h-64 overflow-hidden bg-gray-100">
          {/* Browser Chrome */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 flex items-center px-2 z-10">
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-2 h-2 bg-gray-700 rounded-full w-24 max-w-[60%]"></div>
          </div>
          
          {/* Project Screenshot with Hover Animation */}
          <motion.div 
            className="w-full h-full pt-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover object-left-top"
              initial={{ scale: 1 }}
              animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
          
          {/* Hover Overlay with Key Stats */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/70 to-blue-900/20 flex flex-col justify-end p-4 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm font-medium mb-2">{project.stats[0]}</p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 2).map((tech, i) => (
                <span 
                  key={i} 
                  className="inline-block px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Project Info */}
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-xl font-medium text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-blue-600 mb-4">{project.type}</p>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{project.goals}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span 
                key={i} 
                className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* View Case Study Button */}
        <div className="px-6 pb-6">
          <motion.button
            className="w-full py-2 rounded-lg border border-blue-600 text-blue-600 text-sm font-medium hover:bg-blue-50 transition-colors flex items-center justify-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            View Case Study
            <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
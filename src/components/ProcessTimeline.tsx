import { useEffect, useState } from 'react';

const ProcessTimeline = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const element = document.getElementById('process-timeline');
        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, []);

    return (
        <section
            id="process-timeline"
            className="relative bg-white w-full py-16 sm:py-24 overflow-hidden bg-gradient-to-b from-white to-gray-50">
            {/* Section Label */}
            <div className={`flex items-center justify-center gap-2 mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-sm text-gray-600">Process</span>
            </div>

            {/* Heading */}
            <h2 className={`text-2xl sm:text-3xl md:text-5xl text-center leading-tight font-light text-gray-900 mb-12 sm:mb-24 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                Transforming ideas into<br />
                digital excellence
            </h2>
            <div className="max-w-[1400px] mx-auto px-4">
                {/* Desktop Version */}
                <div className="hidden md:block text-center mb-24">
                    <img
                        src="/logos/matrix-uplinq.svg"
                        alt="Uplinq Process: Strategy, Wireframes, Prototype and Backend, Polished Product"
                        className="w-full max-w-5xl h-auto mx-auto"
                    />
                </div>
                
                {/* Mobile Version - Simplified and Enlarged */}
                <div className="md:hidden">
                    <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
                        <h3 className="text-lg font-medium text-center text-gray-800 mb-3">STRATEGY</h3>
                        <div className="flex justify-center mb-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-500 font-bold">1</span>
                            </div>
                        </div>
                        <div className="text-center mb-2">
                            <div className="font-medium">Discovery call</div>
                            <div className="text-sm text-gray-500">2-4 days</div>
                        </div>
                        <p className="text-sm text-gray-600 text-center">
                            We discuss your project requirements and explore solutions
                        </p>
                    </div>
                    
                    <div className="flex justify-center my-4">
                        <div className="w-8 h-8 rounded-full border-2 border-blue-500 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
                        <h3 className="text-lg font-medium text-center text-gray-800 mb-3">EXECUTION</h3>
                        <div className="flex justify-center mb-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                <span className="text-indigo-500 font-bold">2</span>
                            </div>
                        </div>
                        <div className="text-center mb-2">
                            <div className="font-medium">Wireframes & Design</div>
                            <div className="text-sm text-gray-500">3-4 weeks</div>
                        </div>
                        <p className="text-sm text-gray-600 text-center">
                            Creating the visual blueprint and polishing the UI/UX
                        </p>
                    </div>
                    
                    <div className="flex justify-center my-4">
                        <div className="w-8 h-8 rounded-full border-2 border-blue-500 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
                        <h3 className="text-lg font-medium text-center text-gray-800 mb-3">DELIVERY</h3>
                        <div className="flex justify-center mb-3">
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                <span className="text-purple-500 font-bold">3</span>
                            </div>
                        </div>
                        <div className="text-center mb-2">
                            <div className="font-medium">Polished Product</div>
                            <div className="text-sm text-gray-500">6-7 weeks</div>
                        </div>
                        <p className="text-sm text-gray-600 text-center">
                            Refined, tested and ready for deployment
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessTimeline; 
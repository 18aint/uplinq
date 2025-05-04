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
            className="relative bg-white w-full min-h-screen py-24 overflow-hidden bg-gradient-to-b from-white to-gray-50">
            {/* Section Label */}
            <div className={`flex items-center justify-center gap-2 mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-sm text-gray-600">Process</span>
            </div>

            {/* Heading */}
            <h2 className={`text-2xl sm:text-3xl md:text-5xl text-center leading-tight font-light text-gray-900 mb-24 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                Transforming ideas into<br />
                digital excellence
            </h2>
            <div className="max-w-[1400px] mx-auto px-4">
                <div className="text-center mb-24">
                    {/* Matrix Logo */}
                    <img
                        src="/logos/matrix-uplinq.svg"
                        alt="Uplinq Matrix"
                        className="w-full h-full mx-auto mb-12"
                    />
                </div>
            </div>
        </section>
    );
};

export default ProcessTimeline; 
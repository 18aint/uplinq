import { Link } from 'react-router-dom';

interface Expert {
  name: string;
  role: string;
  avatar: string;
}

const experts: Expert[] = [
  {
    name: 'Jordan Kim',
    role: 'Frontend Developer',
    avatar: '/avatars/avatar1.avif'
  },
  {
    name: 'Alex Rivera',
    role: 'UX Designer',
    avatar: '/avatars/avatar2.avif'
  }
];

const WhyUs = () => {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Section Label */}
            <div className="flex items-center gap-2 justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-sm text-gray-600 truncate">Why us</span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-light line-clamp-3 text-center leading-tight">
              Why partner with Uplinq for your next digital build?
            </h2>

            {/* Points */}
            <div className="space-y-8 mt-[-100px]">
              {/* Point 01 */}
              <div className="flex flex-col items-center text-center gap-2 sm:flex-row sm:items-start sm:text-left sm:gap-6">
                <div className="flex-shrink-0 w-12 h-12 border-2 border-gray-200 rounded-full flex items-center justify-center mb-2 sm:mb-0">
                  <span className="text-sm text-gray-900">01</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-gray-900 mb-2 line-clamp-2">Proven Tech Expertise</h3>
                  <p className="text-gray-600 line-clamp-3 w-full sm:w-[80%] mx-auto sm:mx-0">Our developers specialize in modern frameworks and scalable architectures that power fast, responsive applications.</p>
                </div>
              </div>

              {/* Point 02 */}
              <div className="flex flex-col items-center text-center gap-2 sm:flex-row sm:items-start sm:text-left sm:gap-6">
                <div className="flex-shrink-0 w-12 h-12 border-2 border-gray-200 rounded-full flex items-center justify-center mb-2 sm:mb-0">
                  <span className="text-sm text-gray-900">02</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-gray-900 mb-2 line-clamp-2">Design-Driven Approach</h3>
                  <p className="text-gray-600 line-clamp-3 w-full sm:w-[80%] mx-auto sm:mx-0">We craft interfaces that look stunning and convert, blending aesthetic design with UX best practices.</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              to="/contact?source=why-us"
              className="hidden font-light md:inline-flex items-center px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 transition-all duration-300"
            >
              <span className="truncate">Get started</span>
              <span className="ml-2 bg-white rounded-full text-blue-500 ml-3 mr-[-10px] px-2 py-1">→</span>
            </Link>
          </div>

          {/* Right Column - Image & Card */}
          <div className="relative flex flex-col items-center justify-center mt-8 lg:mt-0">
            {/* Main Image */}
            <div className="rounded-2xl overflow-hidden mx-auto w-full max-w-md">
              <img
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3"
                alt="Developer at work"
                className="w-full h-[300px] sm:h-[400px] md:h-[600px] object-cover"
              />
            </div>

            {/* Overlay Card */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[-50px] w-[90%] sm:w-auto bg-white rounded-xl p-6 shadow-lg flex flex-col items-center">
              <div className="mb-4">
                <h3 className="text-xl font-medium text-gray-900 mb-1 line-clamp-1 text-center">Available Experts</h3>
                <p className="text-sm text-gray-600 line-clamp-1 text-center">Meet the team</p>
              </div>

              {/* Expert List */}
              <div className="space-y-4 mb-6 w-full">
                {experts.map((expert, index) => (
                  <div key={index} className="flex items-center gap-3 justify-center">
                    <div className="w-11 h-11 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={expert.avatar}
                        alt={expert.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-medium text-gray-900 truncate text-center">{expert.name}</h4>
                      <p className="text-sm text-gray-600 truncate text-center">{expert.role}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Card CTA */}
              <a
                href="/team"
                className="text-sm text-blue-500 hover:text-blue-600 font-medium truncate inline-block text-center"
              >
                Meet Our Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs; 
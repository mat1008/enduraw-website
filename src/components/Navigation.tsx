import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
  onScrollToSection?: (sectionId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ onScrollToSection }) => {
  const [showServicesSections, setShowServicesSections] = useState(false);
  const servicesHideTimer = useRef<number | null>(null);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);

  // Scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const servicesSections = [
    { id: 'enduraw-dashboard', name: 'Enduraw Dashboard', path: '/services/enduraw-dashboard' },
    { id: 'pacing-plan', name: 'Pacing Plan', path: '/services/pacing-plan' },
    { id: 'testing', name: 'Testing', path: '/services/testing' },
    { id: 'athlete-support', name: 'Athletes Support', path: '/services/athlete-support' },
    { id: 'enduraw-api', name: 'Enduraw API', path: '/services/enduraw-api' },
    { id: 'performance-center', name: 'Performance Center', path: '/endurawperformancecenter' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-dark-bg/95 backdrop-blur-xl border-b border-white/20 shadow-2xl' 
        : 'bg-dark-bg/80 backdrop-blur-sm border-b border-gray-800/50'
    }`}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-blue-900/10 animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-20 2xl:px-28 relative z-10">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 group">
            <Link 
              to="/" 
              className="text-white font-medium text-xl font-sans uppercase tracking-wide relative transform transition-all duration-300 hover:scale-110"
              onMouseEnter={() => setActiveHover('logo')}
              onMouseLeave={() => setActiveHover(null)}
            >
              <span className="relative z-10 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Enduraw
              </span>
              {activeHover === 'logo' && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-lg animate-pulse"></div>
              )}
            </Link>
          </div>

          <div className="flex space-x-2">
            {/* Home */}
            <Link
              to="/"
              className={`relative px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 hover:shadow-lg group ${
                location.pathname === '/' 
                  ? 'text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 shadow-lg' 
                  : 'text-gray-200 hover:text-white hover:bg-white/10'
              }`}
              onMouseEnter={() => setActiveHover('home')}
              onMouseLeave={() => setActiveHover(null)}
            >
              <span className="relative z-10">Home</span>
              {activeHover === 'home' && location.pathname !== '/' && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-sm"></div>
              )}
            </Link>

            {/* News */}
            <Link
              to="/news"
              className={`relative px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 hover:rotate-1 hover:shadow-lg group ${
                location.pathname === '/news' 
                  ? 'text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 shadow-lg' 
                  : 'text-gray-200 hover:text-white hover:bg-white/10'
              }`}
              onMouseEnter={() => setActiveHover('news')}
              onMouseLeave={() => setActiveHover(null)}
            >
              <span className="relative z-10">News</span>
              {activeHover === 'news' && location.pathname !== '/news' && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-xl blur-sm"></div>
              )}
            </Link>

            {/* Services with Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => {
                if (servicesHideTimer.current) window.clearTimeout(servicesHideTimer.current);
                setShowServicesSections(true);
                setActiveHover('services');
              }}
              onMouseLeave={() => {
                if (servicesHideTimer.current) window.clearTimeout(servicesHideTimer.current);
                servicesHideTimer.current = window.setTimeout(() => {
                  setShowServicesSections(false);
                  setActiveHover(null);
                }, 150);
              }}
            >
              <Link
                to="/services"
                className={`relative block px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 hover:shadow-lg ${
                  location.pathname.startsWith('/services') 
                    ? 'text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 shadow-lg' 
                    : 'text-gray-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="relative z-10 flex items-center gap-1">
                  Services
                  <svg className={`w-4 h-4 transition-transform duration-300 ${showServicesSections ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
                {activeHover === 'services' && !location.pathname.startsWith('/services') && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-sm"></div>
                )}
              </Link>
              
              {/* Services Dropdown */}
              <div className={`absolute left-0 top-full mt-2 w-56 bg-gray-800/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl transition-all duration-300 transform origin-top ${
                showServicesSections 
                  ? 'opacity-100 visible scale-100 translate-y-0' 
                  : 'opacity-0 invisible scale-95 -translate-y-2'
              }`}>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl"></div>
                <div className="relative z-10 p-2">
                  {servicesSections.map((service, index) => (
                    <Link
                      key={service.id}
                      to={service.path}
                      onClick={() => setShowServicesSections(false)}
                      className="block px-4 py-3 text-sm text-gray-200 hover:bg-white/10 hover:text-white transition-all duration-300 rounded-xl mb-1 last:mb-0 transform hover:scale-105 hover:translate-x-1 relative group"
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r transition-all duration-300 ${
                          index === 0 ? 'from-purple-400 to-pink-400' :
                          index === 1 ? 'from-orange-400 to-red-400' :
                          index === 2 ? 'from-blue-400 to-cyan-400' :
                          index === 3 ? 'from-green-400 to-teal-400' :
                          index === 4 ? 'from-yellow-400 to-amber-400' :
                          'from-indigo-400 to-purple-400'
                        } group-hover:scale-125`}></div>
                        <span>{service.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact */}
            <Link
              to="/contact"
              className={`relative px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 hover:rotate-1 hover:shadow-lg ${
                location.pathname === '/contact' 
                  ? 'text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 shadow-lg' 
                  : 'text-gray-200 hover:text-white hover:bg-white/10'
              }`}
              onMouseEnter={() => setActiveHover('contact')}
              onMouseLeave={() => setActiveHover(null)}
            >
              <span className="relative z-10">Contact</span>
              {activeHover === 'contact' && location.pathname !== '/contact' && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl blur-sm"></div>
              )}
            </Link>

            {/* DataPlayers Logo */}
            <a
              href="https://www.dataplayers.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-3 py-2 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-rotate-2 hover:shadow-lg relative group"
              onMouseEnter={() => setActiveHover('dataplayers')}
              onMouseLeave={() => setActiveHover(null)}
            >
              <img
                src="/images/dataplayers.png"
                alt="DataPlayers"
                className="h-8 w-auto relative z-10 transition-all duration-300 group-hover:brightness-110"
              />
              {activeHover === 'dataplayers' && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-xl blur-lg"></div>
              )}
            </a>
          </div>
        </div>
      </div>

      {/* Fixed width, no measurement clones */}
    </nav>
  );
};

export default Navigation;

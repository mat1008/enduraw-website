import React, { useState, useEffect } from 'react';
// import ChamonixBooking from '../../components/ChamonixBooking'; // COMMENTÉ POUR PUBLICATION

const TestingPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<'paris' | 'chamonix'>('paris');


  // Animation states
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimatedElements(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elementsToObserve = document.querySelectorAll('[id^="animate-"]');
    elementsToObserve.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-dark-bg text-white min-h-screen pt-16 relative overflow-hidden">
      {/* Modern animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div 
          id="animate-title"
          className={`transform transition-all duration-1000 ease-out ${
            animatedElements.has('animate-title')
              ? 'translate-y-0 opacity-100'
              : 'translate-y-10 opacity-0'
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-8 uppercase tracking-wide bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-pulse">
            Testing Services
          </h1>
        </div>
        
        <div 
          id="animate-hero-image" 
          className={`mb-12 text-center transform transition-all duration-1000 delay-300 ${
            animatedElements.has('animate-hero-image')
              ? 'translate-y-0 opacity-100 scale-100'
              : 'translate-y-10 opacity-0 scale-95'
          }`}
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <img
              src="/images/testing.png"
              alt="Testing Services"
              className="max-w-[70%] h-auto mx-auto rounded-lg shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        </div>
        
        {/* Subtitle */}
        <div 
          id="animate-subtitle"
          className={`text-center mb-12 transform transition-all duration-1000 delay-500 ${
            animatedElements.has('animate-subtitle')
              ? 'translate-y-0 opacity-100'
              : 'translate-y-10 opacity-0'
          }`}
        >
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            Learn more about your physiology and what makes you a great athlete
          </p>
        </div>
        
        {/* Location Selection */}
        <div 
          id="animate-location-selector"
          className={`flex justify-center mb-12 transform transition-all duration-1000 delay-700 ${
            animatedElements.has('animate-location-selector')
              ? 'translate-y-0 opacity-100'
              : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="bg-dark-secondary/80 backdrop-blur-sm rounded-xl p-2 flex border border-white/10 shadow-2xl">
            <button
              onClick={() => setSelectedLocation('paris')}
              className={`px-8 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedLocation === 'paris'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Testing in Paris
            </button>
            <button
              onClick={() => setSelectedLocation('chamonix')}
              className={`px-8 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedLocation === 'chamonix'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Testing in Chamonix
            </button>
          </div>
        </div>
        
        {/* Paris Testing Section */}
        {selectedLocation === 'paris' && (
          <div 
            id="animate-paris-section"
            className={`space-y-8 transform transition-all duration-1000 ${
              animatedElements.has('animate-paris-section')
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="bg-dark-secondary/80 backdrop-blur-sm p-8 rounded-2xl text-center border border-white/10 shadow-2xl relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-500"></div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent relative z-10">Testing in Paris</h2>
              <p className="text-xl text-gray-200 mb-8 relative z-10">
                Professional testing services available at our partner facility in Paris
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 transition-all duration-500"></div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent relative z-10">Harbat Running Lab Partnership</h3>
                <p className="text-gray-300 mb-6 relative z-10">
                  We partner with Harbat Running Lab, a state-of-the-art performance testing facility in Paris, 
                  to provide you with comprehensive physiological assessments using the latest technology.
                </p>
                <div className="text-left space-y-4 text-gray-300 mb-8 relative z-10">
                  <h4 className="text-xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent mb-4">Unlock Your Full Potential with VO₂max Testing</h4>
                  
                  <p className="leading-relaxed">
                    <span className="text-lg">🏃‍♂️ Road Runners</span> – Find your exact training zones with our incremental test (flat or uphill). Add the fuel test (+€30) to see how your body burns carbs & fats—perfect for marathon nutrition.
                  </p>
                  
                  <p className="leading-relaxed">
                    <span className="text-lg">⛰️ Trail Runners</span> – Measure your running & hiking economy and discover how you really use energy on the climbs.
                  </p>
                  
                  <p className="leading-relaxed">
                    <span className="text-lg">🔥</span> With our real-time oxidation analysis, you'll know exactly when your body taps into carbs or fats—so you can train smarter, fuel better, and race stronger.
                  </p>
                </div>
              </div>
              <a
                href="https://runninglab.store/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 inline-block transform hover:scale-105 shadow-lg hover:shadow-xl relative z-10"
              >
                Book at Harbat Running Lab →
              </a>
            </div>
          </div>
        )}
        
        {/* Chamonix Testing Section */}
        {selectedLocation === 'chamonix' && (
          <div 
            id="animate-chamonix-section"
            className="space-y-8"
          >
          {/* Simplified Chamonix Section */}
          <div className="bg-dark-secondary/80 backdrop-blur-sm p-8 rounded-2xl text-center border border-white/10 shadow-2xl relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-500"></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent relative z-10">Testing in Chamonix</h2>
            <p className="text-xl text-gray-200 mb-8 relative z-10">
              Professional testing services available at our Chamonix facility
            </p>
          </div>
          
          {/* Protocol Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* VO2Max Protocol */}
            <div className="bg-dark-secondary/80 backdrop-blur-sm p-8 rounded-2xl border border-white/10 relative group overflow-hidden shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 transform hover:scale-105 hover:-rotate-1">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500"></div>
              <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent relative z-10">VO2Max Protocol</h3>
              <p className="text-lg text-gray-300 mb-2 relative z-10">Testing at Chamonix or Paris</p>
              <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent mb-6 relative z-10">From 150€</p>
              
              <ul className="space-y-3 text-gray-200 relative z-10">
                <li className="flex items-center group">
                  <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  <span>FC max</span>
                </li>
                <li className="flex items-center group">
                  <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  <span>VO2max</span>
                </li>
                <li className="flex items-center group">
                  <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  <span>Ventilatory thresholds 1 & 2</span>
                </li>
                <li className="flex items-center group">
                  <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  <span>MAS (Maximum Aerobic speed - VMA)</span>
                </li>
                <li className="flex items-center group">
                  <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  <span>Training zones</span>
                </li>
                <li className="flex items-center group">
                  <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  <span>Muscle oxygen</span>
                </li>
                <li className="flex items-center group">
                  <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  <span>Core Body</span>
                </li>
                <li className="flex items-center group">
                  <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  <span>TempLactate testing (optional)</span>
                </li>
              </ul>
            </div>
            
            {/* Run/Walk Protocol */}
            <div className="bg-dark-secondary/80 backdrop-blur-sm p-8 rounded-2xl border border-white/10 relative group overflow-hidden shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:scale-105 hover:rotate-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 transition-all duration-500"></div>
              <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent relative z-10">Run/Walk Protocol</h3>
              <p className="text-lg text-gray-300 mb-2 relative z-10">Testing at Chamonix or Paris</p>
              <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent mb-6 relative z-10">From 50€</p>
              
              <ul className="space-y-3 text-gray-200 relative z-10">
                <li className="flex items-center group">
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  <span>Running economy</span>
                </li>
                <li className="flex items-center group">
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  <span>Walking economy</span>
                </li>
                <li className="flex items-center group">
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  <span>"Poles" economy</span>
                </li>
                <li className="flex items-center group">
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  <span>Critical Walking Gradient</span>
                </li>
                <li className="flex items-center group">
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  <span>Critical Running Speed</span>
                </li>
                <li className="flex items-center group">
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  <span>VO2, VE</span>
                </li>
                <li className="flex items-center group">
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  <span>FC</span>
                </li>
                <li className="flex items-center group">
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                  <span>Energetic outputs</span>
                </li>
              </ul>
            </div>
          </div>
          

          <div 
            id="animate-whats-included"
            className="bg-white/95 backdrop-blur-sm text-black p-8 rounded-2xl shadow-2xl"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent text-center">What's Included</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center group transform hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2 text-lg">Pre-Test Consultation</h3>
                <p className="text-sm text-gray-700">Comprehensive health screening and goal assessment</p>
              </div>
              <div className="text-center group transform hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2 text-lg">Laboratory Testing</h3>
                <p className="text-sm text-gray-700">State-of-the-art equipment and protocols</p>
              </div>
              <div className="text-center group transform hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all duration-300">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2 text-lg">Detailed Report</h3>
                <p className="text-sm text-gray-700">Comprehensive analysis with actionable recommendations</p>
              </div>
            </div>
          </div>

          {/* Système de réservation en ligne - Coming Soon */}
          <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 p-8 rounded-2xl border border-blue-400/20">
            <h2 className="text-3xl font-bold mb-6 gradient-text-blue text-center">
              Réservation en ligne 🚀
            </h2>
            <div className="glass-card p-8 text-center">
              <div className="mb-6">
                <div className="text-6xl mb-4">🔧</div>
                <h3 className="text-2xl font-bold mb-4 gradient-text-orange">Coming Soon</h3>
                <p className="text-xl text-gray-200 mb-6 leading-relaxed">
                  Le système de réservation en ligne sera bientôt disponible !
                </p>
                <p className="text-lg text-gray-300 mb-8">
                  En attendant, contactez-nous directement pour réserver votre créneau de test.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="btn-gradient px-8 py-3 rounded-lg inline-flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Nous contacter</span>
                </a>
                
                <a
                  href="mailto:contact.enduraw@gmail.com?subject=Réservation test Chamonix"
                  className="px-8 py-3 rounded-lg border border-white/40 text-white hover:bg-white/10 transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Email direct</span>
                </a>
              </div>
            </div>
          </div>

          {/* Ancien composant de réservation Stripe - COMMENTÉ POUR PUBLICATION
          <div 
            id="animate-booking-component"
            className="opacity-100"
          >
            <ChamonixBooking 
              onBookingSuccess={(bookingData) => {
                console.log('Réservation confirmée:', bookingData);
              }}
            />
          </div>
          */}

          {/* Section contact alternative */}
          <div className="glass-card p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Besoin d'autres informations ?
            </h3>
            <p className="text-gray-300 mb-6">
              Pour des questions spécifiques ou des créneaux personnalisés, n'hésitez pas à nous contacter.
            </p>
            <a
              href="/contact"
              className="btn-gradient inline-flex items-center gap-3 text-lg py-3 px-6 rounded-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>Nous contacter</span>
            </a>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default TestingPage;
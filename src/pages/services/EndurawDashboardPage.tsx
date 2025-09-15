import React, { useState, useEffect } from 'react';

const EndurawDashboardPage: React.FC = () => {
  const [currentArchitectSlide, setCurrentArchitectSlide] = useState(0);

  // Architect data
  const architects = [
    {
      id: 1,
      name: "Alodie Boissonet",
      country: "France 🇫🇷",
      education: "X - Cambridge",
      position: "Software Engineer",
      company: "@Mistral AI"
    },
    {
      id: 2,
      name: "Joseph Mestrallet",
      country: "France 🇫🇷",
      education: "X - HEC Berkeley ENSEA",
      position: "Performance Scientist",
      company: "@Enduraw"
    },
    {
      id: 3,
      name: "Aymeric Roucher",
      country: "France 🇫🇷",
      education: "X - Cambridge",
      position: "Project Lead - Agents",
      company: "@Hugging Face"
    },
    {
      id: 4,
      name: "Valentin Templé",
      country: "France 🇫🇷",
      education: "ESILV Data science & IA",
      position: "Data Scientist Intern",
      company: "@Enduraw"
    }
  ];

  // Auto-slide architects (2x2 grid)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentArchitectSlide((prev) => (prev + 1) % Math.ceil(architects.length / 2));
    }, 4000);
    return () => clearInterval(interval);
  }, [architects.length]);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white min-h-screen pt-16 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
            Enduraw Dashboard
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="space-y-8">
          {/* 1. Strava Integration Section */}
          <section className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl hover:bg-white/10 transition-all duration-500 group">
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-orange-500/20 to-transparent rounded-tl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-red-500/20 to-transparent rounded-br-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.599h4.172L10.463 0l-7 13.828h4.917"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-4xl font-black mb-2 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    Strava Integration
                  </h2>
                  <h3 className="text-xl font-light text-gray-300 tracking-wide">
                    A tool to better understand your training
                  </h3>
                </div>
              </div>
            
              {/* Call to Action */}
              <div className="text-center mb-16">
                <a
                  href="https://enduraw-report-strava.onrender.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white font-bold py-6 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-orange-500/25"
                >
                  <span className="text-lg tracking-wide">Activate Your Enduraw Report</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>

              {/* Statistics */}
              <div className="mb-16">
                <h3 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  In Figures
                </h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="group text-center p-8 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl border border-white/10 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <span className="text-2xl">🌍</span>
                    </div>
                    <div className="text-5xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-6 tracking-tight">
                      4,478
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Enduraw report users worldwide
                    </p>
                  </div>
                  
                  <div className="group text-center p-8 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl border border-white/10 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <span className="text-2xl">👌</span>
                    </div>
                    <div className="text-5xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-6 tracking-tight">
                      236,750
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Activities processed and analyzed
                    </p>
                  </div>
                  
                  <div className="group text-center p-8 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl border border-white/10 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <span className="text-2xl">🌀</span>
                    </div>
                    <div className="text-4xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-6 tracking-tight">
                      2.9M km
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Total distance (72× around the world)
                    </p>
                  </div>
                </div>
              </div>

            {/* Description Text */}
            <div className="space-y-6 text-lg text-gray-200 mb-8">
              <p className="italic">
                "Another tough session in the books ! But what a windy day... I'm sure I would have recorded my FKT without !"
              </p>
              <p>
                Every athlete knows that wind and heat can be powerful enemies in a training or a race.
              </p>
              <p>
                Ever trained at high altitude ? Oxygen deprecation is real !
              </p>
              <p>
                But how to quantify the impact of these parameters of your performance ?
              </p>
              <p>
                With Enduraw's Strava Integration, your pace can be adjusted according to
              </p>
              <ul className="space-y-2 ml-6">
                <li>• Heat</li>
                <li>• Wind</li>
                <li>• Altitude</li>
                <li>• Elevation gain</li>
              </ul>
              <p>
                Giving you a full readibility of your session, it gives you keys to analyze your training under external conditions and adapt it.
              </p>
            </div>

            {/* Technology Link */}
            <div className="text-center mb-12">
              <a
                href="https://medium.com/@josephmestrallet/enduraw-report-api-a-powerful-tool-to-enhance-your-activity-interpretation-with-external-7273edbf9653"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Read more about the technology
              </a>
            </div>

            {/* Releases */}
            <div className="bg-white/10 p-6 rounded-lg border border-white/20">
              <h3 className="text-xl font-bold mb-6 text-white">Releases</h3>
              <div className="space-y-3 text-gray-200">
                <p>• 07/07/2023 : First idea of the project</p>
                <p>• 16/11/2023 : Official launch</p>
                <p>• 15/05/2024 : Temperature and wind formula fixs.</p>
                <p>• 05/06/2024 : Launch of V2 : custom formula with your personalised data. Adding cycling and trail running</p>
              </div>
            </div>
          </div>

            {/* The Architects Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-8 text-white text-center">The Architects</h3>
              
              <div className="relative overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentArchitectSlide * 100}%)` }}
                >
                  {Array.from({ length: Math.ceil(architects.length / 2) }).map((_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {architects.slice(slideIndex * 2, (slideIndex + 1) * 2).map((architect) => (
                          <div key={architect.id} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-orange-500/50 transition-all duration-300">
                            <div className="text-center">
                              {/* Profile placeholder */}
                              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                              
                              {/* Name */}
                              <h4 className="text-xl font-bold text-white mb-2">{architect.name}</h4>
                              
                              {/* Country */}
                              <p className="text-gray-300 mb-2">{architect.country}</p>
                              
                              {/* Education */}
                              <p className="text-sm text-orange-400 font-medium mb-2">{architect.education}</p>
                              
                              {/* Position */}
                              <p className="text-white font-semibold mb-1">{architect.position}</p>
                              
                              {/* Company */}
                              <p className="text-orange-400 font-medium">{architect.company}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Navigation dots */}
                <div className="flex justify-center mt-6 space-x-2">
                  {Array.from({ length: Math.ceil(architects.length / 2) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentArchitectSlide(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentArchitectSlide ? 'bg-orange-500' : 'bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Custom animations and styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        
        .group:hover .animate-pulse {
          animation: pulse 1s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .backdrop-blur-xl {
          backdrop-filter: blur(20px);
        }
        
        .backdrop-blur-md {
          backdrop-filter: blur(12px);
        }
        
        .text-shadow {
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .hover-glow:hover {
          box-shadow: 0 0 30px rgba(168, 85, 247, 0.4);
        }
      `}</style>
    </div>
  );
};

export default EndurawDashboardPage;
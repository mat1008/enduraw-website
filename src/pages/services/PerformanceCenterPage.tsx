import React, { useState, useEffect } from 'react';
import PerformanceCenterForm from '../../components/PerformanceCenterForm';
import '../../styles/fancy.css';

const PerformanceCenterPage: React.FC = () => {
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

  const stages = [
    {
      title: "1st IMMERSIVE STAGE",
      period: "From October Friday 3rd To October Tuesday 7th",
      slots: "8 slots"
    },
    {
      title: "2nd IMMERSIVE STAGE", 
      period: "From October Wednesday 9th To October Saturday 12th",
      slots: "7 slots"
    },
    {
      title: "3rd IMMERSIVE STAGE",
      period: "From April Saturday 25th To April Tuesday 28th", 
      slots: "7 slots"
    },
    {
      title: "4th IMMERSIVE STAGE",
      period: "From April Wednesday 30th To May Sunday 3rd",
      slots: "8 slots"
    }
  ];

  const staffMembers = [
    {
      id: 1,
      firstName: "Joseph",
      lastName: "Mestrallet",
      position: "Tom Evans and Ruth Croft Data Scientist",
      image: "/images/staff/staff11.png"
    },
    {
      id: 2,
      firstName: "Alice",
      lastName: "Meignié",
      position: "Sports Nutritionist & Chef - INEOS Grenadiers",
      image: "/images/staff/staff3.png"
    },
    {
      id: 3,
      firstName: "Clément",
      lastName: "Dumont",
      position: "Physiotherapist - Belgian Biathlon Team",
      image: "/images/staff/staff4.png"
    },
    {
      id: 4,
      firstName: "Olivier",
      lastName: "Garcin",
      position: "Podiatrist & Biomechanics Expert",
      image: "/images/staff/staff5.png"
    },
    {
      id: 5,
      firstName: "Anthony",
      lastName: "Saliou",
      position: "Enduraw Trail Coach and Performance Data Scientist",
      image: "/images/staff/staff2.png"
    },
    {
      id: 6,
      firstName: "To Be",
      lastName: "Defined",
      position: "Photographer & Videographer",
      image: "/images/staff/staff7.jpg"
    },
    {
      id: 7,
      firstName: "Mathieu",
      lastName: "Galland",
      position: "Holistic Manager",
      image: "/images/staff/staff8.png"
    }
  ];


  return (
    <div className="fancy-bg text-white min-h-screen relative">
      {/* Animated background orbs */}
      <div className="bg-orb-1"></div>
      <div className="bg-orb-2"></div>
      <div className="bg-orb-3"></div>
      
      {/* Header Section */}
      <section className="pt-32 pb-32 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div 
            id="animate-main-title"
            className={`transform transition-all duration-1500 ease-out ${
              animatedElements.has('animate-main-title')
                ? 'translate-y-0 opacity-100 scale-100'
                : 'translate-y-20 opacity-0 scale-95'
            }`}
          >
            <h1 className="text-6xl md:text-8xl font-black mb-8 gradient-text-orange uppercase tracking-tight animate-float relative">
              <span className="relative z-10">Enduraw Performance Center</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-3xl animate-pulse"></div>
            </h1>
          </div>
          
          <div 
            id="animate-location"
            className={`transform transition-all duration-1000 delay-300 ${
              animatedElements.has('animate-location')
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }`}
          >
            <p className="text-2xl md:text-4xl text-gray-200 mb-8 font-light bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Chamonix-Mont-Blanc, FRANCE
            </p>
          </div>
          
          <div 
            id="animate-hero-card"
            className={`transform transition-all duration-1000 delay-500 ${
              animatedElements.has('animate-hero-card')
                ? 'translate-y-0 opacity-100 scale-100'
                : 'translate-y-10 opacity-0 scale-95'
            }`}
          >
            <div className="glass-card p-8 max-w-3xl mx-auto mb-12 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500"></div>
              <h2 className="text-3xl md:text-5xl font-bold gradient-text-purple mb-6 uppercase tracking-wide relative z-10">
                Optimize Your Trail Running Performance
              </h2>
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed relative z-10">
                Elite training camps in the heart of the Alps with world-class facilities and expert coaching staff
              </p>
            </div>
          </div>
          
          <div 
            id="animate-cta-button"
            className={`mt-12 transform transition-all duration-1000 delay-700 ${
              animatedElements.has('animate-cta-button')
                ? 'translate-y-0 opacity-100 scale-100'
                : 'translate-y-10 opacity-0 scale-90'
            }`}
          >
            <button
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-gradient text-xl md:text-2xl px-12 py-6 uppercase tracking-wide inline-flex items-center gap-4 transform hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <span className="relative z-10">Book Your Training Camp Now</span>
              <svg className="w-8 h-8 relative z-10 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
        <div className="absolute inset-0 opacity-10">
          <div className="bg-orb-1"></div>
          <div className="bg-orb-2"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card p-12">
            <h3 className="text-3xl font-bold gradient-text-blue mb-8">Looking to elevate your performance?</h3>
            <p className="text-xl text-gray-200 leading-relaxed">
              At the Enduraw Performance Center in Chamonix, we deliver cutting-edge testing, 
              biomechanical analysis, training camps, and tailored coaching to help time-pressed, 
              performance-driven professionals reach their peak potential.
            </p>
          </div>
        </div>
      </section>

      {/* Stages Section */}
      <section className="py-32 fancy-bg relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="animate-stages-title"
            className={`transform transition-all duration-1000 ${
              animatedElements.has('animate-stages-title')
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-black text-center mb-16 gradient-text-purple uppercase tracking-wide animate-float relative">
              <span className="relative z-10">Available Stages</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-2xl animate-pulse"></div>
            </h2>
          </div>
          
          {/* Desktop: Grid layout */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-8">
            {stages.map((stage, index) => (
              <div 
                key={index} 
                id={`animate-stage-${index}`}
                className={`glass-card p-8 text-center group relative overflow-hidden transform transition-all duration-1000 ${
                  animatedElements.has(`animate-stage-${index}`)
                    ? 'translate-y-0 opacity-100 scale-100'
                    : 'translate-y-20 opacity-0 scale-95'
                } hover:scale-110 hover:rotate-3 hover:shadow-2xl`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* 3D Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-500 rounded-2xl"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-xl group-hover:blur-2xl transition-all duration-500 rounded-2xl"></div>
                
                {/* Floating Elements */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full group-hover:scale-125 group-hover:rotate-45 transition-all duration-500"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-green-400/30 to-teal-500/30 rounded-full group-hover:scale-150 group-hover:-rotate-45 transition-all duration-700"></div>
                
                <div className="icon-container bg-gradient-to-br from-purple-500 to-pink-500 mx-auto mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative z-10 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-6 gradient-text-orange uppercase tracking-wide relative z-10 group-hover:scale-105 transition-transform duration-300">
                  {stage.title}
                </h3>
                <div className="space-y-3 mb-6 relative z-10">
                  <p className="text-sm md:text-base text-gray-200 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {stage.period.split(' To ').map((part, idx) => (
                      <span key={idx}>
                        {part}
                        {idx === 0 && <br />}
                        {idx === 0 && 'To '}
                      </span>
                    ))}
                  </p>
                </div>
                <div className="stat-card p-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 relative z-10">
                  <p className="text-lg md:text-xl font-bold gradient-text-blue">
                    {stage.slots}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile/Tablet: Horizontal scroll */}
          <div className="lg:hidden overflow-x-auto">
            <div className="flex space-x-6 pb-4" style={{ minWidth: 'max-content' }}>
              {stages.map((stage, index) => (
                <div key={index} className="glass-card p-8 text-center flex-shrink-0 w-80 group">
                  <div className="icon-container bg-gradient-to-br from-purple-500 to-pink-500 mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-6 gradient-text-orange uppercase tracking-wide">
                    {stage.title}
                  </h3>
                  <div className="space-y-3 mb-6">
                    <p className="text-base text-gray-200 leading-relaxed">
                      {stage.period.split(' To ').map((part, idx) => (
                        <span key={idx}>
                          {part}
                          {idx === 0 && <br />}
                          {idx === 0 && 'To '}
                        </span>
                      ))}
                    </p>
                  </div>
                  <div className="stat-card p-4">
                    <p className="text-xl font-bold gradient-text-blue">
                      {stage.slots}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-sm text-gray-300 italic">← Swipe to see all stages →</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Experience Description Section */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="bg-orb-1"></div>
          <div className="bg-orb-2"></div>
          <div className="bg-orb-3"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            id="animate-presentation-title"
            className={`text-center mb-16 transform transition-all duration-1000 ${
              animatedElements.has('animate-presentation-title')
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-8 gradient-text-orange uppercase tracking-wide animate-float relative">
              <span className="relative z-10">Train Like a Pro</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-red-500/30 blur-3xl animate-pulse"></div>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div 
              id="animate-presentation-content"
              className={`space-y-8 transform transition-all duration-1000 delay-300 ${
                animatedElements.has('animate-presentation-content')
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-20 opacity-0'
              }`}
            >
              <div className="glass-card p-8 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-500"></div>
                
                <div className="relative z-10 space-y-6 text-lg text-gray-200 leading-relaxed">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold gradient-text-blue mb-4">Dream Training Environment</h3>
                      <p className="group-hover:text-white transition-colors duration-300">
                        Ever dreamed of training like a pro in a world-class high-performance environment? 
                        Look no further — come to <span className="text-orange-400 font-semibold">Chamonix-Mont-Blanc</span>, 
                        on the legendary <span className="text-orange-400 font-semibold">UTMB trails</span>, at the foot of the iconic Mont-Blanc.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-8 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500"></div>
                
                <div className="relative z-10 space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold gradient-text-purple mb-3">Luxury Alpine Accommodation</h4>
                      <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                        Stay in a <span className="text-purple-400 font-semibold">luxury chalet</span> nestled in nature, 
                        sharing a twin room (single beds), where your only focus will be performance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Image and Team Info */}
            <div 
              id="animate-presentation-image"
              className={`space-y-8 transform transition-all duration-1000 delay-500 ${
                animatedElements.has('animate-presentation-image')
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-20 opacity-0'
              }`}
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <img
                  src="/images/epcchill.jpg"
                  alt="Enduraw Performance Center Chamonix"
                  className="relative z-10 w-full h-80 object-cover rounded-2xl shadow-2xl border border-white/20 group-hover:border-orange-400/50 transition-all duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              <div className="glass-card p-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-500/5 group-hover:from-green-500/10 group-hover:to-teal-500/10 transition-all duration-500"></div>
                
                <div className="relative z-10">
                  <h4 className="text-2xl font-bold gradient-text-green mb-6 flex items-center">
                    <svg className="w-8 h-8 mr-3 text-green-400 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Your Pro-Level Support Team
                  </h4>
                  
                  <div className="grid gap-4">
                    {[
                      { icon: "🏃", title: "Enduraw Trail Coach", desc: "Personalized training assessment" },
                      { icon: "📊", title: "Performance Data Scientist", desc: "Analysis like Tom Evans or Ruth Croft" },
                      { icon: "⚕️", title: "Physiotherapist", desc: "Belgian Biathlon Team expert" },
                      { icon: "🍽️", title: "Sports Nutritionist & Chef", desc: "INEOS Grenadiers professional" },
                      { icon: "🦶", title: "Podiatrist", desc: "Biomechanics and stride analysis" },
                      { icon: "📸", title: "Photographer/Videographer", desc: "Capture your pro athlete moments" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group/item">
                        <div className="flex-shrink-0 text-2xl group-hover/item:scale-125 transition-transform duration-300">
                          {item.icon}
                        </div>
                        <div>
                          <h5 className="font-bold text-white group-hover/item:text-green-400 transition-colors duration-300">
                            {item.title}
                          </h5>
                          <p className="text-sm text-gray-400 group-hover/item:text-gray-300 transition-colors duration-300">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Staff Section */}
      <section className="py-32 fancy-bg relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="bg-orb-1 opacity-20"></div>
          <div className="bg-orb-2 opacity-20"></div>
          <div className="bg-orb-3 opacity-20"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            id="animate-staff-title"
            className={`transform transition-all duration-1000 mb-20 ${animatedElements.has('animate-staff-title')
              ? 'translate-y-0 opacity-100'
              : 'translate-y-10 opacity-0'
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-black text-center mb-8 gradient-text-purple uppercase tracking-wide animate-float relative">
              <span className="relative z-10">Meet Our Expert Team</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-3xl animate-pulse"></div>
            </h2>
            <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
              World-class professionals dedicated to optimizing your performance in the heart of Chamonix
            </p>
          </div>

          {/* Desktop Grid Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
            {staffMembers.map((staff, index) => (
              <div 
                key={staff.id}
                id={`animate-staff-${index}`}
                className={`glass-card p-8 text-center group relative overflow-hidden transform transition-all duration-1000 ${
                  animatedElements.has(`animate-staff-${index}`)
                    ? 'translate-y-0 opacity-100 scale-100'
                    : 'translate-y-20 opacity-0 scale-95'
                } hover:scale-105 hover:-rotate-1 hover:shadow-2xl`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* 3D Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-500 rounded-2xl"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-lg group-hover:blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                
                {/* Floating Particles */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full group-hover:scale-150 group-hover:rotate-180 transition-all duration-700 animate-pulse"></div>
                <div className="absolute bottom-6 left-4 w-2 h-2 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full group-hover:scale-200 group-hover:-rotate-180 transition-all duration-1000 animate-pulse delay-500"></div>
                
                {/* Profile Image with Advanced Effects */}
                <div className="relative mb-6 group-hover:scale-110 transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-full blur-xl group-hover:blur-2xl group-hover:scale-125 transition-all duration-500"></div>
                  <img
                    src={staff.image}
                    alt={`${staff.firstName} ${staff.lastName}`}
                    className="w-32 h-32 rounded-full object-cover mx-auto shadow-2xl border-4 border-white/20 group-hover:border-white/40 transition-all duration-500 relative z-10 group-hover:shadow-cyan-500/50"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/images/placeholder-person.jpg";
                    }}
                  />
                  {/* Rotating Ring */}
                  <div className="absolute inset-0 w-32 h-32 mx-auto border-2 border-dashed border-cyan-400/50 rounded-full animate-spin group-hover:border-purple-400/70 transition-colors duration-500" style={{ animationDuration: '10s' }}></div>
                </div>
                
                <div className="relative z-10 space-y-3">
                  <h3 className="text-xl font-bold gradient-text-blue group-hover:scale-110 transition-transform duration-300">
                    {staff.firstName}
                  </h3>
                  <h4 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300">
                    {staff.lastName}
                  </h4>
                  <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:via-cyan-400/60 transition-all duration-500"></div>
                  <p className="text-sm text-gray-300 group-hover:text-gray-100 transition-colors duration-300 leading-relaxed">
                    {staff.position}
                  </p>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/0 via-transparent to-cyan-500/0 group-hover:from-purple-500/10 group-hover:to-cyan-500/10 transition-all duration-500 rounded-2xl pointer-events-none"></div>
              </div>
            ))}
          </div>
          
          {/* Mobile/Tablet Horizontal Scroll */}
          <div className="lg:hidden overflow-hidden relative">
            <div className="flex animate-scroll-infinite space-x-8 py-8">
              {/* First Set */}
              {staffMembers.map((staff, index) => (
                <div key={`mobile-${staff.id}`} className="glass-card p-6 text-center flex-shrink-0 w-72 group transform hover:scale-105 transition-all duration-500">
                  <div className="relative mb-4">
                    <img
                      src={staff.image}
                      alt={`${staff.firstName} ${staff.lastName}`}
                      className="w-24 h-24 rounded-full object-cover mx-auto shadow-xl border-3 border-white/20 group-hover:border-cyan-400/50 transition-all duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/images/placeholder-person.jpg";
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{staff.firstName}</h3>
                  <h4 className="text-base font-semibold text-cyan-300 mb-2">{staff.lastName}</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">{staff.position}</p>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {staffMembers.map((staff, index) => (
                <div key={`mobile-dup-${staff.id}`} className="glass-card p-6 text-center flex-shrink-0 w-72 group transform hover:scale-105 transition-all duration-500">
                  <div className="relative mb-4">
                    <img
                      src={staff.image}
                      alt={`${staff.firstName} ${staff.lastName}`}
                      className="w-24 h-24 rounded-full object-cover mx-auto shadow-xl border-3 border-white/20 group-hover:border-cyan-400/50 transition-all duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/images/placeholder-person.jpg";
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{staff.firstName}</h3>
                  <h4 className="text-base font-semibold text-cyan-300 mb-2">{staff.lastName}</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">{staff.position}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-400 italic">← Scroll to see all team members →</p>
            </div>
          </div>
        </div>
        
        <style>{`
          @keyframes scrollLeft {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          @keyframes scroll-infinite {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-300px * ${staffMembers.length}));
            }
          }
          
          .animate-scroll-infinite {
            animation: scroll-infinite 30s linear infinite;
            width: calc(300px * ${staffMembers.length * 2});
          }
          
          @keyframes float3D {
            0%, 100% {
              transform: translateY(0px) rotateX(0deg) rotateY(0deg);
            }
            50% {
              transform: translateY(-10px) rotateX(5deg) rotateY(5deg);
            }
          }
          
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
          
          .animate-float-3d {
            animation: float3D 6s ease-in-out infinite;
          }
          
          .animate-shimmer {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
          }
        `}</style>
      </section>

      {/* Modern Schedule and Price Section */}
      <section className="py-32 bg-gradient-to-br from-white via-gray-50 to-white text-black relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            id="animate-schedule-title"
            className={`text-center mb-20 transform transition-all duration-1000 ${
              animatedElements.has('animate-schedule-title')
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent uppercase tracking-wide">
              Schedule & Investment
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Schedule Column */}
            <div 
              id="animate-schedule-content"
              className={`transform transition-all duration-1000 delay-300 ${
                animatedElements.has('animate-schedule-content')
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-20 opacity-0'
              }`}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 group-hover:from-blue-100/50 group-hover:to-purple-100/50 transition-all duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent uppercase tracking-wide">
                        Schedule
                      </h2>
                    </div>
                  </div>
                  <p className="text-center text-gray-500 mb-12 italic font-medium">Subject to change - Optimized for peak performance</p>
                  
                  <div className="space-y-6">
                    {[
                      {
                        day: "Day 0",
                        title: "Welcome & Team Introduction",
                        content: "Arrival in Chamonix, welcome drink, meet our coaching & medical staff",
                        color: "from-green-400 to-emerald-500",
                        icon: "🚀"
                      },
                      {
                        day: "Day 1",
                        title: "Discovery & Analysis",
                        morning: "Scenic discovery run",
                        afternoon: "Biomechanical testing with pro podiatrist + recovery session",
                        color: "from-blue-400 to-cyan-500",
                        icon: "🏃"
                      },
                      {
                        day: "Day 2",
                        title: "Performance Testing",
                        morning: "VO₂max testing & performance feedback",
                        afternoon: "Nutrition workshop + conferences",
                        color: "from-purple-400 to-pink-500",
                        icon: "📊"
                      },
                      {
                        day: "Day 3",
                        title: "Training & Recovery",
                        morning: "Fartlek session & partner shoe testing",
                        afternoon: "Physiotherapy & injury prevention workshop",
                        color: "from-orange-400 to-red-500",
                        icon: "⚕️"
                      },
                      {
                        day: "Day 4",
                        title: "UTMB Experience",
                        content: "Long run/hike (20–25 km) on UTMB course with nutrition & gear testing. Post-run data debrief & recovery with cryotherapy",
                        color: "from-teal-400 to-green-500",
                        icon: "🏔️"
                      }
                    ].map((schedule, index) => (
                      <div key={index} className="relative group/item">
                        <div className="flex items-start space-x-6 p-6 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 group-hover/item:shadow-lg group-hover/item:border-gray-200 transition-all duration-300">
                          <div className="flex-shrink-0 relative">
                            <div className={`w-16 h-16 bg-gradient-to-br ${schedule.color} rounded-2xl flex items-center justify-center shadow-lg group-hover/item:scale-110 group-hover/item:rotate-3 transition-all duration-300`}>
                              <span className="text-2xl">{schedule.icon}</span>
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center">
                              <span className="text-xs font-bold text-gray-600">{index + 1}</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <h3 className={`text-xl font-bold bg-gradient-to-r ${schedule.color} bg-clip-text text-transparent`}>
                                {schedule.day}
                              </h3>
                              <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent"></div>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-3">{schedule.title}</h4>
                            {schedule.content && (
                              <p className="text-gray-600 leading-relaxed group-hover/item:text-gray-700 transition-colors duration-300">
                                {schedule.content}
                              </p>
                            )}
                            {schedule.morning && (
                              <div className="space-y-2">
                                <p className="text-gray-600 leading-relaxed">
                                  <span className="font-semibold text-gray-800">Morning:</span> {schedule.morning}
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                  <span className="font-semibold text-gray-800">Afternoon:</span> {schedule.afternoon}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Price Column */}
            <div 
              id="animate-price-content"
              className={`transform transition-all duration-1000 delay-500 ${
                animatedElements.has('animate-price-content')
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-20 opacity-0'
              }`}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50 relative overflow-hidden group h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-teal-50/50 group-hover:from-green-100/50 group-hover:to-teal-100/50 transition-all duration-500"></div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent uppercase tracking-wide">
                        Investment
                      </h2>
                    </div>
                  </div>
                  
                  {/* Package Display */}
                  <div className="text-center mb-8 p-6 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-teal-400/20 animate-pulse"></div>
                    <div className="relative z-10">
                      <div className="text-lg font-medium opacity-90 mb-2">All-Inclusive Premium Package</div>
                      <div className="text-3xl font-black mb-2">4 Nights • 4 Days</div>
                      <div className="text-sm opacity-90">Complete training experience</div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold mb-6 flex items-center text-green-600">
                        <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        INCLUDES:
                      </h3>
                      <div className="grid gap-3">
                        {[
                          "Luxury chalet accommodation", "Gourmet meals by professional chef", "Premium sports nutrition",
                          "Enduraw physiological testing", "Professional biomechanical assessment", "Personalized nutrition evaluation",
                          "Exclusive equipment testing", "Recovery & therapy sessions", "Expert trail workshops",
                          "High-speed Wi-Fi", "Premium linens & amenities", "Daily housekeeping"
                        ].map((item, index) => (
                          <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-green-50 transition-colors duration-200 group/item">
                            <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-teal-400 rounded-full group-hover/item:scale-150 transition-transform duration-200"></div>
                            <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors duration-200">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-xl font-bold mb-4 text-teal-600 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        EXCLUSIVE BONUSES:
                      </h4>
                      <div className="space-y-2">
                        {[
                          "UTMB nutrition masterclass", "Tom Evans' UTMB insights & debrief", "Belgian biathlon team lifestyle deep-dive",
                          "Aiguille du Midi & Chamonix VIP tour"
                        ].map((item, index) => (
                          <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-teal-50 transition-colors duration-200">
                            <div className="w-2 h-2 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"></div>
                            <span className="text-gray-700 text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="text-lg font-bold mb-4 text-red-600 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        NOT INCLUDED:
                      </h4>
                      <div className="space-y-2">
                        {[
                          "Travel to/from Chamonix", "Personal expenses & shopping", "Travel insurance coverage"
                        ].map((item, index) => (
                          <div key={index} className="flex items-center space-x-3 p-2 text-sm text-gray-600">
                            <div className="w-2 h-2 bg-red-300 rounded-full"></div>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-4 italic">
                        * Optional airport shuttle service available upon request
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Availability Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        {/* Modern animated background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            id="animate-availability-title"
            className={`transform transition-all duration-1000 ${
              animatedElements.has('animate-availability-title')
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center uppercase tracking-wide relative">
              <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Availability October 2025
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl animate-pulse"></div>
            </h2>
          </div>
          
          {/* Calendar */}
          <div 
            id="animate-calendar"
            className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8 shadow-2xl transform transition-all duration-1000 ${
              animatedElements.has('animate-calendar')
                ? 'translate-y-0 opacity-100 scale-100'
                : 'translate-y-20 opacity-0 scale-95'
            } relative group overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-500"></div>
            
            <div className="grid grid-cols-7 gap-3 mb-8 relative z-10">
              {/* Days of the week */}
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <div 
                  key={day} 
                  className={`text-center text-sm md:text-base font-bold py-3 px-2 bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl transform transition-all duration-300 hover:scale-105`}
                  style={{ 
                    background: `linear-gradient(135deg, hsl(${index * 50}, 50%, 40%), hsl(${index * 50 + 30}, 50%, 30%))`,
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <span className="text-white font-semibold">{day}</span>
                </div>
              ))}
              
              {/* Calendar days */}
              {[
                // Week 1: Oct 1 starts on Wednesday
                { day: '', status: 'empty' }, // Mon
                { day: '', status: 'empty' }, // Tue
                { day: 1, status: 'closed' }, // Wed
                { day: 2, status: 'closed' }, // Thu
                { day: 3, status: 'available' }, // Fri
                { day: 4, status: 'available' }, // Sat
                { day: 5, status: 'available' }, // Sun
                
                // Week 2: Oct 6-12
                { day: 6, status: 'available' }, // Mon
                { day: 7, status: 'available' }, // Tue
                { day: 8, status: 'closed' }, // Wed
                { day: 9, status: 'available' }, // Thu
                { day: 10, status: 'available' }, // Fri
                { day: 11, status: 'available' }, // Sat
                { day: 12, status: 'available' }, // Sun
                
                // Week 3: Oct 13-19
                { day: 13, status: 'closed' }, // Mon
                { day: 14, status: 'closed' }, // Tue
                { day: 15, status: 'full' }, // Wed - 3rd stage
                { day: 16, status: 'full' }, // Thu - 3rd stage
                { day: 17, status: 'full' }, // Fri - 3rd stage
                { day: 18, status: 'full' }, // Sat - 3rd stage
                { day: 19, status: 'full' }, // Sun - 3rd stage
                
                // Week 4: Oct 20-26
                { day: 20, status: 'full' }, // Mon - 4th stage
                { day: 21, status: 'full' }, // Tue - 4th stage
                { day: 22, status: 'full' }, // Wed - 4th stage
                { day: 23, status: 'full' }, // Thu - 4th stage
                { day: 24, status: 'full' }, // Fri - 4th stage
                { day: 25, status: 'closed' }, // Sat
                { day: 26, status: 'closed' }, // Sun
                
                // Week 5: Oct 27-31
                { day: 27, status: 'closed' }, // Mon
                { day: 28, status: 'closed' }, // Tue
                { day: 29, status: 'closed' }, // Wed
                { day: 30, status: 'closed' }, // Thu
                { day: 31, status: 'closed' }, // Fri
                { day: '', status: 'empty' }, // Sat
                { day: '', status: 'empty' } // Sun
              ].map((date, index) => {
                const getStatusStyle = (status: string) => {
                  switch(status) {
                    case 'available':
                      return 'bg-gradient-to-br from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-green-500/50';
                    case 'full':
                      return 'bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg';
                    case 'closed':
                      return 'bg-gradient-to-br from-gray-500 to-gray-600 text-gray-300 shadow-lg';
                    case 'empty':
                      return 'bg-transparent';
                    default:
                      return 'bg-gray-700 text-gray-400';
                  }
                };
                
                const getHoverEffects = (status: string) => {
                  if (status === 'available') {
                    return 'transform hover:scale-110 hover:rotate-3 hover:z-10';
                  } else if (status === 'full') {
                    return 'transform hover:scale-105 hover:-rotate-1';
                  } else if (status === 'closed') {
                    return 'transform hover:scale-105';
                  }
                  return '';
                };
                
                return (
                  <div
                    key={index}
                    className={`
                      text-center py-4 px-3 rounded-2xl font-bold transition-all duration-300 relative
                      ${date.status !== 'empty' ? 'cursor-pointer' : ''}
                      ${getStatusStyle(date.status)}
                      ${getHoverEffects(date.status)}
                    `}
                    style={{ 
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    {date.day && (
                      <>
                        <span className="relative z-10 text-lg">{date.day}</span>
                        {date.status === 'available' && (
                          <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                        )}
                        {date.status === 'full' && (
                          <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Legend */}
            <div className="flex justify-center gap-8 text-sm md:text-base relative z-10">
              <div className="flex items-center gap-3 group">
                <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg group-hover:scale-110 group-hover:shadow-green-500/50 transition-all duration-300"></div>
                <span className="text-gray-200 group-hover:text-white font-medium transition-colors duration-300">Available</span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl shadow-lg group-hover:scale-110 group-hover:shadow-red-500/50 transition-all duration-300">
                  <div className="w-2 h-2 bg-white rounded-full ml-4 mt-1 animate-pulse"></div>
                </div>
                <span className="text-gray-200 group-hover:text-white font-medium transition-colors duration-300">Full</span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-6 h-6 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl shadow-lg group-hover:scale-110 group-hover:shadow-gray-500/50 transition-all duration-300"></div>
                <span className="text-gray-200 group-hover:text-white font-medium transition-colors duration-300">Closed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photos Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-black uppercase tracking-wide">
            Experience Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img 
                src="/images/workshop/workshop1.jpg" 
                alt="High-Altitude Training" 
                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/placeholder-workshop.jpg";
                }}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-semibold">High-Altitude Training</span>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img 
                src="/images/workshop/workshop2.jpg" 
                alt="Biomechanical Analysis" 
                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/placeholder-workshop.jpg";
                }}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-semibold">Biomechanical Analysis</span>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img 
                src="/images/workshop/workshop3.jpg" 
                alt="Recovery Sessions" 
                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/placeholder-workshop.jpg";
                }}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-semibold">Recovery Sessions</span>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img 
                src="/images/workshop/workshop4.jpg" 
                alt="UTMB Course" 
                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/placeholder-workshop.jpg";
                }}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-semibold">UTMB Course</span>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img 
                src="/images/workshop/workshop5.jpg" 
                alt="Nutrition Workshop" 
                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/placeholder-workshop.jpg";
                }}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-semibold">Nutrition Workshop</span>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img 
                src="/images/workshop/workshop6.jpg" 
                alt="Chamonix Views" 
                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/placeholder-workshop.jpg";
                }}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-semibold">Chamonix Views</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Modern Contact Form Section */}
      <section id="contact-form" className="py-32 fancy-bg relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="bg-orb-1 opacity-30"></div>
          <div className="bg-orb-2 opacity-30"></div>
          <div className="bg-orb-3 opacity-30"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            id="animate-form-section"
            className={`transform transition-all duration-1000 ${
              animatedElements.has('animate-form-section')
                ? 'translate-y-0 opacity-100'
                : 'translate-y-20 opacity-0'
            }`}
          >
            <PerformanceCenterForm 
              onSubmitSuccess={() => {
                // Optional: Add any additional success handling here
                console.log('Training camp request sent successfully!');
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PerformanceCenterPage;
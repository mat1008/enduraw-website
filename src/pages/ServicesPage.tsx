import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/fancy.css';

interface ServicesPageProps {
  activeSection?: string;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ activeSection }) => {
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    if (activeSection && sectionRefs.current[activeSection]) {
      sectionRefs.current[activeSection]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [activeSection]);



  return (
    <div className="fancy-bg text-white relative">
      {/* Animated background orbs */}
      <div className="bg-orb-1"></div>
      <div className="bg-orb-2"></div>
      <div className="bg-orb-3"></div>
      
      {/* Services Grid */}
      <section ref={(el) => { sectionRefs.current['overview'] = el; }} className="pt-32 pb-32 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h1 className="text-6xl font-black mb-12 gradient-text-orange tracking-tight animate-float">
              What Enduraw Services are you looking for?
            </h1>
          </div>
          
          {/* Services Grid with Flip Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                id: 0,
                title: "Enduraw Dashboard",
                description: "Analyze your Strava data with our advanced algorithms and get detailed insights on every run.",
                link: "/services/enduraw-dashboard",
                image: "/images/services/service1.png",
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              },
              {
                id: 1,
                title: "Testing",
                description: "Complete physiological testing protocols to understand your body and optimize your training zones.",
                link: "/services/testing",
                image: "/images/services/service2.png",
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              },
              {
                id: 2,
                title: "Athletes Support",
                description: "Personalized coaching and race strategy support for competitive athletes seeking peak performance.",
                link: "/services/athlete-support",
                image: "/images/services/service3.png",
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              },
              {
                id: 3,
                title: "Enduraw Performance Center",
                description: "Elite training camps in Chamonix with world-class facilities and expert coaching staff.",
                link: "/endurawperformancecenter",
                image: "/images/services/service4.png",
                icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              },
              {
                id: 4,
                title: "Enduraw API",
                description: "Mathematics behind world best performances. Access our scientific models and data-driven intelligence.",
                link: "/services/enduraw-api",
                image: "/images/services/service5.png",
                icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              }
            ].map((service) => (
              <div key={service.id} className="h-80">
                <Link 
                  to={service.link}
                  className="glass-card p-8 text-center border-white/20 hover:border-orange-400/50 hover:scale-105 transition-all duration-300 group h-full flex flex-col justify-center"
                >
                  <div className="mb-6">
                    <div className="icon-container bg-gradient-to-br from-orange-500 to-red-500 mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold gradient-text-orange mb-4">{service.title}</h3>
                    <p className="text-gray-200 leading-relaxed">{service.description}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get in Touch Section */}
      <section className="py-32 bg-gradient-to-br from-slate-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="bg-orb-1"></div>
          <div className="bg-orb-2"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-black mb-12 gradient-text-blue uppercase tracking-wide animate-float">Get in Touch</h2>

          {/* Contact Information */}
          <div className="glass-card p-12 max-w-3xl mx-auto">
            <p className="text-xl text-gray-200 mb-12 leading-relaxed">
              Ready to optimize your performance? Let's discuss how data science can transform your training.
            </p>
            <div className="text-center">
              <Link
                to="/contact"
                className="btn-gradient text-lg px-10 py-4 inline-flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Contact us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ServicesPage;

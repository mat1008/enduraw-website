import React from 'react';
import '../../styles/fancy.css';

const PacingPlanPage: React.FC = () => {
  return (
    <div className="fancy-bg text-white min-h-screen pt-16 relative">
      {/* Animated background orbs */}
      <div className="bg-orb-1"></div>
      <div className="bg-orb-2"></div>
      <div className="bg-orb-3"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-black mb-8 gradient-text-orange uppercase tracking-tight animate-float">
            Pacing Plan
          </h1>
          <h3 className="text-2xl text-gray-200 mb-12 leading-relaxed max-w-2xl mx-auto">
            For the best athletes in the world.<br />Why not you ?
          </h3>
        </div>

        <div className="space-y-12">
          {/* Demo Call to Action */}
          <div className="glass-card p-8 text-center">
            <h2 className="text-3xl font-bold mb-6 gradient-text-purple">Experience the Power</h2>
            <p className="text-gray-200 mb-8 text-lg">
              See how our advanced pacing algorithms can transform your race performance
            </p>
            <a
              href="https://enduraw-report-strava.onrender.com/pacingplan?demo=true"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient inline-flex items-center gap-3 text-lg py-4 px-8"
            >
              <span>Check the pacing plan demo</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          {/* Main Description */}
          <div className="glass-card p-10">
            <div className="space-y-6 text-lg leading-relaxed text-gray-200">
              <p className="text-xl text-orange-300 font-medium">
                Race day is a leap into the unknown! You don't control the weather like you do in training. You don't know the race route and its elevation gain by heart. You're wondering about your nutrition.
              </p>
              
              <div className="text-center py-6">
                <p className="text-2xl font-bold gradient-text-orange">
                  Enduraw is there for you!
                </p>
              </div>
              
              <p>
                Over the past two years, we've developed a unique expertise in working with elite athletes to provide them with the best possible briefing and enable them to optimize their performances. In top-level sport, every second counts, every heartbeat is important. You need to adapt your pace precisely to get the best energy expenditure.
              </p>
            </div>
          </div>

          {/* Get Your Pacing Plan CTA */}
          <div className="glass-card p-8 text-center">
            <h2 className="text-3xl font-bold mb-6 gradient-text-blue">Ready to Optimize Your Performance?</h2>
            <p className="text-gray-200 mb-8 text-lg">
              Whether you want to run a marathon in under 3h30 or finish a trail race. We want to help you reaching your optimum performance.
            </p>
            <a
              href="https://hg1xgb-km.myshopify.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50 inline-flex items-center gap-3 text-lg uppercase tracking-wide"
            >
              <span>Get your personalized Pacing Plan</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </a>
          </div>

          {/* Analysis and Computation */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6 gradient-text-orange">By Analyzing</h3>
              <ul className="space-y-4 text-gray-200">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Your level
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  The course profile (elevation gain/loss)
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Environmental conditions (wind, temperature)
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Your Mechanical drift
                </li>
              </ul>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6 gradient-text-blue">We Compute</h3>
              <ul className="space-y-4 text-gray-200">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Your final time
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Your pacing plan per aid station
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Weather at different aid stations to choose the right equipment
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Your split pace kilometer by kilometer
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Where/when to walk
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Your personalized nutrition plan
                </li>
              </ul>
            </div>
          </div>

          {/* Technology Link */}
          <div className="glass-card p-8 text-center">
            <h3 className="text-2xl font-bold mb-6 gradient-text-purple">Learn More About Our Technology</h3>
            <p className="text-gray-200 mb-8">
              Discover the science and innovation behind our pacing algorithms
            </p>
            <a
              href="https://www.linkedin.com/pulse/petter-engdahls-pacing-strategy-mont-blanc-marathon-joseph-mestrallet/?trackingId=f1aj2RJkQuaMFK%2FBsmgwVA%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 inline-flex items-center gap-3"
            >
              <span>Learn more about the tech</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PacingPlanPage;
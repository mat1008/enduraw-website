import React from 'react';
import '../../styles/fancy.css';

const EndurawAPIPage: React.FC = () => {
  return (
    <div className="fancy-bg text-white min-h-screen pt-16 relative">
      {/* Animated background orbs */}
      <div className="bg-orb-1"></div>
      <div className="bg-orb-2"></div>
      <div className="bg-orb-3"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl animate-float">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-4 gradient-text-blue">
            Enduraw API
          </h1>
          <h2 className="text-2xl md:text-3xl font-light text-gray-200 tracking-wide mb-2">
            Mathematics behind world best performances
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Main content */}
        <div className="glass-card p-12 mb-12">
          <div className="mb-12 text-center">
            <h3 className="text-3xl font-bold mb-6 text-white">
              Data-Driven Enduraw Intelligence
            </h3>
            <p className="text-xl leading-relaxed text-gray-200 max-w-4xl mx-auto">
              From science-based models, Enduraw aims to extract as much information as possible from every data. 
              Validated with elite athletes, our toolbox brings new figures to push performance forward.
            </p>
          </div>

          {/* Mathematical Models */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Weather-Adjusted Time Modeling */}
            <div className="group stat-card transform hover:-translate-y-2">
              <div className="absolute top-4 left-4 w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"></div>
              <h4 className="text-xl font-bold mb-4 text-white flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                Weather-Adjusted Time Modeling
              </h4>
              <div className="formula-box">
                <div className="font-mono text-lg text-center text-blue-300 tracking-wide">
                  t<sub className="text-sm text-cyan-300">adjusted</sub> = t<sub className="text-sm text-cyan-300">raw</sub> + 
                  Δt<sub className="text-sm text-cyan-300">wind</sub> + 
                  Δt<sub className="text-sm text-cyan-300">temp</sub> + 
                  Δt<sub className="text-sm text-cyan-300">altitude</sub> + 
                  Δt<sub className="text-sm text-cyan-300">elevation</sub>
                </div>
              </div>
              <p className="text-gray-200 leading-relaxed">
                Quantify and correct the impact of weather and elevation on time-trial performance.
              </p>
            </div>

            {/* Physiological Profiling */}
            <div className="group stat-card transform hover:-translate-y-2">
              <div className="absolute top-4 left-4 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
              <h4 className="text-xl font-bold mb-4 text-white flex items-center gap-3">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Physiological Profiling
              </h4>
              <div className="formula-box">
                <div className="font-mono text-lg text-center text-green-300 tracking-wide">
                  Profile<sub className="text-sm text-emerald-300">athlete</sub> = f(strava<sub className="text-sm text-emerald-300">account</sub>)
                </div>
              </div>
              <p className="text-gray-200 leading-relaxed">
                Leverage years of data to map physiological strengths and personalize training.
              </p>
            </div>

            {/* Equipment & Morphometric Impact */}
            <div className="group stat-card transform hover:-translate-y-2">
              <div className="absolute top-4 left-4 w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
              <h4 className="text-xl font-bold mb-4 text-white flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Equipment & Morphometric Impact
              </h4>
              <div className="formula-box">
                <div className="font-mono text-lg text-center text-blue-300 tracking-wide">
                  Δt<sub className="text-sm text-purple-300">wind</sub> = f(height, weight, GPX<sub className="text-sm text-purple-300">route</sub>, wind<sub className="text-sm text-purple-300">vector</sub>)
                </div>
              </div>
              <p className="text-gray-200 leading-relaxed">
                Measure time impact based on athlete morphology and course specifics.
              </p>
            </div>

            {/* Performance Discrepancy */}
            <div className="group stat-card transform hover:-translate-y-2">
              <div className="absolute top-4 left-4 w-3 h-3 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full animate-pulse"></div>
              <h4 className="text-xl font-bold mb-4 text-white flex items-center gap-3">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Performance Discrepancy Estimation
              </h4>
              <div className="formula-box">
                <div className="font-mono text-lg text-center text-purple-300 tracking-wide">
                  δ<sub className="text-sm text-violet-300">perf</sub> = f(temperature, humidity, previous<sub className="text-sm text-violet-300">best</sub>)
                </div>
              </div>
              <p className="text-gray-200 leading-relaxed">
                Explain or predict performance gaps under extreme weather conditions.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold mb-6 text-white">
              Interested in our mathematical models?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="btn-gradient inline-flex items-center gap-3 text-lg font-semibold py-4 px-8 rounded-xl"
              >
                <span>Contact Us</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </a>
              <a
                href="/services"
                className="glass-card border-white/20 hover:border-white/40 text-gray-200 hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 inline-flex items-center gap-3 text-lg"
              >
                <span>Explore Our Services</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-4 gradient-text-blue">
              Scientific Validation
            </h3>
            <p className="text-gray-200 leading-relaxed mb-4">
              Our mathematical models are validated with elite athletes and real-world performance data. 
              Each formula is backed by extensive research and proven results in competitive environments.
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>• Tested with Olympic-level athletes</li>
              <li>• Validated across multiple sports disciplines</li>
              <li>• Continuous model refinement based on feedback</li>
              <li>• Published research and peer review</li>
            </ul>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-4 gradient-text-purple">
              Technical Integration
            </h3>
            <p className="text-gray-200 leading-relaxed mb-4">
              Our API provides seamless integration with existing training platforms and data sources. 
              Access real-time calculations and historical analysis through our robust infrastructure.
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>• RESTful API endpoints</li>
              <li>• Real-time data processing</li>
              <li>• Secure authentication protocols</li>
              <li>• Comprehensive documentation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndurawAPIPage;
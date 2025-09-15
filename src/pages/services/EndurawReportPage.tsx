import React from 'react';

const EndurawReportPage: React.FC = () => {
  return (
    <div className="bg-dark-bg text-white min-h-screen pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 uppercase tracking-wide">
          Enduraw Report
        </h1>
        
        <div className="space-y-8">
          <div className="bg-dark-secondary p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-accent">Comprehensive Performance Analytics</h2>
            <div className="space-y-6 text-lg text-gray-200">
              <p>
                The Enduraw Report provides in-depth analysis of your training and performance data,
                offering actionable insights to optimize your athletic development.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Data Integration</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Training load analysis</li>
                    <li>• Performance trends</li>
                    <li>• Physiological markers</li>
                    <li>• Environmental factors</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Insights & Recommendations</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Performance predictions</li>
                    <li>• Training adjustments</li>
                    <li>• Recovery optimization</li>
                    <li>• Goal setting guidance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white text-black p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Report Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="bg-accent text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="font-semibold mb-2">Data Visualization</h3>
                <p className="text-sm text-gray-700">Clear charts and graphs showing your performance trends</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-accent text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-semibold mb-2">Actionable Insights</h3>
                <p className="text-sm text-gray-700">Specific recommendations for training optimization</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-accent text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="font-semibold mb-2">Progress Tracking</h3>
                <p className="text-sm text-gray-700">Monitor improvements and identify areas for focus</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-accent to-accent-light p-8 rounded-lg text-white">
            <h2 className="text-2xl font-bold mb-6">Sample Report Sections</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Training Load Analysis</h3>
                <p className="text-sm opacity-90 mb-4">
                  Comprehensive breakdown of your training stress, volume, and intensity patterns
                  with recommendations for load management.
                </p>
                <ul className="text-sm opacity-80 space-y-1">
                  <li>• Weekly/monthly load trends</li>
                  <li>• Training stress balance</li>
                  <li>• Recovery recommendations</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Performance Predictions</h3>
                <p className="text-sm opacity-90 mb-4">
                  Data-driven predictions for upcoming races and events based on your current
                  fitness and training trajectory.
                </p>
                <ul className="text-sm opacity-80 space-y-1">
                  <li>• Race time predictions</li>
                  <li>• Confidence intervals</li>
                  <li>• Scenario planning</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndurawReportPage;
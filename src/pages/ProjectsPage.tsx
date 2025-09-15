import React from 'react';

const ProjectsPage: React.FC = () => {
  // Projects data matching the original website structure
  const projects = [
    {
      icon: "🔬",
      title: "Performance Science & Data Analyst",
      description: "Leading sports science research and data-driven performance optimization for elite endurance athletes.",
      details: "Specializing in physiological testing, training periodization, and race strategy development using advanced analytics and machine learning techniques."
    },
    {
      icon: "🏃",
      title: "Elite Athlete Coaching",
      description: "Direct coaching and performance consulting for world-class endurance athletes including Tom Evans and Ruth Croft.",
      details: "Providing personalized training plans, race strategies, and performance analysis for Olympic and World Championship level competitors."
    },
    {
      icon: "📊",
      title: "Enduraw Data Science",
      description: "Founder and lead data scientist at Enduraw, developing advanced analytics tools for endurance sports performance.",
      details: "Creating proprietary algorithms for training load management, performance prediction, and injury risk assessment."
    },
    {
      icon: "🏆",
      title: "Research & Publications",
      description: "Contributing to sports science research with publications in peer-reviewed journals and presentations at international conferences.",
      details: "Focus on endurance performance optimization, data-driven training methodologies, and physiological adaptation mechanisms."
    },
    {
      icon: "🎯",
      title: "Strava Integration Services",
      description: "Automated performance tracking and analysis platform for endurance athletes.",
      details: "Real-time data processing, trend analysis, and personalized insights delivered through seamless Strava integration."
    },
    {
      icon: "📈",
      title: "Physiological Testing Laboratory",
      description: "State-of-the-art testing facility for comprehensive performance assessment.",
      details: "VO2 max testing, lactate threshold analysis, running economy assessment, and detailed performance profiling."
    },
    {
      icon: "🌍",
      title: "International Consulting",
      description: "Performance consulting for athletes and organizations worldwide.",
      details: "Remote coaching, data analysis, and strategic planning for endurance athletes across all disciplines and competition levels."
    },
    {
      icon: "🔄",
      title: "Training Periodization Systems",
      description: "Advanced periodization models based on individual athlete responses and adaptation patterns.",
      details: "Personalized training cycles optimized through continuous monitoring and data-driven adjustments."
    },
    {
      icon: "⚡",
      title: "Race Strategy Development",
      description: "Data-driven race planning and tactical recommendations for competitive events.",
      details: "Course analysis, weather conditions, competitor profiling, and real-time strategic adjustments."
    },
    {
      icon: "🧠",
      title: "Machine Learning Applications",
      description: "Applying artificial intelligence to endurance sports performance optimization.",
      details: "Predictive modeling, pattern recognition, and automated coaching recommendations using cutting-edge ML techniques."
    }
  ];

  return (
    <div className="bg-dark-bg text-white min-h-screen pt-16">
      {/* Hero Section */}
      <section
        className="py-20 relative font-sans"
        style={{
          backgroundImage: "url('/images/IMG_6074-fi35655370x2000.JPG')",
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundColor: 'rgba(255, 255, 255, 0)'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-26"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white uppercase tracking-wide font-sans">
            Main Projects & Experience
          </h1>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            A comprehensive overview of Joseph Mestrallet's professional work in performance science and data analytics
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="flex items-start space-x-6 p-8 bg-white text-black rounded-lg shadow-sm hover:shadow-md transition-shadow"
                style={{
                  backgroundImage: index % 3 === 1 ? "url('/images/IMG_6074-fi35655370x2000.JPG')" : "none",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  backgroundColor: index % 3 === 1 ? 'rgba(0, 0, 0, 0)' : 'white'
                }}
              >
                {index % 3 === 1 && <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>}

                <div className={`w-24 h-24 rounded-lg flex-shrink-0 flex items-center justify-center relative z-10 ${index % 3 === 1 ? 'bg-white bg-opacity-20' : 'bg-gray-200'
                  }`}>
                  <span className="text-3xl">{project.icon}</span>
                </div>

                <div className={`flex-1 relative z-10 ${index % 3 === 1 ? 'text-white' : 'text-black'}`}>
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className={`text-lg mb-4 ${index % 3 === 1 ? 'text-gray-100' : 'text-gray-700'}`}>
                    {project.description}
                  </p>
                  <p className={`text-sm ${index % 3 === 1 ? 'text-gray-200' : 'text-gray-600'}`}>
                    {project.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Optimize Your Performance?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss how these projects and expertise can benefit your athletic goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/services"
              className="bg-accent hover:bg-accent-light text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Explore Services
            </a>
            <a
              href="mailto:joseph@enduraw.com"
              className="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;

import React from 'react';
import '../styles/fancy.css';

const NewsPage: React.FC = () => {
  const latestContent = [
    {
      title: "What makes Paris 2024 a race to records",
      url: "https://worldathletics.org/waendurancemedicine/news/what-makes-paris-2024-a-race-to-records",
      source: "World Athletics",
      description: "Analysis of the performance factors behind the record-breaking performances at Paris 2024 Olympics."
    },
    {
      title: "Trail Running Classement Trimestre 1 Teams Trail 2025",
      url: "https://distances.plus/athletes/trail-running-classement-trimestre-1-teams-trail-2025/",
      source: "Distances Plus",
      description: "First quarter rankings for trail running teams in 2025 season."
    },
    {
      title: "Mathieu Blanchard Athlete Highlight",
      url: "https://www.instagram.com/p/DD7UHw6tQec/?img_index=1",
      source: "Instagram",
      description: "Mathieu Blanchard Performance"
    }
  ];

  return (
    <div className="fancy-bg text-white min-h-screen pt-16 relative">
      {/* Animated background orbs */}
      <div className="bg-orb-1"></div>
      <div className="bg-orb-2"></div>
      <div className="bg-orb-3"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-black mb-8 gradient-text-purple uppercase tracking-tight animate-float">
            Enduraw Media
          </h1>
          <div className="glass-card p-8 max-w-3xl mx-auto">
            <p className="text-xl text-gray-200 leading-relaxed">
              Make data accessible and bring lisibility to our sports
            </p>
          </div>
        </div>

        {/* Instagram Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-12 gradient-text-orange animate-float-slow">Follow Our Latest Posts</h2>
          <div className="glass-card p-10">
            <div className="icon-container bg-gradient-to-br from-pink-500 to-purple-500 mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed text-center">
              Stay updated with our latest performance analyses, athlete insights, and research findings on Instagram.
            </p>
            <div className="text-center">
              <a
                href="https://www.instagram.com/enduraw.data/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient text-lg py-4 px-8 inline-flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C8.396 0 7.989.013 7.041.048 6.094.082 5.452.204 4.896.388a7.233 7.233 0 00-2.62 1.99A7.233 7.233 0 00.388 4.896C.204 5.452.082 6.094.048 7.041.013 7.989 0 8.396 0 12.017c0 3.624.013 4.09.048 5.016.034.947.156 1.589.34 2.145a7.233 7.233 0 001.99 2.62 7.233 7.233 0 002.62 1.99c.556.184 1.198.306 2.145.34.926.035 1.392.048 5.016.048 3.624 0 4.09-.013 5.016-.048.947-.034 1.589-.156 2.145-.34a7.233 7.233 0 002.62-1.99 7.233 7.233 0 001.99-2.62c.184-.556.306-1.198.34-2.145.035-.926.048-1.392.048-5.016 0-3.624-.013-4.09-.048-5.016-.034-.947-.156-1.589-.34-2.145a7.233 7.233 0 00-1.99-2.62A7.233 7.233 0 0019.061.388c-.556-.184-1.198-.306-2.145-.34C15.99.013 15.624 0 12.017 0zM12.017 2.156c3.557 0 3.98.013 5.386.048.866.04 1.337.184 1.65.305.415.161.712.353 1.023.664.311.311.503.608.664 1.023.121.313.265.784.305 1.65.035 1.406.048 1.829.048 5.386 0 3.557-.013 3.98-.048 5.386-.04.866-.184 1.337-.305 1.65-.161.415-.353.712-.664 1.023a2.75 2.75 0 01-1.023.664c-.313.121-.784.265-1.65.305-1.406.035-1.829.048-5.386.048-3.557 0-3.98-.013-5.386-.048-.866-.04-1.337-.184-1.65-.305a2.75 2.75 0 01-1.023-.664 2.75 2.75 0 01-.664-1.023c-.121-.313-.265-.784-.305-1.65-.035-1.406-.048-1.829-.048-5.386 0-3.557.013-3.98.048-5.386.04-.866.184-1.337.305-1.65.161-.415.353-.712.664-1.023a2.75 2.75 0 011.023-.664c.313-.121.784-.265 1.65-.305 1.406-.035 1.829-.048 5.386-.048z"/>
                  <path d="M12.017 5.838a6.18 6.18 0 100 12.359 6.18 6.18 0 000-12.36zM12.017 16a4 4 0 110-8 4 4 0 010 8zM18.408 4.155a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
                </svg>
                <span>Follow @enduraw.data</span>
              </a>
            </div>
          </div>
        </section>

        {/* Dashboard Activities */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-12 gradient-text-blue animate-float">Dashboard Activities</h2>
          <div className="stat-card max-w-4xl mx-auto">
            <div className="icon-container bg-gradient-to-br from-cyan-500 to-blue-500 mx-auto mb-6">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-6 gradient-text-orange text-center">Recent Analyses</h3>
            <ul className="space-y-4 text-gray-200">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                <span>2000 athlete performance reports generated each days</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                <span>+3k active users</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                <span>200 pacing plans generated</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                <span>Runner matrix and testing report coming soon</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Latest Content */}
        <section>
          <h2 className="text-4xl font-bold mb-12 gradient-text-purple animate-float-slow">Latest Content</h2>
          <div className="space-y-8">
            {latestContent.map((item, index) => (
              <div key={index} className="glass-card p-8 hover:scale-105 transition-all duration-300 group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4 gradient-text-orange group-hover:gradient-text-purple transition-all">{item.title}</h3>
                    <p className="text-gray-200 mb-4 text-lg leading-relaxed">{item.description}</p>
                    <span className="inline-flex items-center gap-2 text-blue-400 font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      {item.source}
                    </span>
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gradient py-3 px-6 inline-flex items-center gap-3 whitespace-nowrap"
                  >
                    <span>Read More</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewsPage;
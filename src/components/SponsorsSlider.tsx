import React from 'react';

const SponsorsSlider: React.FC = () => {
  const sponsors = [
    { id: 1, image: '/images/sponsors/sponsor1.png', name: 'Sponsor 1' },
    { id: 2, image: '/images/sponsors/sponsor2.png', name: 'Sponsor 2' },
    { id: 3, image: '/images/sponsors/sponsor3.png', name: 'Sponsor 3' },
    { id: 4, image: '/images/sponsors/sponsor4.png', name: 'Sponsor 4' },
    { id: 5, image: '/images/sponsors/sponsor5.png', name: 'Sponsor 5' },
    { id: 6, image: '/images/sponsors/sponsor6.png', name: 'Sponsor 6' },
    { id: 7, image: '/images/sponsors/sponsor7.png', name: 'Sponsor 7' },
    { id: 8, image: '/images/sponsors/sponsor8.png', name: 'Sponsor 8' },
    { id: 9, image: '/images/sponsors/sponsor9.png', name: 'Sponsor 9' },
    { id: 10, image: '/images/sponsors/sponsor10.png', name: 'Sponsor 10' },
  ];

  const scrollAnimation = {
    animation: 'scrollLeft 30s linear infinite',
    width: 'calc(200%)',
  };

  return (
    <div className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-black uppercase tracking-wide">
          They trusted us
        </h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex" style={scrollAnimation}>
              {/* First set of logos */}
              {sponsors.map((sponsor) => (
                <div
                  key={sponsor.id}
                  className="flex-shrink-0 mx-8 w-32 h-16 flex items-center justify-center bg-white rounded-lg shadow-sm"
                >
                  <img
                    src={sponsor.image}
                    alt={sponsor.name}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `<span class="text-gray-500 text-sm font-medium">${sponsor.name}</span>`;
                    }}
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {sponsors.map((sponsor) => (
                <div
                  key={`duplicate-${sponsor.id}`}
                  className="flex-shrink-0 mx-8 w-32 h-16 flex items-center justify-center bg-white rounded-lg shadow-sm"
                >
                  <img
                    src={sponsor.image}
                    alt={sponsor.name}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `<span class="text-gray-500 text-sm font-medium">${sponsor.name}</span>`;
                    }}
                  />
                </div>
              ))}
            </div>
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
      `}</style>
    </div>
  );
};

export default SponsorsSlider;
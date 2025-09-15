import React, { useState } from 'react';
import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

// Temporary type shim for React 19 compatibility with react-icons
const InstagramIcon = FaInstagram as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const TwitterIcon = FaTwitter as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const LinkedinIcon = FaLinkedin as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

const Footer: React.FC = () => {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  
  return (
    <footer className="bg-dark-bg text-white pt-16 pb-16 border-t border-white/20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Contact Information */}
        <div className="mb-12 text-white space-y-4" style={{ fontFamily: 'Montserrat' }}>
          <div className="transform hover:scale-105 transition-all duration-300 inline-block group">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500"></div>
              <div className="relative z-10 space-y-3">
                <p className="text-lg md:text-xl font-medium bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  330 route du plagnolet | 74400 Chamonix | France
                </p>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
              <div className="absolute bottom-2 left-2 w-6 h-6 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex justify-center space-x-8 mb-12">
          <a
            href="https://www.instagram.com/enduraw.data/"
            className="relative group"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            onMouseEnter={() => setHoveredSocial('instagram')}
            onMouseLeave={() => setHoveredSocial(null)}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 p-0.5 transform transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-2xl hover:shadow-pink-500/50 group">
              <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center group-hover:bg-gray-50 transition-colors duration-300 relative overflow-hidden">
                <InstagramIcon className="w-8 h-8 text-pink-500 group-hover:text-purple-500 transition-colors duration-300 relative z-10" />
                {hoveredSocial === 'instagram' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 animate-pulse"></div>
                )}
              </div>
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-pink-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Instagram
            </div>
          </a>
          
          <a
            href="https://twitter.com/EndurawData"
            className="relative group"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            onMouseEnter={() => setHoveredSocial('twitter')}
            onMouseLeave={() => setHoveredSocial(null)}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 p-0.5 transform transition-all duration-300 hover:scale-110 hover:-rotate-12 hover:shadow-2xl hover:shadow-blue-500/50 group">
              <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center group-hover:bg-gray-50 transition-colors duration-300 relative overflow-hidden">
                <TwitterIcon className="w-7 h-7 text-blue-500 group-hover:text-cyan-500 transition-colors duration-300 relative z-10" />
                {hoveredSocial === 'twitter' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 animate-pulse"></div>
                )}
              </div>
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Twitter
            </div>
          </a>
          
          <a
            href="https://fr.linkedin.com/company/enduraw"
            className="relative group"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            onMouseEnter={() => setHoveredSocial('linkedin')}
            onMouseLeave={() => setHoveredSocial(null)}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-0.5 transform transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-2xl hover:shadow-blue-600/50 group">
              <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center group-hover:bg-gray-50 transition-colors duration-300 relative overflow-hidden">
                <LinkedinIcon className="w-7 h-7 text-blue-600 group-hover:text-blue-800 transition-colors duration-300 relative z-10" />
                {hoveredSocial === 'linkedin' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-800/20 animate-pulse"></div>
                )}
              </div>
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              LinkedIn
            </div>
          </a>
        </div>

        {/* Copyright at bottom */}
        <div className="mt-8 relative">
          <div className="inline-block group">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden group-hover:scale-105 transform">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-400/10 group-hover:from-gray-500/20 group-hover:to-gray-400/20 transition-all duration-500"></div>
              <p className="text-sm font-medium bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent relative z-10" style={{ fontFamily: 'Montserrat' }}>
                © Enduraw 2025
              </p>
              {/* Floating sparkles */}
              <div className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
              <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

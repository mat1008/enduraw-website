import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, imageUrl, link = "#" }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-video overflow-hidden">
        <img 
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-700 mb-4 text-sm leading-relaxed">{description}</p>
        <a 
          href={link}
          className="inline-flex items-center text-accent hover:text-accent-light font-medium text-sm transition-colors"
        >
          Read more...
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
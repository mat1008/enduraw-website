import React from 'react';

interface PersonCardProps {
  fullName: string;
  country: string; // e.g. "France 🇫🇷"
  job?: string; // e.g. "Software Engineer"; optional for athletes
  age?: number | string; // e.g. 29 -> "29 yo"
  sports?: string; // e.g. "Trail, Ultra Trail"
  achievements?: string; // free text, bullets or separated by •
  credentials?: string; // e.g. "X - Cambridge"
  imageUrl?: string;
  imageAlt?: string;
  className?: string;
  variant?: 'default' | 'athlete';
}

const PersonCard: React.FC<PersonCardProps> = ({
  fullName,
  country,
  job,
  age,
  sports,
  achievements,
  credentials,
  imageUrl,
  imageAlt,
  className = '',
  variant = 'default',
}) => {
  if (variant === 'athlete') {
    return (
      <div className={`bg-dark-secondary rounded-lg p-4 max-w-sm mx-auto ${className}`}>
        <h4 className="text-lg font-semibold mb-3">{fullName}</h4>
        <div className="grid grid-cols-2 gap-3 items-start">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={imageAlt || fullName}
              className="w-full h-36 sm:h-40 object-cover rounded-md"
              loading="lazy"
            />
          )}
          <div className="text-sm">
            <p className="text-gray-400 mb-1">
              {age ? `${age} yo • ${country}` : country}
            </p>
            {sports && <p className="text-gray-300 mb-1">{sports}</p>}
            {credentials && <p className="text-gray-400 mb-1">{credentials}</p>}
            {job && <p className="text-gray-300 mb-1">{job}</p>}
            {achievements && (
              <p className="text-gray-200 mt-2 leading-snug">{achievements}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-dark-secondary rounded-lg p-6 ${className}`}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={imageAlt || fullName}
          className="w-16 h-16 rounded-full object-cover mb-4"
          loading="lazy"
        />
      )}
      <h4 className="text-xl font-semibold">{fullName}</h4>
      <p className="text-gray-400">
        {age ? `${age} yo • ${country}` : country}
      </p>
      {credentials && <p className="text-gray-400">{credentials}</p>}
      {sports && <p className="text-gray-300">{sports}</p>}
      {job && <p className="text-gray-300">{job}</p>}
      {achievements && (
        <p className="text-gray-200 mt-2 text-sm">{achievements}</p>
      )}
    </div>
  );
};

export default PersonCard;

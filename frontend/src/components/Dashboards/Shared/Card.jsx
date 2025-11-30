import React from 'react';

const Card = ({ title, value, icon: Icon, colorClass = 'text-indigo-400', children, className="" }) => {
  return (
    <div className={`p-5 bg-gray-900 rounded-xl shadow-lg border border-gray-800 ${className}`}>
      {/* 1. If Title or Icon is provided, show the Header row */}
      <div className="flex items-center justify-between">
        {title && (
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
            {title}
          </h3>
        )}
        {Icon && <Icon className={`h-6 w-6 ${colorClass}`} />}
      </div>

      {/* 2. If Value is provided, show the Big Number */}
      {value !== undefined && (
        <p className="mt-1 text-3xl font-bold text-white">
          {value}
        </p>
      )}

      {/* 3. Render any extra content (like the "New Message" button) */}
      {children}
    </div>
  );
};

export default Card;
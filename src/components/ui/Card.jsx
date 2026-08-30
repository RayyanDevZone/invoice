import React from 'react';

const Card = ({ children, className = '' }) => (
  <div
    className={`w-full rounded-2xl border border-gray-200 bg-white shadow-sm font-google-sans ${className}`}
  >
    {children}
  </div>
);

export default Card;

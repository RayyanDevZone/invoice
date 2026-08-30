import React from 'react';

const StepHeader = ({ eyebrow, title, description, action }) => (
  <div className="flex items-start justify-between gap-4 mb-6">
    <div>
      {eyebrow && (
        <p className="text-xs font-bold tracking-wider uppercase text-brand-dark mb-1">
          {eyebrow}
        </p>
      )}
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
    </div>
    {action}
  </div>
);

export default StepHeader;

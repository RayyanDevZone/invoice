import React from 'react';

const baseInput =
  'w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 text-sm font-semibold placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:border-brand-dark focus:ring-2 focus:ring-brand/30 transition-shadow';

const Wrapper = ({ label, hint, prefix, suffix, className = '', children }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {label && (
      <label className="text-sm font-medium text-gray-600">{label}</label>
    )}
    {prefix || suffix ? (
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">
            {prefix}
          </span>
        )}
        {children}
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">
            {suffix}
          </span>
        )}
      </div>
    ) : (
      children
    )}
    {hint && <p className="text-xs text-gray-400">{hint}</p>}
  </div>
);

export const TextField = ({ label, hint, className, prefix, suffix, inputClassName = '', ...props }) => (
  <Wrapper label={label} hint={hint} className={className} prefix={prefix} suffix={suffix}>
    <input
      className={`${baseInput} ${prefix ? 'pl-7' : ''} ${suffix ? 'pr-10' : ''} ${inputClassName}`}
      {...props}
    />
  </Wrapper>
);

export const TextAreaField = ({ label, hint, className, inputClassName = '', ...props }) => (
  <Wrapper label={label} hint={hint} className={className}>
    <textarea className={`${baseInput} resize-none ${inputClassName}`} {...props} />
  </Wrapper>
);

const Field = { TextField, TextAreaField };
export default Field;

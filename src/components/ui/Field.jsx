import React, { useState } from 'react';
import { LuEye, LuEyeOff } from 'react-icons/lu';

const baseInput =
  'w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 text-sm font-semibold placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:border-brand-dark focus:ring-2 focus:ring-brand/30 transition-shadow';

const errorInput = '!border-red-500 focus:!ring-red-200';

const Wrapper = ({ label, hint, error, prefix, suffix, className = '', children }) => (
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
    {error ? (
      <p className="text-xs font-medium text-red-600">{error}</p>
    ) : (
      hint && <p className="text-xs text-gray-400">{hint}</p>
    )}
  </div>
);

export const TextField = React.forwardRef(({ label, hint, error, className, prefix, suffix, inputClassName = '', ...props }, ref) => (
  <Wrapper label={label} hint={hint} error={error} className={className} prefix={prefix} suffix={suffix}>
    <input
      ref={ref}
      className={`${baseInput} ${prefix ? 'pl-7' : ''} ${suffix ? 'pr-10' : ''} ${error ? errorInput : ''} ${inputClassName}`}
      aria-invalid={error ? true : undefined}
      {...props}
    />
  </Wrapper>
));

TextField.displayName = 'TextField';

export const TextAreaField = ({ label, hint, className, inputClassName = '', ...props }) => (
  <Wrapper label={label} hint={hint} className={className}>
    <textarea className={`${baseInput} resize-none ${inputClassName}`} {...props} />
  </Wrapper>
);

export const PasswordField = ({ label, hint, className, inputClassName = '', ...props }) => {
  const [visible, setVisible] = useState(false);
  const Icon = visible ? LuEyeOff : LuEye;

  return (
    <Wrapper label={label} hint={hint} className={className}>
      <div className="relative">
        <input
          className={`${baseInput} pr-11 ${inputClassName}`}
          {...props}
          type={visible ? 'text' : 'password'}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          title={visible ? 'Hide password' : 'Show password'}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
        >
          <Icon className="text-base" />
        </button>
      </div>
    </Wrapper>
  );
};

const Field = { TextField, TextAreaField, PasswordField };
export default Field;

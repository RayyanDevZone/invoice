import React from 'react';

const variants = {
  primary:
    'bg-brand hover:bg-brand/85 text-gray-900 shadow-sm disabled:bg-gray-100 disabled:text-gray-400',
  secondary:
    'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 disabled:text-gray-300',
  ghost:
    'bg-transparent hover:bg-gray-100 text-gray-600 disabled:text-gray-300',
};

const Button = ({
  children,
  variant = 'primary',
  icon: Icon,
  iconPosition = 'right',
  className = '',
  ...props
}) => (
  <button
    className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm px-6 py-2.5 transition-colors disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    {...props}
  >
    {Icon && iconPosition === 'left' && <Icon className="text-base shrink-0" />}
    {children}
    {Icon && iconPosition === 'right' && <Icon className="text-base shrink-0" />}
  </button>
);

export default Button;

import React from 'react';

const Button = ({ children, onClick, className, disabled }) => {
  return (
    <button
      className={`flex justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${
        disabled
          ? 'bg-gray-500 cursor-not-allowed'
          : 'bg-black hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500'
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

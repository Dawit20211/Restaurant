import React from 'react'

const Button = ({ children, onClick, className }) => {
  return (
<button
      className={`flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${className}`}
      onClick={onClick}
      
    >
      {children}
    </button>  )
}

export default Button
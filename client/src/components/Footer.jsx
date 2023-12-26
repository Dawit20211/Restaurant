import React from 'react'

const Footer = () => {

  const currentYear = new Date().getFullYear()

  return (
    <div className='text-center'>{currentYear} Crave </div>
  )
}

export default Footer
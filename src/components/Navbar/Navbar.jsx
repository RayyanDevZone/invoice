import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/icon.svg';

const Navbar = () => {
  return (
    <header className='w-full h-16 shrink-0 bg-white text-gray-900 flex flex-row items-center justify-between border-b border-gray-200 px-6 sm:px-8'>
      <Link to='/' className='flex items-center gap-2.5 group'>
        <img src={logo} alt='BillEase' className='h-8 w-8 shrink-0 transition-opacity group-hover:opacity-85' />
        <h1 className='text-lg font-bold font-google-sans tracking-tight'>BillEase</h1>
      </Link>
      <p className='hidden sm:block text-xs font-medium text-gray-400'>Invoice generator</p>
    </header>
  )
}

export default Navbar

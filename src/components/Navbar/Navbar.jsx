import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import logo from '../../images/icon.svg';

const Navbar = () => {
  return (
    <header className='w-full h-16 shrink-0 bg-white text-gray-900 flex flex-row items-center justify-between border-b border-gray-200 px-6 sm:px-8'>
      <Link to='/' className='flex items-center gap-2.5 group'>
        <img src={logo} alt='BillEase' className='h-8 w-8 shrink-0 transition-opacity group-hover:opacity-85' />
        <h1 className='text-lg font-bold font-google-sans tracking-tight'>BillEase</h1>
      </Link>
      <NavLink
        to='/profile'
        aria-label='Profile'
        title='Profile'
        className={({ isActive }) =>
          `h-9 w-9 flex items-center justify-center rounded-full border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 ${isActive ? 'bg-gray-200 text-gray-900 border-gray-300' : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200 hover:text-gray-900'}`
        }
      >
        <FiUser className='h-[18px] w-[18px]' />
      </NavLink>
    </header>
  )
}

export default Navbar

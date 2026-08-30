import React from 'react';
import { Link } from 'react-router-dom';
import { LuReceipt } from 'react-icons/lu';

const Navbar = () => {
  return (
    <header className='w-full h-16 shrink-0 bg-white text-gray-900 flex flex-row items-center justify-between border-b border-gray-200 px-6 sm:px-8'>
      <Link to='/' className='flex items-center gap-2.5 group'>
        <span className='h-8 w-8 rounded-lg bg-brand flex items-center justify-center shrink-0 group-hover:bg-brand/85 transition-colors'>
          <LuReceipt className='text-gray-900 text-base' />
        </span>
        <h1 className='text-lg font-bold font-google-sans tracking-tight'>BillEase</h1>
      </Link>
      <p className='hidden sm:block text-xs font-medium text-gray-400'>Invoice generator</p>
    </header>
  )
}

export default Navbar

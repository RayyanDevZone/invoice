import React from 'react'
import Invoice from '../Invoice/Invoice'
import { FiDownload } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
const InvoiceContainer = () => {
  return (
    <div className='min-h-screen w-full flex flex-col items-center'>
      <Invoice/>
      <div className='h-[200px] w-[500px] bg-[#020817] flex flex-row items-center justify-around rounded-xl mt-5 border-[#1E293B] border font-lexend'>
    
    
    
      <button className='bg-[#020817] text-white border border-[#1E293B] px-2 py-1 w-[180px] rounded-md flex flex-row items-center justify-evenly'>NEW INVOICE <FaPlus /></button>
      <button className='bg-white text-[#020817] px-2 py-1 w-[180px] rounded-md flex flex-row items-center justify-evenly'>DOWNLOAD <FiDownload className=' text-md font-bold' /></button>

      </div>
    </div>
  )
}

export default InvoiceContainer

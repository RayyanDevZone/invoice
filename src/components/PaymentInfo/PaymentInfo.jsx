import React from 'react'
import { useNavigate } from "react-router-dom";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

const PaymentInfo = () => {
  const navigate = useNavigate();
  return (
    <div className='h-screen w-full rounded-t-xl box-border py-5 px-4  text-white flex flex-col bg-[#020817]  items-left'>
    
      <h1 className='text-white text-2xl font-semibold font-raleway'> Payment Information:</h1>
     <div className='flex flex-row w-[70%] items-center justify-around'> <div className="flex flex-col items-left gap-2 mt-3">
            <label
              htmlFor="item-name"
              className="text-sm font-poppins font-bold text-white w-20"
            >
              Bank Name:
            </label>
            <input
              type="text"
              id="bank-name"
              placeholder="Bank name"
              required
              className="bg-[#020817] border border-[#1E293B]  rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-64  placeholder:font-montserrat"
            />
          </div>
          <div className="flex flex-col items-left gap-2 mt-3">
            <label
              htmlFor="item-name"
              className="text-sm font-poppins font-bold text-white w-28"
            >
              Account Name:
            </label>
            <input
              type="text"
              id="account-name"
              placeholder="Account name"
              required
              className="bg-[#020817] border border-[#1E293B]  rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-64  placeholder:font-montserrat"
            />
          </div>
          <div className="flex flex-col items-left gap-2 mt-3">
            <label
              htmlFor="item-name"
              className="text-sm font-poppins font-bold text-white w-36"
            >
              Account Number:
            </label>
            <input
              type="number"
              id="accountNumber"
              placeholder="Account Number"
              required
              className="bg-[#020817] border border-[#1E293B]  rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-64  placeholder:font-montserrat"
            />
          </div></div>
          <div className="flex flex-row w-auto justify-end ">
      <button
          type="button"
          onClick={() => navigate("/itemsLine")}
          className="bg-white hover:bg-zinc-200 mt-12 w-36 flex justify-around items-center text-[#020817] font-bold py-2 px-4 rounded"
        >
          <GrFormPreviousLink className="text-2xl"/> Back 
        </button>
        {" "}
        <button
          type="button"
          onClick={() => navigate("/summary")}
          className="bg-white hover:bg-zinc-200 mt-12 w-36 mx-4 flex justify-around items-center text-[#020817] font-bold py-2 px-4 rounded"
        >
          Next <GrFormNextLink className="text-2xl" />
        </button>
      </div>
    </div>
  )
}

export default PaymentInfo
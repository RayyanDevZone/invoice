import React from "react";
import { FaPlus } from "react-icons/fa";
const PersonalInfo = () => {
  return (
    <div className="h-screen w-full rounded-t-xl box-border py-5 px-4 border border-red-300 text-white flex flex-row bg-[#020817] justify-between items-center">
      <div className="border border-red-300 w-[50%] h-full box-border py-4 px-3">
        <h3 className="text-white font-bold text-xl font-poppins">Bill From:</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <label htmlFor="name" className="text-sm font-poppins font-bold text-white w-20">Name :</label>
            <input 
              type="text"
              id="name"
              placeholder="Your name"
              required
              className="bg-[#020817] border border-gray-600 rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-60 font-poppins placeholder:font-poppins"
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="address" className="text-sm font-poppins font-bold text-white w-20">Address :</label>
            <input 
              type="text"
              id="address"
              placeholder="Your address"
              required
              className="bg-[#020817] border border-gray-600 rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-60  placeholder:font-poppins"
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="zip" className="text-sm font-poppins font-bold text-white w-20">Zip Code :</label>
            <input 
              type="text"
              id="zip"
              placeholder="Your zipcode"
              required
              className="bg-[#020817] border border-gray-600 rounded p-2 text-[#6A9CB8] text-sm font-semibold focus:outline-none focus:border-blue-500 w-60  placeholder:font-poppins"
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="city" className="text-sm font-poppins font-bold text-white w-20">City :</label>
            <input 
              type="text"
              id="city"
              placeholder="Your city"
              required
              className="bg-[#020817] border border-gray-600 rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-60  placeholder:font-poppins"
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="country" className="text-sm font-poppins font-bold text-white w-20">Country :</label>
            <input 
              type="text"
              id="country"
              placeholder="Your country"
              required
              className="bg-[#020817] border border-gray-600 rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-60  placeholder:font-poppins"
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="email" className="text-sm font-poppins font-bold text-white w-20">Email :</label>
            <input 
              type="email"
              id="email"
              placeholder="Your email"
              required
              className="bg-[#020817] border border-gray-600 rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-60  placeholder:font-poppins"
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="phone" className="text-sm font-poppins font-bold text-white w-20">Phone :</label>
            <input 
              type="tel"
              id="phone"
              placeholder="Your Phone Number"
              required
              className="bg-[#020817] border border-gray-600 rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-60  placeholder:font-poppins"
            />
          </div>
          
        </div>
        <button className="font-poppins font-semibold text-white flex w-40 h-6 items-center justify-between"><FaPlus/> Add custom input</button>
      </div>
      <div className="border border-red-300 w-[50%] h-full">
      <div className="border border-red-300  h-full box-border py-4 px-3">
        <h3 className="text-white font-bold text-xl font-poppins">Bill To:</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <label htmlFor="name" className="text-sm font-poppins font-bold text-white w-20">Name :</label>
            <input 
              type="text"
              id="name"
              placeholder="Reciever name"
              required
              className="bg-[#020817] border border-gray-600 rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-60 font-poppins placeholder:font-poppins"
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="address" className="text-sm font-poppins font-bold text-white w-20">Address :</label>
            <input 
              type="text"
              id="address"
              placeholder="Reciever address"
              required
              className="bg-[#020817] border border-gray-600 rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-60  placeholder:font-poppins"
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="zip" className="text-sm font-poppins font-bold text-white w-20">Zip Code :</label>
            <input 
              type="text"
              id="zip"
              placeholder="Reciever zipcode"
              required
              className="bg-[#020817] border border-gray-600 rounded p-2 text-[#6A9CB8] text-sm font-semibold focus:outline-none focus:border-blue-500 w-60  placeholder:font-poppins"
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="city" className="text-sm font-poppins font-bold text-white w-20">City :</label>
            <input 
              type="text"
              id="city"
              placeholder="Reciever city"
              required
              className="bg-[#020817] border border-gray-600 rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-60  placeholder:font-poppins"
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="country" className="text-sm font-poppins font-bold text-white w-20">Country :</label>
            <input 
              type="text"
              id="country"
              placeholder="Reciever country"
              required
              className="bg-[#020817] border border-gray-600 rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-60  placeholder:font-poppins"
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="email" className="text-sm font-poppins font-bold text-white w-20">Email :</label>
            <input 
              type="email"
              id="email"
              placeholder="Reciever email"
              required
              className="bg-[#020817] border border-gray-600 rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-60  placeholder:font-poppins"
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="phone" className="text-sm font-poppins font-bold text-white w-20">Phone :</label>
            <input 
              type="tel"
              id="phone"
              placeholder="Reciever Phone Number"
              required
              className="bg-[#020817] border border-gray-600 rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-60  placeholder:font-poppins"
            />
          </div>
          <button className="font-poppins font-semibold text-white flex w-40 h-6 items-center justify-between"><FaPlus/> Add custom input</button>
        </div>
      </div>
      </div>

    </div>
  );
};

export default PersonalInfo;

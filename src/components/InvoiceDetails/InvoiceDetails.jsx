import React from "react";
import { LuImagePlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
const InvoiceDetails = () => {
  const navigate = useNavigate();
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => this.setState({ image: e.target.result });
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="h-screen w-full rounded-t-xl box-border py-5 px-4 border border-red-300 text-white flex flex-col bg-[#020817]  items-left">
      <h1 className="font-semibold text-white text-2xl"> Invoice Details:</h1>
      <p className="text-white font-medium font-poppins  mt-8">Invoice Logo:</p>
      <div className="relative flex items-left justify-left">
        <input
          id="logo-upload"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleImageUpload}
        />
        <label
          htmlFor="file-upload"
          className="h-[7rem] w-[10rem] rounded-lg border border-white text-sm font-bold bg-slate-800 mt-8 flex flex-col items-center justify-center cursor-pointer"
        >
         <LuImagePlus className='text-2xl'/>
          Click to upload image
        </label>
      </div>
      <div className="flex items-center gap-4 mt-8">
            <label htmlFor="invoiceNumber" className="text-sm font-poppins font-bold text-white w-28">Invoice Number:</label>
            <input 
              type="number"
              id="invoice"
              placeholder="Invoice number"
              required
              className="bg-[#020817] border border-gray-600 rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-60  placeholder:font-poppins"
            />
          </div>
          <div className="flex flex-row w-auto justify-end ">
      <button
          type="button"
          onClick={() => navigate("/personal-info")}
          className="bg-white hover:bg-zinc-200 mt-12 w-36 flex justify-around items-center text-[#020817] font-bold py-2 px-4 rounded"
        >
          <GrFormPreviousLink className="text-2xl"/> Back 
        </button>
        {" "}
        <button
          type="button"
          onClick={() => navigate("/itemsLine")}
          className="bg-white hover:bg-zinc-200 mt-12 w-36 mx-4 flex justify-around items-center text-[#020817] font-bold py-2 px-4 rounded"
        >
          Next <GrFormNextLink className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default InvoiceDetails;

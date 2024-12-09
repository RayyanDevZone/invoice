import React from "react";

const Invoice = () => {
  return (
    <div className=" h-[1200px] w-[800px] bg-slate-100 rounded-md text-black box-content py-4 px-3 ">
      <div className="logoAndAddress w-full h-[250px] border border-red-400 flex flex-row items-center justify-between ">
        <div className="logo h-[150px] border-red-400 w-[50%] flex justify-center items-start px-6 flex-col">
          <img src="https://via.placeholder.com/200" alt="Logo" />
          <h1 className="text-xl font-bold text-blue-600 font-poppins">Company Name</h1>
        </div>
        <div className="address w-[50%] h-[100%] flex items-end justify-evenly flex-col px-6">
          <div className="invoiceAndNumber flex flex-col items-end justify-center">
            <h1 className="text-3xl font-bold font-poppins text-gray-800">
              Invoice
            </h1>
            <h1 className="text-xl text-gray-500 font-semibold">#12345</h1>
          </div>
          <div className="address flex flex-col items-end text-gray-700 text-[18px] font-semibold font-poppins justify-center">
            <p >123 Main St,  </p> 
            <p> sender City,Zip.</p>
            <p> sender Country</p>
          </div>
        </div>
      </div>
      <div className="RecieverAddressDate w-full h-[200px] border border-red-400 flex flex-row items-center justify-between px-6 ">
        <div className="BillTo w-[50%] h-full border border-red-600">
            <h1 className="text-2xl font-bold text-gray-800 font-poppins ">Bill to:</h1>
            <p className="text-xl font-bold text-gray-800">Reciever Name</p>
            <p className="text-gray-600 font-semibold" >123 Main St,  </p> 
            <p className="text-gray-600 font-semibold"> Reciever City,Zip.</p>
            <p className="text-gray-600 font-semibold"> Reciever Country</p>
        </div>
        <div className="invoiceDate w-[50%] h-full border border-red-600 flex flex-col justify-start items-end">
            <div className=" flex flex-row w-auto mt-6"><h1 className="text-l font-bold text-gray-800 font-poppins ">Invoice Date: </h1><p className="text-gray-500 font-semibold px-3">December 5,2024</p></div>
            <div className=" flex flex-row w-auto"><h1 className="text-l font-bold text-gray-800 font-poppins ">Due Date: </h1><p className="text-gray-500 font-semibold px-3">December 9,2024</p></div>
          
        </div>
      </div>
    </div>
  );
};

export default Invoice;

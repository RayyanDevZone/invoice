import React from "react";

const Invoice = () => {
  return (
    <div className="h-[1200px] w-[800px] bg-slate-100 rounded-md text-black box-content py-4 px-3 font-lexend">
      <div className="logoAndAddress w-full h-[250px] flex flex-row items-center justify-between">
        <div className="logo h-[150px] w-[50%] flex justify-center items-start px-6 flex-col">
          <img src="https://via.placeholder.com/200" alt="Logo" />
          <h1 className="text-xl font-bold text-blue-600">Company Name</h1>
        </div>
        <div className="address w-[50%] h-[100%] flex items-end justify-evenly flex-col px-6">
          <div className="invoiceAndNumber flex flex-col items-end justify-center">
            <h1 className="text-3xl font-bold font-poppins text-gray-800">Invoice</h1>
            <h1 className="text-xl text-gray-500 font-semibold">#12345</h1>
          </div>
          <div className="address flex flex-col items-end text-gray-700 text-[18px] font-semibold font-poppins justify-center">
            <p>123 Main St,</p>
            <p>sender City, Zip.</p>
            <p>sender Country</p>
          </div>
        </div>
      </div>
      <div className="RecieverAddressDate w-full h-[200px] flex flex-row items-center justify-between px-6">
        <div className="BillTo w-[50%] h-full">
          <h1 className="text-2xl font-bold text-gray-800 font-poppins">Bill to:</h1>
          <p className="text-xl font-bold text-gray-800">Receiver Name</p>
          <p className="text-gray-600 font-semibold">123 Main St,</p>
          <p className="text-gray-600 font-semibold">Receiver City, Zip.</p>
          <p className="text-gray-600 font-semibold">Receiver Country</p>
        </div>
        <div className="invoiceDate w-[50%] h-full flex flex-col justify-start items-end">
          <div className="flex flex-row w-auto mt-6">
            <h1 className="text-l font-bold text-gray-800 font-poppins">Invoice Date:</h1>
            <p className="text-gray-500 font-semibold px-3">December 5, 2024</p>
          </div>
          <div className="flex flex-row w-auto">
            <h1 className="text-l font-bold text-gray-800 font-poppins">Due Date:</h1>
            <p className="text-gray-500 font-semibold px-3">December 9, 2024</p>
          </div>
        </div>
      </div>
      <div className="itemsTable w-full h-auto min-h-16 flex flex-col border border-gray-400 rounded-md mt-6">
        <table className="w-full table-auto border-collapse font-poppins text-gray-800 font-semibold font-lexend">
          <thead>
            <tr className="bg-gray-200 border-b border-gray-500">
              <th className="text-gray-700 font-bold p-1 text-center">Items</th>
              <th className="text-gray-700 font-bold p-1 text-center">Qty</th>
              <th className="text-gray-700 font-bold p-1 text-center">Rate</th>
              <th className="text-gray-700 font-bold p-1 text-center">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-500">
              <td className="p-1 text-center">Item 1</td>
              <td className="p-1 text-center">2</td>
              <td className="p-1 text-center">500 INR</td>
              <td className="p-1 text-center">1000 INR</td>
            </tr>
            <tr className="border-b border-gray-500">
              <td className="p-1 text-center">Item 2</td>
              <td className="p-1 text-center">3</td>
              <td className="p-1 text-center">600 INR</td>
              <td className="p-1 text-center">1800 INR</td>
            </tr>
            <tr className="border-b border-gray-500">
              <td className="p-1 text-center">Item 3</td>
              <td className="p-1 text-center">1</td>
              <td className="p-1 text-center">700 INR</td>
              <td className="p-1 text-center">700 INR</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="total&subtotal h-[150px]  w-full flex flex-col justify-center items-end font-lexend">
        <div className="subtotal border flex items-center justify-center h-[33%] min-w-64 w-auto">
          <p className="font-bold text-gray-800">Subtotal:</p>
        </div>
        <div className="total border flex items-center justify-center h-[33%] min-w-64 w-auto">
          <p className="font-bold text-gray-800">Total:</p>
        </div>
        <div className="totalInWords flex items-center justify-center h-[33%] min-w-64 w-auto">
          <p className="font-bold text-gray-800">Total in words:</p>
        </div>
      </div>
      <div className="additionalNotes w-full mt-3 px-6">
        <h2 className=" font-bold text-blue-600">Additional Notes:</h2>
        <p className="mt-2">{/* User's additional notes will be displayed here */}</p>
      </div>
      <div className="paymentTerms w-full mt-3 px-6">
        <h2 className=" font-bold text-blue-600">Payment Terms:</h2>
        <p className="mt-2">{/* User's payment terms will be displayed here */}</p>
      </div>
      <div className="accountDetails h-36 w-full px-6 ">
      <p className="font-bold  text-gray-800 ">Please send the payment to these details:</p>
      <p className="font-semibold text-sm text-gray-800 ">Bank:</p>
      <p className="font-semibold text-sm text-gray-800 ">Account Name:</p>
      <p className="font-semibold text-sm text-gray-800 ">Account Number:</p>

      </div>
    </div>
  );
};

export default Invoice;

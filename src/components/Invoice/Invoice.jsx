import React, { useContext } from "react";
import { InvoiceContext } from "../../InvoiceContext"; // Import the context

const Invoice = () => {
  const { invoiceData } = useContext(InvoiceContext);

  const formatDate = (date) => {
    if (!date) return '';
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const calculateSubtotal = () => {
    return invoiceData.items.reduce((total, item) => total + item.total, 0);
  };

  return (
    <div className="relative h-[1200px] w-[800px] bg-slate-100 rounded-md text-black box-content py-4 px-3 font-lexend">
      <div className="logoAndAddress w-full h-[250px] flex flex-row items-center justify-between">
        <div className="logo h-[150px] w-[50%] flex overflow-hidden object-cover bg-center justify-center items-start px-6 flex-col">
          {invoiceData.logo && <img src={invoiceData.logo} alt="Logo" />}
          <h1 className="text-xl font-bold text-blue-600">{invoiceData.sender.name || "Company Name"}</h1>
        </div>
        <div className="address w-[50%] h-[100%] flex items-end justify-evenly flex-col px-6">
          <div className="invoiceAndNumber flex flex-col items-end justify-center">
            <h1 className="text-3xl font-bold font-poppins text-gray-800">Invoice</h1>
            <h1 className="text-xl text-gray-500 font-semibold">#{invoiceData.invoiceNumber}</h1>
          </div>
          <div className="address flex flex-col items-end text-gray-700 text-[18px] font-semibold font-poppins justify-center">
            <p>{invoiceData.sender.address}</p>
            <p>{invoiceData.sender.city}, {invoiceData.sender.zip}</p>
            <p>{invoiceData.sender.country}</p>
          </div>
        </div>
      </div>
      <div className="RecieverAddressDate w-full h-[200px] flex flex-row items-center justify-between px-6">
        <div className="BillTo w-[50%] h-full">
          <h1 className="text-2xl font-bold text-gray-800 font-poppins">Bill to:</h1>
          <p className="text-xl font-bold text-gray-800">{invoiceData.receiver.name}</p>
          <p className="text-gray-600 font-semibold">{invoiceData.receiver.address}</p>
          <p className="text-gray-600 font-semibold">{invoiceData.receiver.city}, {invoiceData.receiver.zip}</p>
          <p className="text-gray-600 font-semibold">{invoiceData.receiver.country}</p>
        </div>
        <div className="invoiceDate w-[50%] h-full flex flex-col justify-start items-end">
          <div className="flex flex-row w-auto mt-6">
            <h1 className="text-l font-bold text-gray-800 font-poppins">Invoice Date:</h1>
            <p className="text-gray-500 font-semibold px-3">{formatDate(invoiceData.issueDate)}</p>
          </div>
          <div className="flex flex-row w-auto">
            <h1 className="text-l font-bold text-gray-800 font-poppins">Due Date:</h1>
            <p className="text-gray-500 font-semibold px-3">{formatDate(invoiceData.dueDate)}</p>
          </div>
        </div>
      </div>
      <div className="itemsTable w-full h-auto min-h-16 flex flex-col border border-gray-400 rounded-md mt-6">
        <table className="w-full table-auto border-collapse font-poppins text-gray-800 font-semibold font-lexend">
          <thead>
            <tr className="bg-gray-200 border-b border-gray-500">
              <th className="text-gray-700 font-bold p-1 text-center">Items</th>
              <th className="text-gray-700 font-bold p-1 text-center">HSN Code</th>
              <th className="text-gray-700 font-bold p-1 text-center">Rate</th>
              <th className="text-gray-700 font-bold p-1 text-center">Qty</th>
              <th className="text-gray-700 font-bold p-1 text-center">Discount</th>
              <th className="text-gray-700 font-bold p-1 text-center">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index} className="border-b border-gray-500">
                <td className="p-1 text-center">{item.itemName}</td>
                <td className="p-1 text-center">{item.hsn}</td>
                <td className="p-1 text-center">{item.rate} INR</td>
                <td className="p-1 text-center">{item.quantity}</td>
                <td className="p-1 text-center">{item.discount || 0}%</td>
                <td className="p-1 text-center">{item.total.toFixed(2)} INR</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="total&subtotal h-[150px] w-full flex flex-col justify-center items-end font-lexend">
        <div className="subtotal border flex items-center justify-center h-[33%] min-w-64 w-auto">
          <p className="font-bold text-gray-800">Subtotal: {calculateSubtotal().toFixed(2)} INR</p>
        </div>
        <div className="total border flex items-center justify-center h-[33%] min-w-64 w-auto">
          <p className="font-bold text-gray-800">Total:</p>
        </div>
        <div className="totalInWords flex items-center justify-center h-[33%] min-w-64 w-auto">
          <p className="font-bold text-gray-800">Total in words:</p>
        </div>
      </div>
      <div className="additionalNotes w-full mt-3 px-6">
        <h2 className="font-bold text-blue-600">Additional Notes:</h2>
        <p className="mt-2">{invoiceData.additionalNotes}</p>
      </div>
      <div className="paymentTerms w-full mt-3 px-6">
        <h2 className="font-bold text-blue-600">Payment Terms:</h2>
        <p className="mt-2">{invoiceData.paymentTerms}</p>
      </div>
      <div className="accountDetails h-36 w-full px-6 mt-6">
        <p className="font-bold text-gray-800">Please send the payment to these details:</p>
        <p className="font-semibold text-sm text-gray-800">Bank Name: {invoiceData.paymentInfo?.bankName}</p>
        <p className="font-semibold text-sm text-gray-800">Account Name: {invoiceData.paymentInfo?.accountName}</p>
        <p className="font-semibold text-sm text-gray-800">Account Number: {invoiceData.paymentInfo?.accountNumber}</p>
        <p className="font-semibold text-sm text-gray-800">IFSC Code: {invoiceData.paymentInfo?.ifscCode}</p>
        <p className="font-semibold text-sm text-gray-800">Bank Address: {invoiceData.paymentInfo?.bankAddress}</p>
      </div>
      <div className="contactDetails h-auto w-full px-6">
        <p className="text-gray-600">If you have any questions concerning this invoice, use the following contact information:</p>
        <p className="text-gray-600">Phone: {invoiceData.sender.phone}</p>
        <p className="text-gray-600">Email: {invoiceData.sender.email}</p>
      </div>
      <div className="contactDetails h-auto w-full px-6 mt-6 flex justify-end items-end self-end absolute bottom-0 mb-4">
        <p className="text-blue-600">Made using: BillEase</p>
      </div>
    </div>
  );
};

export default Invoice;

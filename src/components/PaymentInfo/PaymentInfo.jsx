import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { InvoiceContext } from "../../InvoiceContext"; // Import the context

const PaymentInfo = () => {
  const navigate = useNavigate();
  const { invoiceData, setInvoiceData } = useContext(InvoiceContext);

  const handleInputChange = (e) => {
    setInvoiceData({
      ...invoiceData,
      paymentInfo: {
        ...invoiceData.paymentInfo,
        [e.target.name]: e.target.value
      }
    });
  };

  return (
    <div className="h-screen w-full rounded-t-xl box-border py-5 px-4 text-white flex flex-col bg-[#020817] items-left font-lexend">
      <h1 className="text-white text-2xl font-semibold">Payment Information:</h1>
      <div className="flex flex-row w-[70%] items-center justify-around">
        <div className="flex flex-col items-left gap-2 mt-3">
          <label htmlFor="bank-name" className="text-sm font-bold text-white w-28">Bank Name:</label>
          <input
            type="text"
            id="bank-name"
            name="bankName"
            placeholder="Bank name"
            required
            value={invoiceData.paymentInfo?.bankName || ''}
            onChange={handleInputChange}
            className="bg-[#020817] border border-[#1E293B] rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-64"
          />
        </div>
        <div className="flex flex-col items-left gap-2 mt-3">
          <label htmlFor="account-name" className="text-sm font-bold text-white w-28">Account Name:</label>
          <input
            type="text"
            id="account-name"
            name="accountName"
            placeholder="Account name"
            required
            value={invoiceData.paymentInfo?.accountName || ''}
            onChange={handleInputChange}
            className="bg-[#020817] border border-[#1E293B] rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-64"
          />
        </div>
        <div className="flex flex-col items-left gap-2 mt-3">
          <label htmlFor="accountNumber" className="text-sm font-bold text-white w-36">Account Number:</label>
          <input
            type="number"
            id="accountNumber"
            name="accountNumber"
            placeholder="Account Number"
            required
            value={invoiceData.paymentInfo?.accountNumber || ''}
            onChange={handleInputChange}
            className="bg-[#020817] border border-[#1E293B] rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-64"
          />
        </div>
      </div>
      <div className="flex flex-row w-auto justify-end">
        <button
          type="button"
          onClick={() => navigate("/itemsLine")}
          className="bg-white hover:bg-zinc-200 mt-12 w-36 flex justify-around items-center text-[#020817] font-bold py-2 px-4 rounded"
        >
          <GrFormPreviousLink className="text-2xl" /> Back
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
  );
};

export default PaymentInfo;

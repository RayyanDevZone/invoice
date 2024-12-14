import React, { useContext, useState } from "react";
import DiscountField from "../DiscountField/DiscountField";
import TaxField from "../TaxField/TaxField";
import ShippingField from "../ShippingField/ShippingField";
import { useNavigate } from "react-router-dom";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { InvoiceContext } from "../../InvoiceContext"; // Import the context

const Summary = () => {
  const navigate = useNavigate();
  const { invoiceData, setInvoiceData } = useContext(InvoiceContext);
  const [isDiscountEnabled, setIsDiscountEnabled] = useState(false);
  const [isTaxEnabled, setIsTaxEnabled] = useState(false);
  const [isShippingEnabled, setIsShippingEnabled] = useState(false);

  const handleNotesChange = (e) => {
    setInvoiceData({ ...invoiceData, additionalNotes: e.target.value });
  };

  const handlePaymentTermsChange = (e) => {
    setInvoiceData({ ...invoiceData, paymentTerms: e.target.value });
  };

  const handleDiscountChange = (value) => {
    setInvoiceData({ ...invoiceData, discount: value });
  };

  const handleTaxChange = (value) => {
    setInvoiceData({ ...invoiceData, tax: value });
  };

  const handleShippingChange = (value) => {
    setInvoiceData({ ...invoiceData, shipping: value });
  };

  const handleInvoiceNameChange = (e) => {
    setInvoiceData({ ...invoiceData, invoiceName: e.target.value });
  };

  return (
    <div className="min-h-screen h-auto w-full rounded-t-xl box-border py-5 px-4 text-white flex flex-col bg-[#020817] items-left font-lexend">
      <div className="toggles my-4">
        <label>
          <input
            type="checkbox"
            checked={isDiscountEnabled}
            onChange={() => setIsDiscountEnabled(!isDiscountEnabled)}
          />{" "}
          Discount 
        </label>{" "}
        <label>
          <input
            type="checkbox"
            checked={isTaxEnabled}
            onChange={() => setIsTaxEnabled(!isTaxEnabled)}
          />{" "}
          Tax
        </label>{" "}
        <label>
          <input
            type="checkbox"
            checked={isShippingEnabled}
            onChange={() => setIsShippingEnabled(!isShippingEnabled)}
          />{" "}
          Shipping
        </label>
      </div>
      <div className="fields">
         {isDiscountEnabled && <DiscountField value={invoiceData.discount} onChange={handleDiscountChange} />}
          {isTaxEnabled && <TaxField value={invoiceData.tax} onChange={handleTaxChange} />} 
          {isShippingEnabled && <ShippingField value={invoiceData.shipping} onChange={handleShippingChange} />} 
      </div>
      <div className="flex flex-col">
        <label htmlFor="invoiceName">Invoice Name:</label>
        <input
          type="text"
          id="invoiceName"
          placeholder="Invoice Name"
          value={invoiceData.invoiceName || ''}
          onChange={handleInvoiceNameChange}
          className="bg-[#020817] border border-[#1E293B] rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-80"
        />
      </div>
      <div>
        <div className="flex flex-col mt-4">
          <label>Additional notes:</label>
          <textarea
            rows="4"
            cols="50"
            placeholder="Your additional notes here"
            value={invoiceData.additionalNotes}
            onChange={handleNotesChange}
            className="bg-[#020817] border border-[#1E293B] rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-80"
          ></textarea>
        </div>
        <div className="flex flex-col mt-4">
          <label>Payment terms:</label>
          <textarea
            rows="4"
            cols="50"
            placeholder="Ex: Credit time period"
            value={invoiceData.paymentTerms}
            onChange={handlePaymentTermsChange}
            className="bg-[#020817] border border-[#1E293B] rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-80"
          ></textarea>
        </div>
      </div>
      <div className="flex flex-row w-auto justify-end">
        <button
          type="button"
          onClick={() => navigate("/paymentInfo")}
          className="bg-white hover:bg-zinc-200 mt-12 w-36 flex justify-around items-center text-[#020817] font-bold py-2 px-4 rounded"
        >
          <GrFormPreviousLink className="text-2xl" /> Back
        </button>
        <button
          type="button"
          onClick={() => navigate("/invoice")}
          className="bg-white hover:bg-zinc-200 mt-12 w-36 mx-4 flex justify-around items-center text-[#020817] font-bold py-2 px-4 rounded"
        >
          Generate <GrFormNextLink className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Summary;

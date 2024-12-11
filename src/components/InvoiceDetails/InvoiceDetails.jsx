import React, { useContext, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { InvoiceContext } from "../../InvoiceContext"; // Import the context

const InvoiceDetails = () => {
  const navigate = useNavigate();
  const { invoiceData, setInvoiceData } = useContext(InvoiceContext);
  const [issueDate, setIssueDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);

  const handleInputChange = (e) => {
    setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, name) => {
    const formattedDate = date ? date.toISOString().substring(0, 10) : null;
    setInvoiceData({ ...invoiceData, [name]: formattedDate });
    name === "issueDate" ? setIssueDate(date) : setDueDate(date);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInvoiceData({ ...invoiceData, logo: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-screen w-full rounded-t-xl box-border py-5 px-4 text-white flex flex-col bg-[#020817] items-left font-lexend ">
      <h1 className="font-semibold text-white text-2xl">Invoice Details:</h1>
      <p className="text-white font-medium mt-8">Invoice Logo:</p>
      <div className="relative flex items-left justify-left">
        <input
          id="logo-upload"
          className="absolute inset-0 w-[10rem] h-full opacity-0 cursor-pointer"
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleImageUpload}
        />
        <label
          htmlFor="logo-upload"
          className="h-[7rem] w-[10rem] rounded-lg border border-white text-sm font-bold bg-slate-800 mt-8 flex flex-col items-center justify-center cursor-pointer"
        >
          <LuImagePlus className="text-2xl" />
          Click to upload image
        </label>
      </div>
      <div className="flex items-center gap-4 mt-8">
        <label htmlFor="invoiceNumber" className="text-sm font-bold text-white w-34">Invoice Number:</label>
        <input
          type="number"
          id="invoiceNumber"
          name="invoiceNumber"
          placeholder="Invoice number"
          required
          value={invoiceData.invoiceNumber}
          onChange={handleInputChange}
          className="bg-[#020817] border border-gray-600 rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-60"
        />
      </div>
      <div className="flex items-center gap-4 mt-8">
        <label htmlFor="issueDate" className="text-sm font-bold text-white w-28">Issue Date:</label>
        <DatePicker
          id="issueDate"
          selected={issueDate}
          onChange={(date) => handleDateChange(date, "issueDate")}
          className="bg-[#020817] border border-gray-600 rounded p-2 text-white text-sm font-semibold focus:outline-none cursor-pointer focus:border-blue-500 w-60"
          placeholderText="Pick issue date"
        />
      </div>
      <div className="flex items-center gap-4 mt-8">
        <label htmlFor="dueDate" className="text-sm font-bold text-white w-28">Due Date:</label>
        <DatePicker
          id="dueDate"
          selected={dueDate}
          onChange={(date) => handleDateChange(date, "dueDate")}
          className="bg-[#020817] border border-gray-600 rounded p-2 text-white text-sm font-semibold focus:outline-none cursor-pointer focus:border-blue-500 w-60"
          placeholderText="Pick due date"
        />
      </div>
      <div className="flex flex-row w-auto justify-end">
        <button
          type="button"
          onClick={() => navigate("/personal-info")}
          className="bg-white hover:bg-zinc-200 mt-12 w-36 flex justify-around items-center text-[#020817] font-bold py-2 px-4 rounded"
        >
          <GrFormPreviousLink className="text-2xl" /> Back
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

import React from "react";
import { LuImagePlus } from "react-icons/lu";
import DiscountField from "../DiscountField/DiscountField";
import TaxField from "../TaxField/TaxField";
import { useState } from "react";
import ShippingField from "../ShippingField/ShippingField";
import { useNavigate } from "react-router-dom";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
const Summary = () => {
  const navigate = useNavigate();
  const [isDiscountEnabled, setIsDiscountEnabled] = useState(false);
  const [isTaxEnabled, setIsTaxEnabled] = useState(false);
  const [isShippingEnabled, setIsShippingEnabled] = useState(false);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => this.setState({ image: e.target.result });
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="min-h-screen h-auto w-full rounded-t-xl box-border py-5 px-4  text-white flex flex-col bg-[#020817]  items-left">
      <div>
        <p className="text-white font-medium font-poppins  mt-8">Signature:</p>
        <div className="relative flex items-left justify-left mb-5">
          <input
            id="signature-upload"
            className="absolute inset-0 w-[15rem] h-full opacity-0 cursor-pointer"
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleImageUpload}
          />
          <label
            htmlFor="file-upload"
            className="h-[7rem] w-[15rem] rounded-lg border border-white text-sm font-bold bg-slate-800 mt-8 flex flex-col items-center justify-center cursor-pointer"
          >
            <LuImagePlus className="text-2xl" />
            Click to add Signature
          </label>
        </div>
      </div>
      <div className="toggles">
        {" "}
        <label>
          {" "}
          <input
            type="checkbox"
            checked={isDiscountEnabled}
            onChange={() => setIsDiscountEnabled(!isDiscountEnabled)}
          />{" "}
          Discount{" "}
        </label>{" "}
        <label>
          {" "}
          <input
            type="checkbox"
            checked={isTaxEnabled}
            onChange={() => setIsTaxEnabled(!isTaxEnabled)}
          />{" "}
          Tax{" "}
        </label>{" "}
        <label>
          {" "}
          <input
            type="checkbox"
            checked={isShippingEnabled}
            onChange={() => setIsShippingEnabled(!isShippingEnabled)}
          />{" "}
          Shipping{" "}
        </label>{" "}
      </div>{" "}
      <div className="fields">
        {" "}
        {isDiscountEnabled && <DiscountField />} {isTaxEnabled && <TaxField />}{" "}
        {isShippingEnabled && <ShippingField />}{" "}
      </div>
      <div>
        <div className="flex flex-col">
          <label>Additional notes:</label>
          <textarea
            rows="4"
            cols="50"
            placeholder="Your additional notes here"
            className="bg-[#020817] border border-[#1E293B] rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-80  placeholder:font-montserrat"
          ></textarea>
        </div>
        <div className="flex flex-col mt-4">
          <label>Payment terms:</label>
          <textarea
            rows="4"
            cols="50"
            placeholder="Ex: Credit time period"
            className="bg-[#020817] border border-[#1E293B]  rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-80  placeholder:font-raleway"
          ></textarea>
        </div>
      </div>
      <div className="flex flex-row w-auto justify-end ">
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
          Next <GrFormNextLink className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Summary;

import React from "react";
import { LuImagePlus } from "react-icons/lu";
import DiscountField from "../DiscountField/DiscountField";
import TaxField from "../TaxField/TaxField";
import { useState } from "react";
import ShippingField from "../ShippingField/ShippingField";
const Summary = () => {
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
      <h1> this is summary PAGE</h1>
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
    </div>
  );
};

export default Summary;

// components/DiscountField.jsx
import React from "react";

const DiscountField = () => {
  return (
    <div className="field my-4">
      <label>Discount:</label>
      <input type="number" name="discount" placeholder="Enter discount"
      className="bg-[#020817] border border-[#1E293B] mx-2 rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-48  placeholder:font-montserrat"  />
    </div>
  );
};

export default DiscountField;

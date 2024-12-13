    // components/ShippingField.jsx
import React from 'react';

const ShippingField = () => {
  return (
    <div className="field my-4">
      <label>Shipping:</label>
      <input type="number" name="shipping" placeholder="Enter shipping cost"
       className="bg-[#020817] border border-[#1E293B] mx-2 rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-48  placeholder:font-montserrat  no-spinners" />
    </div>
  );
};

export default ShippingField;

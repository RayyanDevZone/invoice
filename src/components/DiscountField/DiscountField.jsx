// components/DiscountField.jsx
import React from 'react';

const DiscountField = () => {
  return (
    <div className="field">
      <label>Discount:</label>
      <input type="number" name="discount" placeholder="Enter discount" />
    </div>
  );
};

export default DiscountField;

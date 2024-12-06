    // components/ShippingField.jsx
import React from 'react';

const ShippingField = () => {
  return (
    <div className="field">
      <label>Shipping:</label>
      <input type="number" name="shipping" placeholder="Enter shipping cost" />
    </div>
  );
};

export default ShippingField;

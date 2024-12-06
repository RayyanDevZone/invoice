// components/TaxField.jsx
import React from 'react';

const TaxField = () => {
  return (
    <div className="field">
      <label>Tax:</label>
      <input type="number" name="tax" placeholder="Enter tax" />
    </div>
  );
};

export default TaxField;

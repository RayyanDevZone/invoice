import React from 'react';
import { TextField } from "../ui/Field";

const ShippingField = ({ value, onChange }) => (
  <TextField
    label="Shipping"
    type="number"
    name="shipping"
    placeholder="0"
    value={value}
    onChange={(e) => onChange(Number(e.target.value))}
    className="w-full sm:w-48"
    inputClassName="no-spinners"
  />
);

export default ShippingField;

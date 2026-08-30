import React from "react";
import { TextField } from "../ui/Field";

const DiscountField = ({ value, onChange }) => (
  <TextField
    label="Discount"
    type="number"
    name="discount"
    placeholder="0"
    suffix="%"
    value={value}
    onChange={(e) => onChange(Number(e.target.value))}
    className="w-full sm:w-48"
    inputClassName="no-spinners"
  />
);

export default DiscountField;

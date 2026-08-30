import React from "react";
import { TextField } from "../ui/Field";

const TaxField = ({ value, onChange }) => (
  <TextField
    label="Tax"
    type="number"
    name="tax"
    placeholder="0"
    suffix="%"
    value={value}
    onChange={(e) => onChange(Number(e.target.value))}
    className="w-full sm:w-48"
    inputClassName="no-spinners"
  />
);

export default TaxField;

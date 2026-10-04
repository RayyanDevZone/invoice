import React from "react";
import { TextField } from "./Field";

const fieldConfig = [
  { name: "name", label: "Name" },
  { name: "address", label: "Address" },
  { name: "city", label: "City" },
  { name: "zip", label: "ZIP / Postal code" },
  { name: "country", label: "Country" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "tel" },
  { name: "gstReg", label: "GST Reg." },
];

const PartyForm = ({ title, icon: Icon, section, data, onChange, placeholderPrefix }) => (
  <div className="w-full h-full box-border py-5 px-6">
    <div className="flex items-center gap-2 mb-4">
      <span className="h-8 w-8 rounded-full bg-brand/30 flex items-center justify-center shrink-0">
        <Icon className="text-brand-dark text-base" />
      </span>
      <h3 className="text-gray-900 font-bold text-lg">{title}</h3>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
      {fieldConfig.map(({ name, label, type }) => (
        <TextField
          key={name}
          label={label}
          type={type || "text"}
          name={name}
          placeholder={`${placeholderPrefix} ${label.toLowerCase()}`}
          value={data[name] || ""}
          onChange={(e) => onChange(section, e)}
        />
      ))}
    </div>
  </div>
);

export default PartyForm;

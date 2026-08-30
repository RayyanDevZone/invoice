import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LuBuilding2, LuUser } from "react-icons/lu";
import { InvoiceContext } from "../../InvoiceContext";
import Card from "../ui/Card";
import StepHeader from "../ui/StepHeader";
import StepFooter from "../ui/StepFooter";
import { TextField } from "../ui/Field";

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

const PersonalInfo = () => {
  const { invoiceData, setInvoiceData } = useContext(InvoiceContext);
  const navigate = useNavigate();

  const handleInputChange = (section, e) => {
    setInvoiceData({
      ...invoiceData,
      [section]: {
        ...invoiceData[section],
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <div className="w-full max-w-5xl">
      <StepHeader
        eyebrow="Step 1 of 6"
        title="From & To"
        description="Tell us who is sending and who is receiving this invoice."
      />
      <Card className="flex flex-col sm:flex-row overflow-hidden">
        <div className="sm:w-1/2 w-full border-b sm:border-b-0 sm:border-r border-gray-200">
          <PartyForm
            title="Bill From"
            icon={LuBuilding2}
            section="sender"
            data={invoiceData.sender}
            onChange={handleInputChange}
            placeholderPrefix="Your"
          />
        </div>
        <div className="sm:w-1/2 w-full">
          <PartyForm
            title="Bill To"
            icon={LuUser}
            section="receiver"
            data={invoiceData.receiver}
            onChange={handleInputChange}
            placeholderPrefix="Receiver"
          />
        </div>
      </Card>
      <StepFooter onNext={() => navigate("/invoice-details")} />
    </div>
  );
};

export default PersonalInfo;

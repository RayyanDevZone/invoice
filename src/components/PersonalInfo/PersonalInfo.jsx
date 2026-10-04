import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LuUser } from "react-icons/lu";
import { InvoiceContext } from "../../InvoiceContext";
import Card from "../ui/Card";
import StepHeader from "../ui/StepHeader";
import StepFooter from "../ui/StepFooter";
import PartyForm from "../ui/PartyForm";

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
        title="Bill To"
        description="Tell us who is receiving this invoice. Your own details live in your profile (top right)."
      />
      <Card className="overflow-hidden">
        <PartyForm
          title="Bill To"
          icon={LuUser}
          section="receiver"
          data={invoiceData.receiver}
          onChange={handleInputChange}
          placeholderPrefix="Receiver"
        />
      </Card>
      <StepFooter onNext={() => navigate("/invoice-details")} />
    </div>
  );
};

export default PersonalInfo;

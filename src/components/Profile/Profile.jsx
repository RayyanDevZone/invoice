import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LuArrowLeft, LuBuilding2 } from "react-icons/lu";
import { InvoiceContext } from "../../InvoiceContext";
import Card from "../ui/Card";
import StepHeader from "../ui/StepHeader";
import Button from "../ui/Button";
import PartyForm from "../ui/PartyForm";

const Profile = () => {
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
    <main className="flex-1 w-full box-border py-8 px-4 sm:px-10 flex justify-center">
      <div className="w-full max-w-5xl">
        <Button
          type="button"
          variant="ghost"
          icon={LuArrowLeft}
          iconPosition="left"
          onClick={() => navigate(-1)}
          className="-ml-4 mb-4"
        >
          Back
        </Button>
        <StepHeader
          eyebrow="Profile"
          title="Bill From"
          description="Your business details. They're saved and added to every invoice you create."
        />
        <Card className="overflow-hidden">
          <PartyForm
            title="Bill From"
            icon={LuBuilding2}
            section="sender"
            data={invoiceData.sender}
            onChange={handleInputChange}
            placeholderPrefix="Your"
          />
        </Card>
      </div>
    </main>
  );
};

export default Profile;

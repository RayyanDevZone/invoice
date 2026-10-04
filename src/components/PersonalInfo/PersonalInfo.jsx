import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuBuilding2, LuUser } from "react-icons/lu";
import { InvoiceContext } from "../../InvoiceContext";
import { AuthContext } from "../../AuthContext";
import Select from "../ui/Select";
import Card from "../ui/Card";
import StepHeader from "../ui/StepHeader";
import StepFooter from "../ui/StepFooter";
import PartyForm from "../ui/PartyForm";

const PersonalInfo = () => {
  const { invoiceData, setInvoiceData, businesses, selectedBusinessId, setSelectedBusinessId } =
    useContext(InvoiceContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (section, field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  return (
    <div className="w-full max-w-5xl">
      <StepHeader
        eyebrow="Step 1 of 6"
        title="Bill To"
        description="Choose the business you're billing from, and tell us who is receiving this invoice."
      />
      <Card className="mb-6 py-5 px-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="h-8 w-8 rounded-full bg-brand/30 flex items-center justify-center shrink-0">
            <LuBuilding2 className="text-brand-dark text-base" />
          </span>
          <h3 className="text-gray-900 font-bold text-lg">Bill From</h3>
        </div>
        {businesses.length > 0 ? (
          <div className="flex flex-col sm:flex-row sm:items-end gap-3">
            <Select
              label="Business"
              className="w-full sm:max-w-sm"
              value={selectedBusinessId}
              onChange={setSelectedBusinessId}
              searchable={businesses.length > 6}
              options={businesses.map((b) => ({ value: b.id, label: b.businessName || b.name || "Unnamed business" }))}
            />
            <Link to="/profile" className="text-sm font-semibold text-gray-600 hover:text-gray-900 hover:underline sm:pb-3">
              Manage businesses
            </Link>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            {user ? "You haven't added a business yet. " : "Sign in to add the business you bill from. "}
            <Link to="/profile" className="font-semibold text-gray-900 hover:underline">
              {user ? "Add one in your profile" : "Sign in"}
            </Link>
          </p>
        )}
      </Card>
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

import React, { useContext, useState } from "react";
import DiscountField from "../DiscountField/DiscountField";
import TaxField from "../TaxField/TaxField";
import ShippingField from "../ShippingField/ShippingField";
import { useNavigate } from "react-router-dom";
import { InvoiceContext } from "../../InvoiceContext";
import Card from "../ui/Card";
import StepHeader from "../ui/StepHeader";
import StepFooter from "../ui/StepFooter";
import Toggle from "../ui/Toggle";
import { TextField, TextAreaField } from "../ui/Field";

const Summary = () => {
  const navigate = useNavigate();
  const { invoiceData, setInvoiceData } = useContext(InvoiceContext);
  const [isDiscountEnabled, setIsDiscountEnabled] = useState(Boolean(invoiceData.discount));
  const [isTaxEnabled, setIsTaxEnabled] = useState(Boolean(invoiceData.tax));
  const [isShippingEnabled, setIsShippingEnabled] = useState(Boolean(invoiceData.shipping));

  const handleNotesChange = (e) => {
    setInvoiceData({ ...invoiceData, additionalNotes: e.target.value });
  };

  const handlePaymentTermsChange = (e) => {
    setInvoiceData({ ...invoiceData, paymentTerms: e.target.value });
  };

  const handleDiscountChange = (value) => {
    setInvoiceData({ ...invoiceData, discount: value });
  };

  const handleTaxChange = (value) => {
    setInvoiceData({ ...invoiceData, tax: value });
  };

  const handleShippingChange = (value) => {
    setInvoiceData({ ...invoiceData, shipping: value });
  };

  const handleInvoiceNameChange = (e) => {
    setInvoiceData({ ...invoiceData, invoiceName: e.target.value });
  };

  return (
    <div className="w-full max-w-5xl">
      <StepHeader
        eyebrow="Step 5 of 6"
        title="Summary"
        description="Add optional charges, notes and terms before generating the invoice."
      />
      <Card className="box-border py-6 px-6 sm:px-8 flex flex-col gap-6">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-3">Additional charges</p>
          <div className="flex flex-wrap gap-6">
            <Toggle checked={isDiscountEnabled} onChange={setIsDiscountEnabled} label="Discount" />
            <Toggle checked={isTaxEnabled} onChange={setIsTaxEnabled} label="Tax" />
            <Toggle checked={isShippingEnabled} onChange={setIsShippingEnabled} label="Shipping" />
          </div>
          {(isDiscountEnabled || isTaxEnabled || isShippingEnabled) && (
            <div className="flex flex-wrap gap-4 mt-4">
              {isDiscountEnabled && (
                <DiscountField value={invoiceData.discount} onChange={handleDiscountChange} />
              )}
              {isTaxEnabled && <TaxField value={invoiceData.tax} onChange={handleTaxChange} />}
              {isShippingEnabled && (
                <ShippingField value={invoiceData.shipping} onChange={handleShippingChange} />
              )}
            </div>
          )}
        </div>

        <TextField
          label="Invoice Name"
          placeholder="e.g. Invoice for Acme Corp"
          value={invoiceData.invoiceName || ""}
          onChange={handleInvoiceNameChange}
          className="max-w-sm"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <TextAreaField
            label="Additional notes"
            rows="4"
            placeholder="Your additional notes here"
            value={invoiceData.additionalNotes}
            onChange={handleNotesChange}
          />
          <TextAreaField
            label="Payment terms"
            rows="4"
            placeholder="Ex: Credit time period"
            value={invoiceData.paymentTerms}
            onChange={handlePaymentTermsChange}
          />
        </div>
      </Card>
      <StepFooter
        onBack={() => navigate("/paymentInfo")}
        onNext={() => navigate("/invoice")}
        nextLabel="Generate invoice"
      />
    </div>
  );
};

export default Summary;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "../../utils/DatePicker";
import { InvoiceContext } from "../../InvoiceContext";
import Card from "../ui/Card";
import StepHeader from "../ui/StepHeader";
import StepFooter from "../ui/StepFooter";
import Select from "../ui/Select";
import ImageUpload from "../ui/ImageUpload";
import { TextField } from "../ui/Field";
import { fetchCurrencies, FALLBACK_CURRENCIES } from "../../utils/currencies";

const InvoiceDetails = () => {
  const navigate = useNavigate();
  const { invoiceData, setInvoiceData } = useContext(InvoiceContext);
  const [issueDate, setIssueDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [currencies, setCurrencies] = useState(FALLBACK_CURRENCIES);

  useEffect(() => {
    let cancelled = false;
    fetchCurrencies()
      .then((list) => {
        if (!cancelled) setCurrencies(list);
      })
      .catch(() => {
        // Offline or the API is unreachable — keep the built-in fallback list.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleInputChange = (e) => {
    setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, name) => {
    const formattedDate = date ? date.toLocaleDateString('en-CA') : null;
    setInvoiceData({ ...invoiceData, [name]: formattedDate });
    name === "issueDate" ? setIssueDate(date) : setDueDate(date);
  };

  const handleCurrencyChange = (value) => {
    setInvoiceData({ ...invoiceData, currency: value });
  };

  const handleLogoChange = (base64String) => {
    setInvoiceData({ ...invoiceData, logo: base64String || '' });
    if (base64String) {
      localStorage.setItem('logo', base64String);
    } else {
      localStorage.removeItem('logo');
    }
  };

  return (
    <div className="w-full max-w-5xl">
      <StepHeader
        eyebrow="Step 2 of 6"
        title="Invoice Details"
        description="Set your logo, invoice number, dates and currency."
      />
      <Card className="box-border py-6 px-6 sm:px-8">
        <ImageUpload
          label="Invoice Logo"
          hint="PNG or JPG"
          accept=".jpg, .jpeg, .png"
          value={invoiceData.logo}
          onChange={handleLogoChange}
          className="mb-8"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 max-w-2xl">
          <TextField
            label="Invoice Number"
            id="invoiceNumber"
            name="invoiceNumber"
            placeholder="Invoice number"
            required
            value={invoiceData.invoiceNumber}
            onChange={handleInputChange}
          />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="issueDate" className="text-sm font-medium text-gray-600">Issue Date</label>
            <DatePicker
              id="issueDate"
              selected={issueDate}
              onChange={(date) => handleDateChange(date, "issueDate")}
              placeholderText="Pick issue date"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="dueDate" className="text-sm font-medium text-gray-600">Due Date</label>
            <DatePicker
              id="dueDate"
              selected={dueDate}
              onChange={(date) => handleDateChange(date, "dueDate")}
              placeholderText="Pick due date"
            />
          </div>
          <Select
            label="Currency"
            value={invoiceData.currency}
            onChange={handleCurrencyChange}
            options={currencies}
            placeholder="Select currency"
          />
        </div>
      </Card>
      <StepFooter onBack={() => navigate("/personal-info")} onNext={() => navigate("/itemsLine")} />
    </div>
  );
};

export default InvoiceDetails;

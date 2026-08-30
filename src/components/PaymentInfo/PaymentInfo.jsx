import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InvoiceContext } from "../../InvoiceContext";
import Card from "../ui/Card";
import StepHeader from "../ui/StepHeader";
import StepFooter from "../ui/StepFooter";
import { TextField } from "../ui/Field";
import ImageUpload from "../ui/ImageUpload";

const PaymentInfo = () => {
  const navigate = useNavigate();
  const { invoiceData, setInvoiceData } = useContext(InvoiceContext);
  const [qrCode, setQrCode] = useState(localStorage.getItem('qrCode') || '');

  const handleInputChange = (e) => {
    setInvoiceData({
      ...invoiceData,
      paymentInfo: {
        ...invoiceData.paymentInfo,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleQrChange = (base64String) => {
    setQrCode(base64String || '');
    if (base64String) {
      localStorage.setItem('qrCode', base64String);
    } else {
      localStorage.removeItem('qrCode');
    }
  };

  return (
    <div className="w-full max-w-5xl">
      <StepHeader
        eyebrow="Step 4 of 6"
        title="Payment Information"
        description="Optional — share your bank details so clients know how to pay you."
      />
      <Card className="box-border py-6 px-6 sm:px-8 flex flex-col sm:flex-row gap-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 flex-1">
          <TextField
            label="Bank Name"
            name="bankName"
            placeholder="Bank name"
            value={invoiceData.paymentInfo?.bankName || ''}
            onChange={handleInputChange}
          />
          <TextField
            label="Account Holder Name"
            name="accountName"
            placeholder="Account name"
            value={invoiceData.paymentInfo?.accountName || ''}
            onChange={handleInputChange}
          />
          <TextField
            label="Account Number"
            type="number"
            name="accountNumber"
            placeholder="Account number"
            value={invoiceData.paymentInfo?.accountNumber || ''}
            onChange={handleInputChange}
            inputClassName="no-spinners"
          />
          <TextField
            label="IFSC Code"
            name="ifscCode"
            placeholder="IFSC code"
            value={invoiceData.paymentInfo?.ifscCode || ''}
            onChange={handleInputChange}
          />
          <TextField
            label="Bank Address"
            name="bankAddress"
            placeholder="Bank address"
            className="sm:col-span-2"
            value={invoiceData.paymentInfo?.bankAddress || ''}
            onChange={handleInputChange}
          />
        </div>

        <ImageUpload
          label="UPI / QR Code"
          hint="Any image"
          value={qrCode}
          onChange={handleQrChange}
          height="h-40"
          width="w-full"
          className="sm:w-48 w-full shrink-0"
        />
      </Card>
      <StepFooter onBack={() => navigate("/itemsLine")} onNext={() => navigate("/summary")} />
    </div>
  );
};

export default PaymentInfo;

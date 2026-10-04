import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InvoiceContext } from "../../InvoiceContext";
import { AuthContext } from "../../AuthContext";
import Card from "../ui/Card";
import StepHeader from "../ui/StepHeader";
import StepFooter from "../ui/StepFooter";

const fields = [
  { name: "bankName", label: "Bank Name" },
  { name: "accountName", label: "Account Holder Name" },
  { name: "accountNumber", label: "Account Number" },
  { name: "ifscCode", label: "IFSC Code" },
  { name: "bankAddress", label: "Bank Address", wide: true },
];

// Shows the payment details of the business the invoice is billed from.
// They're edited per business in the profile.
const PaymentInfo = () => {
  const navigate = useNavigate();
  const { invoiceData, businesses, selectedBusinessId } = useContext(InvoiceContext);
  const { user } = useContext(AuthContext);
  const payment = invoiceData.paymentInfo || {};
  const business = businesses.find((b) => b.id === selectedBusinessId);
  const hasDetails = fields.some(({ name }) => payment[name]) || payment.qrCode;

  let emptyMessage = null;
  if (!user) {
    emptyMessage = (
      <>
        Bank details are saved with your business.{" "}
        <Link to="/login" className="font-semibold text-gray-900 hover:underline">Sign in</Link> to add them.
      </>
    );
  } else if (!business) {
    emptyMessage = (
      <>
        Add a business in your{" "}
        <Link to="/profile" className="font-semibold text-gray-900 hover:underline">profile</Link> to show its bank details here.
      </>
    );
  } else if (!hasDetails) {
    emptyMessage = (
      <>
        {business.businessName || "This business"} has no bank details yet.{" "}
        <Link to="/profile" className="font-semibold text-gray-900 hover:underline">Add them in your profile</Link>.
      </>
    );
  }

  return (
    <div className="w-full max-w-5xl">
      <StepHeader
        eyebrow="Step 4 of 6"
        title="Payment Information"
        description="The bank details shown on this invoice, from the business you're billing from."
      />
      <Card className="box-border py-6 px-6 sm:px-8">
        {emptyMessage ? (
          <p className="text-sm text-gray-500">{emptyMessage}</p>
        ) : (
          <>
            <div className="flex items-center justify-between gap-3 mb-5">
              <p className="text-sm text-gray-500">
                From <span className="font-semibold text-gray-900">{business.businessName || business.name}</span>
              </p>
              <Link to="/profile" className="text-sm font-semibold text-gray-600 hover:text-gray-900 hover:underline">
                Edit in profile
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 flex-1">
                {fields.map(({ name, label, wide }) => (
                  <div key={name} className={`flex flex-col gap-1 min-w-0 ${wide ? "sm:col-span-2" : ""}`}>
                    <p className="text-sm font-medium text-gray-500">{label}</p>
                    <p className={`text-sm font-semibold break-words ${payment[name] ? "text-gray-900" : "text-gray-300"}`}>
                      {payment[name] || "—"}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-1 sm:w-48 shrink-0">
                <p className="text-sm font-medium text-gray-500">UPI / QR Code</p>
                {payment.qrCode ? (
                  <img
                    src={payment.qrCode}
                    alt="UPI QR code"
                    className="h-40 w-40 object-contain rounded-lg border border-gray-200 bg-white p-1"
                  />
                ) : (
                  <p className="text-sm font-semibold text-gray-300">—</p>
                )}
              </div>
            </div>
          </>
        )}
      </Card>
      <StepFooter onBack={() => navigate("/itemsLine")} onNext={() => navigate("/summary")} />
    </div>
  );
};

export default PaymentInfo;

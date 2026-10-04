import React from "react";
import { LuLandmark } from "react-icons/lu";
import { TextField } from "./Field";
import ImageUpload from "./ImageUpload";
import { shrinkImage } from "../../utils/image";
import { enterToNext } from "../../utils/enterToNext";

const fields = [
  { name: "bankName", label: "Bank Name" },
  { name: "accountName", label: "Account Holder Name" },
  { name: "accountNumber", label: "Account Number", inputMode: "numeric" },
  { name: "ifscCode", label: "IFSC Code" },
  { name: "bankAddress", label: "Bank Address", wide: true },
];

// A business's bank / payment details: a form while editing, or read-only.
const BankForm = ({ data, onChange, readOnly = false, errors = {}, onBlur }) => {
  const handleQrChange = async (dataUrl) => {
    onChange("qrCode", dataUrl ? await shrinkImage(dataUrl) : "");
  };

  return (
    <div className="border-t border-gray-100 py-5 px-6">
      <div className="flex items-center gap-2 mb-4">
        <LuLandmark className="text-gray-500 text-base" />
        <h4 className="text-gray-900 font-bold text-base">Bank details</h4>
        <span className="text-xs text-gray-400">Optional</span>
      </div>
      <div className="flex flex-col sm:flex-row gap-6">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 flex-1 ${readOnly ? "gap-x-4 gap-y-5" : "gap-x-4 gap-y-4"}`}
          onKeyDown={readOnly ? undefined : enterToNext(data)}
        >
          {fields.map(({ name, label, inputMode, wide }) =>
            readOnly ? (
              <div key={name} className={`flex flex-col gap-1 min-w-0 ${wide ? "sm:col-span-2" : ""}`}>
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <p className={`text-sm font-semibold break-words ${data[name] ? "text-gray-900" : "text-gray-300"}`}>
                  {data[name] || "—"}
                </p>
              </div>
            ) : (
              <TextField
                key={name}
                data-field={name}
                label={label}
                name={name}
                inputMode={inputMode}
                className={wide ? "sm:col-span-2" : ""}
                placeholder={label}
                value={data[name] || ""}
                onChange={(e) => onChange(name, e.target.value)}
                onBlur={() => onBlur && onBlur(name)}
                error={errors[name]}
              />
            )
          )}
        </div>
        {readOnly ? (
          <div className="flex flex-col gap-1 sm:w-40 shrink-0">
            <p className="text-sm font-medium text-gray-500">UPI / QR Code</p>
            {data.qrCode ? (
              <img src={data.qrCode} alt="UPI QR code" className="h-36 w-36 object-contain rounded-lg border border-gray-200 bg-white p-1" />
            ) : (
              <p className="text-sm font-semibold text-gray-300">—</p>
            )}
          </div>
        ) : (
          <ImageUpload
            label="UPI / QR Code"
            hint="Any image"
            value={data.qrCode}
            onChange={handleQrChange}
            height="h-40"
            width="w-full"
            className="sm:w-48 w-full shrink-0"
          />
        )}
      </div>
    </div>
  );
};

export default BankForm;

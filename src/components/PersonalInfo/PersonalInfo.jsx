import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GrFormNextLink } from "react-icons/gr";
import { InvoiceContext } from "../../InvoiceContext"; // Import the context

const PersonalInfo = () => {
  const { invoiceData, setInvoiceData } = useContext(InvoiceContext);
  const navigate = useNavigate();

  const handleInputChange = (section, e) => {
    setInvoiceData({
      ...invoiceData,
      [section]: {
        ...invoiceData[section],
        [e.target.name]: e.target.value
      }
    });
  };

  return (
    <div className="min-h-screen w-full rounded-t-xl box-border py-5 px-4 text-white flex flex-col sm:flex-row bg-[#020817] justify-between items-center font-lexend">
      <div className="sm:w-[50%] h-full border-b border-[#1E293b] sm:border-none w-full box-border py-4 px-3">
        <h3 className="text-white font-bold text-xl mb-2">Bill From:</h3>
        <div className="flex flex-col gap-2">
          {["name", "address", "zip", "city", "country", "email", "phone", "gstReg"].map((field) => (
            <div key={field} className="flex items-center gap-4">
              <label
                htmlFor={field}
                className="text-sm font-bold text-white w-20 capitalize"
              >
                {field === "gstReg" ? "GST Reg." : field} :
              </label>
              <input
                type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                id={field}
                name={field}
                placeholder={`Your ${field}`}
                required
                value={invoiceData.sender[field]}
                onChange={(e) => handleInputChange("sender", e)}
                className="bg-[#020817] border border-gray-600 rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-60"
              />
            </div>
          ))}

        </div>
      </div>
      <div className="sm:w-[50%] w-full h-full">
        <div className="h-full box-border py-4 px-3">
          <h3 className="text-white font-bold text-xl">Bill To:</h3>
          <div className="flex flex-col gap-2">
            {["name", "address", "zip", "city", "country", "email", "phone", "gstReg"].map((field) => (
              <div key={field} className="flex items-center gap-4">
                <label
                  htmlFor={field}
                  className="text-sm font-bold text-white w-20 capitalize"
                >
                  {field === "gstReg" ? "GST Reg." : field} :
                </label>
                <input
                  type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                  id={field}
                  name={field}
                  placeholder={`Receiver ${field}`}
                  required
                  value={invoiceData.receiver[field]}
                  onChange={(e) => handleInputChange("receiver", e)}
                  className="bg-[#020817] border border-gray-600 rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-60"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={() => navigate("/invoice-details")}
              className="bg-white hover:bg-zinc-200 mt-12 w-48 flex justify-around items-center text-[#020817] font-bold py-2 px-4 rounded"
            >
              Next <GrFormNextLink className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;

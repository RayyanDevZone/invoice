import React from "react";
import { useNavigate } from "react-router-dom";
import { LuArrowRight, LuFileText, LuWallet, LuClipboardList } from "react-icons/lu";
import Button from "../ui/Button";

const features = [
  { icon: LuFileText, text: "Fill in sender, receiver & item details" },
  { icon: LuWallet, text: "Add tax, discount & payment info" },
  { icon: LuClipboardList, text: "Preview and download a polished PDF" },
];

const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex-1 flex items-center justify-center px-4 sm:px-10 py-12">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-start text-left font-google-sans">
          <span className="text-xs font-bold tracking-wider uppercase text-brand-dark mb-3">
            Free &middot; No sign-up
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            Create invoices <br /> in minutes
          </h1>
          <p className="mt-4 text-base text-gray-500 max-w-md">
            BillEase walks you through a simple, guided flow to build a clean,
            professional invoice — then export it straight to PDF.
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {features.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                <span className="h-8 w-8 rounded-full bg-brand/30 flex items-center justify-center shrink-0">
                  <Icon className="text-brand-dark text-base" />
                </span>
                {text}
              </li>
            ))}
          </ul>

          <Button
            onClick={() => navigate("/personal-info")}
            icon={LuArrowRight}
            className="mt-10 !px-8 !py-3 text-base"
          >
            Get started
          </Button>
        </div>

        <div className="hidden md:flex justify-center">
          <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white shadow-lg p-6 font-google-sans">
            <div className="flex items-center justify-between mb-6">
              <div className="h-8 w-24 rounded-md bg-brand/40" />
              <p className="text-sm font-bold text-gray-300">INVOICE</p>
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <div className="h-2.5 w-3/4 rounded-full bg-gray-100" />
              <div className="h-2.5 w-1/2 rounded-full bg-gray-100" />
              <div className="h-2.5 w-2/3 rounded-full bg-gray-100" />
            </div>
            <div className="rounded-lg border border-gray-100 overflow-hidden mb-6">
              <div className="bg-gray-50 h-8" />
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between px-3 py-2 border-t border-gray-100">
                  <div className="h-2 w-24 rounded-full bg-gray-100" />
                  <div className="h-2 w-10 rounded-full bg-gray-100" />
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <div className="h-8 w-28 rounded-lg bg-brand/40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;

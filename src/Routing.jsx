import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PersonalInfo from "./components/PersonalInfo/PersonalInfo";
import InvoiceDetails from "./components/InvoiceDetails/InvoiceDetails";
import WelcomePage from "./components/welcomePage/WelcomePage";
import ItemsLine from "./components/ItemsLine/ItemsLine";
import PaymentInfo from "./components/PaymentInfo/PaymentInfo";
import Summary from "./components/Summary/Summary";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import InvoiceContainer from "./components/InvoiceContainer/InvoiceContainer";
import SelfLogo from './components/SelfLogo/SelfLogo';

const StepLayout = ({ children }) => (
  <div className="flex flex-1 w-full">
    <Sidebar />
    <main className="flex-1 min-w-0 box-border py-8 px-4 sm:px-10 flex flex-col items-start">
      {children}
    </main>
  </div>
);

const Routing = () => {
  return (
    <Router>
      <div className="min-h-screen w-full flex flex-col bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/personal-info" element={<StepLayout><PersonalInfo /></StepLayout>} />
          <Route path="/invoice-details" element={<StepLayout><InvoiceDetails /></StepLayout>} />
          <Route path="/itemsLine" element={<StepLayout><ItemsLine /></StepLayout>} />
          <Route path="/paymentInfo" element={<StepLayout><PaymentInfo /></StepLayout>} />
          <Route path="/summary" element={<StepLayout><Summary /></StepLayout>} />
          <Route path="/invoice" element={<StepLayout><InvoiceContainer /></StepLayout>} />
        </Routes>
        <SelfLogo />
      </div>
    </Router>
  );
};

export default Routing;

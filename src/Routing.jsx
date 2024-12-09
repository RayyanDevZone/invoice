import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PersonalInfo from "./components/PersonalInfo/PersonalInfo";
import InvoiceDetails from "./components/InvoiceDetails/InvoiceDetails";
import WelcomePage from "./components/welcomePage/WelcomePage";
import ItemsLine from "./components/ItemsLine/ItemsLine";
import PaymentInfo from "./components/PaymentInfo/PaymentInfo";
import Summary from "./components/Summary/Summary";
import Buttons from "./components/Buttons/Buttons";
import Navbar from "./components/Navbar/Navbar";
import Invoice from "./components/Invoice/Invoice";

const Routing = () => {
  return (
    <Router>
      <Navbar />
      <Buttons />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/personal-info" element={<PersonalInfo />} />
        <Route path="/invoice-details" element={<InvoiceDetails />} />
        <Route path="/itemsLine" element={<ItemsLine />} />
        <Route path="/paymentInfo" element={<PaymentInfo />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/invoice" element={<Invoice />} />
      </Routes>
    </Router>
  );
};

export default Routing;

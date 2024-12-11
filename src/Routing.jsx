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
import InvoiceContainer from "./components/InvoiceContainer/InvoiceContainer";
import SelfLogo from './components/SelfLogo/SelfLogo';

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
        <Route path="/invoice" element={<InvoiceContainer />} />

      </Routes>
      <SelfLogo/>
    </Router>
  );
};

export default Routing;

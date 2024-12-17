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
import Login from './components/Login/Login'
import {AuthProvider} from './AuthContext.js'
import ProtectedRoute from './ProtectedRoute.js';

const Routing = () => {
  return (
  <AuthProvider>
      <Router>
      <Navbar />
      <Buttons />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/personal-info" element={ <ProtectedRoute><PersonalInfo /></ProtectedRoute>} />
        <Route path="/invoice-details" element={<ProtectedRoute><InvoiceDetails /></ProtectedRoute>} />
        <Route path="/itemsLine" element={<ProtectedRoute><ItemsLine /></ProtectedRoute>} />
        <Route path="/paymentInfo" element={<ProtectedRoute><PaymentInfo /></ProtectedRoute>} />
        <Route path="/summary" element={<ProtectedRoute><Summary /></ProtectedRoute>} />
        <Route path="/invoice" element={<ProtectedRoute><InvoiceContainer /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        

      </Routes>
      <SelfLogo/>
    </Router>
  </AuthProvider>
  );
};

export default Routing;

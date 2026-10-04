import React, { createContext, useEffect, useState } from 'react';

// Create the context
export const InvoiceContext = createContext();

// Sender details are the user's profile, so keep them across reloads
const loadSavedSender = () => {
  try {
    return JSON.parse(localStorage.getItem('sender'));
  } catch {
    return null;
  }
};

// Create the provider component
export const InvoiceProvider = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState({
    sender: loadSavedSender() || {
      name: '',
      address: '',
      city: '',
      zip: '',
      country: '',
      gstReg: '' // Add GST Registration field
    },
    receiver: {
      name: '',
      address: '',
      city: '',
      zip: '',
      country: '',
      gstReg: '' // Add GST Registration field
    },
    items: [],
    additionalNotes: '',
    paymentTerms: '',
    invoiceNumber: '',
    issueDate: '',
    dueDate: '',
    discount: 0,
    tax: 0,
    shipping: 0,
    signatory: false, // Add the signatory toggle directly to invoiceData
  });

  useEffect(() => {
    localStorage.setItem('sender', JSON.stringify(invoiceData.sender));
  }, [invoiceData.sender]);

  // Function to update the signatory toggle
  const toggleSignatory = () => {
    setInvoiceData((prevState) => ({
      ...prevState,
      signatory: !prevState.signatory, // Toggle the signatory
    }));
  };

  return (
    <InvoiceContext.Provider value={{ invoiceData, setInvoiceData, toggleSignatory }}>
      {children}
    </InvoiceContext.Provider>
  );
};

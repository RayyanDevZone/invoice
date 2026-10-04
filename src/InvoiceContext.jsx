import React, { createContext, useState } from 'react';

// Create the context
export const InvoiceContext = createContext();

// Create the provider component
export const InvoiceProvider = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState({
    sender: {
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

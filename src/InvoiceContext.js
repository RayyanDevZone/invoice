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
      country: ''
    },
    receiver: {
      name: '',
      address: '',
      city: '',
      zip: '',
      country: ''
    },
    items: [],
    additionalNotes: '',
    paymentTerms: '',
    invoiceNumber: '',
    issueDate: '',
    dueDate: ''
  });

  return (
    <InvoiceContext.Provider value={{ invoiceData, setInvoiceData }}>
      {children}
    </InvoiceContext.Provider>
  );
};

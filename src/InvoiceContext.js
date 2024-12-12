import React, { createContext, useState } from 'react'; // Ensure useState is imported

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
    dueDate: '',
    discount: 0, // Ensure initial values are set
    tax: 0,
    shipping: 0
  });

  return (
    <InvoiceContext.Provider value={{ invoiceData, setInvoiceData }}>
      {children}
    </InvoiceContext.Provider>
  );
};

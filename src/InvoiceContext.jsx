import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { emptyBusiness, fetchBusinesses } from './utils/businesses';

// Create the context
export const InvoiceContext = createContext();

// Create the provider component
export const InvoiceProvider = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState({
    sender: emptyBusiness,
    receiver: {
      name: '',
      address: '',
      city: '',
      state: '',
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

  const { user } = useContext(AuthContext);
  const userId = user?.id;

  // The signed-in user's businesses, loaded from Supabase. The invoice's
  // "Bill From" (sender) is a copy of whichever business is selected.
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);
  const [businessesLoading, setBusinessesLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setBusinesses([]);
    if (!userId) return;

    setBusinessesLoading(true);
    fetchBusinesses()
      .then((list) => !cancelled && setBusinesses(list))
      .catch((error) => console.error('Failed to load businesses', error))
      .finally(() => !cancelled && setBusinessesLoading(false));

    return () => {
      cancelled = true;
    };
  }, [userId]);

  // Default to the first business, and keep the sender in step with edits.
  const selectedBusiness =
    businesses.find((b) => b.id === selectedBusinessId) || businesses[0] || null;

  useEffect(() => {
    const { id, ...sender } = selectedBusiness || { ...emptyBusiness };
    setInvoiceData((prev) => ({ ...prev, sender }));
  }, [selectedBusiness]);

  // Function to update the signatory toggle
  const toggleSignatory = () => {
    setInvoiceData((prevState) => ({
      ...prevState,
      signatory: !prevState.signatory, // Toggle the signatory
    }));
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoiceData,
        setInvoiceData,
        toggleSignatory,
        businesses,
        setBusinesses,
        businessesLoading,
        selectedBusinessId: selectedBusiness?.id ?? null,
        setSelectedBusinessId,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

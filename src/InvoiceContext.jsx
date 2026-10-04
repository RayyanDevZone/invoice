import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { emptyBusiness, fetchBusinesses } from './utils/businesses';
import { emptyBank, emptyParty } from './utils/parties';
import { fetchCustomers } from './utils/customers';

// Create the context
export const InvoiceContext = createContext();

// Create the provider component
export const InvoiceProvider = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState({
    sender: emptyParty,
    paymentInfo: emptyBank,
    receiver: { ...emptyParty },
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

  // Saved customers, for filling in "Bill To". selectedCustomerId is the saved
  // customer the current invoice's receiver came from (null for a new one).
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setCustomers([]);
    setSelectedCustomerId(null);
    if (!userId) return;

    fetchCustomers()
      .then((list) => !cancelled && setCustomers(list))
      .catch((error) => console.error('Failed to load customers', error));

    return () => {
      cancelled = true;
    };
  }, [userId]);

  // Keep the receiver in step with edits to the selected customer.
  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId) || null;

  useEffect(() => {
    if (!selectedCustomer) return;
    const { id, ...receiver } = selectedCustomer;
    setInvoiceData((prev) => ({ ...prev, receiver: { ...emptyParty, ...receiver } }));
  }, [selectedCustomer]);

  // Default to the first business, and keep the sender in step with edits.
  const selectedBusiness =
    businesses.find((b) => b.id === selectedBusinessId) || businesses[0] || null;

  // The selected business supplies both "Bill From" and the payment details.
  useEffect(() => {
    const business = selectedBusiness || emptyBusiness;
    const pick = (fields) => Object.fromEntries(Object.keys(fields).map((f) => [f, business[f] || '']));
    setInvoiceData((prev) => ({
      ...prev,
      sender: pick(emptyParty),
      paymentInfo: pick(emptyBank),
      // Drop lines picked from a different business's saved items.
      items: prev.items.filter((line) => !line.businessId || line.businessId === business.id),
    }));
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
        customers,
        setCustomers,
        selectedCustomerId,
        setSelectedCustomerId,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

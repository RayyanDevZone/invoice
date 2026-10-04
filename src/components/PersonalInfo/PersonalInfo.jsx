import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuBuilding2, LuPlus, LuUser, LuUserPlus } from "react-icons/lu";
import { InvoiceContext } from "../../InvoiceContext";
import { AuthContext } from "../../AuthContext";
import Select from "../ui/Select";
import Card from "../ui/Card";
import StepHeader from "../ui/StepHeader";
import StepFooter from "../ui/StepFooter";
import Button from "../ui/Button";
import PartyForm, { statesFor, useCountries } from "../ui/PartyForm";
import { validateParty } from "../../utils/validation";
import PartyCard from "../ui/PartyCard";
import { customerApi } from "../../utils/customers";

const PersonalInfo = () => {
  const {
    invoiceData,
    setInvoiceData,
    businesses,
    selectedBusinessId,
    setSelectedBusinessId,
    customers,
    setCustomers,
    selectedCustomerId,
    setSelectedCustomerId,
  } = useContext(InvoiceContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const countries = useCountries();
  const [addingCustomer, setAddingCustomer] = useState(false);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Signed-out users type the receiver straight into the form (nothing is saved).
  // Errors show once a field has been left, or after pressing Next.
  const receiver = invoiceData.receiver;
  const allErrors = validateParty(receiver, {
    stateRequired: Boolean(statesFor(countries, receiver.country)),
  });
  const visibleErrors = Object.fromEntries(
    Object.entries(allErrors).filter(([field]) => submitted || touched[field])
  );
  const errorCount = Object.keys(visibleErrors).length;

  const handleBlur = (field) => setTouched((prev) => ({ ...prev, [field]: true }));

  const handleInputChange = (section, field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Signed-in users pick a saved customer, which becomes the invoice's receiver.
  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId) || null;

  const handleCustomerSaved = (customer) => {
    setCustomers((prev) => [...prev, customer]);
    setSelectedCustomerId(customer.id);
    setAddingCustomer(false);
  };

  let nextError = "";
  if (submitted && user) {
    if (addingCustomer) nextError = "Save or cancel the new customer to continue";
    else if (!selectedCustomer) nextError = "Select a customer or add a new one to continue";
  } else if (submitted && errorCount > 0) {
    nextError = `Please fix ${errorCount === 1 ? "the highlighted field" : `the ${errorCount} highlighted fields`} to continue`;
  }

  const handleNext = () => {
    setSubmitted(true);
    const ready = user ? selectedCustomer && !addingCustomer : Object.keys(allErrors).length === 0;
    if (ready) navigate("/invoice-details");
  };

  const customerSummary = (c) =>
    [c.name, [c.city, c.state].filter(Boolean).join(", "), c.email].filter(Boolean).join(" · ");

  return (
    <div className="w-full max-w-5xl">
      <StepHeader
        eyebrow="Step 1 of 6"
        title="Bill To"
        description="Choose the business you're billing from, and the customer receiving this invoice."
      />
      <Card className="mb-6 py-5 px-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="h-8 w-8 rounded-full bg-brand/30 flex items-center justify-center shrink-0">
            <LuBuilding2 className="text-brand-dark text-base" />
          </span>
          <h3 className="text-gray-900 font-bold text-lg">Bill From</h3>
        </div>
        {businesses.length > 0 ? (
          <div className="flex flex-col sm:flex-row sm:items-end gap-3">
            <Select
              label="Business"
              className="w-full sm:max-w-sm"
              value={selectedBusinessId}
              onChange={setSelectedBusinessId}
              searchable={businesses.length > 6}
              options={businesses.map((b) => ({ value: b.id, label: b.businessName || b.name || "Unnamed business" }))}
            />
            <Link to="/profile" className="text-sm font-semibold text-gray-600 hover:text-gray-900 hover:underline sm:pb-3">
              Manage businesses
            </Link>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            {user ? "You haven't added a business yet. " : "Sign in to add the business you bill from. "}
            <Link to="/profile" className="font-semibold text-gray-900 hover:underline">
              {user ? "Add one in your profile" : "Sign in"}
            </Link>
          </p>
        )}
      </Card>
      {user ? (
        <>
          <Card className="py-5 px-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-8 w-8 rounded-full bg-brand/30 flex items-center justify-center shrink-0">
                <LuUser className="text-brand-dark text-base" />
              </span>
              <h3 className="text-gray-900 font-bold text-lg">Bill To</h3>
            </div>
            {customers.length > 0 ? (
              <div className="flex flex-col gap-2">
                <Select
                  label="Customer"
                  className="w-full sm:max-w-sm"
                  value={selectedCustomerId}
                  placeholder="Select a customer"
                  onChange={setSelectedCustomerId}
                  searchable={customers.length > 6}
                  options={customers.map((c) => ({ value: c.id, label: c.businessName || c.name || "Unnamed customer" }))}
                />
                {selectedCustomer && (
                  <p className="text-sm text-gray-500">{customerSummary(selectedCustomer)}</p>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500">You haven't saved any customers yet.</p>
            )}
            <div className="flex flex-wrap items-center gap-4 mt-4">
              {!addingCustomer && (
                <Button
                  type="button"
                  variant="secondary"
                  icon={LuPlus}
                  iconPosition="left"
                  onClick={() => setAddingCustomer(true)}
                >
                  Add New Customer
                </Button>
              )}
              {customers.length > 0 && (
                <Link to="/customers" className="text-sm font-semibold text-gray-600 hover:text-gray-900 hover:underline">
                  Manage customers
                </Link>
              )}
            </div>
          </Card>
          {addingCustomer && (
            <div className="mt-6">
              <PartyCard
                party={{}}
                api={customerApi}
                noun="customer"
                icon={LuUserPlus}
                placeholderPrefix="Customer"
                countries={countries}
                onSaved={handleCustomerSaved}
                onCancel={() => setAddingCustomer(false)}
              />
            </div>
          )}
        </>
      ) : (
        <Card className="overflow-hidden">
          <PartyForm
            title="Bill To"
            icon={LuUser}
            section="receiver"
            data={receiver}
            onChange={handleInputChange}
            placeholderPrefix="Receiver"
            errors={visibleErrors}
            onBlur={handleBlur}
            countries={countries}
            withBusinessName
            action={
              <Link to="/login" className="text-sm font-semibold text-gray-600 hover:text-gray-900 hover:underline shrink-0">
                Sign in to save customers
              </Link>
            }
          />
        </Card>
      )}
      {nextError && <p className="text-sm font-medium text-red-600 text-right mt-4">{nextError}</p>}
      <StepFooter onNext={handleNext} />
    </div>
  );
};

export default PersonalInfo;

import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuArrowLeft, LuLogOut, LuPlus } from "react-icons/lu";
import { InvoiceContext } from "../../InvoiceContext";
import { AuthContext } from "../../AuthContext";
import StepHeader from "../ui/StepHeader";
import Button from "../ui/Button";
import { useCountries } from "../ui/PartyForm";
import ConfirmDialog from "../ui/ConfirmDialog";
import PartyCard from "../ui/PartyCard";
import { businessApi } from "../../utils/businesses";

const Profile = () => {
  const { businesses, setBusinesses, businessesLoading } = useContext(InvoiceContext);
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const countries = useCountries();
  // Unsaved "new business" forms, identified by a local key.
  const [newForms, setNewForms] = useState([]);
  const nextKey = useRef(1);
  const [confirmSignOut, setConfirmSignOut] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const addNewForm = () => {
    setNewForms((prev) => [...prev, nextKey.current]);
    nextKey.current += 1;
  };

  const removeNewForm = (key) => setNewForms((prev) => prev.filter((k) => k !== key));

  // A user with no businesses yet starts with one empty form.
  useEffect(() => {
    if (!businessesLoading && businesses.length === 0 && newForms.length === 0) addNewForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessesLoading, businesses.length]);

  const handleSaved = (saved, key) => {
    setBusinesses((prev) =>
      prev.some((b) => b.id === saved.id)
        ? prev.map((b) => (b.id === saved.id ? saved : b))
        : [...prev, saved]
    );
    if (key) removeNewForm(key);
  };

  const handleDeleted = (id) => setBusinesses((prev) => prev.filter((b) => b.id !== id));

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    navigate("/", { replace: true });
  };

  const closeSignOutDialog = useCallback(() => setConfirmSignOut(false), []);

  return (
    <main className="flex-1 w-full box-border py-8 px-4 sm:px-10 flex justify-center">
      <div className="w-full max-w-5xl">
        <Button
          type="button"
          variant="ghost"
          icon={LuArrowLeft}
          iconPosition="left"
          onClick={() => navigate(-1)}
          className="-ml-4 mb-4"
        >
          Back
        </Button>
        <StepHeader
          eyebrow="Profile"
          title="Your businesses"
          description="The businesses you bill from. Pick one on each invoice to fill in its Bill From details."
          action={
            <div className="flex flex-col items-end gap-1 shrink-0">
              <Button type="button" variant="secondary" icon={LuLogOut} iconPosition="left" onClick={() => setConfirmSignOut(true)}>
                Sign out
              </Button>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          }
        />

        {businessesLoading ? (
          <p className="text-sm text-gray-500">Loading your businesses…</p>
        ) : (
          <div className="flex flex-col gap-6">
            {businesses.map((business) => (
              <PartyCard
                key={business.id}
                party={business}
                api={businessApi}
                withBank
                countries={countries}
                onSaved={(saved) => handleSaved(saved)}
                onDeleted={handleDeleted}
              />
            ))}
            {newForms.map((key) => (
              <PartyCard
                key={`new-${key}`}
                party={{}}
                api={businessApi}
                withBank
                countries={countries}
                onSaved={(saved) => handleSaved(saved, key)}
                onCancel={() => removeNewForm(key)}
              />
            ))}
            <div className="flex justify-start">
              <Button type="button" variant="secondary" icon={LuPlus} iconPosition="left" onClick={addNewForm}>
                Add New Business
              </Button>
            </div>
          </div>
        )}
      </div>
      <ConfirmDialog
        open={confirmSignOut}
        icon={LuLogOut}
        title="Sign out?"
        message={`You'll be signed out of ${user.email}. Your saved businesses stay in your account.`}
        confirmLabel={signingOut ? "Signing out..." : "Sign out"}
        busy={signingOut}
        onConfirm={handleSignOut}
        onCancel={closeSignOutDialog}
      />
    </main>
  );
};

export default Profile;

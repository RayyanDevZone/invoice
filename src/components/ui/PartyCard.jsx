import React, { useState } from "react";
import { LuBuilding2, LuPencil, LuSave, LuTrash2 } from "react-icons/lu";
import Card from "../ui/Card";
import Button from "../ui/Button";
import PartyForm, { statesFor } from "../ui/PartyForm";
import { emptyBusiness, createBusiness, updateBusiness, deleteBusiness } from "../../utils/businesses";
import { validateSender } from "../../utils/validation";

// One business: read-only until "Edit" is pressed. A business without an id
// is new and unsaved, so it starts in edit mode.
const BusinessCard = ({ business, countries, onSaved, onDeleted, onCancelNew }) => {
  const isNew = !business.id;
  const [editing, setEditing] = useState(isNew);
  const [draft, setDraft] = useState({ ...emptyBusiness, ...business });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  // Errors show once a field has been left, or after a save attempt.
  const allErrors = validateSender(draft, {
    stateRequired: Boolean(statesFor(countries, draft.country)),
  });
  const visibleErrors = Object.fromEntries(
    Object.entries(allErrors).filter(([field]) => submitted || touched[field])
  );
  const errorCount = Object.keys(visibleErrors).length;
  const busy = status === "saving" || status === "deleting";

  const handleChange = (_section, field, value) => {
    if (status === "invalid") setStatus("idle");
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => setTouched((prev) => ({ ...prev, [field]: true }));

  const resetForm = () => {
    setTouched({});
    setSubmitted(false);
    setStatus("idle");
    setError("");
  };

  const handleSave = async () => {
    setSubmitted(true);
    if (Object.keys(allErrors).length > 0) {
      setStatus("invalid");
      return;
    }
    setStatus("saving");
    setError("");
    try {
      const saved = isNew ? await createBusiness(draft) : await updateBusiness(business.id, draft);
      onSaved(saved);
      if (!isNew) {
        setDraft(saved);
        setEditing(false);
        resetForm();
      }
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  };

  const handleCancel = () => {
    if (isNew) {
      onCancelNew();
      return;
    }
    setDraft({ ...emptyBusiness, ...business });
    setEditing(false);
    resetForm();
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${business.businessName || business.name || "this business"}"? This can't be undone.`)) return;
    setStatus("deleting");
    setError("");
    try {
      await deleteBusiness(business.id);
      onDeleted(business.id);
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  };

  const editButton = !editing && (
    <Button type="button" variant="secondary" icon={LuPencil} iconPosition="left" onClick={() => setEditing(true)} className="!px-4 !py-2">
      Edit
    </Button>
  );

  return (
    <Card className="overflow-hidden">
      <PartyForm
        title={(editing ? draft.businessName : business.businessName || business.name) || "New business"}
        icon={LuBuilding2}
        section="sender"
        data={editing ? draft : business}
        onChange={handleChange}
        placeholderPrefix="Your"
        errors={visibleErrors}
        onBlur={handleBlur}
        countries={countries}
        readOnly={!editing}
        action={editButton}
        withBusinessName
      />
      {(editing || status === "error") && (
        <div className="flex flex-wrap items-center justify-end gap-3 px-6 pb-5">
          {status === "invalid" && errorCount > 0 && (
            <p className="text-sm font-medium text-red-600 mr-auto">
              Please fix {errorCount === 1 ? "the highlighted field" : `the ${errorCount} highlighted fields`}
            </p>
          )}
          {status === "error" && <p className="text-sm font-medium text-red-600 mr-auto">Something went wrong: {error}</p>}
          {editing && !isNew && (
            <Button type="button" variant="ghost" icon={LuTrash2} iconPosition="left" onClick={handleDelete} disabled={busy} className="!text-red-600 hover:!bg-red-50">
              {status === "deleting" ? "Deleting..." : "Delete"}
            </Button>
          )}
          {editing && (
            <>
              <Button type="button" variant="secondary" onClick={handleCancel} disabled={busy}>
                Cancel
              </Button>
              <Button type="button" icon={LuSave} iconPosition="left" onClick={handleSave} disabled={busy}>
                {status === "saving" ? "Saving..." : "Save"}
              </Button>
            </>
          )}
        </div>
      )}
    </Card>
  );
};

export default BusinessCard;

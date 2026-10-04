import React, { useState } from "react";
import { LuBuilding2, LuPencil, LuSave, LuTrash2, LuX } from "react-icons/lu";
import Card from "./Card";
import Button from "./Button";
import PartyForm, { statesFor } from "./PartyForm";
import ConfirmDialog from "./ConfirmDialog";
import { emptyParty } from "../../utils/parties";
import { validateBank, validateParty } from "../../utils/validation";
import BankForm from "./BankForm";

// One saved business or customer: read-only until "Edit" is pressed. One
// without an id is new and unsaved, so it starts in edit mode.
// `api` is the table's { create, update, remove } functions.
const PartyCard = ({
  party,
  api,
  noun = "business",
  icon = LuBuilding2,
  placeholderPrefix = "Your",
  countries,
  startEditing = false,
  withBank = false,
  onSaved,
  onDeleted,
  onCancel,
}) => {
  const isNew = !party.id;
  const [editing, setEditing] = useState(isNew || startEditing);
  const [draft, setDraft] = useState({ ...emptyParty, ...party });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  // Errors show once a field has been left, or after a save attempt.
  const allErrors = {
    ...validateParty(draft, { stateRequired: Boolean(statesFor(countries, draft.country)) }),
    ...(withBank ? validateBank(draft) : {}),
  };
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
      const saved = isNew ? await api.create(draft) : await api.update(party.id, draft);
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
    // New cards, and cards opened straight into edit mode, let the parent close them.
    if (onCancel) {
      onCancel();
      return;
    }
    setDraft({ ...emptyParty, ...party });
    setEditing(false);
    resetForm();
  };

  const handleDelete = async () => {
    setStatus("deleting");
    setError("");
    try {
      await api.remove(party.id);
      setConfirmingDelete(false);
      onDeleted(party.id);
    } catch (err) {
      setConfirmingDelete(false);
      setError(err.message);
      setStatus("error");
    }
  };

  // Top-right of the card: "Edit" when read-only, a close (same as Cancel) while editing.
  const headerAction = editing ? (
    <button
      type="button"
      onClick={handleCancel}
      disabled={busy}
      aria-label="Close"
      title="Close"
      className="h-9 w-9 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-50 shrink-0"
    >
      <LuX className="text-lg" />
    </button>
  ) : (
    <Button type="button" variant="secondary" icon={LuPencil} iconPosition="left" onClick={() => setEditing(true)} className="!px-4 !py-2">
      Edit
    </Button>
  );

  return (
    <Card className="overflow-hidden">
      <PartyForm
        title={(editing ? draft.businessName : party.businessName || party.name) || `New ${noun}`}
        icon={icon}
        section="sender"
        data={editing ? draft : party}
        onChange={handleChange}
        placeholderPrefix={placeholderPrefix}
        errors={visibleErrors}
        onBlur={handleBlur}
        countries={countries}
        readOnly={!editing}
        action={headerAction}
        withBusinessName
      />
      {withBank && (
        <BankForm
          data={editing ? draft : party}
          onChange={(field, value) => handleChange(null, field, value)}
          readOnly={!editing}
          errors={visibleErrors}
          onBlur={handleBlur}
        />
      )}
      {(editing || status === "error") && (
        <div className="flex flex-wrap items-center justify-end gap-3 px-6 pb-5">
          {status === "invalid" && errorCount > 0 && (
            <p className="text-sm font-medium text-red-600 mr-auto">
              Please fix {errorCount === 1 ? "the highlighted field" : `the ${errorCount} highlighted fields`}
            </p>
          )}
          {status === "error" && <p className="text-sm font-medium text-red-600 mr-auto">Something went wrong: {error}</p>}
          {editing && !isNew && (
            <Button type="button" variant="ghost" icon={LuTrash2} iconPosition="left" onClick={() => setConfirmingDelete(true)} disabled={busy} className="!text-red-600 hover:!bg-red-50">
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
      <ConfirmDialog
        open={confirmingDelete}
        tone="danger"
        icon={LuTrash2}
        title={`Delete ${noun}?`}
        message={`"${party.businessName || party.name || `This ${noun}`}" will be permanently deleted. This can't be undone.`}
        confirmLabel={status === "deleting" ? "Deleting..." : "Delete"}
        busy={status === "deleting"}
        onConfirm={handleDelete}
        onCancel={() => setConfirmingDelete(false)}
      />
    </Card>
  );
};

export default PartyCard;

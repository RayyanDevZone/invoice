import React, { useState } from "react";
import { LuPackage, LuPackagePlus, LuSave, LuX } from "react-icons/lu";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Select from "../ui/Select";
import { TextField } from "../ui/Field";
import { emptyItem, createItem, updateItem } from "../../utils/items";
import { unitOptions } from "../../utils/units";
import { validateItem } from "../../utils/validation";
import { enterToNext } from "../../utils/enterToNext";

// Form for adding a new item to `businessId`, or editing a saved one when `item` has an id.
const ItemForm = ({ item = {}, businessId, onSaved, onCancel }) => {
  const isNew = !item.id;
  const [draft, setDraft] = useState({ ...emptyItem, ...item });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Errors show once a field has been left, or after a save attempt.
  const allErrors = validateItem(draft);
  const visibleErrors = Object.fromEntries(
    Object.entries(allErrors).filter(([field]) => submitted || touched[field])
  );
  const errorCount = Object.keys(visibleErrors).length;

  const setField = (field, value) => setDraft((prev) => ({ ...prev, [field]: value }));
  const touch = (field) => setTouched((prev) => ({ ...prev, [field]: true }));

  const handleSave = async () => {
    setSubmitted(true);
    if (saving || Object.keys(allErrors).length > 0) return;
    setSaving(true);
    setError("");
    try {
      onSaved(isNew ? await createItem(businessId, draft) : await updateItem(item.id, draft));
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  const Icon = isNew ? LuPackagePlus : LuPackage;

  return (
    <Card>
      <div className="py-5 px-6">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 min-w-0">
            <span className="h-8 w-8 rounded-full bg-brand/30 flex items-center justify-center shrink-0">
              <Icon className="text-brand-dark text-base" />
            </span>
            <h3 className="text-gray-900 font-bold text-lg truncate">{draft.name || "New item"}</h3>
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            aria-label="Close"
            title="Close"
            className="h-9 w-9 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-50 shrink-0"
          >
            <LuX className="text-lg" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4" onKeyDown={enterToNext(draft)}>
          <TextField
            label="Item Name"
            data-field="name"
            placeholder="e.g. Cement bag 50kg"
            value={draft.name}
            onChange={(e) => setField("name", e.target.value)}
            onBlur={() => touch("name")}
            error={visibleErrors.name}
          />
          <TextField
            label="HSN / SAC"
            data-field="hsn"
            inputMode="numeric"
            placeholder="e.g. 2523"
            hint="Optional"
            value={draft.hsn}
            onChange={(e) => setField("hsn", e.target.value)}
            onBlur={() => touch("hsn")}
            error={visibleErrors.hsn}
          />
          <TextField
            label="Rate"
            data-field="rate"
            inputMode="decimal"
            placeholder="0.00"
            value={draft.rate}
            onChange={(e) => setField("rate", e.target.value)}
            onBlur={() => touch("rate")}
            error={visibleErrors.rate}
          />
          <Select
            label="Unit"
            name="unit"
            value={draft.unit}
            options={unitOptions}
            placeholder="Select unit"
            searchable={false}
            onChange={(value) => setField("unit", value)}
            onClose={() => touch("unit")}
            error={visibleErrors.unit}
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-end gap-3 px-6 pb-5">
        {submitted && errorCount > 0 && (
          <p className="text-sm font-medium text-red-600 mr-auto">
            Please fix {errorCount === 1 ? "the highlighted field" : `the ${errorCount} highlighted fields`}
          </p>
        )}
        {error && <p className="text-sm font-medium text-red-600 mr-auto">Couldn't save this item: {error}</p>}
        <Button type="button" variant="secondary" onClick={onCancel} disabled={saving}>
          Cancel
        </Button>
        <Button type="button" icon={LuSave} iconPosition="left" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
      </div>
    </Card>
  );
};

export default ItemForm;

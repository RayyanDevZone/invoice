import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuPackage, LuX } from "react-icons/lu";
import { InvoiceContext } from "../../InvoiceContext";
import Card from "../ui/Card";
import StepHeader from "../ui/StepHeader";
import StepFooter from "../ui/StepFooter";
import Select from "../ui/Select";
import { TextField } from "../ui/Field";
import { fetchItems } from "../../utils/items";

// Up to 3 decimal places, so weights like 2.5 Kg or 1.125 Tonne work.
const QUANTITY = /^\d+(\.\d{1,3})?$/;

const quantityError = (quantity) => {
  const value = String(quantity ?? "").trim();
  if (!value) return "Enter a quantity";
  if (!QUANTITY.test(value) || Number(value) <= 0) return "Enter a quantity above 0, up to 3 decimal places";
  return undefined;
};

const lineTotal = (quantity, rate) => Math.round(Number(quantity || 0) * Number(rate || 0) * 100) / 100;

const money = (amount) =>
  Number(amount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Step 3 for signed-in users: invoice lines come from the saved items of the
// business the invoice is billed from. Only the quantity (and an optional
// description) is entered per line; the total is calculated from the rate.
const PickItems = ({ business }) => {
  const navigate = useNavigate();
  const { invoiceData, setInvoiceData } = useContext(InvoiceContext);
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const quantityRefs = useRef({});
  const focusLine = useRef(null);

  const lines = invoiceData.items;
  const businessName = business.businessName || business.name;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError("");
    fetchItems(business.id)
      .then((list) => !cancelled && setSavedItems(list))
      .catch((err) => !cancelled && setLoadError(err.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [business.id]);

  // Put the cursor in the quantity box of a line that was just added.
  useEffect(() => {
    if (focusLine.current !== null) {
      quantityRefs.current[focusLine.current]?.focus();
      focusLine.current = null;
    }
  }, [lines.length]);

  // Every saved item can be picked, including ones already on the invoice.
  const pickerOptions = useMemo(
    () =>
      savedItems.map((item) => ({
        value: item.id,
        label: `${item.name} · ${money(item.rate)} / ${item.unit}`,
      })),
    [savedItems]
  );

  const addLine = (itemId) => {
    const item = savedItems.find((i) => i.id === itemId);
    if (!item) return;
    focusLine.current = lines.length;
    setInvoiceData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          // The same item can be on the invoice more than once, so each line
          // gets its own id.
          lineId: `${item.id}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          itemId: item.id,
          businessId: business.id,
          itemName: item.name,
          hsn: item.hsn,
          rate: item.rate,
          unit: item.unit,
          quantity: "",
          description: "",
          total: 0,
        },
      ],
    }));
  };

  const updateLine = (index, field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.map((line, i) => {
        if (i !== index) return line;
        const next = { ...line, [field]: value };
        if (field === "quantity") next.total = lineTotal(value, line.rate);
        return next;
      }),
    }));
  };

  const removeLine = (index) => {
    setInvoiceData((prev) => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }));
    setTouched({});
  };

  const errors = lines.map((line) => quantityError(line.quantity));
  const hasErrors = errors.some(Boolean);
  const grandTotal = lines.reduce((sum, line) => sum + Number(line.total || 0), 0);

  let nextError = "";
  if (submitted && lines.length === 0) nextError = "Add at least one item to continue";
  else if (submitted && hasErrors) nextError = "Enter a quantity for every item to continue";

  const handleNext = () => {
    setSubmitted(true);
    if (lines.length > 0 && !hasErrors) navigate("/paymentInfo");
  };

  return (
    <div className="w-full max-w-5xl">
      <StepHeader
        eyebrow="Step 3 of 6"
        title="Items"
        description={`Pick from ${businessName}'s saved items and enter the quantity for each.`}
      />

      {lines.length === 0 && (
        <Card className="flex flex-col items-center justify-center text-center py-14 px-6 mb-4">
          <span className="h-12 w-12 rounded-full bg-brand/30 flex items-center justify-center mb-3">
            <LuPackage className="text-brand-dark text-xl" />
          </span>
          <p className="text-gray-700 font-semibold">No items yet</p>
          <p className="text-sm text-gray-400 mt-1">Pick an item below to add it to this invoice.</p>
        </Card>
      )}

      <div className="flex flex-col gap-4">
        {lines.map((line, index) => {
          const error = (submitted || touched[index]) && errors[index];
          return (
            <Card key={line.lineId || index} className="px-6 py-5">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="h-7 w-7 rounded-full bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{line.itemName}</p>
                    {line.hsn && <p className="text-xs text-gray-400">HSN / SAC {line.hsn}</p>}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeLine(index)}
                  aria-label={`Remove ${line.itemName}`}
                  className="h-7 w-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors shrink-0"
                >
                  <LuX className="text-base" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 items-start">
                <div className="flex flex-col gap-1.5">
                  <p className="text-sm font-medium text-gray-600">Rate</p>
                  <p className="py-2.5 text-sm font-semibold text-gray-900">
                    {money(line.rate)} <span className="font-normal text-gray-400">/ {line.unit}</span>
                  </p>
                </div>
                <TextField
                  ref={(el) => (quantityRefs.current[index] = el)}
                  label="Quantity"
                  inputMode="decimal"
                  placeholder="0"
                  suffix={line.unit}
                  inputClassName={line.unit && line.unit.length > 4 ? "!pr-28" : ""}
                  value={line.quantity}
                  onChange={(e) => updateLine(index, "quantity", e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, [index]: true }))}
                  error={error || undefined}
                />
                <TextField
                  label="Description"
                  className="col-span-2 sm:col-span-1"
                  placeholder="Optional"
                  value={line.description || ""}
                  onChange={(e) => updateLine(index, "description", e.target.value)}
                />
                <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1 sm:items-end">
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="py-2.5 text-base font-bold text-gray-900 tabular-nums">
                    {money(line.total)} {invoiceData.currency}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="mt-4 px-6 py-5">
        {loading ? (
          <p className="text-sm text-gray-500">Loading {businessName}'s items…</p>
        ) : loadError ? (
          <p className="text-sm text-red-600">Couldn't load items: {loadError}</p>
        ) : savedItems.length === 0 ? (
          <p className="text-sm text-gray-500">
            {businessName} has no saved items yet.{" "}
            <Link to="/items" state={{ add: true }} className="font-semibold text-gray-900 hover:underline">
              Add items
            </Link>{" "}
            to pick them here.
          </p>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-end gap-3">
            <Select
              label="Add an item"
              className="w-full sm:max-w-md"
              value={null}
              placeholder="Search saved items…"
              options={pickerOptions}
              onChange={addLine}
            />
            <Link to="/items" className="text-sm font-semibold text-gray-600 hover:text-gray-900 hover:underline sm:pb-3">
              Manage items
            </Link>
          </div>
        )}
      </Card>

      {lines.length > 0 && (
        <div className="flex justify-end mt-4">
          <div className="rounded-lg bg-brand/20 px-5 py-3 text-right">
            <p className="text-xs font-medium text-gray-600">Items total</p>
            <p className="text-lg font-bold text-gray-900 tabular-nums">
              {money(grandTotal)} {invoiceData.currency}
            </p>
          </div>
        </div>
      )}

      {nextError && <p className="text-sm font-medium text-red-600 text-right mt-4">{nextError}</p>}
      <StepFooter onBack={() => navigate("/invoice-details")} onNext={handleNext} />
    </div>
  );
};

export default PickItems;

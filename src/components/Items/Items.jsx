import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuArrowLeft, LuPencil, LuPlus, LuSearch, LuTrash2 } from "react-icons/lu";
import Card from "../ui/Card";
import StepHeader from "../ui/StepHeader";
import Button from "../ui/Button";
import ConfirmDialog from "../ui/ConfirmDialog";
import Select from "../ui/Select";
import { InvoiceContext } from "../../InvoiceContext";
import ItemForm from "./ItemForm";
import { fetchItems, deleteItem } from "../../utils/items";

const columns = ["Item", "HSN / SAC", "Rate", "Unit", ""];

const formatRate = (rate) =>
  Number(rate).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const byName = (a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base", numeric: true });

const Items = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { businesses, businessesLoading, selectedBusinessId } = useContext(InvoiceContext);
  // Items are listed per business; start with the one the invoice is billed from.
  const [businessId, setBusinessId] = useState(selectedBusinessId);
  const business = businesses.find((b) => b.id === businessId) || businesses[0] || null;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [query, setQuery] = useState("");
  // The item being edited, "new" while adding one, or null.
  const [editingId, setEditingId] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    setItems([]);
    setLoadError("");
    if (!business) {
      setLoading(businessesLoading);
      return;
    }
    setLoading(true);
    fetchItems(business.id)
      .then((list) => !cancelled && setItems(list))
      .catch((err) => !cancelled && setLoadError(err.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [business?.id, businessesLoading]);

  const switchBusiness = (id) => {
    setBusinessId(id);
    setEditingId(null);
    setQuery("");
  };

  // The navbar's "Add Items" button opens this page with the form ready. The
  // flag is cleared afterwards so a page refresh doesn't reopen the form.
  useEffect(() => {
    if (!location.state?.add) return;
    setEditingId("new");
    navigate(location.pathname, { replace: true, state: null });
  }, [location.key, location.state, location.pathname, navigate]);

  useEffect(() => {
    if (editingId) formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [editingId]);

  const editingItem = items.find((i) => i.id === editingId);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = q
      ? items.filter((i) => [i.name, i.hsn, i.unit].some((v) => (v || "").toLowerCase().includes(q)))
      : items;
    return [...matches].sort(byName);
  }, [items, query]);

  const handleSaved = (saved) => {
    setItems((prev) =>
      prev.some((i) => i.id === saved.id) ? prev.map((i) => (i.id === saved.id ? saved : i)) : [...prev, saved]
    );
    setEditingId(null);
  };

  const handleDelete = async () => {
    setDeleting(true);
    setDeleteError("");
    try {
      await deleteItem(pendingDelete.id);
      setItems((prev) => prev.filter((i) => i.id !== pendingDelete.id));
      if (editingId === pendingDelete.id) setEditingId(null);
    } catch (err) {
      setDeleteError(err.message);
    }
    setDeleting(false);
    setPendingDelete(null);
  };

  const closeDeleteDialog = useCallback(() => setPendingDelete(null), []);

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
          eyebrow="Items"
          title="Your items"
          description="Products and services you sell, saved with their HSN / SAC code, rate and unit. Each business has its own list."
          action={
            business && editingId !== "new" && (
              <Button type="button" icon={LuPlus} iconPosition="left" onClick={() => setEditingId("new")} className="shrink-0">
                Add Item
              </Button>
            )
          }
        />

        {!businessesLoading && !business ? (
          <Card className="px-6 py-10 text-center">
            <p className="text-sm text-gray-500">
              Items are saved per business.{" "}
              <Link to="/profile" className="font-semibold text-gray-900 hover:underline">
                Add a business in your profile
              </Link>{" "}
              first.
            </p>
          </Card>
        ) : (
          <>
            {businesses.length > 1 && (
              <Card className="mb-6 py-5 px-6">
                <Select
                  label="Business"
                  className="w-full sm:max-w-sm"
                  value={business?.id}
                  onChange={switchBusiness}
                  searchable={businesses.length > 6}
                  options={businesses.map((b) => ({ value: b.id, label: b.businessName || b.name || "Unnamed business" }))}
                />
              </Card>
            )}

            {editingId && business && (
              <div ref={formRef} className="mb-6 scroll-mt-6">
                <ItemForm
                  key={`${business.id}-${editingId}`}
                  businessId={business.id}
                  item={editingItem}
                  onSaved={handleSaved}
                  onCancel={() => setEditingId(null)}
                />
              </div>
            )}

            <Card className="overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-700">
                  {items.length} {items.length === 1 ? "item" : "items"}
                  {business && <span className="font-normal text-gray-500"> for {business.businessName || business.name}</span>}
                </p>
                <div className="flex items-center gap-2 w-full sm:w-72 border border-gray-300 rounded-lg px-3 py-2 focus-within:border-brand-dark focus-within:ring-2 focus-within:ring-brand/30">
                  <LuSearch className="text-gray-400 text-sm shrink-0" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search items…"
                    aria-label="Search items"
                    className="w-full text-sm focus:outline-none placeholder:text-gray-400 placeholder:font-normal font-semibold text-gray-900"
                  />
                </div>
              </div>

              {deleteError && <p className="px-6 pt-4 text-sm font-medium text-red-600">Couldn't delete: {deleteError}</p>}

              {loading ? (
                <p className="px-6 py-10 text-center text-sm text-gray-500">Loading your items…</p>
              ) : loadError ? (
                <p className="px-6 py-10 text-center text-sm text-red-600">Couldn't load your items: {loadError}</p>
              ) : items.length === 0 ? (
                <p className="px-6 py-10 text-center text-sm text-gray-500">
                  No items saved for {business?.businessName || "this business"} yet. Add one to reuse it on its invoices.
                </p>
              ) : filtered.length === 0 ? (
                <p className="px-6 py-10 text-center text-sm text-gray-500">No items match "{query}".</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-left">
                        {columns.map((col) => (
                          <th
                            key={col}
                            className={`px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-500 ${col === "Rate" ? "text-right" : ""}`}
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((item) => (
                        <tr
                          key={item.id}
                          className={`border-t border-gray-100 ${item.id === editingId ? "bg-brand/10" : "hover:bg-gray-50"}`}
                        >
                          <td className="px-6 py-3 font-semibold text-gray-900">{item.name}</td>
                          <td className="px-6 py-3 text-gray-700 font-mono text-xs">{item.hsn || "—"}</td>
                          <td className="px-6 py-3 text-gray-700 text-right tabular-nums">{formatRate(item.rate)}</td>
                          <td className="px-6 py-3 text-gray-700">{item.unit || "—"}</td>
                          <td className="px-6 py-3">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                type="button"
                                onClick={() => setEditingId(item.id)}
                                aria-label={`Edit ${item.name}`}
                                title="Edit"
                                className="h-8 w-8 flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                              >
                                <LuPencil />
                              </button>
                              <button
                                type="button"
                                onClick={() => setPendingDelete(item)}
                                aria-label={`Delete ${item.name}`}
                                title="Delete"
                                className="h-8 w-8 flex items-center justify-center rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50"
                              >
                                <LuTrash2 />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </>
        )}
      </div>
      <ConfirmDialog
        open={Boolean(pendingDelete)}
        tone="danger"
        icon={LuTrash2}
        title="Delete item?"
        message={`"${pendingDelete?.name}" will be permanently deleted. This can't be undone.`}
        confirmLabel={deleting ? "Deleting..." : "Delete"}
        busy={deleting}
        onConfirm={handleDelete}
        onCancel={closeDeleteDialog}
      />
    </main>
  );
};

export default Items;

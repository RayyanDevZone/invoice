import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuArrowLeft, LuPencil, LuPlus, LuSearch, LuTrash2, LuUser, LuUserPlus } from "react-icons/lu";
import { InvoiceContext } from "../../InvoiceContext";
import Card from "../ui/Card";
import StepHeader from "../ui/StepHeader";
import Button from "../ui/Button";
import PartyCard from "../ui/PartyCard";
import ConfirmDialog from "../ui/ConfirmDialog";
import { useCountries } from "../ui/PartyForm";
import { customerApi } from "../../utils/customers";

const columns = ["Business", "Contact", "Email", "Phone", "Location", "GSTIN", ""];

const locationOf = (c) => [c.city, c.state, c.country].filter(Boolean).join(", ");

const Customers = () => {
  const { customers, setCustomers, selectedCustomerId, setSelectedCustomerId } = useContext(InvoiceContext);
  const navigate = useNavigate();
  const countries = useCountries();
  const [query, setQuery] = useState("");
  // The customer being edited, "new" while adding one, or null.
  const [editingId, setEditingId] = useState(null);
  // The customer waiting for delete confirmation, and whether it's being deleted.
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef(null);

  const editingCustomer = customers.find((c) => c.id === editingId);

  useEffect(() => {
    if (editingId) formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [editingId]);

  // Matching customers, A–Z by business name (contact name when there isn't one).
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = q
      ? customers.filter((c) =>
          [c.businessName, c.name, c.email, c.phone, locationOf(c), c.gstReg].some((v) =>
            (v || "").toLowerCase().includes(q)
          )
        )
      : customers;
    const sortName = (c) => (c.businessName || c.name || "").trim();
    return [...matches].sort((a, b) =>
      sortName(a).localeCompare(sortName(b), undefined, { sensitivity: "base", numeric: true })
    );
  }, [customers, query]);

  const handleSaved = (saved) => {
    setCustomers((prev) =>
      prev.some((c) => c.id === saved.id) ? prev.map((c) => (c.id === saved.id ? saved : c)) : [...prev, saved]
    );
    setEditingId(null);
  };

  const handleDeleted = (id) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    if (selectedCustomerId === id) setSelectedCustomerId(null);
    setEditingId(null);
  };

  const handleDelete = async () => {
    setDeleting(true);
    setError("");
    try {
      await customerApi.remove(pendingDelete.id);
      handleDeleted(pendingDelete.id);
    } catch (err) {
      setError(err.message);
    }
    setDeleting(false);
    setPendingDelete(null);
  };

  const closeDeleteDialog = useCallback(() => setPendingDelete(null), []);

  return (
    <main className="flex-1 w-full box-border py-8 px-4 sm:px-10 flex justify-center">
      <div className="w-full max-w-6xl">
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
          eyebrow="Customers"
          title="Your customers"
          description="Everyone you bill. Pick one on step 1 of an invoice to fill in its Bill To details."
          action={
            editingId !== "new" && (
              <Button type="button" icon={LuPlus} iconPosition="left" onClick={() => setEditingId("new")} className="shrink-0">
                Add New Customer
              </Button>
            )
          }
        />

        {editingId && (
          <div ref={formRef} className="mb-6 scroll-mt-6">
            <PartyCard
              key={editingId}
              party={editingCustomer || {}}
              api={customerApi}
              noun="customer"
              icon={editingCustomer ? LuUser : LuUserPlus}
              placeholderPrefix="Customer"
              countries={countries}
              startEditing
              onSaved={handleSaved}
              onDeleted={handleDeleted}
              onCancel={() => setEditingId(null)}
            />
          </div>
        )}

        <Card className="overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-700">
              {customers.length} {customers.length === 1 ? "customer" : "customers"}
            </p>
            <div className="flex items-center gap-2 w-full sm:w-72 border border-gray-300 rounded-lg px-3 py-2 focus-within:border-brand-dark focus-within:ring-2 focus-within:ring-brand/30">
              <LuSearch className="text-gray-400 text-sm shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search customers…"
                aria-label="Search customers"
                className="w-full text-sm focus:outline-none placeholder:text-gray-400 placeholder:font-normal font-semibold text-gray-900"
              />
            </div>
          </div>

          {error && <p className="px-6 pt-4 text-sm font-medium text-red-600">Couldn't delete: {error}</p>}

          {customers.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm text-gray-500">
              You haven't saved any customers yet. Add one to reuse it on your invoices.
            </p>
          ) : filtered.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm text-gray-500">No customers match "{query}".</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    {columns.map((col) => (
                      <th key={col} className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr
                      key={c.id}
                      className={`border-t border-gray-100 ${c.id === editingId ? "bg-brand/10" : "hover:bg-gray-50"}`}
                    >
                      <td className="px-6 py-3 font-semibold text-gray-900">{c.businessName || "—"}</td>
                      <td className="px-6 py-3 text-gray-700">{c.name || "—"}</td>
                      <td className="px-6 py-3 text-gray-700 break-all">{c.email || "—"}</td>
                      <td className="px-6 py-3 text-gray-700 whitespace-nowrap">{c.phone || "—"}</td>
                      <td className="px-6 py-3 text-gray-700">{locationOf(c) || "—"}</td>
                      <td className="px-6 py-3 text-gray-700 font-mono text-xs">{c.gstReg || "—"}</td>
                      <td className="px-6 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => setEditingId(c.id)}
                            aria-label={`Edit ${c.businessName || c.name}`}
                            title="Edit"
                            className="h-8 w-8 flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                          >
                            <LuPencil />
                          </button>
                          <button
                            type="button"
                            onClick={() => setPendingDelete(c)}
                            aria-label={`Delete ${c.businessName || c.name}`}
                            title="Delete"
                            className="h-8 w-8 flex items-center justify-center rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 disabled:opacity-50"
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
      </div>
      <ConfirmDialog
        open={Boolean(pendingDelete)}
        tone="danger"
        icon={LuTrash2}
        title="Delete customer?"
        message={`"${pendingDelete?.businessName || pendingDelete?.name || "This customer"}" will be permanently deleted. This can't be undone.`}
        confirmLabel={deleting ? "Deleting..." : "Delete"}
        busy={deleting}
        onConfirm={handleDelete}
        onCancel={closeDeleteDialog}
      />
    </main>
  );
};

export default Customers;

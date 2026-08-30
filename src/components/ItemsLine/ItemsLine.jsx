import React, { useContext } from "react";
import { LuPlus, LuX, LuPackage } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { InvoiceContext } from "../../InvoiceContext";
import Card from "../ui/Card";
import StepHeader from "../ui/StepHeader";
import StepFooter from "../ui/StepFooter";
import Button from "../ui/Button";
import Select from "../ui/Select";
import { TextField, TextAreaField } from "../ui/Field";

const unitOptions = ["Kg", "Piece/Pieces", "Bag", "Box", "Quintal", "Tonne", "Bundle"].map((u) => ({
  value: u,
  label: u,
}));

const ItemsLine = () => {
  const navigate = useNavigate();
  const { invoiceData, setInvoiceData } = useContext(InvoiceContext);

  const handleInputChange = (index, field, value) => {
    const newItems = [...invoiceData.items];
    newItems[index][field] = value;
    if (field === 'quantity' || field === 'rate') {
      newItems[index].total = newItems[index].quantity * newItems[index].rate;
    }
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { itemName: '', quantity: '', rate: '', hsn: '', total: 0, unit: 'Kg', description: '' }]
    });
  };

  const removeItem = (index) => {
    const newItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  return (
    <div className="w-full max-w-5xl">
      <StepHeader
        eyebrow="Step 3 of 6"
        title="Items"
        description="Add every line item that should appear on the invoice."
      />

      {invoiceData.items.length === 0 && (
        <Card className="flex flex-col items-center justify-center text-center py-14 px-6 mb-4">
          <span className="h-12 w-12 rounded-full bg-brand/30 flex items-center justify-center mb-3">
            <LuPackage className="text-brand-dark text-xl" />
          </span>
          <p className="text-gray-700 font-semibold">No items yet</p>
          <p className="text-sm text-gray-400 mt-1">Add your first line item to get started.</p>
        </Card>
      )}

      <div className="flex flex-col gap-4">
        {invoiceData.items.map((item, index) => (
          <Card key={index} className="px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <span className="h-7 w-7 rounded-full bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center shrink-0">
                  {index + 1}
                </span>
                <p className="text-sm font-bold text-gray-900">
                  {item.itemName || `Item ${index + 1}`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeItem(index)}
                aria-label="Remove item"
                className="h-7 w-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <LuX className="text-base" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <TextField
                label="Name"
                className="col-span-2 sm:col-span-1"
                placeholder="Item name"
                required
                value={item.itemName}
                onChange={(e) => handleInputChange(index, 'itemName', e.target.value)}
              />
              <TextField
                label="Quantity"
                type="number"
                placeholder="0"
                required
                value={item.quantity}
                onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                inputClassName="no-spinners"
              />
              <Select
                label="Unit"
                value={item.unit}
                onChange={(value) => handleInputChange(index, 'unit', value)}
                options={unitOptions}
                searchable={false}
              />
              <TextField
                label="Rate"
                type="number"
                placeholder="0"
                required
                value={item.rate}
                onChange={(e) => handleInputChange(index, 'rate', e.target.value)}
                inputClassName="no-spinners"
              />
              <TextField
                label="HSN Code"
                type="number"
                placeholder="0"
                value={item.hsn}
                onChange={(e) => handleInputChange(index, 'hsn', e.target.value)}
                inputClassName="no-spinners"
              />
            </div>

            <TextAreaField
              label="Description"
              className="mt-3"
              rows="2"
              placeholder="Item description (optional)"
              value={item.description || ''}
              onChange={(e) => handleInputChange(index, 'description', e.target.value)}
            />

            <div className="flex justify-end mt-3">
              <div className="rounded-lg bg-gray-50 px-4 py-2 text-right">
                <p className="text-xs font-medium text-gray-400">Total</p>
                <p className="text-base font-bold text-gray-900">
                  {Number(item.total || 0).toFixed(2)} {invoiceData.currency}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Button variant="secondary" icon={LuPlus} iconPosition="left" onClick={addItem} className="mt-4 self-start">
        Add a new item
      </Button>

      <StepFooter onBack={() => navigate("/invoice-details")} onNext={() => navigate("/paymentInfo")} />
    </div>
  );
};

export default ItemsLine;

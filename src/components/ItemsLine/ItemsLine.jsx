import React, { useContext } from "react";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import { InvoiceContext } from "../../InvoiceContext"; // Import the context

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
      items: [...invoiceData.items, { itemName: '', quantity: '', rate: '', hsn: '', total: 0, unit: 'Kg' }]
    });
  };

  const removeItem = (index) => {
    const newItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  return (
    <div className="min-h-screen h-auto w-full rounded-t-xl box-border py-5 px-4 text-white flex flex-col bg-[#020817] items-left font-lexend">
      {invoiceData.items.map((item, index) => (
        <div key={index} className="sm:w-[85%] h-[70%] bg-slate-800 border border-slate-500 justify-between flex flex-col rounded-lg px-8 py-4 mb-4">
          <p className="text-md font-bold text-white flex flex-row w-full justify-between">
            {item.itemName || `#${index + 1}-NAME`}
            <div className="text-xl cursor-pointer" onClick={() => removeItem(index)}>
              <RxCross2 />
            </div>
          </p>
          <div className="flex flex-row w-full flex-wrap items-center justify-between">
            <div className="flex flex-col items-left gap-2 mt-3">
              <label htmlFor={`item-name-${index}`} className="text-sm font-bold   text-white w-20">Name :</label>
              <input
                type="text"
                id={`item-name-${index}`}
                placeholder="Item name"
                required
                value={item.itemName}
                onChange={(e) => handleInputChange(index, 'itemName', e.target.value)}
                className="bg-[#020817] rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-40"
              />
            </div>
            <div className="flex flex-col items-left gap-2 mt-3">
              <label htmlFor={`item-quantity-${index}`} className="text-sm font-bold text-white w-20">Quantity:</label>
              <input
                type="number"
                id={`item-quantity-${index}`}
                placeholder="0"
                required
                value={item.quantity}
                onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                className="bg-[#020817] rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-40 no-spinners"
              />
            </div>
            <div className="flex flex-col items-left gap-2 mt-3">
              <label htmlFor={`item-unit-${index}`} className="text-sm font-bold text-white w-20">Unit:</label>
              <select
                id={`item-unit-${index}`}
                value={item.unit}
                onChange={(e) => handleInputChange(index, 'unit', e.target.value)}
                className="bg-[#020817] rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-40"
              >
                <option value="Kg">Kg</option>
                <option value="Piece/Pieces">Piece/Pieces</option>
                <option value="Bag">Bag</option>
                <option value="Box">Box</option>
                <option value="Quintal">Quintal</option>
                <option value="Tonne">Tonne</option>
                <option value="Bundle">Bundle</option>
              </select>
            </div>
            <div className="flex flex-col items-left gap-2 mt-3">
              <label htmlFor={`item-rate-${index}`} className="text-sm font-bold text-white w-20">Rate :</label>
              <input
                type="number"
                id={`item-rate-${index}`}
                placeholder="0"
                required
                value={item.rate}
                onChange={(e) => handleInputChange(index, 'rate', e.target.value)}
                className="bg-[#020817] rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-40 no-spinners"
              />
            </div>
            <div className="flex flex-col items-left gap-2 mt-3">
              <label htmlFor={`item-hsn-${index}`} className="text-sm font-bold text-white w-20">HSN Code :</label>
              <input
                type="number"
                id={`item-hsn-${index}`}
                placeholder="0"
                required
                value={item.hsn}
                onChange={(e) => handleInputChange(index, 'hsn', e.target.value)}
                className="bg-[#020817] rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-40 no-spinners"
              />
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <p className="text-sm font-bold text-white">Total</p>
            <p className="text-lg my-2 font-bold text-white">{item.total.toFixed(2)} {invoiceData.currency}</p>

          </div>
          <div className="flex flex-col">
            <label htmlFor={`item-description-${index}`}>Description:</label>
            <textarea
              id={`item-description-${index}`}
              rows="4"
              cols="50"
              placeholder="Item Description"
              className="bg-[#020817] rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-80"
            ></textarea>
          </div>
        </div>
      ))}
      <button
        className="flex flex-row items-center justify-center py-2 text-sm font-bold font-lexend mt-4 rounded-lg bg-white text-black w-[50%]"
        onClick={addItem}
      >
        <FaPlus className="mx-2 text-sm" />
        Add a new item
      </button>
      <div className="flex flex-row w-auto justify-end ">
        <button
          type="button"
          onClick={() => navigate("/invoice-details")}
          className="bg-white hover:bg-zinc-200 mt-12 w-36 flex justify-around items-center text-[#020817] font-bold py-2 px-4 rounded"
        >
          <GrFormPreviousLink className="text-2xl" /> Back
        </button>
        <button
          type="button"
          onClick={() => navigate("/paymentInfo")}
          className="bg-white hover:bg-zinc-200 mt-12 w-36 mx-4 flex justify-around items-center text-[#020817] font-bold py-2 px-4 rounded"
        >
          Next <GrFormNextLink className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default ItemsLine;

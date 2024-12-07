import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

const ItemsLine = () => {
  const navigate = useNavigate();
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [rate, setRate] = useState('');
  const [total, setTotal] = useState(0);

  const handleItemNameChange = (e) => setItemName(e.target.value);
  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);
    setTotal(newQuantity * rate);
  };

  const handleRateChange = (e) => {
    const newRate = e.target.value;
    setRate(newRate);
    setTotal(newRate * quantity);
  };

  return (
    <div className="h-screen w-full rounded-t-xl box-border py-5 px-4 text-white flex flex-col bg-[#020817] items-left">
      <div className="w-[85%] h-[70%] bg-slate-800 border border-slate-500 justify-between flex flex-col rounded-lg px-8 py-4">
        <p className="text-md font-poppins font-bold text-white">{itemName || '#1-NAME'}</p>
        <div className="flex flex-row w-[70%] items-center justify-between">
          <div className="flex flex-col items-left gap-2 mt-3">
            <label
              htmlFor="item-name"
              className="text-sm font-poppins font-bold text-white w-20"
            >
              Name :
            </label>
            <input
              type="text"
              id="item-name"
              placeholder="Item name"
              required
              value={itemName}
              onChange={handleItemNameChange}
              className="bg-[#020817] rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-40 placeholder:font-montserrat"
            />
          </div>
          <div className="flex flex-col items-left gap-2 mt-3">
            <label
              htmlFor="item-quantity"
              className="text-sm font-poppins font-bold text-white w-20"
            >
              Quantity:
            </label>
            <input
              type="number"
              id="item-quantity"
              placeholder="0"
              required
              value={quantity}
              onChange={handleQuantityChange}
              className="bg-[#020817] rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-40 placeholder:font-montserrat"
            />
          </div>
          <div className="flex flex-col items-left gap-2 mt-3">
            <label
              htmlFor="item-rate"
              className="text-sm font-poppins font-bold text-white w-20"
            >
              Rate :
            </label>
            <input
              type="number"
              id="item-rate"
              placeholder="0"
              required
              value={rate}
              onChange={handleRateChange}
              className="bg-[#020817] rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-40 placeholder:font-montserrat"
            />
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-sm font-poppins font-bold text-white">Total</p>
          <p className="text-lg font-poppins font-bold text-white">{total.toFixed(2)} INR</p>
        </div>
        <div className="flex flex-col">
          <label>Description:</label>
          <textarea
            rows="4"
            cols="50"
            placeholder="Item Description"
            className="bg-[#020817] rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-80 placeholder:font-montserrat"
          ></textarea>
        </div>
      </div>
      <button
        className="flex flex-row items-center justify-center py-2 text-sm font-bold font-raleway mt-4 rounded-lg bg-white text-black w-[50%]"
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

import React from "react";

const ItemsLine = () => {
  return (
    <div className="h-screen w-full rounded-t-xl box-border py-5 px-4  text-white flex flex-col bg-[#020817]  items-left">
      <div className="w-[85%] h-[70%] bg-slate-800 border border-slate-500 justify-between flex flex-col rounded-lg px-8 py-4">
        <p className="text-md font-poppins font-bold text-white">#1-NAME</p>
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
              className="bg-[#020817]  rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-40  placeholder:font-montserrat"
            />
          </div>
          <div className="flex flex-col items-left gap-2 mt-3">
            <label
              htmlFor="item-name"
              className="text-sm font-poppins font-bold text-white w-20"
            >
              Quantity:
            </label>
            <input
              type="text"
              id="item-name"
              placeholder="0"
              required
              className="bg-[#020817]  rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-40  placeholder:font-montserrat"
            />
          </div>
          <div className="flex flex-col items-left gap-2 mt-3">
            <label
              htmlFor="item-name"
              className="text-sm font-poppins font-bold text-white w-20"
            >
              Rate :
            </label>
            <input
              type="text"
              id="item-name"
              placeholder="0"
              required
              className="bg-[#020817]  rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-40  placeholder:font-montserrat"
            />
          </div>
        </div>
        <div className=" flex flex-col mt-4">
          <p className="text-sm font-poppins font-bold text-white">Total</p>
          <p className="text-lg font-poppins font-bold text-white"> 0.00 INR</p>
        </div>
        <div className="flex flex-col">
          <label>Description:</label>
          <textarea
            rows="4"
            cols="50"
            placeholder="Item Description"
      className="bg-[#020817]  rounded p-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 w-80  placeholder:font-montserrat"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ItemsLine;

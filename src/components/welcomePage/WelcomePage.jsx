import React from "react";
import { useNavigate } from "react-router-dom";

import { FaLocationArrow } from "react-icons/fa";
const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full text-5xl bg-zinc-900 text-white flex  flex-col font-lexend justify-center items-center">
      <h1 className="my-4 font-bold ">Welcome </h1>
      <h2 className="text-3xl">To</h2>
      <h1 className="my-4">Bill Ease</h1>
      <button 
        onClick={() => navigate('/login')}
        className="bg-zinc-100 text-xl text-black rounded-md w-[200px] px-8 py-2 flex justify-between items-center my-4"
      >
        {" "}
        Continue <FaLocationArrow />
      </button>
    </div>
  );
};

export default WelcomePage;

import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";

export default function SuccessMsg({ text }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 ">
      <div
        className={`flex flex-row justify-start items-center border-2 border-success bg-[white] p-4 py-2 animate-fade`}
      >
        <AiFillCheckCircle className="text-success text-2xl" />
        <p className="text-darkgrey text-sm ml-4">{text}</p>
      </div>
    </div>
  );
}

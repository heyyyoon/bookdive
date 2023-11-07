import React from "react";
import { PiWarningCircleFill } from "react-icons/pi";

export default function WarningBottom({ text }) {
  return (
    <div className="absolute -bottom-12 left-1/2 animate-rltBottom z-10">
      <div
        className={`flex flex-row justify-start items-center border-warning border-2 bg-white p-4 py-2 `}
      >
        <PiWarningCircleFill className="text-warning text-2xl" />
        <p className="text-medigrey text-sm ml-4">{text}</p>
      </div>
    </div>
  );
}

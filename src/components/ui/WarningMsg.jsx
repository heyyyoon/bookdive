import React from "react";
import { PiWarningCircleFill } from "react-icons/pi";

export default function WarningMsg({ text }) {
  return (
    <div className="fixed top-2 z-10 animate-rltTop">
      <div
        className={`flex flex-row justify-start items-center border-warning border-2 bg-white p-4 py-2 `}
      >
        <PiWarningCircleFill className="text-warning text-2xl" />
        <p className="text-medigrey text-sm ml-4">{text}</p>
      </div>
    </div>
  );
}

import React from "react";

export default function NofityMsg({ children, borderColor }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 ">
      <div
        className={`flex flex-row justify-start items-center border-2 ${borderColor} bg-[white] p-4 py-2 animate-fade`}
      >
        {children}
      </div>
    </div>
  );
}

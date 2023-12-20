import React from "react";

export default function Modal({ children }) {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
      <div className={`w-[50%] max-w-sm animate-fade rounded-2xl bg-white px-8 py-4 shadow-modal`}>
        {children}
      </div>
    </div>
  );
}

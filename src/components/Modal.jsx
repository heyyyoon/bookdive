import React from "react";

export default function Modal({ children, size }) {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className={`${size} rounded-2xl max-w-md bg-white px-8 py-4 shadow-modal`}>
        {children}
      </div>
    </div>
  );
}

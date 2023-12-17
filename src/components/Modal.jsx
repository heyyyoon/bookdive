import React from "react";

export default function Modal({ children, styles }) {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className={`${styles} rounded-2xl max-w-md bg-white px-8 py-4 shadow-modal`}>
        {children}
      </div>
    </div>
  );
}

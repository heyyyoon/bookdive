import React from "react";
import { IoIosCloseCircleOutline } from 'react-icons/io';

export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[60%] lg:w-[40%] rounded-2xl max-w-md bg-white px-8 py-4 z-10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]">
        <div className="flex justify-end">
          <IoIosCloseCircleOutline
            className="text-3xl text-zinc-600 cursor-pointer hover:text-red-400"
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </div>
  );
}

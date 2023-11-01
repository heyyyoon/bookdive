import React from "react";
import { FaBackspace } from "react-icons/fa";

export default function Back({ onClick }) {
  return (
    <div
      className="flex items-center text-darkgrey hover:text-[#d88181] cursor-pointer"
      onClick={onClick}
    >
      <FaBackspace className="text-xl" />
      <p className="ml-1 text-sm">back</p>
    </div>
  );
}

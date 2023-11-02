import React from "react";
import { BiSolidAddToQueue } from "react-icons/bi";

export default function ButtonAddPost() {
  return (
    <div className="flex flex-row items-center justify-center cursor-pointer">
      <BiSolidAddToQueue className="text-3xl text-[#463d19]" />
      <p className="ml-1 text-sm">Post</p>
  </div>
  );
}

import React from "react";
import { BiSolidAddToQueue } from "react-icons/bi";

export default function ButtonAddPost() {
  return (
    <div className="flex flex-row items-center justify-center cursor-pointer">
      <BiSolidAddToQueue className="text-3xl text-[#463d19]" />
      <p className="text-medigrey ml-1 text-base font-semibold">Post</p>
  </div>
  );
}

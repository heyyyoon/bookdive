import React from "react";
import { PiWarningCircleFill } from "react-icons/pi";

const TOP_CLASS = " top-2 animate-rltTop";
const BOTTOM_CLASS = "top-20 animate-rltBottom";

export default function WarningMsg({ text, state}) {
  const dialogPosition = state === 'Top' ? TOP_CLASS : BOTTOM_CLASS;
  return (
    <div className={`fixed left-1/2 translate-x-[-50%] z-10 ${dialogPosition}`}>
      <div
        className="flex flex-row justify-start items-center border-warning border-2 bg-white p-4 py-2"
      >
        <PiWarningCircleFill className="text-warning text-2xl" />
        <p className="text-medigrey text-sm ml-4">{text}</p>
      </div>
    </div>
  );
}

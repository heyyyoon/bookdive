import React from "react";
import NofityMsg from "./NofityMsg";
import { PiWarningCircleFill } from "react-icons/pi";

export default function WarningMsg({ text }) {
  return (
    <NofityMsg borderColor="border-warning">
      <PiWarningCircleFill className='text-warning text-2xl'/>
      <p className="text-medigrey text-sm ml-4">{text}</p>
    </NofityMsg>
  );
}

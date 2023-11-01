import React from "react";
import { PiWarningCircleFill } from "react-icons/pi";
import NofityMsg from "./NofityMsg";

export default function WarningMsg({ text }) {
  return (
    <NofityMsg borderColor="border-warning">
      <PiWarningCircleFill className='text-warning text-2xl'/>
      <p className="text-medigrey text-sm ml-4">{text}</p>
    </NofityMsg>
  );
}

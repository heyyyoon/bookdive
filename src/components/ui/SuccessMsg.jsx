import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import NofityMsg from "./NofityMsg";

export default function SuccessMsg({ text }) {
  return (
    <NofityMsg borderColor="border-success">
      <AiFillCheckCircle className="text-success text-2xl" />
      <p className="text-darkgrey text-sm ml-4">{text}</p>
    </NofityMsg>
  );
}

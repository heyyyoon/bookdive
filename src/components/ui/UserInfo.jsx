import React from "react";
import { ImProfile } from "react-icons/im";

export default function UserInfo({nickname}) {
  return (
    <div className="flex flex-row items-center">
      <ImProfile />
      <p className="text-lg font-semibold ml-1 text-zinc-800">{nickname}</p>
    </div>
  );
}

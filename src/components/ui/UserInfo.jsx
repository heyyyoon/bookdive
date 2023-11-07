import React from "react";
import { ImProfile } from "react-icons/im";

export default function UserInfo({nickname}) {
  return (
    <div className="flex flex-row items-center">
      <ImProfile className="text-3xl text-darkgrey"/>
      <p className="text-2xl font-semibold ml-1 text-medigrey">{nickname}</p>
    </div>
  );
}

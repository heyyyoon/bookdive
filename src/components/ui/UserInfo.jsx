import React from "react";
import { SiGooglehome } from "react-icons/si";

export default function UserInfo({ nickname }) {
  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-row items-end">
        <SiGooglehome className="text-4xl text-[#574240]" />
        <p className="text-2xl font-semibold ml-2 text-medigrey">MYPAGE</p>
      </div>
      <div className="flex flex-row mt-5">
      <p className="text-xl font-semibold text-medigrey">안녕하세요,</p>
        <p className="text-xl font-semibold text-medigrey ml-1">{nickname}</p>
        <p className="text-xl font-semibold ml-1 text-medigrey">님</p>
      </div>
    </div>
  );
}

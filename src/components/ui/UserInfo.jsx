import React from "react";
import { SiGooglehome } from "react-icons/si";

const TEXT_CLASS = "text-xl font-semibold ml-1 text-medigrey";
export default function UserInfo({ nickname, onClick }) {
  return (
    <div className="flex flex-col items-start" onClick={onClick}>
      <div className="flex flex-row items-start">
        <SiGooglehome className="text-3xl text-[#8ecc88]" />
        <p className="text-2xl font-bold ml-2 text-medigrey">MYPAGE</p>
      </div>
      <div className="flex flex-row mt-5">
      <p className={TEXT_CLASS}>안녕하세요,</p>
        <p className={`${TEXT_CLASS} ml-1`}>{nickname}</p>
        <p className={TEXT_CLASS}>님</p>
      </div>
    </div>
  );
}

import React from "react";
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";

export default function Wording() {
  return (
    <div className="w-[80%] flex flex-col items-center border-y-2 py-10 mx-auto mt-10 max-w-basic">
      <div className="flex flex-row`">
        <BiSolidQuoteAltLeft />
        <h1 className="text-3xl text-darkgrey mx-3">
          흐르며 스스로 맑아지는 저 강물처럼
        </h1>
        <BiSolidQuoteAltRight />
      </div>
      <p className="mt-2 text-medigrey">
        {"박승오, 홍숭완 <위대한 멈춤 (삶을 바꿀 자유의 시간)>"}
      </p>
    </div>
  );
}

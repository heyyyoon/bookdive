import React from "react";
import { useNavigate } from "react-router-dom";

export default function BookCard({
  bookInfo,
  bookInfo: { title, contents, authors, thumbnail, bookId },
  rank,
}) {
 
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-r from-[#EEEEEE] to-[#a78d8ca8] rounded-xl m-[10px] p-6 relative">
      {rank && (
        <p className="absolute rounded-full border-2 bg-[#fffefbfd] border-[#534847]  px-4 py-2 font-bold text-[#534847] -left-2 -top-2 ">
          {rank}
        </p>
      )}
      <div
        className="mb-2"
        onClick={() => {
          navigate(`/detail/${bookId}`, { state: { bookInfo } });
        }}
      >
       <img
          className="w-[60%] border-2 border-white shadow-customBook m-auto mt-[-20%] mb-3"
          src={thumbnail}
          alt="Not found"
        />
        <div className="h-[55px]">
          <p className="font-semibold text-center mt-2 text-zinc-950 text-[0.95rem] leading-5 line-clamp-2">
            {title}
          </p>
          <p className="text-xs text-center">{`[ ${authors} ]`}</p>
        </div>
        <div className="h-[80px]">
          <p className="text-[0.8rem] line-clamp-4">{contents}</p>
        </div>
      </div>
    </div>
  );
}

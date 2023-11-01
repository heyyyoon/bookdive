import React from "react";
import { useNavigate } from "react-router-dom";

export default function BookCard({
  bookInfo,
  bookInfo: { title, contents, authors, thumbnail, bookId },
  rank,
}) {
 
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-b from-[#d1daaea8] to-[#e4d2d2] rounded-xl m-[10px] px-4 py-2 relative">
      {rank && (
        <p className="absolute rounded-full border-2 bg-[#fffefbe8] text-medigrey border-[#d1daaea8] px-4 py-2 font-bold -left-2 -top-2 ">
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
          className="w-[60%] border-2 border-white shadow-customBook m-auto mt-[-15%] mb-3"
          src={thumbnail}
          alt="Not found"
        />
        <div className="h-[55px] mb-2">
          <p className="font-semibold text-center mt-2 text-darygrey text-title leading-5 line-clamp-2">
            {title}
          </p>
          <p className="text-xs text-medigrey text-center">{`[ ${authors} ]`}</p>
        </div>
        <div className="h-[80px]">
          <p className="text-content text-darkgrey line-clamp-4">{contents}</p>
        </div>
      </div>
    </div>
  );
}

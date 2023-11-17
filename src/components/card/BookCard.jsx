import React from "react";
import { useNavigate } from "react-router-dom";
import { useModalContext } from "../../context/ModalContext";

export default function BookCard({
  bookInfo,
  bookInfo: { title, contents, authors, thumbnail, bookId },
  rank,
}) {
  
  const { dragging } = useModalContext();
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-b from-[#F6F6F6] to-[#eee0d8] rounded-xl m-[10px] px-4 py-2 relative cursor-pointer">
      {rank && (
        <p className="absolute rounded-full border-2 bg-white text-medigrey border-[#ebd6cb] px-4 py-2 font-semibold -left-2 -top-2 ">
          {rank}
        </p>
      )}
      <div
        className="mb-2"
        onClick={() => {
          !dragging && navigate(`/detail/${bookId}`, { state: { bookInfo } });
        }}
      >
      <img
          className="w-[60%] border-2 border-white shadow-customBook m-auto mt-[-15%] mb-3"
          src={thumbnail}
          alt="Not found"
        />
        <div className="h-[55px] mb-2">
          <p className="font-semibold text-center mt-2 text-zinc-darkgrey text-title leading-5 line-clamp-2">
            {title}
          </p>
          <p className="text-xs text-medigrey mt-1 text-center">{authors}</p>
        </div>
        <div className="h-[80px]">
          <p className="text-content text-darkgrey line-clamp-4">{contents}</p>
        </div>
      </div>
    </div>
  );
}

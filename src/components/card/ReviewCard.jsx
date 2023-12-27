import React from "react";
import ReviewItem from "./ReviewItem";
import useBooks from "../../hooks/useBooks";
import { useModalContext } from "../../context/ModalContext";

export default function ReviewCard({ review }) {
  const { useGetBooks } = useBooks();
  const { data: book } = useGetBooks(review.bookId);
  const { openModal } = useModalContext();

  return (
    <article
      className="rounded-xl m-[10px] overflow-hidden shadow-card mt-[-10px] border-2 border-[#fbfbfb] cursor-pointer"
      onClick={() => openModal( review, book )}
    >
      <div className="flex flex-row items-center px-4 py-3 border-b-[1px] bg-[#EEEEEE] border-[#bbb9b9]">
        <img
          className="w-[30%] shadow-customBook border-2"
          src={book && book.thumbnail}
          alt="book"
        />
        <div className="ml-3">
          <p className="font-semibold text-content text-darkgrey leading-5 mb-1">
            {book && book.title}
          </p>
          <p className="text-xs text-medigrey">{book && book.authors}</p>
        </div>
      </div>
      <div className="h-48 p-4 bg-[#fbfbfb]">
      <ReviewItem review={review}/>
      </div>
    </article>
  );
}

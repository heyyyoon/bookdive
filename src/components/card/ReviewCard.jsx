import React from "react";
import { useQuery } from "@tanstack/react-query";
import ReviewItem from "./ReviewItem";
import { getBooks } from "../../api/firebase";

export default function ReviewCard({ review, onOpen }) {
  const { data: book } = useQuery(["book", review.bookId], () =>
    getBooks(review.bookId)
  );

  return (
    <div
      className="rounded-xl m-[10px] border-2 overflow-hidden border-[#ebe2c4]"
      onClick={() => onOpen({ review, book })}
    >
      <div className="flex flex-row items-center bg-[#ebe2c4] px-4 py-4 border-b-[1px]">
        <img
          className="w-[25%] shadow-customBook border-2"
          src={book && book.thumbnail}
          alt="book"
        />
        <div className="ml-2">
          <p className="font-semibold text-content text-darkgrey leading-4 mb-1">
            {book && book.title}
          </p>
          <p className="text-xs text-medigrey">{book && `[${book.authors}]`}</p>
        </div>
      </div>
      <ReviewItem review={review} styleT="h-[200px] p-4" onOpen={onOpen}/>
    </div>
  );
}

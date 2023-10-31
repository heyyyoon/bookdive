import React from "react";
import { useQuery } from "@tanstack/react-query";
import ReviewItem from "./ReviewItem";
import { getBooks } from "../../api/firebase";
import BookItems from "./BookItems";

export default function ReviewCard({ review, openModal }) {
  const { data: book } = useQuery(["book", review.bookId], () =>
    getBooks(review.bookId)
  );

  return (
    <div
      className="rounded-xl m-[10px] border-2 overflow-hidden "
      onClick={() => openModal({ review, book })}
    >
     <BookItems book={book} />
      <ReviewItem
        review={review}
        styleT="h-[200px] p-4"
      />
    </div>
  );
}

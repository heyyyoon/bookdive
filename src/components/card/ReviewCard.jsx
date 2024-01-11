import React from "react";
import ReviewItem from "./ReviewItem";
import useBooks from "../../hooks/useBooks";
import { useModalContext } from "../../context/ModalContext";
import Like from "../ui/Like";
import { useAuthContext } from "../../context/AuthContext";

export default function ReviewCard({ review, likemode }) {
  const { useGetBooks } = useBooks();
  const { data: book } = useGetBooks(review.bookId);
  const { openModal } = useModalContext();
  const { userId } = useAuthContext();

  const handleLikeClick = (e) => {
    e.stopPropagation();
  };
  return (
    <article
      className="rounded-xl m-[10px] overflow-hidden shadow-btn mt-[-10px] border-2 border-[#cfc6c6] cursor-pointer"
      onClick={() => openModal(review, book)}
    >
      <div className="flex flex-row items-center px-4 py-3 border-b-[1px] bg-[#eeeeee83] border-[#bbb9b9]">
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
        <ReviewItem review={review} />
      </div>
      {likemode && (
        <div className="w-fit mx-auto mb-2" onClick={handleLikeClick}>
          {userId && <Like userId={userId} reviewId={review.reviewId} />}
        </div>
      )}
    </article>
  );
}

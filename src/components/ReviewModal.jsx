import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Rating } from "@smastrom/react-rating";
import CloseCircle from "./ui/CloseCircle";
import Like from "./ui/Like";

export default function ReviewModal({ review, book, onClose }) {
  const { userId } = useAuthContext();

  return (
    <div className="flex flex-col justify-between">
      <div className="flex justify-end">
        <CloseCircle onClose={onClose} />
      </div>
      <div className="flex border-b-[1px] pb-5">
        <img
          className="w-[25%] shadow-custom border-2 border-white"
          src={book.thumbnail}
          alt="book"
        />
        <div className="ml-3 mt-3">
          <p className="font-semibold text-title text-darkgrey mb-1">
            {book.title}
          </p>
          <p className="text-content text-zinc-medigrey">{book.authors}</p>
          <div className="max-w-[100px] flex flex-row text-zinc-800 items-center mt-2">
            <Rating value={review.rating} readOnly={true} />
            <p className="text-sm bg-white ml-2 rounded-xl">
              {review.rating && review.rating}
            </p>
          </div>
        </div>
      </div>
      <div className="my-6 text-left">
        <p className="text-lg font-semibold text-darkgrey mb-3">
          {review.reviewTitle}
        </p>
        <p className="text-sm leading-[1.4rem] text-medigrey">
          {review.reviewContent}
        </p>
      </div>
      {userId && (
       <Like userId={userId} reviewId={review.reviewId}/>
      )}
    </div>
  );
}

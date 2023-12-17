import React from "react";
import { useAuthContext } from "../context/AuthContext";
import CloseCircle from "./ui/CloseCircle";
import Like from "./ui/Like";
import StarRating from "./ui/StarRating";

export default function ReviewModal({ review, book, onClose }) {
  const { userId } = useAuthContext();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div
        className={`w-[60%] lg:w-[40%] rounded-2xl max-w-md bg-white px-8 py-4 shadow-modal`}
      >
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
              <div className="mt-2">
                <StarRating rating={review.rating} styles="max-w-[7rem]" />
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
          {userId && <Like userId={userId} reviewId={review.reviewId} />}
        </div>
      </div>
    </div>
  );
}

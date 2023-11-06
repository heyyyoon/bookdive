import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Rating } from "@smastrom/react-rating";
import CloseCircle from "./ui/CloseCircle";
import useLikes from "../hooks/useLikes";
import Like from "./ui/Like";

export default function ReviewModal({ review, book, onClose }) {
  const { userId } = useAuthContext();

  const { useGetIsLiked, useGetLikes, delLikeMutation, addLikeMutation } =
    useLikes();
  const { data: isLiked } = useGetIsLiked(userId, review.reviewId);
  const { data: userLikes } = useGetLikes(review.reviewId);

  const handleToggle = async () => {
    if (isLiked) {
      delLikeMutation.mutate({ userId, reviewId: review.reviewId });
    } else {
      addLikeMutation.mutate({ userId, reviewId: review.reviewId });
    }
  };

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
      <div className="my-6 text-center">
        <p className="text-lg font-semibold mb-3">{review.reviewTitle}</p>
        <p className="text-sm leading-[1.4rem] text-zinc-950">
          {review.reviewContent}
        </p>
      </div>

      <div
        className="flex justify-center items-center rounded-full cursor-pointer"
        onClick={handleToggle}
      >
        <div className="flex flex-row items-center p-3 px-5 bg-yellow-100  rounded-full relative">
          <Like isLiked={isLiked} />
          <p className=" text-zinc-900 text-sm ml-1">
            {userLikes && userLikes}
          </p> 
        </div>
        
      </div>
    </div>
  );
}
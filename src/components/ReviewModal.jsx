import React from "react";
import { addLike, delLike, getIsLiked, getLikes } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { Rating } from "@smastrom/react-rating";

export default function ReviewModal({ review, book }) {
  const { userId } = useAuthContext();
  const client = useQueryClient();
  const { data: isLiked } = useQuery(["liked"], () =>
    getIsLiked(userId, review.reviewId)
  );
  const { data: userLikes } = useQuery(["userByLikes"], () =>
    getLikes(review.reviewId)
  );
  const handleToggle = async () => {
    isLiked
      ? await delLike(userId, review.reviewId)
      : await addLike(userId, review.reviewId);

    client.invalidateQueries(["liked"]);
    client.invalidateQueries(["userByLikes"]);
  };

  return (
    <div className="flex flex-col justify-between">
      <div className="flex border-b-[1px] pb-5">
        <img
          className="w-[25%] shadow-custom border-2 border-white"
          src={book.thumbnail}
          alt="book"
        />
        <div className="ml-3 mt-3">
          <p className="font-semibold text-[0.95rem] text-zinc-950 mb-2">{book.title}</p>
          <p className="text- text-[0.8rem] text-zinc-800">{book.authors}</p>
          <div className="max-w-[100px] flex flex-row text-zinc-800 items-center mt-2">
            <Rating value={review.rating} readOnly={true} />
            <p className="text-sm bg-white ml-2 rounded-xl">
              {review.rating && review.rating}
            </p>
          </div>
        </div>
      </div>
      <div className="text-center my-6">
        <p className="text-lg font-medium mb-3">{review.reviewTitle}</p>
        <p className="text-sm leading-[1.4rem] text-zinc-950">
          {review.reviewContent}
        </p>
      </div>
      {userId !== review.userId && (
        <div
          className="flex flex-row justify-center bg-yellow-100 items-center p-2 rounded-full cursor-pointer text-lg hover:text-xl relative "
          onClick={handleToggle}
        >
          <div className=" text-zinc-900  ">
            {isLiked ? <BsSuitHeartFill /> : <BsSuitHeart />}
          </div>
          <p className="absolute right-[43%] ml-1 text-zinc-900 ">
            {userLikes && userLikes}
          </p>
        </div>
      )}
    </div>
  );
}

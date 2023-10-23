import React from "react";
import { addLike, delLike, getLikeByUser, getLikes } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function ReviewModal({ review, book, onClose }) {
  const { userId } = useAuthContext();
  const client = useQueryClient();

  const { data:isLiked } = useQuery(['liked'], () => getLikeByUser(userId, review.reviewId));  
  const { data:userLikes } = useQuery(['userByLikes'], () => getLikes(review.reviewId));  

  const handleToggle = () => {
    isLiked ? delLike(userId, review.reviewId) : addLike(userId, review.reviewId);

    client.invalidateQueries(['liked']);
    client.invalidateQueries(['userByLikes']);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[35%] h-[50%] bg-white border-2 px-8 pb-8 pt-4 z-10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] rounded overflow-auto">
        <p className="mb-3" onClick={onClose}>Xxxx</p>
        <div className="flex felx-row m-auto border-b-2 pb-5 border-amber-400 ">
          <img className="w-20" src={book.thumbnail} alt="book"/>
          <div className="m-4">
            <p className="font-semibold">{book.title}</p>
            <p className="text-sm">{book.authors}</p>
            <p>{("★").repeat(review.reviewRating)}{("☆").repeat(5-review.reviewRating)}</p>
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text-xl font-semibold mb-3">{review.reviewTitle}</p>
          <p>{review.reviewContent}</p>
        </div>
        { userId !== review.userId &&
          <button onClick={handleToggle}>{userLikes && userLikes}{isLiked ? '💜' : '💟'}</button>
        }
      </div>
    </div>
  );
}

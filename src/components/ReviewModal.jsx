import React from "react";
import { addLike, delLike, getIsLiked, getLikes } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { BsSuitHeartFill, BsSuitHeart } from 'react-icons/bs';

export default function ReviewModal({ review, book, onClose }) {
  const { userId } = useAuthContext();
  const client = useQueryClient();

  const { data:isLiked } = useQuery(['liked'], () => getIsLiked(userId, review.reviewId));  
  const { data:userLikes } = useQuery(['userByLikes'], () => getLikes(review.reviewId));  

  const handleToggle = () => {
    isLiked ? delLike(userId, review.reviewId) : addLike(userId, review.reviewId);

    client.invalidateQueries(['liked']);
    client.invalidateQueries(['userByLikes']);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[40%] rounded-2xl max-w-lg bg-white border-2 px-8 pb-10 pt-4 z-10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] overflow-auto">
      <div className="flex justify-end"> 
        <IoIosCloseCircleOutline className="text-3xl text-zinc-600 cursor-pointer hover:text-red-400" onClick={onClose} />
      </div>
      <div className="flex felx-row border-b-2 pb-5 border-zinc-300 px-5">
        <img className="w-[30%] shadow-custom border-2 border-white" src={book.thumbnail} alt="book"/>
        <div className="m-4">
          <p className="font-semibold text-[0.9rem] text-zinc-950 mb-2">{book.title}</p>
          <p className="text- text-[0.8rem] text-zinc-800">{book.authors}</p>
          <p>{("★").repeat(review.reviewRating)}{("☆").repeat(5-review.reviewRating)}</p>
        </div>
      </div>
      <div className="text-center mt-6">
        <p className="text-xl font-medium mb-3 ">{review.reviewTitle}</p>
        <p className="text-sm leading-[1.4rem] text-zinc-950">{review.reviewContent}</p>
      </div>
      { userId !== review.userId &&
      <div className="flex flex-row justify-center bg-yellow-100 items-center mt-5 p-2 rounded-full cursor-pointer"
        onClick={handleToggle}>
        <div className="text-lg text-zinc-900">{isLiked ? <BsSuitHeartFill /> : <BsSuitHeart />}</div>
        <p className="ml-1 text-zinc-900 ">{userLikes && userLikes}</p>
      </div>
      }
    </div>
    </div>
  );
}

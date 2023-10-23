import React from "react";

export default function ReviewModal({ review, onClose }) {
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[35%] h-[50%] bg-white border-2 px-8 pb-8 pt-4 z-10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] rounded overflow-auto">
        <p className="mb-3" onClick={onClose}>X</p>
        <div className="flex felx-row m-auto border-b-2 pb-5 border-amber-400 ">
          <img className="w-20" src={review.thumbnail} alt="book"/>
          <div className="m-4">
            <p className="font-semibold">{review.title}</p>
            <p className="text-sm">{review.authors}</p>
            <p>{("★").repeat(review.reviewRating)}{("☆").repeat(5-review.reviewRating)}</p>
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text-xl font-semibold mb-3">{review.reviewTitle}</p>
          <p>{review.reviewContent}</p>
        </div>
        <p className="text-center py-5">❤️ 5</p>
      </div>
    </div>
  );
}

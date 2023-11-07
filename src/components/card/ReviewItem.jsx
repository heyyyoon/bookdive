import React from "react";

export default function ReviewItem({ review, styleT, onOpen }) {
  return (
    <li className={styleT} onClick={() => onOpen && onOpen(review)}>
      <div className="h-[35%] flex justify-left items-start">
        <p className="text-title text-darkgrey font-bold line-clamp-2 text-left">
          {review.reviewTitle}
        </p>
      </div>
      <p className="text-content text-darkgrey text-left line-clamp-5">
        {review.reviewContent}
      </p>
    </li>
  );
}

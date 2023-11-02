import React from "react";

export default function ReviewItem({ review, styleT, onOpen }) {
  return (
    <div className={styleT} onClick={() => onOpen({review})}>
      <div className="h-[35%] flex justify-left items-start">
        <p className="text-title text-darkgrey font-bold line-clamp-2 text-center ">
          {review.reviewTitle}
        </p>
      </div>
      <p className="text-content text-darkgrey text-left line-clamp-5">
        {review.reviewContent}
      </p>
    </div>
  );
}

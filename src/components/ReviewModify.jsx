import { useState } from "react";
import ReviewGrid from "./ReviewGrid";
import ReviewCardModify from "./card/ReviewCardModify";
import SuccessMsg from "./ui/SuccessMsg";

export default function ReviewModify({ reviews }) {
  return (
    <>
      <ReviewGrid>
        {reviews.map((review) => (
          <div>
            <ReviewCardModify
              key={review.reviewId}
              review={review}
            />
          </div>
        ))}
      </ReviewGrid>
    </>
  );
}

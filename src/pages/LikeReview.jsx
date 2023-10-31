import React from "react";
import { useLocation } from "react-router-dom";
import ReviewCard from "../components/card/ReviewCard";

export default function LikeReview() {
  const { state: reviews } = useLocation();

  return (
    <section className="w-[80%] lg:w-[90%] pt-result max-w-basic mx-auto">
      <div className="flex flex-col items-center">
        <p className="text-xl border-b-2 pb-2 mb-3">My Reviews</p>
        <ul className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10">
          {reviews &&
            reviews.map((review) => (
              <ReviewCard key={review.reviewId} review={review} />
            ))}
        </ul>
      </div>
    </section>
  );
}

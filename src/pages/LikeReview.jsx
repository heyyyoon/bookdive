import React from "react";
import { useLocation } from "react-router-dom";
import ReviewCard from "../components/card/ReviewCard";

export default function LikeReview() {
  const { state: reviews } = useLocation();
  console.log(reviews);
  return (
    <section className="pt-result max-w-basic mx-auto">
      <div className="flex flex-col items-center">
        <p className="text-xl border-b-2 pb-2 mb-10">My Reviews</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 px-5 mt-3">
          {reviews &&
            reviews.map((review) => (
              <ReviewCard key={review.reviewId} reviews={review} />
            ))}
        </ul>
      </div>
    </section>
  );
}

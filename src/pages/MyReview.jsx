import React from "react";
import { useLocation } from "react-router-dom";
import ReviewCard from "../components/card/ReviewCard";
import PageTitle from "../components/ui/PageTitle";

export default function LikeReview() {
  const { state: {reviews,title} } = useLocation();
  return (
    <section className="w-[80%] pt-result max-w-basic mx-auto">
      <div className="flex flex-col items-center">
        <PageTitle title={title}/>
        <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 pt-[30px]">
          {reviews &&
            reviews.map((review) => (
              <ReviewCard key={review.reviewId} review={review} />
            ))}
        </ul>
      </div>
    </section>
  );
}

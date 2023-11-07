import React from "react";
import { useLocation } from "react-router-dom";
import ReviewCard from "../components/card/ReviewCard";
import PageTitle from "../components/ui/PageTitle";

export default function MyReview() {
  const { state: {reviews,title} } = useLocation();
  return (
    <section className="w-[80%] pt-result max-w-basic mx-auto">
      <div className="flex flex-col items-center">
        <PageTitle title={title}/>
        <ul className="grid grid-cols-1 custom-2:grid-cols-2 custom-3:grid-cols-3 custom-4:grid-cols-4 gap-y-10 pt-[30px]">
          {reviews &&
            reviews.map((review) => (
              <ReviewCard key={review.reviewId} review={review} />
            ))}
        </ul>
      </div>
    </section>
  );
}

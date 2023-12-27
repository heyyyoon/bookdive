import React from "react";
import ReviewCard from "./card/ReviewCard";
import SlideView from "./SlideView";

export default function SlideReviews({ reviews, numberOfCards }) {
  const displayCard = numberOfCards ? reviews.slice(0, numberOfCards) : reviews;

  return (
    <SlideView arrowColor="bg-[#999999]" dataLeng={reviews.length}>
      {displayCard.map((review) => (
        <ReviewCard key={review.reviewId} review={review} />
      ))}
    </SlideView>
  );
}

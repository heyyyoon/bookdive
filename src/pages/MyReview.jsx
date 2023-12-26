import React from "react";
import { useLocation } from "react-router-dom";
import ReviewCard from "../components/card/ReviewCard";
import PageTitle from "../components/ui/PageTitle";
import { useModalContext } from "../context/ModalContext";
import ReviewModal from "../components/ReviewModal";
import { VIEW_CLASS } from "../components/Main";
import { CARD_GRID_CLASS } from "../components/slider/CardGrid";

export default function MyReview() {
  const { state: {reviews, title} } = useLocation();
  const { isModalOpen } = useModalContext();
  return (
    <section className={VIEW_CLASS}>
      <div className="flex flex-col items-center">
        <PageTitle title={title}/>
        <ul className={`${CARD_GRID_CLASS} cursor-pointer`}>
          {reviews &&
            reviews.map((review) => (
              <ReviewCard key={review.reviewId} review={review} />
            ))}
        </ul>
      </div>
      {isModalOpen && <ReviewModal/>}
    </section>
  );
}

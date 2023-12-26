import React from "react";
import { useLocation } from "react-router-dom";
import ReviewCard from "../components/card/ReviewCard";
import PageTitle from "../components/ui/PageTitle";
import { useModalContext } from "../context/ModalContext";
import ReviewModal from "../components/ReviewModal";
import { VIEW_CLASS } from "../components/Main";

export default function MyReview() {
  const { state: {reviews,title} } = useLocation();
  const { isModalOpen } = useModalContext();
  return (
    <section className={VIEW_CLASS}>
      <div className="flex flex-col items-center">
        <PageTitle title={title}/>
        <ul className="grid grid-cols-1 custom-2:grid-cols-2 custom-3:grid-cols-3 custom-4:grid-cols-4 gap-y-10 pt-[30px] cursor-pointer">
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

import React from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import AllViewButton from "./ui/AllViewButton";
import ReviewCard from "./card/ReviewCard";
import SlideView from "./SlideView";

export default function SlideReviews({ loading, reviews, title }) {
  const navigate = useNavigate();

  return (
    <section className="pb-20">
      <div className="cursor-pointer flex flex-row justify-between items-end border-b pb-1">
        <p className="text-medigrey text-[20px] font-bold">{title}</p>
        {reviews && reviews.length > 0 && (
          <AllViewButton
            onClick={() => navigate("/reviews", { state: { reviews, title } })}
          />
        )}
      </div>
      {loading && <Loading />}
      {reviews.length > 0 ? (
        <SlideView arrowColor="bg-[#999999]" dataLeng={reviews.length}>
          {reviews.slice(0, 10).map((review) => (
            <ReviewCard
              key={review.reviewId}
              review={review}
            />
          ))}
        </SlideView>
      ) : (
        <p className="text-center my-10">리뷰가 없습니다.</p>
      )}
    </section>
  );
}

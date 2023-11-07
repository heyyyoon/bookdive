import React from "react";
import { useNavigate } from "react-router-dom";
import { BsFillDoorClosedFill, BsFillDoorOpenFill } from "react-icons/bs";
import CardSlider from "./slider/CardSlider ";
import Loading from "./Loading";
import CardGrid from "./CardGrid";

export default function SlideReviews({
  loading,
  reviews,
  title,
  renderReviewCards,
}) {
  const navigate = useNavigate();

  return (
    <section className="w-[80%] max-w-basic mx-auto pb-20">
      <div className="cursor-pointer flex flex-row justify-between items-end border-b pb-1">
        <p className="text-medigrey text-[20px] font-bold">{title}</p>
        {reviews && reviews.length > 0 && (
          <div
            className="group flex flex-row items-center z-10"
            onClick={() => navigate("/reviews", { state: { reviews, title } })}
          >
            <p className="text-sm font-bold text-darkgrey">더보기</p>
            <BsFillDoorClosedFill className="block group-hover:hidden text-[3rem] text-[#857267]" />
            <BsFillDoorOpenFill className="hidden group-hover:block text-[3rem] text-[#857267]" />
          </div>
        )}
      </div>
      {loading && <Loading />}
      {reviews && reviews.length > 0 ? (
        reviews.length <= 4 ? (
          <CardGrid>{renderReviewCards(reviews)}</CardGrid>
        ) : (
          <CardSlider>{renderReviewCards(reviews)}</CardSlider>
        )
      ) : (
        <p className="text-center my-10">리뷰가 없습니다.</p>
      )}
    </section>
  );
}

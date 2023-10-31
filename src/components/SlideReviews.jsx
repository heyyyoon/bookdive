import React from "react";
import { useNavigate } from "react-router-dom";
import { BsFillDoorClosedFill, BsFillDoorOpenFill } from "react-icons/bs";
import CardSlider from "./slider/CardSlider ";
import Loading from "./Loading";

export default function SlideReviews({loading, reviews, title, renderReviewCards}) {
  const navigate = useNavigate();

  return (
    <section className="w-[80%] pt-result max-w-basic mx-auto">
      <div className="cursor-pointer flex flex-row justify-center relative">
        <p className="text-xl text-darkgrey border-b-2 pb-2 mb-3">{title}</p>
        <div
          className="group flex flex-row items-center absolute right-[20px] top-[5px] z-5"
          onClick={() => navigate("/reviews/", { state: reviews })}
        >
          <p className="text-sm font-bold text-darkgrey">더보기</p>
          <BsFillDoorClosedFill className="block group-hover:hidden text-[3rem] text-[#534847]" />
          <BsFillDoorOpenFill className="hidden group-hover:block text-[3rem] text-[#534847]" />
        </div>
      </div>
      {reviews && reviews.length===0 && <p className="text-center my-10">리뷰가 없습니다.</p>}
      {loading ? (
        <Loading />
      ) : (
        reviews && reviews.length <= 4 ? (
          <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4">{renderReviewCards(reviews)}</ul>
        ) : (
          <CardSlider>{renderReviewCards(reviews)}</CardSlider>
        )
      )}
    </section>
  );
}

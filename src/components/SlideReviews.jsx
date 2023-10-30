import React from "react";
import { useNavigate } from "react-router-dom";
import { BsFillDoorClosedFill, BsFillDoorOpenFill } from "react-icons/bs";
import CardSlider from "./slider/CardSlider ";
import ReviewCard from "./card/ReviewCard";

export default function SlideReviews({reviews, title}) {
    const navigate = useNavigate();

  return (
    <section className="w-[80%] lg:w-[90%] pt-result max-w-basic mx-auto mb-10">
      <div className="cursor-pointer flex flex-row justify-center -mb-[20px] relative">
        <p className="text-xl border-b-2 pb-2">{title}</p>
        <div
          className="group flex flex-row items-center absolute right-[20px] top-[5px] z-10"
          onClick={() => navigate("/reviews/", { state: reviews })}
        >
          <p className="text-sm font-bold">더보기</p>
          <BsFillDoorClosedFill className="block group-hover:hidden text-[3rem] text-[#534847]" />
          <BsFillDoorOpenFill className="hidden group-hover:block text-[3rem] text-[#534847]" />
        </div>
      </div>
      {reviews && (
        <CardSlider>
          {reviews.map((r) => (
            <ReviewCard key={r.reviews} reviews={r} />
          ))}
        </CardSlider>
      )}
    </section>
  );
}

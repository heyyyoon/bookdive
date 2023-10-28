import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { getReviewsAAA, getReviews } from "../api/firebase";
import { useQuery } from "@tanstack/react-query";
import MyPageCard from "../components/MyPageCard";
import { useNavigate } from "react-router-dom";
import { BsFillDoorClosedFill, BsFillDoorOpenFill } from "react-icons/bs";
import CardSlider from "../components/slider/CardSlider ";

export default function Mypage() {
  const { user, userId } = useAuthContext();
  const { data: allReviews } = useQuery(["allReview", userId], () =>
    getReviews(userId)
  );
  const { data: likeReviews } = useQuery(["likeReviews", userId], () =>
    getReviewsAAA(userId)
  );

  const filteredReviews = allReviews
    ? allReviews.filter((r) => r.userId === userId)
    : [];

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/like`, { state: likeReviews });
  };

  return (
    <section className="p-5">
      <section className="w-[90%] m-auto mt-5">
        <div className="cursor-pointer flex flex-row justify-center -mb-[20px] px-5 relative">
          <p className="text-xl border-b-2 pb-2">My Reviews</p>
          <div className="group flex flex-row items-center absolute right-[20px] top-[5px] z-10">
            <p className="text-sm">더보기</p>
            <BsFillDoorClosedFill className="block group-hover:hidden text-[3rem] text-[#534847]" />
            <BsFillDoorOpenFill className="hidden group-hover:block text-[3rem] text-[#534847]" />
          </div>
        </div>
        {filteredReviews && (
            <CardSlider>
              {filteredReviews.map((r) => (
                <MyPageCard key={r.reviewId} reviews={r} />
              ))}
            </CardSlider>
        )}
      </section>
      <section className="w-[90%] m-auto mt-16 mb-20">
        <div className="cursor-pointer flex flex-row justify-center -mb-[20px] px-5 relative" >
        <p className="text-xl border-b-2 pb-2">Like Reviews</p>
        <div className="group flex flex-row items-center absolute right-[20px] top-[5px] z-10">
          <p className="text-sm">더보기</p>
          <BsFillDoorClosedFill className="block group-hover:hidden text-[3rem] text-[#ac7f7b]" />
          <BsFillDoorOpenFill className="hidden group-hover:block text-[3rem] text-[#ac7f7b]" />
        </div>
        </div>
        {likeReviews && (
            <CardSlider>
              {likeReviews.map((r) => (
                <MyPageCard key={r.reviewId} reviews={r} />
              ))}
            </CardSlider>
        )}
      </section>
    </section>
  );
}

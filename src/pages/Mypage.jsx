import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { getReviewsAAA, getReviews } from "../api/firebase";
import { useQuery } from "@tanstack/react-query";
import MyPageCard from "../components/MyPageCard";
import { useNavigate } from "react-router-dom";
import CardSlider from "../components/CardSlider ";

export default function Mypage() {
  const { user, userId } = useAuthContext();
  const { data: allReviews } = useQuery(["allReview", userId], () => getReviews(userId));
  const { data: likeReviews } = useQuery(["likeReviews", userId], () => getReviewsAAA(userId));

  const filteredReviews = allReviews ? allReviews.filter((r) => r.userId === userId) : [];

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/like`, { state: likeReviews });
  };

  return (
    <section className="m-5">
      <section className="flex flex-row border-b-2 pb-3">
        <p className="w-[20%]">img</p>
        <div>
          <p className="text-2xl font-semibold mt-5">{user && user.nickname}</p>
          <div className="grid grid-cols-3 gap-3 mt-10">
            <p className="w-32 h-32 bg-red-300">follower</p>
            <p className="w-32 h-32 bg-red-300">follow</p>
            <div
              className="w-32 h-32 bg-red-300 flex flex-col items-center justify-center "
              onClick={handleClick}
            >
              <p className="text-2xl text-center font-bold">Likes</p>
              <p className="text-3xl text-center">
                {likeReviews ? likeReviews.length : 0}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <p className="text-xl">My Reviews</p>
        {filteredReviews && (
          <CardSlider>
            {filteredReviews.map((r) => (
              <MyPageCard key={r.reviewId} reviews={r} />
            ))}
          </CardSlider>
        )}
      </section>
      <section>
        <p className="text-xl">Like Reviews</p>
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

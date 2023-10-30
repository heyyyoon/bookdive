import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { getReviewsAAA, getReviews } from "../api/firebase";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { BsFillDoorClosedFill, BsFillDoorOpenFill } from "react-icons/bs";
import CardSlider from "../components/slider/CardSlider ";
import ReviewCard from "../components/card/ReviewCard";
import SlideReviews from "../components/SlideReviews";

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

  

  return (
    <section className="">
      <SlideReviews reviews={allReviews} title={'My Reviews'} />
      <SlideReviews reviews={likeReviews} title={'Like Reviews'} />
    </section>
  );
}

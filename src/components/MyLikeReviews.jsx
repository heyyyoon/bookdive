import React from "react";
import useReviews from "../hooks/useReviews";
import Loading from "./Loading";
import MyPageSubTitle from "./ui/MyPageSubTitle";
import ReviewGrid from "./ReviewGrid";
import ReviewCard from "./card/ReviewCard";

export default function MyLikeReviews() {
  const {
    getLikeReviews: { isLoading: likeLoading, data: likeReviews },
  } = useReviews();

  return (
    <>
      <MyPageSubTitle title="내가 좋아하는 리뷰" />
      {likeLoading && <Loading />}
      {likeReviews ? (
        <ReviewGrid>
          {likeReviews.map((review) => {
            return <ReviewCard key={review.reviewId} review={review} likemode/>;
          })}
        </ReviewGrid>
      ) : (
        <p className="text-center my-10">좋아요 한 리뷰가 없습니다.</p>
      )}
    </>
  );
}

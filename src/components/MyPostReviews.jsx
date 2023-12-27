import React from "react";
import SlideReviews from "./SlideReviews";
import useReviews from "../hooks/useReviews";
import Loading from "./Loading";
import ReviewGrid from "./ReviewGrid";
import MyPageSubTitle from "./ui/MyPageSubTitle";
import ReviewCardModify from "./card/ReviewCardModify";
import ReviewModify from "./ReviewModify";

export default function MyPostReviews({ userId, viewMode }) {
  const {
    getAllReviews: { isLoading: allLoading, data: allReviews },
  } = useReviews();

  const userReviews = allReviews
    ? allReviews.filter((r) => r.userId === userId)
    : null;

  return (
    <>
      <MyPageSubTitle title="내가 작성한 리뷰" />
      {allLoading && <Loading />}
      {userReviews ? (
        viewMode === "grid" ? (
          <ReviewModify reviews={userReviews} />
        ) : (
          <SlideReviews reviews={userReviews} numberOfCards={10} />
        )
      ) : (
        <p className="text-center my-10">작성한 리뷰가 없습니다.</p>
      )}
    </>
  );
}

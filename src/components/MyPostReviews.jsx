import React from "react";
import useReviews from "../hooks/useReviews";
import Loading from "./Loading";
import MyPageSubTitle from "./ui/MyPageSubTitle";
import ReviewModify from "./ReviewModify";

export default function MyPostReviews({ userId }) {
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
        <ReviewModify reviews={userReviews} />
      ) : (
        <p className="text-center my-10">작성한 리뷰가 없습니다.</p>
      )}
    </>
  );
}

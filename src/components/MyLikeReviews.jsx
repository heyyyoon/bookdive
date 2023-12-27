import React from "react";
import useReviews from "../hooks/useReviews";
import SlideReviews from "./SlideReviews";
import Loading from "./Loading";
import MyPageSubTitle from "./ui/MyPageSubTitle";
import ReviewGrid from "./ReviewGrid";

export default function MyLikeReviews({ viewMode }) {
  const {
    getLikeReviews: { isLoading: likeLoading, data: likeReviews },
  } = useReviews();

  return (
    <>
      <MyPageSubTitle title="내가 좋아하는 리뷰" />
      {likeLoading && <Loading />}
      {likeReviews ? (
        (viewMode === "grid" ? (
          <ReviewGrid reviews={likeReviews} />
        ) : (
          <SlideReviews reviews={likeReviews} numberOfCards={10} />
        ))
        ) : (
          <p className="text-center my-10">좋아요 한 리뷰가 없습니다.</p>
        )}
    </>
  );
}

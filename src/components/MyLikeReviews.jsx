import React from "react";
import useReviews from "../hooks/useReviews";
import SlideReviews from "./SlideReviews";

export default function MyLikeReviews() {
  const {
    getLikeReviews: { isLoading: likeLoading, data: likeReviews },
  } = useReviews();

  return (
    <div>
      {likeReviews && (
        <SlideReviews
          loading={likeLoading}
          reviews={likeReviews}
          title="내가 좋아하는 리뷰"
        />
      )}
    </div>
  );
}

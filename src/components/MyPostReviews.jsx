import React from "react";
import SlideReviews from "./SlideReviews";
import useReviews from "../hooks/useReviews";

export default function MyPostReviews({ userId }) {
  const {
    getAllReviews: { isLoading: allLoading, data: allReviews },
  } = useReviews();

  const userReviews = allReviews
    ? allReviews.filter((r) => r.userId === userId)
    : null;

  return (
    <div>
      {userReviews && (
        <SlideReviews
          loading={allLoading}
          reviews={userReviews}
          title="내가 작성한 리뷰"
        />
      )}
    </div>
  );
}

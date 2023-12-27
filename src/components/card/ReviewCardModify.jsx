import React, { useState } from "react";
import PostModifyButton from "../PostModifyButton";
import ConfirmForm from "../ConfirmForm";
import ReviewCard from "../card/ReviewCard";
import useReviews from "../../hooks/useReviews";

export default function ReviewCardModify({
  review,
  review: { reviewId, bookId },
}) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { delReviewMutation } = useReviews();

  const onDelete = () => {
    try {
      delReviewMutation.mutate({ bookId, reviewId });
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
  const handleModify = () => {};

  return (
    <div className="relative">
      <ReviewCard review={review} />
      {isConfirmOpen && (
        <ConfirmForm
          onYes={() => onDelete()}
          onNo={() => setIsConfirmOpen(false)}
        />
      )}
      <div className="mb-3">
        <PostModifyButton openConfirm={() => setIsConfirmOpen(true)} />
      </div>
    </div>
  );
}

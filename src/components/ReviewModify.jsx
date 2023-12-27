import ReviewGrid from "./ReviewGrid";
import ReviewCardModify from "./card/ReviewCardModify";

export default function ReviewModify({ reviews }) {
  return (
    <ReviewGrid>
      {reviews.map((review) => (
        <ReviewCardModify key={review.reviewId} review={review} />
      ))}
    </ReviewGrid>
  );
}

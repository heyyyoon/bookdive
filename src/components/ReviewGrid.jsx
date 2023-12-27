import ReviewCard from "./card/ReviewCard";

export default function ReviewGrid({reviews}) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 pt-[30px]">
       {reviews.map((review) => {
            return <ReviewCard key={review.reviewId} review={review} />;
          })}
    </ul>
  );
}


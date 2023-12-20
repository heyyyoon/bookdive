import useReviews from "../hooks/useReviews";
import Loading from "./Loading";
import SlideView from "./SlideView";
import ReviewCard from "./card/ReviewCard";
import HotCardSubTitle from "./ui/HotCardSubTitle";
import HotCardTitle from "./ui/HotCardTitle";

export default function HotReviews({ openModal }) {
  const {
    getHotReviews: { isLoading: loadingReviews, data: reviews },
  } = useReviews();

  return (
    <section className="pb-20">
      <div className="flex flex-col items-start">
        <HotCardTitle text="Hot한 리뷰들" />
        <HotCardSubTitle text="요즘 인기있는 리뷰들을 살펴보세요!" />
      </div>
      {loadingReviews && <Loading />}
      {reviews && 
        <SlideView arrowColor="bg-[#BBAEA7]" dataLength={reviews.length}>
        {reviews.slice(0, 10).map((review) => (
            <ReviewCard key={review.reviewId} review={review} onOpen={openModal} />
        ))}
      </SlideView>
      }
    
    </section>
  );
}

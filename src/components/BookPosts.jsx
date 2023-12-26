import { useModalContext } from "../context/ModalContext";
import Loading from "./Loading";
import ReviewModal from "./ReviewModal";
import ReviewItem from "./card/ReviewItem";

export default function BookPosts({ isLoading, bookReviews, bookInfo }) {
  const { isModalOpen, openModal } = useModalContext();

  return (
    <section className="flex flex-col items-center mt-10">
      <p className="w-full text-lg font-semibold text-zinc-800 px-4">
        이 책의 포스트
      </p>
      {isLoading && <div className="mt-10"><Loading /></div>}
      {bookReviews && (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5 w-full">
          {bookReviews.map((review) => (
            <li 
              key={review.reviewId} 
              className="shadow-lg h-[200px] px-6 py-5 rounded-xl border-[1px] cursor-pointer hover:shadow-xl hover:scale-105"
              onClick={() => openModal(review, bookInfo)}
            >
              <ReviewItem review={review}/>
            </li>
          ))}
        </ul>
      )}
      {isModalOpen && <ReviewModal/>}
    </section>
  );
}

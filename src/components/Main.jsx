import React from "react";
import { useModalContext } from "../context/ModalContext";
import SlideView from "../components/SlideView";
import ReviewModal from "../components/ReviewModal";
import Modal from "../components/Modal";
import BookCard from "../components/card/BookCard";
import ReviewCard from "../components/card/ReviewCard";
import useBooks from "../hooks/useBooks";
import useReviews from "../hooks/useReviews";

export default function Main() {
  const {
    getHotReviews: { isLoading: loadingReviews, data: reviews },
  } = useReviews();

  const {
    getHotBooks: { isLoading: loadingBooks, data: books },
  } = useBooks();

  const { isModalOpen, openModal, closeModal, selectedItem } =
    useModalContext();

  const renderBookCards = (books) =>
    books.slice(0, 10).map((book, index) => (
      <BookCard
        key={book.bookId}
        rank={index + 1}
        bookInfo={{
          title: book.title,
          contents: book.contents,
          thumbnail: book.thumbnail,
          authors: book.authors,
          bookId: book.bookId,
        }}
      />
    ));

  const renderReviewCards = (reviews) =>
    reviews
      .slice(0, 10)
      .map((review) => (
        <ReviewCard key={review.reviewId} review={review} onOpen={openModal} />
      ));
  return (
    <section>
      <section className="mb-14 py-5">
        <SlideView
          data={books}
          loading={loadingBooks}
          title="인기있는 책 Top 10"
          subtitle="유저들이 선택한 책!"
          renderItem={renderBookCards}
          arrowColor="bg-[#d6bbaf]"
        />
      </section>
      <section className="mb-14 py-5">
        <SlideView
          data={reviews}
          loading={loadingReviews}
          title="Hot 한 리뷰들"
          subtitle="요즘 인기있는 리뷰들을 살펴보세요!"
          renderItem={renderReviewCards}
          arrowColor="bg-[#cacfd6]"
        />
      </section>
      {isModalOpen && selectedItem && (
        <Modal size={"w-[60%] lg:w-[40%]"}>
          <ReviewModal
            review={selectedItem.review}
            book={selectedItem.book}
            onClose={closeModal}
          />
        </Modal>
      )}
    </section>
  );
}

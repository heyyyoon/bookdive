import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBookRanking, getBookReview } from "../api/firebase";
import SlideView from "../components/SlideView";
import ReviewModal from "../components/ReviewModal";
import Modal from "../components/Modal";
import BookCard from "../components/card/BookCard";
import ReviewCard from "../components/card/ReviewCard";

export default function Home() {
  const { isLoading: loadingBooks, data: books } = useQuery(["hotBooks"], () =>
    getBookRanking()
  );
  const { isLoading: loadingReviews, data: reviews } = useQuery(
    ["hotReviews"],
    () => getBookReview()
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem ] = useState(null);
  
  const openModal = ({review, book}) => {
    setSelectedItem({review, book}); 
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const renderBookCards = (books) => (
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
    ))
  );

  const renderReviewCards = (reviews) => (
    reviews.slice(0, 10).map((review) => (
      <ReviewCard key={review.reviewId} review={review} openModal={openModal}/>
    ))
  );

  return (
    <section className="py-top-basic ">
      <section className=''>
        <SlideView
          data={books}
          loading={loadingBooks}
          title='Best10 books'
          renderItem={renderBookCards}
        />
      </section>
      <section className="">
        <SlideView
          data={reviews}
          loading={loadingReviews}
          title='Best10 reviews'
          renderItem={renderReviewCards}
        />
      </section>
      {isModalOpen && selectedItem && (
        <Modal onClose={closeModal}>
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

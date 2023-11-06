import React from "react";
import { useAuthContext } from "../context/AuthContext";
import SlideReviews from "../components/SlideReviews";
import ReviewCard from "../components/card/ReviewCard";
import ReviewModal from "../components/ReviewModal";
import Modal from "../components/Modal";
import { useModalContext } from "../context/ModalContext";
import useReviews from "../hooks/useReviews";

export default function Mypage() {
  const { userId } = useAuthContext();

  const {
    getAllReviews: { isLoading: allLoading, data: allReviews },
    getLikeReviews: { isLoading: likeLoading, data: likeReviews },
  } = useReviews();

  const userReviews = allReviews
    ? allReviews.filter((r) => r.userId === userId)
    : null;

  const { isModalOpen, openModal, closeModal, selectedItem } =
    useModalContext();

  const renderReviewCards = (reviews) => {
    return (
      reviews &&
      reviews
        .slice(0, 10)
        .map((review) => (
          <ReviewCard
            key={review.reviewId}
            review={review}
            onOpen={openModal}
          />
        ))
    );
  };
  return (
    <section className="mb-20">
      <SlideReviews
        loading={allLoading}
        reviews={userReviews}
        title="My Reviews"
        renderReviewCards={renderReviewCards}
      />
      <SlideReviews
        loading={likeLoading}
        reviews={likeReviews}
        title="Like Reviews"
        renderReviewCards={renderReviewCards}
      />
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

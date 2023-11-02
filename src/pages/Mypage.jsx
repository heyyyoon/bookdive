import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { getReviewsAAA, getReviews } from "../api/firebase";
import { useQuery } from "@tanstack/react-query";
import SlideReviews from "../components/SlideReviews";
import ReviewCard from "../components/card/ReviewCard";
import ReviewModal from "../components/ReviewModal";
import Modal from "../components/Modal";
import { useModalContext } from "../context/ModalContext";

export default function Mypage() {
  const { userId } = useAuthContext();
  const { isLoading: allLoading, data: allReviews } = useQuery(
    ["allReview", userId],
    () => getReviews(userId)
  );
  const { isLoading: likeLoading, data: likeReviews } = useQuery(
    ["likeReviews", userId],
    () => getReviewsAAA(userId)
  );

  const filteredReviews = allReviews
    ? allReviews.filter((r) => r.userId === userId)
    : [];

  const { isModalOpen, openModal, closeModal, selectedItem } = useModalContext();
  
  const renderReviewCards = (reviews) => {
    return (
      reviews &&
      reviews.slice(0, 10).map((r) => 
        <ReviewCard key={r.reviews} review={r} onOpen={openModal} />
        )
    );
  };
  return (
    <section className="mb-20">
      <SlideReviews
        loading={allLoading}
        reviews={filteredReviews}
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

import React from "react";
import { useAuthContext } from "../context/AuthContext";
import SlideReviews from "../components/SlideReviews";
import ReviewCard from "../components/card/ReviewCard";
import ReviewModal from "../components/ReviewModal";
import Modal from "../components/Modal";
import { useModalContext } from "../context/ModalContext";
import useReviews from "../hooks/useReviews";
import UserInfo from "../components/ui/UserInfo";

export default function Mypage() {
  const { userId, user } = useAuthContext();

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
    <section className="w-[80%] max-w-basic mx-auto pt-result">
      <div className="mb-12 mt-5">
        <UserInfo nickname={user && user.nickname}/>
      </div>
      <SlideReviews
        loading={allLoading}
        reviews={userReviews}
        title="내가 작성한 리뷰"
        renderReviewCards={renderReviewCards}
        arrowColor="bg-[#999999]"
      />
      <SlideReviews
        loading={likeLoading}
        reviews={likeReviews}
        title="내가 좋아하는 리뷰"
        renderReviewCards={renderReviewCards}
        arrowColor="bg-[#999999]"
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

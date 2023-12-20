import React from "react";
import { useAuthContext } from "../context/AuthContext";
import ReviewModal from "../components/ReviewModal";
import { useModalContext } from "../context/ModalContext";
import UserInfo from "../components/ui/UserInfo";
import MyPostReviews from "../components/MyPostReviews";
import MyLikeReviews from "../components/MyLikeReviews";

export default function Mypage() {
  const { userId, user } = useAuthContext();

  const { isModalOpen } = useModalContext();

  return (
    <section className="w-[80%] max-w-basic mx-auto pt-result">
      <UserInfo nickname={user && user.nickname}/>
      <MyPostReviews userId={userId}/>
      <MyLikeReviews />
      {isModalOpen && (
        <ReviewModal/>
      )}
    </section>
  );
}

import React from "react";
import { useAuthContext } from "../context/AuthContext";
import ReviewModal from "../components/ReviewModal";
import { useModalContext } from "../context/ModalContext";
import UserInfo from "../components/ui/UserInfo";
import MyPostReviews from "../components/MyPostReviews";
import MyLikeReviews from "../components/MyLikeReviews";
import { VIEW_CLASS } from "../components/Main";

export default function Mypage() {
  const { userId, user } = useAuthContext();
  const { isModalOpen } = useModalContext();

  return (
    <section className={VIEW_CLASS}>
      <UserInfo nickname={user && user.nickname}/>
      <MyPostReviews userId={userId}/>
      <MyLikeReviews />
      {isModalOpen && <ReviewModal/>}
    </section>
  );
}

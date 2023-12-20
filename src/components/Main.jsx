import React from "react";
import { useModalContext } from "../context/ModalContext";
import ReviewModal from "../components/ReviewModal";
import HotBooks from "./HotBooks";
import HotReviews from "./HotReviews";

export default function Main() {
  const { isModalOpen } = useModalContext();

  return (
    <main className="w-[80%] lg:w-[90%] mx-auto max-w-basic">
      <HotBooks />
      <HotReviews/>
      {isModalOpen && <ReviewModal />}
    </main>
  );
}

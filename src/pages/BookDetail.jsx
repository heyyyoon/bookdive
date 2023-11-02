import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBookRating, getReviewByBookId } from "../api/firebase";
import { useQuery } from "@tanstack/react-query";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { BiSolidAddToQueue } from "react-icons/bi";
import ReviewItem from "../components/card/ReviewItem";
import ReviewModal from "../components/ReviewModal";
import Modal from "../components/Modal";
import { useModalContext } from "../context/ModalContext";

export default function BookDetail() {
  const {
    state: {
      bookInfo,
      bookInfo: { title, contents, authors, thumbnail, bookId },
    },
  } = useLocation();
  const { data: bookReviews } = useQuery(["bookreview"], () =>
    getReviewByBookId(bookId)
  );
  const { data: bookRating } = useQuery(["totalRating"], () =>
    getBookRating(bookId)
  );

  const { isModalOpen, openModal, closeModal, selectedItem } = useModalContext();
  
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/write", { state: { bookInfo } });
  };

  return (
    <section className="w-[80%] pt-result max-w-basic mx-auto">
      <section className="flex flex-col items-center lg:flex-row lg:justify-center pb-5 border-b-2 ">
        <img
          className="w-[250px] shrink-0 border-2 border-zinc-300 shadow-custom text-center"
          src={thumbnail}
          alt="bookimage"
        />
        <div className="flex flex-col justify-between text-center items-center py-3 ml-7 lg:items-start lg:text-left">
          <div>
            <p className="text-2xl font-semibold mb-1 text-darkgrey">{title}</p>
            <p className="text-medigrey">{authors}</p>
            <div className="max-w-[150px] flex flex-row mx-auto lg:mx-0 text-zinc-800 my-4">
              <Rating value={Math.floor(bookRating)} readOnly={true} />
              <p className="text-[1rem] bg-white text-darkgrey ml-2 rounded-xl">
                {bookRating && bookRating.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="max-w-2xl">
            <p className="text-xl font-semibold mb-2 text-orange-500">overview</p>
            <p className="text-title text-darkgrey">{contents}</p>
            <div
              onClick={handleClick}
              className="w-[130px] text-lg font-semibold text-darkgrey rounded-xl py-3 bg-[#f3da6a] shadow-lg mt-3 hover:brightness-110"
            >
              <div className="flex flex-row items-center justify-center cursor-pointer">
                <BiSolidAddToQueue className="text-3xl text-[#463d19]"/>
                <p className="ml-1 text-sm">Post</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center mt-10">
        <p className="w-full text-lg font-semibold text-zinc-800 px-4">
          이 책의 포스트
        </p>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full p-5">
          {bookReviews &&
            bookReviews.map((review) => (
              <ReviewItem
                key={review.reviewId}
                review={review}
                styleT="shadow-xl h-[200px] px-6 py-5 rounded-xl border-[1px]"
                onOpen={(review) => openModal(review, bookInfo)}
              />
            ))}
        </ul>
      </section>
      {isModalOpen && selectedItem && (
        <Modal>
          <ReviewModal
            review={selectedItem}
            book={bookInfo}
            onClose={closeModal}
          />
        </Modal>
      )}
    </section>
  );
}

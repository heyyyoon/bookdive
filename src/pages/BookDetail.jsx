import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBookRating, getReviewByBookId } from "../api/firebase";
import { useQuery } from "@tanstack/react-query";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { BiSolidAddToQueue } from "react-icons/bi";
import ReviewItem from "../components/card/ReviewItem";
import ReviewModal from "../components/ReviewModal";
import Modal from "../components/Modal";

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
  
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/write", { state: { bookInfo } });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem ] = useState(null);
  const openModal = ({review}) => {
    setSelectedItem(review); 
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  return (
    <section className="w-[80%] pt-result max-w-basic mx-auto">
      <section className="flex flex-col lg:flex-row pb-5 border-b-2">
          <img
            className="w-[180px] lg:w-[280px] shrink-0 border-2 border-zinc-300 shadow-custom mx-auto"
            src={thumbnail}
            alt="bookimage"
          />
          <div className="flex flex-col justify-between py-3 ml-5 items-center lg:items-start text-center lg:text-left">
            <div className="">
              <p className="text-2xl font-bold mb-1">{title}</p>
              <p className="">{authors}</p>
              <div className="max-w-[160px] flex flex-row mx-auto lg:mx-0 justify-center text-zinc-800 my-5">
                <Rating value={Math.floor(bookRating)} readOnly={true} />
                <p className="text-[1.1rem] bg-white ml-2 rounded-xl">
                  {bookRating && bookRating.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="">
              <p className="text-xl font-semibold mb-2 text-orange-500">
                overview
              </p>
              <p className="text-base">{contents}</p>
              <div
                onClick={handleClick}
                className="text-lg font-semibold text-zinc-800 rounded-xl p-3 bg-[#fffcfc] shadow-xl border-[1px] mt-5"
              >
                <div className="flex flex-row items-center justify-center cursor-pointe">
                  <BiSolidAddToQueue />
                  <p className="ml-2 text-2xl">Post</p>
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
                styleT="shadow-xl h-[230px] px-6 py-5 rounded-xl border-[1px]"
                openModal={openModal}
              />
            ))}
        </ul>
      </section>
      {isModalOpen && selectedItem && (
        <Modal onClose={closeModal}>
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

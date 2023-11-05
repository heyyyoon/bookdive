import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useModalContext } from "../context/ModalContext";
import { Rating } from "@smastrom/react-rating";
import ReviewItem from "../components/card/ReviewItem";
import ReviewModal from "../components/ReviewModal";
import Modal from "../components/Modal";
import useBooks from "../hooks/useBooks";
import ButtonAddPost from "../components/ui/ButtonAddPost";
import Loading from "../components/Loading";

export default function BookDetail() {
  const {
    state: {
      bookInfo,
      bookInfo: { title, contents, authors, thumbnail, bookId },
    },
  } = useLocation();

  const { useGetBookReviews } = useBooks();
  const { isLoading, data: bookReviews } = useGetBookReviews(bookId);

  const reviewLength = bookReviews && bookReviews.length;
  const bookRating =
    bookReviews &&
    (reviewLength
      ? bookReviews.reduce((sum, review) => sum + review.rating, 0) /
          reviewLength || 0
      : 0);

  const { isModalOpen, openModal, closeModal, selectedItem } =
    useModalContext();

  const navigate = useNavigate();

  return (
    <section className="w-[80%] pt-result max-w-basic mx-auto">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <section className="flex flex-col items-center lg:flex-row lg:justify-center pb-5 border-b-2 ">
            <img
              className="w-[200px] lg:w-[250px] shrink-0 border-2 border-zinc-300 shadow-custom text-center"
              src={thumbnail}
              alt="bookimage"
            />
            <div className="flex flex-col justify-between text-center items-center py-3 ml-7 lg:items-start lg:text-left">
              <div>
                <p className="text-xl font-semibold mb-1 text-darkgrey">
                  {title}
                </p>
                <p className="text-base text-medigrey">{authors}</p>
                <div className="max-w-[150px] flex flex-row mx-auto lg:mx-0 text-zinc-800 my-4">
                  <Rating
                    value={Math.floor(bookReviews && bookRating)}
                    readOnly={true}
                  />
                  <p className="text-[1rem] bg-white text-darkgrey ml-2 rounded-xl">
                    {bookReviews ? bookRating.toFixed(2) : 0}
                  </p>
                </div>
              </div>
              <div className="max-w-2xl">
                <p className="text-xl font-semibold mb-2 text-orange-500">
                  overview
                </p>
                <p className="text-title text-darkgrey">{contents}</p>
                <div
                  onClick={() => navigate("/write", { state: { bookInfo } })}
                  className="w-[130px] text-lg mx-auto lg:mx-0 font-semibold text-darkgrey rounded-xl mt-3 py-3 bg-[#f3da6a] hover:brightness-110"
                >
                  <ButtonAddPost />
                </div>
              </div>
            </div>
          </section>
          <section className="flex flex-col items-center mt-10">
            <p className="w-full text-lg font-semibold text-zinc-800 px-4">
              이 책의 포스트
            </p>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5 w-full">
              {bookReviews &&
                bookReviews.map((review) => (
                  <ReviewItem
                    key={review.reviewId}
                    review={review}
                    styleT="shadow-lg h-[200px] px-6 py-5 rounded-xl border-[1px]"
                    onOpen={(review) => openModal(review, bookInfo)}
                  />
                ))}
            </ul>
          </section>
        </>
      )}
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

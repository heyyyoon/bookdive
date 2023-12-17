import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useBooks from "../hooks/useBooks";
import ButtonAddPost from "../components/ui/ButtonAddPost";
import { useAuthContext } from "../context/AuthContext";
import StarRating from "../components/ui/StarRating";
import BookPosts from "../components/BookPosts";

export default function BookDetail() {
  const {
    state: {
      bookInfo,
      bookInfo: { title, contents, authors, thumbnail, bookId },
    },
  } = useLocation();
  const { user } = useAuthContext();

  const { useGetBookReviews } = useBooks();
  const { isLoading, data: bookReviews } = useGetBookReviews(bookId);

  const reviewLength = bookReviews && bookReviews.length;
  const bookRating =
    bookReviews &&
    (reviewLength > 0
      ? bookReviews.reduce((sum, review) => sum + review.rating, 0) /
          reviewLength || 0
      : 0);

  const navigate = useNavigate();

  return (
    <section className="w-[80%] pt-result max-w-basic mx-auto">
      <section className="flex flex-col items-center lg:flex-row lg:justify-center pb-5 border-b-2 ">
        <img
          className="w-[200px] lg:w-[250px] shrink-0 border-2 border-zinc-300 shadow-custom text-center"
          src={thumbnail}
          alt="bookimage"
        />
        <div className="flex flex-col justify-between text-center items-center py-3 ml-7 lg:items-start lg:text-left">
          <div>
            <p className="text-xl font-semibold mb-1 text-darkgrey">{title}</p>
            <p className="text-base text-medigrey">{authors}</p>
            <div className="my-4">
            {bookReviews && bookRating && <StarRating rating={bookRating} styles="max-w-[10rem] mx-auto lg:mx-0"/>}
            </div>

          </div>
          <div className="max-w-2xl">
            <p className="text-xl font-semibold mb-2 text-orange-500">
              overview
            </p>
            <p className="text-title text-darkgrey">{contents}</p>
            {user && (
              <div
                onClick={() => navigate("/post", { state: { bookInfo } })}
                className="w-[130px] text-lg mx-auto lg:mx-0 rounded-xl mt-3 py-3 bg-[#D0C5B5] hover:brightness-90"
              >
                <ButtonAddPost />
              </div>
            )}
          </div>
        </div>
      </section>
      <BookPosts isLoading={isLoading} bookReviews={bookReviews} bookInfo={bookInfo}/>
    </section>
  );
}

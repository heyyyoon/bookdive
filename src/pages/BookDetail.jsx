import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBookRating, getReviewByBookId } from "../api/firebase";
import { useQuery } from "@tanstack/react-query";
import ReviewCard from "../components/ReviewCard";

export default function BookDetail() {
  const {
    state: {
      bookInfo,
      bookInfo: {title, contents, authors, thumbnail, bookId},
    },
  } = useLocation();
  const { data:bookReviews } = useQuery(['bookreview'], () => getReviewByBookId(bookId));
  const { data:bookRating } = useQuery(['totalRating'], () => getBookRating(bookId));
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/write', {state: {bookInfo}});
  }
  return (
    <section className="flex flex-col items-center m-8">
      <p className="text-3xl font-bold mt-5">{title}</p>
      <p className="text-xl m-2">{authors}</p>
      <p className="text-xl">{bookRating} {('★').repeat(Math.floor(bookRating))}{('☆').repeat(5-Math.floor(bookRating))}</p>
      <div className="flex flex-row justify-center">
        <img className="w-52" src={thumbnail} alt="bookimage" />
        <div className="w-[50%] flex flex-col justify-around ml-5">
          <div>
            <p className="text-xl font-bold mb-2">줄거리</p>
            <p className="text-lg">{contents}</p>
          </div>
          <button onClick={handleClick} className="text-lg bg-orange-100 rounded w-full p-3">write Review</button>
        </div>
      </div>
      <p>리뷰들</p>
      <ul className="grid grid-cols-4 gap-4">
        {bookReviews && bookReviews.map(r => 
              <ReviewCard
                key={r.reviewId} 
                book={bookInfo}
                reviews={r} 
            />)
          }
      </ul>
    </section>
  );
}


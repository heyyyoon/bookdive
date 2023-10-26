import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBookRating, getReviewByBookId } from "../api/firebase";
import { useQuery } from "@tanstack/react-query";
import ReviewCard from "../components/ReviewCard";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

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
      <div className="max-w-[160px] w-full flex flex-row items-center gap-2">
        <p className="text-xl ">{bookRating && bookRating.toFixed(2)}</p>
        <Rating value={bookRating} />
      </div>
      
      <div className="flex flex-row justify-center">
        <img className="w-52" src={thumbnail} alt="bookimage" />
        <div className="w-[50%] flex flex-col justify-around ml-5">
          <div>
            <p className="text-xl font-semibold">overview</p>
            <p className="text-base">{contents}</p>
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


import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBookRating, getReviewByBookId } from "../api/firebase";
import { useQuery } from "@tanstack/react-query";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { BiSolidAddToQueue } from 'react-icons/bi';
import ReviewItem from "../components/card/ReviewItem";


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

  return (
    <section className="flex flex-col items-center pt-14">
      <section className="w-[80%] pb-3">
        <div className="flex flex-row justify-center">
          <div className="basis-1/3 flex flex-col items-center">
            <img
              className="w-[70%] border-2 border-zinc-300 shadow-custom"
              src={thumbnail}
              alt="bookimage"
            />
            <div className="max-w-[160px] w-full flex flex-row gap-2 bg-[#EEEEEE] rounded-3xl px-4 py-2 text-zinc-800 font-base">
              <Rating value={Math.floor(bookRating)} readOnly={true}/>
              <p className="text-[1.1rem] ">{bookRating && bookRating.toFixed(2)}</p>
            </div>
          </div>
          <div className="basis-2/3 flex flex-col justify-around">
            <div>
              <p className="text-2xl font-bold mb-1 ">{title}</p>
              <p className="mb-2">{authors}</p>
           
            </div>
            <div>
              <p className="text-xl font-semibold mb-2 text-orange-500">overview</p>
              <p className="text-base w-[80%]">{contents}</p>
              <div
              onClick={handleClick}
              className="w-[70%] text-lg font-semibold text-white rounded p-3 my-2 bg-[#ddd485] flex "
            >
              <BiSolidAddToQueue />
              <p>리뷰 작성하러 가기</p>
            </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-[80%] flex flex-col items-center mt-2">
        <p className="w-full text-xl font-semibold text-zinc-600 px-4 py-2">Reivews</p>  
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full p-5">
          {bookReviews &&
            bookReviews.map((r) => (
              <ReviewItem 
                title={r.reviewTitle} 
                content={r.reviewContent} 
                style='bg-[#EEEEEE] h-[230px] px-6 py-5 rounded-xl'
              />
            ))}
        </ul>
      </section>
    </section>
  );
}
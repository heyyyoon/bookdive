import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BookDetail() {
  const {
    state: {
      bookInfo,
      bookInfo: {bookTitle, bookContents, bookAuthors, bookThumbnail},
    },
  } = useLocation();
  const navigate = useNavigate();
  
  console.log(bookContents)
  const handleClick = () => {
    navigate('/write', {state: {bookInfo}});
  }
  return (
    <section className="flex flex-col items-center m-8">
      <p className="text-3xl font-bold mt-5">{bookTitle}</p>
      <p className="text-xl m-2">{bookAuthors}</p>
      <p className="text-xl">4.3 ★★★★☆</p>
      <div className="flex flex-row justify-center">
        <img className="w-52" src={bookThumbnail} alt="bookimage" />
        <div className="w-[50%] flex flex-col justify-around ml-5">
          <div>
            <p className="text-xl font-bold mb-2">줄거리</p>
            <p className="text-lg">{bookContents}</p>
          </div>
          <button onClick={handleClick} className="text-lg bg-orange-100 rounded w-full p-3">write Review</button>
        </div>
      </div>
      
      
      <p>리뷰들</p>
    </section>
  );
}


import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postReview } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import ResultPosting from "../components/ResultPosting";

export default function WriteReview() {
  const [review, setReview] = useState({});
  const { userId } = useAuthContext();
  const [star, setStar] = useState(0);
  const [success, setSuccess] = useState(false);
  const [warning, setWarning] = useState('');
  const navigate = useNavigate();

  const {
    state: {
      bookInfo,
      bookInfo: { bookThumbnail, bookTitle, bookAuthors, bookId },
    },
  } = useLocation();
  const handleChange = (e) => {
    setWarning(null);
    const { name, value } = e.target;
    setReview((prev) => ({
      ...prev,
      [name]: value,
      reviewRating: star,
      like: 0,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
 
    if(review.reviewTitle.length > 50) {
      setWarning('제목은 50자 이내로 작성하세요');
      return;
    } else if(review.reviewContent.length > 500) {
      setWarning('감상평은 500자 이내로 작성하세요');
      return;
    }
 

    postReview(bookInfo, bookId, userId, review).then(() => {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(null);
        navigate("/mypage");
      }, 2000);
    });
  };
  return (
    <section className="flex flex-col m-auto w-[70%] items-center">
      {success ? (
        <ResultPosting />
      ) : (
        <>
          <h1 className="text-2xl">소통 공간</h1>
          <img className="w-40" src={bookThumbnail} alt="bookImage" />
          <p>{bookTitle}</p>
          <p>{bookAuthors}</p>
          <div className="flex flex-row hover:cursor-pointer text-xl">
            <p onClick={() => setStar(1)}>{star >= 1 ? "★" : "☆"}</p>
            <p onClick={() => setStar(2)}>{star >= 2 ? "★" : "☆"}</p>
            <p onClick={() => setStar(3)}>{star >= 3 ? "★" : "☆"}</p>
            <p onClick={() => setStar(4)}>{star >= 4 ? "★" : "☆"}</p>
            <p onClick={() => setStar(5)}>{star >= 5 ? "★" : "☆"}</p>
          </div>
          <form
            className="flex flex-col items-center w-full"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-row w-full">
              <label className="w-1/6" htmlFor="title">
                제목
              </label>
              <textarea
                className="w-5/6"
                onChange={handleChange}
                value={review.reviewTitle ?? ""}
                type="text"
                placeholder="제목을 입력하세요"
                name="reviewTitle"
              />
            </div>
            <div className="flex flex-row w-full">
              <label className="w-1/6" htmlFor="content">
                감상평
              </label>
              <textarea
                multiple
                className="w-5/6 h-[300px]"
                onChange={handleChange}
                value={review.reviewContent ?? ""}
                type="text"
                placeholder="500자 이내로 작성하세요."
                name="reviewContent"
              />
            </div>
            { warning && <p className="text-xl text-red-400">{warning}</p>}
            <button className="bg-zinc-500">Submit</button>
          </form>
        </>
      )}
    </section>
  );
}

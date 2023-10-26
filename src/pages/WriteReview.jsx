import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addBook, addReview, getBooks } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import ResultPosting from "../components/ResultPosting";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

export default function WriteReview() {
  const [review, setReview] = useState({});
  const { userId } = useAuthContext();
  const [success, setSuccess] = useState(false);
  const [warning, setWarning] = useState('');
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);

  const {
    state: {
      bookInfo,
      bookInfo: {title, authors, thumbnail, bookId},
    },
  } = useLocation();
  
  const handleChange = (e) => {
    setWarning(null);
    const { name, value } = e.target;
    setReview((prev) => ({
      ...prev,
      [name]: value,
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
    getBooks(bookId).then(() => {
      addBook(bookId, bookInfo);
    });
    addReview({...review, rating}, bookId, userId, ).then(() => {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
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
          <h1 className="text-xl">자유로이</h1>
          <img className="w-40" src={thumbnail} alt="bookImage" />
          <p>{title}</p>
          <p>{authors}</p>
          <div style={{ maxWidth: 180, width: '100%' }}>
            <Rating
              value={rating}
              onChange={setRating}
            />
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

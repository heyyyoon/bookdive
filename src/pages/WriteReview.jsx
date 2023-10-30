import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addBook, addReview, getBooks } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import ResultPosting from "../components/ResultPosting";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

export default function WriteReview() {
  const [review, setReview] = useState({});
  const { userId } = useAuthContext();
  const [success, setSuccess] = useState(false);
  const [warning, setWarning] = useState("");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const {
    state: {
      bookInfo,
      bookInfo: { title, authors, thumbnail, bookId },
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

    if(rating === 0) {
      setWarning("별점을 선택하세요");
    } else if (review.reviewTitle.trim() === "") {
      setWarning("제목을 입력하세요");
    } else if (review.reviewContent.trim() === "") {
      setWarning("내용을 입력하세요")
    }
    else
    {
      getBooks(bookId).then(() => {
        addBook(bookId, bookInfo);
      });
      addReview({ ...review, rating }, bookId, userId).then(() => {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/mypage");
        }, 2000);
      });
    }
  };
  return (
    <section className="flex flex-col m-auto w-[70%] items-center mt-10">
      {success ? (
        <ResultPosting />
      ) : (
        <>
          <p className="font-sans text-xl font-semibold mb-3">{title}</p>
          <img className="w-[100px] shadow-custom" src={thumbnail} alt="bookImage" />
          <p className="font-sans text-[0.85rem] my-2">{authors}</p>
          <div className="flex flex-row items-center">
            <div className="max-w-[160px] my-3 ml-1">
              <Rating value={rating} onChange={setRating} />
            </div>
          </div>
          <form
            className="flex flex-col items-center w-full mt-5"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-row w-full justify-center">
            <label className="w-1/12 font-semibold text-center" htmlFor="content">
                제목
              </label>
              <textarea
                maxLength={30}
                multiple
                className="w-7/12 border-2 rounded-2xl mb-2 p-3 resize-none shadow-xl"
                onChange={handleChange}
                value={review.reviewTitle ?? ""}
                type="text"
                placeholder="30자 이내로 입력하세요"
                name="reviewTitle"
              />
            </div>
            <div className="flex flex-row w-full justify-center">
              <label className="w-1/12 font-semibold text-center" htmlFor="content">
                감상평
              </label>
              <textarea
                maxLength={300}
                multiple
                className="w-7/12 h-[250px] rounded-2xl border-2 p-3 resize-none shadow-xl"
                onChange={handleChange}
                value={review.reviewContent ?? ""}
                type="text"
                placeholder="300자 이내로 작성하세요."
                name="reviewContent"
              />
            </div>
            {warning && <p className="text-xl text-red-400">{warning}</p>}
            <button className="bg-zinc-500 p-2 hover:brightness-125 rounded-lg text-white mt-2">Submit</button>
          </form>
        </>
      )}
    </section>
  );
}

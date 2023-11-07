import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBooks } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import useBooks from "../hooks/useBooks";
import useReviews from "../hooks/useReviews";
import SuccessMsg from "../components/ui/SuccessMsg";
import Loading from "../components/Loading";

export default function WriteReview() {
  const [review, setReview] = useState({});
  const { userId } = useAuthContext();
  const [success, setSuccess] = useState(false);
  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const { addBook } = useBooks();
  const { addPost } = useReviews();
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
    } else if (!review.reviewTitle || review.reviewTitle === "") {
      setWarning("제목을 입력하세요");
    } else if (!review.reviewContent || review.reviewContent === "") {
      setWarning("내용을 입력하세요")
    }
    else
    {
      setLoading(true);
      getBooks(bookId).then(() => {
        addBook.mutate({bookId, bookInfo}, {onSuccess: () => {
          addPost.mutate({review, rating, bookId, userId}, {onSuccess: () => {
            setSuccess(true);
            setLoading(false);
            setTimeout(() => {
              setSuccess(false);
              navigate("/mypage");
            }, 2000);
          }})
        }})
      });
      
    }
  };
  return (
    <section className="flex flex-col m-auto w-[80%] items-center mt-10">
      {loading && <Loading />}
      {success ? (
        <SuccessMsg text="Success Posting !"/>
      ) : (
        <>
          <p className="text-xl text-darkgrey font-semibold mb-3">{title}</p>
          <img className="w-[100px] shadow-custom" src={thumbnail} alt="bookImage" />
          <p className="text-[0.85rem] my-2 text-darkgrey">{authors}</p>
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
            <label className="w-1/12 font-semibold text-center text-medigrey" htmlFor="content">
                제목
              </label>
              <textarea
                maxLength={30}
                multiple
                className="w-7/12 border-2 rounded-2xl mb-2 p-3 resize-none shadow-lg"
                onChange={handleChange}
                value={review.reviewTitle ?? ""}
                type="text"
                placeholder="30자 이내로 입력하세요"
                name="reviewTitle"
              />
            </div>
            <div className="flex flex-row w-full justify-center">
              <label className="w-1/12 font-semibold text-center text-medigrey" htmlFor="content">
                감상평
              </label>
              <textarea
                maxLength={300}
                multiple
                className="w-7/12 h-[250px] rounded-2xl border-2 p-3 resize-none shadow-lg"
                onChange={handleChange}
                value={review.reviewContent ?? ""}
                type="text"
                placeholder="300자 이내로 작성하세요."
                name="reviewContent"
              />
            </div>
            {warning && <p className="mt-2 text-gl text-red-500">{warning}</p>}
            <button className="px-5 py-3 bg-[#D0C5B5] hover:brightness-90 text-medigrey font-semibold rounded-lg mt-5">Submit</button>
          </form>
        </>
      )}
    </section>
  );
}

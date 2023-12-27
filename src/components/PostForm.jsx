import { getBooks } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import { Rating } from "@smastrom/react-rating";
import { useState } from "react";
import useBooks from "../hooks/useBooks";
import useReviews from "../hooks/useReviews";
import Loading from "../components/Loading";
import WarningMsg from "./ui/WarningMsg";
import { postVaild } from "../service/inputValidator";

const LABEL_CLASS = "w-1/12 font-semibold text-center text-medigrey pt-2";
const COLUMN_CLASS = "flex flex-row w-full justify-center mb-2";
const TEXTAREA_CLASS = "w-7/12 border-2 rounded-2xl mb-2 p-3 resize-none shadow-lg";

export default function PostForm({bookInfo, bookInfo: { bookId }, handleSuccess, reviewInfo}) {
  const { addBook } = useBooks();
  const { addPost } = useReviews();
  const { userId } = useAuthContext();
  const [rating, setRating] = useState(reviewInfo ? reviewInfo.rating : 0);
  const [review, setReview] = useState(reviewInfo ? reviewInfo : {});

  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false);

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

    const vaildInsp = postVaild({review, rating});
    if(vaildInsp) {
      setWarning(vaildInsp);
      setTimeout(() => setWarning(null), 1000);
    } else {
      setLoading(true);
      getBooks(bookId).then(() => {
        addBook.mutate({ bookId, bookInfo },
          {onSuccess: () => {
            addPost.mutate({ review, rating, bookId, userId },
              {onSuccess: () => {
                  setLoading(false);
                  handleSuccess();
                },
              });
            },
          });
      });
    }
  };
  return (
    <section className="flex flex-col items-center w-full max-w-6xl">
      {loading && <Loading />}
      <div className="flex flex-row items-center">
        <div className="max-w-[160px] my-3 ml-1">
          <Rating value={rating} onChange={setRating} />
        </div>
      </div>
      <form
        className="flex flex-col items-center w-full mt-5"
        onSubmit={handleSubmit}
      >
        <div className={COLUMN_CLASS}>
          <label className={LABEL_CLASS} htmlFor="content">제목</label>
          <textarea
            maxLength={30}
            multiple
            onChange={handleChange}
            value={review.reviewTitle ?? ""}
            type="text"
            placeholder="30자 이내로 입력하세요"
            name="reviewTitle"
            className={TEXTAREA_CLASS}
          />
        </div>
        <div className={COLUMN_CLASS}>
          <label className={LABEL_CLASS} htmlFor="content">감상평</label>
          <textarea
            maxLength={300}
            multiple
            onChange={handleChange}
            value={review.reviewContent ?? ""}
            type="text"
            placeholder="300자 이내로 작성하세요."
            name="reviewContent"
            className={`${TEXTAREA_CLASS} h-[250px]`}
          />
        </div>
        <div className={COLUMN_CLASS}>
          <label className={LABEL_CLASS} htmlFor="content">한줄평</label>
          <textarea
            maxLength={30}
            multiple
            onChange={handleChange}
            value={review.reviewComment ?? ""}
            type="text"
            placeholder="한줄 감상평을 입력하세요."
            name="reviewComment"
            className={TEXTAREA_CLASS}
          />
        </div>
        <button className="px-5 py-3 bg-[#D0C5B5] hover:brightness-90 text-medigrey font-semibold rounded-lg mt-5">
          Submit
        </button>
      </form>
      {warning && <WarningMsg text={warning} state="Bottom"/>}
    </section>
  );
}

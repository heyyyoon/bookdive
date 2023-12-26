import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "@smastrom/react-rating/style.css";
import SuccessMsg from "../components/ui/SuccessMsg";
import PostForm from "../components/PostForm";

export default function WriteReview() {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const {
    state: {
      bookInfo,
      bookInfo: { title, authors, thumbnail },
    },
  } = useLocation();

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      navigate("/mypage");
    }, 2000);
  }
  return (
    <section className="flex flex-col m-auto w-[80%] items-center mt-10">
      {success ? (
        <SuccessMsg text="Success Posting !"/>
      ) : (
        <>
          <p className="text-xl text-darkgrey font-semibold mb-3">{title}</p>
          <img className="w-[100px] shadow-custom" src={thumbnail} alt="bookImage" />
          <p className="text-[0.85rem] my-2 text-darkgrey">{authors}</p>
          <PostForm bookInfo={bookInfo} handleSuccess={handleSuccess}/>
        </>
      )}
    </section>
  );
}

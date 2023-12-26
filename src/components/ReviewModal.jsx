import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useModalContext } from "../context/ModalContext";
import CloseCircle from "./ui/CloseCircle";
import Like from "./ui/Like";
import StarRating from "./ui/StarRating";
import ConfirmModal from "./ConfirmModal";
import { delReview } from "../api/firebase";
import PostStateChangeBtn from "./ui/PostStateChangeBtn";


export default function ReviewModal() {
  const { userId } = useAuthContext();
  const { closeModal, selectedItem:{review, book} } = useModalContext();
  const { reviewId, reviewTitle, reviewContent, reviewComment, rating } = review;
  const { bookId, title,authors, thumbnail } = book;

  const [ isConfirmOpen, setIsConfirmOpen ] = useState(false);
  const closeConfirm = () => setIsConfirmOpen(false);

  const handleDelete = async () => {
    try {
      await delReview({reviewId, bookId});
    } catch (e) {
      console.log(e);
    } finally {
      closeConfirm();
      closeModal();
    }
  }
  const handleModify = () => {

  }
  return (
    <article className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
      <div className="w-[60%] lg:w-[40%] rounded-2xl max-w-md bg-white px-8 py-4 shadow-modal relative">
        { userId === review.userId &&
          <div className="absolute -top-16 left-[50%] translate-x-[-50%] w-[50%]">
            <PostStateChangeBtn onOpen={() => setIsConfirmOpen(true)} onModify={handleModify}/>
          </div>
        }
        
      <div className="flex flex-col justify-between">
          <div className="flex justify-end"><CloseCircle onClose={closeModal} /></div>
          <div className="flex border-b-[1px] pb-5">
            <img
              className="w-[25%] shadow-custom border-2 border-white ml-1"
              src={thumbnail}
              alt="book"
            />
            <div className="ml-5 mt-3">
              <p className="font-semibold text-title text-darkgrey mb-1">{title}</p>
              <p className="text-content text-zinc-medigrey">{authors}</p>
              <div className="mt-2 max-w-[7rem]"><StarRating rating={rating}/></div>
            </div>
          </div>
          <div className="my-6 text-left">
            <p className="text-lg font-semibold text-darkgrey mb-3">{reviewTitle}</p>
            <p className="text-sm leading-[1.4rem] text-medigrey">{reviewContent}</p>
          </div>  
          {reviewComment && 
            <p className="italic leading-[1.4rem] text-black bg-slate-200 rounded-lg p-3 my-3 text-center">
              {reviewComment}
            </p>
          }
          {userId && <Like userId={userId} reviewId={reviewId} />}
        </div>
      </div>
      {isConfirmOpen && <ConfirmModal onYes={handleDelete} onNo={closeConfirm}/>}
    </article>
  );
}

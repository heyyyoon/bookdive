import React from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import useLikes from "../../hooks/useLikes";

export default function Like({ userId, reviewId }) {
  const {
    useGetLikeInfo,
    delLikeMutation,
    addLikeMutation,
  } = useLikes();

  const { data } = useGetLikeInfo(userId, reviewId);
  const userLikes = data?.userLikes;
  const isLiked = data?.isLiked;

  const handleToggle = async () => {
    if (isLiked) {
      delLikeMutation.mutate({ userId, reviewId: reviewId });
    } else {
      addLikeMutation.mutate({ userId, reviewId: reviewId });
    }
  };

  return (
    <div
      className="flex justify-center items-center rounded-full cursor-pointer"
      onClick={handleToggle}
    >
      <div className="group flex flex-row items-center p-3 px-5 bg-[#F5F5F5] rounded-full relative">
        <div className="text-2xl transition-all group-hover:scale-110">
          {data && data.isLiked ? (
            <GoHeartFill className="text-[#ff9f45]" />
          ) : (
            <GoHeart className="text-[#887C8D]" />
          )}
        </div>
        <p className=" text-lightgrey text-[0.9rem] font-[600] ml-1">
          {data && userLikes}
        </p>
      </div>
    </div>
  );
}
